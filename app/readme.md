gulp的基本架子
	
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
	
更改的目标与目的：
	优化sass的使用方式，一些基础的样式可以提取出来。不能每次写的，与后面写的无关。
	可以将css模块化，更改参数的方式使css复用，增加开发效率。
	提取日历控件，增强通用性，提高抽象性、可维护性、复用性。

	年轻在于折腾！
	





