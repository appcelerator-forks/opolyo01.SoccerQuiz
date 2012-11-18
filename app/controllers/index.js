var 
	Status = require('Status'),
	User = require('User'),
	Cloud = require('ti.cloud'),
	config = require("config"),
	debug = false;
	
config.setup();

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
});

//Ti.App.Properties.setString("username", undefined);

Ti.Facebook.permissions = ['publish_stream'];

$.play.addEventListener("click", playHandler);
//$.standings.addEventListener("click", standingsHandler);

function playHandler(){
	$.game = Alloy.createController('game');
	$.homeWindow.add($.game.container);
	$.game.container.left = -320;
	$.game.container.animate({left:0, duration:1500});
	$.homeView.animate({left:320, duration:1000},function(){$.homeWindow.remove($.homeView);});
}

// function standingsHandler(){
	// if(!Ti.App.Properties.getString("username")){
		// addFBLogin();
	// }
	// else{
		// $.standings = Alloy.createController('standings');
		// $.homeWindow.add($.standings.container);
		// $.standings.container.left = -320;
		// $.standings.container.animate({left:0, duration:1500});
		// $.homeView.animate({left:320, duration:1000},function(){$.homeWindow.remove($.homeView);});
	// }
// }

function isUserRegistered(username, cb){
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
}

function insertUserACS(json) {
	isUserRegistered(json.username, function(resp){
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
}

function addFBLogin(){
	var fb = Ti.Facebook.createLoginButton({
		top : 40,
		style : Ti.Facebook.BUTTON_STYLE_WIDE
	});
	
	Ti.Facebook.addEventListener('login', function(e) {
		if (e.success) {
			getUserInfo();
		}
	});
	
	if(Ti.Facebook.getLoggedIn()){
		getUserInfo();
	}
	
	function getUserInfo() {
		Ti.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
			if (e.success) {
				var json = JSON.parse(e.result);
				username.value = json.username;
				//insertUserACS(json);
			} else if (e.error) {
				alert(e.error);
			} else {
				alert('Unknown response');
			}
		});
	}
	var wina = Ti.UI.createWindow({
		backgroundColor: "#fff",
		modal: true,
		layout: "vertical",
		title: "Register"
	});
	var closeButton = Titanium.UI.createButton({
        title : 'Close',
        width : 100,
        height : 25
    });
    var registerButton = Titanium.UI.createButton({
        title : 'Register',
        width : 200,
        height : 40,
        top: 20,
        left:40
    });
    var heading = Ti.UI.createLabel({
    	top: 20,
    	style:0,
    	color: "#333",
    	text: "Register to gain ability compete in standings",
    	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font:{fontWeight:"bold", fontSize:22}
    });
    var userLabel = Ti.UI.createLabel({
    	top: 20,
    	style:0,
    	left:40,
    	text: "Username",
    	color: "#3B5998",
		font:{fontWeight:"bold", fontSize:18}
    });
    var username = Titanium.UI.createTextField({
		color: '#666666',
		textAlign:'left',
		left:40,
		width:200,
		top: 10,
		height: 30,
		font:{fontWeight:'plain',fontSize:14},
		autocorrect:false,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		keyboardType: Titanium.UI.KEYBOARD_ASCII,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
	});
    closeButton.addEventListener('click', function() {
        wina.close();
    });
    
	username.addEventListener('focus', function() {
		wina.top = -120;
	    wina.animate({bottom: 166, duration:500});
	});
	username.addEventListener('blur', function() {
		wina.top = 0;
	    wina.animate({bottom: 0, duration:500});
	});

	wina.addEventListener("click", function(){
		username.blur();
	});
    registerButton.addEventListener('click', function() {
    	Ti.App.Properties.setString("username", username.value);
    	insertUserACS({"username": username.value});
    	Ti.App.Properties.setString("username", username.value);
        wina.close();
    });
    wina.setLeftNavButton(closeButton);
    wina.add(heading);
    wina.add(fb);
    wina.add(userLabel);
    wina.add(username);
    wina.add(registerButton);
	wina.open();
}
//Manage social connection state
var fbOn = false;
$.facebook.on('click', function() {
	if (!fbOn) {
		function setOn() {
			fbOn = true;
			$.facebook.backgroundImage = '/images/post/btn-facebook-on.png';
		}
		
		if (User.confirmLogin.toFacebook()) {
			setOn();
		}
		else {
			User.linkToFacebook(function(e) {
				setOn();
			});
		}
	}
	else {
		fbOn = false;
		$.facebook.backgroundImage = '/images/post/btn-facebook-off.png';
	}
});

var twitterOn = false;
$.twitter.on('click', function() {
	if (!twitterOn) {
		function setOn() {
			twitterOn = true;
			$.twitter.backgroundImage = '/images/post/btn-twitter-on.png';
		}
		
		if (User.confirmLogin.toTwitter()) {
			setOn();
		}
		else {
			User.linkToTwitter(function(e) {
				setOn();
			});
		}
	}
	else {
		twitterOn = false;
		$.twitter.backgroundImage = '/images/post/btn-twitter-off.png';
	}
});

$.post.on("focus", function(){
	$.homeWindow.top = -120;
	$.homeWindow.animate({bottom: 166, duration:500});
});

$.post.on("blur", function(){
	$.homeWindow.top = 0;
	$.homeWindow.animate({bottom: 0, duration:500});
});

$.homeWindow.on("click", function(){
	$.post.blur();
});

$.submit.on('click', function() {
	var currentPost = $.post.value;
	var args = {
		success: function(ev) {
			alert("success posting");
			$.post.value = "";
		},
		error: function(ev) {
			alert(ev);
		}
	};
	args.message = currentPost;
	Ti.API.info(currentPost);
	if(twitterOn){
		User.tweet(args);
	}		
	if (fbOn) {
		User.facebookPost(args);
	}
});

function getUser(cb){
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
}

$.homeWindow.open();
if(!Ti.App.Properties.getString("username") || debug){
	addFBLogin();
}
else{
	getUser(function(json){
		if(!json){
			Ti.App.Properties.setString("username", undefined);
			addFBLogin();
		}
	});
}
