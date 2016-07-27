'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util');

gulp.task('watch', gulpsync.sync([
	'scripts:watch'
]));
