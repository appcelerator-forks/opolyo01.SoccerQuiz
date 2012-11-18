function Controller() {
    function goBack() {
        var index = Alloy.createController("index");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        backgroundColor: "#fff",
        layout: "vetical",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    $.__views.backButton = A$(Ti.UI.createButton({
        top: 10,
        left: 10,
        title: "Back",
        id: "backButton"
    }), "Button", $.__views.container);
    $.__views.container.add($.__views.backButton);
    var __alloyId1 = [];
    $.__views.sectionFruit = A$(Ti.UI.createTableViewSection({
        id: "sectionFruit",
        headerTitle: "Top Performers"
    }), "TableViewSection", null);
    __alloyId1.push($.__views.sectionFruit);
    $.__views.__alloyId2 = A$(Ti.UI.createTableViewRow({
        title: "Oleg",
        id: "__alloyId2"
    }), "TableViewRow", $.__views.sectionFruit);
    $.__views.sectionFruit.add($.__views.__alloyId2);
    $.__views.__alloyId3 = A$(Ti.UI.createTableViewRow({
        title: "Mike",
        id: "__alloyId3"
    }), "TableViewRow", $.__views.sectionFruit);
    $.__views.sectionFruit.add($.__views.__alloyId3);
    $.__views.__alloyId4 = A$(Ti.UI.createTableViewRow({
        title: "Sam",
        id: "__alloyId4"
    }), "TableViewRow", $.__views.sectionFruit);
    $.__views.sectionFruit.add($.__views.__alloyId4);
    $.__views.__alloyId5 = A$(Ti.UI.createTableViewRow({
        title: "Andrew",
        id: "__alloyId5"
    }), "TableViewRow", $.__views.sectionFruit);
    $.__views.sectionFruit.add($.__views.__alloyId5);
    $.__views.table = A$(Ti.UI.createTableView({
        top: 70,
        data: __alloyId1,
        id: "table"
    }), "TableView", $.__views.container);
    $.__views.container.add($.__views.table);
    _.extend($, $.__views);
    $.backButton.addEventListener("click", goBack);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;