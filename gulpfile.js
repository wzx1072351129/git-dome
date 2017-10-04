var gulp        = require('gulp');
var less=require('gulp-less');
// var cssnano=require('gulp-cssnano');
gulp.task('css',function(){
    gulp.src(['src/css/*.less','!src/css/_*.less'])
        .pipe(less())
        // .pipe(cssnano())
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream());
});

var browserSync = require('browser-sync').create();
gulp.task('serve',function(){
    browserSync.init({
        server:{
            baseDir:'src/'
        }
    });
    gulp.watch('src/css/*.less',['css']);
    gulp.watch('src/js/*.js').on('change',browserSync.reload);
    gulp.watch('src/*.html').on('change',browserSync.reload);
});

gulp.task('default',['serve']);