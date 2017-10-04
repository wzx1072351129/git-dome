/**
    1. LESS编译 压缩 合并
    2. JS 合并 压缩 混淆
    3. img复制
    4. HTML压缩
*/

var gulp=require('gulp');

// LESS编译 压缩  合并-->没有必要,less可以导包
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
gulp.task('css',function(){
    gulp.src(['src/css/*.less','!src/css/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
});

// JS 合并 压缩 混淆
var concat =require('gulp-concat');
var uglify =require('gulp-uglify');
gulp.task('script',function(){
    gulp.src('src/script/*.js')
        .pipe(concat('all.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/script/'))
        .pipe(browserSync.stream());
});

// img复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images/'))
        .pipe(browserSync.stream());
});

// html压缩
var htmlmin =require('gulp-htmlmin');
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe( htmlmin({
            collapseWhitespace:true,
            cssmin: true
        }) )
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

// 浏览器同步 监视文件变化
var browserSync=require('browser-sync').create();
gulp.task('serve',function(){
    browserSync.init({
        server:{
            baseDir:'dist/'
        }
    });
    gulp.watch('src/css/*.less',['css']);
    gulp.watch('src/script/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});

gulp.task('default',['serve']);