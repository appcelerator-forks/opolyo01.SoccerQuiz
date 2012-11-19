function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        layout: "vertical",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    _.extend($, $.__views);
    var fb = Ti.Facebook.createLoginButton({
        top: 20,
        style: Ti.Facebook.BUTTON_STYLE_WIDE
    });
    Ti.Facebook.addEventListener("login", function(e) {
        e.success && alert("Logged in");
    });
    $.container.add(fb);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;