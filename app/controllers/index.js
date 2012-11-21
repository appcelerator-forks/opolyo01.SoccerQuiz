var 
	Status = require('Status'),
	User = require('User'),
	Cloud = require('ti.cloud'),
	config = require("config"),
	ui = require("ui"),
	quizList = require("data").list,
	debug = false;
	
config.setup();

User.login(function(json){
	//loadQuizes(json);
});

function loadQuizes(json){
	for(var i=0, iL=quizList.length;i<iL;++i){
		console.log(quizList[i]);
		var acsJson = {
			"classname" : "quizes",
			"fields" : quizList[i]
		};
		Cloud.Objects.create(acsJson, function(e) {
			console.log(e);
		});
	}
}

Ti.Facebook.permissions = ['publish_stream'];
$.play.addEventListener("click", playHandler);

function playHandler(){
	$.game = Alloy.createController('game');
	$.homeWindow.add($.game.container);
	$.game.container.left = -320;
	$.game.container.animate({left:0, duration:1500});
	$.homeView.animate({left:320, duration:1000},function(){$.homeWindow.remove($.homeView);});
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

$.tab2.on("focus", function(){
	if(!Ti.App.Properties.getString("username") || debug){
		ui.FBLogin();
	}
});
//$.homeWindow.open();
$.tabGroup.open();
if(!Ti.App.Properties.getString("username") || debug){
	ui.FBLogin();
}
else{
	User.getUser(function(json){
		if(!json){
			Ti.App.Properties.setString("username", undefined);
			ui.FBLogin();
		}
	});
}
