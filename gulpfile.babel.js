'use strict';

import gulp        from 'gulp';
import del         from 'del';
import runSequence from 'run-sequence';
import stripDebug  from 'gulp-strip-debug';
import gulpif      from 'gulp-if';
import babel       from 'gulp-babel';

gulp.task('clean', (cb) => {

  return del(['dist/**/*'], cb);

});

gulp.task('scripts', () => {

  return gulp.src('lib/**/*.js')
  .pipe(babel())
  .pipe(gulpif(global.isProd, stripDebug()))
  .pipe(gulp.dest('dist'));

});

gulp.task('dev', () => {

  global.isProd = false;

  runSequence(['scripts']);

  gulp.watch('lib/**/*.js', ['scripts']);

});

gulp.task('prod', ['clean'], () => {

  global.isProd = true;

  return runSequence(['scripts']);

});
