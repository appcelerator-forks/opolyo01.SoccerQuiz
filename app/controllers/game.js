var year = 1910,
	front = false,
	neutral = "#B20838",
	good = "#49FF1C",
	wrong = "#FF0000",
	timer = 10,
	intervalId = 0,
	curQuestion = 0,
	correctAnswers = 0,
	quizList = require("data").list,
	numberQuestions = quizList.length;
	
showNextQuestion("start");

function registerFrontEvents(start){
	if(start !== "start"){
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
	intervalId = setInterval(function(evt){
		timer--;
		if(timer === 0){
			handleAnswer();
		}
		$.timer.text = timer + " out of 10 seconds remain";
	}, 1000);
}

function registerBackEvents(){
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
	intervalId = setInterval(function(evt){
		timer--;
		if(timer === 0){
			handleAnswer();
		}
		$.timerBack.text = timer + " out of 10 seconds remain";
	}, 1000);
}

function showNextQuestionFront(){
	timer = 10;
	$.questionLabel.text = quizList[curQuestion].question;
	$.answer1.title = quizList[curQuestion].answers[0];
	$.answer2.title = quizList[curQuestion].answers[1];
	$.answer3.title = quizList[curQuestion].answers[2];
}

function showNextQuestionBack(){
	timer = 10;
	$.questionLabelBack.text = quizList[curQuestion].question;
	$.answer1Back.title = quizList[curQuestion].answers[0];
	$.answer2Back.title = quizList[curQuestion].answers[1];
	$.answer3Back.title = quizList[curQuestion].answers[2];
}

function answer1Handler(){
	if(quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[0]){
		correctAnswers++;
	}
	handleAnswer();
}
function answer2Handler(){
	if(quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[1]){
		correctAnswers++;
	}
	handleAnswer();
}
function answer3Handler(){
	if(quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[2]){
		correctAnswers++;
	}
	handleAnswer();
}

function handleAnswer(){
	curQuestion++;
	$.labelAnswered.text = correctAnswers + " of "+curQuestion+ " correct";
	if(curQuestion < numberQuestions){
		showNextQuestion();
	}
	else{
		goBack();
	}
}
function goBack(){
	Alloy.createController('index');
}

function showNextQuestion(start){
	if(start === "start"){
		showNextQuestionFront();
		registerFrontEvents("start");
		front = true;
	}
	else if(front){
		showNextQuestionBack();
		$.gameViewBack.left = -320;
		$.gameView.animate({left:320, duration:1500});
		$.gameViewBack.animate({left:0, duration:1500}, function(){
			registerBackEvents();
		});
		front = false;
	}
	else{
		showNextQuestionFront();
		$.gameView.left = -320;
		$.gameViewBack.animate({left:320, duration:1500});
		$.gameView.animate({left:0, duration:1500}, function(){
			registerFrontEvents();
		});
		front = true;
	}
}