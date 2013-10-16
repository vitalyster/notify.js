var _ = require('underscore');


function Notifications(opts, fallback) {
    this.permission = '';
    this.opts = _.extend({
        icon: '/images/applogo.png',
        dir: 'auto',
        lang: '',
        body: '',
        tag: ''
    }, opts);

    this.fallback = _.extend({
        permission: 'default',
        requestPermission: function (cb) {
            cb('default');
        },
        create: function (title, opts) {
        }
    });
}

Notifications.prototype.create = function (title, opts) {
    opts = _.extend(this.opts, opts);
    var notice;

    if (window.macgap) {
        window.macgap.growl.notify(_.extend({
            title: title,
            description: opts.body
        }, opts));
    } else if (window.fluid) {
        window.fluid.showGrowlNotification(_.extend({
            title: title,
            description: opts.body
        }, opts));
    } else if (window.Notification) {
        notice = new window.Notification(title, opts);
        setTimeout(function () {
            notice.cancel();
        }, 5000);
    } else if (window.webkitNotifications) {
        notice = window.webkitNotifications.createNotification(opts.icon, title, opts.body);
        _.extend(notice, opts);
        notice.show();
        setTimeout(function () {
            notice.cancel();
        }, 5000);
    } else {
        this.fallback.create(title, opts);
    }
};

Notifications.prototype.permissionNeeded = function () {
    if (window.macgap) {
        return false;
    } else if (window.fluid) {
        return false;
    } else if (window.Notification) {
        return window.Notification.permission !== 'granted';
    } else if (window.webkitNotifications) {
        return window.webkitNotifications.checkPermission() !== 1;
    } else {
        return this.fallback.permission !== 'granted';
    }
};

Notifications.prototype.allowed = function () {
    if (window.macgap) {
        return true;
    } else if (window.fluid) {
        return true;
    } else if (window.Notification) {
        return window.Notification.permission === 'granted';
    } else if (window.webkitNotifications) {
        return window.webkitNoticications.checkPermission() === 0;
    } else {
        return this.fallback.permission === 'granted';
    }
};

Notifications.prototype.requestPermission = function (cb) {
    if (window.macgap) {
        cb('granted');
    } else if (window.fluid) {
        cb('granted');
    } else if (window.Notification) {
        if (window.Notification.permission !== 'denied') {
            window.Notification.requestPermission(cb);
        } else {
            cb('denied');
        }
    } else if (window.webkitNotifications) {
        var perm = window.webKitNotifications.checkPermission();
        if (perm === 1) {
            window.webkitNotification.requestPermission(function (perm) {
                if (perm === 0) {
                    cb('granted');
                } else if (perm === 1) {
                    cb('default');
                } else {
                    cb('denied');
                }
            });
        }
    } else {
        this.fallback.requestPermission(cb);
    }
};

module.exports = Notifications;
