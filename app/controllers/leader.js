var year = 1990,
	front = true;

showNextQuestion("start");

function answer1Handler(){
	showNextQuestion();
}
function answer2Handler(){
	showNextQuestion();
}
function answer3Handler(){
	showNextQuestion();
}

function remove(view){
	var children = view.getChildren();
	for(var i=0, iL=children.length;i<iL;++i){
		view.remove(children[i]);
	}
}
function repaint(view){
	var children = view.getChildren(),
		heading = children[0],
		answer1 = children[1],
		answer2 = children[2],
		answer3 = children[3];
	
	heading.text = "Who won the world cup in " + year + "?";
	answer1.title = "Greece";
	answer2.title = "Italy";
	answer3.title = "Moroco";
}

function insertGame(view){
	var answer1 = Titanium.UI.createButton({
		title : 'USA',
		top : 10,
		width : 200,
		height : 30,
		background : "#abc"
	});
	var answer2 = Titanium.UI.createButton({
		title : 'Russia',
		top : 10,
		width : 200,
		height : 30,
		background : "#abc"
	});
	var answer3 = Titanium.UI.createButton({
		title : 'France',
		top : 10,
		width : 200,
		height : 30,
		background : "#abc"
	});
	var goback = Titanium.UI.createButton({
		title : 'Home',
		top : 40,
		width : 200,
		height : 30,
		background : "#abc"
	});
	var questionLabel = Ti.UI.createLabel({
		text : "Who won the world cup in " + year + "?",
		top : 20
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

function showNextQuestion(start){
	year += 4;
	if(start === "start"){
		insertGame($.gameView);
	}
	else if(front){
		if($.gameViewBack.getChildren().length === 0){
			insertGame($.gameViewBack);
		}
		else{
			repaint($.gameViewBack);
		}
		$.gameViewBack.left = -320;
		$.gameView.animate({left:320, duration:1500});
		$.gameViewBack.animate({left:0, duration:1500});
		front = false;
	}
	else{
		repaint($.gameView);
		$.gameView.left = -320;
		$.gameViewBack.animate({left:320, duration:1500});
		$.gameView.animate({left:0, duration:1500});
		front = true;
	}
}
function goBack(){
	Alloy.createController('index');
}