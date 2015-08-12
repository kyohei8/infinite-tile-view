import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import through2 from 'through2';
import {stream as wiredep} from 'wiredep';
import handleError from '../utils/handleError';
import path from 'path';
import watchify from 'watchify';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const withSourceMap = true;

gulp.task('js', ['lint'], () => {
  $.util.log(`Starting '${$.util.colors.cyan('Browserify')}'`);
  gulp.src('app/scripts/*.js')
  .pipe($.plumber())
  .pipe(through2.obj( (file, enc, next) => {
    browserify(file.path, { debug: withSourceMap })
    .transform(babelify)
    .bundle((err, res) => {
      const fileName = path.basename(file.path);
      const msg = `${$.util.colors.magenta(fileName)} is Browserified.` ;
      if (err) { return next(err); }
      $.util.log(msg);
      file.contents = res;
      next(null, file);
    });
  }).on('finish', function(){
    $.util.log(`Finished '${$.util.colors.cyan('Browserify')}'`);
    reload();
  }))
  .on('error', handleError)
  .pipe(gulp.dest('.tmp/scripts'))

});
/*
const bundler = through2.obj( (file, enc, next) => {
$.util.log(`Starting '${$.util.colors.cyan('Browserify')}'`);
console.log(file.path);

let b = watchify(browserify(file.path, { debug: withSourceMap }),{poll: true});
b.transform(babelify);

b.on('update', function(){
gutil.log('Updated', gutil.colors.magenta(file.path));
});

console.log('update ===========');
b.transform(babelify)
.bundle((err, res) => {
const fileName = path.basename(file.path);
const msg = `${$.util.colors.magenta(fileName)} is Browserified.` ;
if (err) { return next(err); }
$.util.log(msg);
file.contents = res;
    // next(null, file);
    });
    });

    b.on('log', $.util.log);
    b.transform(babelify)
    .bundle((err, res) => {
    const fileName = path.basename(file.path);
    const msg = `${$.util.colors.magenta(fileName)} is Browserified.` ;
    if (err) { return next(err); }
    $.util.log(msg);
    file.contents = res;
    next(null, file);
    });
    });

    gulp.task('js', () => {
    gulp.src('app/scripts/*.js')
    .pipe($.plumber())
    .pipe(bundler)
    // .on('finish', function(){
    // $.util.log(`Finished '${$.util.colors.cyan('Browserify')}'`);
    // reload();
    // }))
    .on('error', handleError)
    .pipe(gulp.dest('.tmp/scripts'))

    });
    */
