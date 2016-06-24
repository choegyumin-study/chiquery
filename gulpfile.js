'use strict';

// Load modules
var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	del = require('del'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	jsdoc = require('gulp-jsdoc3'),
	mocha = require('gulp-mocha'),
	gulpsync = require('gulp-sync')(gulp),
	uglify = require('gulp-uglify'),
	util = require('gulp-util');

// Get Data of package.json
//var packageJson = JSON.parse(fs.readFileSync('package.json'));

// Define RegExp
//var REGEXP = {};

// Function of get file names in a directory
//function walkSync(currentDirPath, getExtension, callback) {
//	fs.readdirSync(currentDirPath).forEach(function (name) {
//		var filePath = path.join(currentDirPath, name);
//		var stat = fs.statSync(filePath);
//		if (stat.isFile() && (getExtension ? path.extname(filePath) == '.' + getExtension : true)) {
//			callback(filePath, stat);
//		} else if (stat.isDirectory()) {
//			walkSync(filePath, getExtension, callback);
//		}
//	});
//};

// Function of synchronous for task
// var setTaskSyncDelay = function(callback, timer, returningData) {
// 	if (timer === undefined) timer = 2500;
// 	setTimeout(function() {
// 		callback();
// 		if (returningData !== undefined) return returningData;
// 	}, timer);
// };
// var setFileExistsSync = function(callback, array, timer, returningData) {
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
// 			setTaskSyncDelay(callback, 0, returningData);
// 		}
// 	}, timer);
// };

gulp.task('js', function () {
	return gulp.src('src/unit/*.js')
		.pipe(uglify())
		.pipe(concat('imitation-jquery.js'))
		.pipe(gulp.dest('src/'));
	// return gulp.src('src/imitation-jquery.js')
	// 	.pipe(jsdoc('./doc'));
});

gulp.task('js:watch', function() {
	return gulp.watch(['src/unit/**/*.js'], ['js']);
});

gulp.task('build', function () {
	gulp.src('src/imitation-jquery.js')
		.pipe(gulp.dest('dist/'));
	return gulp.src('src/imitation-jquery.js')
		.pipe(uglify())
		.pipe(concat('imitation-jquery.min.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', gulpsync.sync([
	['js:watch']
]));

gulp.task('serve', gulpsync.sync([
	'js', ['watch']
]));

gulp.task('default', ['serve']);
