'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		port: 1337,
		root: [G.dirPath.src + '/']
	});
});
