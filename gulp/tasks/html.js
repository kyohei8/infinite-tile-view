import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// ※ gulp jsを先に実行しておくこと
gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({
    searchPath: ['{app, !app/scripts', '.']
  });
  const jsCssAssets = $.useref.assets({
    searchPath: ['.tmp']
  });

  return gulp.src('app/*.html')
    .pipe(jsCssAssets)
    .pipe($.if('*.js', $.uglify().on('error', $.util.log )))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(jsCssAssets.restore())
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});
