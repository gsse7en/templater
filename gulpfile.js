var gulp = require('gulp');
var gulpImports = require('gulp-imports');
var del = require('del');
var uglify = require('gulp-uglifyjs');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
 
gulp.task('import', function() {
  return gulp.src('./src/**/*.js')
        .pipe(gulpImports())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({
            suffix: ".min"
          }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('uglify-templater', function() {
  gulp.src('./dist/templater.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('uglify-jquery', function() {
  gulp.src('./dist/templater.jquery.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('uglify-gulp', function() {
  gulp.src('./dist/templater.gulp.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('test-stage-6', function () {
  return gulp
    .src('spec/stage-6/index.html')
    .pipe(mochaPhantomJS());
});

gulp.task('build', function() {
  runSequence('clean', 'import', ['uglify-templater', 'uglify-jquery', 'uglify-gulp']);
});

gulp.task('templater', function () {
    var gulpTemplater = require('./dist/templater.gulp.min.js');
    gulp.src('./src/index.html').pipe(gulpTemplater({
      tags: {
        'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>'
      },
      parseHtmlPage: false,
      htmlPlaceholder: "html",
      bracketsRegexp: /\{\{(.*?)\}\}/g
    })).pipe(gulp.dest('./dist'));
});