'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	del = require('del'),
	plumber = require('gulp-plumber'),
	rollup = require('gulp-rollup'),
	babel = require('rollup-plugin-babel');

gulp.task('scripts', function() {
	return gulp.src('src/modules/**/*.js')
		.pipe(plumber())
		.pipe(rollup({
			// intro: 'var chiQuery; (function() { "use strict";\r\n',
			// outro: '\r\n}());',
			entry: G.dirPath.modules + '/*.js',
			format: 'iife',
			indent: false,
			plugins: [
				babel({
					presets: 'es2015-rollup'
				})
			],
			sourceMap: true
		}))
		.pipe(gulp.dest('src/js/'));
});

gulp.task('scripts:watch', function() {
	return gulp.watch([G.dirPath.modules + '/**/*.js'], ['scripts']);
});

gulp.task('scripts:clean', function() {
	return del(['src/chiquery.js', 'src/chiquery.js.map']);
});
