var nodeunit = require('nodeunit'),
    child_process = require('child_process'),
    thumbnailer = require('../thumbnailer');

exports.as_include = nodeunit.testCase({

    setUp: function(cb) {
        this._exec = child_process.exec;
        cb();
    },
    tearDown: function(cb) {
        child_process.exec = this._exec;
        cb();
    },

    single_file: function(test) {
        var self = this;
        test.expect(1);

        child_process.exec = function(command, callback) {
            test.equal(command, 'convert "test/images/image.png" -resize 50% "X:\\scripts\\thumbnailer\\test\\test-results\\image.png"');
            //self._exec(command, callback); //this would make more sense for other
        };

        thumbnailer('test/images/image.png', 'test/test-results/image.png', '50%', function() {
            test.done();
        });

    }

});