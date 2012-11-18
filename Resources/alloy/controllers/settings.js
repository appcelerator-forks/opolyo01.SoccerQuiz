function Controller() {
    function getUserInfo() {
        Ti.Facebook.requestWithGraphPath("me", {}, "GET", function(e) {
            if (e.success) {
                Ti.API.info(e.result);
                alert(e.result);
            } else e.error ? alert(e.error) : alert("Unknown response");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    _.extend($, $.__views);
    var fb = Ti.Facebook.createLoginButton({
        top: 20,
        style: Ti.Facebook.BUTTON_STYLE_WIDE
    });
    Ti.Facebook.addEventListener("login", function(e) {
        if (e.success) {
            getUserInfo();
            alert("Logged in");
        }
    });
    $.container.add(fb);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;