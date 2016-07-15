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



///  tmodjs语法

=======================================================================================# 模板语法（simple）注意事项================
TmodJS 默认采用 simple 语法，它非常易于读写。

## 表达式

``{{`` 与 ``}}`` 符号包裹起来的语句则为模板的逻辑表达式。

### 输出表达式

对内容编码输出：

    {{content}}

不编码输出：

    {{#content}}
    
编码可以防止数据中含有 HTML 字符串，避免引起 XSS 攻击。

### 条件表达式

    {{if admin}}
		<p>admin</p>
    {{else if code > 0}}
    	<p>master</p>
    {{else}}
        <p>error!</p>
    {{/if}}

### 遍历表达式

无论数组或者对象都可以用 each 进行遍历。

    {{each list as value index}}
        <li>{{index}} - {{value.user}}</li>
    {{/each}}

亦可以被简写：

    {{each list}}
        <li>{{$index}} - {{$value.user}}</li>
    {{/each}}

### 模板包含表达式

用于嵌入子模板。

    {{include 'template_name'}}

子模板默认共享当前数据，亦可以指定数据：

    {{include 'template_name' news_list}}
    
####	include 路径规范约定

1.	路径不能带后缀名
2.	路径不能够进行字符串运算
3.	路径不能使用变量代替
4.	必须使用以``.``开头的相对路径

## 辅助方法

    {{time | dateFormat:'yyyy-MM-dd hh:mm:ss'}}

支持传入参数与嵌套使用：

    {{time | say:'cd' | ubb | link}}

定义辅助方法请参考：<https://github.com/aui/tmodjs/wiki/辅助方法>



///////////////////////////////////////////////////////////////////////////////css书写规范/


css书写顺序：
	css 属性书写顺序, 建议遵循 布局定位属性-->自身属性-->文本属性-->其他属性. 

头：header
内容：content/container
尾：footer
导航：nav
侧栏：sidebar
栏目：column
页面外围控制整体布局宽度：wrapper
左右中：left right center
登录条：loginbar
标志：logo
广告：banner
页面主体：main
热点：hot
新闻：news
下载：download
子导航：subnav
菜单：menu
子菜单：submenu
搜索：search
友情链接：friendlink
页脚：footer
版权：copyright
滚动：scroll
内容：content
标签页：tab
文章列表：list
提示信息：msg
小技巧：tips
栏目标题：title
加入：joinus
指南：guild
服务：service
注册：regsiter
状态：status
投票：vote
合作伙伴：partner
(二)注释的写法:
/* Footer */
内容区
/* End Footer */
(三)id 的命名:
(1)页面结构
容器: container
页头：header
内容：content/container
页面主体：main
页尾：footer
导航：nav
侧栏：sidebar
栏目：column
页面外围控制整体布局宽度：wrapper
左右中：left right center
(2)导航
导航：nav
主导航：mainbav
子导航：subnav
顶导航：topnav
边导航：sidebar
左导航：leftsidebar
右导航：rightsidebar
菜单：menu
子菜单：submenu
标题: title
摘要: summary
(3)功能
标志：logo
广告：banner
登陆：login
登录条：loginbar
注册：regsiter
搜索：search
功能区：shop
标题：title
加入：joinus
状态：status
按钮：btn
滚动：scroll
标签页：tab
文章列表：list
提示信息：msg
当前的: current
小技巧：tips
图标: icon
注释：note
指南：guild
服务：service
热点：hot
新闻：news
下载：download
投票：vote
合作伙伴：partner
友情链接：link
版权：copyright\

网页缓存：
<META HTTP-EQUIV="pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
<META HTTP-EQUIV="expires" CONTENT="0">
	


