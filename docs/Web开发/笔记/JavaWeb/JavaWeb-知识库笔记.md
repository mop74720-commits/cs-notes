# JavaWeb-知识库笔记

**JavaWeb笔记**

**一、Web开发介绍**

**Web**：全球广域网，也称为**万维网**(www **W**orld **W**ide **W**eb)，指能够通过浏览器访问的**网站**，如京东、淘宝、百度等网站。

**1.网站的工作流程**

首先我们需要通过**浏览器**访问发布到**前端服务器**中的**前端程序**，这时候前端程序会将前端代码返回给浏览器

浏览器得到前端代码，此时浏览器会将前端代码进行解析，然后展示到浏览器的窗口中，这时候我们就看到了**网站**的**页面**

但是此时这个页面是没有数据的，因为数据在数据库中，浏览器需要根据**前端代码中指定的后台服务器的地址** 向**后台服务器**（内部有java程序）发起**请求**，后台服务器再去从**数据库**中获取数据，然后返回给浏览器

浏览器拿到后台返回的数据后，然后将数据展示在前端资源也就是**网页**上，然后我们就看到了完整的网页内容

<img src=".assets/JavaWeb-知识库笔记/media/image1.png" style="width:5.75in;height:2.88542in" />

**2.网站的开发模式**

**2.1 前后端分离**

前端人员开发前端程序，前端程序单独部署到前端服务器上

后端人员开发后端程序，后端程序单独部署到后端服务器上

<img src=".assets/JavaWeb-知识库笔记/media/image2.png" style="width:5.75in;height:2.58333in" />

**2.2 混合开发**

前端人员开发的代码和后端人员开发的代码在同一个项目中，一起打包部署。

<img src=".assets/JavaWeb-知识库笔记/media/image3.png" style="width:5.75in;height:2.57292in" />

**二、HTML+CSS**

文档查询：

**\[该类型的内容暂不支持下载\]**

**1.HTML快速入门**

**1.1 html概述**

**基础结构**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;html&gt;<br />
&lt;head&gt;<br />
&lt;title&gt; &lt;/title&gt;<br />
&lt;/head&gt;<br />
&lt;body&gt;<br />
&lt;/body&gt;<br />
&lt;/html&gt;</td>
</tr>
</tbody>
</table>

\<title\>中定义标题显示在浏览器的标题位置，\<body\>中定义的内容会呈现在浏览器的内容区域

**标签特点**

HTML标签不区分大小写

HTML标签的属性值，采用单引号、双引号都可以

HTML语法相对比较松散 (建议大家编写HTML标签的时候尽量严谨一些)

**1.2 基础标签&样式**

新浪新闻原始网页：

**\[该类型的内容暂不支持下载\]**

**1.2.1 标题排版**

**图片标签 img**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
A. 图片标签: &lt;img&gt;<br />
<br />
B. 常见属性:<br />
src: 指定图像的url (可以指定 绝对路径 , 也可以指定 相对路径)<br />
width: 图像的宽度 (像素 / 百分比 , 相对于父元素的百分比)<br />
height: 图像的高度 (像素 / 百分比 , 相对于父元素的百分比)<br />
<br />
备注: 一般width 和 height 只会指定一个，另外一个会自动的等比例缩放。<br />
<br />
C. 路径书写方式:<br />
绝对路径:<br />
1. 绝对磁盘路径: C:\Users\Administrator\Desktop\HTML\img\news_logo.png<br />
&lt;img src="C:\Users\Administrator\Desktop\HTML\img\news_logo.png"&gt;<br />
<br />
2. 绝对网络路径: https://i2.sinaimg.cn/dy/deco/2012/0613/yocc20120613img01/news_logo.png<br />
&lt;img src="https://i2.sinaimg.cn/dy/deco/2012/0613/yocc20120613img01/news_logo.png"&gt;<br />
<br />
相对路径:<br />
./ : 当前目录 , ./ 可以省略的<br />
../: 上一级目录</td>
</tr>
</tbody>
</table>

**标题标签 h**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
A. 标题标签: &lt;h1&gt; - &lt;h6&gt;<br />
<br />
&lt;h1&gt;111111111111&lt;/h1&gt;<br />
&lt;h2&gt;111111111111&lt;/h2&gt;<br />
...<br />
<br />
B. 效果 : h1为一级标题，字体也是最大的 ； h6为六级标题，字体是最小的。</td>
</tr>
</tbody>
</table>

**水平分页线标签**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;hr&gt; 或 &lt;hr /&gt;</td>
</tr>
</tbody>
</table>

**1.2.2 标题样式**

**1.2.2.1 CSS引入方式**

具体有3种引入方式，语法如下表格所示：

|          |                                               |                                               |
|----------|-----------------------------------------------|-----------------------------------------------|
| 名称     | 语法描述                                      | 示例                                          |
| 行内样式 | 在标签内使用style属性，属性值是css属性键值对  | \<h1 style="xxx:xxx;"\>中国新闻网\</h1\>      |
| 内嵌样式 | 定义\<style\>标签，在标签内部定义css样式      | \<style\> h1 {...} \</style\>                 |
| 外联样式 | 定义\<link\>标签，通过href属性引入外部css文件 | \<link rel="stylesheet" href="css/news.css"\> |

内联样式会出现大量的代码冗余，不方便后期的维护，所以不常用

内部样式，通过定义css选择器，让样式作用于当前页面的指定的标签上

外部样式，html和css实现了完全的分离，企业开发常用方式

**1.2.2.2 颜色表示**

在前端程序开发中，颜色的表示方式常见的有如下三种：

|                |                                   |                                              |
|----------------|-----------------------------------|----------------------------------------------|
| **表示方式**   | **表示含义**                      | **取值**                                     |
| 关键字         | 预定义的颜色名                    | red、green、blue...                          |
| rgb表示法      | 红绿蓝三原色，每项取值范围：0-255 | rgb(0,0,0)、rgb(255,255,255)、rgb(255,0,0)   |
| 十六进制表示法 | \#开头，将数字转换成十六进制表示  | \#000000、#ff0000、#cccccc，简写：#000、#ccc |

**1.2.2.3 CSS选择器**

选择器是选取需设置样式的元素（标签），根据业务场景不同，选择的标签的需求也是多种多样的，所以选择器有很多种，这里值介绍三种：元素选择器、id选择器、class选择器

**选择器通用语法**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>CSS<br />
选择器名 {<br />
css样式名：css样式值;<br />
css样式名：css样式值;<br />
}</td>
</tr>
</tbody>
</table>

**元素（标签）选择器**

选择器的名字必须是标签的名字

作用：选择器中的样式会作用于所有同名的标签上

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>CSS<br />
元素名称 {<br />
css样式名:css样式值；<br />
}<br />
<br />
例如：<br />
div{<br />
color: red;<br />
}</td>
</tr>
</tbody>
</table>

**id选择器**

选择器的名字前面需要加上#

作用：选择器中的样式会作用于指定id的标签上，而且有且只有一个标签（由于id是唯一的）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>CSS<br />
#id属性值 {<br />
css样式名:css样式值；<br />
}<br />
<br />
例如：<br />
#did {<br />
color: blue;<br />
}</td>
</tr>
</tbody>
</table>

**类选择器**

选择器的名字前面需要加上.

作用：选择器中的样式会作用于所有class的属性值和该名字一样的标签上，可以是多个

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>CSS<br />
.class属性值 {<br />
css样式名:css样式值；<br />
}<br />
<br />
例如：<br />
.cls{<br />
color: green;<br />
}</td>
</tr>
</tbody>
</table>

**1.2.3 超链接**

标签: \<a href="..." target="..."\>央视网\< /a\>

属性:

href: 指定资源访问的url

target: 指定在何处打开资源链接

\_self: 默认值，在当前页面打开

\_blank: 在空白页面打开

**1.2.4 正文排版**

**视频、音频标签**

视频标签: \<video\>

属性:

src: 规定视频的url

controls: 显示播放控件

width: 播放器的宽度

height: 播放器的高度

音频标签: \<audio\>

属性:

src: 规定音频的url

controls: 显示播放控件

**段落标签**

换行标签: \<br\>

注意: 在HTML页面中,我们在编辑器中通过回车实现的换行, 仅仅在文本编辑器中会看到换行效果, 浏览器是不会解析的, HTML中换行需要通过br标签

段落标签: \<p\>

如: \<p\> 这是一个段落 \</p\>

**文本格式标签**

|        |      |            |
|--------|------|------------|
| 效果   | 标签 | 标签(强调) |
| 加粗   | b    | strong     |
| 倾斜   | i    | em         |
| 下划线 | u    | ins        |
| 删除线 | s    | del        |

前面的标签 b、i、u、s 就仅仅是实现加粗、倾斜、下划线、删除线的效果，是没有强调语义的。 而后面的strong、em、ins、del在实现加粗、倾斜、下划线、删除线的效果的同时，还带有强调语义。

*text-indent: 设置段落的首行缩进*

*line-height: 设置行高*

*text-align: 设置对齐方式, 可取值为 left / center / right*

在HTML页面中无论输入了多少个空格, 最多只会显示一个。 可以使用空格占位符&nbsp;来生成空格，如果需要多个空格，就使用多次占位符。

那在HTML中，除了空格占位符以外，还有一些其他的占位符(了解, 只需要知道空格的占位符写法即可)，如下：

|          |        |        |
|----------|--------|--------|
| 显示结果 | 描述   | 占位符 |
|          | 空格   | &nbsp; |
| \<       | 小于号 | &lt;   |
| \>       | 大于号 | &gt;   |
| &        | 和号   | &amp;  |
| "        | 引号   | &quot; |
| '        | 撇号   | &apos; |

**1.2.5 页面布局**

**1.2.5.1 盒子模型**

盒子：页面中所有的元素（标签），都可以看做是一个 盒子，由盒子将页面中的元素包含在一个矩形区域内，通过盒子的视角更方便的进行页面布局

盒子模型组成：内容区域（content）、内边距区域（padding）、边框区域（border）、外边距区域（margin）

盒子的大小，其实就包括三个部分： border、padding、content，而margin外边距是不包括在盒子之内的

<img src=".assets/JavaWeb-知识库笔记/media/image4.png" style="width:5.75in;height:3.54167in" />

**1.2.5.2 布局标签**

布局标签：实际开发网页中，会大量频繁的使用 div 和 span 这两个没有语义的布局标签。

标签：\<div\> \<span\>

特点：

div标签：

一行只显示一个（独占一行）

宽度默认是父元素的宽度，高度默认由内容撑开

可以设置宽高（width、height）

span标签：

一行可以显示多个

宽度和高度默认由内容撑开

不可以设置宽高（width、height）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;!DOCTYPE html&gt;<br />
&lt;html lang="en"&gt;<br />
&lt;head&gt;<br />
&lt;meta charset="UTF-8"&gt;<br />
&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;<br />
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;<br />
&lt;title&gt;盒子模型&lt;/title&gt;<br />
&lt;style&gt;<br />
div {<br />
width: 200px; /* 宽度 */<br />
height: 200px; /* 高度 */<br />
box-sizing: border-box; /* 指定width height为盒子的高宽 */<br />
background-color: aquamarine; /* 背景色 */<br />
<br />
padding: 20px 20px 20px 20px; /* 内边距, 上 右 下 左 , 边距都一行, 可以简写: padding: 20px;*/<br />
border: 10px solid red; /* 边框, 宽度 线条类型 颜色 */<br />
margin: 30px 30px 30px 30px; /* 外边距, 上 右 下 左 , 边距都一行, 可以简写: margin: 30px; */<br />
}<br />
&lt;/style&gt;<br />
&lt;/head&gt;<br />
<br />
&lt;body&gt;<br />
&lt;div&gt;A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A &lt;/div&gt;<br />
&lt;/body&gt;<br />
&lt;/html&gt;</td>
</tr>
</tbody>
</table>

**1.3 表格标签**

**标签：**

\<table\> : 用于定义整个表格, 可以包裹多个 \<tr\>， 常用属性如下：

border：规定表格边框的宽度

width：规定表格的宽度

cellspacing: 规定单元格之间的空间

\<tr\> : 表格的行，可以包裹多个 \<td\>

\<td\> : 表格单元格(普通)，可以包裹内容 , 如果是表头单元格，可以替换为 \<th\>

**1.4 表单标签**

表单场景: 表单就是在网页中负责数据采集功能的，如：注册、登录的表单。

表单标签: \<form\>

表单属性:

action: 表单提交的url, 往何处提交数据 . 如果不指定, 默认提交到当前页面

method: 规定用于发送表单数据的方式，常见为： GET、POST

GET：表单数据是拼接在url后面的， 如： xxxxxxxxxxx?username=Tom&age=12，url中能携带的表单数据大小是有限制的

POST： 表单数据是在请求体（消息体）中携带的，参数大小没有限制。通过浏览器NetWork下的Payload可以查看提交的信息

表单项标签: 不同类型的input元素、下拉列表、文本域等

input: 定义表单项，通过type属性控制输入形式

select: 定义下拉列表

textarea: 定义文本域

|                                                                                                                                         |
|-----------------------------------------------------------------------------------------------------------------------------------------|
| **注意事项**：表单中的所有表单项，要想能够正常的采集数据，在提交的时候能提交到服务端，表单项必须指定name属性， 否则，无法提交该表单项。 |

**1.4.1 表单项**

在一个表单中，可以存在很多的表单项，而虽然表单项的形式各式各样，但是表单项的标签其实就只有三个，分别是：

\<input\>: 表单项 , 通过type属性控制输入形式

|                          |                                      |
|--------------------------|--------------------------------------|
| type取值                 | **描述**                             |
| text                     | 默认值，定义单行的输入字段           |
| password                 | 定义密码字段                         |
| radio                    | 定义单选按钮                         |
| checkbox                 | 定义复选框                           |
| file                     | 定义文件上传按钮                     |
| date/time/datetime-local | 定义日期/时间/日期时间               |
| number                   | 定义数字输入框                       |
| email                    | 定义邮件输入框                       |
| hidden                   | 定义隐藏域                           |
| submit / reset / button  | 定义提交按钮 / 重置按钮 / 可点击按钮 |

\<select\>: 定义下拉列表, \<option\> 定义列表项

\<textarea\>: 文本域

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意事项</strong>：</p>
<p>对于radio单选按钮，必须为每一个radio表单项指定同一个name属性值，否则达不到单选效果</p>
<p>复选框也要指定相同的name属性，否则毫无意义</p>
<p>可以通过&lt;label&gt;标签扩大表单元素的范围</p></td>
</tr>
</tbody>
</table>

**三、JavaScript**

文档查询：

**\[该类型的内容暂不支持下载\]**

**1.引入方式**

**第一种方式**：内部脚本，将JS代码定义在HTML页面中

JavaScript代码必须位于\<script\>\</script\>标签之间

在HTML文档中，可以在任意地方，放置任意数量的\<script\>

一般会把脚本置于\<body\>元素的底部，可改善显示速度

例子：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;script&gt;<br />
    alert("Hello JavaScript")<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

**第二种方式**：外部脚本将， JS代码定义在外部JS文件中，然后引入到HTML页面中

外部JS文件中，只包含JS代码，不包含\<script\>标签

引入外部js的\<script\>标签，必须是双标签

例子：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;script src="js/demo.js"&gt;&lt;/script&gt;</td>
</tr>
</tbody>
</table>

**注意**：demo.js中只有js代码，没有\<script\>标签。

**2.基础语法**

**2.1 书写语法**

区分大小写：与 Java 一样，变量名、函数名以及其他一切东西都是区分大小写的

每行结尾的分号可有可无

大括号表示代码块

注释：

单行注释：// 注释内容

多行注释：/\* 注释内容 \*/

js中3钟输出语句：

|                  |                                    |
|------------------|------------------------------------|
| api              | 描述                               |
| window.alert()   | 警告框，window.可以省略，即alert() |
| document.write() | 在HTML 页面输出内容                |
| console.log()    | 写入浏览器控制台                   |

**2.2 变量**

js中主要通过如下3个关键字来声明变量：

|        |                                                                         |
|--------|-------------------------------------------------------------------------|
| 关键字 | 解释                                                                    |
| var    | 早期ECMAScript5中用于变量声明的关键字                                   |
| let    | ECMAScript6中新增的用于变量声明的关键字，相比较var，let只在代码块内生效 |
| const  | 声明常量的，常量一旦声明，不能修改                                      |

在js中声明变量还需要注意如下几点：

JavaScript 是一门弱类型语言，变量可以存放不同类型的值

变量名需要遵循如下规则：

组成字符可以是任何字母、数字、下划线（\_）或美元符号（\$）

数字不能开头

建议使用驼峰命名

var和let的区别：

var声明的变量的作用域是全局的，而且可以重复定义

let所声明的变量，只在 let关键字所在的代码块内有效，且不允许重复声明

**2.3 数据类型和运算符**

**2.3.1 数据类型**

虽然js是弱数据类型的语言，但是js中也存在数据类型，js中的数据类型分为 ：原始类型 和 引用类型，具体有如下类型：

|           |                                                    |
|-----------|----------------------------------------------------|
| 数据类型  | 描述                                               |
| number    | 数字（整数、小数、NaN(Not a Number)）              |
| string    | 字符串，单双引皆可                                 |
| boolean   | 布尔。true，false                                  |
| null      | 对象为空                                           |
| undefined | 当声明的变量未初始化时，该变量的默认值是 undefined |

使用typeof函数可以返回变量的数据类型

**2.3.2 运算符**

js中的运算规则绝大多数还是和java中一致的，具体运算符如下：

|            |                                                                                  |
|------------|----------------------------------------------------------------------------------|
| 运算规则   | 运算符                                                                           |
| 算术运算符 | \+ , - , \* , / , % , ++ , --                                                    |
| 赋值运算符 | = , += , -= , \*= , /= , %=                                                      |
| 比较运算符 | \> , \< , \>= , \<= , != , == , === 注意 == 会进行类型转换，=== 不会进行类型转换 |
| 逻辑运算符 | && , \|\| , !                                                                    |
| 三元运算符 | 条件表达式 ? true_value: false_value                                             |

==和===是有区别的：

==：只比较值是否相等，不区分数据类型，哪怕类型不一致，==也会自动转换类型进行值得比较

===：不光比较值，还要比较类型，如果类型不一致，直接返回false

**2.3.3 数据类型转换**

通过parseInt()函数来进行将其他类型转换成数值类型：

如果是纯数字字符串，直接转换成对应的数字

如果是非纯数字字符串，会把开始的最长数字子串转换成数字，如parseInt('123Afe2')的结果为123，但是parseInt('Afe2')的结果为NaN

通过Boolean()函数可以将其他类型转换成布尔类型：

除了0、null、undefined、""、NaN 会被认为是false，其他都会被认为是true

**3.函数**

JavaScript中的函数被设计为执行特定任务的代码块，通过关键字function来定义。

**3.1 第一种定义格式**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
function 函数名(参数1,参数2..){<br />
要执行的代码<br />
}<br />
<br />
//示例<br />
function add(a, b){<br />
return a + b;<br />
}</td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意点</strong>：</p>
<p>形式参数不需要声明类型，并且JavaScript中不管什么类型都是let或者var去声明，加上也没有意义。</p>
<p>返回值也不需要声明类型，直接return即可</p></td>
</tr>
</tbody>
</table>

**3.2 第二种定义格式**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var 函数名 = function (参数1,参数2..){<br />
//要执行的代码<br />
}</td>
</tr>
</tbody>
</table>

*JavaScript的流程控制语句if，switch，for等和java保持一致，这里不多阐述*

**4.JavaScript对象**

JavaScript对象可以分为三类：

基本对象，我们主要学习Array和JSON和String

BOM对象，主要是和浏览器相关的几个对象

DOM对象，JavaScript中将html的每一个标签都封装成一个对象

**4.1 基本对象**

**4.1.1 Array对象**

Array对象时用来定义数组的。常用语法格式有如下2种：

**方式1**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var 变量名 = new Array(元素列表);<br />
<br />
//例如：<br />
var arr = new Array(1,2,3,4); //1,2,3,4 是存储在数组中的数据（元素）</td>
</tr>
</tbody>
</table>

**方式2**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var 变量名 = [ 元素列表 ];<br />
<br />
//例如：<br />
var arr = [1,2,3,4]; //1,2,3,4 是存储在数组中的数据（元素）</td>
</tr>
</tbody>
</table>

通过索引可以获取数组中的值：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
arr[索引] = 值;</td>
</tr>
</tbody>
</table>

**细节**：

JavaScript中的数组长度是可变的，而且因为JavaScript是弱类型语言，所以数组可以存放各种类型的数据，例如：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var arr = [1,2,3,4];<br />
arr[10] = 50;<br />
<br />
console.log(arr[10]); //50<br />
console.log(arr[9]); //undefined</td>
</tr>
</tbody>
</table>

**属性和方法**

属性：

|        |                              |
|--------|------------------------------|
| 属性   | 描述                         |
| length | 设置或返回数组中元素的数量。 |

方法：

|           |                                                  |
|-----------|--------------------------------------------------|
| 方法方法  | 描述                                             |
| forEach() | 遍历数组中的每个有值得元素，并调用一次传入的函数 |
| push()    | 将新元素添加到数组的末尾，并返回新的长度         |
| splice()  | 从数组中删除元素                                 |

length属性：可以用来获取数组的长度，可以借助这个属性，来遍历数组中的元素

forEach()函数：这个方法的参数，需要传递一个函数，而且这个函数接受一个参数，就是遍历时数组的值

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
//e是形参，接受的是数组遍历时的值<br />
arr.forEach(function(e){<br />
console.log(e);<br />
})<br />
<br />
//在ES6中，引入箭头函数的写法，语法类似java中lambda表达式<br />
arr.forEach((e) =&gt; {<br />
console.log(e);<br />
})</td>
</tr>
</tbody>
</table>

push()函数：用于向数组的末尾添加元素，其中函数的参数就是需要添加的元素

splice()函数：用来删除数组中的元素，函数中填入2个参数。

参数1：表示从哪个索引位置删除

参数2：表示删除元素的个数

**4.1.2 String对象**

String对象的创建方式有2种：

**方式1**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var 变量名 = new String("…") ;<br />
<br />
//例如：<br />
var str = new String("Hello String");</td>
</tr>
</tbody>
</table>

**方式2**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var 变量名 = "…" ;<br />
<br />
//例如：<br />
var str = 'Hello String';</td>
</tr>
</tbody>
</table>

**属性和方法**

属性：

|        |                |
|--------|----------------|
| 属性   | 描述           |
| length | 字符串的长度。 |

方法：

|             |                                          |
|-------------|------------------------------------------|
| 方法        | 描述                                     |
| charAt()    | 返回在指定位置的字符。                   |
| indexOf()   | 检索字符串。                             |
| trim()      | 去除字符串两边的空格                     |
| substring() | 提取字符串中两个指定的索引号之间的字符。 |

length属性：可以用于返回字符串的长度

charAt()函数：用于返回在指定索引位置的字符，函数的参数就是索引

indexOf()函数：用于检索指定内容在字符串中的索引位置，返回值是索引，参数是指定的内容

trim()函数：用于去除字符串两边的空格，并返回去除空格后的字符串

substring()函数：用于截取字符串，函数有2个参数

参数1：表示从哪个索引位置开始截取，包含

参数2：表示到哪个索引位置结束，不包含

**4.1.3 JSON对象**

**自定义对象**

在 JavaScript 中自定义对象特别简单，其语法格式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var 对象名 = {<br />
属性名1: 属性值1,<br />
属性名2: 属性值2,<br />
属性名3: 属性值3,<br />
...<br />
函数名称: function(形参列表){}<br />
};</td>
</tr>
</tbody>
</table>

我们可以通过如下语法调用属性：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
对象名.属性名</td>
</tr>
</tbody>
</table>

通过如下语法调用函数：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
对象名.函数名()</td>
</tr>
</tbody>
</table>

**json对象**

JSON对象：**J**ava**S**cript **O**bject **N**otation，JavaScript对象标记法，是通过JavaScript标记法书写的文本，其格式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
{<br />
"key":value,<br />
"key":value,<br />
"key":value<br />
}</td>
</tr>
</tbody>
</table>

其中，**key必须使用引号并且是双引号标记，value可以是任意数据类型。**

例如我们可以直接百度搜索“json在线解析”，随便挑一个进入，然后编写内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
{<br />
"name": "李传播"<br />
}</td>
</tr>
</tbody>
</table>

JSON对象经常用来作为前后台交互的数据载体。如下图所示：前后台交互时，我们需要传输数据，但是java中的对象我们该怎么去描述呢？我们可以使用如图所示的xml格式，可以清晰的描述java中需要传递给前端的java对象。

<img src=".assets/JavaWeb-知识库笔记/media/image5.png" style="width:5.75in;height:2.65625in" />

但是xml格式存在如下问题：

标签需要编写双份，占用带宽，浪费资源

解析繁琐

所以我们可以使用json来替代，如下图所示：

<img src=".assets/JavaWeb-知识库笔记/media/image6.png" style="width:5.75in;height:1.40625in" />

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var jsonstr = '{"name":"Tom", "age":18, "addr":["北京","上海","西安"]}';<br />
alert(jsonstr.name); //undefined</td>
</tr>
</tbody>
</table>

jsonstr是一个json字符串，不是json对象，所以结果是undefined，需要借助parse函数来进行json字符串和json对象的转换：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var obj = JSON.parse(jsonstr);<br />
alert(obj.name); //Tom</td>
</tr>
</tbody>
</table>

通过stringify函数可以将json对象再次转换成json字符串：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
alert(JSON.stringify(obj)); //{"name":"Tom", "age":18, "addr":["北京","上海","西安"]}</td>
</tr>
</tbody>
</table>

**4.2 BOM对象**

BOM的全称是Browser Object Model。JavaScript将浏览器的各个组成部分封装成了对象。我们要操作浏览器的部分功能，可以通过操作BOM对象的相关属性或者函数来完成。

BOM中提供了如下5个对象：

|           |                |
|-----------|----------------|
| 对象名称  | 描述           |
| Window    | 浏览器窗口对象 |
| Navigator | 浏览器对象     |
| Screen    | 屏幕对象       |
| History   | 历史记录对象   |
| Location  | 地址栏对象     |

<img src=".assets/JavaWeb-知识库笔记/media/image7.png" style="width:5.75in;height:2.67708in" />

**4.2.1 Window对象**

window对象指的是浏览器窗口对象，是JavaScript的全部对象，所以对于window对象，我们可以直接使用，并且对于window对象的方法和属性，我们可以省略window，例如window.alert('hello')和alert('hello')是一样的。

window对象提供了获取其他BOM对象的属性：

|           |                       |
|-----------|-----------------------|
| 属性      | 描述                  |
| history   | 用于获取history对象   |
| location  | 用于获取location对象  |
| Navigator | 用于获取Navigator对象 |
| Screen    | 用于获取Screen对象    |

也就是说我们要使用location对象，只需要通过代码window.location或者简写location即可使用

window也提供了一些常用的函数，如下表格所示：

|               |                                                    |
|---------------|----------------------------------------------------|
| 函数          | 描述                                               |
| alert()       | 显示带有一段消息和一个确认按钮的警告框。           |
| comfirm()     | 显示带有一段消息以及确认按钮和取消按钮的对话框。   |
| setInterval() | 按照指定的周期（以毫秒计）来调用函数或计算表达式。 |
| setTimeout()  | 在指定的毫秒数后调用函数或计算表达式。             |

alert()函数：弹出警告框，参数的内容就是警告框的内容

confirm()函数：弹出确认框，并且提供用户2个按钮，分别是确认和取消；用户点击确认时，返回true，点击取消时，返回false

setInterval(fn,毫秒值)：定时器，用于周期性的执行某个功能，并且是**循环执行**。该函数需要传递2个参数

fn：函数，需要周期性执行的功能代码

毫秒值：间隔时间

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var i = 0;<br />
setInterval(function(){<br />
i++;<br />
console.log("定时器执行了"+i+"次");<br />
},2000);</td>
</tr>
</tbody>
</table>

setTimeout(fn,毫秒值) ：定时器，只会在一段时间后**执行一次功能**。参数和上述setInterval一致

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
//定时器 - setTimeout -- 延迟指定时间执行一次<br />
setTimeout(function(){<br />
alert("JS");<br />
},3000);</td>
</tr>
</tbody>
</table>

浏览器打开，3s后弹框，关闭弹框，发现再也不会弹框了。

**4.2.2 Location对象**

location是指代浏览器的地址栏对象，对于这个对象，我们常用的是href属性，用于获取或者设置浏览器的地址信息

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
//获取浏览器地址栏信息<br />
alert(location.href);<br />
//设置浏览器地址栏信息<br />
location.href = "https://www.itcast.cn";</td>
</tr>
</tbody>
</table>

**4.3 DOM对象**

DOM：Document Object Model 文档对象模型，也就是 JavaScript 将 HTML 文档的各个组成部分封装为对象。

DOM 其实我们并不陌生，之前在学习 XML 就接触过，只不过 XML 文档中的标签需要我们写代码解析，而 HTML 文档是浏览器解析。封装的对象分为

Document：整个文档对象

Element：元素对象

Attribute：属性对象

Text：文本对象

Comment：注释对象

DOM的作用是通过修改HTML元素的内容和样式等来实现页面的各种动态效果，HTML中的Element对象可以通过Document对象获取，而Document对象是通过window对象获取的。document对象提供的用于获取Element元素对象的api如下表所示：

|                                   |                                          |
|-----------------------------------|------------------------------------------|
| 函数                              | 描述                                     |
| document.getElementById()         | 根据id属性值获取，返回单个Element对象    |
| document.getElementsByTagName()   | 根据标签名称获取，返回Element对象数组    |
| document.getElementsByName()      | 根据name属性值获取，返回Element对象数组  |
| document.getElementsByClassName() | 根据class属性值获取，返回Element对象数组 |

document.getElementById()： 根据标签的id属性获取标签对象，id是唯一的，所以获取到是单个标签对象，例如document.getElementById('h1')

document.getElementsByTagName() : 根据标签的名字获取标签对象，同名的标签有很多，所以返回值是数组，例如document.getElementsByTagName('div')

document.getElementsByName() ：根据标签的name的属性值获取标签对象，name属性值可以重复，所以返回值是一个数组，例如document.getElementsByName('hobby')

document.getElementsByClassName() : 根据标签的class属性值获取标签对象，class属性值也可以重复，返回值是数组，例如document.getElementsByClassName('cls')

获取到标签了，可以通过参考书得到标签对象的属性来操作标签的内容，例如可以通过div标签对象的innerHTML属性来修改标签的内容

**5.JavaScript事件**

**5.1 事件绑定**

JavaScript对于事件的绑定提供了2种方式：

**方式1**：通过html标签中的事件属性进行绑定，例如一个按钮，我们对于按钮可以绑定单机事件，可以借助标签的onclick属性，属性值指向一个函数

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;input type="button" id="btn1" value="事件绑定1" onclick="on()"&gt;<br />
&lt;script&gt;<br />
function on(){<br />
alert("按钮1被点击了...");<br />
}<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

**方式2**：通过DOM中Element元素的事件属性进行绑定

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;input type="button" id="btn2" value="事件绑定2"&gt;<br />
&lt;script&gt;<br />
document.getElementById('btn2').onclick = function(){<br />
alert("按钮2被点击了...");<br />
}<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

|                                                    |
|----------------------------------------------------|
| 事件绑定的函数，只有在事件被触发时，函数才会被调用 |

**5.2 常见事件**

|             |                          |
|-------------|--------------------------|
| 事件属性名  | 说明                     |
| onclick     | 鼠标单击事件             |
| onblur      | 元素失去焦点             |
| onfocus     | 元素获得焦点             |
| onload      | 某个页面或图像被完成加载 |
| onsubmit    | 当表单提交时触发该事件   |
| onmouseover | 鼠标被移到某元素之上     |
| onmouseout  | 鼠标从某元素移开         |

**四、Vue**

**1.Vue概述**

框架：是一个半成品软件，是一套可重用的、通用的、软件基础代码模型。基于框架进行开发，更加快捷、更加高效。

Vue 是一套前端框架，免除原生JavaScript中的DOM操作，简化书写。基于**MVVM思想**，实现数据的双向绑定，将编程的关注点放在数据上，而非相应的操作上。

MVVM：其实是Model-View-ViewModel的缩写，有3个单词，具体释义如下：

Model：数据模型，特指前端中通过请求从后台获取的数据，可以通过Ajax来发起请求从后台获取

View：视图，用于展示数据的页面，可以理解成我们的html+css搭建的页面，但是没有数据，可以通过ElementUI框架来替代HTML+CSS更加方便的搭建View

ViewModel：数据绑定到视图，负责将数据（Model）通过JavaScript的DOM技术，将数据展示到视图（View）上，可以通过Vue框架用替代DOM操作，让数据展示到视图的代码开发变得更加的简单

<img src=".assets/JavaWeb-知识库笔记/media/image8.png" style="width:5.75in;height:2.59375in" />

**2.快速入门**

新建HTML页面，引入Vue.js文件

**\[vue.js\]**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;script src="js/vue.js"&gt;&lt;/script&gt;</td>
</tr>
</tbody>
</table>

在JS代码区域，创建Vue核心对象，定义数据模型

el: 用来指定哪些标签受 Vue 管理。 该属性取值 \#app 中的 app 需要是受管理的标签的id属性值

data: 用来定义数据模型

methods: 用来定义函数。这个我们在后面就会用到

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;script&gt;<br />
//定义Vue对象<br />
new Vue({<br />
el: "#app", //vue接管区域<br />
data:{<br />
message: "Hello Vue"<br />
}<br />
})<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

在html区域编写视图，其中{{}}是插值表达式，用来将vue对象中定义的model展示到页面上的

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;body&gt;<br />
&lt;div id="app"&gt;<br />
&lt;input type="text" v-model="message"&gt;<br />
{{message}}<br />
&lt;/div&gt;<br />
&lt;/body&gt;</td>
</tr>
</tbody>
</table>

