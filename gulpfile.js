'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	requireDir = require('require-dir');

global.G = {};

G.packageJson = JSON.parse(fs.readFileSync('package.json'));

G.appName = 'chiquery';

G.dirPath = {
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

// G.setDelayAfterTask = function(callback, timer, ret) {
// 	if (timer === undefined) timer = 2500;
// 	setTimeout(function() {
// 		callback();
// 		if (ret !== undefined) return ret;
// 	}, timer);
// };

// G.fileExistsChecker = function(callback, array, timer, ret) {
// 	if (timer === undefined) timer = 500;
// 	var interval = setInterval(function() {
// 		console.log('Check if file exists');
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
// 			console.log('Exists!');
// 			G.setDelayAfterTask(callback, 0, ret);
// 		}
// 	}, timer);
// };

requireDir('./gulp', { recurse: false });

gulp.task('serve', gulpsync.sync([
	'clean', 'scripts', 'report', ['connect', 'watch']
]));

gulp.task('default', gulpsync.sync([
	'serve'
]));
