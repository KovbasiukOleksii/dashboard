'use strict';

var gulp = require('gulp'),
    rigger = require('gulp-rigger'),
    prefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant-gfw');
   
var sass = require('gulp-sass');
 

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

var path = {
    build: {
        html: 'dist/',
        js: 'dist/js',
        css: 'dist/css',
        img: 'dist/img'
    },

    src: {
        html: 'src/*.html',
        css: 'src/css/*.scss',
        js: 'src/js/svgxuse.js',
        img: 'src/img/*'
    },

    watch: {
        html: 'src/**/*.html',
        js: 'src/**/*.js',
        css: 'src/**/*.css',
        img: 'src/*'
    },
    clean: './dist'
};


var config = {
    server: {
        baseDir: "./dist"
    },

    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "aleksey"
};

gulp.task('html:build', function(){
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
});

gulp.task('js:build', function(){
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))     
});

gulp.task('css:build', function(){
    return gulp.src(path.src.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))     
});

gulp.task('img:build', function(){
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))     
});