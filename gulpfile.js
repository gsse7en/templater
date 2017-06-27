var gulp = require('gulp');
var gulpImports = require('gulp-imports');
var del = require('del');
var uglify = require('gulp-uglifyjs');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
 
gulp.task('import', function() {
  return gulp.src('./src/**/*.js')
        .pipe(gulpImports())
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

gulp.task('build', function() {
  runSequence('clean', 'import', ['uglify-templater', 'uglify-jquery', 'uglify-gulp']);
});