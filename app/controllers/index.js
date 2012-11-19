var 
	Status = require('Status'),
	User = require('User'),
	Cloud = require('ti.cloud'),
	config = require("config"),
	debug = true;
	
config.setup();
User.login();

Ti.Facebook.permissions = ['publish_stream'];
$.play.addEventListener("click", playHandler);

function playHandler(){
	$.game = Alloy.createController('game');
	$.homeWindow.add($.game.container);
	$.game.container.left = -320;
	$.game.container.animate({left:0, duration:1500});
	$.homeView.animate({left:320, duration:1000},function(){$.homeWindow.remove($.homeView);});
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
    	User.insertUserACS({"username": username.value});
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

$.tabGroup.open();
$.homeWindow.open();
if(!Ti.App.Properties.getString("username") || debug){
	addFBLogin();
}
else{
	User.getUser(function(json){
		if(!json){
			Ti.App.Properties.setString("username", undefined);
			addFBLogin();
		}
	});
}
