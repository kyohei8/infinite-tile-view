import gulp from 'gulp';

// 静的ファイルを移動
gulp.task('extras', () => {
  gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));

  gulp.src([
    'app/assets/**/*',
    '!app/assets/images/',
    '!app/assets/fonts/'
  ], {
    dot: false
  }).pipe(gulp.dest('dist/assets'));

});
