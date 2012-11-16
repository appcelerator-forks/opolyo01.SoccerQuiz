var year = 1910,
	front = false,
	neutral = "#B20838",
	good = "#49FF1C",
	wrong = "#FF0000",
	timer = 10,
	intervalId = 0,
	curQuestion = 1;
	
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
			$.labelAnswered.text = 1 + " of "+curQuestion+ " correct";
			curQuestion++;
			showNextQuestion();
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
			$.labelAnswered.text = 1 + " of "+curQuestion+ " correct";
			curQuestion++;
			showNextQuestion();
		}
		$.timerBack.text = timer + " out of 10 seconds remain";
	}, 1000);
}

function showNextQuestionFront(){
	timer = 10;
	$.questionLabel.text = "Who won the world cup in " + year + "?";
	$.answer1.title = "Greece";
	$.answer2.title = "Italy";
	$.answer3.title = "Moroco";
}

function showNextQuestionBack(){
	timer = 10;
	$.questionLabelBack.text = "Who won the world cup in " + year + "?";
	$.answer1Back.title = "Russia";
	$.answer2Back.title = "Mexico";
	$.answer3Back.title = "Spain";
}

function answer1Handler(){
	$.labelAnswered.text = 1 + " of "+curQuestion+ " correct";
	curQuestion++;
	showNextQuestion();
}
function answer2Handler(){
	$.labelAnswered.text = 1 + " of "+curQuestion+ " correct";
	curQuestion++;
	showNextQuestion();
}
function answer3Handler(){
	$.labelAnswered.text = 1 + " of "+curQuestion+ " correct";
	curQuestion++;
	showNextQuestion();
}
function goBack(){
	Alloy.createController('index');
}

function showNextQuestion(start){
	year += 4;
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