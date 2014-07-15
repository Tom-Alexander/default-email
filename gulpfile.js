'use strict';

var gulp        = require('gulp'),
    less        = require('gulp-less'),
    inline      = require('gulp-inline-css'),
    findReplace = require('gulp-frep'),
    zip         = require('gulp-zip'),
    watch       = require('gulp-watch'),
    w3cjs       = require('gulp-w3cjs'),
    patterns    = [{pattern: /(src="images\/)/g, replacement: 'src="'}];

gulp.task('build', ['images'], function () {
    return gulp.src('./production/out/*')
            .pipe(zip('out.zip'))
            .pipe(gulp.dest('./production'));
});

gulp.task('images', ['html'], function () {
    return gulp.src('.source/images/**/*')
            .pipe(gulp.dest('./production/out'));
});

gulp.task('html', ['less'], function () {
    return gulp.src('./source/*.html')
            .pipe(findReplace(patterns))
            .pipe(inline())
            .pipe(gulp.dest('./production/out'));
});

gulp.task('less', function () {
    return gulp.src('source/less/style.less')
            .pipe(less())
            .pipe(gulp.dest('./production/css/'));
});

gulp.task('watch', function () {
    watch({glob: ['source/less/*.less', 'source/*.html']}, function () {
        gulp.src('source/*.html').pipe(w3cjs());
        return gulp.src('source/less/style.less')
            .pipe(less())
            .pipe(gulp.dest('./production/css/'));
    });
});