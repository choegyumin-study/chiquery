'use strict';

// Load modules
var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	del = require('del'),
	gitRev = require('git-rev-sync'),
	Amdclean = require('gulp-amdclean'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	eslint = require('gulp-eslint'),
	deploy = require('gulp-gh-pages'),
	jsdoc = require('gulp-jsdoc3'),
	requirejsOptimize = require('gulp-requirejs-optimize'),
	gulpsync = require('gulp-sync')(gulp),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util');

// Get Data of package.json
var packageJson = JSON.parse(fs.readFileSync('package.json'));

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

gulp.task('scripts', function() {
	return gulp.src('src/modules/chiquery.js')
		.pipe(requirejsOptimize({
			optimize: 'none',
			useStrict: true,
			out: 'chiquery-compiled.js'
		}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(Amdclean.gulp({
			'prefixMode': 'standard'
		}))
		.pipe(gulp.dest('src/'));
});

gulp.task('scripts:watch', function() {
	return gulp.watch(['src/modules/**/*.js'], ['scripts']);
});

gulp.task('scripts:clean', function() {
	return del(['src/chiquery-compiled.js']);
});

gulp.task('connect', function() {
	connect.server({
		port: 1337,
		root: ['src/', 'report/']
	});
});

gulp.task('lint', function() {
	return gulp.src('src/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.format('html', function(results) {
			fs.access('report/', fs.R_OK | fs.W_OK, function(err) {
				if (err) fs.mkdir('report/');
				fs.access('report/lint/', fs.R_OK | fs.W_OK, function(err) {
					if (err) fs.mkdir('report/lint/');
					fs.writeFile('report/lint/index.html', results);
				});
			});
		}));
});

gulp.task('doc', function() {
	return gulp.src('src/*/**/*.js', {
		read: false
	})
		.pipe(jsdoc({
			'opts': {
				'destination': 'report/doc/'
			}
		}));
});

gulp.task('build', gulpsync.sync([
	'scripts', 'report'
]), function() {
	return gulp.src('src/chiquery-compiled.js')
		.pipe(concat('chiquery.js'))
		.pipe(gulp.dest('dist/'))
		.pipe(uglify())
		.pipe(concat('chiquery.min.js'))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build:rebuild', gulpsync.sync([
	'clean', 'build'
]));
gulp.task('deploy', function() {
	var publishDir = 'dist/',
		repoUrl = packageJson.repository.url,
		branchName = 'dist/' + gitRev.branch();
	return gulp.src(publishDir + '**/*')
		.on('end', function() {
			console.log('Push commits to origin:' + branchName);
		})
		.pipe(deploy({
			remoteUrl: repoUrl,
			branch: branchName
		}));
});

gulp.task('deploy:build', gulpsync.sync([
	'build:rebuild', 'deploy'
]));

gulp.task('clean', gulpsync.sync([
	'scripts:clean'
]), function() {
	return del(['.publish/', 'dist/*', '!dist/README.*', 'report/']);
});

gulp.task('report', gulpsync.sync([
	['lint', 'doc']
]));

gulp.task('watch', gulpsync.sync([
	['scripts:watch']
]));

gulp.task('serve', gulpsync.sync([
	'scripts', ['connect', 'watch']
]));

gulp.task('default', ['serve']);
