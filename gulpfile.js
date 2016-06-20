var gulp = require('gulp'),
plumber = require('gulp-plumber'),
rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/img/**/*')
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest('dist/img/'));
});

gulp.task('styles', function(){
  gulp.src(['src/css/style.scss'])
  .pipe(plumber({
    errorHandler: function (error) {
      console.log(error.message);
      this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
  });

  gulp.task('compass', function(){
    gulp.src(['src/css/style.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }}))
      .pipe(compass({
        css: 'src/css',
        sass: 'src/css',
        image: 'src/img'
      }))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(gulp.dest('dist/css/'))
      .pipe(rename({suffix: '.min'}))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css/'))
      .pipe(browserSync.reload({stream:true}))
    });

    gulp.task('scripts', function(){
      return gulp.src('src/js/**/*.js')
      .pipe(plumber({
        errorHandler: function (error) {
          console.log(error.message);
          this.emit('end');
        }}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({stream:true}))
      });

      gulp.task('default', ['browser-sync'], function(){
        gulp.watch("src/css/**/*.scss", ['compass']);
        gulp.watch("src/js/**/*.js", ['scripts']);
        gulp.watch("*.html", ['bs-reload']);
      });