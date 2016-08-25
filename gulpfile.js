'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sassfiles'], function() {
  browserSync.init({
    proxy: "laj-lv.dev",
    notify: false
  });
  gulp.watch(['sass/*.scss'], ['sassfiles']);
  gulp.watch(["index.html", "scripts/*", "img/*"]).on('change', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sassfiles', function() {
  return gulp.src(['sass/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);