//dependencies
var Cloud = require('ti.cloud'),
	Gravitas = require('gravitas'),
	social = require('alloy/social');

var twitter = social.create({
	consumerSecret:Ti.App.Properties.getString('twitter.consumerSecret'),
	consumerKey:Ti.App.Properties.getString('twitter.consumerKey')
});

//Empty constructor (for now)
function User() {}

//Check for a current login session ID - if we have one, configure cloud, if not, return false
User.confirmLogin = function() {
	var auth = false;
	if (Ti.App.Properties.hasProperty('sessionId')) {
		//set up cloud module to use saved session
		Cloud.sessionId = Ti.App.Properties.getString('sessionId');
		auth = true;
	}
	
	return auth;
};

//Check social login
User.confirmLogin.toFacebook = function() {
	return Ti.Facebook.loggedIn;
};

User.confirmLogin.toTwitter = function() {
	return twitter.isAuthorized();
};

//Link to Facebook
User.linkToFacebook = function(cb) {
	Ti.Facebook.addEventListener('login', function(e) {
		cb && cb(e);
	});
	Ti.Facebook.authorize();
};
User.logoutFacebook = function(cb) {
	Ti.Facebook.addEventListener('logout', function(e) {
		cb && cb(e);
	});
	Ti.Facebook.logout();
};

//Link to Twitter
User.linkToTwitter = function(cb) {
	twitter.authorize(cb);
};
User.logoutTwitter = function(cb) {
	twitter.deauthorize();
	cb && cb();
};

//Hmm, not sure if this REALLY belongs in a user model, but sharing features going here...
/*
 * Argument format:
 * {
 * 	 message: 'a string to share',
 *   success: function() {},
 *   error: function() {}
 * }
 */
User.tweet = function(args) {
	twitter.share({
		message:args.message,
		success:args.success,
		error:args.error
	});
};

/*
 * Argument format:
 * {
 * 	 message: 'a string to share',
 *   image: aReferenceToATitaniumBlob, //optional
 *   success: function() {},
 *   error: function() {}
 * }
 */
User.facebookPost = function(args) {
	if (!Ti.Network.online) {
		args.error({
			success:false
		});
		return;
	}
	
	if (args.image) {
		Ti.Facebook.requestWithGraphPath('me/photos', {
			message:args.message,
			picture:args.image
		}, 'POST', function(e){
		    if (e.success) {
		        args.success && args.success(e);
		    } 
		    else {
		        args.error && args.error(e);
		    }
		});
	}
	else {
		Ti.Facebook.requestWithGraphPath('me/feed', {
			message: args.message
		}, 'POST', function(e) {
		    if (e.success) {
		        args.success && args.success(e);
		    } 
		    else {
		        args.error && args.error(e);
		    }
		});
	}
};


User.login = function(cb){
	Cloud.Users.login({
	    login: 'opolyo01@yahoo.com',
	    password: 'mysecurepassword'
	}, function (e) {
	    if (e.success) {
	       Ti.API.info("loggedin into ACS");
	    } 
	    else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	    cb.call(this, {status: e.success});
	});
};

User.update = function(obj, json){
	Cloud.Objects.update({
		classname : 'users',
			id : obj.id,
			fields : json
		}, function(e) {
			if (e.success) {
				Ti.API.info("added quiz results");
			} else {
				alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
	}); 
};

User.getAllUsers = function(cb){
	var json;
	Cloud.Objects.query({
		classname : 'users',
		page: 1,
	    per_page: 30,
	}, function(e) {
		if (e.success) {
			if(e.users.length > 0){
				json = e.users;
				Ti.API.info('Success:\\n' + 'Count: ' + e.users.length);
			}
		} 
		else {
			Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
		cb.call(this, json);
	}); 
};
User.getUser = function(cb){
	var json;
	Cloud.Objects.query({
		classname : 'users',
		page: 1,
	    per_page: 10,
	    where: {
	        "username": Ti.App.Properties.getString("username")
	    }
	}, function(e) {
		if (e.success) {
			if(e.users.length > 0){
				json = e.users;
				Ti.API.info('Success:\\n' + 'Count: ' + e.users.length);
			}
		} 
		else {
			Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
		cb.call(this, json);
	}); 
};
User.isUserRegistered = function(username, cb){
	var json = {exist: false};
	Cloud.Objects.query({
		classname : 'users',
		page: 1,
	    per_page: 10,
	    where: {
	        "username": username
	    }
	}, function(e) {
		if (e.success) {
			Ti.API.info('Success:\\n' + 'Count: ' + e.users.length);
			if(e.users.length > 0){
				json = {exist: true};
			}
		} 
		cb.call(this, json);
	}); 
};

User.insertUserACS = function(json){
	User.isUserRegistered(json.username, function(resp){
		if(!resp.exist){
			var acsJson = {
				"classname" : "users",
				"fields" : json
			};
			Cloud.Objects.create(acsJson, function(e) {
				if (e.success) {
					Ti.API.info(e);
				} 
				else {
					alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
		}
		else{
			alert("this username already exist pick another one");
		}
	});
};
//Retrieve user network details
User.getUserDetails = function() {
	var deets;
	if (Ti.App.Properties.hasProperty('networkDetails')) {
		try {
			deets = JSON.parse(Ti.App.Properties.getString('networkDetails'));
		}
		catch (e) { 
			Ti.API.error('Error parsing user details: '+e);
			//swallow, if we barf on this we'll return falsy 
		}
	}
	return deets;
};

//Generate an avatar image associated with this user
User.generateAvatarURL = function() {
	//prefer stored property
	if (Ti.App.Properties.hasProperty('profileImage')) {
		return Ti.App.Properties.getString('profileImage');
	}
	
	//Fallback to Gravatar URL
	var deets = User.getUserDetails();
	return Gravitas.createGravatar({
		email:deets.email,
		size:44
	});
};

//Log out the current user
User.logout = function(cb) {
	if (!Ti.Network.online) {
		cb({
			success:false
		});
		return;
	}
	
	Cloud.Users.logout(function(e) {
		if (e.success) {
			if (User.confirmLogin.toFacebook()) {
				User.logoutFacebook();
			}
			if (User.confirmLogin.toTwitter()) {
				User.logoutTwitter();
			}
			Ti.App.Properties.removeProperty('sessionId');
		}
		cb(e);
	});
};

//Assign the given photo as the profile photo for the current user
User.assignProfilePhoto = function(blob, cb) {
	if (!Ti.Network.online) {
		cb({
			success:false
		});
		return;
	}
	
	Cloud.Users.update({
		photo:blob
	}, function(e) {
		var usr = e.users[0];
		if (e.success) {
			//Now, grab the profile image URL...
			Cloud.Users.showMe(function(ev) {
				if (ev.success) {
					var me = ev.users[0]
					Ti.App.Properties.setString('profileImage', me.photo.urls.square_75);
				}
				cb(e);
			});
			cb(e);
		}
		cb(e);
	});
};

//Export constructor function as public interface
module.exports = User;
