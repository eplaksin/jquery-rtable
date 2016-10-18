'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var pkg = require('./package.json');
var head = [
  '/**',
  ' * <%= pkg.name %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.repository.url %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

gulp.task('dist:clean', function(){
  return gulp.src('./dist', {read:false})
    .pipe(clean());
});

gulp.task('dist:styles', ['dist:clean'], function(){
  return gulp.src('./src/*.css')
    .pipe(minifyCSS())
    .pipe(rename('jquery.rtable.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist:script', ['dist:clean'], function(){
  return gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(rename('jquery.rtable.min.js'))
    .pipe(header(head, {pkg: pkg}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['dist:clean', 'dist:styles', 'dist:script'], function () {
  return null;
});
