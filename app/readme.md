#广告系统管理
	目录的管理及gulp工具的搭建。
	
*使用jsHint
	官网：https://github.com/jshint/jshint/tree/master/examples
	使用：http://www.xiabingbao.com/gulp/2015/10/15/gulp-jshint/	
	jshint option: http://jshint.com/docs/options/
	http://jshint.com/docs/ 

//编译sass	
build-sass:	https://github.com/sindresorhus/gulp-ruby-sass
使用条件：
	进入app文件中，需要执行npm install

使用方式：	
    执行:gulp    //	直接打包生成文件

	开发阶段：gulp dev  //生成服务器，监听和压缩文件

	可选命令：gulp compress-images-spritesmith  //生成雪碧图

待提高的地方
	目录没有提取出来；
	开发监听的优点：可以直接查看编译后的效果。弊端：开发时直接压缩了文件，压缩文件不是必须的。
	雪碧图生成的css没有直接应用。

框架可以直接使用。路径可以做些调整。


