import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';

// スプライト対象の画像
const imgSrc = 'app/assets/images/sprites/*.png';
// spritesmithのオプション
const spriteOpt = {
  imgName        : 'sprites.png',   // スプライト画像
  retinaImgName  : 'sprites@2x.png',
  retinaSrcFilter: ['app/assets/images/sprites/*@2x.png'],
  imgPath        : '../assets/images/sprites.png', // sassに記載されるパス
  retinaImgPath  : '../assets/images/sprites@2x.png',
  cssName        : '_sprite.scss', // 出力されるcssとそのフォーマット
  cssFormat      : 'scss_retina',
  padding        : 10
};

// スプライト画像、CSSを作成
gulp.task('sprite', () => {
  const spriteData = gulp.src(imgSrc).pipe(spritesmith(spriteOpt));
  spriteData.img.pipe(gulp.dest('app/assets/images'));
  spriteData.css.pipe(gulp.dest('app/assets/styles/modules/'));
});
