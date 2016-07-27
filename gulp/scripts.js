'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	del = require('del'),
	plumber = require('gulp-plumber'),
	rollup = require('gulp-rollup'),
	sourcemaps = require('gulp-sourcemaps'),
	rollupBabel = require('rollup-plugin-babel'),
	rollupSourcemaps = require('rollup-plugin-sourcemaps');

gulp.task('scripts', function() {
	return gulp.src(G.dirPath.modules + '/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(rollup({
			// intro: 'var chiQuery; (function() { "use strict";\r\n',
			// outro: '\r\n}());',
			entry: G.dirPath.modules + '/' + G.appName + '.js',
			format: 'iife',
			indent: false,
			plugins: [
				rollupBabel({
					presets: 'es2015-rollup'
				}),
				rollupSourcemaps()
			]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(G.dirPath.js));
});

gulp.task('scripts:watch', function() {
	return gulp.watch([G.dirPath.modules + '/**/*.js'], ['scripts']);
});

gulp.task('scripts:clean', function() {
	return del([G.dirPath.js + '/' + G.appName + '.js', G.dirPath.js + '/' + G.appName + '.js.map']);
});
