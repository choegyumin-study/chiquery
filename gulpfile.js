'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	requireDir = require('require-dir');

global.G = {};

global.G.packageJson = JSON.parse(fs.readFileSync('package.json'));

global.G.dirPath = {
	dist: './dist',
	report: './report',
	doc: './report/doc',
	lint: './report/lint',
	src: './src',
	css: './src/css',
	img: './src/img',
	js: './src/js',
	modules: './src/modules'
};

// global.G.setDelayAfterTask = function(callback, timer, ret) {
// 	if (timer === undefined) timer = 2500;
// 	setTimeout(function() {
// 		callback();
// 		if (ret !== undefined) return ret;
// 	}, timer);
// };

// global.G.fileExistsChecker = function(callback, array, timer, ret) {
// 	if (timer === undefined) timer = 250;
// 	var interval = setInterval(function() {
// 		array.forEach(function(_key) {
// 			fs.stat(_key, function(err) {
// 				if (err == null) {
// 					var index = array.indexOf(_key);
// 					if (index !== -1) {
// 						array.splice(index, 1);
// 					}
// 				}
// 			});
// 		});
// 		if (!array.length) {
// 			clearInterval(interval);
// 			setDelayAfterTask(callback, 0, ret);
// 		}
// 	}, timer);
// };

requireDir('./gulp', { recurse: false });

gulp.task('serve', gulpsync.sync([
	'build', ['connect', 'watch']
]));

gulp.task('default', gulpsync.sync([
	'serve'
]));
