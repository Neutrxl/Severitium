const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const flatten = require('gulp-flatten');
const del = require('del');

gulp.task('compile-js', function () {
	return gulp.src(['./**/*.js', '!./**/*.user.js', '!./node_modules/**', '!./**/*.min.js', '!./.output/**/*.js', '!./gulpfile.js'])
		.pipe(flatten({ includeParents: -1 }))
		.pipe(concat('Theme.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./.output'));
});

gulp.task('compile-css', function () {
	return gulp.src(['./**/*.css', '!./.output/**/*.css', '!./node_modules/**'])
		.pipe(flatten({ includeParents: -1 }))
		.pipe(concat('Theme.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./.output'));
});

gulp.task('clean', function () {
	return del(['./.output']);
});

gulp.task('default', gulp.series('clean', gulp.parallel('compile-js', 'compile-css')));
