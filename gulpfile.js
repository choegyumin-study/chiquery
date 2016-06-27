'use strict';

// Load modules
var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	del = require('del'),
	gitRev = require('git-rev-sync'),
	beautify = require('gulp-beautify'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	eslint = require('gulp-eslint'),
	deploy = require('gulp-gh-pages'),
	jsdoc = require('gulp-jsdoc3'),
	rollup = require('gulp-rollup'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpsync = require('gulp-sync')(gulp),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	babel = require('rollup-plugin-babel');

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

gulp.task('scripts', function() { // 수정필요
	return gulp.src('src/modules/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(rollup({
			entry: 'src/modules/chiquery.js',
			// intro: 'var chiQuery; (function() { "use strict";\r\n',
			// outro: '\r\n}());',
			format: 'iife',
			plugins: [
				babel({
					presets: 'es2015-rollup'
				})
			]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('src/'));
});

gulp.task('scripts:watch', function() {
	return gulp.watch(['src/modules/**/*.js'], ['scripts']);
});

gulp.task('scripts:clean', function() {
	return del(['src/chiquery.js', 'src/chiquery.js.map']);
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
		.pipe(eslint.format('html', function(results) { // 수정필요
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
			opts: {
				destination: 'report/doc/'
			}
		}));
});

gulp.task('build', gulpsync.sync([
	'scripts', 'report'
]), function() {
	return gulp.src('src/chiquery.js')
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
	'build', 'deploy'
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
