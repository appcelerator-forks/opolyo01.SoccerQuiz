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
    function isUserRegistered(username, cb) {
        var json = {
            exist: !1
        };
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
                e.users.length > 0 && (json = {
                    exist: !0
                });
            }
            cb.call(this, json);
        });
    }
    function insertUserACS(json) {
        isUserRegistered(json.username, function(resp) {
            if (!resp.exist) {
                var acsJson = {
                    classname: "users",
                    fields: json
                };
                Cloud.Objects.create(acsJson, function(e) {
                    e.success ? Ti.API.info(e) : alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
                });
            } else alert("this username already exist pick another one");
        });
    }
    function addFBLogin() {
        function getUserInfo() {
            Ti.Facebook.requestWithGraphPath("me", {}, "GET", function(e) {
                if (e.success) {
                    var json = JSON.parse(e.result);
                    username.value = json.username;
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
        username.addEventListener("focus", function() {
            wina.top = -120;
            wina.animate({
                bottom: 166,
                duration: 500
            });
        });
        username.addEventListener("blur", function() {
            wina.top = 0;
            wina.animate({
                bottom: 0,
                duration: 500
            });
        });
        wina.addEventListener("click", function() {
            username.blur();
        });
        registerButton.addEventListener("click", function() {
            Ti.App.Properties.setString("username", username.value);
            insertUserACS({
                username: username.value
            });
            Ti.App.Properties.setString("username", username.value);
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
    function getUser(cb) {
        var json;
        Cloud.Objects.query({
            classname: "users",
            page: 1,
            per_page: 10,
            where: {
                username: Ti.App.Properties.getString("username")
            }
        }, function(e) {
            if (e.success) {
                if (e.users.length > 0) {
                    json = e.users;
                    Ti.API.info("Success:\\nCount: " + e.users.length);
                }
            } else Ti.API.info("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
            cb.call(this, json);
        });
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
    $.__views.post = A$(Ti.UI.createTextArea({
        top: 20,
        left: "5dp",
        right: "5dp",
        height: 80,
        font: {
            fontSize: "14dp"
        },
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: !0,
        visible: !0,
        id: "post"
    }), "TextArea", $.__views.homeView);
    $.__views.homeView.add($.__views.post);
    $.__views.facebook = A$(Ti.UI.createView({
        top: 30,
        backgroundImage: "/images/post/btn-facebook-off.png",
        height: "30dp",
        width: "30dp",
        visible: !0,
        id: "facebook"
    }), "View", $.__views.homeView);
    $.__views.homeView.add($.__views.facebook);
    $.__views.twitter = A$(Ti.UI.createView({
        top: -30,
        left: 100,
        backgroundImage: "/images/post/btn-twitter-off.png",
        height: "30dp",
        width: "30dp",
        visible: !0,
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
        visible: !0,
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
    $.post.on("focus", function() {
        $.homeWindow.top = -120;
        $.homeWindow.animate({
            bottom: 166,
            duration: 500
        });
    });
    $.post.on("blur", function() {
        $.homeWindow.top = 0;
        $.homeWindow.animate({
            bottom: 0,
            duration: 500
        });
    });
    $.homeWindow.on("click", function() {
        $.post.blur();
    });
    $.submit.on("click", function() {
        var currentPost = $.post.value, args = {
            success: function(ev) {
                alert("success posting");
                $.post.value = "";
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
    !Ti.App.Properties.getString("username") || debug ? addFBLogin() : getUser(function(json) {
        if (!json) {
            Ti.App.Properties.setString("username", undefined);
            addFBLogin();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;