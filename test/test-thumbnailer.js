var nodeunit = require('nodeunit'),
    child_process = require('child_process'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    wrench = require('wrench'),
    thumbnailer = require('../thumbnailer'),
    platform = require('os').platform(),
    slash = (platform == 'win32') ? '\\' : '/';

if (process.cwd().match(/test[\/\\]?$/)) {
    console.log('Run "nodeunit test" from root thumbnailer dir');
    process.exit(1);
}

module.exports = nodeunit.testCase({
    setUp: function(cb) {
        this.imgs_path = path.resolve('test/images');
        this.dest_path = path.resolve('test/test-results');

        cb();
    },
    tearDown: function(cb) {
        var self = this;
        fs.stat(this.dest_path, function(err, stats) {
            if (!err && stats.isDirectory()) wrench.rmdirRecursive(self.dest_path, cb);
            else cb();
        });
    },

    single_file: function(test) {
        var _exec = child_process.exec,
            single_path = this.imgs_path + slash + 'image.png',
            single_dest = this.dest_path + slash + 'image.png';

        test.expect(1);

        child_process.exec = function(command, callback) {
            test.ok(true);
            child_process.exec = _exec;
            callback();
        };

        thumbnailer(single_path, single_dest, '50%', function() {
            test.done();
        });
    },

    recursive: function(test) {
        var deepest = path.resolve(this.dest_path, 'subfolder/nested subfolder/lame reference.gif');
        test.expect(1);

        console.log(child_process.exec);

        thumbnailer(this.imgs_path, this.dest_path, '50%', function() {
            fs.stat(deepest, function(err, stats) {
                test.ok(stats.isFile(), 'Two-level-deep file created via ImageMagick');
                test.done();
            });
        });
    },

    in_place: function(test) {
        var _exec = child_process.exec,
            single_path = this.imgs_path + slash + 'image.png';

        test.expect(1);

        child_process.exec = function(command, callback) {
            test.ok(true);
            child_process.exec = _exec;
            callback();
        };

        thumbnailer(single_path, null, '50%', function() {
            test.done();
        });
    }

});