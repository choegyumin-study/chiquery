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
	return gulp.src('src/chiquery.js')
		.pipe(strip())
		.pipe(beautify({
			indent_size: 2,
			indent_char: ' ',
			eol: '\n',
			indent_level: 0,
			indent_with_tabs: false,
			end_with_newline: true
		}))
		.pipe(concat('chiquery.js'))
		.pipe(gulp.dest('dist/'))
		.pipe(uglify({
			preserveComments: 'license'
		}))
		.pipe(concat('chiquery.min.js'))
		.pipe(gulp.dest('dist/'));
});
