'use strict';

// Load modules
var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	del = require('del'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	jsdoc = require('gulp-jsdoc3'),
	mocha = require('gulp-mocha'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
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

gulp.task('scripts', function () {
	return gulp.src('src/module/chiquery.js')
		.pipe(requirejsOptimize())
		.pipe(gulp.dest('src/'));
	// return gulp.src('src/chiquery.js')
	// 	.pipe(jsdoc('./doc'));
});

gulp.task('scripts:watch', function() {
	return gulp.watch(['src/module/**/*.js'], ['scripts']);
});

gulp.task('build', function () {
	// gulp.src('src/chiquery.js')
	// 	.pipe(gulp.dest('dist/'));
	// return gulp.src('src/chiquery.js')
	// 	.pipe(uglify())
	// 	.pipe(concat('chiquery.min.js'))
	// 	.pipe(gulp.dest('dist/'));
});

// Configure task for create server
gulp.task('connect', function() {
	connect.server({
		port: 1337,
		root: 'src/'
	});
});

gulp.task('watch', gulpsync.sync([
	['scripts:watch']
]));

gulp.task('serve', gulpsync.sync([
	'scripts', ['connect', 'watch']
]));

gulp.task('default', ['serve']);
