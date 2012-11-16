function Controller() {
    function playHandler() {
        $.game = Alloy.createController("game");
        $.game.gameView.left = -320;
        $.homeWindow.add($.game.gameHeader);
        $.homeWindow.add($.game.gameView);
        $.homeWindow.add($.game.gameViewBack);
        $.game.gameView.animate({
            left: 0,
            duration: 1500
        });
        $.game.gameHeader.animate({
            left: 0,
            duration: 1500
        });
        $.homeView.animate({
            left: 320,
            duration: 1000
        }, function() {
            $.homeWindow.remove($.homeView);
        });
    }
    function leadersHandler() {
        $.leader = Alloy.createController("leader");
        $.leader.gameView.left = -320;
        $.homeWindow.add($.leader.gameView);
        $.homeWindow.add($.leader.gameViewBack);
        $.leader.gameView.animate({
            left: 0,
            duration: 1500
        });
        $.homeView.animate({
            left: 320,
            duration: 1000
        }, function() {
            $.homeWindow.remove($.homeView);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.homeWindow = A$(Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "homeWindow",
        exitOnClose: "true"
    }), "Window", null);
    $.addTopLevelView($.__views.homeWindow);
    $.__views.homeView = A$(Ti.UI.createView({
        backgroundColor: "#000",
        layout: "vertical",
        title: "Home",
        id: "homeView"
    }), "View", $.__views.homeWindow);
    $.__views.homeWindow.add($.__views.homeView);
    $.__views.headingLabel = A$(Ti.UI.createLabel({
        top: 20,
        color: "#fff",
        left: 10,
        right: 10,
        style: 0,
        font: {
            fontWeight: "bold",
            fontSize: 24
        },
        text: "Test your knowledge of soccer with this quiz.",
        id: "headingLabel"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.headingLabel);
    $.__views.play = A$(Ti.UI.createButton({
        top: 40,
        left: 10,
        right: 10,
        style: 0,
        backgroundColor: "#B20838",
        height: 43,
        font: {
            fontWeight: "bold",
            fontSize: 24
        },
        title: "Play",
        id: "play"
    }), "Button", $.__views.homeView);
    $.__views.homeView.add($.__views.play);
    $.__views.leaderboards = A$(Ti.UI.createButton({
        top: 10,
        left: 10,
        right: 10,
        style: 0,
        backgroundColor: "#B20838",
        height: 43,
        font: {
            fontWeight: "bold",
            fontSize: 24
        },
        title: "Leaders",
        id: "leaderboards"
    }), "Button", $.__views.homeView);
    $.__views.homeView.add($.__views.leaderboards);
    _.extend($, $.__views);
    $.play.addEventListener("click", playHandler);
    $.leaderboards.addEventListener("click", leadersHandler);
    $.homeWindow.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;