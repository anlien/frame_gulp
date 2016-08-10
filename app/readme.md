环境依赖:   
    npm
    node
    gulp
    sass
    tmod
    requirejs   
   
安装依赖的方法：
	 执行npm install，安装依赖。

#使用方式: 
    执行:gulp    //	直接打包生成文件

	开发和维护阶段：
     安装依赖后，在src文件夹中打开命令窗口，执行gulp dev。执行的操作有：启动服务、监听本地文件、修改实时加载、监听sass文件等
  编码完成上线时：
     在src的命令窗口中执行gulp命令。执行的操作有：压缩html、压缩js、压缩图片、将css中小于8M的图片转换为base64图片。
	

src中的目录结构：
   css：存放sass编译后的css       
   docs：html文件          
       |____build——html的模板文件。生成方式：在template中打开git命令，执行tmod。    
       |____page———网站中html文件，文件中的script的js为html入口     
       |____staticSrc——网站中的静态html，页面布局文件    
       |____template——html的模板，用于生成动态的html文件，build的依赖文件。           
    
   images：存放img文件     
   js：交互的js文件                                    
   
       |____libs:第三方插件         
       |____advertiser:广告主
       |____historicalData：历史数据
       |____其他为客户端文件或共享文件
   
   node_modules                   
   
       |____插件使用的目录，第三方依赖的插件文件。例如，webserver、gulp、tmodjs等           
   
   sass             
   
        |____编写css的源文件。    

    tool
        |____编译amd类型js文件
        
    PRD
        |____页面的需求文档        
     
    .jshintrc:js校验文件依赖
    gulpfile.js：gulp的配置文件
    package.json：项目依赖的第三方文件

项目维护方法说明：

  项目中采用的是模块化开发的思路。一个静态页面被拆分为html的模板文件，利用tmodjs进行管理，统一打包生成一个文件（template名称及可改）。在html依赖的js文件中，利用模板动态生成html页面，并绑定交互。    
  
   tmodjs的在项目中使用方式简述：   
   
         tmodjs把待拼写html生成js模板，省去拼接的麻烦，使html抽象化并在不同的地方使用模板，使用的地点不限（原先是绑定到一个固定的js中，现在为共享）。可以将tmodjs生成的js文件理解为html代码片段。也可以将tmodjs生成的js合并到js中，使页面中模块话，这样可以拼装代码。

         



    
    


