'use strict';

//Dependency Variables
var gulp        = require('gulp'),
    uncss       = require( 'gulp-uncss'),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    runSequence = require('run-sequence');

//Folder Directory Config Variable
var config ={
    "src":{
      "root":"./src",
      "css":"./src/css",
    },
    "dist":{
      "root":"./dist",
      "css":"./dist/css",
    },
    "sass":{
        "root":"./sass",
    },
    "jade":{
        "root":"./jade",
    }
} 

//Process Sass
gulp.task('sass', function () {
  return gulp.src(config.sass.root + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.src.css));
});

//Process Default Styles
//if you get an error message: Fontconfig warning: ignoring C.UTF-8: not a valid language tag
// fun this command in the terminal:  LC_ALL=C
gulp.task('styles', ['sass'], function (){
        return gulp.src( config.src.css + '/*.css')
            .pipe(uncss({
                html: [config.src.root + '/**/*.html' ]
            }))
            .pipe(gulp.dest(config.src.css));
    });

//Process Jade Templates
gulp.task('jade:src', function () {
  return gulp.src( config.jade.root + '/index.jade' )
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest( config.src.root ));
})


//Gulp Watch Task
gulp.task('watch', function () {
   gulp.watch(config.sass.root + '/**/*.scss', ['styles']);
   gulp.watch(config.jade.root + '/index.jade', ['jade:src']);
});