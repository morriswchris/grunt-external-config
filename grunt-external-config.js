/*
 * load-grunt-config
 * https://github.com/morriswchris/load-grunt-config
 * Copyright (c) 2014 Chris Morris
 * Licensed under the MIT license.
 */

'use strict';

var _ = require("lodash"),
	colors = require("colors"),
	path = require("path");

module.exports = function(grunt, opts) {

	// Merge task-specific and/or target-specific options with these defaults.
	var files = [],
		options = {
			"location": opts.location || "./grunt/config", //path to config directory
			"filters": opts.filters || ["*"], //can be string/array of file name(s)/expressions ( ie 'fileone.js|file-*' ) default: all files
			"hiddenFiles": opts.hiddenFiles || false //should we filter hidden files default: false (as in we should exclude hidden files) 
		};
	//check for location and existance of directory
	if (_.isEmpty(options.location)) {
		grunt.fatal("No location was set. Please configure the location of you grunt config directory in the grunt config options!");
		return;
	}
	if (!grunt.file.exists(options.location)) {
		grunt.fatal("cleanConfig could not find the location of your grunt config directory %s. Please double check your grunt config!", options.location.toString().red);
		return;
	}
	//lets begin
	grunt.log.write("Loading configs from  %s ... ", options.location.cyan);
	//check our filters to make sure it is an array
	options.filters = _.isArray(options.filters) ? options.filters : [options.filters];
	if (!options.hiddenFiles) { //add in a filter to not show hidden files
		options.filters.push("!.*");
	}
	//loop our dir and get files
	grunt.file.recurse(options.location, function(absDir, rootDir, subDir, fileName) {
		if (grunt.file.isMatch(options.filters, fileName)) {
			grunt.verbose.oklns("Loading config: " + absDir);
			grunt.config.set(fileName.split(".")[0], require(path.resolve("./" + absDir)));
			files.push(absDir); //add to resutls
		}
		else {
			grunt.verbose.warn("File %s failed to match filters and will be omitted.", fileName.red);
		}
	});
	grunt.log.ok();
	//log our findings
	grunt.log.oklns("%s %s where loaded into the grunt config", files.length.toString().green, files.length > 0 && files.length < 2 ? "config" : "configs");
	grunt.verbose.writeln("Found the following files %s using the following filters %s", grunt.log.wordlist(files), grunt.log.wordlist(options.filters));
};