var browserify = require('browserify');
var UglifyJS = require('uglify-js');
var fs = require('fs');


var bundle = browserify();
bundle.add('./notify');
bundle.bundle({standalone: 'Notify'}, function (err, js) {
    var result = UglifyJS.minify(js, {fromString: true}).code;
    console.log(err);
    fs.writeFileSync('notify.bundle.js', result);
});
