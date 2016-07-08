var gulp= require('gulp');
var webserver =require('gulp-webserver');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');

var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var minifycss = require('gulp-minify-css');
var base64 = require('gulp-base64');

//精灵图
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');


//图片压缩
var imagemin = require('gulp-imagemin'),
    pagquant = require('imagemin-pngquant'),
    changed = require('gulp-changed');

//合并文件
var concat = require('gulp-concat');
var clean = require('gulp-clean');

var rename = require('gulp-rename');

//
var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

/***************************************************server************/
//web服务器
gulp.task('webserver',function(){
	gulp.src('.').
	pipe(webserver({
		livereload:true,
		directoryListing:true,	
		port:8080,
		open:true,
		fallback:'./index.html'
	}))
});

//监听任务
gulp.task('watch', function () {
    watch('js/*.js', batch(function (events, done) {
        gulp.start('compress-js', done);
    }));

    watch(['docs/*.html'],batch(function(events,done){
    	gulp.start('compress-html',done);
    }));

    watch(['*.html'],batch(function(events,done){
      gulp.start('compress-indexHtml',done);
    }));

	  watch(['sass/*.scss'],batch(function(events,done){
    	gulp.start('compress-sass',done);
    }));

    watch('images/**/*.{png,jpg,gif}',batch(function(events,done){
       gulp.start('compress-images',done);
    }));
});
/***************************************************html************/
//压缩html
gulp.task('compress-html', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['docs/*.html'])
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest('../dist/docs'));
});

//压缩首页代码   
gulp.task('compress-indexHtml', function() {
  return gulp.src('./index.html')
    .pipe(usemin({    
      css: [ rev() ],
      css1: [ rev() ],
      html: [ minifyHtml({ empty: true }) ],
      js: [ uglify(), rev() ],
      js1: [ uglify(), rev() ],
      js2: [ uglify(), rev() ],
      js3: [ uglify(), rev() ],
      inlinejs: [ uglify() ],
      inlinejs1: [ uglify() ],
    }))
    .pipe(gulp.dest('../dist/'));
});
/***************************************************js************/
//压缩js
gulp.task('compress-js',function(){
  return gulp.src('js/*.js') 
  .pipe(jshint())  
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(concat('index.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('../dist/js'))
});

//合并依赖包
gulp.task('compress-libs-js',function(){
  gulp.src('js/libs/*.min.js')
  .pipe(concat('depend.js'))
  .pipe(gulp.dest('../dist/js/libs'))
});

//合并压缩后的文件
gulp.task('compress-own-js',function(){
  gulp.src('../dist/js/*.js')
  .pipe(concat('index.min.js'))
  .pipe(gulp.dest('../dist/js/libs'))
});

/***************************************************sass||css************/
//编译sass
gulp.task('compress-sass',function(){
	sass('sass/*.scss',{
		  precision: 6,
          stopOnError: true,
          cacheLocation: '.sass-cache',
          style:'compressed',
          precision:2
	  })
       .on('error', sass.logError)
       .pipe(gulp.dest('../dist/css'))
    }
); 

//压缩css
gulp.task('compress-css',function(){
  return gulp.src('css/*.css')
         .pipe(minifycss())
         .pipe(gulp.dest('../dist/css'))
});

/***************************************************images***********/
//压缩图片
gulp.task('compress-images',function(){
  return gulp.src('images/**/*.{png,jpg,gif}') // 指明源文件路径、并进行文件匹配
    .pipe(changed('../dist/images'))
    .pipe(imagemin({
      progressive: true, // 无损压缩JPG图片
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    }))
    .pipe(gulp.dest('../dist/images')); // 输出路径
});

//直接生成雪碧图 
gulp.task('compress-images-spritesmith',function(){
 var spriteData = gulp.src('images/bg/*.png').pipe(spritesmith({
    retinaSrcFilter: ['images/bg/*@2x.png'],
    imgName: 'sprite.png',
    retinaImgName: 'sprite@2x.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('../dist/images/spritesmith'));
});

//参考：https://github.com/Wenqer/gulp-base64
gulp.task('compress-image-base64',function(){
   return gulp.src('./css/*.css')
          .pipe(base64({maxImageSize: 8*1024}))
          // .pipe(concat('main.css')) //可以合并多个css为一个文件
          .pipe(gulp.dest('../dist/css'))
});

/***************************************************命令***********/
//清除命令
gulp.task('clean',function(){
  return gulp.src('../dist/*.html',{read:false})
         .pipe(clean());         
});

//生成雪碧图
gulp.task('build',['compress-images-spritesmith']);

//开发命令
gulp.task('dev',['webserver','watch']);

//默认
gulp.task('default',['compress-indexHtml','compress-html','compress-sass','compress-js','compress-images']);