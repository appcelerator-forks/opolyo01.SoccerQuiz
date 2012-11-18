function Controller() {
    function playHandler() {
        $.game = Alloy.createController("game");
        $.homeWindow.add($.game.container);
        $.game.container.left = -320;
        $.game.container.animate({
            left: 0,
            duration: 1500
        });
        $.homeView.animate({
            left: 320,
            duration: 1000
        }, function() {
            $.homeWindow.remove($.homeView);
        });
    }
    function standingsHandler() {
        if (!Ti.App.Properties.getString("username")) addFBLogin(); else {
            $.standings = Alloy.createController("standings");
            $.homeWindow.add($.standings.container);
            $.standings.container.left = -320;
            $.standings.container.animate({
                left: 0,
                duration: 1500
            });
            $.homeView.animate({
                left: 320,
                duration: 1000
            }, function() {
                $.homeWindow.remove($.homeView);
            });
        }
    }
    function isUserRegistered(username) {
        var registered = !0;
        Cloud.Objects.query({
            classname: "users",
            page: 1,
            per_page: 10,
            where: {
                username: username
            }
        }, function(e) {
            if (e.success) {
                Ti.API.info("Success:\\nCount: " + e.users.length);
                e.users.length > 0 ? registered = !0 : registered = !1;
            } else {
                Ti.API.info("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
                registered = !0;
            }
        });
        return registered;
    }
    function insertUserACS(json) {
        if (!isUserRegistered(json.username)) {
            var acsJson = {
                classname: "users",
                fields: json
            };
            Cloud.Objects.create(acsJson, function(e) {
                e.success ? Ti.API.info(e) : alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
            });
        }
    }
    function addFBLogin() {
        function getUserInfo() {
            Ti.Facebook.requestWithGraphPath("me", {}, "GET", function(e) {
                if (e.success) {
                    var json = JSON.parse(e.result);
                    username.value = json.username;
                    Ti.App.Properties.setString("username", username.value);
                    insertUserACS(json);
                    debug || wina.close();
                } else e.error ? alert(e.error) : alert("Unknown response");
            });
        }
        var fb = Ti.Facebook.createLoginButton({
            top: 40,
            style: Ti.Facebook.BUTTON_STYLE_WIDE
        });
        Ti.Facebook.addEventListener("login", function(e) {
            e.success && getUserInfo();
        });
        Ti.Facebook.getLoggedIn() && getUserInfo();
        var wina = Ti.UI.createWindow({
            backgroundColor: "#fff",
            modal: !0,
            layout: "vertical",
            title: "Register"
        }), closeButton = Titanium.UI.createButton({
            title: "Close",
            width: 100,
            height: 25
        }), registerButton = Titanium.UI.createButton({
            title: "Register",
            width: 200,
            height: 40,
            top: 20,
            left: 40
        }), heading = Ti.UI.createLabel({
            top: 20,
            style: 0,
            color: "#333",
            text: "Register to gain ability compete in standings",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontWeight: "bold",
                fontSize: 22
            }
        }), userLabel = Ti.UI.createLabel({
            top: 20,
            style: 0,
            left: 40,
            text: "Username",
            color: "#3B5998",
            font: {
                fontWeight: "bold",
                fontSize: 18
            }
        }), username = Titanium.UI.createTextField({
            color: "#666666",
            textAlign: "left",
            left: 40,
            width: 200,
            top: 10,
            height: 30,
            font: {
                fontWeight: "plain",
                fontSize: 14
            },
            autocorrect: !1,
            borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
            keyboardType: Titanium.UI.KEYBOARD_ASCII,
            autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
        });
        closeButton.addEventListener("click", function() {
            wina.close();
        });
        registerButton.addEventListener("click", function() {
            Ti.App.Properties.setString("username", username.value);
            insertUserACS({
                username: username.value
            });
            wina.close();
        });
        wina.setLeftNavButton(closeButton);
        wina.add(heading);
        wina.add(fb);
        wina.add(userLabel);
        wina.add(username);
        wina.add(registerButton);
        wina.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.homeWindow = A$(Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "homeWindow",
        exitOnClose: "true"
    }), "Window", null);
    $.addTopLevelView($.__views.homeWindow);
    $.__views.homeView = A$(Ti.UI.createView({
        backgroundColor: "#000",
        layout: "vertical",
        title: "Home",
        id: "homeView"
    }), "View", $.__views.homeWindow);
    $.__views.homeWindow.add($.__views.homeView);
    $.__views.headingLabel = A$(Ti.UI.createLabel({
        top: 20,
        color: "#fff",
        left: 10,
        right: 10,
        style: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontWeight: "bold",
            fontSize: 24
        },
        text: "Check your soccer knowledge",
        id: "headingLabel"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.headingLabel);
    $.__views.line1 = A$(Ti.UI.createLabel({
        color: "#fff",
        height: 0,
        text: "Congrats, well done!",
        id: "line1"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.line1);
    $.__views.line2 = A$(Ti.UI.createLabel({
        color: "#fff",
        height: 0,
        text: "you answered 5 out 8 questions",
        id: "line2"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.line2);
    $.__views.line3 = A$(Ti.UI.createLabel({
        color: "#fff",
        height: 0,
        text: "What do you want to do next?",
        id: "line3"
    }), "Label", $.__views.homeView);
    $.__views.homeView.add($.__views.line3);
    $.__views.play = A$(Ti.UI.createButton({
        top: 40,
        left: 10,
        right: 10,
        style: 0,
        backgroundColor: "#B20838",
        height: 43,
        font: {
            fontWeight: "bold",
            fontSize: 24
        },
        title: "Take Quiz",
        id: "play"
    }), "Button", $.__views.homeView);
    $.__views.homeView.add($.__views.play);
    $.__views.standings = A$(Ti.UI.createButton({
        top: 10,
        left: 10,
        right: 10,
        style: 0,
        backgroundColor: "#B20838",
        height: 43,
        font: {
            fontWeight: "bold",
            fontSize: 24
        },
        title: "Standings",
        id: "standings"
    }), "Button", $.__views.homeView);
    $.__views.homeView.add($.__views.standings);
    $.__views.post = A$(Ti.UI.createTextArea({
        top: 20,
        left: "5dp",
        right: "5dp",
        height: 80,
        editable: !1,
        font: {
            fontSize: "14dp"
        },
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: !0,
        visible: !1,
        id: "post"
    }), "TextArea", $.__views.homeView);
    $.__views.homeView.add($.__views.post);
    $.__views.facebook = A$(Ti.UI.createView({
        top: 30,
        backgroundImage: "/images/post/btn-facebook-off.png",
        height: "30dp",
        width: "30dp",
        visible: !1,
        id: "facebook"
    }), "View", $.__views.homeView);
    $.__views.homeView.add($.__views.facebook);
    $.__views.twitter = A$(Ti.UI.createView({
        top: -30,
        left: 100,
        backgroundImage: "/images/post/btn-twitter-off.png",
        height: "30dp",
        width: "30dp",
        visible: !1,
        id: "twitter"
    }), "View", $.__views.homeView);
    $.__views.homeView.add($.__views.twitter);
    $.__views.submit = A$(Ti.UI.createButton({
        top: -30,
        right: 50,
        width: "65dp",
        height: "30dp",
        backgroundImage: "/images/post/btn-post-default.png",
        backgroundSelectedImage: "/images/post/btn-post-pressed.png",
        visible: !1,
        id: "submit"
    }), "Button", $.__views.homeView);
    $.__views.homeView.add($.__views.submit);
    _.extend($, $.__views);
    var Status = require("Status"), User = require("User"), Cloud = require("ti.cloud"), config = require("config"), debug = !1;
    config.setup();
    Cloud.Users.login({
        login: "opolyo01@yahoo.com",
        password: "mysecurepassword"
    }, function(e) {
        e.success ? Ti.API.info("loggedin into ACS") : alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
    });
    Ti.Facebook.permissions = [ "publish_stream" ];
    $.play.addEventListener("click", playHandler);
    $.standings.addEventListener("click", standingsHandler);
    var fbOn = !1;
    $.facebook.on("click", function() {
        if (!fbOn) {
            function setOn() {
                fbOn = !0;
                $.facebook.backgroundImage = "/images/post/btn-facebook-on.png";
            }
            User.confirmLogin.toFacebook() ? setOn() : User.linkToFacebook(function(e) {
                setOn();
            });
        } else {
            fbOn = !1;
            $.facebook.backgroundImage = "/images/post/btn-facebook-off.png";
        }
    });
    var twitterOn = !1;
    $.twitter.on("click", function() {
        if (!twitterOn) {
            function setOn() {
                twitterOn = !0;
                $.twitter.backgroundImage = "/images/post/btn-twitter-on.png";
            }
            User.confirmLogin.toTwitter() ? setOn() : User.linkToTwitter(function(e) {
                setOn();
            });
        } else {
            twitterOn = !1;
            $.twitter.backgroundImage = "/images/post/btn-twitter-off.png";
        }
    });
    $.submit.on("click", function() {
        var currentPost = $.post.value, args = {
            success: function(ev) {
                alert("success posting");
            },
            error: function(ev) {
                alert(ev);
            }
        };
        args.message = currentPost;
        Ti.API.info(currentPost);
        twitterOn && User.tweet(args);
        fbOn && User.facebookPost(args);
    });
    $.homeWindow.open();
    (!Ti.App.Properties.getString("username") || debug) && addFBLogin();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;