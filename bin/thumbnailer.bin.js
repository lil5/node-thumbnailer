#!/usr/bin/env node

if (process.argv.length < 5) {
	console.log("Usage: <starting dir or filename> <destination dir | --inplace> <geometry>");
    console.log("For info on ImageMagick's geometry argument, see http://www.imagemagick.org/script/command-line-processing.php#geometry");
	process.exit(1);
}

var thumbnailer = require('../thumbnailer'),

	initial_path = process.argv[2],
	target_path = process.argv[3],
	geometry = process.argv[4];

if (target_path == '--inplace') target_path = null;

thumbnailer(initial_path, target_path, geometry);