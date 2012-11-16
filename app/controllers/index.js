$.play.addEventListener("click", playHandler);
$.leaderboards.addEventListener("click", leadersHandler);

function playHandler(){
	$.game = Alloy.createController('game');
	$.game.gameView.left = -320;
	$.homeWindow.add($.game.gameHeader);
	$.homeWindow.add($.game.gameView);
	$.homeWindow.add($.game.gameViewBack);
	$.game.gameView.animate({left:0, duration:1500});
	$.game.gameHeader.animate({left:0, duration:1500});
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

$.homeWindow.open();