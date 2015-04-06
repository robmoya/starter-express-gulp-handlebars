var browserify = require('browserify');
var fs = require('fs');
var express = require('express')
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var sassPath = "./src/sass/main.scss";
var jsPath = "./src/js/main";
var outputDir = "./build";

function handleError(err){
  console.log(err.toString());
  this.emit('end');
}


var env = process.env.NODE_ENV || 'development';
//Change Node environment to production to minify compiled index.js
// var env = process.env.NODE_ENV || 'production';

gulp.task('express', function(){
  var app = express();
  app.use(express.static(__dirname));
  app.listen(3000);
});


gulp.task('js', function(){
  return browserify(jsPath,{debug: env === 'development'})
    .bundle()
    .pipe(source('index.js'))
    .on('error', handleError)
    // .pipe(gulpif(env === 'production', streamify(uglify())))
    .pipe(gulp.dest(outputDir + '/js'));

});


gulp.task('sass', function(){
  var config = {};

  if(env === 'development'){
    config.sourceComments = 'map';
  }

  if(env === 'production'){
    config.outputStyle = 'compressed';
  }

  return gulp.src(sassPath)
    .on('error', handleError)
    .pipe(sass(config))
    .on('error', handleError)
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['sass','js'], function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/js/**/*.json', ['js']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch("./index.html").on('change', reload);
});


gulp.task('default', ['serve','express']);
