var browserify = require('browserify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var gulpif = require('gulp-if');


var env = process.env.NODE_ENV || 'development';
//Change Node environment to production to minify compiled index.js
// var env = process.env.NODE_ENV || 'production';

gulp.task('build', function(){
  return browserify('./js/main',{debug: env === 'development'})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulpif(env === 'production', streamify(uglify())))
    .pipe(gulp.dest('.'));
});
