依赖:   
   sass  
   tmodjs  
   gulp  
   
安装依赖的方法：
	进入app文件中，在有package.json中，需要执行npm install

环境依赖：     

    tmodjs
    jshint
    rudy-sass

#使用方式: 
    执行:gulp    //	直接打包生成文件

	开发阶段：gulp dev  //生成服务器，监听和压缩文件

	可选命令：gulp compress-images-spritesmith  //生成雪碧图

目录结构：
   css：存放sass编译后的css    
   data：模拟的json数据    
   docs：html文件       
   
       |____build——html的模板文件。生成方式：在template中打开git命令，执行tmod。    
       |____page———网站中html文件，文件中的script的js为html入口     
       |____staticSrc——网站中的静态html，页面布局文件    
       |____template——html的模板，用于生成动态的html文件，build的依赖文件。           
    
   images：存放img文件     
   js：交互的js文件                                    
   
       |____libs:第三方插件         
       |____其他文件，需要再次调整。待优化的地方：组件化的东西没有提出来，js设计模式不明显，不够抽象化；目录中分不清文件的的归属，不够直观。               
   
   node_modules                   
   
       |____插件使用的目录，第三方依赖的插件文件。例如，webserver、gulp、tmodjs等           
   
   sass                
   
        |____编写css的源文件。语法同css，使用原因：css解构更加清晰；    
          |___目录待优化的地方，可参考：http://www.w3cplus.com/preprocessor/sass-guidelin-part-4.html。       
          |_sass中的文件完全可以，一个方法做一个文件，再利用node进行整合起来。可以多参考参考目录进行优化   
     
    .jshintrc:js校验文件依赖
    gulpfile.js：gulp的配置文件
    package.json：项目依赖的第三方文件

项目维护方法说明：

  项目中采用的是模块化开发的思路。项目中页面相似的文件被拆分为html的模板文件，利用tmodjs进行管理，统一打包生成一个build文件（名称及可改），在html依赖的js文件中，利用模板动态生成html页面并绑定交互。    
  
   tmodjs的在项目中使用方式简述：   
   
         tmodjs把待拼写html生成js模板，省去拼接的麻烦，使html抽象化并可以多次在不同的地方使用模板，使用的地点不限（原先是绑定到一个固定的js中）。与angularjs的指令有点相似，只要使用指令就可以在不同的地方使用html代码片段。   
         


启动项目的方法：
    在src中执行gulp dev。
    在docs的template文件中，执行tmod。——动态生成build文件	