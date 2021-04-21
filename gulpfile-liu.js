// 引入 gulp
var gulp = require('gulp');
// 引入组件
var runSequence = require('run-sequence'),
	htmlmin = require('gulp-htmlmin'), //html压缩
  minifycss = require('gulp-minify-css'),//css压缩
  uglify = require('gulp-uglify'),//js压缩
  clean = require('gulp-clean'),//旧文件清理
	rev = require('gulp-rev'),//对文件名加MD5后缀
	revCollector = require('gulp-rev-collector');
//引入配置文件
var config = require("./src/config");

// 清理旧文件
gulp.task('clean', function() {  
  return gulp.src([config.dist_path+'/*'], {read: false})
    .pipe(clean());
});

// 压缩、重命名css
/*gulp.task('css', function() {
  return gulp.src(config.public_path+'/css/*.css')//压缩的文件
    .pipe(minifycss())//执行压缩
	.pipe(rev())//文件名添加MD5后缀
    .pipe(gulp.dest(config.dist_path+'/css'))//输出到文件
	.pipe(rev.manifest())
    .pipe(gulp.dest(config.dist_path+'/rev/css'));
});*/
// 重命名sass
gulp.task('css', function() {
  return gulp.src(config.public_path+'/css/*.css')//压缩的文件
  .pipe(rev())//文件名添加MD5后缀
    .pipe(gulp.dest(config.dist_path+'/css'))//输出到文件
  .pipe(rev.manifest())
    .pipe(gulp.dest(config.dist_path+'/rev/css'));
});

// 压缩、重命名js
gulp.task('js', function() {
  return gulp.src(config.public_path+'/js/*.js')
    .pipe(uglify())
	.pipe(rev())
    .pipe(gulp.dest(config.dist_path+'/js'))
	.pipe(rev.manifest())
    .pipe(gulp.dest(config.dist_path+'/rev/js'));
});

// 压缩html
gulp.task('html', function() {
  return gulp.src([config.dist_path+'/rev/**/*.json',config.public_path+'/*.html',,config.public_path+'/**/*.html'])
	.pipe(revCollector())
    .pipe(htmlmin({
        empty: true,
        spare: true,
        quotes: true
      })
    )
    .pipe(gulp.dest(config.dist_path));
});

// 清理manifest.json
gulp.task('delRev', function() {  
  return gulp.src([config.dist_path+'/rev',config.dist_path+'/scss/*.json',config.dist_path+'/less/*.json'], {read: false})
    .pipe(clean());
});
 
// 默认任务
gulp.task('default', function(){
  console.log('a frame used to manager web work.')
});

//正式构建
gulp.task('build', function (done) {
  runSequence(
    ['clean'],
    ['css', 'js'],
    ['html'],
    ['delRev'],
  done);
});
gulp.task('moveImage', ['build'], function() {
  return gulp.src(config.public_path+'/images/**/*')
    .pipe(gulp.dest(config.dist_path+'/images/'));
});
gulp.task('moveFont', ['moveImage'], function() {
  return gulp.src(config.public_path+'/fonts/**/*')
    .pipe(gulp.dest(config.dist_path+'/fonts/'));
});
gulp.task('moveCss', ['moveFont'], function() {
  return gulp.src(config.public_path+'/css/libs/**/*')
    .pipe(gulp.dest(config.dist_path+'/css/libs/'));
});
gulp.task('moveJs', ['moveCss'], function() {
  return gulp.src(config.public_path+'/js/libs/**/*')
    .pipe(gulp.dest(config.dist_path+'/js/libs/'));
});
gulp.task('prod', ['moveJs'], function() {
  console.log('task over!')
});

