function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        backgroundColor: "#fff",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    _.extend($, $.__views);
    var User = require("User"), data = [], tableData = [], debug = !1;
    User.getAllUsers(function(res) {
        data = res;
        Ti.API.info(res);
        for (var i = 0, iL = data.length; i < iL; ++i) {
            var backgroundRow = "#fff";
            Ti.App.Properties.getString("username") === data[i].username && (backgroundRow = "#363946");
            var row = Ti.UI.createTableViewRow({
                className: "forumEvent",
                selectedBackgroundColor: backgroundRow,
                backgroundColor: backgroundRow,
                rowIndex: i,
                height: 30
            }), userName = Ti.UI.createLabel({
                color: "#576996",
                font: {
                    fontFamily: "Arial",
                    fontSize: 14,
                    fontWeight: "bold"
                },
                text: data[i].username,
                left: 10,
                width: 150,
                height: 25
            }), totalScore = Ti.UI.createLabel({
                color: "#576996",
                font: {
                    fontFamily: "Arial",
                    fontSize: 18,
                    fontWeight: "bold"
                },
                text: data[i].totalPoints + " points",
                left: 170,
                width: 150,
                height: 25
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;