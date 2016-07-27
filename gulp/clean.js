'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	del = require('del');

gulp.task('clean', gulpsync.sync([
	'scripts:clean'
]), function() {
	return del(['.publish/', G.dirPath.dist, G.dirPath.report]);
});
