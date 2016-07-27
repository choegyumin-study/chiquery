'use strict';

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpsync = require('gulp-sync')(gulp),
	gutil = require('gulp-util'),
	deploy = require('gulp-gh-pages');

gulp.task('deploy', gulpsync.sync([
	'build'
]), function() {
	return gulp.src(G.dirPath + '/**/*')
		.on('end', function() {
			console.log('Push commits to origin:prod');
		})
		.pipe(deploy({
			remoteUrl: G.packageJson.repository.url,
			branch: 'prod'
		}));
});