**3.Vue指令**

**指令**：HTML 标签上带有 v- 前缀的特殊属性，不同指令具有不同含义。例如：v-if，v-for…

在vue中，通过大量的指令来实现数据绑定到视图的，常用的vue指令如下表：

|           |                                                     |
|-----------|-----------------------------------------------------|
| **指令**  | **作用**                                            |
| v-bind    | 为HTML标签绑定属性值，如设置 href , css样式等       |
| v-model   | 在表单元素上创建双向数据绑定                        |
| v-on      | 为HTML标签绑定事件                                  |
| v-if      | 条件性的渲染某元素，判定为true时渲染,否则不渲染     |
| v-else    |                                                     |
| v-else-if |                                                     |
| v-show    | 根据条件展示某元素，区别在于切换的是display属性的值 |
| v-for     | 列表渲染，遍历容器的元素或者对象的属性              |

**3.1 v-bind和v-model**

v-bind: 为HTML标签绑定属性值，如设置 href , css样式等。当vue对象中的数据模型发生变化时，标签的属性值会随之发生变化。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;div id="app"&gt;<br />
&lt;!--两个超链接都可以点击，然后跳转到百度去--&gt;<br />
&lt;!--给&lt;a&gt;标签的href属性赋值，并且值应来自于vue对象的数据模型中的url变量--&gt;<br />
&lt;a v-bind:href="url"&gt;链接1&lt;/a&gt;<br />
&lt;!--v-bind指令是可以省略的，但是:不能省略--&gt;<br />
&lt;a :href="url"&gt;链接2&lt;/a&gt;<br />
&lt;/div&gt;<br />
&lt;script&gt;<br />
//定义Vue对象<br />
new Vue({<br />
el: "#app", //vue接管区域<br />
data:{<br />
url: "https://www.baidu.com"<br />
}<br />
})<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

html属性前面有：表示采用的vue的属性绑定

v-model：在表单元素上创建双向数据绑定，即data属性中的数据和视图展示会一起变化

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;div id="app"&gt;<br />
&lt;!-- 修改表单项标签，vue对象data中的数据也会发生变化 --&gt;<br />
&lt;input type="text" v-model="url"&gt;<br />
&lt;/div&gt;<br />
&lt;script&gt;<br />
//定义Vue对象<br />
new Vue({<br />
el: "#app", //vue接管区域<br />
data:{<br />
url: "https://www.baidu.com"<br />
}<br />
})<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

**双向绑定的作用：可以获取表单的数据的值，然后提交给服务器**

**3.2 v-on**

用来给html标签绑定事件的：

v-on语法给标签的事件绑定的函数，必须是vue对象中声明的函数

v-on语法绑定事件时，事件名相比较js中的事件名，没有on

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;div id="app"&gt;<br />
&lt;!--给第一个按钮，通过v-on指令绑定单击事件--&gt;<br />
&lt;input type="button" value="点我一下" v-on:click="handle()"&gt;<br />
&lt;!-- v-on: 可以替换成@ --&gt;<br />
&lt;input type="button" value="点我一下" @click="handle()"&gt;<br />
&lt;/div&gt;<br />
&lt;script&gt;<br />
//定义Vue对象<br />
new Vue({<br />
el: "#app", //vue接管区域<br />
// 在vue对象的methods属性中定义事件绑定时需要的handle()函数<br />
mothods:{<br />
handle: function(){<br />
alert("你点我了一下...");<br />
}<br />
}<br />
})<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

**3.3 v-if和v-show**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;div id="app"&gt;<br />
&lt;!-- 当改变年龄时，需要动态判断年龄的值，呈现对应的年龄的文字描述 --&gt;<br />
年龄&lt;input type="text" v-model="age"&gt;经判定,为:<br />
&lt;span v-if="age &lt;= 35"&gt;年轻人(35及以下)&lt;/span&gt;<br />
&lt;span v-else-if="age &gt; 35 &amp;&amp; age &lt; 60"&gt;中年人(35-60)&lt;/span&gt;<br />
&lt;span v-else&gt;老年人(60及以上)&lt;/span&gt;<br />
&lt;br&gt;&lt;br&gt;<br />
&lt;!-- v-show和v-if的作用效果是一样的，只是原理不一样 --&gt;<br />
年龄&lt;input type="text" v-model="age"&gt;经判定,为:<br />
&lt;span v-show="age &lt;= 35"&gt;年轻人(35及以下)&lt;/span&gt;<br />
&lt;span v-show="age &gt; 35 &amp;&amp; age &lt; 60"&gt;中年人(35-60)&lt;/span&gt;<br />
&lt;span v-show="age &gt;= 60"&gt;老年人(60及以上)&lt;/span&gt;<br />
&lt;/div&gt;<br />
&lt;script&gt;<br />
//定义Vue对象<br />
new Vue({<br />
el: "#app", //vue接管区域<br />
data:{<br />
age: 20<br />
}<br />
})<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

v-if指令，不满足条件的标签代码直接没了，而v-show指令中，不满足条件的代码依然存在，只是添加了css样式（display:none）来控制标签不去显示。

**3.4 v-for**

这个指令是用来遍历的，其语法格式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;标签 v-for="变量名 in 集合模型数据"&gt;<br />
{{变量名}}<br />
&lt;/标签&gt;<br />
<br />
&lt;!-- 有时我们遍历时需要使用索引，那么v-for指令遍历的语法格式如下： --&gt;<br />
&lt;标签 v-for="(变量名,索引变量) in 集合模型数据"&gt;<br />
{{索引变量 + 1}} {{变量名}} &lt;!--索引变量是从0开始，所以要表示序号的话，需要手动的加1--&gt;<br />
&lt;/标签&gt;</td>
</tr>
</tbody>
</table>

例如：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;div id="app"&gt;<br />
&lt;div v-for="addr in addrs"&gt;{{addr}}&lt;/div&gt;<br />
&lt;hr&gt;<br />
&lt;div v-for="(addr,index) in addrs"&gt;{{index + 1}} : {{addr}}&lt;/div&gt;<br />
&lt;/div&gt;<br />
&lt;script&gt;<br />
//定义Vue对象<br />
new Vue({<br />
el: "#app", //vue接管区域<br />
data:{<br />
addrs:["北京", "上海", "西安", "成都", "深圳"]<br />
}<br />
})<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

**4.生命周期**

vue的生命周期：指的是vue对象从创建到销毁的过程。vue的生命周期包含8个阶段：每触发一个生命周期事件，会自动执行一个生命周期方法，这些生命周期方法也被称为钩子方法。

|               |          |
|---------------|----------|
| 状态          | 阶段周期 |
| beforeCreate  | 创建前   |
| created       | 创建后   |
| beforeMount   | 挂载前   |
| mounted       | 挂载完成 |
| beforeUpdate  | 更新前   |
| updated       | 更新后   |
| beforeDestroy | 销毁前   |
| destroyed     | 销毁后   |

<img src=".assets/JavaWeb-知识库笔记/media/image9.png" style="width:5.75in;height:3.05208in" />

我们需要重点关注的是**mounted**，其他的我们了解即可

mounted：挂载完成，Vue初始化成功，HTML页面渲染成功，**一般用于页面初始化自动的Ajax请求后台数据**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;!-- 页面加载完成，自动触发mounted所绑定的钩子函数，然后自动执行弹框 --&gt;<br />
&lt;div id="app"&gt;&lt;/div&gt;<br />
&lt;script&gt;<br />
//定义Vue对象<br />
new Vue({<br />
el: "#app", //vue接管区域<br />
mounted () {<br />
alert("vue挂载完成,发送请求到服务端")<br />
}<br />
})<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

**五、Ajax**

Ajax: 全称Asynchronous JavaScript And XML，异步的JavaScript和XML，其作用有如下2点：

与服务器进行数据交换：通过Ajax可以给服务器发送请求，并获取服务器响应的数据

异步交互：可以在**不重新加载整个页面**的情况下，与服务器交换数据并**更新部分网页**的技术，如：搜索联想、用户名是否可用的校验等等

**1.同步异步**

同步请求：在服务器处理请求的过程中，浏览器页面不能做其他的操作。只能等到服务器响应结束后才能继续做其他的操作。

异步请求：在服务器处理请求的过程中，浏览器页面还可以做其他的操作。

<img src=".assets/JavaWeb-知识库笔记/media/image10.png" style="width:5.75in;height:2.13542in" />

**2.原生Ajax**

**服务器端**

后台服务器地址：https://jsonplaceholder.typicode.com/users

**客户端**

客户端的Ajax请求代码有如下4步：

按钮绑定单击事件，我们希望点击按钮，来发送Ajax请求

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;body&gt;<br />
&lt;input type="button" value="获取数据" onclick="getData()"&gt;<br />
&lt;div id="div1"&gt;&lt;/div&gt;<br />
&lt;/body&gt;<br />
&lt;script&gt;<br />
function getData(){<br />
<br />
}<br />
&lt;/script&gt;<br />
&lt;/html&gt;</td>
</tr>
</tbody>
</table>

创建XMLHttpRequest对象，用于和服务器交换数据，也是原生Ajax请求的核心对象，提供了各种方法

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
var xmlHttpRequest = new XMLHttpRequest();</td>
</tr>
</tbody>
</table>

调用对象的open()方法设置请求的参数信息，例如请求地址，请求方式。然后调用send()方法向服务器发送请求

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
xmlHttpRequest.open('GET','https://jsonplaceholder.typicode.com/users');<br />
xmlHttpRequest.send(); //发送请求</td>
</tr>
</tbody>
</table>

