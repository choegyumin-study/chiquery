'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	beautify = require('gulp-beautify'),
	concat = require('gulp-concat'),
	strip = require('gulp-strip-comments'),
	uglify = require('gulp-uglify');

gulp.task('build', gulpsync.sync([
	'clean', 'scripts', 'report'
]), function() {
	gulp.src(G.dirPath.src + '/README.md')
		.pipe(gulp.dest(G.dirPath.dist));
	return gulp.src(G.dirPath.js + '/' + G.appName + '.js')
		.pipe(strip())
		.pipe(beautify({
			indent_size: 2,
			indent_char: ' ',
			eol: '\n',
			indent_level: 0,
			indent_with_tabs: false,
			end_with_newline: true
		}))
		.pipe(concat(G.appName + '.js'))
		.pipe(gulp.dest(G.dirPath.dist))
		.pipe(uglify({
			preserveComments: 'license'
		}))
		.pipe(concat(G.appName + '.min.js'))
		.pipe(gulp.dest(G.dirPath.dist));
});
