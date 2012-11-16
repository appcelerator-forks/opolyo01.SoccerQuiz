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
    function showNextQuestion(start) {
        $.questionLabel.text = "Who won the world cup in " + year + "?";
        $.answer1.title = "Holand";
        $.answer2.title = "France";
        $.answer3.title = "Russia";
        $.questionLabelBack.text = "Who won the world cup in " + year + "?";
        $.answer1Back.title = "Holand";
        $.answer2Back.title = "France";
        $.answer3Back.title = "Russia";
        year += 4;
        if (start) return;
        if (front) {
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
    _.extend($, $.__views);
    $.goBack.addEventListener("click", goBack);
    $.answer1.on("click", answer1Handler);
    $.answer2.on("click", answer2Handler);
    $.answer3.on("click", answer3Handler);
    $.answer1Back.on("click", answer1Handler);
    $.answer2Back.on("click", answer2Handler);
    $.answer3Back.on("click", answer3Handler);
    var year = 1990, left = -320, front = !0;
    showNextQuestion(!0);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;