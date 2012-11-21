var tableData = [ {title: 'Email'}, {title: 'Rate'}, {title: 'Load more quizes'}];
var table = Ti.UI.createTableView({
	top: 10,
  	data: tableData,
  	height: 170
});
var networkSupportLabel = Ti.UI.createLabel({
	text: "Store quiz data locally",
	top: 200,
	left: 20,
	width: 200,
	color: "#fff"
});
var networkSupport = Ti.UI.createSwitch({
	top: 200,
	left: 230,
	value:false 
});
var pushSupportLabel = Ti.UI.createLabel({
	text: "Enable push notifications",
	top: 240,
	left: 20,
	width: 200,
	color: "#fff"
});
var pushSupport = Ti.UI.createSwitch({
	top: 240,
	left: 230,
	value:false 
});
var buyMore = Ti.UI.createButton({
	top: 300,
	left: 50,
	width: 250,
	title:"Buy more quizzes (500 - $.99)"
});
$.container.add(table);
$.container.add(networkSupportLabel);
$.container.add(networkSupport);
$.container.add(pushSupportLabel);
$.container.add(pushSupport);
$.container.add(buyMore);