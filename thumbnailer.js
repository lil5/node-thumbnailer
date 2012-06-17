var fs = require('fs'),
	path = require('path'),
	child_process = require('child_process'),
    mkdirp = require('mkdirp'),

    platform = require('os').platform(),
    slash = (platform == 'win32') ? '\\' : '/',
	
	children = 0,
	child_queue = [],

    initial_path,
    target_path,
    inplace,
    geometry,
    callback;

module.exports = function(startdir, targetdir, geo, cb) {
    initial_path = startdir;
    target_path = targetdir;
    geometry = geo;
    callback = cb;
    inplace = (target_path == null || target_path == '');

    check_path(initial_path);
};


function check_path(filepath) {
	fs.stat(filepath, function(err, stats) {
		if (err) { console.log(err); return; }
		
		if (stats.isFile()) make_thumb(filepath);
		else if (stats.isDirectory()) explore_dir(filepath);
	});
}

function explore_dir(dir) {
	fs.readdir(dir, function(err, files) {
		for (var i = 0; i < files.length; i++) {
			check_path(dir + slash + files[i]);
		}
	});
}

function make_thumb(file) {
    var new_file, command, startprocess;

    if (inplace) {
        new_file = file;
        command = 'mogrify -resize ' + geometry + ' "' + file + '"';
    } else {
        new_file = path.resolve(target_path, path.relative(initial_path, file));
        command = 'convert "' + file + '" -resize ' + geometry + ' "' + new_file + '"';
    }

    startprocess = function() {
        if (children < 8) {
            children++;
            child_process.exec(command, function(err, stdout, stderr) {
                process_finished(err, stdout, stderr, new_file, command);
            });
        } else {
            child_queue.push({
                command: command,
                new_file: new_file
            });
        }
    };

    if (inplace) startprocess();
    else mkdirp(new_file.replace(/[\/\\][^\/\\]+$/, ''), startprocess);
}

function process_finished(err, stdout, stderr, new_file, command) {
	if (err) { console.log(err); return; }
    else console.log('Wrote '+new_file);
	
	if (child_queue.length > 0) {
		var new_child = child_queue.shift();
		child_process.exec(new_child.command, function(err, stdout, stderr) {
			process_finished(err, stdout, stderr, new_child.new_file, new_child.command);
		});
	} else {
		children--;
		if (children == 0) {
            if (callback && typeof callback == 'function') {
                callback();
            } else {
			    console.log('\r\nAll finished!');
            }
		}
	}
}


