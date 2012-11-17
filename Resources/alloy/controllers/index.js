function Controller() {
    function playHandler() {
        $.game = Alloy.createController("game");
        $.homeWindow.add($.game.container);
        $.game.container.left = -320;
        $.game.container.animate({
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
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontWeight: "bold",
            fontSize: 24
        },
        text: "Check your soccer knowledge",
        id: "headingLabel"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.headingLabel);
    $.__views.line1 = A$(Ti.UI.createLabel({
        color: "#fff",
        height: 0,
        text: "Congrats, well done!",
        id: "line1"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.line1);
    $.__views.line2 = A$(Ti.UI.createLabel({
        color: "#fff",
        height: 0,
        text: "you answered 5 out 8 questions",
        id: "line2"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.line2);
    $.__views.line3 = A$(Ti.UI.createLabel({
        color: "#fff",
        height: 0,
        text: "What do you want to do next?",
        id: "line3"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.line3);
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
        title: "Take Quiz",
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
        title: "Standings",
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