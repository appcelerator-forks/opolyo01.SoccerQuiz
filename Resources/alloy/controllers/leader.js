function Controller() {
    function answer1Handler() {
        showNextQuestion();
    }
    function answer2Handler() {
        showNextQuestion();
    }
    function answer3Handler() {
        showNextQuestion();
    }
    function remove(view) {
        var children = view.getChildren();
        for (var i = 0, iL = children.length; i < iL; ++i) view.remove(children[i]);
    }
    function repaint(view) {
        var children = view.getChildren(), heading = children[0], answer1 = children[1], answer2 = children[2], answer3 = children[3];
        heading.text = "Who won the world cup in " + year + "?";
        answer1.title = "Greece";
        answer2.title = "Italy";
        answer3.title = "Moroco";
    }
    function insertGame(view) {
        var answer1 = Titanium.UI.createButton({
            title: "USA",
            top: 10,
            width: 200,
            height: 30,
            background: "#abc"
        }), answer2 = Titanium.UI.createButton({
            title: "Russia",
            top: 10,
            width: 200,
            height: 30,
            background: "#abc"
        }), answer3 = Titanium.UI.createButton({
            title: "France",
            top: 10,
            width: 200,
            height: 30,
            background: "#abc"
        }), goback = Titanium.UI.createButton({
            title: "Home",
            top: 40,
            width: 200,
            height: 30,
            background: "#abc"
        }), questionLabel = Ti.UI.createLabel({
            text: "Who won the world cup in " + year + "?",
            top: 20
        });
        view.add(questionLabel);
        view.add(answer1);
        view.add(answer2);
        view.add(answer3);
        view.add(goback);
        answer1.addEventListener("click", answer1Handler);
        answer2.addEventListener("click", answer2Handler);
        answer3.addEventListener("click", answer3Handler);
        goback.addEventListener("click", goBack);
    }
    function showNextQuestion(start) {
        year += 4;
        if (start === "start") insertGame($.gameView); else if (front) {
            $.gameViewBack.getChildren().length === 0 ? insertGame($.gameViewBack) : repaint($.gameViewBack);
            $.gameViewBack.left = -320;
            $.gameView.animate({
                left: 320,
                duration: 1500
            });
            $.gameViewBack.animate({
                left: 0,
                duration: 1500
            });
            front = !1;
        } else {
            repaint($.gameView);
            $.gameView.left = -320;
            $.gameViewBack.animate({
                left: 320,
                duration: 1500
            });
            $.gameView.animate({
                left: 0,
                duration: 1500
            });
            front = !0;
        }
    }
    function goBack() {
        Alloy.createController("index");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.gameView = A$(Ti.UI.createView({
        backgroundColor: "#fff",
        layout: "vertical",
        title: "Game",
        height: 480,
        width: 320,
        left: 0,
        id: "gameView"
    }), "View", null);
    $.addTopLevelView($.__views.gameView);
    $.__views.gameViewBack = A$(Ti.UI.createView({
        backgroundColor: "#fff",
        layout: "vertical",
        title: "Game",
        height: 480,
        width: 320,
        left: -320,
        id: "gameViewBack"
    }), "View", null);
    $.addTopLevelView($.__views.gameViewBack);
    _.extend($, $.__views);
    var year = 1990, front = !0;
    showNextQuestion("start");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;