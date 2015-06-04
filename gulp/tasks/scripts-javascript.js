'use strict';

var gulp = require('gulp-help')(require('gulp')); // note that gulp-help is loaded first: https://www.npmjs.com/package/gulp-help/
var $ = require('gulp-load-plugins')(); // https://www.npmjs.com/package/gulp-load-plugins
var browserSync = require('browser-sync');

var config = require('../config');
var utils = require('../utils');

gulp.task('scripts-javascript', 'Transpile JavaScript (ES6 to ES5 using Babel) and generate sourcemaps', function () {
	return utils.plumbedSrc( // handle errors nicely (i.e., without breaking watch)
			config.javascript.src
	)

		// Display the files in the stream
		//.pipe($.debug({title: 'Stream contents:', minimal: true}))

		// speed things up by ignoring unchanged resources
			.pipe($.changed(config.javascript.dest, {
				extension: '.js'
			}))

		// Initialize sourcemap generation
			.pipe($.sourcemaps.init({
				//debug: true
			}))

		// Transpile ES6 to ES5
			.pipe($.babel())

		// Write sourcemaps: https://www.npmjs.com/package/gulp-sourcemaps
		//.pipe($.sourcemaps.write()) // use '.' to write the sourcemap to a separate file in the same dir
			.pipe($.sourcemaps.write({ // use '.' to write the sourcemap to a separate file in the same dir
				includeContent: false,
				sourceRoot: '../'
			}))

		// Copy files
			.pipe(gulp.dest(config.javascript.dest))

		// Display the files in the stream
		//.pipe($.debug({title: 'Stream contents:', minimal: true}))

		// Task result
			.pipe($.size({
				title: 'scripts-javascript'
			}))

		// Reload Browser if needed
			.pipe($.if(browserSync.active, browserSync.reload({
				stream: true, once: true
			})));
});
