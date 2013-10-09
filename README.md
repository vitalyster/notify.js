# Notify.js

## What is it?

A wrapper for using the Desktop Notifications API, along with the previous webkit prefixed version.

It also uses the Growl notification APIs provided through MacGap or Fluid.

## Examples

    var Notifify = require('notify', );

    var notifications = new Notify({/* default opts */}, {
        // Fallback options

        create: function (title, opts) {
            // Fallback custom notification handler if
            // desktop notifications are not supported.
        }
    });

    if (notifications.permissionNeeded()) {
        $('button').click(function () {
           notifications.requestPermission(function (perm) {
               if (perm === 'granted') {
                   console.log('Got permission!');
               }
           });
        });
    }

    if (notifications.allowed()) {
        notifications.create('This is a notification', {
           body: 'It has some more description',
           tag: 'replaces-the-previous-one-with-the-same-tag',
           icon: '/images/applogo.png'
        });
    }


## License

MIT

## Credits

If you like this, follow [@lancestout](http://twitter.com/lancestout) on twitter.
