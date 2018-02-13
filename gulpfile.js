// Require Gulp
const gulp = require('gulp')
// CSS Plugins
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
// Image Plugins
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
// Minify JavaScript
const uglify = require('gulp-uglify')
// This plugin allows tasks to run synchronously
const runSequence = require('run-sequence')
// This plugin allows you to delete the 'dist' folder
const del = require('del')
// Transpile to ES5
const babel = require('gulp-babel')
// Nice plugin which allows us to move our HTML to the dist folder
const useref = require('gulp-useref')

// Move HTML to dist folder
gulp.task('movehtml', () => {
  return gulp.src('pages/*.html')
    .pipe(useref())
    .pipe(gulp.dest('public/dist'))
})

// Compile SASS into CSS
gulp.task('sass', () => {
  return gulp
    .src('public/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
})

// Minify CSS
gulp.task('minifycss', () => {
  const plugins = [autoprefixer({ browsers: ['last 1 version'] }), cssnano()]
  return gulp
    .src('public/css/**/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('public/dist/css'))
})

// Minifiy JavaScript
gulp.task('minifyjs', () => {
  return gulp
    .src('public/js/ecis.js')
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'))
})

// Minify our images
gulp.task('images', () => {
  return (
    gulp
      .src('public/img/**/*.+(png|jpg|jpeg|gif|svg)')
      // Caching images that ran through imagemin
      .pipe(
        cache(
          imagemin({
            interlaced: true
          })
        )
      )
      .pipe(gulp.dest('public/dist/img'))
  )
})

// Delete everything in dist
gulp.task('clean:dist', () => {
  return del.sync('public/dist')
})

// Watch task - Once you save a SASS file, it will compile to regular CSS
gulp.task('watch', () => {
  gulp.watch('public/scss/**/*.scss', ['sass'])
})

// Bundle everything up into a dist version!
gulp.task('build', callback => {
  runSequence(
    'clean:dist',
    ['sass', 'minifycss', 'minifyjs', 'images', 'movehtml'],
    callback
  )
})




