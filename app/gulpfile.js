var gulp= require('gulp');
var webserver =require('gulp-webserver');
var watch = require('gulp-watch');
var batch = require('gulp-batch');///服务的东西

var uglify = require('gulp-uglify');//合并的东西
var minifyHtml = require('gulp-minify-html');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');

var sass = require('gulp-ruby-sass');//sass与css
var plumber = require('gulp-plumber');
var minifycss = require('gulp-minify-css');


//精灵图
var buffer = require('vinyl-buffer');//雪碧图
var csso = require('gulp-csso');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var base64 = require('gulp-base64');

//图片压缩
var imagemin = require('gulp-imagemin'), //正常图片的压缩
    pagquant = require('imagemin-pngquant'),
    changed = require('gulp-changed');

//合并文件
var concat = require('gulp-concat');//操作文件时使用的一些工具
var clean = require('gulp-clean');
var rename = require('gulp-rename');


var jshint = require('gulp-jshint'),  //js的校验
    stylish = require('jshint-stylish');

//gulp-tmod ——————————一种模板
var tmodjs = require('gulp-tmod');

//目录
//src:源文件
//dist:生成文件存放的目录
var directory={
    indexHtml:{ //默认目录下的index.html文件
      src:"index.html",
      dist:"../dist"
    },
    html:{
      src:'docs/**/*.html',
      dist:'../dist/docs'
    },
    js:{
      src:"js/**/*.js",
      dist:"../dist/js",
      concatName:"index.min.js" //多个文件合并成一个文件      
    },
    sass:{
      src:"sass/*.scss",
      dist:"./css"
    },
    css{
      src:"css/*.css",
      dist:"../dist/css"
    },
    images:{
      src:'images/*.{png,jpg,gif}',//需要指明要压缩的文件；需要区分雪碧图，与正常的图片
      dist:"../dist/images"
    },
    sprites:{ //雪碧图(精灵图)。即将多个小图片合并成一张图片，并生成css。在css中有雪碧图的位置
      src:"images/sprites/*.png",//要压缩的文件
      dist:"../dist/images/spritesmith",//雪碧图存放的目录
      retinaSrcFilter: ['images/bg/*@2x.png'], //如果是retina图片的话，可以抽出合并为2倍图。以此类推，可以合并三倍图
      imgName: 'sprite.png', //雪碧图的名称。名字可以修改
      retinaImgName: 'sprite@2x.png',//2倍retina图的名称
      cssName: 'sprite.css'//合并后原来图片的位置与使用方式。方便使用
    },
    base64:{
      src:"./css/*.css",
      dist:"./css/*.css"
    }
};


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

//监听这一个文件即可
gulp.task("devWatch",function(){
    watch(['sass/*.scss'],batch(function(events,done){
      gulp.start('compress-sass',done);
    }));
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
  gulp.src([director.html["src"]])
    .pipe(minifyHtml(opts))
    .pipe(gulp.dest(director.html.dist));
});

//压缩首页代码    单个文件压缩
gulp.task('compress-indexHtml', function() {
  return gulp.src(director.indexHtml["src"])
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
    .pipe(gulp.dest(director.indexHtml["dist"]));
});
/***************************************************js************/
//压缩js
gulp.task('compress-js',function(){
  return gulp.src(director.js["src"]) 
  .pipe(jshint())  
  .pipe(jshint.reporter('jshint-stylish')) /*stylish：一种更改jshint打印*****/
  .pipe(concat(director.js["concatName"])) //合并到一个文件，可注释这行
  .pipe(uglify())
  .pipe(gulp.dest(director.js["dist"]))
});

//合并依赖包
gulp.task('compress-libs-js',function(){ /*将依赖包合并为一个文件*************/
  gulp.src('js/libs/*.min.js')
  .pipe(concat('depend.js'))
  .pipe(gulp.dest('../dist/js/libs'))
});

//合并压缩后的文件
gulp.task('compress-own-js',function(){ //将编写的js合并为一个文件
  gulp.src(director.js["dist"]+'/*.js')
  .pipe(concat(director.js["concatName"]))
  .pipe(gulp.dest(director.js["dist"]))
});

/***************************************************sass||css************/
//编译sass
gulp.task(director.sass["src"],function(){
	sass('sass/*.scss',{
		  precision: 6,
          stopOnError: true,
          cacheLocation: '.sass-cache',
          style:'compressed',
          precision:2
	  })
       .on('error', sass.logError)
       .pipe(gulp.dest(director.sass["dist"]))
    }
); 

//压缩css
gulp.task('compress-css',function(){
  return gulp.src(director.css["src"])
         .pipe(minifycss())
         .pipe(gulp.dest(director.css["dist"]))
});

/***************************************************images***********/
//压缩图片   
gulp.task('compress-images',function(){
  return gulp.src(director.images["src"]) // 指明源文件路径、并进行文件匹配     
    .pipe(imagemin({use: [pagquant({quality:3,posterize:8})]}))///使用pngquant插件(imageMin的一个插件)进行深度压缩  // 无损压缩JPG图片
    .pipe(gulp.dest(director.images["dist"]))
});

//直接生成雪碧图
gulp.task('compress-images-spritesmith',function(){
 var spriteData = gulp.src(director.sprites["src"]).pipe(spritesmith({
    retinaSrcFilter: director.sprites.retinaSrcFilter, 
    imgName: director.sprites.sprite,
    retinaImgName: director.sprites.retinaImgName,
    cssName: director.sprites.cssName
  }));
  return spriteData.pipe(gulp.dest(director.sprites["dist"]));
});

//参考：https://github.com/Wenqer/gulp-base64___可挑选的工具
gulp.task('compress-image-base64',function(){
   return gulp.src(director.base64["src"])
          .pipe(base64({maxImageSize: 8*1024}))
          //.pipe(concat('main.css')) //可以合并多个css为一个文件
          .pipe(gulp.dest(director.base64["dist"]))
});

/***************************************************命令***********/
//清除命令
gulp.task('clean',function(){
  return gulp.src('../dist/*.html',{read:false})
         .pipe(clean());         
});

//tmodjs 
//使用腾讯的tmod模板，前台的一个模板。优势在前端js中使用模板，没有复杂的类库。
//缺点：依赖一个tmod.js有一些冗余代码。
//优势：前端使用模板，和后台的类似，没有过多的冗余js

gulp.task('tmod',function(){   
  var stream = gulp.src('docs/**/*.html')
            .pipe(tmodjs({        
              "charset": "utf-8",
              "syntax": "simple",
              "helpers": null,
              "escape": true,
              "compress": true,
              "type": "amd",            
              "combo": true,             
              "cache": false
            }))
            .pipe(concat('tmod.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('../js'));
  return stream;
});

//生成雪碧图
gulp.task('build',['compress-images-spritesmith']);

//如果不更改sass，不必使用监听命令
//开发命令——————————————更改sass文件时执行的命令
gulp.task('dev',['webserver','devWatch']);

//不更改sass，不必使用监听。 //web服务支持动态加载，更改即可看到效果。
gulp.task("pre",['webserver']);

//默认
gulp.task('default',['compress-indexHtml','compress-html','compress-sass','compress-js','compress-images']);
  

//维护与优化：
  //背景图替换为 base64 或者 使用雪碧图
  /* 
  *
  */