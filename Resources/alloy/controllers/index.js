function Controller() {
    function loadQuizes(json) {
        for (var i = 0, iL = quizList.length; i < iL; ++i) {
            console.log(quizList[i]);
            var acsJson = {
                classname: "quizes",
                fields: quizList[i]
            };
            Cloud.Objects.create(acsJson, function(e) {
                console.log(e);
            });
        }
    }
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.tabGroup = A$(Ti.UI.createTabGroup({
        backgroundColor: "#000",
        id: "tabGroup"
    }), "TabGroup", null);
    $.__views.homeWindow = A$(Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "homeWindow",
        exitOnClose: "true",
        navBarHidden: "true"
    }), "Window", null);
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
    $.__views.tab1 = A$(Ti.UI.createTab({
        window: $.__views.homeWindow,
        id: "tab1",
        title: "Home",
        icon: "KS_nav_views.png"
    }), "Tab", null);
    $.__views.tabGroup.addTab($.__views.tab1);
    $.__views.win3 = A$(Ti.UI.createWindow({
        id: "win3",
        title: "Standing"
    }), "Window", null);
    $.__views.standings = Alloy.createController("standings", {
        id: "standings"
    });
    $.__views.standings.setParent($.__views.win3);
    $.__views.tab2 = A$(Ti.UI.createTab({
        window: $.__views.win3,
        id: "tab2",
        title: "Standing",
        icon: "KS_nav_views.png"
    }), "Tab", null);
    $.__views.tabGroup.addTab($.__views.tab2);
    $.__views.win3 = A$(Ti.UI.createWindow({
        id: "win3",
        title: "Settings"
    }), "Window", null);
    $.__views.settings = Alloy.createController("settings", {
        id: "settings"
    });
    $.__views.settings.setParent($.__views.win3);
    $.__views.tab3 = A$(Ti.UI.createTab({
        window: $.__views.win3,
        id: "tab3",
        title: "Settings",
        icon: "KS_nav_views.png"
    }), "Tab", null);
    $.__views.tabGroup.addTab($.__views.tab3);
    $.addTopLevelView($.__views.tabGroup);
    _.extend($, $.__views);
    var Status = require("Status"), User = require("User"), Cloud = require("ti.cloud"), config = require("config"), ui = require("ui"), quizList = require("data").list, debug = !1;
    config.setup();
    User.login(function(json) {});
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
    $.tab2.on("focus", function() {
        (!Ti.App.Properties.getString("username") || debug) && ui.FBLogin();
    });
    $.tabGroup.open();
    !Ti.App.Properties.getString("username") || debug ? ui.FBLogin() : User.getUser(function(json) {
        if (!json) {
            Ti.App.Properties.setString("username", undefined);
            ui.FBLogin();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;