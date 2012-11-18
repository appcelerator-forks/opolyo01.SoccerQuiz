function Status() {}

var Cloud = require("ti.cloud"), User = require("User"), moment = require("moment");

Status.create = function(args, cb) {
    if (!Ti.Network.online) {
        cb({
            success: !1
        });
        return;
    }
    var avatar = User.generateAvatarURL(), user = User.getUserDetails();
    Cloud.Statuses.create({
        message: args.message,
        photo: args.photo,
        custom_fields: {
            avatar: avatar,
            name: user.attributes.firstname + " " + user.attributes.lastname,
            org: user.attributes.organization
        }
    }, function(e) {
        e.success ? e.status = e.statuses[0] : Ti.API.error(e);
        cb(e);
    });
};

Status.query = function(cb, limit) {
    if (!Ti.Network.online) {
        cb({
            success: !1
        });
        return;
    }
    Cloud.Statuses.query({
        limit: limit || 50,
        response_json_depth: 8,
        order: "-created_at"
    }, function(e) {
        cb(e);
    });
};

module.exports = Status;