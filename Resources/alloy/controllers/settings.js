function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    _.extend($, $.__views);
    var tableData = [ {
        title: "Email"
    }, {
        title: "Rate"
    }, {
        title: "Load more quizes"
    } ], table = Ti.UI.createTableView({
        top: 10,
        data: tableData,
        height: 170
    }), networkSupportLabel = Ti.UI.createLabel({
        text: "Store quiz data locally",
        top: 200,
        left: 20,
        width: 200,
        color: "#fff"
    }), networkSupport = Ti.UI.createSwitch({
        top: 200,
        left: 230,
        value: !1
    }), pushSupportLabel = Ti.UI.createLabel({
        text: "Enable push notifications",
        top: 240,
        left: 20,
        width: 200,
        color: "#fff"
    }), pushSupport = Ti.UI.createSwitch({
        top: 240,
        left: 230,
        value: !1
    }), buyMore = Ti.UI.createButton({
        top: 300,
        left: 50,
        width: 250,
        title: "Buy more quizzes (500 - $.99)"
    });
    $.container.add(table);
    $.container.add(networkSupportLabel);
    $.container.add(networkSupport);
    $.container.add(pushSupportLabel);
    $.container.add(pushSupport);
    $.container.add(buyMore);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;