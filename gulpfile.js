'use strict';

//Dependency Variables
var gulp    = require('gulp'),
    uncss   = require( 'gulp-uncss'),
    sass    = require('gulp-sass');

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


//Gulp Watch Task
gulp.task('watch', function () {
  return gulp.watch(config.sass.root + '/**/*.scss', ['styles']);
});