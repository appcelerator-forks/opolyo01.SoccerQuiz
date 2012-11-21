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

User.login = function(cb) {
    Cloud.Users.login({
        login: "opolyo01@yahoo.com",
        password: "mysecurepassword"
    }, function(e) {
        e.success ? Ti.API.info("loggedin into ACS") : alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        cb.call(this, {
            status: e.success
        });
    });
};

User.update = function(obj, json) {
    Cloud.Objects.update({
        classname: "users",
        id: obj.id,
        fields: json
    }, function(e) {
        e.success ? Ti.API.info("added quiz results") : alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
    });
};

User.getAllUsers = function(cb) {
    var json;
    Cloud.Objects.query({
        classname: "users",
        page: 1,
        per_page: 30
    }, function(e) {
        if (e.success) {
            if (e.users.length > 0) {
                json = e.users;
                Ti.API.info("Success:\\nCount: " + e.users.length);
            }
        } else Ti.API.info("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        cb.call(this, json);
    });
};

User.getUser = function(cb) {
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
};

User.isUserRegistered = function(username, cb) {
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
};

User.insertUserACS = function(json) {
    User.isUserRegistered(json.username, function(resp) {
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