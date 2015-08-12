import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();

const LintOption = {
  useEslitrc: true
};

const testLintOptions = {
  env: {
    mocha: true
  },
  globals: {
    assert: false,
    expect: false,
    should: false
  }
};

function lint(files, options) {
  return () => {
    gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      // browserSyncが有効な場合は止まらない
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

gulp.task('lint', lint('app/scripts/**/*.js', LintOption));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));
