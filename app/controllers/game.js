var	front = false,
	neutral = "#B20838",
	good = "#49FF1C",
	wrong = "#FF0000",
	timer = 10,
	intervalId = 0,
	curQuestion = 0,
	correctAnswers = 0,
	idx,
	totalPoints = 0,
	Cloud = require('ti.cloud'),
	quizList = require("data").list,
	numberQuestions = quizList.length;
	
showNextQuestion("start");

function registerResultsEvents(){
	$.startOver.addEventListener("click", goBack);
}

function registerFrontEvents(start){
	$.answer1Back.backgroundColor=neutral;
	$.answer2Back.backgroundColor=neutral;
	$.answer3Back.backgroundColor=neutral;
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
	$.answer1.backgroundColor=neutral;
	$.answer2.backgroundColor=neutral;
	$.answer3.backgroundColor=neutral;
	
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

function answer1Handler(e){
	if(quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[0]){
		correctAnswers++;
		this.backgroundColor=good;
	}
	else{
		selectCorrect();
		this.backgroundColor=wrong;
	}
	handleAnswer();
}
function answer2Handler(e){
	if(quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[1]){
		correctAnswers++;
		this.backgroundColor=good;
	}
	else{
		selectCorrect();
		this.backgroundColor=wrong;
	}
	handleAnswer();
}
function answer3Handler(e){
	if(quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[2]){
		correctAnswers++;
		this.backgroundColor=good;
	}
	else{
		selectCorrect();
		this.backgroundColor=wrong;
	}
	handleAnswer();
}

function selectCorrect(){
	if(quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[0]){
		if(!front){
			$.answer1Back.backgroundColor=good;
		}
		else{
			$.answer1.backgroundColor=good;
		}
		
	}
	else if(quizList[curQuestion].correctAnswer === quizList[curQuestion].answers[1]){
		if(!front){
			$.answer2Back.backgroundColor=good;
		}
		else{
			$.answer2.backgroundColor=good;
		}
	}
	else{
		if(!front){
			$.answer3Back.backgroundColor=good;
		}
		else{
			$.answer3.backgroundColor=good;
		}
	}
}
function handleAnswer(){
	curQuestion++;
	$.labelAnswered.text = correctAnswers + " of "+curQuestion+ " correct";
	if(curQuestion < numberQuestions){
		showNextQuestion();
	}
	else{
		clearInterval(intervalId);
		updateTotal();
	}
}

function showAnswerPage(){
	var percentCorrect = parseInt((correctAnswers/numberQuestions)*100, 10);
	var line1Text = percentCorrect > 60 ? "Congrats, well done!" : "Can do better next time",
		line2Text = "you answered " +correctAnswers +" out "+numberQuestions +" questions";
	var index = Alloy.createController('index');
	//Need to write to db
	index.headingLabel.height = 0;
    index.line1.height = 30;
    index.line1.text = line1Text;
    index.line2.height = 30;
    index.line2.text = line2Text;
    index.line3.height = 30;
    index.post.value = "I just scored " +correctAnswers +" out of "+numberQuestions +" on SoccerQuiz. I have "+totalPoints +" total points";
    index.post.visible = true;
    index.facebook.visible = true;
    index.twitter.visible = true;
    index.submit.visible = true;
}


function getUser(cb){
	var json;
	Cloud.Objects.query({
		classname : 'users',
		page: 1,
	    per_page: 10,
	    where: {
	        "username": Ti.App.Properties.getString("username")
	    }
	}, function(e) {
		if (e.success) {
			if(e.users.length > 0){
				json = e.users;
			}
			Ti.API.info('Success:\\n' + 'Count: ' + e.users.length);
			cb.call(this, json);
		} 
		else {
			Ti.API.info('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			cb.call(this, json);
		}
	}); 

}
function updateTotal(){
	getUser(function(json){
		if(!json){
			return;
		}
		var obj = json[0];
		var quizResults = obj.quizResults ? obj.quizResults:[];
		var total = 0;
		quizResults.push(correctAnswers);
		quizResults.forEach(function(el){total+=el;});
		totalPoints = total;
		
		Ti.API.info(totalPoints);
		showAnswerPage();
		if(obj){
			//Ti.API.info(json);
			Ti.API.info(obj);
			Ti.API.info(obj.id);
			Cloud.Objects.update({
				classname : 'users',
					id : obj.id,
					fields : {
						totalPoints :total,
						quizResults : quizResults
					}
				}, function(e) {
					if (e.success) {
						Ti.API.info("added quiz results");
					} else {
						alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
					}
			}); 
		}
	});
}

function goBack(){
	clearInterval(intervalId);
	var index = Alloy.createController('index');
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