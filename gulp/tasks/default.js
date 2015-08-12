import gulp from 'gulp';

gulp.task('default', ['clean'], () => {
  // TODO 次のgulpのバージョンから使えなくなる
  gulp.start('build');
});