通过绑定事件的方式，来获取服务器响应的数据

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
xmlHttpRequest.onreadystatechange = function(){<br />
//此处判断 4表示浏览器已经完全接受到Ajax请求得到的响应， 200表示这是一个正确的Http请求，没有错误<br />
if(xmlHttpRequest.readyState == 4 &amp;&amp; xmlHttpRequest.status == 200){<br />
document.getElementById('div1').innerHTML = xmlHttpRequest.responseText;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.Axios**

Axios是一门更加简单的发送Ajax请求的技术。Axios是对原生的Ajax进行封装，简化书写。

Axios官网：

**\[该类型的内容暂不支持下载\]**

**3.1 Axios的基本使用**

引入Axios文件

**\[axios-0.18.0.js\]**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;script src="js/axios-0.18.0.js"&gt;&lt;/script&gt;</td>
</tr>
</tbody>
</table>

使用Axios发送请求，并获取响应结果，官方提供的api很多，此处给出2种：

发送 get 请求

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
axios({<br />
method:"get",<br />
url:"https://jsonplaceholder.typicode.com/users?id=1"<br />
}).then(function (resp){<br />
console.log(resp.data);<br />
})</td>
</tr>
</tbody>
</table>

发送 post 请求

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
axios({<br />
method:"post",<br />
url:"https://jsonplaceholder.typicode.com/users",<br />
data:"id=1"<br />
}).then(function (resp){<br />
console.log(resp.data);<br />
});</td>
</tr>
</tbody>
</table>

axios()是用来发送异步请求的，小括号中使用JS的JSON对象传递请求相关的参数：

method属性：用来设置请求方式的，取值为 get 或者 post

url属性：用来书写请求的资源路径。如果是 get 请求，需要将请求参数拼接到路径的后面，格式为：url?参数名=参数值&参数名2=参数值2

data属性：作为请求体被发送的数据。也就是说如果是 post 请求的话，数据需要作为 data 属性的值

then() 需要传递一个匿名函数。我们将 then()中传递的匿名函数称为 **回调函数**，意思是该匿名函数在发送请求时不会被调用，而是在成功响应后调用的函数。而该回调函数中的 resp 参数是对响应的数据进行封装的对象，通过 resp.data 可以获取到响应的数据

**3.2 Axios快速入门**

**后端实现**

查询所有员工信息服务器地址：http://yapi.smart-xwork.cn/mock/169327/emp/list

根据员工id删除员工信息服务器地址：http://yapi.smart-xwork.cn/mock/169327/emp/deleteById

**前端实现**

**\[axios-0.18.0.js\]**

在html中引入axios所依赖的js文件，并且提供2个按钮，绑定单击事件，分别用于点击时发送Ajax请求；然后分别使用Axios的方法，完整get请求和post请求的发送

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;script src="js/axios-0.18.0.js"&gt;&lt;/script&gt;<br />
&lt;input type="button" value="获取数据GET" onclick="get()"&gt;<br />
&lt;input type="button" value="删除数据POST" onclick="post()"&gt;<br />
&lt;script&gt;<br />
function get(){<br />
//通过axios发送异步请求-get<br />
axios({<br />
method: "get",<br />
url: "http://yapi.smart-xwork.cn/mock/169327/emp/list"<br />
}).then(result =&gt; {<br />
console.log(result.data);<br />
})<br />
}<br />
function post(){<br />
// 通过axios发送异步请求-post<br />
axios({<br />
method: "post",<br />
url: "http://yapi.smart-xwork.cn/mock/169327/emp/deleteById",<br />
data: "id=1"<br />
}).then(result =&gt; {<br />
console.log(result.data);<br />
})<br />
}<br />
&lt;/script&gt;</td>
</tr>
</tbody>
</table>

**3.3 请求方法的别名**

Axios还针对不同的请求，提供了别名方式的api,具体如下：

|                                        |                |
|----------------------------------------|----------------|
| 方法                                   | 描述           |
| axios.get(url \[, config\])            | 发送get请求    |
| axios.delete(url \[, config\])         | 发送delete请求 |
| axios.post(url \[, data\[, config\]\]) | 发送post请求   |
| axios.put(url \[, data\[, config\]\])  | 发送put请求    |

我们目前只关注get和post请求，所以在上述的入门案例中，我们可以将get请求代码改写成如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
axios.get("http://yapi.smart-xwork.cn/mock/169327/emp/list").then(result =&gt; {<br />
console.log(result.data);<br />
})</td>
</tr>
</tbody>
</table>

post请求改写成如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
axios.post("http://yapi.smart-xwork.cn/mock/169327/emp/deleteById","id=1").then(result =&gt; {<br />
console.log(result.data);<br />
})</td>
</tr>
</tbody>
</table>

**六、前后台分离开发**

**1.概述**

前后端混合开发的缺点：

沟通成本高：后台人员发现前端有问题，需要找前端人员修改，前端修改成功，再交给后台人员使用

分工不明确：后台开发人员需要开发后台代码，也需要开发部分前端代码。很难培养专业人才

不便管理：所有的代码都在一个工程中

不便维护和扩展：前端代码更新，和后台无关，但是需要整个工程包括后台一起重新打包部署

前后端分离开发中，要有一套同一的规范统一前后端的规范，这一规范就是**接口文档**。

<img src=".assets/JavaWeb-知识库笔记/media/image11.png" style="width:5.75in;height:2.65625in" />

前后台分离开发的模式流程：

需求分析：首先我们需要阅读需求文档，分析需求，理解需求

接口定义：查询接口文档中关于需求的接口的定义，包括地址，参数，响应数据类型等等

前后台并行开发：各自按照接口文档进行开发，实现需求

测试：前后台开发完了，各自按照接口文档进行测试

前后段联调测试：前段工程请求后端工程，测试功能

**2.YAPI**

官网地址：

**\[该类型的内容暂不支持下载\]**

YAPI 是高效、易用、功能强大的 api 管理平台，旨在为开发、产品、测试人员提供更优雅的接口管理服务，主要有两个功能：

API接口管理：根据需求撰写接口，包括接口的地址，参数，响应等等信息

Mock服务：模拟真实接口，生成接口的模拟测试数据，用于前端的测试

**七、前端工程化**

在现在企业开发中，相较于之前的开发模式，更加讲究前端工程化方式的开发，主要包括如下4个特点：

模块化：将js和css等，做成一个个可复用模块

组件化：我们将UI组件，css样式，js行为封装成一个个的组件，便于管理

规范化：我们提供一套标准的规范的目录接口和编码规范，所有开发人员遵循这套规范

自动化：项目的构建，测试，部署全部都是自动完成

对于前端工程化，说白了，就是在企业级的前端项目开发中，把前端开发所需要的工具、技术、流程、经验进行规范化和标准化，从而提升开发效率。

**1.环境准备**

前端工程化是通过vue官方提供的脚手架Vue-cli来完成的，用于快速的生成一个Vue的项目模板。

运行Vue-cli，需要依赖NodeJS，NodeJS是前端工程化依赖的环境，所以需要先安装NodeJS，然后才能安装Vue-cli。

NodeJS安装步骤：

**\[NodeJS安装文档.pdf\]**

**2.Vue项目简介**

Vue-cli提供了如下2种方式创建vue项目：

命令行：直接通过命令行方式创建vue项目，项目默认会被创建在当前打开的命令行终端所在的工作目录下

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
vue create vue-project01</td>
</tr>
</tbody>
</table>

图形化界面：通过命令先进入到图形化界面，然后再进行vue工程的创建

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
vue ui</td>
</tr>
</tbody>
</table>

**2.1 创建vue项目**

首先在cmd命令行打开目标文件夹，以后项目就创建在这个文件夹中，然后通过vue ui打开图形化界面

然后我们选择创建按钮，在vue文件夹下创建项目

然后来到如下界面，进行vue项目的创建

<img src=".assets/JavaWeb-知识库笔记/media/image12.png" style="width:5.75in;height:6.29167in" />

然后预设模板选择手动

然后在功能页面开启路由功能Router

然后再配置页面选择语言版本和语法检查规范，如下图所示：

<img src=".assets/JavaWeb-知识库笔记/media/image13.png" style="width:5.75in;height:3.08333in" />

然后创建项目，不保存预设，等待1分钟左右即可

**2.2 vue项目目录结构**

<img src=".assets/JavaWeb-知识库笔记/media/image14.png" style="width:5.75in;height:2.57292in" />

我们平时开发代码就是在**src目录**下开发。

**2.3 运行vue项目**

**第一种方式**：通过VS Code提供的图形化界面（注意：NPM脚本窗口默认不显示），项目是运行在本地服务的8080端口的

<img src=".assets/JavaWeb-知识库笔记/media/image15.png" style="width:5.75in;height:1.38542in" />

其实此时访问的是 **src/App.vue**这个根组件，我们可以打开这个组件修改代码，修改后，只要保存文件，网页内容也跟着改变。

可以去修改默认的8080端口：我们修改vue.config.js文件的内容，添加如下代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
devServer:{<br />
port:7000<br />
}</td>
</tr>
</tbody>
</table>

**第二种方式**：命令行方式，即直接基于cmd命令窗口，在vue项目下，执行输入命令npm run serve即可

**3.Vue项目开发流程**

我们访问网页访问的是index.html，index.html文件默认是引入了入口函数main.js文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
import Vue from 'vue'<br />
import App from './App.vue'<br />
import router from './router'<br />
<br />
Vue.config.productionTip = false<br />
<br />
new Vue({<br />
router,<br />
render: h =&gt; h(App)<br />
}).$mount('#app')</td>
</tr>
</tbody>
</table>

import: 导入指定文件，并且重新起名，例如上述代码import App from './App.vue'导入当前目录下得App.vue并且起名为App

new Vue(): 创建vue对象

\$mount('#app'); 将vue对象创建的dom对象挂在到id=app的这个标签区域中，作用和之前学习的vue对象的le属性一致

router: 路由，详细在后面的小节讲解

render: 主要使用视图的渲染的

App对象其实就是./App.vue文件，vue的组件文件包含3个部分：

template：模板部分，主要是HTML代码，用来展示页面主体结构的

script：js代码区域，主要是通过js代码来控制模板的数据来源和行为的

style：css样式部分，主要通过css样式控制模板的页面效果得

<img src=".assets/JavaWeb-知识库笔记/media/image16.png" style="width:5.75in;height:5.125in" />

**八、Vue组件库Element**

官网地址：

**\[该类型的内容暂不支持下载\]**

Element是一套基于 Vue 的网站组件库，用于快速构建网页，它提供了很多组件（组成网页的部件）供我们使用。例如 超链接、按钮、图片、表格等等，我们只需要学会如何从ElementUI的官网拷贝组件到我们自己的页面中，并且做一些修改即可。

**1.快速入门**

安装ElementUI的组件库安装ElementUI的组件库，打开VS Code，停止之前的项目，然后在命令行输入如下命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
npm install element-ui@2.15.3</td>
</tr>
</tbody>
</table>

在main.js这个入口js文件中引入ElementUI的组件库

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
import ElementUI from 'element-ui';<br />
import 'element-ui/lib/theme-chalk/index.css';<br />
<br />
Vue.use(ElementUI);</td>
</tr>
</tbody>
</table>

<img src=".assets/JavaWeb-知识库笔记/media/image17.png" style="width:5.75in;height:3.07292in" />

按照vue项目的开发规范，在**src/views**目录下创建一个vue组件文件，注意组件名称后缀是.vue，例如element/ElementView.vue，并且在组件文件中编写之前介绍过的基本组件语法

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;template&gt;<br />
<br />
&lt;/template&gt;<br />
<br />
&lt;script&gt;<br />
export default {<br />
<br />
}<br />
&lt;/script&gt;<br />
<br />
&lt;style&gt;<br />
<br />
&lt;/style&gt;</td>
</tr>
</tbody>
</table>

去ElementUI的官网，找到组件库，然后找到喜欢的组件，复制组件代码到我们的vue组件文件

<img src=".assets/JavaWeb-知识库笔记/media/image18.png" style="width:5.75in;height:2.29167in" />

在默认访问的根组件**src/App.vue**中引入我们自定义的组件

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;template&gt;<br />
&lt;div id="app"&gt;<br />
&lt;element-view&gt;&lt;/element-view&gt; //引入我们自定义的组件<br />
&lt;/div&gt;<br />
&lt;/template&gt;<br />
<br />
&lt;script&gt;<br />
import ElementView from './views/element/ElementView.vue'<br />
export default {<br />
components: { ElementView }<br />
}<br />
&lt;/script&gt;<br />
&lt;style&gt;<br />
<br />
&lt;/style&gt;</td>
</tr>
</tbody>
</table>

**2.Element组件**

**2.1 Table表格**

在官网中找到喜欢的样式，复制粘贴源码到自己的vue文件中即可（例如ElementView.vue）。template模板部分、script脚本部分、style样式部分都要拷贝

**组件属性详解**

ElementUI将数据模型绑定到视图主要通过如下几个属性：

data: 主要定义table组件的数据模型

prop: 定义列的数据应该绑定data中定义的具体的数据模型

label: 定义列的标题

width: 定义列的宽度

<img src=".assets/JavaWeb-知识库笔记/media/image19.png" style="width:5.75in;height:1.73958in" />

PS：Element组件的所有属性都可以在官方组件页面的最下方找到

**2.2 Pagination分页**

操作和Table表格组件一样，复制粘贴就可以了。

**组件属性详解**

对于分页组件我们需要关注的是如下几个重要属性（可以通过查阅官网组件中最下面的组件属性详细说明得到）：

background: 添加背景颜色

layout: 分页工具条的布局，其具体值包含sizes, prev, pager, next, jumper, -\>, total, slot 这些值

total: 数据的总数量

**组件事件详解**

对于分页组件，除了上述几个属性，还有2个非常重要的事件：

size-change： pageSize 改变时会触发

current-change：currentPage 改变时会触发

复制相应\<el-pagination\>的属性

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
@size-change="handleSizeChange"<br />
@current-change="handleCurrentChange"</td>
</tr>
</tbody>
</table>

复制事件需要的2个函数，需要注意methods属性和data同级

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JavaScript<br />
methods: {<br />
handleSizeChange(val) {<br />
console.log(`每页 ${val} 条`);<br />
},<br />
handleCurrentChange(val) {<br />
console.log(`当前页: ${val}`);<br />
}<br />
},</td>
</tr>
</tbody>
</table>

**2.3 Dialog对话框**

老样子，还是复制粘贴就可以了。

**组件属性详解**

visible.sync：是否显示 Dialog

<img src=".assets/JavaWeb-知识库笔记/media/image20.png" style="width:5.75in;height:1.26042in" />

visible属性绑定的dialogTableVisble属性一开始默认是false，所以对话框隐藏；然后我们点击按钮，触发事件，修改属性值为true，然后对话框visible属性值为true，所以对话框呈现出来。

**2.4 Form表单**

复制粘贴相应的源码就可以了。

**3.综合案例**

参考[talias智能学习辅助系统](https://mcnerzykwkel.feishu.cn/wiki/FaLgwpJgUiHJT2kbIGbcMjVhn4b)，最终效果如下：

<img src=".assets/JavaWeb-知识库笔记/media/image21.png" style="width:5.75in;height:2.61458in" />

**Vue路由**

我们希望tlias智能学习辅助系统综合案例中，点击侧边栏的部门管理，显示部门管理的信息，点击员工管理，显示员工管理的信息，这就需要借助vue的路由功能。

前端路由：URL中的hash(#号之后的内容）与组件之间的对应关系，如下图所示：

<img src=".assets/JavaWeb-知识库笔记/media/image22.png" style="width:5.75in;height:1.8125in" />

当我们点击左侧导航栏时，浏览器的地址栏会发生变化，路由自动更新显示与url所对应的vue组件。

路由插件**Vue Router，**其主要组成如下：

VueRouter：路由器类，根据路由请求在路由视图中动态渲染选中的组件

\<router-link\>：请求链接组件，浏览器会解析成\<a\>

\<router-view\>：动态视图组件，用来渲染展示与路由路径对应的组件

<img src=".assets/JavaWeb-知识库笔记/media/image23.png" style="width:5.75in;height:1.22917in" />

首先VueRouter根据我们配置的url的hash片段和路由的组件关系去维护一张路由表;

然后我们页面提供一个\<router-link\>组件,用户点击，发出路由请求;

接着我们的VueRouter根据路由请求，在路由表中找到对应的vue组件；

最后VueRouter会切换\<router-view\>中的组件，从而进行视图的更新

**具体实现参考[tlias智能学习辅助系统](https://mcnerzykwkel.feishu.cn/wiki/FaLgwpJgUiHJT2kbIGbcMjVhn4b)即可**

**打包部署**

前端工程开发好了，发布主要分为2步：

前端工程打包

通过nginx服务器发布前端工程

**1-前端工程打包**

直接通过VS Code的NPM脚本中提供的build按钮来完整：

<img src=".assets/JavaWeb-知识库笔记/media/image24.png" style="width:5.75in;height:1.375in" />

然后会在工程目录下生成一个dist目录，用于存放需要发布的前端资源。

**2-部署前端工程**

**nginx介绍**：

Nginx是一款轻量级的Web服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器。其特点是占有内存少，并发能力强，在各大型互联网公司都有非常广泛的使用。

nginx的解压目录以及目录结构说明：

<img src=".assets/JavaWeb-知识库笔记/media/image25.png" style="width:5.75in;height:2.41667in" />

**我们如果要发布，直接将资源放入到html目录中**

**部署**：

**\[nginx-1.22.0.zip\]**

将打包的前端工程dist目录下的内容拷贝到nginx的html目录下（注意不是dist目录，是dist目录下的所有内容）

然后通过双击nginx下得nginx.exe文件来启动nginx

nginx服务器的端口号是80，所以启动成功之后，我们浏览器直接访问 http://localhost:80 即可，其中80端口可以省略，如果80端口被占用，我们需要通过**conf/nginx.conf**配置文件来修改端口号：

<img src=".assets/JavaWeb-知识库笔记/media/image26.png" style="width:5.75in;height:1.85417in" />

**九、Maven**

**1.Maven概述**

Maven是Apache旗下的一个开源项目，是一款用于管理和构建java项目的工具。

**1.1 Maven的作用**

方便的依赖管理：方便快捷的管理项目依赖的资源(jar包)，避免版本冲突问题

在maven项目的pom.xml文件中，添加一段如下图所示的配置即可实现

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-dependencies&lt;/artifactId&gt;<br />
&lt;version&gt;2.2.13.RELEASE&lt;/version&gt;<br />
&lt;type&gt;pom&lt;/type&gt;<br />
&lt;scope&gt;import&lt;/scope&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba&lt;/groupId&gt;<br />
&lt;artifactId&gt;druid-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;1.2.4&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;<br />
&lt;artifactId&gt;pagehelper-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;1.3.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.github.oshi&lt;/groupId&gt;<br />
&lt;artifactId&gt;oshi-core&lt;/artifactId&gt;<br />
&lt;version&gt;5.6.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

统一的项目结构：提供标准、统一的项目结构，解决不同开发工具的项目结构不一致问题

<img src=".assets/JavaWeb-知识库笔记/media/image27.png" style="width:5.75in;height:2.78125in" />

标准的项目构建流程：标准跨平台（Linux、Windows、MacOS）的自动化项目构建方式。我们开发一套系统需要进行编译、测试、打包、发布，这些操作如果需要反复进行就显得特别麻烦，Maven提供了一套简单的命令来完成项目构建

**1.2 Maven模型**

项目对象模型 (Project Object Model)：将我们自己的项目抽象成一个对象模型，有自己专属的坐标，通过坐标可以定位到所需资源(jar包)位置

<img src=".assets/JavaWeb-知识库笔记/media/image28.png" style="width:5.75in;height:2.35417in" />

依赖管理模型(Dependency)：使用坐标来描述当前项目依赖哪些第三方jar包，通过在pom.xml文件中自定义的坐标自动从本地仓库下载导入相关的jar包

构建生命周期/阶段(Build lifecycle & phases)：当我们需要编译，Maven提供了一个编译插件供我们使用；当我们需要打包，Maven就提供了一个打包插件供我们使用等

**1.3 Maven仓库**

仓库：用于存储资源，管理各种jar包。

Maven仓库分为：

本地仓库：自己计算机上的一个目录(用来存储jar包)

中央仓库：由Maven团队维护的全球唯一的。仓库地址：

**\[该类型的内容暂不支持下载\]**

远程仓库(私服)：一般由公司团队搭建的私有仓库

当项目中使用坐标引入对应依赖jar包后，首先会查找本地仓库中是否有对应的jar包

如果有，则在项目直接引用

如果没有，则去中央仓库中下载对应的jar包到本地仓库

如果还可以搭建远程仓库(私服)，将来jar包的查找顺序则变为： 本地仓库 --\> 远程仓库--\> 中央仓库

**1.4 Maven安装**

参考[Maven安装](https://mcnerzykwkel.feishu.cn/docx/SeNEdeeUzoIbMxxGy3GciZTynsf?from=from_copylink)即可。

**2.IDEA集成Maven**

**2.1 配置Maven环境**

参考[Maven安装文档](https://mcnerzykwkel.feishu.cn/wiki/OXqpw8JibiRP28km1NKcTzo0n2b)，**创建maven项目**和**导入maven项目**也参考[Maven安装文档](https://mcnerzykwkel.feishu.cn/wiki/OXqpw8JibiRP28km1NKcTzo0n2b)。

**2.2 POM配置详解**

POM (Project Object Model) ：指的是项目对象模型，用来描述当前的maven项目。

使用pom.xml文件来实现

pom.xml文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;?xml version="1.0" encoding="UTF-8"?&gt;<br />
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"<br />
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"<br />
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;<br />
&lt;!-- POM模型版本 --&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;!-- 当前项目坐标 --&gt;<br />
&lt;groupId&gt;com.itheima&lt;/groupId&gt;<br />
&lt;artifactId&gt;maven_project1&lt;/artifactId&gt;<br />
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;<br />
<br />
&lt;!-- 打包方式 --&gt;<br />
&lt;packaging&gt;jar&lt;/packaging&gt;<br />
<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

pom文件详解：

\<project\> ：pom文件的根标签，表示当前maven项目

\<modelVersion\> ：声明项目描述遵循哪一个POM模型版本

虽然模型本身的版本很少改变，但它仍然是必不可少的。目前POM模型版本是4.0.0

坐标 ：\<groupId\>、\<artifactId\>、\<version\>

定位项目在本地仓库中的位置，由以上三个标签组成一个坐标

\<packaging\> ：maven项目的打包方式，通常设置为jar或war（默认值：jar）

**2.3 Maven坐标详解**

什么是坐标？

Maven中的坐标是 资源的唯一标识 , 通过该坐标可以唯一定位资源位置

使用坐标来定义项目或引入项目中需要的依赖

Maven坐标主要组成

groupId：定义当前Maven项目隶属组织名称（通常是域名反写，例如：com.itheima）

artifactId：定义当前Maven项目名称（通常是模块名称，例如 order-service、goods-service）

version：定义当前项目版本号

如下图就是使用坐标表示一个项目：

<img src=".assets/JavaWeb-知识库笔记/media/image29.png" style="width:5.75in;height:2.40625in" />

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意：</strong></p>
<p>上面所说的资源可以是插件、依赖、当前项目</p>
<p>我们的项目如果被其他的项目依赖时，也是需要坐标来引入的</p></td>
</tr>
</tbody>
</table>

**3.依赖管理**

**3.1 依赖配置**

依赖指当前项目运行所需要的jar包，例如，在当前工程中，我们需要用到logback来记录日志，此时就可以在maven工程的pom.xml文件中，引入logback的依赖：

在pom.xml中编写\<dependencies\>标签

在\<dependencies\>标签中使用\<dependency\>引入坐标

定义坐标的 groupId、artifactId、version

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependencies&gt;<br />
&lt;!-- 第1个依赖 : logback --&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;<br />
&lt;artifactId&gt;logback-classic&lt;/artifactId&gt;<br />
&lt;version&gt;1.2.11&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!-- 第2个依赖 : junit --&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;junit&lt;/groupId&gt;<br />
&lt;artifactId&gt;junit&lt;/artifactId&gt;<br />
&lt;version&gt;4.12&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;</td>
</tr>
</tbody>
</table>

注：如果不知道依赖的坐标信息，可以到maven的中央仓库中搜索

**\[该类型的内容暂不支持下载\]**

点击刷新按钮，引入最新加入的坐标

**3.2 依赖传递**

由于logback-classic依赖logback-core和slf4j，在添加logback-classic依赖时，会自动把所依赖的其他jar包logback-core和slf4j也一起导，故只需要在pom.xml配置文件中，添加logback-classic的依赖坐标即可。

依赖传递可以分为：

直接依赖：在当前项目中通过依赖配置建立的依赖关系

间接依赖：被依赖的资源如果依赖其他资源，当前项目间接依赖其他资源

例如对于projectA 来说，projectB 就是直接依赖，projectC就是间接依赖：

<img src=".assets/JavaWeb-知识库笔记/media/image30.png" style="width:5.75in;height:2.01042in" />

**排除依赖**

主动断开依赖的资源（被排除的资源无需指定版本）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.itheima&lt;/groupId&gt;<br />
&lt;artifactId&gt;maven-projectB&lt;/artifactId&gt;<br />
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;<br />
<br />
&lt;!--排除依赖, 主动断开依赖的资源--&gt;<br />
&lt;exclusions&gt;<br />
&lt;exclusion&gt;<br />
&lt;groupId&gt;junit&lt;/groupId&gt;<br />
&lt;artifactId&gt;junit&lt;/artifactId&gt;<br />
&lt;/exclusion&gt;<br />
&lt;/exclusions&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**3.3 依赖范围**

限制依赖的使用范围，可以通过\<scope\>标签设置其作用范围。

作用范围：

主程序范围有效（main文件夹范围内）

测试程序范围有效（test文件夹范围内）

是否参与打包运行（package指令范围内）

scope标签的取值范围：

|                 |        |          |              |             |
|-----------------|--------|----------|--------------|-------------|
| scope值         | 主程序 | 测试程序 | 打包（运行） | 范例        |
| compile（默认） | Y      | Y        | Y            | log4j       |
| test            | \-     | Y        | \-           | junit       |
| provided        | Y      | Y        | \-           | servlet-api |
| runtime         | \-     | Y        | Y            | jdbc驱动    |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;junit&lt;/groupId&gt;<br />
&lt;artifactId&gt;junit&lt;/artifactId&gt;<br />
&lt;version&gt;4.13.1&lt;/version&gt;<br />
&lt;scope&gt;test&lt;/scope&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**3.4 生命周期**

Maven的生命周期描述了一次项目构建经历哪些阶段，在Maven出现之前，项目构建的生命周期就已经存在。

Maven对项目构建的生命周期划分为3套（相互独立）：

clean：清理工作

default：核心工作。如：编译、测试、打包、安装、部署等

site：生成报告、发布站点等

<img src=".assets/JavaWeb-知识库笔记/media/image31.png" style="width:5.75in;height:2.60417in" />

常使用的5个阶段含义：

• clean：移除上一次构建生成的文件

• compile：编译项目源代码

• test：使用合适的单元测试框架运行测试(junit)

• package：将编译后的文件打包，如：jar、war等

• install：安装项目到本地仓库

|                                                                                                                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **在同一套生命周期中，我们在执行后面的生命周期时，前面的生命周期都会执行**，例如执行package阶段，compile和test都会执行，但是clean不会执行，因为package和clean不在同一套生命周期。 |

**执行某一阶段生命周期**

执行指定的生命周期时，有两种执行方式：

在idea工具右侧的maven工具栏中，选择对应的生命周期，双击执行

在DOS命令行中，通过maven命令执行

进入到maven项目的命令行中

运行命令mvn 阶段名

<img src=".assets/JavaWeb-知识库笔记/media/image32.png" style="width:5.75in;height:2.47917in" />

**3.5 清理maven仓库**

从私服下载jar包时，可能由于网络的原因，jar包下载不完全，这些不完整的jar包都是以lastUpdated结尾，maven不会再重新下载，需要手动删除这些以lastUpdated结尾的文件，然后maven才会再次自动下载这些jar包。

可以定义一个批处理文件，在其中编写如下脚本来删除：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
set REPOSITORY_PATH=E:\develop\apache-maven-3.6.1\mvn_repo<br />
rem 正在搜索...<br />
<br />
del /s /q %REPOSITORY_PATH%\*.lastUpdated<br />
<br />
rem 搜索完毕<br />
pause</td>
</tr>
</tbody>
</table>

1). 定义批处理文件del_lastUpdated.bat (直接创建一个文本文件，命名为del_lastUpdated，后缀名直接改为bat即可 )

<img src=".assets/JavaWeb-知识库笔记/media/image33.png" style="width:5.75in;height:0.27083in" />

2). 在上面的bat文件上**右键 --\> 编辑**，修改文件：

<img src=".assets/JavaWeb-知识库笔记/media/image34.png" style="width:5.75in;height:0.86458in" />

修改完毕后，运行即可删除maven仓库中的残留文件

**十、SpringBootWeb**

通过SpringBoot可以快速的帮我们构建应用程序，简化开发、提高效率。

SpringBoot最大的特点有两个：简化配置和快速开发

**1.SpringBootWeb快速入门**

基于SpringBoot的方式开发一个web应用，浏览器发起请求/hello后，给浏览器返回字符串 “Hello World ~”：

<img src=".assets/JavaWeb-知识库笔记/media/image35.png" style="width:5.75in;height:0.79167in" />

**1.1 创建SpringBoot工程（需要联网）**

基于Spring官方骨架，创建SpringBoot工程。

<img src=".assets/JavaWeb-知识库笔记/media/image36.png" style="width:5.75in;height:5.11458in" />

之后选上Spring Web即可。

**1.2 定义请求处理类**

在Demo1Application类所在的包下创建java类HelloController：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.controller;<br />
import org.springframework.web.bind.annotation.*;<br />
<br />
@RestController<br />
public class HelloController {<br />
@RequestMapping("/hello")<br />
public String hello(){<br />
System.out.println("Hello World ~");<br />
return "Hello World ~";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**1.3 运行测试**

运行SpringBoot自动生成的引导类HelloController

打开浏览器，输入http://localhost:8080/hello，出现Hello World~即表示成功。

**1.4 Web分析**

<img src=".assets/JavaWeb-知识库笔记/media/image37.png" style="width:5.75in;height:1.91667in" />

浏览器：

输入网址：http://192.168.100.11:8080/hello

通过IP地址192.168.100.11定位到网络上的一台计算机

我们之前在浏览器中输入的localhost，就是127.0.0.1（本机）

通过端口号8080找到计算机上运行的程序

localhost:8080，意思是在本地计算机中找到正在运行的8080端口的程序

/hello是请求资源位置

资源：对计算机而言资源就是数据

web资源：通过网络可以访问到的资源（通常是指存放在服务器上的数据）

localhost:8080/hello，意思是向本地计算机中的8080端口程序，获取资源位置是/hello的数据

8080端口程序，在服务器找/hello位置的资源数据，发给浏览器

服务器（可以理解为ServerSocket）：

接收到浏览器发送的信息（如：/hello）

在服务器上找到/hello的资源

把资源发送给浏览器

**2.HTTP协议**

HTTP协议（超文本传输协议），规定了浏览器与服务器之间数据传输的规则，即浏览器在向服务器发送请求数据时，或是服务器在向浏览器发送响应数据时，都必须按照固定的格式进行数据传输。

**特点**：

基于TCP协议：面向连接，安全

基于请求-响应模型：一次请求对应一次响应（先请求后响应，没有请求就没有响应）

无状态协议：对于数据没有记忆能力，每次请求-响应都是独立的。无状态指客户端发送HTTP请求给服务端之后，服务端根据请求响应数据，响应完后，不会记录任何信息

**2.1 HTTP-请求协议**

HTTP协议分为请求协议和响应协议。

请求协议：浏览器将数据以请求格式发送到服务器

包括：**请求行**、**请求头** 、**请求体**

响应协议：服务器将数据以响应格式返回给浏览器

包括：**响应行** 、**响应头** 、**响应体**

在HTTP1.1版本中，浏览器访问服务器的几种方式：

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td>请求方式</td>
<td>请求说明</td>
</tr>
<tr class="even">
<td><strong>GET</strong></td>
<td>获取资源。<br />
向特定的资源发出请求。例：http://www.baidu.com/s?wd=itheima</td>
</tr>
<tr class="odd">
<td><strong>POST</strong></td>
<td>传输实体主体。<br />
向指定资源提交数据进行处理请求（例：上传文件），数据被包含在请求体中。</td>
</tr>
<tr class="even">
<td>OPTIONS</td>
<td>返回服务器针对特定资源所支持的HTTP请求方式。<br />
因为并不是所有的服务器都支持规定的方法，为了安全有些服务器可能会禁止掉一些方法，例如：DELETE、PUT等。那么OPTIONS就是用来询问服务器支持的方法。</td>
</tr>
<tr class="odd">
<td>HEAD</td>
<td>获得报文首部。<br />
HEAD方法类似GET方法，但是不同的是HEAD方法不要求返回数据。通常用于确认URI的有效性及资源更新时间等。</td>
</tr>
<tr class="even">
<td>PUT</td>
<td>传输文件。<br />
PUT方法用来传输文件。类似FTP协议，文件内容包含在请求报文的实体中，然后请求保存到URL指定的服务器位置。</td>
</tr>
<tr class="odd">
<td>DELETE</td>
<td>删除文件。<br />
请求服务器删除Request-URI所标识的资源</td>
</tr>
<tr class="even">
<td>TRACE</td>
<td>追踪路径。<br />
回显服务器收到的请求，主要用于测试或诊断</td>
</tr>
<tr class="odd">
<td>CONNECT</td>
<td>要求用隧道协议连接代理。<br />
HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器</td>
</tr>
</tbody>
</table>

在我们实际应用中常用的也就是 ：**GET、POST**

**2.1.1 GET方式的请求协议**

<img src=".assets/JavaWeb-知识库笔记/media/image38.png" style="width:5.75in;height:1.13542in" />

请求行 ：HTTP请求中的第一行数据。由：请求方式、资源路径、协议/版本组成（之间使用空格分隔）

请求方式：GET

资源路径：/brand/findAll?name=OPPO&status=1

请求路径：/brand/findAll

请求参数：name=OPPO&status=1

请求参数是以key=value形式出现

多个请求参数之间使用&连接

请求路径和请求参数之间使用?连接

协议/版本：HTTP/1.1

请求头：第二行开始，上图黄色部分内容就是请求头，格式为key: value形式

http是个无状态的协议，所以在请求头设置浏览器的一些自身信息和想要响应的形式。这样服务器在收到信息后，就可以知道是谁，想干什么了

常见的HTTP请求头有：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
Host: 表示请求的主机名<br />
<br />
User-Agent: 浏览器版本。 例如：Chrome浏览器的标识类似Mozilla/5.0 ...Chrome/79 ，IE浏览器的标识类似Mozilla/5.0 (Windows NT ...)like Gecko<br />
<br />
Accept：表示浏览器能接收的资源类型，如text/*，image/*或者*/*表示所有；<br />
<br />
Accept-Language：表示浏览器偏好的语言，服务器可以据此返回不同语言的网页；<br />
<br />
Accept-Encoding：表示浏览器可以支持的压缩类型，例如gzip, deflate等。<br />
<br />
Content-Type：请求主体的数据类型<br />
<br />
Content-Length：数据主体的大小（单位：字节）</td>
</tr>
</tbody>
</table>

举例说明：服务端可以根据请求头中的内容来获取客户端的相关信息，有了这些信息服务端就可以处理不同的业务需求，比如:

不同浏览器解析HTML和CSS标签的结果会有不一致，所以就会导致相同的代码在不同的浏览器会出现不同的效果

服务端根据客户端请求头中的数据获取到客户端的浏览器类型，就可以根据不同的浏览器设置不同的代码来达到一致的效果（这就是我们常说的浏览器兼容问题）

请求体 ：存储请求参数

GET请求的请求参数在请求行中，故不需要设置请求体

**2.1.2 POST方式的请求协议**

<img src=".assets/JavaWeb-知识库笔记/media/image39.png" style="width:5.75in;height:1.91667in" />

请求行(以上图中红色部分)：包含请求方式、资源路径、协议/版本

请求方式：POST

资源路径：/brand

协议/版本：HTTP/1.1

请求头(以上图中黄色部分)

请求体(以上图中绿色部分) ：存储请求参数

请求体和请求头之间是有一个空行隔开（作用：用于标记请求头结束）

GET请求和POST请求的区别：

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td>区别方式</td>
<td>GET请求</td>
<td>POST请求</td>
</tr>
<tr class="even">
<td>请求参数</td>
<td>请求参数在请求行中。<br />
例：/brand/findAll?name=OPPO&amp;status=1</td>
<td>请求参数在请求体中</td>
</tr>
<tr class="odd">
<td>请求参数长度</td>
<td>请求参数长度有限制(浏览器不同限制也不同)</td>
<td>请求参数长度没有限制</td>
</tr>
<tr class="even">
<td>安全性</td>
<td>安全性低。原因：请求参数暴露在浏览器地址栏中。</td>
<td>安全性相对高</td>
</tr>
</tbody>
</table>

**2.2 HTTP-响应协议**

与HTTP的请求一样，HTTP响应的数据也分为3部分：**响应行**、**响应头** 、**响应体**。

<img src=".assets/JavaWeb-知识库笔记/media/image40.png" style="width:5.75in;height:1.5625in" />

响应行(以上图中红色部分)：响应数据的第一行。响应行由协议及版本、响应状态码、状态码描述组成

协议/版本：HTTP/1.1

响应状态码：200

状态码描述：OK

响应头(以上图中黄色部分)：响应数据的第二行开始。格式为key：value形式

http是个无状态的协议，所以可以在请求头和响应头中设置一些信息和想要执行的动作，这样，对方在收到信息后，就可以知道你是谁，你想干什么

常见的HTTP响应头有:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
Content-Type：表示该响应内容的类型，例如text/html，image/jpeg ；<br />
<br />
Content-Length：表示该响应内容的长度（字节数）；<br />
<br />
Content-Encoding：表示该响应压缩算法，例如gzip ；<br />
<br />
Cache-Control：指示客户端应如何缓存，例如max-age=300表示可以最多缓存300秒 ;<br />
<br />
Set-Cookie: 告诉浏览器为当前页面所在的域设置cookie ;</td>
</tr>
</tbody>
</table>

响应体(以上图中绿色部分)： 响应数据的最后一部分，存储响应的数据

响应体和响应头之间有一个空行隔开，用于标记响应头结束

**响应状态码**

|            |                                                                                                             |
|------------|-------------------------------------------------------------------------------------------------------------|
| 状态码分类 | 说明                                                                                                        |
| 1xx        | **响应中** --- 临时状态码。表示请求已经接受，告诉客户端应该继续请求或者如果已经完成则忽略                   |
| 2xx        | **成功** --- 表示请求已经被成功接收，处理已完成                                                             |
| 3xx        | **重定向** --- 重定向到其它地方，让客户端再发起一个请求以完成整个处理                                       |
| 4xx        | **客户端错误** --- 处理发生错误，责任在客户端，如：客户端的请求一个不存在的资源，客户端未被授权，禁止访问等 |
| 5xx        | **服务器端错误** --- 处理发生错误，责任在服务端，如：服务端抛出异常，路由出错，HTTP版本不支持等             |

|         |                                     |                                                                                                      |
|---------|-------------------------------------|------------------------------------------------------------------------------------------------------|
| 状态码  | 英文描述                            | 解释                                                                                                 |
| **200** | **OK**                              | 客户端请求成功，即**处理成功**，这是我们最想看到的状态码                                             |
| 302     | **Found**                           | 指示所请求的资源已移动到由Location响应头给定的 URL，浏览器会自动重新访问到这个页面                   |
| 304     | **Not Modified**                    | 告诉客户端，你请求的资源至上次取得后，服务端并未更改，你直接用你本地缓存吧。隐式重定向               |
| 400     | **Bad Request**                     | 客户端请求有**语法错误**，不能被服务器所理解                                                         |
| 403     | **Forbidden**                       | 服务器收到请求，但是**拒绝提供服务**，比如：没有权限访问相关资源                                     |
| **404** | **Not Found**                       | **请求资源不存在**，一般是URL输入有误，或者网站资源被删除了                                          |
| 405     | **Method Not Allowed**              | 请求方式有误，比如应该用GET请求方式的资源，用了POST                                                  |
| 428     | **Precondition Required**           | **服务器要求有条件的请求**，告诉客户端要想访问该资源，必须携带特定的请求头                           |
| 429     | **Too Many Requests**               | 指示用户在给定时间内发送了**太多请求**（“限速”），配合 Retry-After(多长时间后可以请求)响应头一起使用 |
| 431     | **Request Header Fields Too Large** | **请求头太大**，服务器不愿意处理请求，因为它的头部字段太大。请求可以在减少请求头域的大小后重新提交。 |
| **500** | **Internal Server Error**           | **服务器发生不可预期的错误**。服务器出异常了，赶紧看日志去吧                                         |
| 503     | **Service Unavailable**             | **服务器尚未准备好处理请求**，服务器刚刚启动，还未初始化好                                           |

状态码大全：

**\[该类型的内容暂不支持下载\]**

关于响应状态码，我们先主要认识三个状态码，其余的等后期用到了再去掌握：

200 ok 客户端请求成功

404 Not Found 请求资源不存在

500 Internal Server Error 服务端发生不可预期的错误

**2.3 HTTP-协议解析**

以下是一个自定义的服务器代码，主要使用到的是ServerSocket和Socket：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima;<br />
<br />
import java.io.*;<br />
import java.net.ServerSocket;<br />
import java.net.Socket;<br />
import java.nio.charset.StandardCharsets;<br />
<br />
/*<br />
* 自定义web服务器<br />
*/<br />
public class Server {<br />
public static void main(String[] args) throws IOException {<br />
ServerSocket ss = new ServerSocket(8080); // 监听指定端口<br />
System.out.println("server is running...");<br />
<br />
while (true){<br />
Socket sock = ss.accept();<br />
System.out.println("connected from " + sock.getRemoteSocketAddress());<br />
Thread t = new Handler(sock);<br />
t.start();<br />
}<br />
}<br />
}<br />
<br />
class Handler extends Thread {<br />
Socket sock;<br />
<br />
public Handler(Socket sock) {<br />
this.sock = sock;<br />
}<br />
<br />
public void run() {<br />
try (InputStream input = this.sock.getInputStream();<br />
OutputStream output = this.sock.getOutputStream()) {<br />
handle(input, output);<br />
} catch (Exception e) {<br />
try {<br />
this.sock.close();<br />
} catch (IOException ioe) {<br />
}<br />
System.out.println("client disconnected.");<br />
}<br />
}<br />
<br />
private void handle(InputStream input, OutputStream output) throws IOException {<br />
BufferedReader reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));<br />
BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(output, StandardCharsets.UTF_8));<br />
// 读取HTTP请求:<br />
boolean requestOk = false;<br />
String first = reader.readLine();<br />
if (first.startsWith("GET / HTTP/1.")) {<br />
requestOk = true;<br />
}<br />
for (;;) {<br />
String header = reader.readLine();<br />
if (header.isEmpty()) { // 读取到空行时, HTTP Header读取完毕<br />
break;<br />
}<br />
System.out.println(header);<br />
}<br />
System.out.println(requestOk ? "Response OK" : "Response Error");<br />
<br />
if (!requestOk) {// 发送错误响应:<br />
writer.write("HTTP/1.0 404 Not Found\r\n");<br />
writer.write("Content-Length: 0\r\n");<br />
writer.write("\r\n");<br />
writer.flush();<br />
} else {// 发送成功响应:<br />
//读取html文件，转换为字符串<br />
InputStream is = Server.class.getClassLoader().getResourceAsStream("html/a.html");<br />
BufferedReader br = new BufferedReader(new InputStreamReader(is));<br />
StringBuilder data = new StringBuilder();<br />
String line = null;<br />
while ((line = br.readLine()) != null){<br />
data.append(line);<br />
}<br />
br.close();<br />
int length = data.toString().getBytes(StandardCharsets.UTF_8).length;<br />
<br />
writer.write("HTTP/1.1 200 OK\r\n");<br />
writer.write("Connection: keep-alive\r\n");<br />
writer.write("Content-Type: text/html\r\n");<br />
writer.write("Content-Length: " + length + "\r\n");<br />
writer.write("\r\n"); // 空行标识Header和Body的分隔<br />
writer.write(data.toString());<br />
writer.flush();<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

启动ServerSocket程序：

<img src=".assets/JavaWeb-知识库笔记/media/image41.png" style="width:5.75in;height:2.85417in" />

浏览器输入：http://localhost:8080就会访问到ServerSocket程序

ServerSocket程序，会读取服务器上html/a.html文件，并把文件数据发送给浏览器

浏览器接收到a.html文件中的数据后进行解析，显示一个表格

在开发中真正用到的Web服务器，我们不会自己写的，都是使用目前比较流行的web服务器，如：**Tomcat**

**3.WEB服务器-Tomcat**

Web服务器是一个应用程序(软件)，对HTTP协议的操作进行封装，使得程序员不必直接对协议进行操作(不用程序员自己写代码去解析http协议规则)，让Web开发更加便捷，主要功能是"提供网上信息浏览服务"。

将来我们把自己写的Web项目部署到Tomcat服务器软件中，当Web服务器软件启动后，部署在Web服务器软件中的页面就可以直接通过浏览器来访问了。

**Web服务器软件使用步骤**

准备静态资源：即下面的部署项目文件夹

**\[部署项目.zip\]**

下载安装Web服务器软件：解压apache-tomcat-9.0.27-windows-x64.zip即安装

**\[apache-tomcat-9.0.27-windows-x64.zip\]**

将静态资源部署到Web服务器上：将 部署项目 下的demo直接拷贝到Tomcat安装目录下的webapps即可

启动Web服务器使用浏览器访问对应的资源：双击启动bin目录下的startup.bat即可

浏览器输入：http://localhost:8080/demo/index.html看到表格就表示成功了

**3.1 Tomcat基本使用**

直接从官方网站下载：

**\[该类型的内容暂不支持下载\]**

<img src=".assets/JavaWeb-知识库笔记/media/image42.png" style="width:5.75in;height:4.52083in" />

Tomcat软件类型说明：

tar.gz文件，是linux和mac操作系统下的压缩版本

zip文件，是window操作系统下压缩版本

直接解压到不含中文和空格的目录下即安装，卸载直接删除这个文件夹即可。

**3.1.1 目录结构**

<img src=".assets/JavaWeb-知识库笔记/media/image43.png" style="width:5.75in;height:3.91667in" />

bin：目录下有两类文件，一种是以.bat结尾的，是Windows系统的可执行文件，一种是以.sh结尾的，是Linux系统的可执行文件。

webapps：就是以后项目部署的目录

**3.1.2 启动与关闭**

**启动Tomcat** ：

双击tomcat解压目录 /bin/startup.bat文件 即可启动tomcat。

Tomcat的默认端口为8080，所以在浏览器的地址栏输入http://127.0.0.1:8080即可访问Tomcat服务器

|                                                                                                    |
|----------------------------------------------------------------------------------------------------|
| **注意**：Tomcat启动的过程中，遇到控制台有中文乱码时，通常可以修改conf/logging.pro perties文件解决 |

<img src=".assets/JavaWeb-知识库笔记/media/image44.png" style="width:5.75in;height:0.38542in" />

**关闭**：

方式一：强制关闭 -\> 直接x掉Tomcat窗口（不建议）

方式二：正常关闭 -\> bin\shutdown.bat

方式三：正常关闭 -\> 在Tomcat启动窗口中按下 Ctrl+C

**3.1.3 常见问题**

**问题1：Tomcat启动时，窗口一闪而过**

检查JAVA_HOME环境变量是否正确配置：...\JDKXxx

**问题2：端口号冲突**

修改Tomcat启动的端口号，需要修改 conf/server.xml 文件

<img src=".assets/JavaWeb-知识库笔记/media/image45.png" style="width:5.75in;height:0.90625in" />

*注: HTTP协议默认端口号为80，如果将Tomcat端口号改为80，则将来访问Tomcat时，将不用输入端口号。*

**3.2 入门程序解析**

**3.2.1 Spring官方骨架**

Spring官方骨架，可以理解为Spring官方为程序员提供一个搭建项目的模板。之前创建项目就是使用的官方骨架：

<img src=".assets/JavaWeb-知识库笔记/media/image46.png" style="width:5.75in;height:1.26042in" />

可以通过访问如下网址进入到官方骨架页面：

**\[该类型的内容暂不支持下载\]**

<img src=".assets/JavaWeb-知识库笔记/media/image47.png" style="width:5.75in;height:3.20833in" />

SpringBoot项目需要依赖Spring Web

<img src=".assets/JavaWeb-知识库笔记/media/image48.png" style="width:5.75in;height:3.22917in" />

SpringBoot项目创建成功后，会下载到本地，解压缩后就可以得到一个Spring Boot项目文件夹

不论使用IDEA创建SpringBoot项目，还是直接在官方网站利用骨架生成SpringBoot项目，项目的结构和pom.xml文件中内容是相似的

**3.2.2 起步依赖**

spring-boot-starter-web和spring-boot-starter-test，在SpringBoot中又称为起步依赖，每一个起步依赖，都用于开发一个特定的功能。

起步依赖共同的特征就是以spring-boot-starter-作为开头。

spring-boot-starter-web：包含了web应用开发所需要的常见依赖。内部把关于Web开发所有的依赖都已经导入并且指定了版本，只需引入 spring-boot-starter-web 依赖就可以实现Web开发的需要的功能

spring-boot-starter-test：包含了单元测试所需要的常见依赖

起步依赖官方地址：

**\[该类型的内容暂不支持下载\]**

**3.2.3 SpringBoot父工程**

每一个SpringBoot工程，都有一个父工程。依赖的版本号，在父工程中统一管理，所以不用指定依赖的版本号：

<img src=".assets/JavaWeb-知识库笔记/media/image49.png" style="width:5.75in;height:1.48958in" />

**3.2.4 内嵌Tomcat**

spring-boot-starter-web起步依赖内部已经集成了内置的Tomcat服务器，所以不用部署springboot项目也能运行。

当我们运行SpringBoot的引导类时(运行main方法)，就会看到命令行输出的日志，其中占用8080端口的就是Tomcat。

**十一、SpringBootWeb请求响应**

**1.前言**

浏览器发送请求请求web服务器 （也就是内置的Tomcat），被部署在Tomcat中的控制器类Controller接收，Controller再给浏览器一个响应，整个过程遵守http协议。但是Tomcat不识别自定义的Controller，可以识别 Servlet程序。所以Tomcat内置了一个核心的Servlet程序 DispatcherServlet（核心控制器）,负责接收页面发送的请求，然后根据执行规则将请求再转发给请求处理器Controller，请求处理器处理完请求后再由DispatcherServlet给浏览器响应数据

<img src=".assets/JavaWeb-知识库笔记/media/image50.png" style="width:5.75in;height:1.64583in" />

BS架构：Browser/Server，浏览器/服务器架构模式。客户端只需要浏览器，应用程序的逻辑和数据都存储在服务端

Tomcat接收到浏览器发送的数据后，会先解析这些请求数据，然后将解析后的请求数据传递给Servlet程序的HttpServletRequest对象，Tomcat还会给Servlet程序传递一个参数 HttpServletResponse用以给浏览器设置响应数据。

<img src=".assets/JavaWeb-知识库笔记/media/image51.png" style="width:5.75in;height:1.52083in" />

**2.请求**

**2.1 Postman**

Postman工具是后端开发员用来测试自己所开发的程序的，可以在没有前端页面的情况下测试后端程序的正确性，即模拟浏览器向后端服务器发起任何形式(如get、post)的HTTP请求。

**安装**：双击资料中提供的Postman-win64-8.3.1-Setup.exe即可自动安装。

**基本使用**

登录完成之后，可以创建工作空间：

<img src=".assets/JavaWeb-知识库笔记/media/image52.png" style="width:5.75in;height:3.16667in" />

<img src=".assets/JavaWeb-知识库笔记/media/image53.png" style="width:5.75in;height:4.45833in" />

创建请求：

<img src=".assets/JavaWeb-知识库笔记/media/image54.png" style="width:5.75in;height:1.38542in" />

点击"Save"，保存当前请求

<img src=".assets/JavaWeb-知识库笔记/media/image55.png" style="width:5.75in;height:2.57292in" />

<img src=".assets/JavaWeb-知识库笔记/media/image56.png" style="width:5.75in;height:2.55208in" />

<img src=".assets/JavaWeb-知识库笔记/media/image57.png" style="width:5.75in;height:1.07292in" />

<img src=".assets/JavaWeb-知识库笔记/media/image58.png" style="width:5.75in;height:3.42708in" />

<img src=".assets/JavaWeb-知识库笔记/media/image59.png" style="width:5.75in;height:2.59375in" />

**2.2 简单参数**

<img src=".assets/JavaWeb-知识库笔记/media/image60.png" style="width:5.75in;height:0.4375in" />

后端程序接收浏览器传递过来的普通参数数据有两种方式：原始方式、SpringBoot方式

**2.2.1 原始方式（不建议）**

通过Servlet中提供的API：HttpServletRequest（请求对象），获取请求的相关信息，即在方法的形参中声明 HttpServletRequest 对象，通过该对象来获取请求信息。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//根据指定的参数名获取请求参数的数据值<br />
String request.getParameter("参数名")</td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//原始方式<br />
@RequestMapping("/simpleParam")<br />
public String simpleParam(HttpServletRequest request){<br />
// http://localhost:8080/simpleParam?name=Tom&amp;age=10<br />
// 请求参数： name=Tom&amp;age=10 （有2个请求参数）<br />
<br />
String name = request.getParameter("name");//name就是请求参数名<br />
String ageStr = request.getParameter("age");//age就是请求参数名<br />
<br />
int age = Integer.parseInt(ageStr);//需要手动进行类型转换<br />
System.out.println(name+" : "+age);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.2.2 SpringBoot方式**

参数名与形参变量名相同，定义同名的形参即可接收参数。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
// http://localhost:8080/simpleParam?name=Tom&amp;age=10<br />
// 第1个请求参数： name=Tom 参数名:name，参数值:Tom<br />
// 第2个请求参数： age=10 参数名:age , 参数值:10<br />
<br />
//springboot方式<br />
@RequestMapping("/simpleParam")<br />
public String simpleParam(String name , Integer age ){//形参名和请求参数名保持一致<br />
System.out.println(name+" : "+age);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

不论是GET请求还是POST请求，对于简单参数来讲，只要保证请求参数名和Controller方法中的形参名保持一致，就可以获取到请求参数中的数据值。

**2.2.3 参数名不一致**

对于简单参数来讲，请求参数名和controller方法中的形参名不一致时，无法接收到请求数据。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RequestMapping("/simpleParam")<br />
public String simpleParam(String username , Integer age ){//请求参数名和形参名不相同<br />
// http://localhost:8080/simpleParam?name=Tom&amp;age=20<br />
<br />
System.out.println(username+" : "+age); //username=null，age=20<br />
return "OK";<br />
}</td>
</tr>
</tbody>
</table>

解决方案：可以使用Spring提供的@RequestParam注解完成映射：在方法形参前面加上 @RequestParam，然后通过name属性指定请求参数名，从而完成映射。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//springboot方式<br />
@RequestMapping("/simpleParam")<br />
public String simpleParam(@RequestParam("name") String username , Integer age ){<br />
// http://localhost:8080/simpleParam?name=Tom&amp;age=20<br />
<br />
System.out.println(username+" : "+age); //username=Tom，age=20<br />
return "OK";<br />
}</td>
</tr>
</tbody>
</table>

**注意事项**：@RequestParam中的required属性默认为true（默认值也是true），代表该请求参数必须传递，如果不传递将报错，例如username和age缺少任意一个都会响应状态码400，可以将required属性设置为false代表这个参数可选：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RequestMapping("/simpleParam")<br />
public String simpleParam(@RequestParam(name = "name", required = false) String username, Integer age){<br />
System.out.println(username+ ":" + age);<br />
return "OK";<br />
}</td>
</tr>
</tbody>
</table>

**2.3 实体参数**

接受请求参数可以封装到一个实体类对象中，这样形参只要一个对象就可以接受所有请求参数，要想完成数据封装，需要遵守如下规则：**请求参数名与实体类的属性名相同**。

**2.3.1 简单实体对象**

定义pojo实体类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class User {<br />
private String name;<br />
private Integer age;<br />
... //构造方法、get和set方法省略<br />
@Override<br />
public String toString() {<br />
return ...;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

Controller方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//实体参数：简单实体对象<br />
@RequestMapping("/simplePojo")<br />
public String simplePojo(User user){<br />
System.out.println(user);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.3.2 复杂实体对象**

复杂实体对象即在实体类中有一个或多个属性，也是实体对象类型的。

复杂实体对象的封装，需要遵守如下规则：**请求参数名与形参对象属性名相同，按照对象层次结构关系即可接收嵌套实体类属性参数。**

以http://localhost:8080/complexPojo?name=Tom&age=10&address.province=beijing&address.city=beijing为例。

定义POJO实体类：

Address实体类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class Address {<br />
private String province;<br />
private String city;<br />
... //构造方法、get和set方法省略<br />
@Override<br />
public String toString() {<br />
return ...;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

User实体类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class User {<br />
private String name;<br />
private Integer age;<br />
private Address address; //地址对象<br />
... //构造方法、get和set方法省略<br />
@Override<br />
public String toString() {<br />
return ...;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

Controller方法

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//实体参数：复杂实体对象<br />
@RequestMapping("/complexPojo")<br />
public String complexPojo(User user){<br />
System.out.println(user);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.4 数组集合参数**

在HTML的表单中，复选框可以提交选择的多个值，接受复选框的参数有两种方式（以http://localhost:8080/arrayParam?hobby=game&hobby=java或http://localhost:8080/arrayParam?hobby=game,java为例）：

**2.4.1 数组**

数组参数：**请求参数名与形参数组名称相同且请求参数为多个，定义数组类型形参即可接收参数**

Controller方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//数组集合参数<br />
@RequestMapping("/arrayParam")<br />
public String arrayParam(String[] hobby){<br />
System.out.println(Arrays.toString(hobby));<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.4.2 集合**

集合参数：**请求参数名与形参集合对象名相同且请求参数为多个，@RequestParam绑定参数关系**

|                                                                                                       |
|-------------------------------------------------------------------------------------------------------|
| 默认情况下，请求中参数名相同的多个值，是封装到数组。如果要封装到集合，要使用@RequestParam绑定参数关系 |

Controller方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//数组集合参数<br />
@RequestMapping("/listParam")<br />
public String listParam(@RequestParam List&lt;String&gt; hobby){<br />
System.out.println(hobby);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.5 日期参数**

对于日期类型的参数在进行封装的时候，需要通过@DateTimeFormat注解，以及其pattern属性来设置日期的格式。

后端controller方法中，需要使用Date类型或LocalDateTime类型，来封装传递的参数。

以http://localhost:8080/dataParam?updateTime=2022-12-12 10:05:45为例：

Controller方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//日期时间参数<br />
@RequestMapping("/dateParam")<br />
public String dateParam(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime updateTime){<br />
System.out.println(updateTime);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.6 JSON参数**

Postman发送JSON格式数据：

<img src=".assets/JavaWeb-知识库笔记/media/image61.png" style="width:5.75in;height:1.75in" />

服务端Controller方法接收JSON格式数据：

传递json格式的参数，在Controller中会使用实体类进行封装

封装规则：**JSON数据键名与形参对象属性名相同，定义POJO类型形参即可接收参数。需要使用 @RequestBody标识**

@RequestBody注解：将JSON数据映射到形参的实体类对象中（JSON中的key和实体类中的属性名保持一致）

实体类：Address

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class Address {<br />
private String province;<br />
private String city;<br />
... //构造方法、get和set方法省略<br />
}</td>
</tr>
</tbody>
</table>

实体类：User

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class User {<br />
private String name;<br />
private Integer age;<br />
private Address address;<br />
... //构造方法、get和set方法省略<br />
}</td>
</tr>
</tbody>
</table>

Controller方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//JSON参数<br />
@RequestMapping("/jsonParam")<br />
public String jsonParam(@RequestBody User user){<br />
System.out.println(user);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.7 路径参数**

路径参数：

前端：通过请求URL直接传递参数

后端：使用{…}来标识该路径参数，**需要使用@PathVariable获取路径参数**

<img src=".assets/JavaWeb-知识库笔记/media/image62.png" style="width:5.75in;height:1.80208in" />

**传递单个路径参数：**

Controller方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//路径参数<br />
@RequestMapping("/path/{id}")<br />
public String pathParam(@PathVariable Integer id){<br />
System.out.println(id);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

Postman测试：访问http://localhost:8080/path/1，控制台输出1，浏览器显示OK。

**传递多个路径参数：**

Controller方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class RequestController {<br />
//路径参数<br />
@RequestMapping("/path/{id}/{name}")<br />
public String pathParam2(@PathVariable Integer id, @PathVariable String name){<br />
System.out.println(id+ " : " +name);<br />
return "OK";<br />
}<br />
}</td>
</tr>
</tbody>
</table>

Postman测试：访问http://localhost:8080/path/1/itcast，控制台输出1 : itcast，浏览器显示OK。

**3.响应**

**3.1 @ResponseBody**

**@ResponseBody注解：**

类型：方法注解、类注解

位置：书写在Controller方法上或类上

作用：将方法返回值直接响应给浏览器

如果返回值类型是实体对象/集合，将会转换为JSON格式后在响应给浏览器

|                                                        |
|--------------------------------------------------------|
| **注** ：@RestController = @Controller + @ResponseBody |

@RestController源码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Target({ElementType.TYPE}) //元注解（修饰注解的注解）<br />
@Retention(RetentionPolicy.RUNTIME) //元注解<br />
@Documented //元注解<br />
@Controller<br />
@ResponseBody<br />
public @interface RestController {<br />
@AliasFor(<br />
annotation = Controller.class<br />
)<br />
String value() default "";<br />
}</td>
</tr>
</tbody>
</table>

**3.2 统一响应结果**

统一的返回结果使用类来描述，在这个结果中包含：

响应状态码：当前请求是成功，还是失败

状态码信息：给页面的提示信息

返回的数据：给前端响应的数据（字符串、对象、集合）

定义在一个实体类Result来包含以上信息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class Result {<br />
private Integer code;//响应码，1 代表成功; 0 代表失败<br />
private String msg; //状态码 描述字符串<br />
private Object data; //返回的数据<br />
<br />
... //构造方法、get和set方法省略<br />
<br />
//增删改 成功响应(不需要给前端返回数据)<br />
public static Result success(){<br />
return new Result(1,"success",null);<br />
}<br />
//查询 成功响应(把查询结果做为返回数据响应给前端)<br />
public static Result success(Object data){<br />
return new Result(1,"success",data);<br />
}<br />
//失败响应<br />
public static Result error(String msg){<br />
return new Result(0,msg,null);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.案例**

**4.1 需求说明**

加载并解析xml文件中的数据，完成数据处理，并在页面展示

<img src=".assets/JavaWeb-知识库笔记/media/image63.png" style="width:5.75in;height:1.47917in" />

**4.2 准备工作**

**\[解析xml的SpringBoot案例资源.zip\]**

XML文件

已经准备好(emp.xml)，直接导入进来，放在 src/main/resources目录下

工具类

已经准备好解析XML文件的工具类，无需自己实现

直接在创建一个包 com.itheima.utils ，然后将工具类拷贝进来

前端页面资源

已经准备好，直接拷贝进来，放在src/main/resources下的static目录下

Springboot项目的静态资源(html，css，js等前端资源)默认存放目录为：classpath:/static 、 classpath:/public、 classpath:/resources

在SpringBoot项目中，静态资源默认可以存放的目录：

classpath:/static/

classpath:/public/

classpath:/resources/

classpath:/META-INF/resources/

classpath：代表的是类路径，在maven的项目中，其实指的就是 src/main/resources 或者 src/main/java，但是java目录是存放java代码的，所以相关的配置文件及静态资源文档，就放在 src/main/resources下

**4.3 实现步骤**

**\[解析xml的SpringBoot案例资源.zip\]**

在pom.xml文件中引入dom4j的依赖，用于解析XML文件

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.dom4j&lt;/groupId&gt;<br />
&lt;artifactId&gt;dom4j&lt;/artifactId&gt;<br />
&lt;version&gt;2.1.3&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

引入资料中提供的：解析XML的工具类XMLParserUtils、实体类Emp、XML文件emp.xml

<img src=".assets/JavaWeb-知识库笔记/media/image64.png" style="width:5.75in;height:1.84375in" />

引入资料中提供的静态页面文件，放在resources下的static目录下

<img src=".assets/JavaWeb-知识库笔记/media/image65.png" style="width:5.75in;height:1.98958in" />

创建EmpController类，编写Controller程序，处理请求，响应数据

<img src=".assets/JavaWeb-知识库笔记/media/image66.png" style="width:5.75in;height:2.83333in" />

**4.4 代码实现**

Controller代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class EmpController {<br />
@RequestMapping("/listEmp")<br />
public Result list(){<br />
//1. 加载并解析emp.xml<br />
String file = this.getClass().getClassLoader().getResource("emp.xml").getFile();<br />
//System.out.println(file);<br />
List&lt;Emp&gt; empList = XmlParserUtils.parse(file, Emp.class);<br />
<br />
//2. 对数据进行转换处理 - gender, job<br />
empList.stream().forEach(emp -&gt; {<br />
//处理 gender 1: 男, 2: 女<br />
String gender = emp.getGender();<br />
if("1".equals(gender)){<br />
emp.setGender("男");<br />
}else if("2".equals(gender)){<br />
emp.setGender("女");<br />
}<br />
<br />
//处理job - 1: 讲师, 2: 班主任 , 3: 就业指导<br />
String job = emp.getJob();<br />
if("1".equals(job)){<br />
emp.setJob("讲师");<br />
}else if("2".equals(job)){<br />
emp.setJob("班主任");<br />
}else if("3".equals(job)){<br />
emp.setJob("就业指导");<br />
}<br />
});<br />
//3. 响应数据<br />
return Result.success(empList);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.5 测试**

打开浏览器，在浏览器地址栏输入： http://localhost:8080/emp.html

<img src=".assets/JavaWeb-知识库笔记/media/image67.png" style="width:5.75in;height:2.61458in" />

**5.分层解耦**

**5.1 三层架构**

**5.1.1 介绍**

在进行程序设计以及程序开发时，尽可能让每一个接口、类、方法的职责更单一些（单一职责原则）。

<img src=".assets/JavaWeb-知识库笔记/media/image68.png" style="width:5.75in;height:4in" />

案例中的Contriller代码，从组成上看可以分为三个部分：

数据访问：负责业务数据的维护操作，包括增、删、改、查等操作

逻辑处理：负责业务逻辑处理的代码

请求处理、响应数据：负责，接收页面的请求，给页面响应数据

三层架构就是把这三个部分分离出来，使各层**相互独立，互不影响**：

**Controller**：控制层。接收前端发送的请求，对请求进行处理，并响应数据

**Service**：业务逻辑层。处理具体的业务逻辑

**Dao**：数据访问层(Data Access Object)，也称为持久层。负责数据访问操作，包括数据的增、删、改、查

三层架构的程序执行流程：

<img src=".assets/JavaWeb-知识库笔记/media/image69.png" style="width:5.75in;height:1.30208in" />

前端发起的请求，由Controller层接收（Controller响应数据给前端）

Controller层调用Service层来进行逻辑处理（Service层处理完后，把处理结果返回给Controller层）

Serivce层调用Dao层（逻辑处理过程中需要用到的一些数据要从Dao层获取）

Dao层操作文件中的数据（Dao拿到的数据会返回给Service层）

**5.1.2 代码拆分**

控制层包名：xxxx.controller

业务逻辑层包名：xxxx.service

数据访问层包名：xxxx.dao（更多的实际是xxxx.mapper）

<img src=".assets/JavaWeb-知识库笔记/media/image70.png" style="width:5.75in;height:5.27083in" />

**控制层**：接收前端发送的请求，对请求进行处理，并响应数据

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class EmpController {<br />
//业务层对象<br />
private EmpService empService = new EmpServiceA();<br />
<br />
@RequestMapping("/listEmp")<br />
public Result list(){<br />
//1. 调用service层, 获取数据<br />
List&lt;Emp&gt; empList = empService.listEmp();<br />
<br />
//3. 响应数据<br />
return Result.success(empList);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**业务逻辑层**：处理具体的业务逻辑

业务接口

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//业务逻辑接口（制定业务标准）<br />
public interface EmpService {<br />
//获取员工列表<br />
public List&lt;Emp&gt; listEmp();<br />
}</td>
</tr>
</tbody>
</table>

业务实现类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//业务逻辑实现类（按照业务标准实现）<br />
public class EmpServiceA implements EmpService {<br />
//dao层对象<br />
private EmpDao empDao = new EmpDaoA();<br />
<br />
@Override<br />
public List&lt;Emp&gt; listEmp() {<br />
//1. 调用dao, 获取数据<br />
List&lt;Emp&gt; empList = empDao.listEmp();<br />
<br />
//2. 对数据进行转换处理 - gender, job<br />
empList.stream().forEach(emp -&gt; {<br />
... //和之前一样，赋值粘贴即可<br />
});<br />
return empList;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**数据访问层**：负责数据的访问操作，包含数据的增、删、改、查

数据访问接口

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//数据访问层接口（制定标准）<br />
public interface EmpDao {<br />
//获取员工列表数据<br />
public List&lt;Emp&gt; listEmp();<br />
}</td>
</tr>
</tbody>
</table>

数据访问实现类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//数据访问实现类<br />
public class EmpDaoA implements EmpDao {<br />
@Override<br />
public List&lt;Emp&gt; listEmp() {<br />
//1. 加载并解析emp.xml<br />
String file = this.getClass().getClassLoader().getResource("emp.xml").getFile();<br />
System.out.println(file);<br />
List&lt;Emp&gt; empList = XmlParserUtils.parse(file, Emp.class);<br />
return empList;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

<img src=".assets/JavaWeb-知识库笔记/media/image71.png" style="width:5.75in;height:2.70833in" />

**5.2 分层解耦**

**5.2.1 耦合问题**

内聚：软件中各个功能模块内部的功能联系

耦合：衡量软件中各个层/模块之间的依赖、关联的程度

**软件设计原则：高内聚低耦合。**

高内聚：一个模块中各个元素之间的联系的紧密程度，各个元素(语句、程序段)之间的联系程度越高，则内聚性越高

低耦合：软件中各个层、模块之间的依赖关联程序越低越好

高内聚、低耦合的目的是使程序模块的可重用性、移植性大大增强。

**5.2.2 解耦思路**

之前对象都是用new创建的，但是这样就使两层耦合了，例如：当service层的实现变了就需要修改controller层的代码。解决思路如下：

首先不能在EmpController中使用new对象，然后提供一个容器，容器中存储一些对象(例：EmpService对象)，controller程序从容器中获取EmpService类型的对象。

**控制反转**：简称IOC，对象的创建权由程序员主动创建转移到容器(由容器创建、管理对象)。这个容器称为：IOC容器或Spring容器

**依赖注入：** 简称DI，容器为应用程序提供运行时，所依赖的资源，称之为依赖注入

IOC容器中创建、管理的对象，称之为bean对象。

**5.3 IOC&DI**

**5.3.1 IOC&DI入门**

任务：完成Controller层、Service层、Dao层的代码解耦

第1步：删除Controller层、Service层中new对象的代码

第2步：Service层及Dao层的实现类，交给IOC容器管理

使用Spring提供的注解：**@Component** ，就可以实现类交给IOC容器管理

第3步：为Controller及Service注入运行时依赖的对象

使用Spring提供的注解：**@Autowired** ，就可以实现程序运行时IOC容器自动注入需要的依赖对象

<img src=".assets/JavaWeb-知识库笔记/media/image72.png" style="width:5.75in;height:1.11458in" />

**5.3.2 IOC详解**

**5.3.2.1 bean的声明**

Spring框架提供了@Component的衍生注解用来标识bean对象具体归属于哪一层：

@Controller （标注在控制层类上）

@Service （标注在业务层类上）

@Repository （标注在数据访问层类上）

|             |                      |                                                 |
|-------------|----------------------|-------------------------------------------------|
| 注解        | 说明                 | 位置                                            |
| @Controller | @Component的衍生注解 | 标注在控制器类上                                |
| @Service    | @Component的衍生注解 | 标注在业务类上                                  |
| @Repository | @Component的衍生注解 | 标注在数据访问类上（由于与mybatis整合，用的少） |
| @Component  | 声明bean的基础注解   | 不属于以上三类时，用此注解                      |

*@RestController = @Controller + @ResponseBody*

在IOC容器中，每一个Bean类都有一个属于自己的名字，可以通过注解的value属性指定bean的名字。如果没有指定，默认为类名首字母小写。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Repository(value = "empRepositoryA") //如果没有指定，默认empDaoA<br />
public class EmpDaoA implements EmpDao{...}</td>
</tr>
</tbody>
</table>

|                                                                        |
|------------------------------------------------------------------------|
| **注意**：在springboot集成web开发中，声明控制器bean只能用@Controller。 |

**5.3.2.2 组件扫描**

bean想要生效，需要被组件扫描。扫描注解@ComponentScan用来扫描组件，@ComponentScan注解虽然没有显式配置，但是实际上已经包含在了引导类声明注解 @SpringBootApplication 中，**默认扫描的范围是SpringBoot启动类所在包及其子包**。

要想扫描到SpringBoot启动类所在包及其子包之外的组件，有两种解决方案：

为SpringBoot启动类手动添加@ComponentScan注解，指定要扫描的包，例如@ComponentScan({"com.itheima","dao"}).

将所有需要扫描的包都放在引导类所在包com.itheima的子包下（推荐做法）

**5.3.3 DI详解**

@Autowired注解，默认是按照**类型**进行自动装配的（去IOC容器中找某个类型的对象，然后完成注入操作）

如果在IOC容器中存在多个相同类型的bean对象，会出现报错，解决方案如下：

方式一：使用@Primary注解：当存在多个相同类型的Bean注入时，加上@Primary注解，来确定默认的实现

<img src=".assets/JavaWeb-知识库笔记/media/image73.png" style="width:5.75in;height:1.5625in" />

方式二：使用@Qualifier注解：指定当前要注入的bean对象。 在@Qualifier的value属性中，指定注入的bean的名称

<img src=".assets/JavaWeb-知识库笔记/media/image74.png" style="width:5.75in;height:1.14583in" />

方式三：使用@Resource注解：是按照bean的名称进行注入。通过name属性指定要注入的bean的名称

<img src=".assets/JavaWeb-知识库笔记/media/image75.png" style="width:5.75in;height:0.95833in" />

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>@Autowird 与@Resource的区别：</p>
<p>@Autowired 是spring框架提供的注解，而@Resource是JDK提供的注解</p>
<p>@Autowired 默认是按照类型注入，而@Resource是按照名称注入</p></td>
</tr>
</tbody>
</table>

**十二、数据库开发-MySQL**

数据库：英文为 DataBase，简称DB，它是存储和管理数据的仓库。

数据库管理系统：简称DBMS，是操作和管理数据库的大型软件，通过这个软件可以操纵和管理数据库。

SQL：简称SQL，结构化查询语言，是操作关系型数据库的编程语言，定义了一套操作关系型数据库的统一标准。

三层架构中的数据连接层，就是用来从数据库中获取数据的。

**1.MySQL概述**

分为商业版本（收费，可以免费试用30天，提供技术支持）和社区版本（免费，但是不提供技术支持），本节使用社区版本（8.0.31）。

**1.1 安装**

**\[MySQL安装文档.pdf\]**

参考上面的MySQL安装文档。

**1.2 连接**

命令行使用mysql -u用户名 -p\[密码\] \[-h数据库服务器的IP地址 -P端口号\]命令就可以连接到MySQL服务器。

-h 参数不加，默认连接的是本地 127.0.0.1 的MySQL服务器

-P 参数不加，默认连接的端口号是 3306

**1.3 数据模型**

关系型数据库：简称RDBMS，建立在关系模型基础上，由多张相互连接的**二维表**组成的数据库，如MySQL、Oracle、SQLServer等。

非关系型数据库：不是由二维表组成的数据库，如Redis。

MySQL是关系型数据库，是基于二维表进行数据存储的，所有数据都存放在二维表中：

通过MySQL客户端连接数据库管理系统DBMS，然后通过DBMS操作数据库

使用MySQL客户端，向数据库管理系统发送一条SQL语句，由数据库管理系统根据SQL语句指令去操作数据库中的表结构及数据

一个数据库服务器中可以创建多个数据库，一个数据库中也可以包含多张表，而一张表中又可以包含多行记录

**1.4 SQL简介**

**1.4.1 SQL通用语法**

SQL语句可以单行或多行书写，以分号结尾

SQL语句可以使用空格或缩进来增强语句的可读性

不区分大小写

注释：

单行注释：-- 注释内容 或 \# 注释内容(MySQL特有)

多行注释： /\* 注释内容 \*/

**1.4.2 分类**

SQL语句根据其功能被分为四大类：DDL、DML、DQL、DCL

|          |                            |                                                        |
|----------|----------------------------|--------------------------------------------------------|
| **分类** | **全称**                   | **说明**                                               |
| DDL      | Data Definition Language   | 数据定义语言，用来定义数据库对象(数据库，表，字段)     |
| DML      | Data Manipulation Language | 数据操作语言，用来对数据库表中的数据进行增删改         |
| DQL      | Data Query Language        | 数据查询语言，用来查询数据库中表的记录                 |
| DCL      | Data Control Language      | 数据控制语言，用来创建数据库用户、控制数据库的访问权限 |

**2.数据库设计-DDL**

**2.1 项目开发流程**

<img src=".assets/JavaWeb-知识库笔记/media/image76.png" style="width:5.75in;height:2.59375in" />

数据库设计阶段

参照产品经理提供的页面原型和需求文档设计数据库表结构

数据库操作阶段

根据业务功能的实现，编写SQL语句对数据表中的数据进行增删改查操作

数据库优化阶段

通过数据库的优化来提高数据库的访问性能。优化手段：索引、SQL优化、分库分表等

**2.2 数据库操作**

DDL中数据库的常见操作：查询、创建、使用、删除。

**2.2.1 查询数据库**

查询所有数据库：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
show databases;</td>
</tr>
</tbody>
</table>

查询当前数据库：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select database();</td>
</tr>
</tbody>
</table>

**2.2.2 创建数据库**

语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
create database [ if not exists ] 数据库名;</td>
</tr>
</tbody>
</table>

在同一个数据库服务器中，不能创建两个名称相同的数据库，否则将会报错，可以使用if not exists来避免这个问题。

**2.2.3 使用数据库**

语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
use 数据库名;</td>
</tr>
</tbody>
</table>

**2.2.4 删除数据库**

语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
drop database [ if exists ] 数据库名 ;</td>
</tr>
</tbody>
</table>

如果删除一个不存在的数据库，将会报错，可以使用if exists来避免这个问题。

|                                                      |
|------------------------------------------------------|
| **注**：上述所有语法中的database，也可以替换成schema |

**2.3 图形化工具**

DataGrip是JetBrains旗下的一款数据库管理工具，是管理和开发MySQL、Oracle、PostgreSQL的理想解决方案。

**2.3.1 安装**

**\[DataGrip安装手册.pdf\]**

参考上面的DataGrip安装手册。

**2.3.2 使用**

1、打开IDEA自带的Database

<img src=".assets/JavaWeb-知识库笔记/media/image77.png" style="width:5.75in;height:1.34375in" />

2、配置MySQL

<img src=".assets/JavaWeb-知识库笔记/media/image78.png" style="width:5.75in;height:2.375in" />

3、输入相关信息并下载MySQL连接驱动

<img src=".assets/JavaWeb-知识库笔记/media/image79.png" style="width:5.75in;height:3.60417in" />

4、测试数据库连接：点击Text Connection即可

5、点击OK创建连接成功

**2.4 表操作**

关于表结构的操作也是包含四个部分：创建表、查询表、修改表、删除表。

**2.4.1 创建**

**2.4.1.1 语法**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
create table 表名(<br />
字段1 字段1类型 [约束] [comment 字段1注释 ],<br />
字段2 字段2类型 [约束] [comment 字段2注释 ],<br />
......<br />
字段n 字段n类型 [约束] [comment 字段n注释 ]<br />
) [ comment 表注释 ] ;</td>
</tr>
</tbody>
</table>

**2.4.1.2 约束**

约束就是作用在表中字段上的规则，用于限制存储在表中的数据，从而保证数据库当中数据的正确性、有效性和完整性。

|          |                                                  |             |
|----------|--------------------------------------------------|-------------|
| **约束** | **描述**                                         | **关键字**  |
| 非空约束 | 限制该字段值不能为null                           | not null    |
| 唯一约束 | 保证字段的所有数据都是唯一、不重复的             | unique      |
| 主键约束 | 主键是一行数据的唯一标识，要求非空且唯一         | primary key |
| 默认约束 | 保存数据时，如果未指定该字段值，则采用默认值     | default     |
| 外键约束 | 让两张表的数据建立连接，保证数据的一致性和完整性 | foreign key |

|                                                                          |
|--------------------------------------------------------------------------|
| **注意**：约束是作用于表中字段上的，可以在创建表或修改表的时候添加约束。 |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
create table tb_user (<br />
id int primary key auto_increment comment 'ID,唯一标识', #主键自动增长<br />
username varchar(20) not null unique comment '用户名',<br />
name varchar(10) not null comment '姓名',<br />
age int comment '年龄',<br />
gender char(1) default '男' comment '性别'<br />
) comment '用户表';</td>
</tr>
</tbody>
</table>

主键自增：**auto_increment**

每次插入新的行记录时，数据库自动生成id字段(主键)下的值

具有auto_increment的数据列是一个正数序列开始增长(从1开始自增)

**2.4.1.3 数据类型**

MySQL中的数据类型有很多，主要分为三类：数值类型、字符串类型、日期时间类型。

**数值类型**

|             |        |                                                       |                                                           |                    |
|-------------|--------|-------------------------------------------------------|-----------------------------------------------------------|--------------------|
| 类型        | 大小   | 有符号(SIGNED)范围                                    | 无符号(UNSIGNED)范围                                      | 描述               |
| TINYINT     | 1byte  | (-128，127)                                           | (0，255)                                                  | 小整数值           |
| SMALLINT    | 2bytes | (-32768，32767)                                       | (0，65535)                                                | 大整数值           |
| MEDIUMINT   | 3bytes | (-8388608，8388607)                                   | (0，16777215)                                             | 大整数值           |
| INT/INTEGER | 4bytes | (-2147483648，2147483647)                             | (0，4294967295)                                           | 大整数值           |
| BIGINT      | 8bytes | (-2^63，2^63-1)                                       | (0，2^64-1)                                               | 极大整数值         |
| FLOAT       | 4bytes | (-3.402823466 E+38，3.402823466351 E+38)              | 0 和 (1.175494351 E-38，3.402823466 E+38)                 | 单精度浮点数值     |
| DOUBLE      | 8bytes | (-1.7976931348623157 E+308，1.7976931348623157 E+308) | 0 和 (2.2250738585072014 E-308，1.7976931348623157 E+308) | 双精度浮点数值     |
| DECIMAL     | \-     | 依赖于M(精度)和D(标度)的值                            | 依赖于M(精度)和D(标度)的值                                | 小数值(精确定点数) |

**字符串类型**

|            |                       |                              |
|------------|-----------------------|------------------------------|
| 类型       | 大小                  | 描述                         |
| CHAR       | 0-255 bytes           | 定长字符串(需要指定长度)     |
| VARCHAR    | 0-65535 bytes         | 变长字符串(需要指定长度)     |
| TINYBLOB   | 0-255 bytes           | 不超过255个字符的二进制数据  |
| TINYTEXT   | 0-255 bytes           | 短文本字符串                 |
| BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据       |
| TEXT       | 0-65 535 bytes        | 长文本数据                   |
| MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据 |
| MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据             |
| LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据     |
| LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                 |

char是定长字符串，指定长度多长，就占用多少个字符。而varchar是变长字符串，指定的长度为最大占用长度 。char的性能更高。

**日期时间类型**

|           |      |                                            |                     |                          |
|-----------|------|--------------------------------------------|---------------------|--------------------------|
| 类型      | 大小 | 范围                                       | 格式                | 描述                     |
| DATE      | 3    | 1000-01-01 至 9999-12-31                   | YYYY-MM-DD          | 日期值                   |
| TIME      | 3    | -838:59:59 至 838:59:59                    | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1    | 1901 至 2155                               | YYYY                | 年份值                   |
| DATETIME  | 8    | 1000-01-01 00:00:00 至 9999-12-31 23:59:59 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| TIMESTAMP | 4    | 1970-01-01 00:00:01 至 2038-01-19 03:14:07 | YYYY-MM-DD HH:MM:SS | 混合日期和时间值，时间戳 |

**2.4.2 查询**

查询当前数据库所有表：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
show tables;</td>
</tr>
</tbody>
</table>

查看指定表结构：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
desc 表名; -- 可以查看指定表的字段、字段的类型、是否可以为NULL、是否存在默认值等信息</td>
</tr>
</tbody>
</table>

查询指定表的建表语句：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
show create table 表名;</td>
</tr>
</tbody>
</table>

**2.4.3 修改**

添加字段：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
alter table 表名 add 字段名 类型(长度) [comment 注释] [约束];</td>
</tr>
</tbody>
</table>

修改数据类型：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
alter table 表名 modify 字段名 新数据类型(长度);<br />
<br />
alter table 表名 change 旧字段名 新字段名 类型(长度) [comment 注释] [约束];</td>
</tr>
</tbody>
</table>

删除字段：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
alter table 表名 drop 字段名;</td>
</tr>
</tbody>
</table>

修改表名：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
rename table 表名 to 新表名;</td>
</tr>
</tbody>
</table>

**2.4.4 删除**

删除表语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
drop table [ if exists ] 表名;</td>
</tr>
</tbody>
</table>

**3.数据库操作-DML**

**3.1 增加(insert)**

向指定字段添加数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
insert into 表名 (字段名1, 字段名2) values (值1, 值2);</td>
</tr>
</tbody>
</table>

全部字段添加数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
insert into 表名 values (值1, 值2, ...);</td>
</tr>
</tbody>
</table>

批量添加数据（指定字段）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
insert into 表名 (字段名1, 字段名2) values (值1, 值2), (值1, 值2);</td>
</tr>
</tbody>
</table>

批量添加数据（全部字段）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
insert into 表名 values (值1, 值2, ...), (值1, 值2, ...);</td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Insert操作的注意事项</strong>：</p>
<p>插入数据时，指定的字段顺序需要与值的顺序是一一对应的</p>
<p>字符串和日期型数据应该包含在引号中</p>
<p>插入的数据大小，应该在字段的规定范围内</p></td>
</tr>
</tbody>
</table>

**3.2 修改(update)**

update语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
update 表名 set 字段名1 = 值1 , 字段名2 = 值2 , .... [where 条件] ;</td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意事项</strong>:</p>
<p>修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据</p>
<p>在修改数据时，一般需要同时修改公共字段update_time，将其修改为当前操作时间</p></td>
</tr>
</tbody>
</table>

**3.3 删除(delete)**

delete语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
delete from 表名 [where 条件] ;</td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意事项</strong>:</p>
<p>DELETE 语句的条件可以有，也可以没有，<strong>如果没有条件，则会删除整张表的所有数据</strong></p>
<p>DELETE 语句不能删除某一个字段的值(可以使用UPDATE，将该字段值置为NULL即可)</p>
<p>当进行删除全部数据操作时，会提示询问是否确认删除所有数据，直接点击Execute即可</p></td>
</tr>
</tbody>
</table>

**4.数据库操作-DQL**

查询操作是所有SQL语句当中最为常见、最为重要的操作。在一个正常的业务系统中，查询操作的使用频次远高于增删改操作。

**4.1 语法**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
SELECT<br />
字段列表<br />
FROM<br />
表名列表<br />
WHERE<br />
条件列表<br />
GROUP BY<br />
分组字段列表<br />
HAVING<br />
分组后条件列表<br />
ORDER BY<br />
排序字段列表<br />
LIMIT<br />
分页参数</td>
</tr>
</tbody>
</table>

**4.2 基本查询**

在基本查询的DQL语句中，不带任何的查询条件。

查询多个字段：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段1, 字段2, 字段3 from 表名;</td>
</tr>
</tbody>
</table>

查询所有字段（通配符）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select * from 表名;</td>
</tr>
</tbody>
</table>

设置别名：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段1 [ as 别名1 ] , 字段2 [ as 别名2 ] from 表名;</td>
</tr>
</tbody>
</table>

去除重复记录：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select distinct 字段列表 from 表名;</td>
</tr>
</tbody>
</table>

**4.3 条件查询**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段列表 from 表名 where 条件列表 ; -- 条件列表：意味着可以有多个条件</td>
</tr>
</tbody>
</table>

在SQL语句当中构造条件的运算符分为两类：

比较运算符

逻辑运算符

比较运算符：

|                     |                                           |
|---------------------|-------------------------------------------|
| 比较运算符          | 功能                                      |
| \>                  | 大于                                      |
| \>=                 | 大于等于                                  |
| \<                  | 小于                                      |
| \<=                 | 小于等于                                  |
| =                   | 等于                                      |
| \<\> 或 !=          | 不等于                                    |
| between ... and ... | 在某个范围之内(含最小、最大值)            |
| in(...)             | 在in之后的列表中的值，多选一              |
| like 占位符         | 模糊匹配(\_匹配单个字符, %匹配任意个字符) |
| is null             | 是null                                    |

逻辑运算符：

|            |                             |
|------------|-----------------------------|
| 逻辑运算符 | 功能                        |
| and 或 &&  | 并且 (多个条件同时成立)     |
| or 或 \|\| | 或者 (多个条件任意一个成立) |
| not 或 !   | 非 , 不是                   |

**4.4 聚合函数**

语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 聚合函数(字段列表) from 表名 ;</td>
</tr>
</tbody>
</table>

*聚合函数会忽略空值，对NULL值不作为统计。*

常用聚合函数：

|       |          |
|-------|----------|
| 函数  | 功能     |
| count | 统计数量 |
| max   | 最大值   |
| min   | 最小值   |
| avg   | 平均值   |
| sum   | 求和     |

*count ：按照列去统计有多少行数据。*

在根据指定的列统计的时候，如果这一列中有null的行，该行不会被统计在其中。

sum ：计算指定列的数值和，如果不是数值类型，那么计算结果为0

max ：计算指定列的最大值

min ：计算指定列的最小值

avg ：计算指定列的平均值

**4.5 分组查询**

分组： 按照某一列或者某几列，把相同的数据进行合并输出。

*分组其实就是按列进行分类(指定列下相同的数据归为一类)，然后可以对分类完的数据进行合并计算。*

*分组查询通常会使用聚合函数进行计算。*

语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段列表 from 表名 [where 条件] group by 分组字段名 [having 分组后过滤条件];</td>
</tr>
</tbody>
</table>

**注意事项**:

分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义

执行顺序：where \> 聚合函数 \> having

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>where与having区别（面试题）</strong></p>
<p>执行时机不同：where是分组之前进行过滤，不满足where条件，不参与分组；而having是分组之后对结果进行过滤</p>
<p>判断条件不同：where不能对聚合函数进行判断，而having可以</p></td>
</tr>
</tbody>
</table>

**4.6 排序查询**

语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段列表<br />
from 表名<br />
[where 条件列表]<br />
[group by 分组字段 ]<br />
order by 字段1 排序方式1 , 字段2 排序方式2 … ;</td>
</tr>
</tbody>
</table>

排序方式：

ASC ：升序（默认值）

DESC：降序

如果是升序, 可以不指定排序方式ASC。

如果是多字段排序，当第一个字段值相同时，才会根据第二个字段进行排序。

**4.7 分页查询**

分页查询语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段列表 from 表名 limit 起始索引, 查询记录数 ;</td>
</tr>
</tbody>
</table>

起始索引从0开始。 计算公式：起始索引 = （查询页码 - 1）\* 每页显示记录数

分页查询是数据库的方言，不同的数据库有不同的实现，MySQL中是LIMIT

如果查询的是第一页数据，起始索引可以省略，直接简写为 limit 条数

**5.多表设计**

实际项目开发中，由于业务之间相互关联，所以各个表结构之间也存在着各种联系，基本上分为三种：

一对多(多对一)

多对多

一对一

**5.1 一对多**

**实现**：在数据库表中多的一方，添加字段，来关联属于一这方的主键。

外键约束：让两张表的数据建立连接，保证数据的一致性和完整性。

对应的关键字：foreign key

外键约束的语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
-- 创建表时指定<br />
create table 表名(<br />
字段名 数据类型,<br />
...<br />
[constraint] [外键名称] foreign key (外键字段名) references 主表 (主表列名)<br />
);<br />
<br />
<br />
-- 建完表后，添加外键<br />
alter table 表名 add constraint 外键名称 foreign key(外键字段名) references 主表(主表列名);</td>
</tr>
</tbody>
</table>

当我们添加外键约束时，需要保证当前数据库表中的数据是完整的。

物理外键

概念：使用foreign key定义外键关联另外一张表

缺点：

影响增、删、改的效率（需要检查外键关系）

仅用于单节点数据库，不适用于分布式、集群场景

容易引发数据库的死锁问题，消耗性能

逻辑外键

概念：在业务层逻辑中，解决外键关联

实现：通过**应用程序逻辑**或**代码层面的设计**来维护表之间的关联关系，从而模拟外键的关联性，不会依赖数据库的物理约束

通过逻辑外键，就可以很方便的解决上述问题

|                                                                                                                              |
|------------------------------------------------------------------------------------------------------------------------------|
| 在现在的企业开发中，很少会使用物理外键，都是使用逻辑外键，甚至在一些数据库开发规范中，会明确指出禁止使用物理外键 foreign key |

**5.2 一对一**

一对一关系通常是用来做单表的拆分，也就是将一张大表拆分成两张小表，将大表中的一些基础字段放在一张表当中，将其他的字段放在另外一张表当中，以此来提高数据的操作效率。

**实现**：在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的(UNIQUE)

**5.3 多对多**

多对多的关系在开发中比较常见。比如：学生和老师的关系，一个学生可以有多个授课老师，一个授课老师也可以有多个学生。

**实现**：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键。

**6.多表查询**

**6.1 概述**

多表查询：查询时从多张表中获取所需数据

*单表查询的SQL语句：select 字段列表 from 表名;*

*那么要执行多表查询，只需要使用逗号分隔多张表即可，如：select 字段列表 from 表1, 表2;*

例如，查询用户表和部门表中的数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select * from tb_emp , tb_dept;</td>
</tr>
</tbody>
</table>

笛卡尔积：笛卡尔乘积是指在数学中，两个集合(A集合和B集合)的所有组合情况。

<img src=".assets/JavaWeb-知识库笔记/media/image80.png" style="width:5.75in;height:2.35417in" />

在多表查询时，需要消除无效的笛卡尔积，只保留表关联部分的数据，只需要给多表查询加上连接查询的条件即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select * from tb_emp , tb_dept where tb_emp.dept_id = tb_dept.id ;</td>
</tr>
</tbody>
</table>

**分类**

多表查询可以分为：

连接查询

内连接：相当于查询A、B交集部分数据

<img src=".assets/JavaWeb-知识库笔记/media/image81.png" style="width:5.75in;height:1.67708in" />

外连接

左外连接：查询左表所有数据(包括两张表交集部分数据)

右外连接：查询右表所有数据(包括两张表交集部分数据)

子查询

**6.2 内连接**

内连接查询：查询两表或多表中交集部分数据。

内连接从语法上可以分为：

隐式内连接

显式内连接

隐式内连接语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段列表 from 表1 , 表2 where 条件 ... ;</td>
</tr>
</tbody>
</table>

显式内连接语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段列表 from 表1 [ inner ] join 表2 on 连接条件 ... ;</td>
</tr>
</tbody>
</table>

*一旦为表起了别名，就不能再使用表名来指定对应的字段了，此时只能够使用别名来指定字段。*

**6.3 外连接**

外连接分为两种：左外连接 和 右外连接。

左外连接语法结构：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段列表 from 表1 left [ outer ] join 表2 on 连接条件 ... ;</td>
</tr>
</tbody>
</table>

*左外连接相当于查询表1(左表)的所有数据，当然也包含表1和表2交集部分的数据。*

右外连接语法结构：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select 字段列表 from 表1 right [ outer ] join 表2 on 连接条件 ... ;</td>
</tr>
</tbody>
</table>

*右外连接相当于查询表2(右表)的所有数据，当然也包含表1和表2交集部分的数据。*

*左外连接和右外连接可以相互替换，只需要调整连接查询SQL语句中表的先后顺序就行了。在日常开发使用时，更偏向于左外连接。*

**6.4 子查询**

SQL语句中嵌套select语句，称为嵌套查询，又称子查询。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
SELECT * FROM t1 WHERE column1 = ( SELECT column1 FROM t2 ... );</td>
</tr>
</tbody>
</table>

*子查询外部的语句可以是insert / update / delete / select 的任何一个，最常见的是 select。*

根据子查询结果的不同分为：

标量子查询（子查询结果为单个值\[一行一列\]）

列子查询（子查询结果为一列，但可以是多行）

行子查询（子查询结果为一行，但可以是多列）

表子查询（子查询结果为多行多列\[相当于子查询结果是一张表\]）

子查询可以书写的位置：

where之后

from之后

select之后

**6.4.1 标量子查询**

常用的操作符： = \<\> \> \>= \< \<=

**6.4.2 列子查询**

常用的操作符：

|        |                              |
|--------|------------------------------|
| 操作符 | 描述                         |
| IN     | 在指定的集合范围之内，多选一 |
| NOT IN | 不在指定的集合范围之内       |

**6.4.3 行子查询**

常用的操作符：= 、\<\> 、IN 、NOT IN

**6.4.4 表子查询**

子查询返回的结果是多行多列，常作为临时表，这种子查询称为表子查询。

**7.事务**

事务是一组操作的集合，它是一个不可分割的工作单位。事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

事务作用：保证在一个事务中多次操作数据库表中数据时，要么全都成功,要么全都失败。

**7.1 操作**

MYSQL中有两种方式进行事务的操作：

自动提交事务：即执行一条sql语句提交一次事务（默认MySQL的事务是自动提交）

手动提交事务：先开启，再提交

事务操作有关的SQL语句：

|                               |                  |
|-------------------------------|------------------|
| SQL语句                       | 描述             |
| start transaction; \| begin ; | 开启手动控制事务 |
| commit;                       | 提交事务         |
| rollback;                     | 回滚事务         |

手动提交事务使用步骤：

第1种情况：开启事务 =\> 执行SQL语句 =\> 成功 =\> 提交事务

第2种情况：开启事务 =\> 执行SQL语句 =\> 失败 =\> 回滚事务

**7.2 四大特性**

原子性（Atomicity）：事务是不可分割的最小单元，要么全部成功，要么全部失败

一致性（Consistency）：事务完成时，必须使所有的数据都保持一致状态

隔离性（Isolation）：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行

持久性（Durability）：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的

*事务的四大特性简称为：ACID*

**8.索引**

索引(index)：是帮助数据库高效获取数据的数据结构，使用索引可以提高查询的效率。

优点：

提高数据查询的效率，降低数据库的IO成本

通过索引列对数据进行排序，降低数据排序的成本，降低CPU消耗

缺点：

索引会占用存储空间

索引大大提高了查询效率，同时却也降低了insert、update、delete的效率

**语法**

创建索引

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
create [ unique ] index 索引名 on 表名 (字段名,... ) ;</td>
</tr>
</tbody>
</table>

查看索引

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
show index from 表名;</td>
</tr>
</tbody>
</table>

删除索引

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
drop index 索引名 on 表名;</td>
</tr>
</tbody>
</table>

**注意事项**：

主键字段，在建表时，会自动创建主键索引

添加唯一约束时，数据库实际上会添加唯一索引

**十三、Mybatis**

MyBatis是一款优秀的 **持久层** **框架**，用于简化JDBC的开发。

持久层：指的是就是数据访问层(dao)，是用来操作数据库的

框架：是一个半成品软件，是一套可重用的、通用的、软件基础代码模型

**1.快速入门**

**1.1 准备工作**

**创建springboot工程**：创建springboot工程，并导入 mybatis的起步依赖、MySQL的驱动包。

<img src=".assets/JavaWeb-知识库笔记/media/image82.png" style="width:5.75in;height:4.69792in" />

<img src=".assets/JavaWeb-知识库笔记/media/image83.png" style="width:5.75in;height:6.92708in" />

项目工程创建完成后，会自动在pom.xml文件中，导入Mybatis依赖和MySQL驱动依赖

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- mybatis起步依赖 --&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.mybatis.spring.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;mybatis-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;2.3.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
<br />
&lt;!-- mysql驱动包依赖 --&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.mysql&lt;/groupId&gt;<br />
&lt;artifactId&gt;mysql-connector-j&lt;/artifactId&gt;<br />
&lt;scope&gt;runtime&lt;/scope&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**数据准备**：创建用户表user，并创建对应的实体类com.itheima.pojo.User。

用户表

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
-- 用户表<br />
create table user(<br />
id int unsigned primary key auto_increment comment 'ID',<br />
name varchar(100) comment '姓名',<br />
age tinyint unsigned comment '年龄',<br />
gender tinyint unsigned comment '性别, 1:男, 2:女',<br />
phone varchar(11) comment '手机号'<br />
) comment '用户表';<br />
-- 插入测试数据省略</td>
</tr>
</tbody>
</table>

实体类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class User {<br />
private Integer id; //id（主键）<br />
private String name; //姓名<br />
private Short age; //年龄<br />
private Short gender; //性别<br />
private String phone; //手机号<br />
<br />
//省略GET, SET方法<br />
}</td>
</tr>
</tbody>
</table>

属性名与表中的字段名一一对应。

**1.2 配置Mybatis**

<img src=".assets/JavaWeb-知识库笔记/media/image84.png" style="width:5.75in;height:3.64583in" />

从上图可以看出连接数据库的四大参数：

MySQL驱动类

登录名

密码

数据库连接字符串

在springboot项目中，编写application.properties文件，配置数据库连接信息driver-class-name、url 、username和password：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
#驱动类名称<br />
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver<br />
#数据库连接的url<br />
spring.datasource.url=jdbc:mysql://localhost:3306/mybatis<br />
#连接数据库的用户名<br />
spring.datasource.username=root<br />
#连接数据库的密码<br />
spring.datasource.password=123456</td>
</tr>
</tbody>
</table>

**1.3 编写SQL语句**

在创建出来的springboot工程中，在引导类所在包下，在创建一个包 mapper。在mapper包下创建一个接口 UserMapper ，这是一个持久层接口（Mybatis的持久层接口规范一般都叫 XxxMapper）。

<img src=".assets/JavaWeb-知识库笔记/media/image85.png" style="width:5.75in;height:1.91667in" />

UserMapper：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
import com.itheima.pojo.User;<br />
import org.apache.ibatis.annotations.Mapper;<br />
import org.apache.ibatis.annotations.Select;<br />
import java.util.List;<br />
<br />
@Mapper<br />
public interface UserMapper {<br />
<br />
//查询所有用户数据<br />
@Select("select id, name, age, gender, phone from user")<br />
public List&lt;User&gt; list();<br />
<br />
}</td>
</tr>
</tbody>
</table>

@Mapper注解：表示是mybatis中的Mapper接口

程序运行时：框架会自动生成接口的实现类对象(代理对象)，并给交Spring的IOC容器管理

@Select注解：代表的就是select查询，用于书写select查询语句

**1.4 单元测试**

在创建出来的SpringBoot工程中，在src下的test目录下，已经自动帮我们创建好了测试类 ，并且在测试类上已经添加了注解 @SpringBootTest，代表该测试类已经与SpringBoot整合。

该测试类在运行时，会自动通过引导类加载Spring的环境（IOC容器）。我们要测试那个bean对象，就可以直接通过@Autowired注解直接将其注入进行，然后就可以测试了。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@SpringBootTest<br />
public class MybatisQuickstartApplicationTests {<br />
<br />
@Autowired<br />
private UserMapper userMapper;<br />
<br />
@Test<br />
public void testList(){<br />
List&lt;User&gt; userList = userMapper.list();<br />
for (User user : userList) {<br />
System.out.println(user);<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**1.5 解决SQL警告与提示**

如果想让idea给我们提示对应的SQL语句，我们需要在IDEA中配置与MySQL数据库的链接。

<img src=".assets/JavaWeb-知识库笔记/media/image86.png" style="width:5.75in;height:1.78125in" />

如果idea不识别表名，就需要建立连接。

**2.JDBC介绍(了解)**

java语言操作数据库只能通过sun公司提供的 JDBC 规范。Mybatis框架，就是对原始的JDBC程序的封装。

<img src=".assets/JavaWeb-知识库笔记/media/image87.png" style="width:5.75in;height:3.32292in" />

本质：

sun公司官方定义的一套操作所有关系型数据库的规范，即接口

各个数据库厂商去实现这套接口，提供数据库驱动jar包

我们可以使用这套接口(JDBC)编程，真正执行的代码是驱动jar包中的实现类

**2.1 代码**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
... //导包省略<br />
public class JdbcTest {<br />
@Test<br />
public void testJdbc() throws Exception {<br />
//1. 注册驱动<br />
Class.forName("com.mysql.cj.jdbc.Driver");<br />
<br />
//2. 获取数据库连接<br />
String url="jdbc:mysql://127.0.0.1:3306/mybatis";<br />
String username = "root";<br />
String password = "1234";<br />
Connection connection = DriverManager.getConnection(url, username, password);<br />
<br />
//3. 执行SQL<br />
Statement statement = connection.createStatement(); //操作SQL的对象<br />
String sql="select id,name,age,gender,phone from user";<br />
ResultSet rs = statement.executeQuery(sql);//SQL查询结果会封装在ResultSet对象中<br />
<br />
List&lt;User&gt; userList = new ArrayList&lt;&gt;();//集合对象（用于存储User对象）<br />
//4. 处理SQL执行结果<br />
while (rs.next()){<br />
//取出一行记录中id、name、age、gender、phone下的数据<br />
int id = rs.getInt("id");<br />
String name = rs.getString("name");<br />
short age = rs.getShort("age");<br />
short gender = rs.getShort("gender");<br />
String phone = rs.getString("phone");<br />
//把一行记录中的数据，封装到User对象中<br />
User user = new User(id,name,age,gender,phone);<br />
userList.add(user);//User对象添加到集合<br />
}<br />
//5. 释放资源<br />
statement.close();<br />
connection.close();<br />
rs.close();<br />
<br />
//遍历集合<br />
for (User user : userList) {<br />
System.out.println(user);<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

DriverManager(类)：数据库驱动管理类。

作用：

注册驱动

创建java代码和数据库之间的连接，即获取Connection对象

Connection(接口)：建立数据库连接的对象

作用：用于建立java程序和数据库之间的连接

Statement(接口)： 数据库操作对象(执行SQL语句的对象)。

作用：用于向数据库发送sql语句

ResultSet(接口)：结果集对象（一张虚拟表）

作用：SQL查询语句的执行结果会封装在ResultSet中

**2.2 问题分析和对比**

JDBC操作数据库把四要素(驱动、链接、用户名、密码)硬性写在java程序中，查询解析非常繁琐，每次都要重新建立和释放资源，导致资源浪费，性能降低。

而JDBC把四要素(驱动、链接、用户名、密码)配置在配置文件 application.properties中，便于修改，查询结果的解析和封装自动映射，不必关注具体的实现，通过**数据库连接池**技术，避免了频繁创建销毁连接而带来的资源浪费。

对于Mybatis，在操作数据库时，重点关注两个方面：配置文件application.properties和Mapper接口，大大节省开发压力。

**3.数据库连接池**

数据库连接池是一个容器，负责分配、管理数据库连接，程序启动时，会自动创建一些Connection连接对象放在连接池中。

用户使用SQL时，只需要从连接池中获取一个Connection对象，用完归还。

如果Connection对象的空闲时间 \> 连接池中预设的最大空闲时间，此时数据库连接池就会自动收回这个连接对象

**产品**：

官方(sun)提供了数据库连接池标准（javax.sql.DataSource接口）

功能：获取连接

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public Connection getConnection() throws SQLException;</td>
</tr>
</tbody>
</table>

第三方组织必须按照DataSource接口实现

常见的数据库连接池：

C3P0

DBCP

Druid（德鲁伊）

Hikari (追光者，springboot默认，间接依赖于mybatis-spring-boot-starter)

Druid（德鲁伊）：阿里巴巴开源的数据库连接池项目，功能强大，性能优秀，是Java语言最好的数据库连接池之一。

把默认的数据库连接池Hikari切换为Druid数据库连接池的步骤：

在pom.xml文件中引入依赖

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;!-- Druid连接池依赖 --&gt;<br />
&lt;groupId&gt;com.alibaba&lt;/groupId&gt;<br />
&lt;artifactId&gt;druid-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;1.2.8&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

在application.properties中引入数据库连接配置

方式1：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
spring.datasource.druid.driver-class-name=com.mysql.cj.jdbc.Driver<br />
spring.datasource.druid.url=jdbc:mysql://localhost:3306/mybatis<br />
spring.datasource.druid.username=root<br />
spring.datasource.druid.password=1234</td>
</tr>
</tbody>
</table>

方式2：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver<br />
spring.datasource.url=jdbc:mysql://localhost:3306/mybatis<br />
spring.datasource.username=root<br />
spring.datasource.password=1234</td>
</tr>
</tbody>
</table>

**4.lombok**

Lombok是一个实用的Java类库，可以通过简单的注解来简化和消除一些必须有但显得很臃肿的Java代码。

|                         |                                                                                  |
|-------------------------|----------------------------------------------------------------------------------|
| 注解                    | 作用                                                                             |
| @Getter/@Setter         | 为所有的属性提供get/set方法                                                      |
| @ToString               | 会给类自动生成易阅读的 toString 方法                                             |
| @EqualsAndHashCode      | 根据类所拥有的非静态字段自动重写 equals 方法和 hashCode 方法                     |
| **@Data**               | 提供了更综合的生成代码功能（@Getter + @Setter + @ToString + @EqualsAndHashCode） |
| **@NoArgsConstructor**  | 为实体类生成无参的构造器方法                                                     |
| **@AllArgsConstructor** | 为实体类生成除了static修饰的字段之外带有各参数的构造器方法。                     |

**使用**：

第1步：在pom.xml文件中引入依赖

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- 在springboot的父工程中，已经集成了lombok并指定了版本号，故当前引入依赖时不需要指定version --&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.projectlombok&lt;/groupId&gt;<br />
&lt;artifactId&gt;lombok&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

第2步：在实体类上添加注解

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Data<br />
@NoArgsConstructor<br />
@AllArgsConstructor<br />
public class User {<br />
private Integer id;<br />
private String name;<br />
private Short age;<br />
private Short gender;<br />
private String phone;<br />
}</td>
</tr>
</tbody>
</table>

*在实体类上添加了@Data注解，那么这个类在编译时期，就会生成getter/setter、equals、hashcode、toString等方法。*

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Lombok的注意事项</strong>：</p>
<p>Lombok会在编译时，会自动生成对应的java代码</p>
<p>在使用lombok时，还<strong>需要安装一个lombok的插件</strong>（新版本的IDEA中自带）</p></td>
</tr>
</tbody>
</table>

**5.Mybatis基础操作**

**5.1 准备**

准备数据库表：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
-- 部门管理<br />
create table dept<br />
(<br />
id int unsigned primary key auto_increment comment '主键ID',<br />
name varchar(10) not null unique comment '部门名称',<br />
create_time datetime not null comment '创建时间',<br />
update_time datetime not null comment '修改时间'<br />
) comment '部门表';<br />
<br />
-- 部门表测试数据<br />
...<br />
-- 员工管理<br />
create table emp<br />
(<br />
id int unsigned primary key auto_increment comment 'ID',<br />
username varchar(20) not null unique comment '用户名',<br />
password varchar(32) default '123456' comment '密码',<br />
name varchar(10) not null comment '姓名',<br />
gender tinyint unsigned not null comment '性别, 说明: 1 男, 2 女',<br />
image varchar(300) comment '图像',<br />
job tinyint unsigned comment '职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师',<br />
entrydate date comment '入职时间',<br />
dept_id int unsigned comment '部门ID',<br />
create_time datetime not null comment '创建时间',<br />
update_time datetime not null comment '修改时间'<br />
) comment '员工表';<br />
-- 员工表测试数据<br />
...</td>
</tr>
</tbody>
</table>

创建一个新的springboot工程，选择引入对应的起步依赖（mybatis、mysql驱动、lombok）

application.properties中引入数据库连接信息

创建对应的实体类Emp（实体类属性采用驼峰命名）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Data<br />
@NoArgsConstructor<br />
@AllArgsConstructor<br />
public class Emp {<br />
private Integer id;<br />
private String username;<br />
private String password;<br />
private String name;<br />
private Short gender;<br />
private String image;<br />
private Short job;<br />
private LocalDate entrydate; //LocalDate类型对应数据表中的date类型<br />
private Integer deptId;<br />
private LocalDateTime createTime;//LocalDateTime类型对应数据表中的datetime类型<br />
private LocalDateTime updateTime;<br />
}</td>
</tr>
</tbody>
</table>

准备Mapper接口：EmpMapper

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
}</td>
</tr>
</tbody>
</table>

<img src=".assets/JavaWeb-知识库笔记/media/image88.png" style="width:5.75in;height:2.82292in" />

**5.2 删除**

根据主键删除数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
//使用#{key}方式获取方法中的参数值，将来形参id会替换参数占位符#{id}<br />
@Delete("delete from emp where id = #{id}")<br />
public void delete(Integer id); //可以指定返回值为int型，表示delete删除的行数<br />
<br />
}</td>
</tr>
</tbody>
</table>

*@Delete注解：用于编写delete操作的SQL语句*

*如果mapper接口方法形参只有一个普通类型的参数，#{…} 里面的属性名可以随便写，如：#{id}、#{value}。但是建议保持名字一致。*

**5.3 日志输入**

在Mybatis中可以借助日志，查看到sql语句的执行、执行传递的参数以及执行结果：

在application.properties文件中开启mybatis的日志，并指定输出到控制台

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
#指定mybatis输出日志的位置, 输出控制台<br />
mybatis.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl</td>
</tr>
</tbody>
</table>

**5.4 预编译SQL**

**5.4.1 优势**

预编译SQL有两个优势：

性能更高：将编译后的SQL语句缓存起来，后面再次执行这条语句时，不会再次编译（只是输入的参数不同）

更安全(防止SQL注入)：将敏感字进行转义，保障SQL的安全性

**5.4.2 SQL注入**

通过操作输入的数据来修改事先定义好的SQL语句，以达到执行代码对服务器进行攻击的方法。

例如登录页面（用户名和密码），本质是执行查询语句select count(\*) from emp where username = '输入的用户名' and password = '输入的密码';，不法分子可以修改密码为' or '1' = '1从而进入系统，原理是' or '1' = '1替换输入的密码可以得到

select count(\*) from emp where username = '输入的用户名' and password = '' or '1' = '1';，由于'1' = '1'始终成立，所以可以登陆成功。而通过预编译就可以避免SQL注入。

**5.4.3 参数占位符**

在Mybatis中提供的参数占位符有两种：\${...} 、#{...}

\#{...}

执行SQL时，会将#{…}替换为?，生成预编译SQL，会自动设置参数值

使用时机：参数传递，都使用#{…}

\${...}

拼接SQL。直接将参数拼接在SQL语句中，存在SQL注入问题

使用时机：如果对表名、列表进行动态设置时使用

|                                                                |
|----------------------------------------------------------------|
| 在项目开发中，建议使用#{...}，生成预编译SQL，防止SQL注入安全。 |

**5.5 插入**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
<br />
@Insert("insert into emp(username, name, gender, image, job, entrydate, dept_id, create_time, update_time) values (#{username}, #{name}, #{gender}, #{image}, #{job}, #{entrydate}, #{deptId}, #{createTime}, #{updateTime})")<br />
public void insert(Emp emp);<br />
<br />
}</td>
</tr>
</tbody>
</table>

*说明：#{...} 里面写的名称是对象的属性名*

在数据添加成功后，如果想要拿到主键值，需要在Mapper接口中的方法上添加一个Options注解，并在注解中指定属性 useGeneratedKeys=true 和 keyProperty="实体类属性名" ：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
//会自动将生成的主键值，赋值给emp对象的id属性<br />
@Options(useGeneratedKeys = true,keyProperty = "id")<br />
@Insert("insert into emp(username, name, gender, image, job, entrydate, dept_id, create_time, update_time) values (#{username}, #{name}, #{gender}, #{image}, #{job}, #{entrydate}, #{deptId}, #{createTime}, #{updateTime})")<br />
public void insert(Emp emp);<br />
}</td>
</tr>
</tbody>
</table>

**5.6 更新**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
//根据id修改员工信息<br />
@Update("update emp set username=#{username}, name=#{name}, gender=#{gender}, image=#{image}, job=#{job}, entrydate=#{entrydate}, dept_id=#{deptId}, update_time=#{updateTime} where id=#{id}")<br />
public void update(Emp emp);<br />
}</td>
</tr>
</tbody>
</table>

可以设置返回值类型为int，表示更新操作影响的行数。

**5.7 查询**

**5.7.1 根据ID查询**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
@Select("select id, username, password, name, gender, image, job, entrydate, dept_id, create_time, update_time from emp where id=#{id}")<br />
public Emp getById(Integer id);<br />
}</td>
</tr>
</tbody>
</table>

在测试类测试后，发现deptId、createTime、updateTime这三个字段没有值，这是因为实体类的属性名和数据库的字段名一致会映射成功，而deptId、createTime、updateTime属性在数据库中对应dept_id、create_time、update_time，映射不匹配。解决方案：

方案一：**起别名**，在SQL语句中，对不一样的列名起别名，别名和实体类属性名一样

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Select("select id, username, password, name, gender, image, job, entrydate, " +<br />
"dept_id AS deptId, create_time AS createTime, update_time AS updateTime " +<br />
"from emp " +<br />
"where id=#{id}")<br />
public Emp getById(Integer id);</td>
</tr>
</tbody>
</table>

方案二：**手动结果映射**，通过 @Results及@Result 进行手动结果映射

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Results({@Result(column = "dept_id", property = "deptId"),<br />
@Result(column = "create_time", property = "createTime"),<br />
@Result(column = "update_time", property = "updateTime")})<br />
@Select("select id, username, password, name, gender, image, job, entrydate, dept_id, create_time, update_time from emp where id=#{id}")<br />
public Emp getById(Integer id);</td>
</tr>
</tbody>
</table>

方案三：**开启驼峰命名(推荐)**，如果字段名与属性名符合驼峰命名规则，mybatis会自动通过驼峰命名规则映射

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
# 在application.properties中添加：<br />
mybatis.configuration.map-underscore-to-camel-case=true</td>
</tr>
</tbody>
</table>

*要使用驼峰命名前提是 实体类的属性 与 数据库表中的字段名严格遵守驼峰命名。如字段dept_id自动映射到deptId属性。*

**5.7.2 条件查询**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
@Select("select * from emp " +<br />
"where name like '%${name}%' " + //这里不能使用#{name}占位符，因为在''中会被认为是字符串<br />
"and gender = #{gender} " +<br />
"and entrydate between #{begin} and #{end} " +<br />
"order by update_time desc")<br />
public List&lt;Emp&gt; list(String name, Short gender, LocalDate begin, LocalDate end);<br />
}</td>
</tr>
</tbody>
</table>

*方法中的形参名和SQL语句中的参数占位符名保持一致*

解决SQL注入风险：使用MySQL提供的字符串拼接函数：concat('%' , '关键字' , '%')

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
<br />
@Select("select * from emp " +<br />
"where name like concat('%',#{name},'%') " +<br />
"and gender = #{gender} " +<br />
"and entrydate between #{begin} and #{end} " +<br />
"order by update_time desc")<br />
public List&lt;Emp&gt; list(String name, Short gender, LocalDate begin, LocalDate end);<br />
<br />
}</td>
</tr>
</tbody>
</table>

**5.7.3 参数名说明**

在springBoot的2.x版本：在编译时，会在生成的字节码文件中保留原方法形参的名称，所以#{…}可以直接通过形参名获取对应的值。

在springBoot的1.x版本：编译时生成的字节码文件不再保留原方法形参名，默认是var1、var2 ...，可以通过@Param注解保留形参名：

<img src=".assets/JavaWeb-知识库笔记/media/image89.png" style="width:5.75in;height:0.875in" />

**6.Mybatis的XML配置文件**

如果需要实现复杂的SQL功能，注解将会非常繁琐，可以通过XML文件存放SQL语句。

**6.1 XML配置文件规范**

XML映射文件的名称与Mapper接口名称一致，并且将XML映射文件和Mapper接口放置在相同包下（同包同名）

XML映射文件的namespace属性与Mapper接口全限定个名一致

XML映射文件中sql语句的id与Mapper接口中的方法名一致，并保持返回类型一致

<img src=".assets/JavaWeb-知识库笔记/media/image90.png" style="width:5.75in;height:1.71875in" />

*\<select\>标签：就是用于编写select查询语句的。*

id属性：指定执行SQL语句的方法

resultType属性，指的是查询返回的单条记录所封装的类型

**6.2 XML配置文件实现**

第1步：创建XML映射文件

第2步：编写XML映射文件

dtd约束，直接从mybatis官网复制即可

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;?xml version="1.0" encoding="UTF-8" ?&gt;<br />
&lt;!DOCTYPE mapper<br />
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"<br />
"https://mybatis.org/dtd/mybatis-3-mapper.dtd"&gt;<br />
&lt;mapper namespace=""&gt;<br />
<br />
&lt;/mapper&gt;</td>
</tr>
</tbody>
</table>

sql语句的id与Mapper接口中的方法名一致，并保持返回类型一致

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;mapper namespace="com.itheima.mapper.EmpMapper"&gt;<br />
&lt;!--查询操作--&gt;<br />
&lt;select id="list" resultType="com.itheima.pojo.Emp"&gt;<br />
select * from emp<br />
where name like concat('%',#{name},'%')<br />
and gender = #{gender}<br />
and entrydate between #{begin} and #{end}<br />
order by update_time desc<br />
&lt;/select&gt;<br />
&lt;/mapper&gt;</td>
</tr>
</tbody>
</table>

**注解和XML配置文件的选择**：

使用Mybatis的注解，主要是来完成一些简单的增删改查功能

如果需要实现复杂的SQL功能，建议使用XML来配置映射语句

**6.3 MybatisX**

MybatisX是一款基于IDEA的快速开发Mybatis的插件，可以通过MybatisX快速定位，直接搜索插件安装即可。

**7.动态SQL**

动态SQL就是方法参数可以只传递一部分，其他的传递null，实现部分条件的SQL语句执行。例如empMapper.list("张", null, null, null)表示只根据name查询。

**7.1 动态SQL-if**

\<if\>：用于判断条件是否成立，使用test属性进行条件判断，如果条件为true，则拼接SQL。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;if test="条件表达式"&gt;<br />
要拼接的sql语句<br />
&lt;/if&gt;</td>
</tr>
</tbody>
</table>

**7.1.1 条件查询**

改造5.7.2中的XML配置文件为动态SQL：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;select id="list" resultType="com.itheima.pojo.Emp"&gt;<br />
select * from emp<br />
&lt;where&gt;<br />
&lt;!-- if做为where标签的子元素 --&gt;<br />
&lt;if test="name != null"&gt;<br />
and name like concat('%',#{name},'%')<br />
&lt;/if&gt;<br />
&lt;if test="gender != null"&gt;<br />
and gender = #{gender}<br />
&lt;/if&gt;<br />
&lt;if test="begin != null and end != null"&gt;<br />
and entrydate between #{begin} and #{end}<br />
&lt;/if&gt;<br />
&lt;/where&gt;<br />
order by update_time desc<br />
&lt;/select&gt;</td>
</tr>
</tbody>
</table>

\<where\>标签只会在子元素有内容的情况下才插入where子句，而且在合适时会自动去除子句的开头的AND或OR

**7.1.2 条件更新**

改造5.6中的XML配置文件为动态SQL：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;update id="update"&gt;<br />
update emp<br />
<em>&lt;!-- 使用set标签，代替update语句中的set关键字 --&gt;</em><br />
&lt;set&gt;<br />
&lt;if test="username != null"&gt;<br />
username=#{usern ame},<br />
&lt;/if&gt;<br />
&lt;if test="name != null"&gt;<br />
name=#{name},<br />
&lt;/if&gt;<br />
&lt;if test="gender != null"&gt;<br />
gender=#{gender},<br />
&lt;/if&gt;<br />
&lt;if test="image != null"&gt;<br />
image=#{image},<br />
&lt;/if&gt;<br />
&lt;if test="job != null"&gt;<br />
job=#{job},<br />
&lt;/if&gt;<br />
&lt;if test="entrydate != null"&gt;<br />
entrydate=#{entrydate},<br />
&lt;/if&gt;<br />
&lt;if test="deptId != null"&gt;<br />
dept_id=#{deptId},<br />
&lt;/if&gt;<br />
&lt;if test="updateTime != null"&gt;<br />
update_time=#{updateTime}<br />
&lt;/if&gt;<br />
&lt;/set&gt;<br />
where id=#{id}<br />
&lt;/update&gt;</td>
</tr>
</tbody>
</table>

\<set\>：动态的在SQL语句中插入set关键字，并会在合适时删掉额外的逗号（用于update语句中）

**7.2 动态SQL-foreach**

Mapper接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Mapper<br />
public interface EmpMapper {<br />
//批量删除<br />
public void deleteByIds(List&lt;Integer&gt; ids);<br />
}</td>
</tr>
</tbody>
</table>

XML映射文件：

使用\<foreach\>遍历deleteByIds方法中传递的参数ids集合

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;foreach collection="集合名称" item="集合遍历出来的元素/项" separator="每一次遍历使用的分隔符"<br />
open="遍历开始前拼接的片段" close="遍历结束后拼接的片段"&gt;<br />
&lt;/foreach&gt;</td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;delete id="deleteByIds"&gt;<br />
&lt;!-- delete from emp where id in (1,2,3,...); --&gt;<br />
delete from emp where id in<br />
&lt;foreach collection="ids" item="id" separator="," open="(" close=")"&gt;<br />
#{id}<br />
&lt;/foreach&gt;<br />
&lt;/delete&gt;</td>
</tr>
</tbody>
</table>

**7.3 动态SQL-sql&include**

在xml映射文件中配置的SQL，有时可能会存在很多重复的片段，此时就会存在很多冗余的代码

<img src=".assets/JavaWeb-知识库笔记/media/image91.png" style="width:5.75in;height:3.78125in" />

\<sql\>：定义可重用的SQL片段

\<include\>：通过属性refid，指定包含的SQL片段

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- SQL片段： 抽取重复的代码 --&gt;<br />
&lt;sql id="commonSelect"&gt;<br />
select id, username, password, name, gender, image, job, entrydate, dept_id, create_time, update_time from emp<br />
&lt;/sql&gt;<br />
&lt;!-- 通过&lt;include&gt;标签在原来抽取的地方进行引用 --&gt;<br />
&lt;select id="list" resultType="com.itheima.pojo.Emp"&gt;<br />
&lt;include refid="commonSelect"/&gt;<br />
&lt;where&gt;<br />
&lt;if test="name != null"&gt;<br />
name like concat('%',#{name},'%')<br />
&lt;/if&gt;<br />
&lt;if test="gender != null"&gt;<br />
and gender = #{gender}<br />
&lt;/if&gt;<br />
&lt;if test="begin != null and end != null"&gt;<br />
and entrydate between #{begin} and #{end}<br />
&lt;/if&gt;<br />
&lt;/where&gt;<br />
order by update_time desc<br />
&lt;/select&gt;</td>
</tr>
</tbody>
</table>

**十四、SpringBootWeb案例**

具体操作见[SpringBootWeb综合案例](https://mcnerzykwkel.feishu.cn/docx/EnGwdtISUowewtxoH6GcOBcsnCP?from=from_copylink)。这里只写出现的新知识点。

**1.开发规范**

**1.1 开发规范-REST**

在前后端进行交互的时候，我们需要基于当前主流的REST风格的API接口进行交互。

REST（Representational State Transfer）：表述性状态转换，它是一种软件架构风格。

**传统URL风格：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
http://localhost:8080/user/getById?id=1 GET：查询id为1的用户<br />
http://localhost:8080/user/saveUser POST：新增用户<br />
http://localhost:8080/user/updateUser POST：修改用户<br />
http://localhost:8080/user/deleteUser?id=1 GET：删除id为1的用户</td>
</tr>
</tbody>
</table>

原始的传统URL呢，定义比较复杂，而且资源的访问行为对外暴露。

**基于REST风格URL：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
<br />
http://localhost:8080/users/1 GET：查询id为1的用户<br />
http://localhost:8080/users POST：新增用户<br />
http://localhost:8080/users PUT：修改用户<br />
http://localhost:8080/users/1 DELETE：删除id为1的用户</td>
</tr>
</tbody>
</table>

通过URL定位要操作的资源，通过HTTP动词(请求方式)来描述具体的操作。

在REST风格的URL中，通过四种请求方式来操作数据的增删改查：

GET ： 查询

POST ：新增

PUT ：修改

DELETE ：删除

*描述模块的功能通常使用复数，也就是加s的格式来描述，表示此类资源，而非单个资源，如：users、emps、books…*

**1.2 开发规范-统一响应结果**

前后端工程在进行交互时，使用统一响应结果 Result：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Data<br />
@NoArgsConstructor<br />
@AllArgsConstructor<br />
public class Result {<br />
private Integer code;//响应码，1 代表成功; 0 代表失败<br />
private String msg; //响应信息 描述字符串<br />
private Object data; //返回的数据<br />
<br />
//增删改 成功响应<br />
public static Result success(){<br />
return new Result(1,"success",null);<br />
}<br />
//查询 成功响应<br />
public static Result success(Object data){<br />
return new Result(1,"success",data);<br />
}<br />
//失败响应<br />
public static Result error(String msg){<br />
return new Result(0,msg,null);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**1.3 开发流程**

在进行功能开发时，都是根据如下流程进行：

<img src=".assets/JavaWeb-知识库笔记/media/image92.png" style="width:5.75in;height:0.55208in" />

*接口文档一般由后端程序员书写。*

**2.日志对象**

若要使用日志功能，需要在每个类里手动声明一个 Logger 对象：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private static final Logger log = LoggerFactory.getLogger(WithoutSlf4jExample.class);<br />
log.info("Doing something..."); //日志记录</td>
</tr>
</tbody>
</table>

在类上添加 @Slf4j 注解后，Lombok 会在编译阶段自动为该类生成一个 org.slf4j.Logger 类型的日志对象，这个日志对象的名称通常为 log，可以直接使用它进行日志记录操作：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
public class WithSlf4jExample {<br />
public void doSomething() {<br />
log.info("Doing something...");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.Controller层请求方式**

@RequestMapping注解可以接受任何形式的请求方式，如果想要指定请求方式的限制，可以通过method属性指定：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RequestMapping(value = "/depts" , method = RequestMethod.GET) //只允许GET请求<br />
@RequestMapping(value = "/depts" , method = RequestMethod.POST) //只允许POST请求<br />
@RequestMapping(value = "/depts" , method = RequestMethod.PUT) //只允许PUT请求<br />
@RequestMapping(value = "/depts" , method = RequestMethod.DELETE) //只允许DELETE请求</td>
</tr>
</tbody>
</table>

SpringBoot还提供了简便方式指定请求方式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/depts") //只接受get请求<br />
@PostMapping("/depts") //只接受post请求<br />
@PutMapping("/depts") //只接受put请求<br />
@DeleteMapping("/depts") //只接受delete请求</td>
</tr>
</tbody>
</table>

**4.请求路径优化**

Controller层如果重复的请求路径过多，可以把重复的请求路径抽取到注解@RequestMapping中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//原注解<br />
@RestController<br />
public class DeptController {<br />
@Autowired<br />
private DeptService deptService;<br />
@GetMapping("/depts")<br />
...<br />
@DeleteMapping("/depts/{id}")<br />
...<br />
@PostMapping("/depts")<br />
...<br />
}<br />
<br />
//优化后的注解<br />
@RestController<br />
@RequestMapping("/depts")<br />
public class DeptController {<br />
@Autowired<br />
private DeptService deptService;<br />
@GetMapping ///depts<br />
...<br />
@DeleteMapping("/{id}") ///depts/{id}<br />
...<br />
@PostMapping ///depts<br />
...<br />
}</td>
</tr>
</tbody>
</table>

*一个完整的请求路径，应该是类上@RequestMapping的value属性 + 方法上的 @RequestMapping的value属性*

**5.分页插件**

PageHelper是Mybatis的一款功能强大、方便易用的分页插件，支持任何形式的单标、多表的分页查询。

**5.1 实现**

1、在pom.xml引入依赖

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.github.pagehelper&lt;/groupId&gt;<br />
&lt;artifactId&gt;pagehelper-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;1.4.6&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

2、代码改造

<img src=".assets/JavaWeb-知识库笔记/media/image93.png" style="width:5.75in;height:2.65625in" />

分页插件执行过程：

先获取到要执行的SQL语句：select \* from emp

把SQL语句中的字段列表，变为：count(\*)

执行SQL语句：select count(\*) from emp //获取到总记录数

再对要执行的SQL语句：select \* from emp 进行改造，在末尾添加 limit ? , ?

执行改造后的SQL语句：select \* from emp limit ? , ?

**5.2 测试**

重启项目工程，打开postman，发起GET请求，访问http://localhost:8080/emps?page=1&pageSize=5，得到JSON数据。

**6.文件上传**

文件上传，是指将本地图片、视频、音频等文件上传到服务器，供其他用户浏览或下载的过程。

**6.1 简介**

想要完成文件上传这个功能需要涉及到两个部分：

前端程序

服务端程序

**6.1.1 前端部分**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;form action="/upload" method="post" enctype="multipart/form-data"&gt;<br />
姓名: &lt;input type="text" name="username"&gt;&lt;br&gt;<br />
年龄: &lt;input type="text" name="age"&gt;&lt;br&gt;<br />
头像: &lt;input type="file" name="image"&gt;&lt;br&gt;<br />
&lt;input type="submit" value="提交"&gt;<br />
&lt;/form&gt;</td>
</tr>
</tbody>
</table>

上传文件页面三要素：

表单必须有file域，用于选择要上传的文件

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>HTML<br />
&lt;input type="file" name="image"/&gt;</td>
</tr>
</tbody>
</table>

表单提交方式必须为POST

通常上传的文件会比较大，所以需要使用 POST 提交方式

表单的编码类型enctype必须要设置为：multipart/form-data

普通默认的编码格式不适合传输大型的二进制数据，所以在文件上传时，表单的编码格式必须设置为multipart/form-data

**实现**：

将资料里的"upload.html"文件，复制到springboot项目工程下的static目录，在浏览器打开

设置form表单标签中enctype属性值为multipart/form-data，在控制台查看文件传输情况：

<img src=".assets/JavaWeb-知识库笔记/media/image94.png" style="width:5.75in;height:3.76042in" />

*如果使用enctype的默认属性值或不指定enctype属性，会看不到文件中的数据，只能看到文件名（带后缀）。*

**6.1.2 后端部分**

在服务端定义一个controller层的类用来进行文件上传，然后在controller当中定义一个方法来处理/upload请求

在定义的方法中接收提交过来的数据（形参名和传输的名字相同）：

用户名：String name

年龄： Integer age

文件： MultipartFile image

Spring中提供了一个API：MultipartFile，使用这个API就可以来接收到上传的文件

<img src=".assets/JavaWeb-知识库笔记/media/image95.png" style="width:5.75in;height:1.375in" />

如果表单项的名字和方法中形参名不一致，可以使用@RequestParam注解解决。

**6.1.3 测试**

启动服务端程序

打开浏览器输入http://localhost:8080/upload.html， 录入数据并提交

上传的文件放在了一个临时文件（.tmp）中，通过后端控制台可以得到临时文件的路径，当controller代码正在运行时，临时文件存在，当返回一个结果后，这个临时目录就被释放了。

**6.2 本地存储**

如果想要保留浏览器传输的文件当程序结束时不被自动释放，就需要把文件保存到本地磁盘中：

在服务器本地磁盘上创建images目录，用来存储上传的文件（例：E盘创建images目录）

使用MultipartFile类提供的API方法，把临时文件转存到本地磁盘目录下

MultipartFile 常见方法：

String getOriginalFilename(); //获取原始文件名

void transferTo(File dest); //将接收的文件转存到磁盘文件中

long getSize(); //获取文件的大小，单位：字节

byte\[\] getBytes(); //获取文件内容的字节数组

InputStream getInputStream(); //获取接收到的文件内容的输入流

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
@RestController<br />
public class UploadController {<br />
<br />
@PostMapping("/upload")<br />
public Result upload(String username, Integer age, MultipartFile image) throws IOException {<br />
log.info("文件上传：{},{},{}",username,age,image);<br />
<br />
//获取原始文件名<br />
String originalFilename = image.getOriginalFilename();<br />
<br />
//将文件存储在服务器的磁盘目录<br />
image.transferTo(new File("E:/images/"+originalFilename));<br />
<br />
return Result.success();<br />
}<br />
<br />
}</td>
</tr>
</tbody>
</table>

利用postman测试：

<img src=".assets/JavaWeb-知识库笔记/media/image96.png" style="width:5.75in;height:2.39583in" />

由于上传的文件名可能重名，可以使用UUID获取唯一文件名进行本地存储：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@PostMapping("/upload")<br />
public Result upload(String username, Integer age, MultipartFile image) throws IOException {<br />
log.info("文件上传：{},{},{}",username,age,image);<br />
<br />
//获取原始文件名<br />
String originalFilename = image.getOriginalFilename();<br />
<br />
//构建新的文件名<br />
String extname = originalFilename.substring(originalFilename.lastIndexOf("."));//文件扩展名<br />
String newFileName = UUID.randomUUID().toString()+extname;//随机名+文件扩展名<br />
<br />
//将文件存储在服务器的磁盘目录<br />
image.transferTo(new File("E:/images/"+newFileName));<br />
<br />
return Result.success();<br />
}</td>
</tr>
</tbody>
</table>

在SpringBoot中，文件上传时默认单个文件最大大小为1M，修改application.properties进行如下配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
#配置单个文件最大上传大小<br />
spring.servlet.multipart.max-file-size=10MB<br />
<br />
#配置单个请求最大上传大小(一次请求可以上传多个文件)<br />
spring.servlet.multipart.max-request-size=100MB</td>
</tr>
</tbody>
</table>

**6.3 阿里云OSS**

阿里云对象存储OSS，是一款安全可靠的云 存储服务，可以通过网络随时存储和调用包括文本、图片、音频和视频等在内的各种文件。

**6.3.1 准备**

SDK：软件开发工具包，包括辅助软件开发的依赖（jar包）、代码示例等，都可以叫做SDK。简单说，SDK中包含了使用第三方云服务时所需要的依赖，以及一些示例代码。

Bucket：存储空间是用户用于存储对象（Object，就是文件）的容器，所有的对象都必须隶属于某个存储空间。

**使用步骤**：

<img src=".assets/JavaWeb-知识库笔记/media/image97.png" style="width:5.75in;height:0.58333in" />

注册登录阿里云后，点击右上角的控制台，点击对象存储OSS：

<img src=".assets/JavaWeb-知识库笔记/media/image98.png" style="width:4in;height:1.125in" />

点击左侧的 "Bucket列表"，创建一个Bucket：

<img src=".assets/JavaWeb-知识库笔记/media/image99.png" style="width:5.75in;height:6.85417in" />

**6.3.2 入门**

首先需要来打开阿里云OSS的官方文档，在官方文档中找到 SDK 的示例代码：

<img src=".assets/JavaWeb-知识库笔记/media/image100.png" style="width:5.75in;height:2.88542in" />

<img src=".assets/JavaWeb-知识库笔记/media/image101.png" style="width:5.75in;height:2.86458in" />

*在实际开发当中，我们是需要从前往后仔细的去阅读这一份文档，这里只说重点。*

<img src=".assets/JavaWeb-知识库笔记/media/image102.png" style="width:5.75in;height:2.65625in" />

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class AliOssTest {<br />
public static void main(String[] args) throws Exception {<br />
// Endpoint以华东1（杭州）为例，其它Region请按实际情况填写。<br />
String endpoint = "https://oss-cn-hangzhou.aliyuncs.com";<br />
<br />
// 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。<br />
String accessKeyId = "[REDACTED]";<br />
String accessKeySecret = "[REDACTED]";<br />
<br />
// 填写Bucket名称，例如examplebucket。<br />
String bucketName = "web-framework01";<br />
// 填写Object完整路径，完整路径中不能包含Bucket名称，例如exampledir/exampleobject.txt。<br />
String objectName = "1.jpg";<br />
// 填写本地文件的完整路径，例如D:\\localpath\\examplefile.txt。<br />
// 如果未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件流。<br />
String filePath= "C:\\Users\\Administrator\\Pictures\\1.jpg";<br />
<br />
// 创建OSSClient实例。<br />
OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);<br />
<br />
try {<br />
InputStream inputStream = new FileInputStream(filePath);<br />
// 创建PutObjectRequest对象。<br />
PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, objectName, inputStream);<br />
// 设置该属性可以返回response。如果不设置，则返回的response为空。<br />
putObjectRequest.setProcess("true");<br />
// 创建PutObject请求。<br />
PutObjectResult result = ossClient.putObject(putObjectRequest);<br />
// 如果上传成功，则返回200。<br />
System.out.println(result.getResponse().getStatusCode());<br />
} catch (OSSException oe) {<br />
System.out.println("Caught an OSSException, which means your request made it to OSS, "<br />
+ "but was rejected with an error response for some reason.");<br />
System.out.println("Error Message:" + oe.getErrorMessage());<br />
System.out.println("Error Code:" + oe.getErrorCode());<br />
System.out.println("Request ID:" + oe.getRequestId());<br />
System.out.println("Host ID:" + oe.getHostId());<br />
} catch (ClientException ce) {<br />
System.out.println("Caught an ClientException, which means the client encountered "<br />
+ "a serious internal problem while trying to communicate with OSS, "<br />
+ "such as not being able to access the network.");<br />
System.out.println("Error Message:" + ce.getMessage());<br />
} finally {<br />
if (ossClient != null) {<br />
ossClient.shutdown();<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

accessKeyId：阿里云账号AccessKey

accessKeySecret：阿里云账号AccessKey对应的秘钥

bucketName：Bucket名称

objectName：对象名称，在Bucket中存储的对象的名称

filePath：文件路径

AccessKey获取方式：

<img src=".assets/JavaWeb-知识库笔记/media/image103.png" style="width:5.75in;height:1.22917in" />

运行以上程序后，会把本地的文件上传到阿里云OSS服务器上，点击文件列表就可以查看了。

|                                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------------------------------------|
| **注意**：在新版本中，抛弃了在代码中硬性使用密钥，而采用了从系统环境变量中获取，所以需要配置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。 |

**7.配置文件**

对于代码中重复的且固定的信息，可以配置在配置文件properties中，当需要使用时，通过springboot提供的Value注解注入。

**7.1 参数配置化**

旧版本的OSS中，需要手动在代码引入OSS地址、秘钥和bucket容器名字，可以把这些信息配置到配置文件增加安全性和代码简洁性：

properties文件

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
#自定义的阿里云OSS配置信息<br />
aliyun.oss.endpoint=https://oss-cn-hangzhou.aliyuncs.com<br />
aliyun.oss.accessKeyId=[REDACTED]<br />
aliyun.oss.accessKeySecret=[REDACTED]<br />
aliyun.oss.bucketName=web-tlias</td>
</tr>
</tbody>
</table>

程序代码

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Component<br />
public class AliOSSUtils {<br />
@Value("${aliyun.oss.endpoint}")<br />
private String endpoint;<br />
<br />
@Value("${aliyun.oss.accessKeyId}")<br />
private String accessKeyId;<br />
<br />
@Value("${aliyun.oss.accessKeySecret}")<br />
private String accessKeySecret;<br />
<br />
@Value("${aliyun.oss.bucketName}")<br />
private String bucketName;<br />
...<br />
}</td>
</tr>
</tbody>
</table>

**7.2 yml配置文件**

传统的配置文件比较臃肿，变量的层级关系不清晰，使用yml配置文件可以很清晰的显示出层级关系，在开发中也更偏向于yml配置文件。

application.properties

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
server.port=8080<br />
server.address=127.0.0.1</td>
</tr>
</tbody>
</table>

application.yml

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8080<br />
address: 127.0.0.1</td>
</tr>
</tbody>
</table>

application.yaml

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8080<br />
address: 127.0.0.1</td>
</tr>
</tbody>
</table>

yml 格式的配置文件，后缀名有两种：

yml （推荐）

yaml

yml配置文件的基本语法：

大小写敏感

数值前边必须有空格，作为分隔符

使用缩进表示层级关系，缩进时，不允许使用Tab键，只能用空格（idea中会自动将Tab转换为空格）

缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

\#表示注释，从这个字符一直到行尾，都会被解析器忽略

yml文件中常见的数据格式：

对象/Map集合

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
user:<br />
name: zhangsan #:后必须要有一个空格<br />
age: 18<br />
password: 123456</td>
</tr>
</tbody>
</table>

数组/List/Set集合

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
hobby:<br />
- java #-后必须要有一个空格<br />
- game<br />
- sport</td>
</tr>
</tbody>
</table>

**7.3 @ConfigurationProperties**

使用@Value注解给变量赋值在变量很多时会非常繁琐，Spring提供了@ConfigurationProperties注解实现自动注入：

创建一个实现类，且实体类中的属性名和配置文件当中key的名字必须一致，实体类当中的属性还需要提供 getter / setter方法

将实体类交给Spring的IOC容器管理，成为IOC容器当中的bean对象（@Component）

在实体类上添加@ConfigurationProperties注解，并通过perfect属性来指定配置参数项的前缀

<img src=".assets/JavaWeb-知识库笔记/media/image104.png" style="width:5.75in;height:1.34375in" />

如果出现警告，表明需要添加一个依赖自动识别被@ConfigurationProperties注解标识的bean对象（可选项）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-configuration-processor&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

@ConfigurationProperties注解和@Value注解的区别和选择：

相同点：都是用来注入外部配置的属性的。

不同点：

@Value注解只能一个一个的进行外部属性的注入

@ConfigurationProperties可以批量的将外部的属性配置注入到bean对象的属性中

如果需要注入的属性比较多，而且需要复用，就考虑用@ConfigurationProperties，如果仅仅有少量属性，就可以考虑@Value

**8.登录认证**

**8.1 登录校验**

登录校验就是服务器接收到浏览器的请求后，先判断是否已经登录，如果已经登录，就执行对应的业务需求，否则就给前端返回一个错误信息。

登录校验的实现思路：在服务端设置统一拦截，拦截到浏览器的请求后根据请求头获取之前的登录信息，再进行相应的登录校验。

登录校验需要两个技术：

会话技术

统一拦截技术

统一拦截技术有两种：

Servlet规范中的Filter过滤器

Spring提供的interceptor拦截器

**8.1.1 会话技术**

**8.1.1.1 概述**

会话：指的是浏览器与服务器之间的一次连接，我们就称为一次会话，如下图有三个浏览器，就有三个会话：

一次会话可以包含多次请求和响应

会话的一方连接断开，整个会话就结束

<img src=".assets/JavaWeb-知识库笔记/media/image105.png" style="width:5.75in;height:1.5in" />

会话跟踪：一种维护浏览器状态的方法，服务器需要识别多次请求是否来自于同一浏览器，以便在同一次会话的多次请求间共享数据，例如上图的1和3是否属于同一会话（是），3和5是否属于同一会话（否）。

共享数据：HTTP协议是无状态协议，需要共享数据记录上一次请求的内容，进行登录校验。

**8.1.1.2 会话跟踪方案**

**方案一 ：Cookie**：

cookie 是客户端会话跟踪技术，它是存储在客户端浏览器的。被HTTP协议支持自带。

当浏览器第一次请求了登录接口，登录接口执行完成之后就可以设置一个cookie，在 cookie 当中我们存储用户相关的一些数据信息。

三个自动：

服务器会 **自动** 的将 cookie 响应给浏览器

浏览器接收到响应回来的数据之后，会 **自动** 的将 cookie 存储在浏览器本地

在后续的请求当中，浏览器会 **自动** 的将 cookie 携带到服务器端

代码测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
@RestController<br />
public class SessionController {<br />
<br />
//设置Cookie<br />
@GetMapping("/c1")<br />
public Result cookie1(HttpServletResponse response){<br />
response.addCookie(new Cookie("login_username","itheima")); //设置Cookie/响应Cookie<br />
return Result.success();<br />
}<br />
<br />
//获取Cookie<br />
@GetMapping("/c2")<br />
public Result cookie2(HttpServletRequest request){<br />
Cookie[] cookies = request.getCookies();<br />
for (Cookie cookie : cookies) {<br />
if(cookie.getName().equals("login_username")){<br />
System.out.println("login_username: "+cookie.getValue()); //输出name为login_username的cookie<br />
}<br />
}<br />
return Result.success();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

打开浏览器，访问c1接口，http://localhost:8080/c1：

<img src=".assets/JavaWeb-知识库笔记/media/image106.png" style="width:5.75in;height:1.94792in" />

访问c2接口http://localhost:8080/c2，此时浏览器会自动将Cookie携带到服务端，是通过**请求头Cookie**携带的：

<img src=".assets/JavaWeb-知识库笔记/media/image107.png" style="width:5.75in;height:1.80208in" />

优点：HTTP协议中支持的技术

缺点：

移动端APP(Android、IOS)中无法使用Cookie

不安全，用户可以自己禁用Cookie

Cookie不能跨域

跨域介绍：前后端分离开发中，前端部署在一台服务器上（假设是192.168.150.200），后端部署在另一台服务器上（假设是192.168.150.100）上，打开浏览器直接访问前端工程http://192.168.150.200/login.html，在该页面发起请求到服务端http://192.168.150.100:8080/login接口，此时就会出现跨域

<img src=".assets/JavaWeb-知识库笔记/media/image108.png" style="width:5.75in;height:2.125in" />

区分跨域的维度：

协议

IP/协议

端口

只要上述的三个维度有任何一个维度不同，那就是跨域操作。

**方案二 ：Session**：

Session：服务器端会话跟踪技术，存储在服务器端，底层是通过Cookie实现。

浏览器第一次请求服务器，服务器会创建一个Session对象，每个Session对象都有一个ID，响应数据时，服务器将Session 的 ID 通过 Cookie 响应给浏览器，浏览器**自动**识别这个ID并存储在浏览器本地，之后每一次请求都会将Cookie 的数据携带到服务端，服务端拿到这个ID就会从众多JSESSIONID中找到当前请求对应的JSESSIONID，从而实现数据共享。

代码测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
@RestController<br />
public class SessionController {<br />
<br />
@GetMapping("/s1")<br />
public Result session1(HttpSession session){<br />
log.info("HttpSession-s1: {}", session.hashCode());<br />
<br />
session.setAttribute("loginUser", "tom"); //往session中存储数据<br />
return Result.success();<br />
}<br />
<br />
@GetMapping("/s2")<br />
public Result session2(HttpServletRequest request){<br />
HttpSession session = request.getSession();<br />
log.info("HttpSession-s2: {}", session.hashCode());<br />
<br />
Object loginUser = session.getAttribute("loginUser"); //从session中获取数据<br />
log.info("loginUser: {}", loginUser);<br />
return Result.success(loginUser);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

访问 s1 接口，http://localhost:8080/s1，就可以通过Set-Cookie看到JSESSIONID：

<img src=".assets/JavaWeb-知识库笔记/media/image109.png" style="width:5.75in;height:2.04167in" />

访问 s2 接口，http://localhost:8080/s2，就可以通过Cookie看到Session数据：

<img src=".assets/JavaWeb-知识库笔记/media/image110.png" style="width:5.75in;height:1.63542in" />

优点：Session是存储在服务端的，安全

缺点：

服务器集群环境下无法直接使用Session

移动端APP(Android、IOS)中无法使用Cookie

用户可以自己禁用Cookie

Cookie不能跨域

Session 底层是基于Cookie实现的会话跟踪，如果Cookie不可用，则该方案也就失效了。

集群环境为何无法使用Session？

在企业开发中，最终部署时会采用集群部署，即同一个项目部署在多个服务器中，用户访问时，会先访问到负载均衡服务器（将前端发起的请求均匀的分发给后面的这三台服务器）。假如通过 session 进行会话跟踪，若第一次分发到第一台服务器，第二次分发到第二台服务器，这时第二台服务器中没有对应Session对象，就会重新构建一个会话对象，这样两次请求就不是同一个会话。

<img src=".assets/JavaWeb-知识库笔记/media/image111.png" style="width:5.75in;height:1.4375in" />

**方案三：令牌技术（最常用）**：

令牌：用户的一个身份凭证，在请求登录接口时，如果登录成功，就会生成一个令牌，将这个令牌响应给前端。

前端接收到令牌后会将令牌存储在cookie 中（也可以存储在其他空间如 localStorage）。后续每一次请求都会将令牌携带到服务端，服务端校验令牌的有效性。如果令牌有效就说明用户已经登录，否则就说明用户未登录。

共享数据可以存放在令牌中

优点：

支持PC端、移动端

解决集群环境下的认证问题

减轻服务器的存储压力（无需在服务器端存储）

缺点：需要自己实现（包括令牌的生成、令牌的传递、令牌的校验）

**8.1.2 JWT令牌**

定义了一种简洁的、自包含的格式，用于在通信双方以json数据格式安全的传输信息。由于数字签名的存在，这些信息是可靠的。

简洁：是指jwt就是一个简单的字符串。可以在请求参数或者是请求头当中直接传递

自包含：指的是jwt令牌，看似是一个随机的字符串，但是可以根据自身的需求在jwt令牌中存储自定义的数据内容。如：可以直接在jwt令牌中存储用户的相关信息

**8.1.2.1 JWT的组成**

三个部分之间使用英文的点来分割：

第一部分：Header(头）， 记录令牌类型、签名算法等。 例如：{"alg":"HS256","type":"JWT"}

第二部分：Payload(有效载荷），携带一些自定义信息、默认信息等。 例如：{"id":"1","username":"Tom"}

第三部分：Signature(签名），防止Token被篡改、确保安全性。将header、payload，并加入指定秘钥，通过指定签名算法计算而来。

一旦jwt令牌当中任何一个部分、任何一个字符被篡改了，整个令牌在校验的时候都会失败，这正是签名保证的。

<img src=".assets/JavaWeb-知识库笔记/media/image112.png" style="width:5.75in;height:0.38542in" />

JWT是如何将原始的JSON格式数据，转变为字符串的呢？

通过base64编码方式进行编码。

Base64：一种基于64个可打印的字符来表示二进制数据的编码方式。64个字符分别是A到Z、a到z、 0- 9，一个加号，一个斜杠，加起来就是64个字符。任何数据经过base64编码之后，最终就会通过这64个字符来表示。当然还有一个符号，那就是等号。等号它是一个补位的符号。

**8.1.2.2 生成和校验**

引入JWT的依赖（提供工具类Jwts进行JWT的生成和校验）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- JWT依赖--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;io.jsonwebtoken&lt;/groupId&gt;<br />
&lt;artifactId&gt;jjwt&lt;/artifactId&gt;<br />
&lt;version&gt;0.9.1&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

生成JWT代码实现：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void genJwt(){<br />
Map&lt;String,Object&gt; claims = new HashMap&lt;&gt;();<br />
claims.put("id",1);<br />
claims.put("username","Tom");<br />
<br />
String jwt = Jwts.builder()<br />
.setClaims(claims) //自定义内容(载荷),需要一个Map集合<br />
.signWith(SignatureAlgorithm.HS256, "itheima") //签名算法<br />
.setExpiration(new Date(System.currentTimeMillis() + 24*3600*1000)) //有效期,需要一个date对象<br />
.compact();<br />
<br />
System.out.println(jwt);<br />
}</td>
</tr>
</tbody>
</table>

运行后打开JWT的官网https://jwt.io/，将生成的令牌直接放在Encoded位置，此时就会自动的将令牌解析出来：

**\[该类型的内容暂不支持下载\]**

<img src=".assets/JavaWeb-知识库笔记/media/image113.png" style="width:5.75in;height:3.35417in" />

*第三部分由于是有签名算法得出来的，所以不会解码。*

解析生成的令牌代码实现：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void parseJwt(){<br />
Claims claims = Jwts.parser()<br />
.setSigningKey("itheima")//指定签名密钥（必须保证和生成令牌时使用相同的签名密钥）<br />
.parseClaimsJws("eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNjcyNzI5NzMwfQ.fHi0Ub8npbyt71UqLXDdLyipptLgxBUg_mSuGJtXtBk")<br />
.getBody();<br />
<br />
System.out.println(claims);<br />
}</td>
</tr>
</tbody>
</table>

运行测试方法，得到{id=1, exp=1672729730}。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意事项</strong>：</p>
<p>JWT校验时使用的签名秘钥，必须和生成JWT令牌时使用的秘钥是配套的</p>
<p>如果JWT令牌解析校验时报错，则说明 JWT令牌被篡改 或 失效了，令牌非法</p></td>
</tr>
</tbody>
</table>

**8.1.3 过滤器Filter**

Filter：过滤器， JavaWeb三大组件(Servlet、Filter、Listener)之一，可以把资源的请求拦截下来，从而实现一些特殊的功能，如登录校验、统一编码处理、敏感字符处理等。

**8.1.3.1 快速入门**

第1步，定义过滤器 ：1.定义一个类，实现 Filter 接口，并重写其所有方法。

第2步，配置过滤器：Filter类上加 @WebFilter 注解，配置拦截资源的路径。引导类上加 @ServletComponentScan 开启Servlet组件支持。

定义过滤器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//定义一个类，实现一个标准的Filter过滤器的接口<br />
<br />
@WebFilter(urlPatterns = "/*") //配置过滤器要拦截的请求路径（ /* 表示拦截浏览器的所有请求 ）<br />
public class DemoFilter implements Filter { //jakarta.servlet包下<br />
@Override //初始化方法, 只调用一次<br />
public void init(FilterConfig filterConfig) throws ServletException {<br />
System.out.println("init 初始化方法执行了");<br />
}<br />
<br />
@Override //拦截到请求之后调用, 调用多次<br />
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {<br />
System.out.println("Demo 拦截到了请求...放行前逻辑");<br />
//放行<br />
chain.doFilter(request,response);<br />
}<br />
<br />
@Override //销毁方法, 只调用一次<br />
public void destroy() {<br />
System.out.println("destroy 销毁方法执行了");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

init方法：初始化方法。web服务器启动时自动创建Filter过滤器对象，创建过滤器对象时自动调用init初始化方法，只会被调用一次

doFilter方法：每一次拦截到请求之后都会被调用，所以会被调用多次，每拦截一次就调用一次

destroy方法：销毁方法。关闭服务器时会自动调用destroy，只会被调用一次

在启动类上添加注解@ServletComponentScan开启SpringBoot项目对Servlet组件的支持：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@ServletComponentScan<br />
@SpringBootApplication<br />
public class TliasWebManagementApplication {<br />
<br />
public static void main(String[] args) {<br />
SpringApplication.run(TliasWebManagementApplication.class, args);<br />
}<br />
<br />
}</td>
</tr>
</tbody>
</table>

在浏览器请求一个路径，控制台可以看到相关信息就表示成功。

*在过滤器Filter中，如果不执行放行操作，将无法访问后面的资源。 放行操作：chain.doFilter(request, response);*

**8.1.3.2 Filter详解**

**执行流程**：

<img src=".assets/JavaWeb-知识库笔记/media/image114.png" style="width:5.75in;height:1.84375in" />

当拦截到一个请求后，要有FilterChain对象当中的doFilter()方法放行，放行后执行相应的逻辑，逻辑执行完毕后会到doFilter方法中执行放行后的逻辑，如果放行后没有逻辑，就结束方法响应。

**拦截路径**：

|              |               |                                    |
|--------------|---------------|------------------------------------|
| 拦截路径     | urlPatterns值 | 含义                               |
| 拦截具体路径 | /login        | 只有访问 /login 路径时，才会被拦截 |
| 目录拦截     | /emps/\*      | 访问/emps下的所有资源，都会被拦截  |
| 拦截所有     | /\*           | 访问所有资源，都会被拦截           |

**过滤器链**：

在一个web应用程序当中，可以配置多个过滤器，多个过滤器就形成了一个过滤器链：

<img src=".assets/JavaWeb-知识库笔记/media/image115.png" style="width:5.75in;height:1.875in" />

接收到请求后，先执行Filter1的放行前逻辑和放行，放行后进入Fileter2拦截器，执行相应逻辑后放行，执行完路径的逻辑后先返回到Filter2逻辑中，Filter2中剩余逻辑执行完毕后再执行Filter1中的逻辑。

*以注解方式配置的Filter过滤器执行优先级是按过滤器的类名自动排序确定的，类名排名越靠前，优先级越高，例如AFilter和BFilter会先执行AFilter。*

**8.1.4 拦截器Interceptor**

拦截器：Spring框架中提供的一种动态拦截方法调用的机制，类似于过滤器。

拦截器会拦截前端的请求，判断用户是否有JWT令牌且令牌是否合法，再决定是放行还是执行其他操作。

**8.1.4.1 快速入门**

**自定义拦截器**：

实现HandlerInterceptor接口，并重写其所有方法

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//自定义拦截器<br />
@Component<br />
public class LoginCheckInterceptor implements HandlerInterceptor {<br />
//目标资源方法执行前执行。 返回true：放行 返回false：不放行<br />
@Override<br />
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {<br />
System.out.println("preHandle .... ");<br />
<br />
return true; //true表示放行<br />
}<br />
<br />
//目标资源方法执行后执行<br />
@Override<br />
public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {<br />
System.out.println("postHandle ... ");<br />
}<br />
<br />
//视图渲染完毕后执行，最后执行<br />
@Override<br />
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {<br />
System.out.println("afterCompletion .... ");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

preHandle方法：目标资源方法执行前执行。 返回true：放行 返回false：不放行

postHandle方法：目标资源方法执行后执行，请求资源执行完毕后执行

afterCompletion方法：视图渲染完毕后执行，最后执行

**注册配置拦截器**：

实现WebMvcConfigurer接口，并重写addInterceptors方法

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration<br />
public class WebConfig implements WebMvcConfigurer {<br />
<br />
//自定义的拦截器对象<br />
@Autowired<br />
private LoginCheckInterceptor loginCheckInterceptor;<br />
<br />
<br />
@Override<br />
public void addInterceptors(InterceptorRegistry registry) {<br />
//注册自定义拦截器对象<br />
registry.addInterceptor(loginCheckInterceptor).addPathPatterns("/**");//设置拦截器拦截的请求路径（ /** 表示拦截所有请求）<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**8.1.4.2 Interceptor详解**

**拦截路径**

addPathPatterns("要拦截路径")指定要拦截哪些路径；excludePathPatterns("不拦截路径")指定哪些路径不需要拦截

|             |                      |                                                     |
|-------------|----------------------|-----------------------------------------------------|
| 拦截路径    | 含义                 | 举例                                                |
| /\*         | 一级路径             | 能匹配/depts，/emps，/login，不能匹配 /depts/1      |
| /\*\*       | 任意级路径           | 能匹配/depts，/depts/1，/depts/1/2                  |
| /depts/\*   | /depts下的一级路径   | 能匹配/depts/1，不能匹配/depts/1/2，/depts          |
| /depts/\*\* | /depts下的任意级路径 | 能匹配/depts，/depts/1，/depts/1/2，不能匹配/emps/1 |

**执行流程**

<img src=".assets/JavaWeb-知识库笔记/media/image116.png" style="width:5.75in;height:1.96875in" />

浏览器发送一个请求后，先被Filter过滤器拦截，Filter过滤器执行放行前逻辑并放行，此时进入Spring环境要访问controller

由于Tomcat识别Servlet而不识别controller，所以请求会先到DispatcherServlet（前端控制器），再将请求转给Controller

拦截器此时会拦截请求执行preHandle()方法，如果返回true，就放行执行相关业务逻辑，执行后执行postHandle()方法和afterCompletion() 方法，如果返回false，就不放行

*返回false，postHandle()方法不执行，但是afterCompletion()方法不受影响。*

然后返回给DispatcherServlet，执行Filter中剩余内容，最后响应数据

**过滤器和拦截器之间的区别**

接口规范不同：过滤器需要实现Filter接口，而拦截器需要实现HandlerInterceptor接口

拦截范围不同：过滤器Filter会拦截所有的资源，而Interceptor只会拦截Spring环境中的资源

**8.2 异常处理**

当没有做任何异常处理时，三层架构处理异常的方案：

Mapper接口出错了，此时异常会往上抛(谁调用Mapper就抛给谁)，会抛给service

service 中也存在异常了，会抛给controller

而在controller当中，没有做任何的异常处理，所以最终异常会再往上抛。最终抛给框架之后，框架就会返回一个JSON格式的数据，里面封装的就是错误的信息，但是框架返回的JSON格式的数据并不符合开发规范

<img src=".assets/JavaWeb-知识库笔记/media/image117.png" style="width:5.75in;height:2.44792in" />

**解决方案**

方案一：在所有Controller的所有方法中进行try…catch处理

缺点：代码臃肿（不推荐）

方案二：全局异常处理器

好处：简单、优雅（推荐）

**全局异常处理器**

定义一个类，在类上加上@RestControllerAdvice注解表示定义一个全局异常处理器，然后在这个类中定义一个方法处理异常，方法加上@ExceptionHandler注解，并通过value属性指定捕获异常的类型：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestControllerAdvice<br />
public class GlobalExceptionHandler {<br />
<br />
//处理异常<br />
@ExceptionHandler(Exception.class) //指定能够处理的异常类型<br />
public Result ex(Exception e){<br />
e.printStackTrace();//打印堆栈中的异常信息<br />
<br />
//捕获到异常之后，响应一个标准的Result<br />
return Result.error("对不起,操作失败,请联系管理员");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

*@RestControllerAdvice = @ControllerAdvice + @ResponseBody，处理异常的方法返回值会转换为json后再响应给前端*

**十五、事务&AOP**

以后得案例均基于SpringBootWeb案例进行讲解，参考[SpringBootWeb综合案例](https://mcnerzykwkel.feishu.cn/docx/EnGwdtISUowewtxoH6GcOBcsnCP?from=from_copylink)。

**1.事务管理**

**1.1 Spring事务管理**

事务：一组操作的集合，是一个不可分割的工作单位，所有操作要么全部成功，要么一个也不执行。

事务的操作主要有三步：

开启事务（一组操作开始前，开启事务）：start transaction / begin

提交事务（这组操作全部成功后，提交事务）：commit

回滚事务（中间任何一个操作出现异常，回滚事务）：rollback

**1.1.1 案例**

解散部门：不仅删除部门，还要删除部门下的员工。

此时DeptServiceImpl的代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
@Service<br />
public class DeptServiceImpl implements DeptService {<br />
@Autowired<br />
private DeptMapper deptMapper;<br />
<br />
@Autowired<br />
private EmpMapper empMapper;<br />
<br />
<br />
//根据部门id，删除部门信息及部门下的所有员工<br />
@Override<br />
public void delete(Integer id){<br />
//根据部门id删除部门信息<br />
deptMapper.deleteById(id);<br />
<br />
//模拟：异常发生<br />
int i = 1/0;<br />
<br />
//删除部门下的所有员工信息<br />
empMapper.deleteByDeptId(id);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

如果没有异常发生，结果正确，但是出现了异常ArithmeticException，所以删除员工的逻辑不会执行，出现不一致现象。

**1.1.2 Transactional注解**

@Transactional作用：在当前这个方法执行之前开启事务，方法执行完毕后提交事务。如果执行过程出现异常就回滚事务。

@Transactional注解书写位置：

方法：当前方法交给spring进行事务管理

类：当前类中所有的方法都交由spring进行事务管理

接口：接口下所有的实现类当中所有的方法都交给spring 进行事务管理

在使用@Transactional注解之前需要在配置文件中开启事务管理日志：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
#spring事务管理日志<br />
logging:<br />
level:<br />
org.springframework.jdbc.support.JdbcTransactionManager: debug</td>
</tr>
</tbody>
</table>

*在案例中可以在delete方法上加上@Transactional注解解决数据不一致的现象。*

**1.2 事务进阶**

@Transactional注解当中有两个常见的属性：

异常回滚的属性：rollbackFor

事务传播行为：propagation

**1.2.1 rollbackFor**

在Spring的事务管理中，默认只有运行时异常 RuntimeException才会回滚，如果是手动抛出的异常（throw new Exception），事务不会回滚，而是直接提交。

如果还需要回滚指定类型的异常，可以通过rollbackFor属性来指定。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
@Transactional(rollbackFor=Exception.class)<br />
public void delete(Integer id){<br />
//根据部门id删除部门信息<br />
deptMapper.deleteById(id);<br />
<br />
//模拟：异常发生<br />
if(true){<br />
throw new Exception("出现异常了~~~");<br />
}<br />
<br />
//删除部门下的所有员工信息<br />
empMapper.deleteByDeptId(id);<br />
}</td>
</tr>
</tbody>
</table>

此时不论是RuntimeException还是手动抛出异常，都会进行回滚。

**1.2.2 propagation**

当一个事务方法被另一个事务方法调用，此时会出现事务的传播。例如，两个事务方法，A方法和B方法，在A方法当中又调用了B方法。

<img src=".assets/JavaWeb-知识库笔记/media/image118.png" style="width:5.75in;height:0.98958in" />

此时是事务B加入到事务A中还是新建一个事务B，就涉及到事务的传播行为，事务的传播行为由propagation属性决定：

|                  |                                                                    |
|------------------|--------------------------------------------------------------------|
| 属性值           | 含义                                                               |
| **REQUIRED**     | 【默认值】需要事务，有则加入，无则创建新事务                       |
| **REQUIRES_NEW** | 需要新事务，无论有无，总是创建新事务                               |
| SUPPORTS         | 支持事务，有则加入，无则在无事务状态中运行                         |
| NOT_SUPPORTED    | 不支持事务，在无事务状态下运行,如果当前存在已有事务,则挂起当前事务 |
| MANDATORY        | 必须有事务，否则抛异常                                             |
| NEVER            | 必须没事务，否则抛异常                                             |

**示例**：

删除部门时，不论是否删除成功，都要记录日志到deptLog表中。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
@Service<br />
//@Transactional //当前业务实现类中的所有的方法，都添加了spring事务管理机制<br />
public class DeptServiceImpl implements DeptService {<br />
@Autowired<br />
private DeptMapper deptMapper;<br />
<br />
@Autowired<br />
private EmpMapper empMapper;<br />
<br />
@Autowired<br />
private DeptLogService deptLogService;<br />
<br />
<br />
//根据部门id，删除部门信息及部门下的所有员工<br />
@Override<br />
@Log<br />
@Transactional(rollbackFor = Exception.class)<br />
public void delete(Integer id) throws Exception {<br />
try {<br />
//根据部门id删除部门信息<br />
deptMapper.deleteById(id);<br />
//模拟：异常<br />
if(true){<br />
throw new Exception("出现异常了~~~");<br />
}<br />
//删除部门下的所有员工信息<br />
empMapper.deleteByDeptId(id);<br />
}finally {<br />
//不论是否有异常，最终都要执行的代码：记录日志<br />
DeptLog deptLog = new DeptLog();<br />
deptLog.setCreateTime(LocalDateTime.now());<br />
deptLog.setDescription("执行了解散部门的操作，此时解散的是"+id+"号部门");<br />
//调用其他业务类中的方法<br />
deptLogService.insert(deptLog);<br />
}<br />
}<br />
<br />
//省略其他代码...<br />
}</td>
</tr>
</tbody>
</table>

当程序执行后，会有两个操作，即deleteById（删除部门）和insert（记录日志），deleteByDeptId（删除员工）永远执行不到，此时事务insert默认直接加入到事务delete中，所以遇到异常会直接回滚deleteById和insert，插入失败却没有记录日志。

可以在insert方法上添加@Transactional(propagation = Propagation.REQUIRES_NEW)控制事务的传递行为：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Service<br />
public class DeptLogServiceImpl implements DeptLogService {<br />
<br />
@Autowired<br />
private DeptLogMapper deptLogMapper;<br />
<br />
@Transactional(propagation = Propagation.REQUIRES_NEW) //事务传播行为：不论是否有事务，都新建事务<br />
@Override<br />
public void insert(DeptLog deptLog) {<br />
deptLogMapper.insert(deptLog);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

REQUIRES_NEW表示会新建一个事务insert，即使delete中遇到异常，事务insert只要不出错，就能提交从而记录日志。

**2.AOP基础**

**2.1 AOP概述**

AOP：面向切面编程、面向方面编程，即面向指定的一个或多个方法的编程。

现在需要统计业务层所有方法的执行时间进行优化，如果在每个方法前后都记录时间，相减得到运行时间会非常繁琐，此时就可以使用AOP设计一个模版方法，方法运行前记录开始时间，方法运行后记录结束时间，中间运行原始业务方法：

<img src=".assets/JavaWeb-知识库笔记/media/image119.png" style="width:5.75in;height:1.09375in" />

例如当需要运行list方法时，不会立即执行list，而是跳转到模版方法中执行：

记录方法运行开始时间

运行原始的业务方法（那此时原始的业务方法，就是 list 方法）

记录方法运行结束时间，计算方法执行耗时

*AOP是通过动态代理方式实现的。*

**2.2 AOP快速入门**

统计各个业务层方法执行耗时。

**pom.xml**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- AOP依赖 --&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-aop&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**AOP程序：TimeAspect**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Component<br />
@Aspect //当前类为切面类<br />
@Slf4j<br />
public class TimeAspect {<br />
<br />
@Around("execution(* com.itheima.service.*.*(..))")<br />
public Object recordTime(ProceedingJoinPoint pjp) throws Throwable {<br />
//记录方法执行开始时间<br />
long begin = System.currentTimeMillis();<br />
<br />
//执行原始方法<br />
Object result = pjp.proceed();<br />
<br />
//记录方法执行结束时间<br />
long end = System.currentTimeMillis();<br />
<br />
//计算方法执行耗时<br />
log.info(pjp.getSignature()+"执行耗时: {}毫秒",end-begin);<br />
<br />
return result; //返回值为原有方法返回值<br />
}<br />
}</td>
</tr>
</tbody>
</table>

AOP常见运用场景：

记录系统的操作日志

权限控制

事务管理：Spring事务管理底层是通过AOP实现的，只要添加@Transactional注解，AOP程序会自动在原始方法运行前开启事务，在原始方法运行后提交或回滚事务

**2.3 AOP核心概念**

**1. 连接点：JoinPoint**，可以被AOP控制的方法（暗含方法执行时的相关信息），入门程序当中所有业务方法都是连接点

<img src=".assets/JavaWeb-知识库笔记/media/image120.png" style="width:5.75in;height:5.01042in" />

**2. 通知：Advice**，指哪些重复的逻辑，也就是共性功能（最终体现为一个方法）

<img src=".assets/JavaWeb-知识库笔记/media/image121.png" style="width:5.75in;height:2.21875in" />

**3. 切入点：PointCut**，匹配连接点的条件，通知仅会在切入点方法执行时被应用

<img src=".assets/JavaWeb-知识库笔记/media/image122.png" style="width:5.75in;height:2.29167in" />

**4. 切面：Aspect**，描述通知与切入点的对应关系（通知+切入点）

<img src=".assets/JavaWeb-知识库笔记/media/image123.png" style="width:5.75in;height:2.77083in" />

切面所在的类，我们一般称为**切面类**（被@Aspect注解标识的类）

**5. 目标对象：Target**，通知所应用的对象

<img src=".assets/JavaWeb-知识库笔记/media/image124.png" style="width:5.75in;height:5.48958in" />

通知是如何与目标对象结合在一起，对目标对象当中的方法进行功能增强的？

<img src=".assets/JavaWeb-知识库笔记/media/image125.png" style="width:5.75in;height:2.6875in" />

答：Spring的AOP底层是基于动态代理技术来实现的，即在程序运行的时候，会自动的基于动态代理技术为目标对象生成一个对应的代理对象。在代理对象当中就会对目标对象当中的原始方法进行功能的增强。

**3.AOP进阶**

**3.1 通知类型**

@Around：环绕通知，此注解标注的通知方法在目标方法前、后都被执行

@Before：前置通知，此注解标注的通知方法在目标方法前被执行

@After：后置通知，此注解标注的通知方法在目标方法后被执行，无论是否有异常都会执行

@AfterReturning： 返回后通知，此注解标注的通知方法在目标方法后被执行，有异常不会执行

@AfterThrowing： 异常后通知，此注解标注的通知方法发生异常后执行

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
@Component<br />
@Aspect<br />
public class MyAspect1 {<br />
<br />
//切入点方法（公共的切入点表达式）<br />
@Pointcut("execution(* com.itheima.service.*.*(..))")<br />
private void pt(){<br />
<br />
}<br />
<br />
//前置通知（引用切入点）<br />
@Before("pt()")<br />
public void before(JoinPoint joinPoint){<br />
log.info("before ...");<br />
<br />
}<br />
<br />
//环绕通知<br />
@Around("pt()")<br />
public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {<br />
log.info("around before ...");<br />
<br />
//调用目标对象的原始方法执行<br />
Object result = proceedingJoinPoint.proceed();<br />
//原始方法在执行时：发生异常<br />
//后续代码不在执行<br />
<br />
log.info("around after ...");<br />
return result;<br />
}<br />
<br />
//后置通知<br />
@After("pt()")<br />
public void after(JoinPoint joinPoint){<br />
log.info("after ...");<br />
}<br />
<br />
//返回后通知（程序在正常执行的情况下，会执行的后置通知）<br />
@AfterReturning("pt()")<br />
public void afterReturning(JoinPoint joinPoint){<br />
log.info("afterReturning ...");<br />
}<br />
<br />
//异常通知（程序在出现异常的情况下，执行的后置通知）<br />
@AfterThrowing("pt()")<br />
public void afterThrowing(JoinPoint joinPoint){<br />
log.info("afterThrowing ...");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

*切入点方法：将重复的切入点表达式抽取出来，放在自定义方法的注解@Pointcut上，需要使用时可以通过方法名调用，例如：*

*@Before("pt()")相当于@Before("execution(\* com.itheima.service.\*.\*(..))")。*

*如果要在其他类中使用pt()这个切入点表达式，需要使用全类名.方法名()（权限修饰符要支持），例如：*

*@Before("com.itheima.aspect.MyAspect1.pt()")。*

程序发生异常的情况下：

@AfterReturning标识的通知方法不会执行，@AfterThrowing标识的通知方法会执行

@Around环绕通知中原始方法调用时有异常，通知中的环绕后的代码逻辑也不会执行（因为原始方法调用已经出异常了）

使用通知时的注意事项：

@Around环绕通知需要自己调用 ProceedingJoinPoint.proceed() 让原始方法执行，其他通知不需要考虑目标方法执行

@Around环绕通知方法的返回值，必须指定为Object，来接收原始方法的返回值，否则原始方法执行完毕，是获取不到返回值的

**3.2 通知顺序**

同一个切面类中，通知的执行顺序：

目标方法前的通知方法：@Around、@Before

目标方法后的通知方法：@AfterReturning \| @AfterThrowing、@After、@Around

在不同切面类中，同类型通知默认按照切面类的类名字母排序：

目标方法前的通知方法：字母排名靠前的先执行

目标方法后的通知方法：字母排名靠前的后执行

如果我们想控制通知的执行顺序有两种方式：

修改切面类的类名（这种方式非常繁琐、而且不便管理）

使用Spring提供的@Order注解：例如@Order(2)

前置通知：数字越小先执行

后置通知：数字越小越后执行

**3.3 切入点表达式**

切入点表达式：描述切入点方法的一种表达式，主要用来决定项目中的哪些方法需要加入通知。

常见形式：

execution(……)：根据方法的签名来匹配

@annotation(……) ：根据注解匹配

**3.3.1 execution**

execution主要根据方法的返回值、包名、类名、方法名、方法参数等信息来匹配，语法为：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
execution(访问修饰符? 返回值 包名.类名.?方法名(方法参数) throws 异常?)</td>
</tr>
</tbody>
</table>

其中带?的表示可以省略的部分

访问修饰符：可省略（比如: public、protected）

包名.类名：可省略

throws 异常：可省略（注意是方法上声明抛出的异常，不是实际抛出的异常）

示例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Before("execution(void com.itheima.service.impl.DeptServiceImpl.delete(java.lang.Integer))")</td>
</tr>
</tbody>
</table>

可以使用通配符描述切入点：

\* ：单个独立的任意符号，可以通配任意返回值、包名、类名、方法名、任意类型的一个参数，也可以通配包、类、方法名的一部分

.. ：多个连续的任意符号，可以通配任意层级的包，或任意类型、任意个数的参数

切入点表达式示例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//使用*代替包名（一层包使用一个*）<br />
execution(* com.itheima.*.*.DeptServiceImpl.delete(java.lang.Integer))<br />
//使用..省略包名<br />
execution(* com..DeptServiceImpl.delete(java.lang.Integer))<br />
//使用*代替方法名<br />
execution(* com..*.*(java.lang.Integer))<br />
//使用..省略参数<br />
execution(* com..*.*(..))<br />
//匹配DeptServiceImpl类中以find开头的方法<br />
execution(* com.itheima.service.impl.DeptServiceImpl.find*(..))</td>
</tr>
</tbody>
</table>

根据业务需要，可以使用 且（&&）、或（\|\|）、非（!） 来组合比较复杂的切入点表达式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
execution(* com.itheima.service.DeptService.list(..)) ||<br />
execution(* com.itheima.service.DeptService.delete(..))</td>
</tr>
</tbody>
</table>

切入点表达式的书写建议：

所有业务方法名在命名时尽量规范，方便切入点表达式快速匹配，如：查询类方法都是 find 开头，更新类方法都是update开头

描述切入点方法通常基于接口描述，而不是直接描述实现类，增强拓展性

在满足业务需要的前提下，尽量缩小切入点的匹配范围，如：包名匹配尽量不使用 ..，使用 \* 匹配单个包

**3.3.2 @annotation**

execution切入点表达式用来匹配多个无规则的方法，通过自定义注解给目标方法添加上自定义注解，就可以通过注解方便的匹配。

**实现步骤**：

自定义注解MyLog

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Target(ElementType.METHOD)<br />
@Retention(RetentionPolicy.RUNTIME)<br />
public @interface MyLog {<br />
}</td>
</tr>
</tbody>
</table>

给需要匹配的方法加上注解@MyLog

切面类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
@Component<br />
@Aspect<br />
public class MyAspect6 {<br />
//前置通知<br />
@Before("@annotation(com.itheima.anno.MyLog)") //自定义注解的全类名<br />
public void before(){<br />
log.info("MyAspect6 -&gt; before ...");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.4 连接点**

在Spring中用JoinPoint抽象了连接点，用它可以获得方法执行时的相关信息，如目标类名、方法名、方法参数等。

对于@Around通知，获取连接点信息只能使用ProceedingJoinPoint类型

对于其他四种通知，获取连接点信息只能使用JoinPoint，它是ProceedingJoinPoint的父类型

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Slf4j<br />
@Aspect<br />
@Component<br />
public class MyAspect8 {<br />
<br />
@Before("pt()")<br />
public void before(JoinPoint joinPoint){<br />
log.info("MyAspect8 ... before ...");<br />
}<br />
<br />
@Around("pt()")<br />
public Object around(ProceedingJoinPoint joinPoint) throws Throwable {<br />
log.info("MyAspect8 around before ...");<br />
<br />
//1. 获取 目标对象的类名 .<br />
String className = joinPoint.getTarget().getClass().getName();<br />
log.info("目标对象的类名:{}", className);<br />
<br />
//2. 获取 目标方法的方法名 .<br />
String methodName = joinPoint.getSignature().getName();<br />
log.info("目标方法的方法名: {}",methodName);<br />
<br />
//3. 获取 目标方法运行时传入的参数 .<br />
Object[] args = joinPoint.getArgs();<br />
log.info("目标方法运行时传入的参数: {}", Arrays.toString(args));<br />
<br />
//4. 放行 目标方法执行 .<br />
Object result = joinPoint.proceed();<br />
<br />
//5. 获取 目标方法运行的返回值 .<br />
log.info("目标方法运行的返回值: {}",result);<br />
<br />
log.info("MyAspect8 around after ...");<br />
return result;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

|                               |                                            |            |
|-------------------------------|--------------------------------------------|------------|
| 功能                          | 实现                                       | 返回值类型 |
| 获取 目标对象的类名           | joinPoint.getTarget().getClass().getName() | String     |
| 获取 目标方法的方法名         | joinPoint.getSignature().getName()         | String     |
| 获取 目标方法运行时传入的参数 | joinPoint.getArgs()                        | Object\[\] |
| 放行 目标方法执行             | joinPoint.proceed()                        | Object     |
| 获取 目标方法运行的返回值     | joinPoint.proceed()                        | Object     |

**3.5 AOP案例**

具体操作见[SpringBootWeb综合案例](https://mcnerzykwkel.feishu.cn/wiki/V2Fqw3KuvibaPekYkUycL3RwnUh)。

**十六、SpingBoot原理**

**1.配置优先级**

SpringBoot项目中有三种配置文件，分别是application.properties、application.yml和application.yaml，如果三个配置文件中配置了相同的属性，那么优先级为（从高到低）：

properties配置文件

yml配置文件（主流使用）

yaml配置文件

在SpringBoot中，还存在另外两种配置方式：

Java系统属性配置（格式： -Dkey=value），例如-Dserver.port=9000

命令行参数（格式：--key=value），例如--server.port=10010

<img src=".assets/JavaWeb-知识库笔记/media/image126.png" style="width:5.75in;height:3.95833in" />

*Springboot项目进行打包时，需要引入插件 spring-boot-maven-plugin (基于官网骨架创建项目，会自动添加该插件)*

如果项目已经打包上线，通过命令行方式设置Java系统属性和命令行参数：

执行maven打包指令package，把项目打成jar文件

<img src=".assets/JavaWeb-知识库笔记/media/image127.png" style="width:5.75in;height:3.22917in" />

在jar包所在文件夹下使用命令运行jar文件

通用命令：java -Dserver.port=9000 -jar XXXXX.jar --server.port=10010

示例：java -Dserver.port=9000 -jar demo1-0.0.1-SNAPSHOT.jar --server.port=10010

*可以使用java指令查看帮助文档*

*Ctrl+C结束jar包的执行*

*系统属性和命令行属性都是可选项，下一次重新运行jar包端口号是默认值8080*

可见，这5种属性配置的优先级为：命令行参数 \> 系统属性参数 \> properties参数 \> yml参数 \> yaml参数

**2.Bean管理**

**2.1 获取Bean**

在Spring启动时，会自动创建创建IOC容器。除了自动注入，还可以使用Spring提供的方法自动获取Bean对象：

方式一：根据name获取bean

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
Object getBean(String name)</td>
</tr>
</tbody>
</table>

方式二：根据类型获取bean

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
&lt;T&gt; T getBean(Class&lt;T&gt; requiredType)</td>
</tr>
</tbody>
</table>

方式三：根据name获取bean（带类型转换）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
&lt;T&gt; T getBean(String name, Class&lt;T&gt; requiredType)</td>
</tr>
</tbody>
</table>

IOC容器本身也可以是一个对象，可以通过自动注入的方式获取。

示例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Autowired<br />
private ApplicationContext applicationContext; //IOC容器对象<br />
<br />
//根据bean的名称获取<br />
DeptController bean1 = (DeptController) applicationContext.getBean("deptController");<br />
//根据bean的类型获取<br />
DeptController bean2 = applicationContext.getBean(DeptController.class);<br />
//根据bean的名称 及 类型获取<br />
DeptController bean3 = applicationContext.getBean("deptController", DeptController.class);</td>
</tr>
</tbody>
</table>

|                                                                                                                                                             |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **注意事项**：上述所说的 【Spring项目启动时，会把其中的bean都创建好】还会受到**作用域**及**延迟初始化**影响，这里主要针对于默认的单例非延迟加载的bean而言。 |

**2.2 Bean作用域**

在IOC容器中，默认bean对象是**单例模式**(只有一个实例对象)，可以通过设置Bean作用域改变成**非单例模式**。

在Spring中支持五种作用域，后三种在web环境才生效：

|             |                                                 |
|-------------|-------------------------------------------------|
| 作用域      | 说明                                            |
| singleton   | 容器内同名称的bean只有一个实例（单例）（默认）  |
| prototype   | 每次使用该bean时会创建新的实例（非单例）        |
| request     | 每个请求范围内会创建新的实例（web环境中，了解） |
| session     | 每个会话范围内会创建新的实例（web环境中，了解） |
| application | 每个应用范围内会创建新的实例（web环境中，了解） |

可以借助Spring中的@Scope注解来进行配置作用域：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Scope("prototype") //配置Bean对象作用域<br />
@Lazy //延迟创建时间<br />
@RestController<br />
@RequestMapping("/depts")<br />
public class DeptController{<br />
}</td>
</tr>
</tbody>
</table>

singleton：在容器启动时创建Bean，可以使用@Lazy注解延迟创建

@Lazy：延迟Bean对象的创建时间，当第一次使用这个Bean对象时才会创建，之后不再创建

prototype：每一次使用该bean的时候都会创建一个新的实例

*实际开发当中，绝大部分的Bean是单例的。*

**2.3 第三方Bean**

在引入的第三方依赖中如果有类需要创建实例到IOC容器中成为Bean对象，就不能通过简单的注解实现了，需要使用**@Bean**注解：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--Dom4j--&gt;<br />
&lt;!--这个依赖中有第三方写的SAXReader类--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.dom4j&lt;/groupId&gt;<br />
&lt;artifactId&gt;dom4j&lt;/artifactId&gt;<br />
&lt;version&gt;2.1.3&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**解决方案1：在启动类上添加@Bean标识的方法**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@SpringBootApplication<br />
public class SpringbootWebConfig2Application {<br />
public static void main(String[] args) {<br />
SpringApplication.run(SpringbootWebConfig2Application.class, args);<br />
}<br />
<br />
//声明第三方bean<br />
@Bean //将当前方法的返回值对象交给IOC容器管理, 成为IOC容器bean<br />
public SAXReader saxReader(){<br />
return new SAXReader();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

*由于项目中要保证启动类的纯粹性，所以上述方案不建议使用。*

**解决方案2：在配置类中定义@Bean标识的方法**

通常会单独定义一个配置类（通过@Configuration标识配置类）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration //配置类 (在配置类当中对第三方bean进行集中的配置管理)<br />
public class CommonConfig {<br />
//声明第三方bean<br />
@Bean //将当前方法的返回值对象交给IOC容器管理, 成为IOC容器bean<br />
//通过@Bean注解的name/value属性指定bean名称, 如果未指定, 默认是方法名<br />
public SAXReader reader(DeptService deptService){<br />
System.out.println(deptService);<br />
return new SAXReader();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

通过@Bean注解的name或value属性可以声明bean的名称，如果不指定，默认bean的名称就是方法名

如果第三方bean需要依赖其它bean对象，直接在bean定义方法中设置形参即可，容器会根据类型自动装配

**选择**：

如果是自定义的类，建议使用@Component及其衍生注解

如果是第三方提供的类，并需要将它加入Bean容器，建议使用配置类的@Bean标识方法

**3.SpringBoot原理**

Spring是目前世界上最流行的Java框架，可以帮助我们更加快速、更加容易的来构建Java项目。Spring家族中的所有框架均是基于最基础的框架SpringFramework(也就是Spring框架)。

Spring的繁琐体现在：

依赖配置比较繁琐：需要自己寻找到对应的依赖及它所配套的依赖以及对应版本，否则就会出现版本冲突

需要在配置文件中做大量配置，造成Spring框架入门难度大、学习成本高

SpringBoot框架就解决了这个问题，是因为它底层提供了两个非常重要的功能：**起步依赖**和**自动配置**。

**3.1 起步依赖**

起步依赖以springboot-starter开头或结尾，例如web开发的起步依赖springboot-starter-web，这个依赖下包含了web开发的常用依赖，只需要引入这一个依赖就可以引入大部分的依赖，大大降低了Spring开发的难度，解决了Spring依赖配置繁琐问题。

**起步依赖的原理就是Maven的依赖传递**。

**3.2 自动配置**

SpringBoot的自动配置就是当Spring容器启动后，一些配置类、bean对象就自动存入到了IOC容器中，不需要手动声明，从而简化了开发，省去了繁琐的配置操作。

<img src=".assets/JavaWeb-知识库笔记/media/image128.png" style="width:5.75in;height:1.1875in" />

*@Configuration注解的底层就是@Component，所以除了配置类中Bean外，还有一个Bean commonConfig。*

Bean对象gson的类型是com.google.gson.Gson，是谷歌中提供的用于处理JSON格式数据的类，这个Gson类是自动配置的。

分析自动配置原理就是解析在SpringBoot项目中引入依赖之后是如何将依赖jar包当中所定义的配置类以及bean加载到SpringIOC容器中的。

**3.2.1 组件扫描**

如果引入自定义第三方依赖，那第三方依赖中的包不会被扫描，以至于Bean对象中没有第三方中定义的Bean类。

**方案一**：

@ComponentScan组件扫描

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@SpringBootApplication<br />
// 指定要扫描的包, com.itheima是本项目的包, com.example是第三方依赖中的包<br />
@ComponentScan({"com.itheima","com.example"})<br />
public class SpringbootWebConfig2Application {<br />
public static void main(String[] args) {<br />
SpringApplication.run(SpringbootWebConfig2Application.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

*如果需要扫描的包很多，就会非常繁琐，所以SpringBoot并不采用这种方式。*

**方案二**：

@Import导入，有三种方式。

方式一：使用@Import导入普通类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Import(TokenParser.class) //导入的类会被Spring加载到IOC容器中<br />
@SpringBootApplication<br />
public class SpringbootWebConfig2Application {<br />
public static void main(String[] args) {<br />
SpringApplication.run(SpringbootWebConfig2Application.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

方式二：使用@Import导入配置类

配置类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration //配置类<br />
public class HeaderConfig {<br />
@Bean<br />
public HeaderParser headerParser(){<br />
return new HeaderParser();<br />
}<br />
<br />
@Bean<br />
public HeaderGenerator headerGenerator(){<br />
return new HeaderGenerator();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

启动类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Import(HeaderConfig.class) //导入配置类<br />
@SpringBootApplication<br />
public class SpringbootWebConfig2Application {<br />
public static void main(String[] args) {<br />
SpringApplication.run(SpringbootWebConfig2Application.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

方式三：使用@Import导入ImportSelector接口实现类

ImportSelector接口实现类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class MyImportSelector implements ImportSelector {<br />
public String[] selectImports(AnnotationMetadata importingClassMetadata) {<br />
//返回值字符串数组（数组中封装了全限定名称的类）<br />
return new String[]{"com.example.HeaderConfig"};<br />
}<br />
}</td>
</tr>
</tbody>
</table>

启动类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Import(MyImportSelector.class) //导入ImportSelector接口实现类<br />
@SpringBootApplication<br />
public class SpringbootWebConfig2Application {<br />
public static void main(String[] args) {<br />
SpringApplication.run(SpringbootWebConfig2Application.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

当使用以上三种方式进行自动配置时，还要知道第三方依赖中有哪些配置类和哪些Bean对象，所以SpringBoot使用方案三，即使用第三方提供的@EnableXxxx注解，注解中封装的就是@Import注解。

**方案三**：

使用第三方依赖提供的 @EnableXxxxx 注解。

第三方依赖中提供的注解

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Retention(RetentionPolicy.RUNTIME)<br />
@Target(ElementType.TYPE)<br />
@Import(MyImportSelector.class) //指定要导入哪些bean对象或配置类<br />
public @interface EnableHeaderConfig {<br />
}</td>
</tr>
</tbody>
</table>

在使用时只需在启动类上加上@EnableXxxxx注解即可

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@EnableHeaderConfig //使用第三方依赖提供的Enable开头的注解<br />
@SpringBootApplication<br />
public class SpringbootWebConfig2Application {<br />
public static void main(String[] args) {<br />
SpringApplication.run(SpringbootWebConfig2Application.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.2.2 原理分析**

**3.2.2.1 源码分析**

<img src=".assets/JavaWeb-知识库笔记/media/image129.png" style="width:5.75in;height:1.59375in" />

<img src=".assets/JavaWeb-知识库笔记/media/image130.png" style="width:5.75in;height:2.05208in" />

自动配置原理源码入口就是@SpringBootApplication注解，在这个注解中封装了3个注解，分别是：

@SpringBootConfiguration：声明当前类是一个配置类

@ComponentScan：进行组件扫描（SpringBoot中默认扫描的是启动类所在包及其子包）

@EnableAutoConfiguration：封装了@Import注解

Import注解中指定了一个ImportSelector接口的实现类AutoConfigurationImportSelector

在实现类中重写了selectImports()方法，读取当前项目下所有依赖jar包中META-INF/spring.factories、META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports两个文件里面定义的配置类（配置类中定义了@Bean注解标识的方法）

当SpringBoot程序启动时，就会加载配置文件当中所定义的配置类，并将这些配置类信息(类的全限定名)封装到String类型的数组中，最终通过@Import注解将这些配置类全部加载到Spring的IOC容器中，交给IOC容器管理。

**3.2.2.2 @Conditional**

配置文件中的类不一定全部都在启动时加载到IOC容器中，他们符合@Conditional注解条件装配。

@Conditional注解：

作用：按照一定的条件进行判断，在满足给定条件后才会注册对应的bean对象到Spring的IOC容器中

位置：方法、类

@Conditional本身是一个父注解，派生出大量的子注解：

@ConditionalOnClass：判断环境中有没有对应字节码文件，有才注册bean到IOC容器

@ConditionalOnMissingBean：判断环境中有没有对应的bean(类型或名称)，没有才注册bean到IOC容器

@ConditionalOnProperty：判断配置文件中有没有对应属性和值，有才注册bean到IOC容器

**示例**：

@ConditionalOnClass注解

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration<br />
public class HeaderConfig {<br />
@Bean<br />
@ConditionalOnClass(name = "io.jsonwebtoken.Jwts") //环境中存在指定的这个类，才会将该bean加入IOC容器<br />
public HeaderParser headerParser() {<br />
return new HeaderParser();<br />
}<br />
//省略其他代码...<br />
}</td>
</tr>
</tbody>
</table>

@ConditionalOnMissingBean注解

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration<br />
public class HeaderConfig {<br />
@Bean<br />
@ConditionalOnMissingBean //不存在该类型的bean，才会将该bean加入IOC容器<br />
@ConditionalOnMissingBean(name="deptController2") //不存在指定名称的bean，才会将该bean加入IOC容器<br />
public HeaderParser headerParser(){<br />
return new HeaderParser();<br />
}<br />
//省略其他代码...<br />
}</td>
</tr>
</tbody>
</table>

*如果环境中存在指定类型或该类型的bean，会引发NoSuchBeanDefinitionException异常*

@ConditionalOnProperty注解（这个注解和配置文件当中配置的属性有关系）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration<br />
public class HeaderConfig {<br />
@Bean<br />
//配置文件properties或yml或yaml中存在指定属性名与值，才会将bean加入IOC容器<br />
@ConditionalOnProperty(name ="name",havingValue = "itheima")<br />
public HeaderParser headerParser(){<br />
return new HeaderParser();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

*如果环境中不存在指定属性名与值，会引发NoSuchBeanDefinitionException异常*

**3.3 案例**

**3.3.1 问题引入**

实际开发中，有些依赖配置起来非常麻烦，因为官方没有提供相应的starter起步依赖，如OSS，这个时候需要手动配置起步依赖简化开发。

SpringBoot官方starter命名： spring-boot-starter-xxxx

第三组织提供的starter命名： xxxx-spring-boot-starter

**3.3.2 思路分析**

需求：自定义aliyun-oss-spring-boot-starter，完成阿里云OSS操作工具类AliyunOSSUtils的自动配置。

在自定义一个起步依赖starter的时候，按照规范需要定义两个模块：

starter模块：依赖管理，把程序开发所需要的依赖都定义在starter起步依赖中

autoconfigure模块：自动配置，定义自动配置的相关Bean类

*实际只引入starter起步依赖就可以，自动配置依赖会被传递下来*

**3.3.3 代码实现**

第一步：创建**自定义starter模块**（进行依赖管理），把阿里云OSS所有的依赖统一管理起来：

aliyun-oss-spring-boot-starter模块

<img src=".assets/JavaWeb-知识库笔记/media/image131.png" style="width:5.75in;height:3.69792in" />

删除多余的文件，最终保留内容如下：

<img src=".assets/JavaWeb-知识库笔记/media/image132.png" style="width:5.75in;height:0.48958in" />

删除pom.xml文件中多余的内容后：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;?xml version="1.0" encoding="UTF-8"?&gt;<br />
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"<br />
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"<br />
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0<br />
https://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
&lt;parent&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;<br />
&lt;version&gt;2.7.5&lt;/version&gt;<br />
&lt;relativePath/&gt; &lt;!-- lookup parent from repository --&gt;<br />
&lt;/parent&gt;<br />
&lt;groupId&gt;com.aliyun.oss&lt;/groupId&gt;<br />
&lt;artifactId&gt;aliyun-oss-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;<br />
&lt;properties&gt;<br />
&lt;java.version&gt;11&lt;/java.version&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

第二步：**创建autoconfigure模块**，在starter中引入autoconfigure （我们使用时只需要引入starter起步依赖即可）

aliyun-oss-spring-boot-autoconfigure模块：

<img src=".assets/JavaWeb-知识库笔记/media/image133.png" style="width:5.75in;height:3.53125in" />

创建完starter模块后，删除多余的文件，最终保留内容如下：

<img src=".assets/JavaWeb-知识库笔记/media/image134.png" style="width:5.75in;height:1.625in" />

删除pom.xml文件中多余的内容后：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;?xml version="1.0" encoding="UTF-8"?&gt;<br />
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"<br />
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"<br />
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0<br />
https://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
&lt;parent&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;<br />
&lt;version&gt;2.7.5&lt;/version&gt;<br />
&lt;relativePath/&gt; &lt;!-- lookup parent from repository --&gt;<br />
&lt;/parent&gt;<br />
<br />
&lt;groupId&gt;com.aliyun.oss&lt;/groupId&gt;<br />
&lt;artifactId&gt;aliyun-oss-spring-boot-autoconfigure&lt;/artifactId&gt;<br />
&lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;<br />
&lt;properties&gt;<br />
&lt;java.version&gt;11&lt;/java.version&gt;<br />
&lt;/properties&gt;<br />
&lt;dependencies&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

在**starter模块**中来引入autoconfigure这个模块：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--引入autoconfigure模块--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.aliyun.oss&lt;/groupId&gt;<br />
&lt;artifactId&gt;aliyun-oss-spring-boot-autoconfigure&lt;/artifactId&gt;<br />
&lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

第三步：**在autoconfigure中完成自动配置**，定义一个自动配置类配置bean，定义配置文件存放IOC容器中的对象类型

在autoconfigure模块当中来完成自动配置操作

pom文件引入需要使用的依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--引入web起步依赖--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--Lombok--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.projectlombok&lt;/groupId&gt;<br />
&lt;artifactId&gt;lombok&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--阿里云OSS--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.aliyun.oss&lt;/groupId&gt;<br />
&lt;artifactId&gt;aliyun-sdk-oss&lt;/artifactId&gt;<br />
&lt;version&gt;3.15.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;javax.xml.bind&lt;/groupId&gt;<br />
&lt;artifactId&gt;jaxb-api&lt;/artifactId&gt;<br />
&lt;version&gt;2.3.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;javax.activation&lt;/groupId&gt;<br />
&lt;artifactId&gt;activation&lt;/artifactId&gt;<br />
&lt;version&gt;1.1.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!-- no more than 2.3.3--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.glassfish.jaxb&lt;/groupId&gt;<br />
&lt;artifactId&gt;jaxb-runtime&lt;/artifactId&gt;<br />
&lt;version&gt;2.3.3&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

AliOSSProperties类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
/*阿里云OSS相关配置*/<br />
@Data<br />
@ConfigurationProperties(prefix = "aliyun.oss")<br />
public class AliOSSProperties {<br />
//区域<br />
private String endpoint;<br />
//身份ID<br />
private String accessKeyId ;<br />
//身份密钥<br />
private String accessKeySecret ;<br />
//存储空间<br />
private String bucketName;<br />
}</td>
</tr>
</tbody>
</table>

AliOSSUtils类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Data<br />
public class AliOSSUtils {<br />
private AliOSSProperties aliOSSProperties;<br />
<br />
/**<br />
* 实现上传图片到OSS<br />
*/<br />
public String upload(MultipartFile multipartFile) throws IOException {<br />
// 获取上传的文件的输入流<br />
InputStream inputStream = multipartFile.getInputStream();<br />
<br />
// 避免文件覆盖<br />
String originalFilename = multipartFile.getOriginalFilename();<br />
String fileName = UUID.randomUUID().toString() +<br />
originalFilename.substring(originalFilename.lastIndexOf("."));<br />
<br />
//上传文件到 OSS<br />
OSS ossClient = new OSSClientBuilder().build(aliOSSProperties.getEndpoint(),<br />
aliOSSProperties.getAccessKeyId(),<br />
aliOSSProperties.getAccessKeySecret());<br />
ossClient.putObject(aliOSSProperties.getBucketName(), fileName, inputStream);<br />
<br />
//文件访问路径<br />
String url =aliOSSProperties.getEndpoint().split("//")[0] +<br />
"//" + aliOSSProperties.getBucketName() + "." +<br />
aliOSSProperties.getEndpoint().split("//")[1] + "/" + fileName;<br />
<br />
// 关闭ossClient<br />
ossClient.shutdown();<br />
return url;// 把上传到oss的路径返回<br />
}<br />
}</td>
</tr>
</tbody>
</table>

AliOSSAutoConfiguration自动配置类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration//当前类为Spring配置类<br />
@EnableConfigurationProperties(AliOSSProperties.class) //导入AliOSSProperties类，并交给SpringIOC管理<br />
public class AliOSSAutoConfiguration {<br />
//创建AliOSSUtils对象，并交给SpringIOC容器<br />
@Bean<br />
public AliOSSUtils aliOSSUtils(AliOSSProperties aliOSSProperties){<br />
AliOSSUtils aliOSSUtils = new AliOSSUtils();<br />
aliOSSUtils.setAliOSSProperties(aliOSSProperties);<br />
return aliOSSUtils;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

在aliyun-oss-spring-boot-autoconfigure模块中的resources下，新建自动配置文件

META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
com.aliyun.oss.AliOSSAutoConfiguration</td>
</tr>
</tbody>
</table>

最终项目结构如下：

<img src=".assets/JavaWeb-知识库笔记/media/image135.png" style="width:5.75in;height:1.92708in" />

**3.3.4 测试**

新建一个SpringBoot项目并引入阿里云starter依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--引入阿里云OSS起步依赖--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.aliyun.oss&lt;/groupId&gt;<br />
&lt;artifactId&gt;aliyun-oss-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

在yml配置文件中配置阿里云OSS配置参数信息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
#配置阿里云OSS参数<br />
aliyun:<br />
oss:<br />
endpoint: https://oss-cn-shanghai.aliyuncs.com<br />
accessKeyId: [REDACTED]<br />
accessKeySecret: [REDACTED]<br />
bucketName: web-framework01</td>
</tr>
</tbody>
</table>

在测试类中编写测试代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
public class UploadController {<br />
@Autowired<br />
private AliOSSUtils aliOSSUtils;<br />
<br />
@PostMapping("/upload")<br />
public String upload(MultipartFile image) throws Exception {<br />
//上传文件到阿里云 OSS<br />
String url = aliOSSUtils.upload(image);<br />
return url;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

用postman工具进行文件上传，查看是否上传成功。

**十七、Maven高级**

**1.分模块设计与开发**

对于一个大型的项目，往往是分成很多模块的，一个团队负责一个模块，每个模块都是独立的，例如电商项目就包含商品模块的功能、搜索模块的功能、购物车模块、订单模块、用户中心等等。

分模块设计就是将项目按照功能或结构拆分成若干个子模块，方便项目的管理维护、拓展，也方便模块间的相互调用、资源共享。

*分模块设计需要先针对模块功能进行设计，再进行编码，而不是先设计完项目再拆分。*

**1.1 案例**

**1.1.1 分析**

针对之前的tlias案例，可以实现分模块设计：

将pojo包下的实体类，抽取到一个maven模块中 tlias-pojo

将utils包下的工具类，抽取到一个maven模块中 tlias-utils

其他的业务代码，放在tlias-web-management这个模块中，在该模块中需要用到实体类pojo、工具类utils，直接引入对应的依赖即可

<img src=".assets/JavaWeb-知识库笔记/media/image136.png" style="width:5.75in;height:2.35417in" />

**1.1.2 实现**

创建maven模块tlias-pojo，存放实体类

创建一个正常的**Maven模块**（注意不是springboot项目），模块名tlias-pojo：

<img src=".assets/JavaWeb-知识库笔记/media/image137.png" style="width:5.75in;height:2.6875in" />

在 tlias-pojo 模块的pom.xml文件中引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependencies&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.projectlombok&lt;/groupId&gt;<br />
&lt;artifactId&gt;lombok&lt;/artifactId&gt;<br />
&lt;version&gt;1.18.24&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;</td>
</tr>
</tbody>
</table>

将原来案例项目 tlias-web-management 中的pojo包下的实体类，复制到tlias-pojo模块中：

<img src=".assets/JavaWeb-知识库笔记/media/image138.png" style="width:5.75in;height:2.23958in" />

删除原有案例项目tlias-web-management的pojo包，然后在pom.xml中引入tlias-pojo的依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.itheima&lt;/groupId&gt;<br />
&lt;artifactId&gt;tlias-pojo&lt;/artifactId&gt;<br />
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

创建Maven模块tlias-utils，存放相关工具类

创建一个正常的Maven模块，模块名tlias-utils：

<img src=".assets/JavaWeb-知识库笔记/media/image139.png" style="width:5.75in;height:2.44792in" />

在 tlias-utils 模块的pom.xml文件中引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependencies&gt;<br />
&lt;!--JWT令牌--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;io.jsonwebtoken&lt;/groupId&gt;<br />
&lt;artifactId&gt;jjwt&lt;/artifactId&gt;<br />
&lt;version&gt;0.9.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--阿里云OSS--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.aliyun.oss&lt;/groupId&gt;<br />
&lt;artifactId&gt;aliyun-sdk-oss&lt;/artifactId&gt;<br />
&lt;version&gt;3.15.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;javax.xml.bind&lt;/groupId&gt;<br />
&lt;artifactId&gt;jaxb-api&lt;/artifactId&gt;<br />
&lt;version&gt;2.3.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;javax.activation&lt;/groupId&gt;<br />
&lt;artifactId&gt;activation&lt;/artifactId&gt;<br />
&lt;version&gt;1.1.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!-- no more than 2.3.3--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.glassfish.jaxb&lt;/groupId&gt;<br />
&lt;artifactId&gt;jaxb-runtime&lt;/artifactId&gt;<br />
&lt;version&gt;2.3.3&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--WEB开发--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;version&gt;2.7.5&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.projectlombok&lt;/groupId&gt;<br />
&lt;artifactId&gt;lombok&lt;/artifactId&gt;<br />
&lt;version&gt;1.18.24&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;</td>
</tr>
</tbody>
</table>

将原来案例项目 tlias-web-management 中的utils包下的实体类，复制到tlias-utils模块中：

<img src=".assets/JavaWeb-知识库笔记/media/image140.png" style="width:5.75in;height:1.57292in" />

删除原有案例项目tlias-web-management的utils包，然后在pom.xml中引入tlias-utils的依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.itheima&lt;/groupId&gt;<br />
&lt;artifactId&gt;tlias-utils&lt;/artifactId&gt;<br />
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**2.继承与聚合**

**2.1 继承**

继承描述的是两个工程间的关系，与java中的继承相似，子工程可以继承父工程中的配置信息，常见于依赖关系的继承。

作用：简化依赖配置、统一管理依赖

实现：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;parent&gt;<br />
&lt;groupId&gt;...&lt;/groupId&gt;<br />
&lt;artifactId&gt;...&lt;/artifactId&gt;<br />
&lt;version&gt;...&lt;/version&gt;<br />
&lt;relativePath&gt;....&lt;/relativePath&gt;<br />
&lt;/parent&gt;</td>
</tr>
</tbody>
</table>

**2.1.1 继承关系**

Maven不支持多继承，一个maven项目只能继承一个父工程，默认所有的springboot项目都有一个统一的父工程spring-boot-starter-parent。

**2.1.1.1 分析**

在案例中，创建一个父工程 tlias-parent，配置lombok依赖，三个子工程继承这个父工程，就可以只配置一次lombok了。

<img src=".assets/JavaWeb-知识库笔记/media/image141.png" style="width:5.75in;height:2.20833in" />

**2.1.1.2 实现**

创建**maven模块** tlias-parent ，该工程为父工程，**设置打包方式pom**(默认jar)：

<img src=".assets/JavaWeb-知识库笔记/media/image142.png" style="width:5.75in;height:2.17708in" />

父工程pom文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;parent&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;<br />
&lt;version&gt;2.7.5&lt;/version&gt;<br />
&lt;relativePath/&gt; &lt;!-- lookup parent from repository --&gt;<br />
&lt;/parent&gt;<br />
<br />
&lt;groupId&gt;com.itheima&lt;/groupId&gt;<br />
&lt;artifactId&gt;tlias-parent&lt;/artifactId&gt;<br />
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;<br />
&lt;packaging&gt;pom&lt;/packaging&gt;</td>
</tr>
</tbody>
</table>

Maven打包方式：

jar：普通模块打包，springboot项目基本都是jar包（内嵌tomcat运行）

war：普通web程序打包，需要部署在外部的tomcat服务器中运行

pom：父工程或聚合工程，该模块不写代码，仅进行依赖管理

在子工程的pom.xml文件中，配置继承关系（以tlias-utils为例）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;parent&gt;<br />
&lt;groupId&gt;com.itheima&lt;/groupId&gt;<br />
&lt;artifactId&gt;tlias-parent&lt;/artifactId&gt;<br />
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;<br />
&lt;relativePath&gt;../tlias-parent/pom.xml&lt;/relativePath&gt;<br />
&lt;/parent&gt;<br />
<br />
&lt;artifactId&gt;tlias-utils&lt;/artifactId&gt;<br />
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;</td>
</tr>
</tbody>
</table>

在子工程中，配置了继承关系之后，坐标中的groupId是可以省略的，因为会自动继承父工程的

relativePath指定父工程的pom文件的相对位置（如果不指定，将从本地仓库/远程仓库查找该工程）

../ 代表的上一级目录

在父工程中配置各个工程共有的依赖（子工程会自动继承父工程的依赖）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependencies&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.projectlombok&lt;/groupId&gt;<br />
&lt;artifactId&gt;lombok&lt;/artifactId&gt;<br />
&lt;version&gt;1.18.24&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;</td>
</tr>
</tbody>
</table>

删除三个子工程中的lombok依赖。

*工程结构分为同级和层级，这个案例中父工程和子工程是同级的，实际开发中会先分好模块，子工程创建在父工程下。*

**2.1.2 版本锁定**

有时候，一小部分模块不是所有模块共有的，这时需要在每个需要的模块中配置这些依赖。而每个模块的同一个依赖要版本一致，如果版本变更，就要逐个修改，非常繁琐。

案例中tlias-web-management、tlias-web-system、tlias-web-report这三个子工程中，都使用到了jwt的依赖，但是tlias-pojo、tlias-utils中并不需要这个依赖，这时就要在三个子工程中逐个配置lombok依赖，后期版本更换很繁琐。

**2.1.2.1 介绍**

在maven中，可以在父工程的pom文件中通过 \<dependencyManagement\> 来统一管理依赖版本。

父工程：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--统一管理依赖版本--&gt;<br />
&lt;dependencyManagement&gt;<br />
&lt;dependencies&gt;<br />
&lt;!--JWT令牌--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;io.jsonwebtoken&lt;/groupId&gt;<br />
&lt;artifactId&gt;jjwt&lt;/artifactId&gt;<br />
&lt;version&gt;0.9.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;/dependencyManagement&gt;</td>
</tr>
</tbody>
</table>

子工程：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependencies&gt;<br />
&lt;!--JWT令牌--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;io.jsonwebtoken&lt;/groupId&gt;<br />
&lt;artifactId&gt;jjwt&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;</td>
</tr>
</tbody>
</table>

\<dependencyManagement\> 与 \<dependencies\> 的区别：

\<dependencies\> 是直接依赖，在父工程配置了依赖，子工程会直接继承下来

\<dependencyManagement\> 是统一管理依赖版本，不会直接依赖，还需要在子工程中引入所需依赖(无需指定\<version\>版本)

**属性配置**

通过自定义属性及属性引用的形式，可以在父工程中更方便地将依赖的版本号进行集中管理维护。

版本集中管理之后，我们要想修改依赖的版本，就只需要在父工程中自定义属性的位置，修改对应的属性值即可。

自定义属性：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;properties&gt;<br />
&lt;lombok.version&gt;1.18.24&lt;/lombok.version&gt;<br />
&lt;/properties&gt;</td>
</tr>
</tbody>
</table>

*属性名要见名知意，例如\<jjwt.version\>、\<aliyun.oss.version\>等。*

引用属性：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.projectlombok&lt;/groupId&gt;<br />
&lt;artifactId&gt;lombok&lt;/artifactId&gt;<br />
&lt;version&gt;${lombok.version}&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**2.2 聚合**

<img src=".assets/JavaWeb-知识库笔记/media/image143.png" style="width:5.75in;height:3.39583in" />

在案例中，tlias-web-management 模块的父工程是 tlias-parent，该模块又依赖了tlias-pojo、tlias-utils模块。

在项目打包时，maven会从本地仓库和远程仓库中寻找项目的所有父工程及依赖项的包，如果没有，就会出错。如果想要打包tlias-web-management模块，就需要先打包另外三个模块，很繁琐。

**2.2.1 介绍**

**聚合**：将多个模块组织成一个整体，同时进行项目的构建。

**聚合工程**：一个不具有业务功能的“空”工程（有且仅有一个pom文件），一般来说，**继承中的父工程与聚合关系中的聚合工程是同一个**。

**作用**：快速构建项目（无需根据依赖关系手动构建，直接在聚合工程上构建即可）

**2.2.2 实现**

在maven中，在聚合工程中通过 \<moudules\> 设置当前聚合工程所包含的子模块的名称。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--聚合其他模块--&gt;<br />
&lt;modules&gt;<br />
&lt;module&gt;../tlias-pojo&lt;/module&gt;<br />
&lt;module&gt;../tlias-utils&lt;/module&gt;<br />
&lt;module&gt;../tlias-web-management&lt;/module&gt;<br />
&lt;/modules&gt;</td>
</tr>
</tbody>
</table>

如果需要编译、打包、安装，只打包tlias-parent工程就可以了（执行package生存期），maven会自动打包所聚合的所有模块。

**2.3 继承与聚合对比**

**作用**

聚合用于快速构建项目

继承用于简化依赖配置、统一管理依赖

**相同点：**

聚合与继承的pom.xml文件打包方式均为pom，通常将两种关系制作到同一个pom文件中

聚合与继承均属于设计型模块，并无实际的模块内容

**不同点：**

聚合是在聚合工程中配置关系，聚合可以感知到参与聚合的模块有哪些

继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己

**3.私服**

**3.1 介绍**

私服是一种特殊的远程仓库，它是架设在局域网内的仓库服务，用来代理位于外部的中央仓库，用于解决团队内部的资源共享与资源同步问题。

依赖查找顺序：本地仓库 -\> 私服仓库 -\> 中央仓库

注意事项：往往一个项目/企业只需要一个私服就可以了。

<img src=".assets/JavaWeb-知识库笔记/media/image144.png" style="width:5.75in;height:2.375in" />

**3.2 资源上传与下载**

<img src=".assets/JavaWeb-知识库笔记/media/image145.png" style="width:5.75in;height:1.53125in" />

私服仓库说明：

RELEASE：存储自己开发的RELEASE发布版本的资源

SNAPSHOT：存储自己开发的SNAPSHOT发布版本的资源

Central：存储的是从中央仓库下载下来的依赖

项目版本说明：

RELEASE(发布版本)：功能趋于稳定、当前更新停止，可以用于发行的版本，存储在私服中的RELEASE仓库中

SNAPSHOT(快照版本)：功能不稳定、尚处于开发中的版本，即快照版本，存储在私服的SNAPSHOT仓库中

**第一步：设置私服的访问用户名/密码（在maven安装目录下的conf/settings.xml中的servers中配置）**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- 1. 配置私服认证信息（用户名/密码） --&gt;<br />
&lt;servers&gt;<br />
&lt;!-- RELEASE版本仓库认证 --&gt;<br />
&lt;server&gt;<br />
&lt;id&gt;maven-releases&lt;/id&gt; &lt;!-- 与pom.xml中distributionManagement的id一致 --&gt;<br />
&lt;username&gt;admin&lt;/username&gt; &lt;!--私服管理员用户名--&gt;<br />
&lt;password&gt;admin&lt;/password&gt; &lt;!--私服管理员密码--&gt;<br />
&lt;/server&gt;<br />
&lt;!-- SNAPSHOT版本仓库认证 --&gt;<br />
&lt;server&gt;<br />
&lt;id&gt;maven-snapshots&lt;/id&gt; &lt;!-- 与pom.xml中snapshotRepository的id一致 --&gt;<br />
&lt;username&gt;admin&lt;/username&gt;<br />
&lt;password&gt;admin&lt;/password&gt;<br />
&lt;/server&gt;<br />
&lt;/servers&gt;</td>
</tr>
</tbody>
</table>

**第二步：设置私服依赖下载的仓库组地址（在maven安装目录下的conf/settings.xml中的mirrors、profiles中配置）**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- 3. 配置镜像（优先从私服下载依赖） --&gt;<br />
&lt;mirrors&gt;<br />
&lt;mirror&gt;<br />
&lt;id&gt;maven-public&lt;/id&gt; &lt;!-- 镜像ID，与profile中的仓库ID一致 --&gt;<br />
&lt;mirrorOf&gt;*&lt;/mirrorOf&gt; &lt;!-- 代理所有仓库（包括中央仓库） --&gt;<br />
&lt;url&gt;http://192.168.150.101:8081/repository/maven-public/&lt;/url&gt; &lt;!--私服公共仓库组地址--&gt;<br />
&lt;/mirror&gt;<br />
&lt;/mirrors&gt;</td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- 2. 配置仓库镜像（代理中央仓库和私服） --&gt;<br />
&lt;profiles&gt;<br />
&lt;profile&gt;<br />
&lt;id&gt;allow-snapshots&lt;/id&gt; &lt;!-- 配置profile ID --&gt;<br />
&lt;activation&gt;<br />
&lt;activeByDefault&gt;true&lt;/activeByDefault&gt; &lt;!-- 默认激活此配置 --&gt;<br />
&lt;/activation&gt;<br />
&lt;repositories&gt;<br />
&lt;repository&gt;<br />
&lt;id&gt;maven-public&lt;/id&gt; &lt;!-- 仓库组ID，Nexus中默认的公共仓库组 --&gt;<br />
&lt;url&gt;http://192.168.150.101:8081/repository/maven-public/&lt;/url&gt; &lt;!--私服公共仓库组地址--&gt;<br />
&lt;releases&gt;<br />
&lt;enabled&gt;true&lt;/enabled&gt; &lt;!-- 启用RELEASE版本下载 --&gt;<br />
&lt;/releases&gt;<br />
&lt;snapshots&gt;<br />
&lt;enabled&gt;true&lt;/enabled&gt; &lt;!-- 启用SNAPSHOT版本下载 --&gt;<br />
&lt;/snapshots&gt;<br />
&lt;/repository&gt;<br />
&lt;/repositories&gt;<br />
&lt;/profile&gt;<br />
&lt;/profiles&gt;</td>
</tr>
</tbody>
</table>

**第三步：IDEA的maven工程的pom文件中配置上传（发布）地址(直接在tlias-parent中配置发布地址)**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!-- 配置项目发布到私服的地址 --&gt;<br />
&lt;distributionManagement&gt;<br />
&lt;!-- RELEASE版本发布地址（正式环境） --&gt;<br />
&lt;repository&gt;<br />
&lt;id&gt;maven-releases&lt;/id&gt; &lt;!-- 必须与settings.xml中的server id一致 --&gt;<br />
&lt;url&gt;http://192.168.150.101:8081/repository/maven-releases/&lt;/url&gt; &lt;!-- RELEASE仓库地址 --&gt;<br />
&lt;/repository&gt;<br />
&lt;!-- SNAPSHOT版本发布地址（开发环境） --&gt;<br />
&lt;snapshotRepository&gt;<br />
&lt;id&gt;maven-snapshots&lt;/id&gt; &lt;!-- 必须与settings.xml中的server id一致 --&gt;<br />
&lt;url&gt;http://192.168.150.101:8081/repository/maven-snapshots/&lt;/url&gt; &lt;!-- SNAPSHOT仓库地址 --&gt;<br />
&lt;/snapshotRepository&gt;<br />
&lt;/distributionManagement&gt;</td>
</tr>
</tbody>
</table>

**3.3 测试**

在tlias-parent中执行**deploy**生命周期，将项目发布到私服仓库中，成功后打开私服查看：

<img src=".assets/JavaWeb-知识库笔记/media/image146.png" style="width:5.75in;height:1.4375in" />

**3.4 私服获取**

解压：资料中提供的压缩包 apache-maven-nexus.zip

进入目录：apache-maven-nexus\nexus-3.39.0-01\bin

启动服务：双击 start.bat

访问服务：localhost:8081

私服配置说明：将上述配置私服信息的 192.168.150.101 改为 localhost
