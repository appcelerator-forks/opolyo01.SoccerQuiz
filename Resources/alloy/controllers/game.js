function Controller() {
    function registerFrontEvents(start) {
        if (start !== "start") {
            $.answer1Back.removeEventListener("click", answer1Handler);
            $.answer2Back.removeEventListener("click", answer2Handler);
            $.answer3Back.removeEventListener("click", answer3Handler);
            $.backButton.removeEventListener("click", goBack);
        }
        $.answer1.addEventListener("click", answer1Handler);
        $.answer2.addEventListener("click", answer2Handler);
        $.answer3.addEventListener("click", answer3Handler);
        $.backButton.addEventListener("click", goBack);
        clearInterval(intervalId);
        timer = 10;
        intervalId = setInterval(function(evt) {
            timer--;
            timer === 0 && handleAnswer();
            $.timer.text = timer + " out of 10 seconds remain";
        }, 1000);
    }
    function registerBackEvents() {
        $.answer1.removeEventListener("click", answer1Handler);
        $.answer2.removeEventListener("click", answer2Handler);
        $.answer3.removeEventListener("click", answer3Handler);
        $.backButton.removeEventListener("click", goBack);
        $.answer1Back.addEventListener("click", answer1Handler);
        $.answer2Back.addEventListener("click", answer2Handler);
        $.answer3Back.addEventListener("click", answer3Handler);
        $.backButton.addEventListener("click", goBack);
        clearInterval(intervalId);
        timer = 10;
        intervalId = setInterval(function(evt) {
            timer--;
            timer === 0 && handleAnswer();
            $.timerBack.text = timer + " out of 10 seconds remain";
        }, 1000);
    }
    function showNextQuestionFront() {
        timer = 10;
        $.questionLabel.text = quizList[curQuestion].question;
        $.answer1.title = quizList[curQuestion].answers[0];
        $.answer2.title = quizList[curQuestion].answers[1];
        $.answer3.title = quizList[curQuestion].answers[2];
    }
    function showNextQuestionBack() {
        timer = 10;
        $.questionLabelBack.text = quizList[curQuestion].question;
        $.answer1Back.title = quizList[curQuestion].answers[0];
        $.answer2Back.title = quizList[curQuestion].answers[1];
        $.answer3Back.title = quizList[curQuestion].answers[2];
    }
    function answer1Handler() {
        quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[0] && correctAnswers++;
        handleAnswer();
    }
    function answer2Handler() {
        quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[1] && correctAnswers++;
        handleAnswer();
    }
    function answer3Handler() {
        quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[2] && correctAnswers++;
        handleAnswer();
    }
    function handleAnswer() {
        curQuestion++;
        $.labelAnswered.text = correctAnswers + " of " + curQuestion + " correct";
        curQuestion < numberQuestions ? showNextQuestion() : goBack();
    }
    function goBack() {
        Alloy.createController("index");
    }
    function showNextQuestion(start) {
        if (start === "start") {
            showNextQuestionFront();
            registerFrontEvents("start");
            front = !0;
        } else if (front) {
            showNextQuestionBack();
            $.gameViewBack.left = -320;
            $.gameView.animate({
                left: 320,
                duration: 1500
            });
            $.gameViewBack.animate({
                left: 0,
                duration: 1500
            }, function() {
                registerBackEvents();
            });
            front = !1;
        } else {
            showNextQuestionFront();
            $.gameView.left = -320;
            $.gameViewBack.animate({
                left: 320,
                duration: 1500
            });
            $.gameView.animate({
                left: 0,
                duration: 1500
            }, function() {
                registerFrontEvents();
            });
            front = !0;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.gameHeader = A$(Ti.UI.createView({
        width: 320,
        height: 91,
        top: 0,
        left: -320,
        backgroundColor: "#000",
        id: "gameHeader"
    }), "View", null);
    $.addTopLevelView($.__views.gameHeader);
    $.__views.backButton = A$(Ti.UI.createButton({
        height: 40,
        width: 40,
        left: 20,
        top: 25,
        image: "/images/back.png",
        id: "backButton"
    }), "Button", $.__views.gameHeader);
    $.__views.gameHeader.add($.__views.backButton);
    $.__views.exitLabel = A$(Ti.UI.createLabel({
        top: 25,
        height: 40,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        color: "#FFF",
        text: "Exit",
        left: 70,
        right: 160,
        id: "exitLabel"
    }), "Label", $.__views.gameHeader);
    $.__views.gameHeader.add($.__views.exitLabel);
    $.__views.labelAnswered = A$(Ti.UI.createLabel({
        width: 200,
        top: 25,
        right: 20,
        height: 40,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        color: "#FFF",
        text: "0 of 0 correct",
        id: "labelAnswered"
    }), "Label", $.__views.gameHeader);
    $.__views.gameHeader.add($.__views.labelAnswered);
    $.__views.gameView = A$(Ti.UI.createView({
        top: 91,
        backgroundColor: "#000",
        layout: "vertical",
        title: "Game",
        height: 389,
        width: 320,
        left: -320,
        id: "gameView"
    }), "View", null);
    $.addTopLevelView($.__views.gameView);
    $.__views.questionLabel = A$(Ti.UI.createLabel({
        top: 20,
        color: "#FFF",
        font: {
            fontWeight: "bold",
            fontSize: 20
        },
        id: "questionLabel"
    }), "Label", $.__views.gameView);
    $.__views.gameView.add($.__views.questionLabel);
    $.__views.answer1 = A$(Ti.UI.createButton({
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
        id: "answer1"
    }), "Button", $.__views.gameView);
    $.__views.gameView.add($.__views.answer1);
    $.__views.answer2 = A$(Ti.UI.createButton({
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
        id: "answer2"
    }), "Button", $.__views.gameView);
    $.__views.gameView.add($.__views.answer2);
    $.__views.answer3 = A$(Ti.UI.createButton({
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
        id: "answer3"
    }), "Button", $.__views.gameView);
    $.__views.gameView.add($.__views.answer3);
    $.__views.timer = A$(Ti.UI.createLabel({
        top: 50,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        color: "#FFF",
        height: 40,
        text: "10 out of 10 seconds remain",
        id: "timer"
    }), "Label", $.__views.gameView);
    $.__views.gameView.add($.__views.timer);
    $.__views.gameViewBack = A$(Ti.UI.createView({
        top: 91,
        backgroundColor: "#000",
        layout: "vertical",
        title: "Game",
        height: 389,
        width: 320,
        left: -320,
        id: "gameViewBack"
    }), "View", null);
    $.addTopLevelView($.__views.gameViewBack);
    $.__views.questionLabelBack = A$(Ti.UI.createLabel({
        top: 20,
        color: "#FFF",
        font: {
            fontWeight: "bold",
            fontSize: 20
        },
        id: "questionLabelBack"
    }), "Label", $.__views.gameViewBack);
    $.__views.gameViewBack.add($.__views.questionLabelBack);
    $.__views.answer1Back = A$(Ti.UI.createButton({
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
        id: "answer1Back"
    }), "Button", $.__views.gameViewBack);
    $.__views.gameViewBack.add($.__views.answer1Back);
    $.__views.answer2Back = A$(Ti.UI.createButton({
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
        id: "answer2Back"
    }), "Button", $.__views.gameViewBack);
    $.__views.gameViewBack.add($.__views.answer2Back);
    $.__views.answer3Back = A$(Ti.UI.createButton({
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
        id: "answer3Back"
    }), "Button", $.__views.gameViewBack);
    $.__views.gameViewBack.add($.__views.answer3Back);
    $.__views.timerBack = A$(Ti.UI.createLabel({
        top: 50,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        color: "#FFF",
        height: 40,
        text: "10 out of 10 seconds remain",
        id: "timerBack"
    }), "Label", $.__views.gameViewBack);
    $.__views.gameViewBack.add($.__views.timerBack);
    _.extend($, $.__views);
    var year = 1910, front = !1, neutral = "#B20838", good = "#49FF1C", wrong = "#FF0000", timer = 10, intervalId = 0, curQuestion = 0, correctAnswers = 0, quizList = require("data").list, numberQuestions = quizList.length;
    showNextQuestion("start");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;