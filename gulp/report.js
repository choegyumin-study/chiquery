'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	eslint = require('gulp-eslint'),
	jsdoc = require('gulp-jsdoc3');

gulp.task('lint', function() {
	return gulp.src(G.dirPath.modules + '/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.format('html', function(results) {
			/*
			 * @Todo Optimization
			 */
			fs.access(G.dirPath.report, fs.R_OK | fs.W_OK, function(err) {
				if (err) fs.mkdir(G.dirPath.report);
				fs.access(G.dirPath.lint, fs.R_OK | fs.W_OK, function(err) {
					if (err) fs.mkdir(G.dirPath.lint);
					fs.writeFile(G.dirPath.lint + '/index.html', results);
				});
			});
		}));
});

gulp.task('doc', function() {
	return gulp.src(G.dirPath.modules + '/**/*.js', {
			read: false
		})
		.pipe(jsdoc({
			opts: {
				destination: G.dirPath.doc
			}
		}));
});

gulp.task('report', gulpsync.sync([
	['lint', 'doc']
]));
