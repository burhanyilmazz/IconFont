/* required methods */
var gulp = require('gulp');
var concat = require('gulp-concat'); /* CSS ve JS dosyalarınızı tek bir dosyada toplayabilirsiniz */
var rename = require('gulp-rename'); /* isim değiştirme */
var uglify = require('gulp-uglify'); /* Javascript dosyalarınızı  */
var runSequence = require('run-sequence'); /* Belirtilen sırayla gulp methodları çalıştırır */
var watch = require('gulp-watch'); /* Değişiklikleri takip eder otomatik değiştirir */
var less = require('gulp-less'); /* Sass */
var autoprefixer = require('gulp-autoprefixer'); /* CSS kodlarına eski browserlara göre  -webkit gibi eklentiler ekler */
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now() / 1000);
var path = require('path');
/* task */


gulp.task('less', function () {
    gulp.src(['./assets/stylesheets/main.less'])
    .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('iconFont', function () {
    return gulp.src(['./assets/images/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: 'IconFont',
            path: './assets/stylesheets/_icons.less',
            targetPath: '../../stylesheets/master/_icons.less',
            fontPath: '../fonts/icons/'
        }))
        .pipe(iconfont({
            fontName: 'IconFont', // required
            prependUnicode: true, // recommended option
            formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
            timestamp: runTimestamp, // recommended to get consistent builds when watching img
        }))
        .pipe(gulp.dest('./assets/fonts/icons/'));
});



gulp.task('watch', function () {
    gulp.watch('./assets/stylesheets/**/**/*.less', ['less']);    
});

gulp.task('default', function (callback) {
    runSequence('less', 'watch', callback);
});
