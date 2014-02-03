# load-grunt-config
> A faster, cleaner, less merge conflic grunt config

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install load-grunt-config --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
require('load-grunt-config')(grunt, <options>);
```

## Overview
The load-grunt-config plugin was conceptualized when my projects began having large merge conflicts due to single line changes within
the grunt config file. After much research, I was able to minimze the Gruntfile.js through the use of
[load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) and [grunt.loadTasks](http://gruntjs.com/api/grunt#grunt.loadtasks)
but there was nothing to minimize my ever growing grunt.config object. Insert load-grunt-config.

The load-grunt-config plugin allows you to separate all of your grunt plugin configs into separate module files, and then
load them through directory traversal.

## Options
### options.location
Description: `Location of your grunt config directory`
Type: `String`
Default value: `./grunt/config`

### options.filters
Description: `Optional filters to ignore certain files using the minimatch library`
Type: `String/Array`
Default value: `["*"]`

### options.hiddenFiles
Description: `Flag to specify if hidden files should be allowed`
Type: `Boolean`
Default value: `false`

## Recommended Tree Structure

```shell
├── Gruntfile.js
├── LICENSE-MIT
├── grunt
│   └── config
│   │   └── cleanConfig.js
│   └── tasks
├── node_modules
├── package.json
```

## Building your Config file

The only requirement of the config file is the naming convention. Since we are setting the config file to be the object
index in our config, we will need to name the file the same as the require config object.

Given:
```js
grunt.initConfig({
		cleanConfig: {
			options: {
				location: './grunt/config'
			}
		}
	});
```
we would need to place our cleanConfig file in `./grunt/config/cleanConfig.js` and then rewrite our config into a module.

```js
module.exports = {
	main: {
		options: {
			location: './grunt/config'
		}
	}
};
```

### Sample Condenced Gruntfile.js

```js
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	//load config
	require('load-grunt-config')(grunt, {
		location: "./grunt/config"
	});

	//load npm tasks
	require('load-grunt-tasks')(grunt);

	// Load registered tasks/aliases
	grunt.loadTasks('./grunt/tasks');
};
```
