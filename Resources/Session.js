function Session() {}

var Cloud = require("ti.cloud"), moment = require("moment"), sessions = [], days = {
    sunday: [],
    monday: [],
    tuesday: []
}, monDate = moment("Oct 22, 2012"), tueDate = moment("Oct 23, 2012");

Session.getAll = function(callback) {
    if (!Ti.Network.online) {
        callback({
            success: !1
        });
        return;
    }
    sessions.length > 0 ? callback({
        success: !0,
        sessions: sessions
    }) : Cloud.Events.query({
        per_page: 100,
        page: 1,
        order: "start_time"
    }, function(e) {
        if (e.success) {
            sessions = e.events;
            e.sessions = sessions;
        }
        callback(e);
    });
};

Session.getNext = function(cb) {
    if (!Ti.Network.online) {
        cb({
            success: !1
        });
        return;
    }
    Cloud.Events.query({
        page: 1,
        per_page: 100,
        order: "start_time"
    }, function(e) {
        var next;
        if (e.success) {
            var now = moment();
            for (var i = 0, l = e.events.length; i < l; i++) {
                var s = e.events[i], sessTime = moment(s.start_time);
                if (sessTime.diff(now) >= 0) {
                    next = s;
                    break;
                }
            }
        }
        cb({
            next: next,
            success: e.success
        });
    });
};

Session.getForDay = function(dateString, cb) {
    if (!Ti.Network.online) {
        cb({
            success: !1
        });
        return;
    }
    if (days[dateString].length > 0) {
        cb({
            success: !0,
            sessions: days[dateString]
        });
        return;
    }
    Cloud.Events.query({
        page: 1,
        per_page: 100,
        order: "start_time"
    }, function(e) {
        if (e.success) {
            var sessions = e.events;
            for (var i = 0, l = sessions.length; i < l; i++) {
                var session = sessions[i], sessionStart = moment(session.start_time);
                sessionStart.diff(monDate) < 0 ? days.sunday.push(session) : sessionStart.diff(tueDate) < 0 ? days.monday.push(session) : days.tuesday.push(session);
            }
        }
        e.sessions = days[dateString];
        cb(e);
    });
};

module.exports = Session;