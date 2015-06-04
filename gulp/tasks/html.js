'use strict';

var gulp = require('gulp-help')(require('gulp')); // note that gulp-help is loaded first: https://www.npmjs.com/package/gulp-help/
var $ = require('gulp-load-plugins')(); // https://www.npmjs.com/package/gulp-load-plugins

var config = require('../config');
var utils = require('../utils');

gulp.task('html', 'Optimize HTML and assets', function () {
	var assets = $.useref.assets({
		searchPath: '{' + config.folders.temp + ',' + config.folders.app + '}'
	});

	return utils.plumbedSrc(
			config.html.src
	)

			.pipe(assets)

			.pipe($.if(config.files.any + config.extensions.js, $.stripDebug())) // remove console/debug statements
			.pipe($.if(config.files.any + config.extensions.js, $.uglify({
				preserveComments: 'some'
			}))) // keep comments that have a '!': https://github.com/gruntjs/grunt-contrib-uglify#preservecomments

			.pipe(assets.restore())
			.pipe($.useref())

		//.pipe($.replace('scripts/main.js', 'scripts/'+config.javascript.finalJsBundleFilename))

		// Minify HTML
			.pipe($.if(config.files.any + config.extensions.html, $.minifyHtml()))

		// Output files
			.pipe(gulp.dest(config.html.dest))

		// Task result
			.pipe($.size({
				title: 'html'
			}));
});
