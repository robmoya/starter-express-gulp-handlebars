var browserify = require('browserify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');

var sassPath = "./src/sass/main.scss";
var jsPath = "./src/js/main";

var outputDir = "./builds";


var env = process.env.NODE_ENV || 'development';
//Change Node environment to production to minify compiled index.js
// var env = process.env.NODE_ENV || 'production';

gulp.task('build', function(){
  return browserify(jsPath,{debug: env === 'development'})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulpif(env === 'production', streamify(uglify())))
    .pipe(gulp.dest(outputDir + '/js'));
});

gulp.task('sass', function(){
  var config = {};

  if(env === 'development'){
    config.sourceComments = 'map';
  }

  if(env === 'production'){
    config.outputStyle = 'compressed';
  };

  return gulp.src(sassPath)
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir + '/css'));
});
