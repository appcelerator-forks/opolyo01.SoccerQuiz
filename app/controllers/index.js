var 
	Status = require('Status'),
	User = require('User'),
	Cloud = require('ti.cloud'),
	config = require("config");
	
config.setup();


Ti.API.info(Ti.App.Properties.getString('twitter.consumerSecret'));
Ti.API.info(Ti.App.Properties.getString('twitter.consumerKey'));
Ti.Facebook.permissions = ['publish_stream'];

$.play.addEventListener("click", playHandler);
$.leaderboards.addEventListener("click", leadersHandler);

function playHandler(){
	$.game = Alloy.createController('game');
	$.homeWindow.add($.game.container);
	$.game.container.left = -320;
	$.game.container.animate({left:0, duration:1500});
	$.homeView.animate({left:320, duration:1000},function(){$.homeWindow.remove($.homeView);});
}

function leadersHandler(){
	$.leader = Alloy.createController('leader');
	$.leader.gameView.left = -320;
	$.homeWindow.add($.leader.gameView);
	$.homeWindow.add($.leader.gameViewBack);
	$.leader.gameView.animate({left:0, duration:1500});
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


$.submit.on('click', function() {
	var currentPost = $.post.value;
	var args = {
		success: function(ev) {
			alert("success posting");
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

$.homeWindow.open();