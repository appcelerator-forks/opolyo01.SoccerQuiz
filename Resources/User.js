function User() {}

var Cloud = require("ti.cloud"), Gravitas = require("gravitas"), social = require("alloy/social"), twitter = social.create({
    consumerSecret: Ti.App.Properties.getString("twitter.consumerSecret"),
    consumerKey: Ti.App.Properties.getString("twitter.consumerKey")
});

User.confirmLogin = function() {
    var auth = !1;
    if (Ti.App.Properties.hasProperty("sessionId")) {
        Cloud.sessionId = Ti.App.Properties.getString("sessionId");
        auth = !0;
    }
    return auth;
};

User.confirmLogin.toFacebook = function() {
    return Ti.Facebook.loggedIn;
};

User.confirmLogin.toTwitter = function() {
    return twitter.isAuthorized();
};

User.linkToFacebook = function(cb) {
    Ti.Facebook.addEventListener("login", function(e) {
        cb && cb(e);
    });
    Ti.Facebook.authorize();
};

User.logoutFacebook = function(cb) {
    Ti.Facebook.addEventListener("logout", function(e) {
        cb && cb(e);
    });
    Ti.Facebook.logout();
};

User.linkToTwitter = function(cb) {
    twitter.authorize(cb);
};

User.logoutTwitter = function(cb) {
    twitter.deauthorize();
    cb && cb();
};

User.tweet = function(args) {
    twitter.share({
        message: args.message,
        success: args.success,
        error: args.error
    });
};

User.facebookPost = function(args) {
    if (!Ti.Network.online) {
        args.error({
            success: !1
        });
        return;
    }
    args.image ? Ti.Facebook.requestWithGraphPath("me/photos", {
        message: args.message,
        picture: args.image
    }, "POST", function(e) {
        e.success ? args.success && args.success(e) : args.error && args.error(e);
    }) : Ti.Facebook.requestWithGraphPath("me/feed", {
        message: args.message
    }, "POST", function(e) {
        e.success ? args.success && args.success(e) : args.error && args.error(e);
    });
};

User.login = function(username, password, success, error) {
    if (!Ti.Network.online) {
        error({
            success: !1
        });
        return;
    }
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function() {
        Ti.API.info("Status Code: " + xhr.status);
        Ti.API.info("Set-Cookie: " + xhr.getResponseHeader("Set-Cookie"));
        Ti.API.info("responseText: " + xhr.responseText);
        try {
            if (xhr.status == 200) {
                var sessionId = "", userDetails;
                if (this.responseText) {
                    Ti.App.Properties.setString("networkDetails", this.responseText);
                    userDetails = JSON.parse(this.responseText);
                    sessionId = userDetails.sid;
                }
                Cloud.SocialIntegrations.externalAccountLogin({
                    id: userDetails.guid,
                    type: "appc",
                    token: sessionId
                }, function(e) {
                    if (e.success) {
                        Ti.App.Properties.setString("sessionId", Cloud.sessionId);
                        success(userDetails);
                    } else {
                        Ti.API.error("Social Integration Error: " + e);
                        error(xhr);
                    }
                });
            } else {
                Ti.API.error("Error code received from server: " + xhr);
                error(xhr);
            }
        } catch (e) {
            Ti.API.error("Exception processing response: " + e);
            error(xhr);
        }
    };
    xhr.onerror = function() {
        Ti.API.error("Login Request Error:");
        Ti.API.error("Status Code: " + xhr.status);
        Ti.API.error("Set-Cookie: " + xhr.getResponseHeader("Set-Cookie"));
        Ti.API.error("responseText: " + xhr.responseText);
        error(xhr);
    };
    xhr.open("POST", "https://api.appcelerator.net/p/v1/sso-login");
    xhr.send({
        un: username,
        pw: password,
        mid: Ti.Platform.id
    });
};

User.getUserDetails = function() {
    var deets;
    if (Ti.App.Properties.hasProperty("networkDetails")) try {
        deets = JSON.parse(Ti.App.Properties.getString("networkDetails"));
    } catch (e) {
        Ti.API.error("Error parsing user details: " + e);
    }
    return deets;
};

User.generateAvatarURL = function() {
    if (Ti.App.Properties.hasProperty("profileImage")) return Ti.App.Properties.getString("profileImage");
    var deets = User.getUserDetails();
    return Gravitas.createGravatar({
        email: deets.email,
        size: 44
    });
};

User.logout = function(cb) {
    if (!Ti.Network.online) {
        cb({
            success: !1
        });
        return;
    }
    Cloud.Users.logout(function(e) {
        if (e.success) {
            User.confirmLogin.toFacebook() && User.logoutFacebook();
            User.confirmLogin.toTwitter() && User.logoutTwitter();
            Ti.App.Properties.removeProperty("sessionId");
        }
        cb(e);
    });
};

User.assignProfilePhoto = function(blob, cb) {
    if (!Ti.Network.online) {
        cb({
            success: !1
        });
        return;
    }
    Cloud.Users.update({
        photo: blob
    }, function(e) {
        var usr = e.users[0];
        if (e.success) {
            Cloud.Users.showMe(function(ev) {
                if (ev.success) {
                    var me = ev.users[0];
                    Ti.App.Properties.setString("profileImage", me.photo.urls.square_75);
                }
                cb(e);
            });
            cb(e);
        }
        cb(e);
    });
};

module.exports = User;