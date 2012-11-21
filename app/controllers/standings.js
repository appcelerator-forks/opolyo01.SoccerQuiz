var User = require('User'),
	data = [],
	tableData = [],
	debug = false;

User.getAllUsers(function(res){
	data = res;
	Ti.API.info(res);
	for(var i=0,iL=data.length;i<iL;++i){
		var backgroundRow = "#fff";
		if(Ti.App.Properties.getString("username") === data[i].username){
			backgroundRow = "#363946";
		}
		var row = Ti.UI.createTableViewRow({
			className : 'forumEvent', // used to improve table performance
			selectedBackgroundColor : backgroundRow,
			backgroundColor: backgroundRow,
			rowIndex : i, // custom property, useful for determining the row during events
			height : 30
		});

		var userName = Ti.UI.createLabel({
			color : '#576996',
			font : {
				fontFamily : 'Arial',
				fontSize : 14,
				fontWeight : 'bold'
			},
			text : data[i].username,
			left : 10,
			width : 150,
			height : 25
		});
		var totalScore = Ti.UI.createLabel({
			color : '#576996',
			font : {
				fontFamily : 'Arial',
				fontSize : 18,
				fontWeight : 'bold'
			},
			text : data[i].totalPoints + " points",
			left : 170,
			width : 150,
			height : 25
		});
		row.add(userName);
		row.add(totalScore);
		tableData.push(row);
	}
	Ti.API.info(tableData);
	var table = Ti.UI.createTableView({
		top: 10,
  		data: tableData
	});
	$.container.add(table);
});