# SpringCloud笔记

**一、认识微服务和项目导入**

**1.导入黑马商城项目**

导入黑马商城项目前需要有一台Linux虚拟机，并且已经在虚拟机中安装好了Docker，具体安装步骤这里不阐述。

**1.1 安装MySQL**

**\[mysql.zip\]**

将提供的mysql目录上传到虚拟机的/root目录下。如果/root目录已经有了mysql目录，就先删除旧的mysql目录，删除命令为：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
rm -rf /root/mysql</td>
</tr>
</tbody>
</table>

创建一个通用网络：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker network create hm-net</td>
</tr>
</tbody>
</table>

使用以下命令安装MySQL：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run -d \<br />
--name mysql \<br />
-p 3306:3306 \<br />
-e TZ=Asia/Shanghai \<br />
-e MYSQL_ROOT_PASSWORD=123 \<br />
-v /root/mysql/data:/var/lib/mysql \<br />
-v /root/mysql/conf:/etc/mysql/conf.d \<br />
-v /root/mysql/init:/docker-entrypoint-initdb.d \<br />
--network hm-net\<br />
mysql</td>
</tr>
</tbody>
</table>

**如果安装MySQL失败，可以将/etc/docker/daemon.json文件的镜像内容修改为**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"builder": {<br />
"gc": {<br />
"defaultKeepStorage": "20GB",<br />
"enabled": true<br />
}<br />
},<br />
"experimental": true,<br />
"features": {<br />
"buildkit": true<br />
},<br />
"insecure-registries": [<br />
"172.24.86.231"<br />
],<br />
"registry-mirrors": [<br />
"https://dockerproxy.com",<br />
"https://mirror.baidubce.com",<br />
"https://ccr.ccs.tencentyun.com",<br />
"https://docker.m.daocloud.io",<br />
"https://docker.nju.edu.cn",<br />
"https://docker.mirrors.ustc.edu.cn"<br />
],<br />
"log-driver":"json-file",<br />
"log-opts": {<br />
"max-size":"500m",<br />
"max-file":"3"<br />
}<br />
}</td>
</tr>
</tbody>
</table>

通过命令查看mysql容器是否正常安装运行：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker ps</td>
</tr>
</tbody>
</table>

最后，使用MySQL的客户端工具连接MySQL就可以看到如下内容：

<img src="../assets/SpringCloud笔记/media/image1.png" style="width:5.75in;height:1.67708in" />

**1.2 后端项目导入**

**\[hmall.zip\]**

使用idea打开提供的hmall黑马商城项目，并配置项目JDK版本为JDK11。

添加项目启动项服务：

<img src="../assets/SpringCloud笔记/media/image2.png" style="width:5.75in;height:1.375in" />

选择Spring Boot，点击后会在services中出现hmall的启动项：

<img src="../assets/SpringCloud笔记/media/image3.png" style="width:5.75in;height:1.19792in" />

可以看到项目配置文件有三个，其中application是主配置项，所有配置都在这里，application-dev是项目上线后使用的配置，application-local是开发环境为了测试使用的配置。

<img src="../assets/SpringCloud笔记/media/image4.png" style="width:5.75in;height:1.17708in" />

为了使idea识别加载application-local配置文件，需要对服务启动项做简单配置：

<img src="../assets/SpringCloud笔记/media/image5.png" style="width:5.75in;height:0.97917in" />

最后右键启动HMallApplication服务，在浏览器访问http://localhost:8080/hi，检测项目是否导入成功！

**1.3 前端Nginx启动**

**\[hmall-nginx.zip\]**

复制提供的hmall-nginx文件夹到没有中文的目录下，进入hmall-nginx，使用cmd启动Nginx：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 启动nginx<br />
start nginx.exe<br />
# 停止<br />
nginx.exe -s stop<br />
# 重新加载配置<br />
nginx.exe -s reload<br />
# 重启<br />
nginx.exe -s restart</td>
</tr>
</tbody>
</table>

|                                                                                                                         |
|-------------------------------------------------------------------------------------------------------------------------|
| **注意**：Nginx尽量不要双击启动，而是通过start命令启动，如果启动失败查看logs目录中的error.log日志，查看是否是端口冲突。 |

启动成功后，访问http://localhost:18080，就能看到黑马商城前端页面。

**2.认识微服务**

**2.1 单体架构**

单体架构就是整个项目中所有功能模块都在一个工程中开发，项目部署时需要对所有模块一起编译、打包，项目的架构设计、开发模式都非常简单：

<img src="../assets/SpringCloud笔记/media/image6.png" style="width:5.75in;height:1.30208in" />

一开始时项目基本都是单体架构，但随着业务逐渐复杂，功能逐渐增多，单体架构的缺点也就展现出来：

**团队协作成本高**：所有人集中开发同一个项目，不同模块间的物理边界慢慢模糊，最终合并模块到同一个分支很容易陷入冲突

**系统发布效率低**：任一模块变更都要发布整个系统，而各个模块间制约较多，任一处出现错误都会导致发布失败

**系统可用性差**：所有模块作为同一个服务部署，某个热点功能可能耗尽系统资源，导致其他服务低可用

**\[黑马商城测试.jmx\]**

例如，先访问http://localhost:8080/search/list，通过控制台查看访问耗时在30ms左右；然后通过jmeter执行提供的黑马商城测试.jmx模拟500个线程同时访问服务端；然后再次在浏览器访问http://localhost:8080/search/list，查看访问耗时达到了500ms。

最终会发现，/hi这个接口的并发消耗了服务端的资源，导致同一时间/search/list接口的访问性能收到了影响。

**2.2 微服务**

微服务架构的思想是服务化，即将单体架构中的功能模块从单体应用中拆分出来，独立部署为多个服务，同时要满足以下特点：

**单一职责**：一个微服务负责一部分业务功能，并且核心数据不依赖于其他模块

**团队自制**：每个微服务都有自己独立的开发、测试、发布、运维人员，团队人口规模不超过10人

**服务自治**：每个微服务都独立打包部署，访问自己独立的数据库，并做好服务隔离，避免对其它服务产生影响

例如，黑马商城项目就可以把商品、用户、购物车、交易等模块拆分，交给不同的团队开发，并独立部署：

<img src="../assets/SpringCloud笔记/media/image7.png" style="width:5.75in;height:2.27083in" />

将原有项目每个模块拆分为单个服务，仅1~3个人员就能开发，而且每个服务都有自己的服务器资源，即使变更只用打包部署该服务即可，并且不消耗其他服务资源，从而解决单体架构的各种问题。因此微服务特别适合大型互联网项目的开发。

*分布式就是服务拆分的过程，所以其实微服务架构就是分布式架构的一种最佳实践方案*

|                                                                                                                          |
|--------------------------------------------------------------------------------------------------------------------------|
| **注意**：往往开发初期都是使用单体架构，单体架构也足够实现各种中小型项目，随着项目规模逐渐扩大才会慢慢拆分为多个微服务。 |

**2.3 SpringCloud**

微服务虽然解决了单体架构的问题，但也引入了新的问题，比如跨服务业务的处理、请求访问哪个服务、服务间隔离的实现等，SpringCloud提供了各种组件解决各种问题，可以说SpringCloud框架是目前Java领域最全面的微服务组件的集合：

<img src="../assets/SpringCloud笔记/media/image8.png" style="width:5.75in;height:1.84375in" />

SpringCloud官网：

**\[该类型的内容暂不支持下载\]**

目前SpringCloud最新版本为2022.0.x版本，对应的SpringBoot版本为3.x版本，但它们全部依赖于JDK17，目前在企业中使用相对较少：

|                                                                                                                     |                                       |
|---------------------------------------------------------------------------------------------------------------------|---------------------------------------|
| SpringCloud版本                                                                                                     | SpringBoot版本                        |
| [2022.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes) aka Kilburn | 3.0.x                                 |
| [2021.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes) aka Jubilee | 2.6.x, 2.7.x (Starting with 2021.0.3) |
| [2020.0.x](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes) aka Ilford  | 2.4.x, 2.5.x (Starting with 2020.0.3) |
| [Hoxton](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-Hoxton-Release-Notes)               | 2.2.x, 2.3.x (Starting with SR5)      |
| [Greenwich](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes)              | 2.1.x                                 |
| [Finchley](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes)                | 2.0.x                                 |
| [Edgware](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes)                  | 1.5.x                                 |
| [Dalston](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes)                  | 1.5.x                                 |

另外，Alibaba的微服务产品SpringCloudAlibaba目前也成为了SpringCloud组件中的一员，课堂中也会使用其中的部分组件。

父工程hmall中已经配置了SpringCloud以及SpringCloudAlibaba的依赖，后续不用手动导入：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;spring-cloud.version&gt;2021.0.3&lt;/spring-cloud.version&gt;<br />
&lt;spring-cloud-alibaba.version&gt;2021.0.4.0&lt;/spring-cloud-alibaba.version&gt;<br />
<br />
&lt;!--spring cloud--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-dependencies&lt;/artifactId&gt;<br />
&lt;version&gt;${spring-cloud.version}&lt;/version&gt;<br />
&lt;type&gt;pom&lt;/type&gt;<br />
&lt;scope&gt;import&lt;/scope&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--spring cloud alibaba--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-alibaba-dependencies&lt;/artifactId&gt;<br />
&lt;version&gt;${spring-cloud-alibaba.version}&lt;/version&gt;<br />
&lt;type&gt;pom&lt;/type&gt;<br />
&lt;scope&gt;import&lt;/scope&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**二、微服务拆分**

接下来以黑马商城项目为例学习怎么进行微服务拆分。

**1.熟悉黑马商城**

**\[hmall.zip\]**

黑马商城项目的基本结构：

<img src="../assets/SpringCloud笔记/media/image9.png" style="width:5.75in;height:2.0625in" />

修改application-local.yaml中的数据库连接参数：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
hm:<br />
db:<br />
host: 192.168.150.101 # 修改为自己的虚拟机IP地址<br />
pw: 123 # 修改为docker中的MySQL密码</td>
</tr>
</tbody>
</table>

**1.1 登录**

登录业务流程如下：

<img src="../assets/SpringCloud笔记/media/image10.png" style="width:5.75in;height:2.23958in" />

通过浏览器访问http://localhost:18080/，单击登录按钮，输入用户名jack和密码123进行登录测试，登录成功：

<img src="../assets/SpringCloud笔记/media/image11.png" style="width:5.75in;height:0.97917in" />

登录入口在com.hmall.controller.UserController中的login方法。

**1.2 搜索商品**

在首页搜索框输入关键字，点击搜索即可进入搜索列表页面：

<img src="../assets/SpringCloud笔记/media/image12.png" style="width:5.75in;height:2.83333in" />

该页面会调用接口/search/list，对应的服务端入口在com.hmall.controller.SearchController中的search方法。

**1.3 购物车**

在搜索到的商品列表中，点击按钮加入购物车，即可将商品加入购物车：

<img src="../assets/SpringCloud笔记/media/image13.png" style="width:5.75in;height:1.84375in" />

加入成功后即可进入购物车列表页，查看自己购物车商品列表：

<img src="../assets/SpringCloud笔记/media/image14.png" style="width:5.75in;height:1.375in" />

查看数据库的cart表就能看到一条购物车记录，复制item_id字段（这里是8533120）并查询修改item表的price字段：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select * from item where id = 8533120;</td>
</tr>
</tbody>
</table>

<img src="../assets/SpringCloud笔记/media/image15.png" style="width:5.75in;height:1.10417in" />

刷新前端页面可以看到浏览器显示便宜了300：

<img src="../assets/SpringCloud笔记/media/image16.png" style="width:5.75in;height:1.07292in" />

之所以前端会显示便宜了多少，是因为查询购物车列表时还查询商品信息，获取商品最新价格和状态：

<img src="../assets/SpringCloud笔记/media/image17.png" style="width:5.75in;height:2.21875in" />

相关功能全部在com.hmall.controller.CartController中。当然，购物车还可以进行删除选中的商品、结算等操作。

**1.4 下单**

在购物车页面点击结算按钮，会进入订单结算页面：

<img src="../assets/SpringCloud笔记/media/image18.png" style="width:5.75in;height:2.375in" />

服务端会创建一个新的订单、扣减商品库存、清理购物车中商品，业务入口在com.hmall.controller.OrderController中的createOrder方法。

**1.5 支付**

下单完成后会跳转到支付页面，目前只支持余额支付，选择余额支付，输入密码123：

<img src="../assets/SpringCloud笔记/media/image19.png" style="width:5.75in;height:0.79167in" />

之后会发起请求到服务端，服务端会立刻创建一个支付流水单，并返回支付流水单号到前端，请求入口在com.hmall.controller.PayController中：

校验用户密码

扣减余额

修改支付流水状态

修改交易订单状态

数据库order、order_detail、pay_order表就会新增订单或支付数据，自行查看即可。

**2.服务拆分原则**

**2.1 什么时候拆**

对于**大多数小型项目**来说，一般是**先采用单体架构**，随着用户规模扩大、业务复杂**再逐渐拆分为微服务架构**。这样初期成本会比较低，可以快速试错。但是，后期做服务拆分可能会遇到很多代码耦合带来的问题，拆分比较困难（前易后难）。

而对于**一些大型项目**，在立项之初目的就很明确，为了长远考虑，在架构设计时就**直接选择微服务架构**。虽然前期投入较多，但后期就少了拆分服务的烦恼（前难后易）。

**2.2 怎么拆**

微服务拆分时**粒度要小**，包含两个角度：

**高内聚**：每个微服务的职责要尽量单一，包含的业务相互关联度高、完整度高

**低耦合**：每个微服务的功能要相对独立，尽量减少对其它微服务的依赖，或者依赖接口的稳定性要强

高内聚要保证单一职责，但不能一个微服务就一个接口，要修改某个业务只需要修改当前微服务即可，一旦微服务做到高内聚，耦合度自然就降低了。但是微服务间可能还会有相互的调用，这就需要被调用的微服务对外暴露接口，并保证接口的稳定性（即接口外观看起来不变）。

微服务的拆分方式分为两种：

**纵向拆分**：按照项目的功能模块进行拆分，例如黑马商城项目的用户管理模块、订单管理模块、购物车管理功能可以分别拆分为一个微服务

**横向拆分**：将各个功能模块间的公共业务部分抽取出来作为通用服务，例如用户登录、用户下单等都需要发送消息通知、记录风控数据，就可以将其拆分为消息中心服务、风控管理服务

微服务拆分项目有两种不同的工程结构：

**完全解耦**：每个微服务都创建为一个独立的工程，甚至可以用不同语言开发，项目完全解耦（外观上就是多个project）

优点：服务间耦合度低

缺点：每个项目都有自己独立的仓库，管理起来比较麻烦

**Maven聚合**：整个项目为一个Project，然后每个微服务是其中的一个Module

优点：项目代码集中，管理和运维方便

缺点：服务之间耦合，编译时间较长

|                                                                                               |
|-----------------------------------------------------------------------------------------------|
| **注意**：并不是完全解耦就一定好、Maven聚合就一定不好，实际开发需要根据需求自由选择工程结构。 |

这里使用纵向拆分将黑马商城拆分为多个微服务，并使用Maven聚合的工程结构：

用户服务

商品服务

订单服务

购物车服务

支付服务

**3.拆分购物车、商品服务**

**3.1 商品服务**

在hmall项目下新建一个item-service模块，并指定JDK版本为11：

<img src="../assets/SpringCloud笔记/media/image20.png" style="width:5.75in;height:2.47917in" />

从hm-service模块的pom文件中拷贝dependencies和build到item.service模块的pom文件，并删除不必要的依赖：

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
&lt;parent&gt;<br />
&lt;artifactId&gt;hmall&lt;/artifactId&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/parent&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;artifactId&gt;hm-service&lt;/artifactId&gt;<br />
<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;!--common--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-common&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--web--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--数据库--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;mysql&lt;/groupId&gt;<br />
&lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--mybatis--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.baomidou&lt;/groupId&gt;<br />
&lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;build&gt;<br />
&lt;finalName&gt;${project.artifactId}&lt;/finalName&gt;<br />
&lt;plugins&gt;<br />
&lt;plugin&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;<br />
&lt;/plugin&gt;<br />
&lt;/plugins&gt;<br />
&lt;/build&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

创建并编写启动项com.hmall.item.ItemApplication：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.item;<br />
<br />
import org.mybatis.spring.annotation.MapperScan;<br />
import org.springframework.boot.SpringApplication;<br />
import org.springframework.boot.autoconfigure.SpringBootApplication;<br />
<br />
@MapperScan("com.hmall.item.mapper")<br />
@SpringBootApplication<br />
public class ItemApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(ItemApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

拷贝hm-service模块的三个yaml配置文件到item-service，并修改某些配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8081<br />
spring:<br />
application:<br />
name: item-service<br />
profiles:<br />
active: dev<br />
datasource:<br />
url: jdbc:mysql://${hm.db.host}:3306/hm-item?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: root<br />
password: ${hm.db.pw}<br />
mybatis-plus:<br />
configuration:<br />
default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler<br />
global-config:<br />
db-config:<br />
update-strategy: not_null<br />
id-type: auto<br />
logging:<br />
level:<br />
com.hmall: debug<br />
pattern:<br />
dateformat: HH:mm:ss:SSS<br />
file:<br />
path: "logs/${spring.application.name}"<br />
knife4j:<br />
enable: true<br />
openapi:<br />
title: 商品服务接口文档<br />
description: "商品服务接口文档"<br />
email: zhanghuyi@itcast.cn<br />
concat: 虎哥<br />
url: https://www.itcast.cn<br />
version: v1.0.0<br />
group:<br />
default:<br />
group-name: default<br />
api-rule: package<br />
api-rule-resources:<br />
- com.hmall.item.controller</td>
</tr>
</tbody>
</table>

然后拷贝hm-service中与商品管理有关的代码到item-service：

<img src="../assets/SpringCloud笔记/media/image21.png" style="width:5.75in;height:3.23958in" />

这里有一个地方的代码需要改动，就是ItemServiceImpl中的deductStock方法：

<img src="../assets/SpringCloud笔记/media/image22.png" style="width:5.75in;height:0.71875in" />

然后在自己docker数据库连接客户端执行下面的hm-item.sql脚本，得到hm-item数据表。

**\[hm-item.sql\]**

最后刷新maven配置ItemApplication服务的激活配置为local：

<img src="../assets/SpringCloud笔记/media/image23.png" style="width:5.75in;height:1.32292in" />

启动ItemApplication服务，在浏览器访问http://localhost:8081/doc.html，测试根据id批量查询商品即可。

**3.2 购物车服务**

在hmall项目下新建一个cart-service模块，并制定JDK版本为11：

<img src="../assets/SpringCloud笔记/media/image24.png" style="width:5.75in;height:2.39583in" />

从hm-service模块的pom文件中拷贝dependencies和build到cart.service模块的pom文件，并删除不必要的依赖：

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
&lt;parent&gt;<br />
&lt;artifactId&gt;hmall&lt;/artifactId&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/parent&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;artifactId&gt;cart-service&lt;/artifactId&gt;<br />
<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;<br />
&lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;!--common--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-common&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--web--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--数据库--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;mysql&lt;/groupId&gt;<br />
&lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--mybatis--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.baomidou&lt;/groupId&gt;<br />
&lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;build&gt;<br />
&lt;finalName&gt;${project.artifactId}&lt;/finalName&gt;<br />
&lt;plugins&gt;<br />
&lt;plugin&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;<br />
&lt;/plugin&gt;<br />
&lt;/plugins&gt;<br />
&lt;/build&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

创建并编写启动项com.hmall.cart.CartApplication：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.cart;<br />
<br />
import org.mybatis.spring.annotation.MapperScan;<br />
import org.springframework.boot.SpringApplication;<br />
import org.springframework.boot.autoconfigure.SpringBootApplication;<br />
<br />
@MapperScan("com.hmall.cart.mapper")<br />
@SpringBootApplication<br />
public class CartApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(CartApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

拷贝hm-service模块的三个yaml配置文件到cart-service，并修改某些配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8082<br />
spring:<br />
application:<br />
name: cart-service<br />
profiles:<br />
active: dev<br />
datasource:<br />
url: jdbc:mysql://${hm.db.host}:3306/hm-cart?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: root<br />
password: ${hm.db.pw}<br />
mybatis-plus:<br />
configuration:<br />
default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler<br />
global-config:<br />
db-config:<br />
update-strategy: not_null<br />
id-type: auto<br />
logging:<br />
level:<br />
com.hmall: debug<br />
pattern:<br />
dateformat: HH:mm:ss:SSS<br />
file:<br />
path: "logs/${spring.application.name}"<br />
knife4j:<br />
enable: true<br />
openapi:<br />
title: 购物车服务接口文档<br />
description: "购物车服务接口文档"<br />
email: zhanghuyi@itcast.cn<br />
concat: 虎哥<br />
url: https://www.itcast.cn<br />
version: v1.0.0<br />
group:<br />
default:<br />
group-name: default<br />
api-rule: package<br />
api-rule-resources:<br />
- com.hmall.cart.controller</td>
</tr>
</tbody>
</table>

最后，把hm-service中的与购物车有关功能拷贝过来，最终的项目结构如下：

<img src="../assets/SpringCloud笔记/media/image25.png" style="width:5.75in;height:3.13542in" />

但是com.hmall.cart.service.impl.CartServiceImpl中有两个地方需要处理：

<img src="../assets/SpringCloud笔记/media/image26.png" style="width:5.75in;height:2.51042in" />

先将这部分代码做以下修改，保证不报错：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.cart.service.impl;<br />
<br />
@Service<br />
@RequiredArgsConstructor<br />
public class CartServiceImpl extends ServiceImpl&lt;CartMapper, Cart&gt; implements ICartService {<br />
<br />
// private final IItemService itemService;<br />
<br />
@Override<br />
public void addItem2Cart(CartFormDTO cartFormDTO) {<br />
...<br />
}<br />
<br />
@Override<br />
public List&lt;CartVO&gt; queryMyCarts() {<br />
// 1.查询我的购物车列表<br />
List&lt;Cart&gt; carts = lambdaQuery().eq(Cart::getUserId, 1L /*TODO UserContext.getUser()*/).list();<br />
if (CollUtils.isEmpty(carts)) {<br />
return CollUtils.emptyList();<br />
}<br />
// 2.转换VO<br />
List&lt;CartVO&gt; vos = BeanUtils.copyList(carts, CartVO.class);<br />
// 3.处理VO中的商品信息<br />
handleCartItems(vos);<br />
// 4.返回<br />
return vos;<br />
}<br />
<br />
private void handleCartItems(List&lt;CartVO&gt; vos) {<br />
// 1.获取商品id TODO 处理商品信息<br />
/*Set&lt;Long&gt; itemIds = vos.stream().map(CartVO::getItemId).collect(Collectors.toSet());<br />
// 2.查询商品<br />
List&lt;ItemDTO&gt; items = itemService.queryItemByIds(itemIds);<br />
if (CollUtils.isEmpty(items)) {<br />
throw new BadRequestException("购物车中商品不存在！");<br />
}<br />
// 3.转为 id 到 item的map<br />
Map&lt;Long, ItemDTO&gt; itemMap = items.stream().collect(Collectors.toMap(ItemDTO::getId, Function.identity()));<br />
// 4.写入vo<br />
for (CartVO v : vos) {<br />
ItemDTO item = itemMap.get(v.getItemId());<br />
if (item == null) {<br />
continue;<br />
}<br />
v.setNewPrice(item.getPrice());<br />
v.setStatus(item.getStatus());<br />
v.setStock(item.getStock());<br />
}*/<br />
}<br />
<br />
...<br />
}</td>
</tr>
</tbody>
</table>

然后在自己docker数据库连接客户端执行下面的hm-cart.sql脚本，得到hm-cart数据表：

**\[hm-cart.sql\]**

最后刷新maven配置CartApplication服务的激活配置为local：

<img src="../assets/SpringCloud笔记/media/image27.png" style="width:5.75in;height:1.125in" />

启动CartApplication服务，在浏览器访问http://localhost:8082/doc.html，测试查询购物车列表即可。

**3.3 服务调用**

顾名思义，服务调用就是不同微服务之间的调用，即一个微服务需要其他微服务的某个业务功能时，需要调用其他微服务提供的接口。比如购物车微服务的handleCartItems方法需要根据商品id查询商品信息，而商品查询功能在商品微服务中，而商品微服务提供了GET请求 http://localhost:8081/items的接口，根据参数ids查询并返回商品信息，所以可以让购物车微服务发起请求调用这个接口获取商品信息。

**3.3.1 RestTemplate**

Spring提供了一个RestTemplate的API，可以方便的实现Http请求的发送，其中提供了大量的方法用于发送Http请求：

<img src="../assets/SpringCloud笔记/media/image28.png" style="width:5.75in;height:2.125in" />

可以看到常见的Get、Post、Put、Delete请求都支持，如果请求参数比较复杂，还可以使用exchange方法来构造请求。

**3.3.2 实现远程调用**

在cart-service服务的com.hmall.cart.config包下定义配置类RemoteCallConfig：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.cart.config;<br />
<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.context.annotation.Configuration;<br />
import org.springframework.web.client.RestTemplate;<br />
<br />
@Configuration<br />
public class RemoteCallConfig {<br />
<br />
@Bean<br />
public RestTemplate restTemplate() {<br />
return new RestTemplate();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

修改cart-service中的com.hmall.cart.service.impl.CartServiceImpl的handleCartItems方法，发送http请求到item-service：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
import org.springframework.http.HttpMethod;<br />
<br />
private final RestTemplate restTemplate; //需要在类上加上@RequiredArgsConstructor注解才能自动注入<br />
<br />
private void handleCartItems(List&lt;CartVO&gt; vos) {<br />
// 1.获取商品id<br />
Set&lt;Long&gt; itemIds = vos.stream().map(CartVO::getItemId).collect(Collectors.toSet());<br />
// 2.查询商品<br />
// 2.1.利用RestTemplate发起http请求，得到http的响应<br />
ResponseEntity&lt;List&lt;ItemDTO&gt;&gt; response = restTemplate.exchange(<br />
"http://localhost:8081/items?ids={ids}", //请求路径，{}表示占位符，内容由最后Map的ids值填充<br />
HttpMethod.GET, //请求方式<br />
null, //请求实体<br />
new ParameterizedTypeReference&lt;List&lt;ItemDTO&gt;&gt;() {}, //返回值类型<br />
Map.of("ids", CollUtil.join(itemIds, ",")) //请求参数<br />
);<br />
// 2.2.解析响应<br />
if(!response.getStatusCode().is2xxSuccessful()){<br />
// 查询失败，直接结束<br />
return;<br />
}<br />
List&lt;ItemDTO&gt; items = response.getBody();<br />
if (CollUtils.isEmpty(items)) {<br />
return;<br />
}<br />
// 3.转为 id 到 item的map<br />
Map&lt;Long, ItemDTO&gt; itemMap = items.stream().collect(Collectors.toMap(ItemDTO::getId, Function.identity()));<br />
// 4.写入vo<br />
for (CartVO v : vos) {<br />
ItemDTO item = itemMap.get(v.getItemId());<br />
if (item == null) {<br />
continue;<br />
}<br />
v.setNewPrice(item.getPrice());<br />
v.setStatus(item.getStatus());<br />
v.setStock(item.getStock());<br />
}<br />
}</td>
</tr>
</tbody>
</table>

最后重启cart-service，再次测试查询我的购物车列表接口，最终可以看到newPrice字段不再为null。

**三、服务注册和发现**

如果部署了多个商品管理微服务，每个微服务的IP或端口不一致，这时请求路径就不固定，假如某个商品管理微服务宕机，再访问就会出现问题，所以，需要解决微服务集群下的各种问题，就需要使用到注册中心。

**1.注册中心原理**

在微服务远程调用的过程中，包括两个角色：

服务提供者：提供接口供其它微服务访问，比如item-service

服务消费者：调用其它微服务提供的接口，比如cart-service

大型微服务项目中服务提供者的数量会非常多，为了管理这些服务就引入了注册中心的概念。注册中心、服务提供者、服务消费者三者间关系如下：

<img src="../assets/SpringCloud笔记/media/image29.png" style="width:5.75in;height:2.19792in" />

服务调用的流程如下：

服务启动时会注册自己的服务信息（服务名、IP、端口）到注册中心

调用者可以从注册中心订阅想要的服务，获取服务对应的实例列表（1个服务可能多实例部署）

调用者自己对实例列表负载均衡，挑选一个实例

调用者向该实例发起远程调用

当服务提供者的实例宕机或者启动新实例时，调用者如何得知呢？

服务提供者会定期向注册中心发送请求，报告自己的健康状态（心跳请求）

当注册中心长时间收不到提供者的心跳时，会认为该实例宕机，将其从服务的实例列表中剔除

当服务有新实例启动时，会发送注册服务请求，其信息会被记录在注册中心的服务实例列表

当注册中心服务列表变更时，会主动通知微服务，更新本地服务列表

**2.Nacos注册中心**

目前开源的注册中心框架有很多，但都遵循SpringCloud中的API规范：

Eureka：Netflix公司出品，目前被集成在SpringCloud当中，一般用于Java应用

Nacos：Alibaba公司出品，目前被集成在SpringCloudAlibaba中，一般用于Java应用

Consul：HashiCorp公司出品，目前集成在SpringCloud中，不限制微服务语言

Nacos官网：

**\[该类型的内容暂不支持下载\]**

这里基于Docker部署Nacos注册中心。首先要准备MySQL数据库表，用来存储Nacos的数据：运行资料中的nacos.sql脚本得到nacos数据库，最终数据库的结构如下：

**\[nacos.sql\]**

<img src="../assets/SpringCloud笔记/media/image30.png" style="width:5.75in;height:1.96875in" />

然后，找到资料中的nacos文件夹，修改nacos/custom.env文件中的MYSQL_SERVICE_HOST为自己的虚拟机地址，其他配置也需要修改为自己对应的配置。

**\[nacos.zip\]**

将nacos文件夹上传到虚拟机的/root目录，进入/root目录执行以下命令安装nacos：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run -d \<br />
--name nacos \<br />
--env-file ./nacos/custom.env \<br />
-p 8848:8848 \<br />
-p 9848:9848 \<br />
-p 9849:9849 \<br />
--restart=always \<br />
nacos/nacos-server:v2.1.0-slim</td>
</tr>
</tbody>
</table>

安装成功后通过浏览器访问http://192.168.150.101:8848/nacos/，注意将192.168.150.101替换为自己的虚拟机IP地址。首次访问会跳转到登录页，账号密码都是nacos，输入后登录就进入nacos主页面：

<img src="../assets/SpringCloud笔记/media/image31.png" style="width:5.75in;height:1.82292in" />

**3.服务注册**

**3.1 添加依赖**

在item-service的pom.xml中添加依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--nacos 服务注册发现--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**3.2 配置Nacos**

在item-service的application.yml中添加nacos地址配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
application:<br />
name: item-service # 服务名称,需要和spring.application.name一样<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101:8848 # nacos地址,使用自己的虚拟机IP</td>
</tr>
</tbody>
</table>

**3.3 启动服务实例**

为了测试一个服务多个实例的情况，我们再配置一个item-service的部署实例：

<img src="../assets/SpringCloud笔记/media/image32.png" style="width:5.75in;height:2.07292in" />

重启item-service的两个实例ItemApplication、ItemApplication2后，访问nacos控制台，可以发现服务注册成功：

<img src="../assets/SpringCloud笔记/media/image33.png" style="width:5.75in;height:1.44792in" />

点击详情，可以查看到item-service服务的两个实例信息：

<img src="../assets/SpringCloud笔记/media/image34.png" style="width:5.75in;height:0.76042in" />

**4.服务发现**

**4.1 引入依赖**

服务发现除了要引入nacos依赖以外，由于还需要负载均衡，因此要引入SpringCloud提供的LoadBalancer依赖。

在cart-service中的pom.xml中添加下面的依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--nacos 服务注册发现--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

任何一个服务，既可以是调用者，也可以是提供者，所以cart-service启动时也会注册到nacos中。

**4.2 配置Nacos地址**

在cart-service的application.yml中添加nacos地址配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101:8848</td>
</tr>
</tbody>
</table>

**4.3 发现并调用服务**

商品服务有多个，但是调用只需要调用一个就可以，所以需要选择一个负载均衡算法，常见的负载均衡算法如下：

随机

轮询

IP的hash

最近最少访问

服务发现需要用到DiscoveryClient接口，SpringCloud已经自动装配，只需要注入使用即可。

这里基于随机负载均衡算法进行服务调用，只需要稍微修改cart-service中的CartServiceImpl的handleCartItems方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
import org.springframework.http.HttpMethod;<br />
<br />
private final RestTemplate restTemplate; //需要在类上加上@RequiredArgsConstructor注解才能自动注入<br />
<br />
private void handleCartItems(List&lt;CartVO&gt; vos) {<br />
// 1.获取商品id<br />
Set&lt;Long&gt; itemIds = vos.stream().map(CartVO::getItemId).collect(Collectors.toSet());<br />
// 2.查询商品<br />
// 2.1.发现item-service服务的实例列表<br />
List&lt;ServiceInstance&gt; instances = discoveryClient.getInstances("item-service");<br />
// 2.2.负载均衡，挑选一个实例<br />
ServiceInstance instance = instances.get(RandomUtil.randomInt(instances.size()));<br />
// 2.3.发送http请求，查询商品信息<br />
ResponseEntity&lt;List&lt;ItemDTO&gt;&gt; response = restTemplate.exchange(<br />
instance.getUri() + "/items?ids={ids}", //请求路径，{}表示占位符，内容由最后Map的ids值填充<br />
HttpMethod.GET, //请求方式<br />
null, //请求实体<br />
new ParameterizedTypeReference&lt;List&lt;ItemDTO&gt;&gt;() {}, //返回值类型<br />
Map.of("ids", CollUtil.join(itemIds, ",")) //请求参数<br />
);<br />
// 2.4.处理结果<br />
if(!response.getStatusCode().is2xxSuccessful()){<br />
// 查询失败，直接结束<br />
return;<br />
}<br />
List&lt;ItemDTO&gt; items = response.getBody();<br />
if (CollUtils.isEmpty(items)) {<br />
return;<br />
}<br />
// 3.转为 id 到 item的map<br />
Map&lt;Long, ItemDTO&gt; itemMap = items.stream().collect(Collectors.toMap(ItemDTO::getId, Function.identity()));<br />
// 4.写入vo<br />
for (CartVO v : vos) {<br />
ItemDTO item = itemMap.get(v.getItemId());<br />
if (item == null) {<br />
continue;<br />
}<br />
v.setNewPrice(item.getPrice());<br />
v.setStatus(item.getStatus());<br />
v.setStock(item.getStock());<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**四、OpenFeign**

原有的远程调用代码非常繁琐：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
// 2.1.发现item-service服务的实例列表<br />
List&lt;ServiceInstance&gt; instances = discoveryClient.getInstances("item-service");<br />
// 2.2.负载均衡，挑选一个实例<br />
ServiceInstance instance = instances.get(RandomUtil.randomInt(instances.size()));<br />
// 2.3.发送http请求，查询商品信息<br />
ResponseEntity&lt;List&lt;ItemDTO&gt;&gt; response = restTemplate.exchange(<br />
instance.getUri() + "/items?ids={ids}", //请求路径，{}表示占位符，内容由最后Map的ids值填充<br />
HttpMethod.GET, //请求方式<br />
null, //请求实体<br />
new ParameterizedTypeReference&lt;List&lt;ItemDTO&gt;&gt;() {}, //返回值类型<br />
Map.of("ids", CollUtil.join(itemIds, ",")) //请求参数<br />
);</td>
</tr>
</tbody>
</table>

为了简化远程调用的代码，引入了OpenFeign组件，OpenFeign利用SpringMVC相关注解声明请求方式、请求路径、请求参数、返回值类型，然后基于动态代理帮我们生成远程调用的代码，从而实现远程调用代码的简化。

**1.快速入门**

**1.1 引入依赖**

在cart-service服务的pom.xml中引入OpenFeign的依赖和loadBalancer依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--openFeign--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-openfeign&lt;/artifactId&gt;<br />
&lt;dependency&gt;<br />
&lt;!--负载均衡器--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-loadbalancer&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**1.2 启用OpenFeign**

在cart-service的CartApplication启动类上添加**@EnableFeignClients**注解，启动OpenFeign功能：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@EnableFeignClients //启动OpenFeign<br />
@MapperScan("com.hmall.cart.mapper")<br />
@SpringBootApplication<br />
public class CartApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(CartApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**1.3 编写OpenFeign客户端**

在cart-service中，定义ItemClient接口，编写Feign客户端：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.cart.client;<br />
<br />
import com.hmall.cart.domain.dto.ItemDTO;<br />
import org.springframework.cloud.openfeign.FeignClient;<br />
import org.springframework.web.bind.annotation.GetMapping;<br />
import org.springframework.web.bind.annotation.RequestParam;<br />
<br />
import java.util.List;<br />
<br />
@FeignClient("item-service")<br />
public interface ItemClient {<br />
@GetMapping("/items")<br />
List&lt;ItemDTO&gt; queryItemByIds(@RequestParam("ids") Collection&lt;Long&gt; ids);<br />
}</td>
</tr>
</tbody>
</table>

接口中的几个关键信息：

@FeignClient("item-service")：声明服务名称

@GetMapping：声明请求方式

@GetMapping("/items")：声明请求路径

@RequestParam("ids") Collection\<Long\> ids：声明请求参数

List\<ItemDTO\>：返回值类型

方法体OpenFeign会基于动态代理和反射自动实现，我们只需要调用就可以了。

**1.4 使用FeignClient**

在cart-service的CartServiceImpl中改造代码，直接调用ItemClient的方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
import org.springframework.http.HttpMethod;<br />
<br />
//private final RestTemplate restTemplate;<br />
private final ItemClient itemClient;<br />
<br />
private void handleCartItems(List&lt;CartVO&gt; vos) {<br />
// 1.获取商品id<br />
Set&lt;Long&gt; itemIds = vos.stream().map(CartVO::getItemId).collect(Collectors.toSet());<br />
// 2.查询商品<br />
List&lt;ItemDTO&gt; items = itemClient.queryItemByIds(itemIds);<br />
// 2.1.查询失败，直接返回<br />
if (CollUtils.isEmpty(items)) {<br />
return;<br />
}<br />
// 3.转为 id 到 item的map<br />
Map&lt;Long, ItemDTO&gt; itemMap = items.stream().collect(Collectors.toMap(ItemDTO::getId, Function.identity()));<br />
// 4.写入vo<br />
for (CartVO v : vos) {<br />
ItemDTO item = itemMap.get(v.getItemId());<br />
if (item == null) {<br />
continue;<br />
}<br />
v.setNewPrice(item.getPrice());<br />
v.setStatus(item.getStatus());<br />
v.setStock(item.getStock());<br />
}<br />
}</td>
</tr>
</tbody>
</table>

可以发现，远程调用代码只需要一行就可以了，很方便。

**2.连接池**

Feign底层发起http请求，依赖于其它的框架，其底层支持的http客户端实现包括：

HttpURLConnection：默认实现，不支持连接池

Apache HttpClient ：支持连接池

OKHttp：支持连接池

我们通常会使用带有连接池的客户端代替默认的HttpURLConnection，这里使用OKHttp。

**2.1 引入依赖**

在cart-service的pom.xml中引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--OK http 的依赖 --&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;io.github.openfeign&lt;/groupId&gt;<br />
&lt;artifactId&gt;feign-okhttp&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**2.2 开启连接池**

在cart-service的application.yml配置文件中开启Feign的连接池功能：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
feign:<br />
okhttp:<br />
enabled: true # 开启OKHttp功能</td>
</tr>
</tbody>
</table>

**2.3 验证**

在org.springframework.cloud.openfeign.loadbalancer.FeignBlockingLoadBalancerClient中的execute方法中打断点：

<img src="../assets/SpringCloud笔记/media/image35.png" style="width:5.75in;height:0.82292in" />

以debug方式启动CartApplication服务（记得启动商品服务），请求一次查询购物车列表接口，可以看到底层的实现已经改为OkHttpClient：

<img src="../assets/SpringCloud笔记/media/image36.png" style="width:5.75in;height:1.0625in" />

**3.最佳实践**

**3.1 实践方案**

虽然OpenFeign已经简化了远程调用代码，但是如果两个或多个微服务都需要调用同一个接口，就需要在每个微服务内都编写ItemClient，这显然是不方便的。

最佳实践就是在开发过程中经过总结试错总结出的最佳实践方案，例如多个微服务调用同一个接口，为了避免重复编写XxxClient，有两种最佳实践方案：

**方案一**：每个微服务都分为三个模块，dto模块用来放所有的DTO实体类，api模块用来放Client客户端，biz模块是真正的写业务代码的模块，其他服务只需要引入dto和api模块就能调用这个微服务内部的接口。

<img src="../assets/SpringCloud笔记/media/image37.png" style="width:5.75in;height:2.64583in" />

这种方案耦合度低，但工程结构复杂化，适合完全解耦的项目结构。

**方案二**：将所有的DTO、Client封装到一个api模块中，由这个模块管理所有的远程调用客户端，其他微服务只需要引入api模块就可以远程调用。

<img src="../assets/SpringCloud笔记/media/image38.png" style="width:5.75in;height:2.11458in" />

这种方案实现简单，但是耦合度偏高，比较适合Maven聚合的项目结构。

这里以方案二进行实现远程调用。

**3.2 抽取Feign客户端**

在hmall下定义一个新的module，命名为hm-api：

<img src="../assets/SpringCloud笔记/media/image39.png" style="width:5.75in;height:1.9375in" />

为hm-api模块添加如下依赖，最后pom文件如下：

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
&lt;parent&gt;<br />
&lt;artifactId&gt;hmall&lt;/artifactId&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/parent&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;artifactId&gt;hm-api&lt;/artifactId&gt;<br />
<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;<br />
&lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;!--open feign--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-openfeign&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!-- load balancer--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-loadbalancer&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!-- swagger --&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;io.swagger&lt;/groupId&gt;<br />
&lt;artifactId&gt;swagger-annotations&lt;/artifactId&gt;<br />
&lt;version&gt;1.6.6&lt;/version&gt;<br />
&lt;scope&gt;compile&lt;/scope&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

把ItemDTO和ItemClient都剪切过来（购物车服务中原有的ItemDTO和ItemClient不需要了），最终结构如下：

<img src="../assets/SpringCloud笔记/media/image40.png" style="width:5.75in;height:1.79167in" />

**3.3 扫描包**

在cart-service的pom.xml中引入hm-api模块：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--feign模块--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-api&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

删除cart-service中原有的openfeign依赖、loadbalancer依赖和swagger依赖（hm-api中已经有了这三个依赖，不需要再次导入）。

现在还不能正常启动购物车微服务，因为购物车微服务默认扫描的是启动类所在包（即com.hmall.cart），但是ItemClient此时在com.hmall.api.client包下，不会被扫描加入IOC容器管理，注入不会成功，有两种解决方式：

方式1：通过basePackages属性声明扫描包

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@EnableFeignClients(basePackages = "com.hmall.api.client")<br />
@MapperScan("com.hmall.cart.mapper")<br />
@SpringBootApplication<br />
public class CartApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(CartApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

方式2：通过clients属性声明要用的FeignClient

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@EnableFeignClients(clients = {ItemClient.class})<br />
@MapperScan("com.hmall.cart.mapper")<br />
@SpringBootApplication<br />
public class CartApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(CartApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.日志配置**

OpenFeign只会在FeignClient所在包的日志级别为DEBUG时，才会输出日志，而且其日志级别有4级：

NONE：不记录任何日志信息，这是默认值

BASIC：仅记录请求的方法，URL以及响应状态码和执行时间

HEADERS：在BASIC的基础上，额外记录了请求和响应的头信息

FULL：记录所有请求和响应的明细，包括头信息、请求体、元数据

Feign默认的日志级别就是NONE，所以默认是看不到请求日志的。

**4.1 定义日志级别**

在hm-api模块下新建一个配置类DefaultFeignConfig，定义Feign的日志级别：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.config;<br />
<br />
import feign.Logger;<br />
import org.springframework.context.annotation.Bean;<br />
<br />
public class DefaultFeignConfig {<br />
@Bean<br />
public Logger.Level feignLogLevel(){<br />
return Logger.Level.FULL;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.2 配置**

要让日志级别生效，还需要配置这个类，有两种方式：

**局部生效**：在某个FeignClient中配置，只对当前FeignClient生效

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@FeignClient(value = "item-service", configuration = DefaultFeignConfig.class)</td>
</tr>
</tbody>
</table>

**全局生效**：在@EnableFeignClients中配置（启动类中配置），针对所有FeignClient生效

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@EnableFeignClients(defaultConfiguration = DefaultFeignConfig.class)</td>
</tr>
</tbody>
</table>

**五、用户服务\交易服务\支付服务拆分**

**1.用户服务**

**1.1 创建项目**

在hmall下新建一个模块，命名为user-service：

<img src="../assets/SpringCloud笔记/media/image41.png" style="width:5.75in;height:1.82292in" />

**1.2 引入依赖**

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
&lt;parent&gt;<br />
&lt;artifactId&gt;hmall&lt;/artifactId&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/parent&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;artifactId&gt;user-service&lt;/artifactId&gt;<br />
<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;<br />
&lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;!--common--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-common&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--web--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--数据库--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;mysql&lt;/groupId&gt;<br />
&lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--mybatis--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.baomidou&lt;/groupId&gt;<br />
&lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--加密--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.security&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-security-crypto&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.security&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-security-rsa&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.9.RELEASE&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--nacos--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;build&gt;<br />
&lt;finalName&gt;${project.artifactId}&lt;/finalName&gt;<br />
&lt;plugins&gt;<br />
&lt;plugin&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;<br />
&lt;/plugin&gt;<br />
&lt;/plugins&gt;<br />
&lt;/build&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

**1.3 配置文件**

拷贝hm-service模块的三个yaml配置文件到item-service，并修改某些配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8084<br />
spring:<br />
application:<br />
name: user-service<br />
profiles:<br />
active: dev<br />
datasource:<br />
url: jdbc:mysql://${hm.db.host}:3306/hm-user?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: root<br />
password: ${hm.db.pw}<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101:8848 # nacos<br />
mybatis-plus:<br />
configuration:<br />
default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler<br />
global-config:<br />
db-config:<br />
update-strategy: not_null<br />
id-type: auto<br />
logging:<br />
level:<br />
com.hmall: debug<br />
pattern:<br />
dateformat: HH:mm:ss:SSS<br />
file:<br />
path: "logs/${spring.application.name}"<br />
knife4j:<br />
enable: true<br />
openapi:<br />
title: 用户管理接口文档<br />
description: "用户管理接口文档"<br />
email: zhanghuyi@itcast.cn<br />
concat: 虎哥<br />
url: https://www.itcast.cn<br />
version: v1.0.0<br />
group:<br />
default:<br />
group-name: default<br />
api-rule: package<br />
api-rule-resources:<br />
- com.hmall.user.controller<br />
hm:<br />
jwt:<br />
location: classpath:hmall.jks<br />
alias: hmall<br />
password: hmall123<br />
tokenTTL: 30m</td>
</tr>
</tbody>
</table>

将hm-service下的hmall.jks文件拷贝到user-service下的resources目录，这是JWT加密的秘钥文件：

<img src="../assets/SpringCloud笔记/media/image42.png" style="width:5.75in;height:0.97917in" />

**1.4 启动类**

在com.hmall.user包下创建启动类UserApplication：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.user;<br />
<br />
import org.mybatis.spring.annotation.MapperScan;<br />
import org.springframework.boot.SpringApplication;<br />
import org.springframework.boot.autoconfigure.SpringBootApplication;<br />
<br />
@MapperScan("com.hmall.user.mapper")<br />
@SpringBootApplication<br />
public class UserApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(UserApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**1.5 代码**

复制hm-service中所有与user、address、jwt有关的代码到user-service：

<img src="../assets/SpringCloud笔记/media/image43.png" style="width:5.75in;height:2.64583in" />

**1.6 数据库**

**\[hm-user.sql\]**

在自己docker数据库连接客户端执行资料中的hm-user.sql脚本，得到hm-user数据表。

**1.7 配置启动项**

刷新user-service的maven配置，给user-service配置启动项，设置profile为local：

<img src="../assets/SpringCloud笔记/media/image44.png" style="width:5.75in;height:1.46875in" />

**1.8 测试**

启动UserApplication，访问http://localhost:8084/doc.html，测试用户登录接口（用户名Jack，密码123）。

**2.交易服务**

**2.1 创建项目**

在hmall下新建一个模块，命名为trade-service：

<img src="../assets/SpringCloud笔记/media/image45.png" style="width:5.75in;height:1.78125in" />

**2.2 引入依赖**

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
&lt;parent&gt;<br />
&lt;artifactId&gt;hmall&lt;/artifactId&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/parent&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;artifactId&gt;trade-service&lt;/artifactId&gt;<br />
<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;<br />
&lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;!--common--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-common&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--web--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--数据库--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;mysql&lt;/groupId&gt;<br />
&lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--mybatis--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.baomidou&lt;/groupId&gt;<br />
&lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--hm-api--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-api&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--nacos--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;build&gt;<br />
&lt;finalName&gt;${project.artifactId}&lt;/finalName&gt;<br />
&lt;plugins&gt;<br />
&lt;plugin&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;<br />
&lt;/plugin&gt;<br />
&lt;/plugins&gt;<br />
&lt;/build&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

**2.3 配置文件**

拷贝hm-service模块的三个yaml配置文件到trade-service，并修改某些配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8085<br />
spring:<br />
application:<br />
name: trade-service<br />
profiles:<br />
active: dev<br />
datasource:<br />
url: jdbc:mysql://${hm.db.host}:3306/hm-trade?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: root<br />
password: ${hm.db.pw}<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101:8848 # nacos<br />
mybatis-plus:<br />
configuration:<br />
default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler<br />
global-config:<br />
db-config:<br />
update-strategy: not_null<br />
id-type: auto<br />
logging:<br />
level:<br />
com.hmall: debug<br />
pattern:<br />
dateformat: HH:mm:ss:SSS<br />
file:<br />
path: "logs/${spring.application.name}"<br />
knife4j:<br />
enable: true<br />
openapi:<br />
title: 交易服务接口文档<br />
description: "交易服务接口文档"<br />
email: zhanghuyi@itcast.cn<br />
concat: 虎哥<br />
url: https://www.itcast.cn<br />
version: v1.0.0<br />
group:<br />
default:<br />
group-name: default<br />
api-rule: package<br />
api-rule-resources:<br />
- com.hmall.trade.controller<br />
feign:<br />
okhttp:<br />
enabled: true # 开启OKHttp</td>
</tr>
</tbody>
</table>

**2.4 启动类**

在com.hmall.trade包下创建启动类TradeApplication：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.trade;<br />
<br />
import com.hmall.api.config.DefaultFeignConfig;<br />
import org.mybatis.spring.annotation.MapperScan;<br />
import org.springframework.boot.SpringApplication;<br />
import org.springframework.boot.autoconfigure.SpringBootApplication;<br />
import org.springframework.cloud.openfeign.EnableFeignClients;<br />
<br />
@EnableFeignClients(basePackages = "com.hmall.api.client", defaultConfiguration = DefaultFeignConfig.class)<br />
@MapperScan("com.hmall.trade.mapper")<br />
@SpringBootApplication<br />
public class TradeApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(TradeApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.5 代码**

**2.5.1 基础代码**

复制hm-service中所有与trade有关的代码到trade-service：

<img src="../assets/SpringCloud笔记/media/image46.png" style="width:5.75in;height:2.53125in" />

在交易服务中，用户下单时需要根据id查询商品、计算商品总价并保存订单、扣减库存、清空购物车商品。其中，查询商品、扣减库存是与商品有关的业务，相关功能在item-service中；清理购物车商品是购物车业务，相关功能在cart-service中，所以需要再hm-api中编写相关客户端。

**2.5.2 抽取ItemClient接口**

查询商品的远程调用接口已经实现，现在需要定义**扣减库存**的调用接口。

先将接口参数的OrderDetailDTO抽取到hm-api模块的com.hmall.api.dto包下：

<img src="../assets/SpringCloud笔记/media/image47.png" style="width:5.75in;height:1.04167in" />

将扣减库存的接口添加到hm-api模块的com.hmall.api.client.ItemClient中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.client;<br />
<br />
@FeignClient("item-service")<br />
public interface ItemClient {<br />
/**<br />
* 根据id查询商品信息<br />
* @param ids<br />
* @return<br />
*/<br />
@GetMapping("/items")<br />
List&lt;ItemDTO&gt; queryItemByIds(@RequestParam("ids") Collection&lt;Long&gt; ids);<br />
<br />
/**<br />
* 扣减库存<br />
* @param items<br />
*/<br />
@PutMapping("/items/stock/deduct")<br />
void deductStock(@RequestBody List&lt;OrderDetailDTO&gt; items);<br />
}</td>
</tr>
</tbody>
</table>

**2.5.3 抽取CartClient接口**

接下来把**清空购物车商品**的接口添加到com.hmall.api.client.CartClient中即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.client;<br />
<br />
import org.springframework.cloud.openfeign.FeignClient;<br />
import org.springframework.web.bind.annotation.DeleteMapping;<br />
import org.springframework.web.bind.annotation.RequestParam;<br />
<br />
import java.util.Collection;<br />
<br />
@FeignClient("cart-service")<br />
public interface CartClient {<br />
/**<br />
* 清空购物车商品<br />
* @param ids<br />
*/<br />
@DeleteMapping("/carts")<br />
void removeByItemIds(@RequestParam("ids") Collection&lt;Long&gt; ids);<br />
}</td>
</tr>
</tbody>
</table>

**2.5.4 改造OrderServiceImpl**

改造OrderServiceImpl中的逻辑，将本地方法调用改造为基于FeignClient的调用：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.trade.service.impl;<br />
<br />
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;<br />
import com.hmall.api.client.CartClient;<br />
import com.hmall.api.client.ItemClient;<br />
import com.hmall.api.dto.ItemDTO;<br />
import com.hmall.api.dto.OrderDetailDTO;<br />
import com.hmall.common.exception.BadRequestException;<br />
import com.hmall.common.utils.UserContext;<br />
import com.hmall.trade.domain.dto.OrderFormDTO;<br />
import com.hmall.trade.domain.po.Order;<br />
import com.hmall.trade.domain.po.OrderDetail;<br />
import com.hmall.trade.mapper.OrderMapper;<br />
import com.hmall.trade.service.IOrderDetailService;<br />
import com.hmall.trade.service.IOrderService;<br />
import lombok.RequiredArgsConstructor;<br />
import org.springframework.stereotype.Service;<br />
import org.springframework.transaction.annotation.Transactional;<br />
<br />
import java.time.LocalDateTime;<br />
import java.util.ArrayList;<br />
import java.util.List;<br />
import java.util.Map;<br />
import java.util.Set;<br />
import java.util.stream.Collectors;<br />
<br />
/**<br />
* &lt;p&gt;<br />
* 服务实现类<br />
* &lt;/p&gt;<br />
*<br />
* @author 虎哥<br />
* @since 2023-05-05<br />
*/<br />
@Service<br />
@RequiredArgsConstructor<br />
public class OrderServiceImpl extends ServiceImpl&lt;OrderMapper, Order&gt; implements IOrderService {<br />
<br />
private final IOrderDetailService detailService;<br />
<br />
private final ItemClient itemClient;<br />
<br />
private final CartClient cartClient;<br />
<br />
@Override<br />
@Transactional<br />
public Long createOrder(OrderFormDTO orderFormDTO) {<br />
// 1.订单数据<br />
Order order = new Order();<br />
// 1.1.查询商品<br />
List&lt;OrderDetailDTO&gt; detailDTOS = orderFormDTO.getDetails();<br />
// 1.2.获取商品id和数量的Map<br />
Map&lt;Long, Integer&gt; itemNumMap = detailDTOS.stream()<br />
.collect(Collectors.toMap(OrderDetailDTO::getItemId, OrderDetailDTO::getNum));<br />
Set&lt;Long&gt; itemIds = itemNumMap.keySet();<br />
// 1.3.查询商品<br />
List&lt;ItemDTO&gt; items = itemClient.queryItemByIds(itemIds);<br />
if (items == null || items.size() &lt; itemIds.size()) {<br />
throw new BadRequestException("商品不存在");<br />
}<br />
// 1.4.基于商品价格、购买数量计算商品总价：totalFee<br />
int total = 0;<br />
for (ItemDTO item : items) {<br />
total += item.getPrice() * itemNumMap.get(item.getId());<br />
}<br />
order.setTotalFee(total);<br />
// 1.5.其它属性<br />
order.setPaymentType(orderFormDTO.getPaymentType());<br />
order.setUserId(UserContext.getUser());<br />
order.setStatus(1);<br />
// 1.6.将Order写入数据库order表中<br />
save(order);<br />
<br />
// 2.保存订单详情<br />
List&lt;OrderDetail&gt; details = buildDetails(order.getId(), items, itemNumMap);<br />
detailService.saveBatch(details);<br />
<br />
// 3.清理购物车商品<br />
cartClient.removeByItemIds(itemIds);<br />
<br />
// 4.扣减库存<br />
try {<br />
itemClient.deductStock(detailDTOS);<br />
} catch (Exception e) {<br />
throw new RuntimeException("库存不足！");<br />
}<br />
return order.getId();<br />
}<br />
<br />
@Override<br />
public void markOrderPaySuccess(Long orderId) {<br />
Order order = new Order();<br />
order.setId(orderId);<br />
order.setStatus(2);<br />
order.setPayTime(LocalDateTime.now());<br />
updateById(order);<br />
}<br />
<br />
private List&lt;OrderDetail&gt; buildDetails(Long orderId, List&lt;ItemDTO&gt; items, Map&lt;Long, Integer&gt; numMap) {<br />
List&lt;OrderDetail&gt; details = new ArrayList&lt;&gt;(items.size());<br />
for (ItemDTO item : items) {<br />
OrderDetail detail = new OrderDetail();<br />
detail.setName(item.getName());<br />
detail.setSpec(item.getSpec());<br />
detail.setPrice(item.getPrice());<br />
detail.setNum(numMap.get(item.getId()));<br />
detail.setItemId(item.getId());<br />
detail.setImage(item.getImage());<br />
detail.setOrderId(orderId);<br />
details.add(detail);<br />
}<br />
return details;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.6 数据库**

**\[hm-trade.sql\]**

在自己docker数据库连接客户端执行资料中的hm-trade.sql脚本，得到hm-trade数据表。

**2.7 配置启动项**

刷新tradeservice的maven配置，给trade-service配置启动项，设置profile为local：

<img src="../assets/SpringCloud笔记/media/image48.png" style="width:5.75in;height:1.39583in" />

**2.8 测试**

启动TradeApplication，访问http://localhost:8085/doc.html，测试根据id查询订单接口，id为1654779387523936258，测试通过。

**3.支付服务**

**3.1 创建项目**

在hmall下新建一个模块，命名为pay-service：

<img src="../assets/SpringCloud笔记/media/image49.png" style="width:5.75in;height:1.79167in" />

**3.2 引入依赖**

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
&lt;parent&gt;<br />
&lt;artifactId&gt;hmall&lt;/artifactId&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/parent&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;artifactId&gt;pay-service&lt;/artifactId&gt;<br />
<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;<br />
&lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;!--common--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-common&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--web--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--数据库--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;mysql&lt;/groupId&gt;<br />
&lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--mybatis--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.baomidou&lt;/groupId&gt;<br />
&lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--hm-api--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-api&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--nacos--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;build&gt;<br />
&lt;finalName&gt;${project.artifactId}&lt;/finalName&gt;<br />
&lt;plugins&gt;<br />
&lt;plugin&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;<br />
&lt;/plugin&gt;<br />
&lt;/plugins&gt;<br />
&lt;/build&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

**3.3 启动类**

在com.hmall.pay包下创建启动类PayApplication：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.pay;<br />
<br />
import com.hmall.api.config.DefaultFeignConfig;<br />
import org.mybatis.spring.annotation.MapperScan;<br />
import org.springframework.boot.SpringApplication;<br />
import org.springframework.boot.autoconfigure.SpringBootApplication;<br />
import org.springframework.cloud.openfeign.EnableFeignClients;<br />
<br />
@EnableFeignClients(basePackages = "com.hmall.api.client", defaultConfiguration = DefaultFeignConfig.class)<br />
@MapperScan("com.hmall.pay.mapper")<br />
@SpringBootApplication<br />
public class PayApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(PayApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.3 配置文件**

拷贝hm-service模块的三个yaml配置文件到pay-service，并修改某些配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8086<br />
spring:<br />
application:<br />
name: pay-service<br />
profiles:<br />
active: dev<br />
datasource:<br />
url: jdbc:mysql://${hm.db.host}:3306/hm-pay?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: root<br />
password: ${hm.db.pw}<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101:8848 # nacos<br />
mybatis-plus:<br />
configuration:<br />
default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler<br />
global-config:<br />
db-config:<br />
update-strategy: not_null<br />
id-type: auto<br />
logging:<br />
level:<br />
com.hmall: debug<br />
pattern:<br />
dateformat: HH:mm:ss:SSS<br />
file:<br />
path: "logs/${spring.application.name}"<br />
knife4j:<br />
enable: true<br />
openapi:<br />
title: 支付服务接口文档<br />
description: "支付服务接口文档"<br />
email: zhanghuyi@itcast.cn<br />
concat: 虎哥<br />
url: https://www.itcast.cn<br />
version: v1.0.0<br />
group:<br />
default:<br />
group-name: default<br />
api-rule: package<br />
api-rule-resources:<br />
- com.hmall.pay.controller<br />
feign:<br />
okhttp:<br />
enabled: true # 开启OKHttp</td>
</tr>
</tbody>
</table>

**3.4 代码**

**3.4.1 基础代码**

复制hm-service中所有与pay有关的代码到pay-service：

<img src="../assets/SpringCloud笔记/media/image50.png" style="width:5.75in;height:2.09375in" />

在支付服务中，基于用户余额支付时需要扣减用户余额、标记支付状态为已支付、标记订单状态为已支付。其中，**扣减用户余额**是在user-service中有相关功能；**标记订单状态**则是在trade-service中有相关功能。因此交易服务要调用他们，必须通过OpenFeign远程调用。

**3.4.2 抽取UserClient接口**

将**扣减用户余额**的接口添加到hm-api模块的com.hmall.api.client.UserClient中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.client;<br />
<br />
import org.springframework.cloud.openfeign.FeignClient;<br />
import org.springframework.web.bind.annotation.PutMapping;<br />
import org.springframework.web.bind.annotation.RequestParam;<br />
<br />
@FeignClient("user-service")<br />
public interface UserClient {<br />
/**<br />
* 扣减用户余额<br />
* @param pw<br />
* @param amount<br />
*/<br />
@PutMapping("/users/money/deduct")<br />
void deductMoney(@RequestParam("pw") String pw, @RequestParam("amount") Integer amount);<br />
}</td>
</tr>
</tbody>
</table>

**3.4.3 抽取TradeClient接口**

将**标记订单状态**的接口添加到hm-api模块的com.hmall.api.client.TradeClient中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.client;<br />
<br />
import org.springframework.cloud.openfeign.FeignClient;<br />
import org.springframework.web.bind.annotation.PathVariable;<br />
import org.springframework.web.bind.annotation.PutMapping;<br />
<br />
@FeignClient("trade-service")<br />
public interface TradeClient {<br />
/**<br />
* 标记订单状态<br />
* @param orderId<br />
*/<br />
@PutMapping("/orders/{orderId}")<br />
void markOrderPaySuccess(@PathVariable("orderId") Long orderId);<br />
}</td>
</tr>
</tbody>
</table>

**3.4.4 改造PayOrderServiceImpl**

改造PayOrderServiceImpl中的逻辑，将本地方法调用改造为基于FeignClient的调用：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.pay.service.impl;<br />
<br />
import com.baomidou.mybatisplus.core.toolkit.IdWorker;<br />
import com.baomidou.mybatisplus.core.toolkit.StringUtils;<br />
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;<br />
import com.hmall.api.client.TradeClient;<br />
import com.hmall.api.client.UserClient;<br />
import com.hmall.common.exception.BizIllegalException;<br />
import com.hmall.common.utils.BeanUtils;<br />
import com.hmall.common.utils.UserContext;<br />
import com.hmall.pay.domain.dto.PayApplyDTO;<br />
import com.hmall.pay.domain.dto.PayOrderFormDTO;<br />
import com.hmall.pay.domain.po.PayOrder;<br />
import com.hmall.pay.enums.PayStatus;<br />
import com.hmall.pay.mapper.PayOrderMapper;<br />
import com.hmall.pay.service.IPayOrderService;<br />
import lombok.RequiredArgsConstructor;<br />
import org.springframework.stereotype.Service;<br />
import org.springframework.transaction.annotation.Transactional;<br />
<br />
import java.time.LocalDateTime;<br />
<br />
/**<br />
* &lt;p&gt;<br />
* 支付订单 服务实现类<br />
* &lt;/p&gt;<br />
*<br />
* @author 虎哥<br />
* @since 2023-05-16<br />
*/<br />
@Service<br />
@RequiredArgsConstructor<br />
public class PayOrderServiceImpl extends ServiceImpl&lt;PayOrderMapper, PayOrder&gt; implements IPayOrderService {<br />
<br />
private final UserClient userClient;<br />
private final TradeClient tradeClient;<br />
<br />
@Override<br />
public String applyPayOrder(PayApplyDTO applyDTO) {<br />
// 1.幂等性校验<br />
PayOrder payOrder = checkIdempotent(applyDTO);<br />
// 2.返回结果<br />
return payOrder.getId().toString();<br />
}<br />
<br />
@Override<br />
@Transactional<br />
public void tryPayOrderByBalance(PayOrderFormDTO payOrderFormDTO) {<br />
// 1.查询支付单<br />
PayOrder po = getById(payOrderFormDTO.getId());<br />
// 2.判断状态<br />
if(!PayStatus.WAIT_BUYER_PAY.equalsValue(po.getStatus())){<br />
// 订单不是未支付，状态异常<br />
throw new BizIllegalException("交易已支付或关闭！");<br />
}<br />
// 3.尝试扣减余额<br />
userClient.deductMoney(payOrderFormDTO.getPw(), po.getAmount());<br />
// 4.修改支付单状态<br />
boolean success = markPayOrderSuccess(payOrderFormDTO.getId(), LocalDateTime.now());<br />
if (!success) {<br />
throw new BizIllegalException("交易已支付或关闭！");<br />
}<br />
// 5.修改订单状态<br />
tradeClient.markOrderPaySuccess(po.getBizOrderNo());<br />
}<br />
<br />
public boolean markPayOrderSuccess(Long id, LocalDateTime successTime) {<br />
return lambdaUpdate()<br />
.set(PayOrder::getStatus, PayStatus.TRADE_SUCCESS.getValue())<br />
.set(PayOrder::getPaySuccessTime, successTime)<br />
.eq(PayOrder::getId, id)<br />
// 支付状态的乐观锁判断<br />
.in(PayOrder::getStatus, PayStatus.NOT_COMMIT.getValue(), PayStatus.WAIT_BUYER_PAY.getValue())<br />
.update();<br />
}<br />
<br />
<br />
private PayOrder checkIdempotent(PayApplyDTO applyDTO) {<br />
// 1.首先查询支付单<br />
PayOrder oldOrder = queryByBizOrderNo(applyDTO.getBizOrderNo());<br />
// 2.判断是否存在<br />
if (oldOrder == null) {<br />
// 不存在支付单，说明是第一次，写入新的支付单并返回<br />
PayOrder payOrder = buildPayOrder(applyDTO);<br />
payOrder.setPayOrderNo(IdWorker.getId());<br />
save(payOrder);<br />
return payOrder;<br />
}<br />
// 3.旧单已经存在，判断是否支付成功<br />
if (PayStatus.TRADE_SUCCESS.equalsValue(oldOrder.getStatus())) {<br />
// 已经支付成功，抛出异常<br />
throw new BizIllegalException("订单已经支付！");<br />
}<br />
// 4.旧单已经存在，判断是否已经关闭<br />
if (PayStatus.TRADE_CLOSED.equalsValue(oldOrder.getStatus())) {<br />
// 已经关闭，抛出异常<br />
throw new BizIllegalException("订单已关闭");<br />
}<br />
// 5.旧单已经存在，判断支付渠道是否一致<br />
if (!StringUtils.equals(oldOrder.getPayChannelCode(), applyDTO.getPayChannelCode())) {<br />
// 支付渠道不一致，需要重置数据，然后重新申请支付单<br />
PayOrder payOrder = buildPayOrder(applyDTO);<br />
payOrder.setId(oldOrder.getId());<br />
payOrder.setQrCodeUrl("");<br />
updateById(payOrder);<br />
payOrder.setPayOrderNo(oldOrder.getPayOrderNo());<br />
return payOrder;<br />
}<br />
// 6.旧单已经存在，且可能是未支付或未提交，且支付渠道一致，直接返回旧数据<br />
return oldOrder;<br />
}<br />
<br />
private PayOrder buildPayOrder(PayApplyDTO payApplyDTO) {<br />
// 1.数据转换<br />
PayOrder payOrder = BeanUtils.toBean(payApplyDTO, PayOrder.class);<br />
// 2.初始化数据<br />
payOrder.setPayOverTime(LocalDateTime.now().plusMinutes(120L));<br />
payOrder.setStatus(PayStatus.WAIT_BUYER_PAY.getValue());<br />
payOrder.setBizUserId(UserContext.getUser());<br />
return payOrder;<br />
}<br />
public PayOrder queryByBizOrderNo(Long bizOrderNo) {<br />
return lambdaQuery()<br />
.eq(PayOrder::getBizOrderNo, bizOrderNo)<br />
.one();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.5 数据库**

**\[hm-pay.sql\]**

在自己docker数据库连接客户端执行资料中的hm-pay.sql脚本，得到hm-pay数据表。

**3.6 配置启动项**

刷新payservice的maven配置，给pay-service配置启动项，设置profile为local：

<img src="../assets/SpringCloud笔记/media/image51.png" style="width:5.75in;height:1.4375in" />

**3.7 测试**

在支付服务的PayController中添加一个接口方便测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@ApiOperation("查询支付单")<br />
@GetMapping<br />
public List&lt;PayOrderVO&gt; queryPayOrders(){<br />
return BeanUtils.copyList(payOrderService.list(), PayOrderVO.class);<br />
}</td>
</tr>
</tbody>
</table>

启动PayApplication，访问[http://localhost:8086/doc.html](http://localhost:8086/doc.html#/default/%E6%94%AF%E4%BB%98%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3/queryPayOrdersUsingGET)，测试查询支付单接口即可。

**六、网关路由**

**1.认识网关**

网关就是网络的关口，数据在网络间传输，从一个网络传输到另一网络时就需要经过网关做数据的路由和转发以及数据安全的校验。

黑马商城被拆分为5个微服务，当前端请求过来时却不知道该访问哪个微服务，这时就需要网关来进行路由并进行登录校验：

网关可以做安全控制，也就是登录身份校验，校验通过才放行

通过认证后，网关再根据请求判断应该访问哪个微服务，将请求转发过去

<img src="../assets/SpringCloud笔记/media/image52.png" style="width:5.75in;height:1.90625in" />

在SpringCloud当中，提供了两种网关实现方案：

Netflix Zuul：早期实现，目前已经淘汰

SpringCloudGateway：基于Spring的WebFlux技术，完全支持响应式编程，吞吐能力更强

SpringCloudGateway官网：

**\[该类型的内容暂不支持下载\]**

**2.快速入门**

网关本身也是一个独立的微服务，因此也需要创建一个模块开发功能，大概步骤如下：

创建网关微服务

引入SpringCloudGateway、NacosDiscovery依赖

编写启动类

配置网关路由

**2.1 创建项目**

在hmall下创建一个新的module，命名为hm-gateway，作为网关微服务：

<img src="../assets/SpringCloud笔记/media/image53.png" style="width:5.75in;height:2.09375in" />

**2.2 引入依赖**

在hm-gateway模块的pom.xml文件中引入依赖：

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
&lt;parent&gt;<br />
&lt;artifactId&gt;hmall&lt;/artifactId&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/parent&gt;<br />
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;artifactId&gt;hm-gateway&lt;/artifactId&gt;<br />
<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;<br />
&lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;!--common--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-common&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--网关--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-gateway&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--nacos discovery--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--负载均衡--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-loadbalancer&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;build&gt;<br />
&lt;finalName&gt;${project.artifactId}&lt;/finalName&gt;<br />
&lt;!--编译打包插件--&gt;<br />
&lt;plugins&gt;<br />
&lt;plugin&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;<br />
&lt;/plugin&gt;<br />
&lt;/plugins&gt;<br />
&lt;/build&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

**2.3 启动类**

在hm-gateway模块的com.hmall.gateway包下新建一个启动类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.gateway;<br />
<br />
import org.springframework.boot.SpringApplication;<br />
import org.springframework.boot.autoconfigure.SpringBootApplication;<br />
<br />
@SpringBootApplication<br />
public class GatewayApplication {<br />
public static void main(String[] args) {<br />
SpringApplication.run(GatewayApplication.class, args);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.4 配置路由**

在hm-gateway模块的resources目录新建一个application.yaml文件，内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8080<br />
spring:<br />
application:<br />
name: gateway<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.88.131:8848<br />
gateway:<br />
routes:<br />
- id: item # 路由规则id，自定义，唯一，建议与服务名称保持一致<br />
uri: lb://item-service # 路由的目标服务，lb代表负载均衡，会从注册中心拉取服务列表<br />
predicates: # 路由断言，判断当前请求是否符合当前规则，符合则路由到目标服务<br />
- Path=/items/**,/search/** # 这里是以请求路径作为判断规则，多个路径间用逗号隔开<br />
- id: cart<br />
uri: lb://cart-service<br />
predicates:<br />
- Path=/carts/**<br />
- id: user<br />
uri: lb://user-service<br />
predicates:<br />
- Path=/users/**,/addresses/**<br />
- id: trade<br />
uri: lb://trade-service<br />
predicates:<br />
- Path=/orders/**<br />
- id: pay<br />
uri: lb://pay-service<br />
predicates:<br />
- Path=/pay-orders/**</td>
</tr>
</tbody>
</table>

**2.5 测试**

启动GatewayApplication和其他微服务，以http://localhost:8080拼接微服务接口路径测试，例如：http://localhost:8080/items/page?pageNo=1&pageSize=5

**3.路由属性**

路由规则的定义语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
gateway:<br />
routes:<br />
- id: item<br />
uri: lb://item-service<br />
predicates:<br />
- Path=/items/**,/search/**</td>
</tr>
</tbody>
</table>

网关路由对应的Java类型是RouteDefinition，其中常见的属性有：

id：路由的唯一标示

predicates：路由断言，其实就是匹配条件，只有满足条件才能路由

filters：路由过滤条件，后面讲

uri：路由目标地址，lb://代表负载均衡，从注册中心获取目标微服务的实例列表，并且负载均衡选择一个访问

SpringCloudGateway中支持的断言类型有很多：

|                      |                                |                                                                                                             |
|----------------------|--------------------------------|-------------------------------------------------------------------------------------------------------------|
| 名称                 | 说明                           | 示例                                                                                                        |
| After                | 是某个时间点后的请求           | \- After=2037-01-20T17:42:47.789-07:00\[America/Denver\]                                                    |
| Before               | 是某个时间点之前的请求         | \- Before=2031-04-13T15:14:47.433+08:00\[Asia/Shanghai\]                                                    |
| Between              | 是某两个时间点之前的请求       | \- Between=2037-01-20T17:42:47.789-07:00\[America/Denver\], 2037-01-21T17:42:47.789-07:00\[America/Denver\] |
| Cookie               | 请求必须包含某些cookie         | \- Cookie=chocolate, ch.p                                                                                   |
| Header               | 请求必须包含某些header         | \- Header=X-Request-Id, \d+                                                                                 |
| Host                 | 请求必须是访问某个host（域名） | \- Host=.somehost.org,.anotherhost.org                                                                      |
| Method               | 请求方式必须是指定方式         | \- Method=GET,POST                                                                                          |
| Path                 | 请求路径必须符合指定规则       | \- Path=/red/{segment},/blue/\*\*                                                                           |
| Query                | 请求参数必须包含指定参数       | \- Query=name, Jack或者- Query=name                                                                         |
| RemoteAddr           | 请求者的ip必须是指定范围       | \- RemoteAddr=192.168.1.1/24                                                                                |
| weight               | 权重处理                       | -Weight=group1,2                                                                                            |
| XForwardedRemoteAddr | 基于请求的来源IP做判断         | -XForwardedRemoteAddr=192.168.1.1/24                                                                        |

网关中提供了33种路由过滤器，每种过滤器都有独特的作用：

|                      |                            |                                                   |
|----------------------|----------------------------|---------------------------------------------------|
| 名称                 | 说明                       | 示例                                              |
| AddRequestHeader     | 给当前请求添加一个请求头   | AddRequestHeader=headerName,headerValue           |
| RemoveRequestHeader  | 移除请求中的一个请求头     | RemoveRequestHeader=headerName                    |
| AddResponseHeader    | 给响应结果中添加一个响应头 | AddResponseHeader=headerName,headerValue          |
| RemoveResponseHeader | 从响应结果中移除一个响应头 | RemoveResponseHeader=headerName                   |
| RewritePath          | 请求路径重写               | RewritePath=/red/?(?\<segment\>.\*),/\$\\segment} |
| StringPrefix         | 去除请求路径中的N段前缀    | StringPrefix=1，则路径/a/b转发时只保留/b          |

**七、网关登录校验**

**1.思路分析**

单体架构中登录校验可以通过定义一个拦截器，在拦截器中对JWT令牌进行校验，但是微服务架构中如果每个微服务都定义拦截器进行登录校验就不合理了。

由于网关会拦截所有请求进行路由，所以可以在网关进行登录校验，秘钥只需要在网关和登录业务各放一份，此时登录校验流程如下：

<img src="../assets/SpringCloud笔记/media/image54.png" style="width:5.75in;height:1.5625in" />

这时就面临三个问题：

网关路由是配置的，请求转发时gateway内部代码，<u>怎么在转发前做登录校验？</u>

网关校验JWT令牌后，<u>怎么把用户信息传递给微服务？</u>

微服务之间的调用不经过网关，这时<u>怎么传递用户信息？</u>

**2.网关过滤器**

Gateway内部工作的基本原理：

客户端请求进入网关后由HandlerMapping对请求做判断，找到与当前请求匹配的路由规则（**Route**），然后将请求交给WebHandler去处理

WebHandler则会加载当前路由下需要执行的过滤器链（**Filter chain**），然后按照顺序逐一执行过滤器（后面称为**Filter**）

图中Filter被虚线分为左右两部分，是因为Filter内部的逻辑分为pre和post两部分，分别会在请求路由到微服务**之前**和**之后**被执行

只有所有Filter的pre逻辑都依次顺序执行通过后，请求才会被路由到微服务

微服务返回结果后，再倒序执行Filter的post逻辑

最终把响应结果返回

<img src="../assets/SpringCloud笔记/media/image55.png" style="width:5.75in;height:2.61458in" />

最终请求转发是由NettyRoutingFilter过滤器执行的，这个过滤器是整个过滤器链中最后一个，所以可以定义一个过滤器，在其中实现登录校验逻辑，并且将过滤器执行顺序定义到NettyRoutingFilter之前，从而实现登录校验。

网关过滤器链中的过滤器有两种：

GatewayFilter：路由过滤器，作用范围比较灵活，可以是任意指定的路由Route

GlobalFilter：全局过滤器，作用范围是所有路由，不可配置

其实GatewayFilter和GlobalFilter这两种过滤器的内容完全一样：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
/**<br />
* 处理请求并将其传递给下一个过滤器<br />
* @param exchange 当前请求的上下文，其中包含request、response等各种数据<br />
* @param chain 过滤器链，基于它向下传递请求<br />
* @return 根据返回值标记当前请求是否被完成或拦截，chain.filter(exchange)就放行了<br />
*/<br />
Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain);</td>
</tr>
</tbody>
</table>

FilteringWebHandler在处理请求时，会将GlobalFilter装饰为GatewayFilter，然后放到同一个过滤器链中，排序以后依次执行。

|                                                                                                                                                                                                                 |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **注意**：过滤器链之外还有一种过滤器HttpHeadersFilter，用来处理传递到下游微服务的请求头，例如org.springframework.cloud.gateway.filter.headers.XForwardedHeadersFilter可以传递代理请求原本的host头到下游微服务。 |

Gateway内置了很多的GatewayFilter，详情可以参考官方文档：

**\[该类型的内容暂不支持下载\]**

使用内置GatewayFilter只需要在yaml配置文件添加指定配置即可，配置在哪个Route下就作用于这个Route，比如添加请求头的过滤器AddRequestHeaderGatewayFilterFacotry配置方式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
gateway:<br />
routes:<br />
- id: test_route<br />
uri: lb://test-service<br />
predicates:<br />
-Path=/test/**<br />
filters:<br />
- AddRequestHeader=key, value # 逗号之前是请求头的key，逗号之后是value</td>
</tr>
</tbody>
</table>

如果想要让过滤器作用于所有的路由，则可以这样配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
gateway:<br />
default-filters: # default-filters下的过滤器可以作用于所有路由<br />
- AddRequestHeader=key, value<br />
routes:<br />
- id: test_route<br />
uri: lb://test-service<br />
predicates:<br />
-Path=/test/**</td>
</tr>
</tbody>
</table>

**3.自定义过滤器**

无论是GatewayFilter还是GlobalFilter都支持自定义，只不过**编码**方式、**使用**方式略有差别。

**3.1 自定义GatewayFilter**

**3.1.1 无参GatewayFilter**

自定义GatewayFilter需要实现AbstractGatewayFilterFactory，简单无参的定义方式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Component<br />
public class PrintAnyGatewayFilterFactory extends AbstractGatewayFilterFactory&lt;Object&gt; {<br />
@Override<br />
public GatewayFilter apply(Object config) {<br />
return new GatewayFilter() {<br />
@Override<br />
public Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain) {<br />
// 获取请求<br />
ServerHttpRequest request = exchange.getRequest();<br />
// 编写过滤器逻辑<br />
System.out.println("过滤器执行了");<br />
// 放行<br />
return chain.filter(exchange);<br />
}<br />
};<br />
}<br />
}</td>
</tr>
</tbody>
</table>

|                                                              |
|--------------------------------------------------------------|
| **注意**：该类的名称一定要以**GatewayFilterFactory**为后缀！ |

然后在yaml配置中使用：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
gateway:<br />
default-filters:<br />
- PrintAny # 此处直接以自定义的GatewayFilterFactory类名前缀声明过滤器</td>
</tr>
</tbody>
</table>

由于NettyRoutingFilter是做路由转发的，如果想要PrintAnyGatewayFilterFactory一定在NettyRoutingFilter之前执行，就需要创建OrderedGatewayFilter的对象：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Component<br />
public class PrintAnyGatewayFilterFactory extends AbstractGatewayFilterFactory&lt;Object&gt; {<br />
@Override<br />
public GatewayFilter apply(Object config) {<br />
return new OrderedGatewayFilter(new GatewayFilter(){<br />
@Override<br />
public Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain) {<br />
// 获取请求<br />
ServerHttpRequest request = exchange.getRequest();<br />
// 编写过滤器逻辑<br />
System.out.println("过滤器执行了");<br />
// 放行<br />
return chain.filter(exchange);<br />
}<br />
}, 1);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

过滤器底层是通过实现Ordered来设置优先级的，它的值越小优先级越高，而NettyRoutingFilter的排序值为int最大值，所以最后执行，我们设置为1就保证了自定义过滤器一定在NettyRoutingFilter之前执行。

**3.1.2 带参GatewayFilter**

自定义GatewayFilter还支持动态配置参数，只是实现比较复杂：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Component<br />
public class PrintAnyGatewayFilterFactory extends AbstractGatewayFilterFactory&lt;PrintAnyGatewayFilterFactory.Config&gt; { // 父类泛型是内部类的Config类型<br />
@Override<br />
public GatewayFilter apply(Config config) {<br />
// OrderedGatewayFilter是GatewayFilter的子类，包含两个参数：<br />
// - GatewayFilter：过滤器<br />
// - int order值：值越小，过滤器执行优先级越高<br />
return new OrderedGatewayFilter(new GatewayFilter() {<br />
@Override<br />
public Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain) {<br />
// 获取config值<br />
String a = config.getA();<br />
String b = config.getB();<br />
String c = config.getC();<br />
// 编写过滤器逻辑<br />
System.out.println("a = " + a);<br />
System.out.println("b = " + b);<br />
System.out.println("c = " + c);<br />
// 放行<br />
return chain.filter(exchange);<br />
}<br />
}, 100);<br />
}<br />
<br />
// 自定义配置属性，成员变量名称很重要，下面会用到<br />
@Data<br />
static class Config{<br />
private String a;<br />
private String b;<br />
private String c;<br />
}<br />
// 将变量名称依次返回，顺序很重要，将来读取参数时需要按顺序获取<br />
@Override<br />
public List&lt;String&gt; shortcutFieldOrder() {<br />
return List.of("a", "b", "c");<br />
}<br />
// 返回当前配置类的类型，也就是内部的Config<br />
@Override<br />
public Class&lt;Config&gt; getConfigClass() {<br />
return Config.class;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

然后在yaml文件中使用：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
gateway:<br />
default-filters:<br />
- PrintAny=1,2,3 # 注意，这里多个参数以","隔开，将来会按照shortcutFieldOrder()方法返回的参数顺序依次赋值</td>
</tr>
</tbody>
</table>

这种配置方式参数必须严格按照shortcutFieldOrder()方法的返回参数名顺序来赋值。当然，也可以手动指定参数名：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
gateway:<br />
default-filters:<br />
- name: PrintAny<br />
args: # 手动指定参数名，无需按照参数顺序<br />
a: 1<br />
b: 2<br />
c: 3</td>
</tr>
</tbody>
</table>

**3.2 自定义GlobalFilter**

自定义GlobalFilter直接实现GlobalFilter即可，无法设置动态参数：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Component<br />
public class PrintAnyGlobalFilter implements GlobalFilter, Ordered {<br />
@Override<br />
public Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain) {<br />
// 编写过滤器逻辑<br />
System.out.println("未登录，无法访问");<br />
// 放行<br />
// return chain.filter(exchange);<br />
<br />
// 拦截<br />
ServerHttpResponse response = exchange.getResponse();<br />
response.setRawStatusCode(401);<br />
return response.setComplete();<br />
}<br />
<br />
@Override<br />
public int getOrder() {<br />
// 过滤器执行顺序，值越小，优先级越高<br />
return 0;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.登录校验**

**4.1 JWT工具**

登录校验需要用到JWT，而且JWT的加密需要密钥和加密工具，这些在hm-service中已经有了，直接拷贝过来：

<img src="../assets/SpringCloud笔记/media/image56.png" style="width:5.75in;height:1.88542in" />

AuthProperties：配置登录校验需要拦截的路径，因为不是所有的路径都需要登录才能访问

JwtProperties：定义与JWT工具有关的属性，比如秘钥文件位置

SecurityConfig：工具的自动装配

JwtTool：JWT工具，其中包含了校验和解析token的功能

hmall.jks：秘钥文件

其中AuthProperties和JwtProperties所需的属性要在application.yaml中配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
hm:<br />
jwt:<br />
location: classpath:hmall.jks # 秘钥地址<br />
alias: hmall # 秘钥别名<br />
password: hmall123 # 秘钥文件密码<br />
tokenTTL: 30m # 登录有效期<br />
auth:<br />
excludePaths: # 无需登录校验的路径<br />
- /search/**<br />
- /users/login<br />
- /items/**</td>
</tr>
</tbody>
</table>

**4.2 登录校验过滤器**

定义登录校验过滤器AuthGlobalFilter：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.gateway.filter;<br />
<br />
import com.hmall.common.utils.CollUtils;<br />
import com.hmall.gateway.config.AuthProperties;<br />
import com.hmall.gateway.util.JwtTool;<br />
import lombok.RequiredArgsConstructor;<br />
import org.springframework.boot.context.properties.EnableConfigurationProperties;<br />
import org.springframework.cloud.gateway.filter.GatewayFilterChain;<br />
import org.springframework.cloud.gateway.filter.GlobalFilter;<br />
import org.springframework.core.Ordered;<br />
import org.springframework.http.server.reactive.ServerHttpRequest;<br />
import org.springframework.http.server.reactive.ServerHttpResponse;<br />
import org.springframework.stereotype.Component;<br />
import org.springframework.util.AntPathMatcher;<br />
import org.springframework.web.server.ServerWebExchange;<br />
import reactor.core.publisher.Mono;<br />
import java.util.List;<br />
<br />
@Component<br />
@RequiredArgsConstructor<br />
@EnableConfigurationProperties(AuthProperties.class) //将配置类AuthProperties注册到IOC容器<br />
public class AuthGlobalFilter implements GlobalFilter, Ordered {<br />
private final JwtTool jwtTool;<br />
private final AuthProperties authProperties;<br />
private final AntPathMatcher antPathMatcher = new AntPathMatcher(); //AntPathMatcher未被注册为bean，所以手动new出来<br />
<br />
@Override<br />
public Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain) {<br />
//1.获取Request<br />
ServerHttpRequest request = exchange.getRequest();<br />
//2.判断是否不需要拦截<br />
if(isExclude(request.getPath().toString())){<br />
//不需要拦截，直接放行<br />
return chain.filter(exchange);<br />
}<br />
//3.获取请求头中的token<br />
String token = null;<br />
List&lt;String&gt; headers = request.getHeaders().get("authorization");<br />
if(!CollUtils.isEmpty(headers)){<br />
token = headers.get(0);<br />
}<br />
//4.校验并解析token<br />
Long userId = null;<br />
try {<br />
userId = jwtTool.parseToken(token);<br />
} catch (Exception e) {<br />
//如果无效的token，拦截，响应401<br />
ServerHttpResponse response = exchange.getResponse();<br />
response.setRawStatusCode(401);<br />
return response.setComplete();<br />
}<br />
//TODO 5.如果有效，传递用户信息<br />
System.out.println("userId: " + userId);<br />
//6.放行<br />
return chain.filter(exchange);<br />
}<br />
<br />
//判断路径是否是不需要拦截的路径<br />
private boolean isExclude(String antPath){<br />
for (String pathPattern : authProperties.getExcludePaths()) {<br />
if(antPathMatcher.match(pathPattern, antPath)){<br />
return true;<br />
}<br />
}<br />
return false;<br />
}<br />
<br />
@Override<br />
public int getOrder() {<br />
return 0;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**测试**：打开浏览器，访问http://localhost:8080/items/page?pageNo=1&pageSize=3可以正常访问，访问http://localhost:8080/carts/list出现401错误。

**5.微服务获取用户**

要把用户信息携带到下游微服务，只需要把用户信息放到HTTP请求头中，在微服务端可以定义一个SpringMVC的拦截器从请求头中获取用户信息并存入ThreadLocal，供后续使用，整体流程如下：

<img src="../assets/SpringCloud笔记/media/image57.png" style="width:5.75in;height:2.38542in" />

**5.1 保存用户到请求头**

完善AuthGlobalFilter过滤器的传递用户信息逻辑：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Mono&lt;Void&gt; filter(ServerWebExchange exchange, GatewayFilterChain chain) {<br />
... //其他逻辑不变<br />
//5.如果有效，传递用户信息<br />
String userInfo = userId.toString();<br />
ServerWebExchange ex = exchange.mutate()<br />
.request(b -&gt; b.header("user-info", userInfo))<br />
.build();<br />
//6.放行<br />
return chain.filter(ex);<br />
}</td>
</tr>
</tbody>
</table>

**5.2 拦截器获取用户**

由于每个微服务都引入了hm-common的依赖，所以SpringMVC的拦截器写到hm-common模块即可。

编写拦截器UserInfoInterceptor在com.hmall.common.interceptor包下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.common.interceptor;<br />
<br />
import cn.hutool.core.util.StrUtil;<br />
import com.hmall.common.utils.UserContext;<br />
import org.springframework.web.servlet.HandlerInterceptor;<br />
<br />
import javax.servlet.http.HttpServletRequest;<br />
import javax.servlet.http.HttpServletResponse;<br />
<br />
public class UserInfoInterceptor implements HandlerInterceptor {<br />
@Override<br />
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {<br />
// 1.获取请求头中的用户信息<br />
String userInfo = request.getHeader("user-info");<br />
// 2.判断是否为空<br />
if (StrUtil.isNotBlank(userInfo)) {<br />
// 不为空，保存到ThreadLocal<br />
UserContext.setUser(Long.valueOf(userInfo));<br />
}<br />
// 3.放行<br />
return true;<br />
}<br />
<br />
@Override<br />
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {<br />
// 移除用户<br />
UserContext.removeUser();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

在hm-common模块下编写SpringMVC的配置类MvcConfig，配置登录拦截器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.common.config;<br />
<br />
import com.hmall.common.interceptor.UserInfoInterceptor;<br />
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;<br />
import org.springframework.context.annotation.Configuration;<br />
import org.springframework.web.servlet.DispatcherServlet;<br />
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;<br />
<br />
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;<br />
<br />
@Configuration<br />
@ConditionalOnClass(DispatcherServlet.class)<br />
public class MvcConfig implements WebMvcConfigurer {<br />
@Override<br />
public void addInterceptors(InterceptorRegistry registry) {<br />
registry.addInterceptor(new UserInfoInterceptor());<br />
}<br />
}</td>
</tr>
</tbody>
</table>

由于MvcConfig位于com.hmall.common.config包下，与其他微服务的包名不一致，所以并不会被扫描生效，基于SpringBoot自动装配原理，需要将其添加到resource目录下的META-INF/spring.factories文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\<br />
com.hmall.common.config.MyBatisConfig,\<br />
com.hmall.common.config.JsonConfig,\<br />
com.hmall.common.config.MvcConfig</td>
</tr>
</tbody>
</table>

**5.3 恢复购物车代码**

之前无法获取登录用户，所以把购物车服务的登录用户写死了，现在需要恢复到原来的样子。

找到cart-service模块的com.hmall.cart.service.impl.CartServiceImpl，修改其中的queryMyCarts方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public List&lt;CartVO&gt; queryMyCarts() {<br />
// 1.查询我的购物车列表<br />
List&lt;Cart&gt; carts = lambdaQuery().eq(Cart::getUserId, UserContext.getUser()).list();<br />
if (CollUtils.isEmpty(carts)) {<br />
return CollUtils.emptyList();<br />
}<br />
// 2.转换VO<br />
List&lt;CartVO&gt; vos = BeanUtils.copyList(carts, CartVO.class);<br />
// 3.处理VO中的商品信息<br />
handleCartItems(vos);<br />
// 4.返回<br />
return vos;<br />
}</td>
</tr>
</tbody>
</table>

**6.OpenFeign传递用户**

**6.1 问题分析**

微服务之间也会有相互调用，这个调用不经过网关，所以无法传递用户信息，比如用户下单时，订单服务会调用商品服务扣减库存、调用购物车服务清空购物车：

<img src="../assets/SpringCloud笔记/media/image58.png" style="width:5.75in;height:2.15625in" />

所以需要在微服务发起调用时把用户信息放入请求头，但是微服务间的调用是由OpenFeign发起的，所以可以借助Feign中提供的拦截器接口feign.RequestInterceptor：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public interface RequestInterceptor {<br />
<br />
/**<br />
* Called for every request.<br />
* Add data using methods on the supplied {@link RequestTemplate}.<br />
*/<br />
void apply(RequestTemplate template);<br />
}</td>
</tr>
</tbody>
</table>

我们只需要实现这个接口，然后实现apply方法，利用RequestTemplate类将用户信息保存到请求头即可。

**6.2 代码实现**

由于FeignClient全部在hm-api模块，因此在hm-api模块的com.hmall.api.config.DefaultFeignConfig中编写拦截器。

在hm-api模块的pom文件引入hm-common依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--hm-common--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.heima&lt;/groupId&gt;<br />
&lt;artifactId&gt;hm-common&lt;/artifactId&gt;<br />
&lt;version&gt;1.0.0&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

在DefaultFeignConfig中添加一个bean：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Bean<br />
public RequestInterceptor userInfoRequestInterceptor(){<br />
return new RequestInterceptor() {<br />
@Override<br />
public void apply(RequestTemplate requestTemplate) {<br />
//获取登录用户信息<br />
Long userId = UserContext.getUser();<br />
if(userId == null){<br />
//如果为空则直接跳过<br />
return;<br />
}<br />
//如果不为空则放入请求头中，传递给下游微服务<br />
requestTemplate.header("user-info", userId.toString());<br />
}<br />
};<br />
}</td>
</tr>
</tbody>
</table>

在每个微服务模块的启动类@EnableFeignClients注解中加上defaultConfiguration = DefaultFeignConfig.class使其生效：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@EnableFeignClients(basePackages = "com.hmall.api.client", defaultConfiguration = DefaultFeignConfig.class)</td>
</tr>
</tbody>
</table>

之后访问http://localhost:18080进行下单测试就可以。

**八、配置管理**

目前已经解决了微服务的基本问题，但是目前的微服务架构还存在一些问题：

网关路由在配置文件中写死了，如果变更必须重启微服务

某些业务配置在配置文件中写死了，每次修改都要重启服务

每个微服务都有很多重复的配置，维护成本高

可以通过统一的**配置管理器服务**解决，当在配置管理器中修改公共配置后，配置管理器服务会把修改的配置推送给相关的微服务，无需重启即可生效，从而实现配置热更新。

Nacos不仅仅具备注册中心功能，也具备配置管理的功能：

<img src="../assets/SpringCloud笔记/media/image59.png" style="width:5.75in;height:2.08333in" />

**1.配置共享**

**1.1 添加共享配置**

以cart-service为例，其中JDBC相关配置、日志配置、swagger配置是基本固定的，而且其他微服务都需要使用，可以进行抽取，抽取到nacos的配置中心。

可以抽取的配置内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
# JDBC相关配置，包含数据库连接配置和mybatisplus配置<br />
spring:<br />
datasource:<br />
url: jdbc:mysql://${hm.db.host}:3306/hm-cart?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: root<br />
password: ${hm.db.pw}<br />
mybatis-plus:<br />
configuration:<br />
default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler<br />
global-config:<br />
db-config:<br />
update-strategy: not_null<br />
id-type: auto<br />
<br />
# 日志配置<br />
logging:<br />
level:<br />
com.hmall: debug<br />
pattern:<br />
dateformat: HH:mm:ss:SSS<br />
file:<br />
path: "logs/${spring.application.name}"<br />
<br />
# swagger和OpenFeign的配置<br />
knife4j:<br />
enable: true<br />
openapi:<br />
title: 购物车服务接口文档<br />
description: "购物车服务接口文档"<br />
email: zhanghuyi@itcast.cn<br />
concat: 虎哥<br />
url: https://www.itcast.cn<br />
version: v1.0.0<br />
group:<br />
default:<br />
group-name: default<br />
api-rule: package<br />
api-rule-resources:<br />
- com.hmall.cart.controller</td>
</tr>
</tbody>
</table>

接下来在nacos控制台分别添加这些配置。

**1.1.1 JDBC相关配置**

在 配置管理 -\> 配置列表 中点击+新建一个配置：

<img src="../assets/SpringCloud笔记/media/image60.png" style="width:5.75in;height:1.4375in" />

在弹出的表单中填写信息：

<img src="../assets/SpringCloud笔记/media/image61.png" style="width:5.75in;height:1.84375in" />

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
datasource:<br />
url: jdbc:mysql://${hm.db.host:192.168.150.101}:${hm.db.port:3306}/${hm.db.database}?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: ${hm.db.un:root}<br />
password: ${hm.db.pw:123}<br />
mybatis-plus:<br />
configuration:<br />
default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler<br />
global-config:<br />
db-config:<br />
update-strategy: not_null<br />
id-type: auto</td>
</tr>
</tbody>
</table>

其中：

Data ID一定要带后缀名，否则无法获取配置（类似yaml文件命名）

为了避免某些配置写死，可以通过\${配置项名称\[:默认值\]}指定，\[\]代表可以省略，例如\${hm.db.host:192.168.150.101}表示将来数据库IP通过微服务配置文件的配置项hm.db.host读取，如果没有读取到，就采用默认值192.168.150.101

编写好之后发布即可。

**1.1.2 日志配置**

同理，新建一个配置项，Data ID使用shared-log.yaml，添加以下配置信息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
logging:<br />
level:<br />
com.hmall: debug<br />
pattern:<br />
dateformat: HH:mm:ss:SSS<br />
file:<br />
path: "logs/${spring.application.name}"</td>
</tr>
</tbody>
</table>

**1.1.3 swagger配置**

新建一个配置项，Data ID使用shared-swagger.yaml，添加以下配置信息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
knife4j:<br />
enable: true<br />
openapi:<br />
title: ${hm.swagger.title:黑马商城接口文档}<br />
description: ${hm.swagger.description:黑马商城接口文档}<br />
email: ${hm.swagger.email:zhanghuyi@itcast.cn}<br />
concat: ${hm.swagger.concat:虎哥}<br />
url: https://www.itcast.cn<br />
version: v1.0.0<br />
group:<br />
default:<br />
group-name: default<br />
api-rule: package<br />
api-rule-resources:<br />
- ${hm.swagger.package}</td>
</tr>
</tbody>
</table>

**1.2 拉取共享配置**

项目在启动时会加载两个上下文，分别是SpringCloud上下文和SpringBoot上下文，其中，拉取Nacos配置在SpringCloud上下文，而SpringCloud上下文先被拉取，但是nacos地址在SpringBoot上下文中，为了获取nacos地址读取nacos配置，SpringCloud上下文加载时会先加载bootstrap.yaml（或bootstrap.properties）配置文件，然后再加载Nacos配置，如下：

<img src="../assets/SpringCloud笔记/media/image62.png" style="width:5.75in;height:1.96875in" />

如果将nacos地址配置到bootstrap.yaml中，那么在项目引导阶段就可以读取nacos中的配置了，具体配置步骤如下：

1）在cart-service模块引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--nacos配置管理--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-config&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--读取bootstrap文件--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-bootstrap&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

2）在cart-service中的resources目录新建一个bootstrap.yaml文件，内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
application:<br />
name: cart-service # 服务名称<br />
profiles:<br />
active: dev<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101:8848 # nacos地址<br />
config:<br />
file-extension: yaml # 文件后缀名<br />
shared-configs: # 共享配置<br />
- dataId: shared-jdbc.yaml # 共享mybatis配置<br />
- dataId: shared-log.yaml # 共享日志配置<br />
- dataId: shared-swagger.yaml # 共享日志配置</td>
</tr>
</tbody>
</table>

3）修改application.yaml为如下内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8082<br />
feign:<br />
okhttp:<br />
enabled: true # 开启OKHttp<br />
hm:<br />
swagger:<br />
package: com.hmall.cart.controller<br />
title: 购物车服务接口文档<br />
description: "购物车服务接口文档"<br />
db:<br />
database: hm-cart</td>
</tr>
</tbody>
</table>

最后重启服务测试会发现业务没有问题，说明配置起效果了。

**2.配置热更新**

实际开发中有很多业务参数可能需要调整，比如黑马商城中购物车数量，现在默认是10，如果想要修改为其他，就需要重启微服务，这就需要Nacos的配置热更新。实现步骤分为两步：

在Nacos中添加配置

在微服务读取配置

**2.1 添加配置到Nacos**

在nacos中添加一个配置文件，将购物车的上限数量添加到配置中：

<img src="../assets/SpringCloud笔记/media/image63.png" style="width:5.75in;height:1.23958in" />

Data ID的格式必须遵守如下规则：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Plaintext<br />
[服务名]-[spring.profiles.active].[后缀名]</td>
</tr>
</tbody>
</table>

**服务名**：我们是购物车服务，所以是cart-service，非特殊情况最好和spring boot的spring.application.name一致

**spring.profiles.active**：环境标识，就是spring boot中的spring.active.profile，可以省略，则所有profile共享该配置

**后缀名**：例如yaml

这里使用cart-service.yaml这个Data ID，不管是dev还是local环境都可以共享该配置，配置内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
hm:<br />
cart:<br />
maxAmount: 1 # 购物车商品数量上限</td>
</tr>
</tbody>
</table>

**2.2 配置热更新**

在cart-service中新建一个属性读取类CartProperties：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.cart.config;<br />
<br />
import lombok.Data;<br />
import org.springframework.boot.context.properties.ConfigurationProperties;<br />
import org.springframework.stereotype.Component;<br />
<br />
@Data<br />
@Component<br />
@ConfigurationProperties(prefix = "hm.cart")<br />
public class CartProperties {<br />
private Integer maxAmount;<br />
}</td>
</tr>
</tbody>
</table>

将CartServiceImpl中checkCartFull方法中固定值10修改为从配置属性类中获取（其他逻辑不变）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.cart.service.impl;<br />
<br />
@Service<br />
@RequiredArgsConstructor<br />
public class CartServiceImpl extends ServiceImpl&lt;CartMapper, Cart&gt; implements ICartService {<br />
... //其他内容不变<br />
private final CartProperties cartProperties;<br />
... //其他内容不变<br />
private void checkCartsFull(Long userId) {<br />
int count = lambdaQuery().eq(Cart::getUserId, userId).count();<br />
if (count &gt;= cartProperties.getMaxAmount()) {<br />
throw new BizIllegalException(StrUtil.format("用户购物车课程不能超过{}", cartProperties.getMaxAmount()));<br />
}<br />
}<br />
... //其他内容不变<br />
}</td>
</tr>
</tbody>
</table>

重启购物车服务，测试向购物车中添加商品，然后修改nacos中的购物车最大商品数量，再次测试添加商品到购物车，最后会发现不用重启微服务配置也能生效。

**3.动态路由**

网关的路由配置在项目启动时会由org.springframework.cloud.gateway.route.CompositeRouteDefinitionLocator加载并缓存到内存的路由表（一个Map），以后都不会变化，即使nacos推送配置更新到网关，网关没有添加监听也就不会更新路由表。

为了在不重启网关的情况下监听路由变更从而更新路由表，需要手动添加监听并更新路由表。

**3.1 监听Nacos配置变更**

Nacos官网给出了手动监听Nacos配置变更的SDK：

**\[该类型的内容暂不支持下载\]**

如果希望 Nacos 推送配置变更，可以使用 Nacos 动态监听配置接口来实现：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
/**<br />
* @param dataId 配置ID，保证全局唯一性，只允许英文字符和4中特殊字符(. : - _ )，不超过256字节<br />
* @param group 配置分组，一般是默认的DEFAULT_GROUP<br />
* @param listener 监听器，配置变更时进入调用监听里的回调函数<br />
*/<br />
<br />
public void addListener(String dataId, String group, Listener listener)</td>
</tr>
</tbody>
</table>

代码示例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
String serverAddr = "{serverAddr}"; //nacos地址<br />
String dataId = "{dataId}"; //配置ID<br />
String group = "{group}"; //配置分组<br />
<br />
// 1.创建ConfigService，连接Nacos<br />
Properties properties = new Properties();<br />
properties.put("serverAddr", serverAddr);<br />
ConfigService configService = NacosFactory.createConfigService(properties);<br />
<br />
// 2.读取配置，得到配置字符串<br />
String content = configService.getConfig(dataId, group, 5000);<br />
<br />
// 3.添加配置监听器<br />
configService.addListener(dataId, group, new Listener() {<br />
//配置变更时的回调函数<br />
@Override<br />
public void receiveConfigInfo(String configInfo) {<br />
System.out.println("recieve1:" + configInfo);<br />
}<br />
//可以使用线程池处理配置变更<br />
@Override<br />
public Executor getExecutor() {<br />
return null;<br />
}<br />
});</td>
</tr>
</tbody>
</table>

由于我们引入了spring-cloud-starter-alibaba-nacos-config依赖，所以项目启动时com.alibaba.cloud.nacos.NacosConfigAutoConfiguration会自动创建ConfigService：

<img src="../assets/SpringCloud笔记/media/image64.png" style="width:5.75in;height:2.58333in" />

NacosConfigManager是负责管理Nacos的ConfigService的，所以只要拿到NacosConfigManager就等于拿到了ConfigService：

<img src="../assets/SpringCloud笔记/media/image65.png" style="width:5.75in;height:2.90625in" />

项目启动时不仅需要添加监听器，还要先读取配置，因此建议使用的API是这个：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//读取配置并添加监听器，返回值表示读取的配置信息字符串<br />
String getConfigAndSignListener(<br />
String dataId, // 配置文件id<br />
String group, // 配置组，走默认<br />
long timeoutMs, // 读取配置的超时时间<br />
Listener listener // 监听器<br />
) throws NacosException;</td>
</tr>
</tbody>
</table>

**3.2 更新路由**

知道怎么监听nacos配置变更后，接下来就是更新路由表，更新路由需要使用RouteDefinitionWriter接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package org.springframework.cloud.gateway.route;<br />
<br />
import reactor.core.publisher.Mono;<br />
<br />
/**<br />
* @author Spencer Gibb<br />
*/<br />
public interface RouteDefinitionWriter {<br />
//更新路由到路由表，如果路由id重复，则会覆盖旧的路由<br />
Mono&lt;Void&gt; save(Mono&lt;RouteDefinition&gt; route);<br />
<br />
//根据路由id删除某个路由<br />
Mono&lt;Void&gt; delete(Mono&lt;String&gt; routeId);<br />
<br />
}</td>
</tr>
</tbody>
</table>

更新路由到路由表需要使用到RouteDefinition，其中包含如下字段：

id：路由id

predicates：路由匹配规则

filters：路由过滤器

uri：路由目的地

将来保存到Nacos的配置需要包含这些字段，由于JSON和RouteDefinition的转换比较方便，这里使用JSON格式保存路由配置，格式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"id": "item",<br />
"predicates": [{<br />
"name": "Path",<br />
"args": {"_genkey_0":"/items/**", "_genkey_1":"/search/**"}<br />
}],<br />
"filters": [],<br />
"uri": "lb://item-service"<br />
}</td>
</tr>
</tbody>
</table>

以上JSON就相当于如下YAML配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
gateway:<br />
routes:<br />
- id: item<br />
uri: lb://item-service<br />
predicates:<br />
- Path=/items/**,/search/**</td>
</tr>
</tbody>
</table>

当然，路由配置可能有多个，所以JSON就变成了多个这样的JSON配置组成的数组。

**3.3 实现动态路由**

在网关gateway引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--统一配置管理--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-config&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--加载bootstrap--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-bootstrap&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

在网关gateway的resources目录创建bootstrap.yaml文件，内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
application:<br />
name: gateway<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101<br />
config:<br />
file-extension: yaml<br />
shared-configs:<br />
- dataId: shared-log.yaml # 共享日志配置</td>
</tr>
</tbody>
</table>

修改gateway的resources目录下的application.yml，删除之前的路由，最终内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8080<br />
hm:<br />
jwt:<br />
location: classpath:hmall.jks # 秘钥地址<br />
alias: hmall # 秘钥别名<br />
password: hmall123 # 秘钥文件密码<br />
tokenTTL: 30m # 登录有效期<br />
auth:<br />
excludePaths: # 无需登录校验的路径<br />
- /search/**<br />
- /users/login<br />
- /items/**</td>
</tr>
</tbody>
</table>

在gateway中定义配置监听器DynamicRouteLoader：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.gateway.route;<br />
<br />
import cn.hutool.json.JSONUtil;<br />
import com.alibaba.cloud.nacos.NacosConfigManager;<br />
import com.alibaba.nacos.api.config.listener.Listener;<br />
import com.alibaba.nacos.api.exception.NacosException;<br />
import com.hmall.common.utils.CollUtils;<br />
import lombok.RequiredArgsConstructor;<br />
import lombok.extern.slf4j.Slf4j;<br />
import org.springframework.cloud.gateway.route.RouteDefinition;<br />
import org.springframework.cloud.gateway.route.RouteDefinitionWriter;<br />
import org.springframework.stereotype.Component;<br />
import reactor.core.publisher.Mono;<br />
<br />
import javax.annotation.PostConstruct;<br />
import java.util.HashSet;<br />
import java.util.List;<br />
import java.util.Set;<br />
import java.util.concurrent.Executor;<br />
<br />
@Slf4j<br />
@Component<br />
@RequiredArgsConstructor<br />
public class DynamicRouteLoader {<br />
private final RouteDefinitionWriter writer;<br />
private final NacosConfigManager nacosConfigManager;<br />
private final String dataId = "gateway-routes.json"; //路由配置文件的Data ID<br />
private final String group = "DEFAULT_GROUP"; //路由配置文件分组<br />
private final Set&lt;String&gt; routeIds = new HashSet&lt;&gt;(); //更新过的路由id集合<br />
<br />
@PostConstruct //当前类初始化完成后执行一次<br />
public void initRouteConfigListener() throws NacosException {<br />
// 1.注册监听器并首次拉取配置<br />
String configInfo = nacosConfigManager.getConfigService().getConfigAndSignListener(dataId, group, 5000, new Listener() {<br />
@Override<br />
public Executor getExecutor() {<br />
return null;<br />
}<br />
<br />
@Override<br />
public void receiveConfigInfo(String configInfo) {<br />
//监听到配置变更，更新配置<br />
updateConfigInfo(configInfo);<br />
}<br />
});<br />
// 2.首次启动时，更新一次配置<br />
updateConfigInfo(configInfo);<br />
}<br />
<br />
private void updateConfigInfo(String configInfo) {<br />
log.debug("监听到路由配置变更，{}", configInfo);<br />
// 1.反序列化<br />
List&lt;RouteDefinition&gt; routeDefinitions = JSONUtil.toList(configInfo, RouteDefinition.class);<br />
// 2.更新前先清空旧路由<br />
// 2.1 清除旧路由<br />
for (String routeId : routeIds) {<br />
writer.delete(Mono.just(routeId)).subscribe();<br />
}<br />
routeIds.clear();<br />
// 2.2 判断是否有新的路由要更新<br />
if(CollUtils.isEmpty(routeDefinitions)){<br />
// 没有新的路由配置，直接结束<br />
return;<br />
}<br />
// 3.更新路由<br />
routeDefinitions.forEach(routeDefinition -&gt; {<br />
// 3.1 更新路由<br />
writer.save(Mono.just(routeDefinition)).subscribe();<br />
// 3.2 记录路由ID，方便将来删除<br />
routeIds.add(routeDefinition.getId());<br />
});<br />
}<br />
}</td>
</tr>
</tbody>
</table>

此时重启后还无法访问后端服务，因为nacos缺少路由配置gateway-routes.json，我们添加上去即可：

<img src="../assets/SpringCloud笔记/media/image66.png" style="width:5.75in;height:1.57292in" />

配置内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
[<br />
{<br />
"id": "item",<br />
"predicates": [{<br />
"name": "Path",<br />
"args": {"_genkey_0":"/items/**", "_genkey_1":"/search/**"}<br />
}],<br />
"filters": [],<br />
"uri": "lb://item-service"<br />
},<br />
{<br />
"id": "cart",<br />
"predicates": [{<br />
"name": "Path",<br />
"args": {"_genkey_0":"/carts/**"}<br />
}],<br />
"filters": [],<br />
"uri": "lb://cart-service"<br />
},<br />
{<br />
"id": "user",<br />
"predicates": [{<br />
"name": "Path",<br />
"args": {"_genkey_0":"/users/**", "_genkey_1":"/addresses/**"}<br />
}],<br />
"filters": [],<br />
"uri": "lb://user-service"<br />
},<br />
{<br />
"id": "trade",<br />
"predicates": [{<br />
"name": "Path",<br />
"args": {"_genkey_0":"/orders/**"}<br />
}],<br />
"filters": [],<br />
"uri": "lb://trade-service"<br />
},<br />
{<br />
"id": "pay",<br />
"predicates": [{<br />
"name": "Path",<br />
"args": {"_genkey_0":"/pay-orders/**"}<br />
}],<br />
"filters": [],<br />
"uri": "lb://pay-service"<br />
}<br />
]</td>
</tr>
</tbody>
</table>

最后无需重启网关访问http://localhost:8080/search/list?pageNo=1&pageSize=1发现可以看到数据了。

**九、微服务保护**

对于微服务群来说，如果一个微服务因为某个原因阻塞，由于微服务的相互调用，调用这个微服务的微服务服务会等待请求响应，从而也发生阻塞，而被迫阻塞的微服务也可能被其他微服务调用，这时其他微服务也会阻塞，这种由于一个微服务阻塞导致大量微服务阻塞的现象就是级联失败导致的**雪崩问题**，微服务保护就是用来解决雪崩问题的。

<img src="../assets/SpringCloud笔记/media/image67.png" style="width:5.75in;height:2.02083in" />

**1.服务保护方案**

微服务保护的方案有很多，比如：

请求限流

线程隔离

服务熔断

这些方案或多或少都会导致服务的体验上略有下降，比如请求限流降低了并发上限；线程隔离降低了可用资源数量；服务熔断降低了服务的完整度，部分服务变的不可用或弱可用，因此这些方案都属于**服务降级**的方案，但通过这些方案，服务的健壮性得到了提升。

**1.1 请求限流**

当突然有大量请求访问同一服务时，服务就可能发生阻塞或故障，从而引发雪崩问题，请求限流就是**利用限流器限制或控制接口访问的并发量**，使请求处于服务可接受范围内，避免服务因流量激增而出现故障：

<img src="../assets/SpringCloud笔记/media/image68.png" style="width:5.75in;height:2.05208in" />

**1.2 线程隔离**

请求限流只是限制了作用在服务提供者上的请求流量，但是服务消费者（服务调用者）仍然可能面临高并发，在高并发下，服务消费者的线程资源可能会被耗尽，如果高并发都是调用服务提供者A，此时由于A的阻塞调用服务提供者B的业务就会没有线程资源可用，也就是说服务提供者A的阻塞导致服务消费者线程资源被耗尽，从而影响服务消费者调用其他微服务的效率。

线程隔离的思想是为每个业务限定线程数量，这个业务线程使用完了，也不会使用其他业务的线程，而是响应一个错误或特殊处理，从而**将业务隔离起来**，保证同一个微服务多个业务间不会影响：

<img src="../assets/SpringCloud笔记/media/image69.png" style="width:5.75in;height:2.01042in" />

**1.3 服务熔断**

线程隔离虽然避免了雪崩问题，但故障服务（商品服务）依然会拖慢购物车服务（服务调用方）的接口响应速度。而且商品查询的故障依然会导致查询购物车功能出现故障，购物车业务也变的不可用了。所以，我们要做两件事情：

**编写服务降级逻辑**：服务调用失败后的处理逻辑，根据业务场景，可以抛出异常，也可以返回友好提示或默认数据

**异常统计和熔断**：统计服务提供方的异常比例，当比例过高表明该接口会影响其它服务，应拒绝调用该接口，直接走降级逻辑

<img src="../assets/SpringCloud笔记/media/image70.png" style="width:5.75in;height:2.11458in" />

**2.Sentinel**

微服务保护的逻辑不需要我们自己写，已经有了现成的技术，常用的就是阿里发行的Sentinel。

**2.1 介绍和安装**

Sentinel是阿里巴巴开源的一款服务保护框架，目前已经加入SpringCloudAlibaba中。

Sentinel官网：

**\[该类型的内容暂不支持下载\]**

Sentinel 的使用分为两部分：

核心库（Jar包）：不依赖任何框架/库，能够运行于 Java 8 及以上的版本的运行时环境，对 Dubbo / Spring Cloud 等框架有较好的支持，在项目中引入依赖即可实现服务限流、隔离、熔断等功能

控制台（Dashboard）：主要负责管理推送规则、监控、管理机器信息等

**下载jar包**

**\[sentinel-dashboard-1.8.6.jar\]**

下载地址（资料中已提供sentinel-dashboard-1.8.6.jar）：

**\[该类型的内容暂不支持下载\]**

**运行**

将jar包放在非中文、不包含特殊字符的目录下，重命名为sentinel-dashboard.jar，然后在这个目录的控制台运行如下命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
java -Dserver.port=8090 -Dcsp.sentinel.dashboard.server=localhost:8090 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard.jar</td>
</tr>
</tbody>
</table>

其它启动时可配置参数可参考官方文档：

**\[该类型的内容暂不支持下载\]**

**访问**

访问http://localhost:8090页面，输入用户名和密码（默认都是sentinel）就能进入控制台，默认监控sentinel-dashboard服务本身：

<img src="../assets/SpringCloud笔记/media/image71.png" style="width:5.75in;height:2.375in" />

**2.2 微服务整合**

这里在cart-service模块中整合sentinel，连接sentinel-dashboard控制台，其他模块类似。

**2.2.1 引入sentinel依赖**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--sentinel--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-sentinel&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**2.2.2 配置控制台**

修改application.yaml文件，添加下面内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
sentinel:<br />
transport:<br />
dashboard: localhost:8090 #sentinel地址</td>
</tr>
</tbody>
</table>

**2.2.3 访问接口**

重启cart-service，打开前端页面http://localhost:18080/，向购物车添加、查询、删除若干数据，sentinel的客户端会将服务访问的信息提交到sentinel-dashboard控制台并展示出统计信息：

<img src="../assets/SpringCloud笔记/media/image72.png" style="width:5.75in;height:2.48958in" />

**2.2.4 簇点链路**

簇点链路就是单机调用链路，即一次请求进入服务后经过的每一个被Sentinel监控的资源。默认情况下Sentinel会监控SpringMVC的每一个Endpoint（接口），例如/carts这个接口路径就是其中一个簇点，可以对其进行限流、熔断、隔离等保护措施。

<img src="../assets/SpringCloud笔记/media/image73.png" style="width:5.75in;height:2.10417in" />

但是SpringMVC接口通常是按照Restful风格设计的，购物车的查询、删除、修改都是/carts路径，只是请求方式不一样。默认Sentinel把请求路径作为簇点资源名称，无法区分不同请求方式，可以选择打开Sentinel的请求方式前缀，把请求方式 + 请求路径作为簇点资源名，只需要在配置文件中添加spring.cloud.sentinel.http-method-specify为true即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
sentinel:<br />
transport:<br />
dashboard: localhost:8090 #sentinel地址<br />
http-method-specify: true #开启簇点资源的请求方式前缀</td>
</tr>
</tbody>
</table>

重启购物车微服务重新测试会发现簇点链路名称带上了请求方式。

**3.请求限流**

请求限流不需要书写代码，只需要在Sentinel的控制台进行设置即可：

<img src="../assets/SpringCloud笔记/media/image74.png" style="width:5.75in;height:2.03125in" />

如果想要把查询购物车簇点资源的QPS控制为6，即每秒最多向服务器发送6条请求，就可以在流控菜单下配置：

<img src="../assets/SpringCloud笔记/media/image75.png" style="width:5.75in;height:1.80208in" />

**测试**

**\[雪崩测试.jmx\]**

利用Jemeter做限流测试，找到资料中的雪崩测试.jmx，在jmeter打开，进行限流测试。

<img src="../assets/SpringCloud笔记/media/image76.png" style="width:5.75in;height:0.91667in" />

上图配置表明发送1000次请求请求，100秒内发完，且只请求1次，平均QPS为1000/100 = 10，代表平均每1秒有10个查询购物车请求。

启动雪崩测试线程组，在Sentinel可以看到通过的QPS基本都是6，符合设定的流控规则最大QPS为6：

<img src="../assets/SpringCloud笔记/media/image77.png" style="width:5.75in;height:2.1875in" />

*被拒绝的请求响应状态码是429，通过jmeter的结果树就可以看到。*

**4.线程隔离**

如果我们将微服务中某个业务进行整体隔离（如查询购物车），隔离范围就会太大，我们可以选择只隔离远程调用（如查询商品）的部分，也就是对查询商品的FeignClient接口做线程隔离。

**4.1 OpenFeign整合Sentinel**

Sentinel默认不会识别并监控微服务内部接口的远程调用部分，如果想要监控OpenFeign的远程调用，需要配置开启：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
feign:<br />
sentinel:<br />
enabled: true # 开启feign对sentinel的支持</td>
</tr>
</tbody>
</table>

默认情况下SpringBoot项目的tomcat最大线程数是200，允许的最大连接是8492，单机测试很难打满。所以需要配置一下cart-service模块的application.yml文件，修改tomcat连接：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8082<br />
tomcat:<br />
threads:<br />
max: 50 # 允许的最大线程数，前50个请求分配线程处理<br />
accept-count: 50 # 最大排队等待数量，超过50个请求后面50个进入队列等待<br />
max-connections: 100 # 允许的最大连接，超过100个并发请求拒绝或阻塞等待</td>
</tr>
</tbody>
</table>

重启cart-service服务，可以看到查询商品的FeignClient自动变成了一个簇点资源：

<img src="../assets/SpringCloud笔记/media/image78.png" style="width:5.75in;height:1.69792in" />

**4.2 配置线程隔离**

现成隔离也是在对应的簇点资源后面的流控按钮设置的：

<img src="../assets/SpringCloud笔记/media/image79.png" style="width:5.75in;height:1.89583in" />

然后配置并发线程数为5，即这个远程调用查询接口最多使用5个线程：

<img src="../assets/SpringCloud笔记/media/image80.png" style="width:5.75in;height:1.875in" />

这里只是最多使用5个线程，而不是QPS为5，如果查询商品的接口限流QPS为2，即每秒处理两个请求，则实际QPS在10左右，超出的请求将被拒接。

**测试**

找到item-service服务下的com.hmall.item.service.impl.ItemServiceImpl中的queryItemByIds方法，在方法体内添加以下代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
ThreadUtil.sleep(500);</td>
</tr>
</tbody>
</table>

此时查询商品每秒钟大约能执行2次，即QPS为2，然后重启item-service，找到资料中的雪崩测试.jmx，在jmeter打开进行线程隔离测试：

**\[雪崩测试.jmx\]**

<img src="../assets/SpringCloud笔记/media/image81.png" style="width:5.75in;height:0.8125in" />

<img src="../assets/SpringCloud笔记/media/image82.png" style="width:5.75in;height:3.3125in" />

可以看到，查询购物车的QPS要高于远程调用查询商品的QPS（这是因为查询商品线程耗尽其余请求直接被拒绝，从而响应500），且查询商品的QPS在10左右。

当尝试在高并发下修改购物车时，能够修改成功，但是却查询购物车失败，这说明线程隔离起作用导致线程耗尽但修改购物车不受影响：

<img src="../assets/SpringCloud笔记/media/image83.png" style="width:5.75in;height:2.79167in" />

**5.服务熔断**

**5.1 降级逻辑**

当请求被拒绝后，默认是抛出异常，用户体验会不好，这时就需要编写降级逻辑，当请求没有资源可用被拒绝后，不会抛出异常，而是会走降级逻辑，响应一些默认数据或友好提示给用户，这样用户体验会更好。

给FeignClient编写失败后的降级逻辑有两种方式：

方式一：FallbackClass，无法对远程调用的异常做处理

方式二：FallbackFactory，可以对远程调用的异常做处理，一般会选择这种方式

这里也是以第二种方式编写降级逻辑。

**步骤一**：在hm-api模块中给ItemClient定义降级处理类ItemClientFallback ，实现FallbackFactory

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.client.fallback;<br />
<br />
import com.hmall.api.client.ItemClient;<br />
import com.hmall.api.dto.ItemDTO;<br />
import com.hmall.api.dto.OrderDetailDTO;<br />
import com.hmall.common.exception.BizIllegalException;<br />
import com.hmall.common.utils.CollUtils;<br />
import lombok.extern.slf4j.Slf4j;<br />
import org.springframework.cloud.openfeign.FallbackFactory;<br />
<br />
import java.util.Collection;<br />
import java.util.List;<br />
<br />
@Slf4j<br />
public class ItemClientFallback implements FallbackFactory&lt;ItemClient&gt; {<br />
@Override<br />
public ItemClient create(Throwable cause) { //形参cause为异常信息<br />
return new ItemClient() {<br />
/**<br />
* 调用queryItemByIds出异常或限流会调用这个方法<br />
* @param ids<br />
* @return<br />
*/<br />
@Override<br />
public List&lt;ItemDTO&gt; queryItemByIds(Collection&lt;Long&gt; ids) {<br />
log.error("远程调用ItemClient的queryItemByIds方法出现异常，参数：{}", ids, cause);<br />
//查询购物车允许失败，查询失败，返回空集合<br />
return CollUtils.emptyList();<br />
}<br />
<br />
/**<br />
* 调用deductStock出异常或限流会调用这个方法<br />
* @param items<br />
*/<br />
@Override<br />
public void deductStock(List&lt;OrderDetailDTO&gt; items) {<br />
// 库存扣减业务需要触发事务回滚，查询失败，抛出异常<br />
throw new BizIllegalException(cause);<br />
}<br />
};<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**步骤二**：在hm-api模块中的com.hmall.api.config.DefaultFeignConfig类中将ItemClientFallback注册为一个Bean

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//在DefaultFeignConfig中添加以下内容即可<br />
@Bean<br />
public ItemClientFallback itemClientFallback(){<br />
return new ItemClientFallback();<br />
}</td>
</tr>
</tbody>
</table>

**步骤三**：在hm-api模块中的ItemClient接口中使用ItemClientFallbackFactory，即在@FeignClient注解中添加fallbackFactory属性

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@FeignClient(value = "item-service", fallbackFactory = ItemClientFallback.class)<br />
public interface ItemClient {<br />
/**<br />
* 根据id查询商品信息<br />
* @param ids<br />
* @return<br />
*/<br />
@GetMapping("/items")<br />
List&lt;ItemDTO&gt; queryItemByIds(@RequestParam("ids") Collection&lt;Long&gt; ids);<br />
<br />
/**<br />
* 扣减库存<br />
* @param items<br />
*/<br />
@PutMapping("/items/stock/deduct")<br />
void deductStock(@RequestBody List&lt;OrderDetailDTO&gt; items);<br />
}</td>
</tr>
</tbody>
</table>

**步骤四**：在cart-service的application.yaml下添加如下配置，开启feign对sentinel的支持，使sentinel能够监控到远程调用接口（线程隔离已经配置）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
feign:<br />
sentinel:<br />
enabled: true # 开启feign对sentinel的支持</td>
</tr>
</tbody>
</table>

**测试**

重新进行线程隔离测试，可以看到异常比例为0，idea控制台输出了远程调用异常错误，说明虽然请求被限流，但是不会再响应异常了：

<img src="../assets/SpringCloud笔记/media/image84.png" style="width:5.75in;height:0.47917in" />

<img src="../assets/SpringCloud笔记/media/image85.png" style="width:5.75in;height:0.97917in" />

**5.2 服务熔断**

**5.2.1 状态机**

当已经知道有一定比例的调用响应速度慢后，就能推断出服务提供者故障或阻塞了，这时应及时熔断接口，后面的请求不用再调用服务提供者，而是直接走fallback逻辑，服务熔断由状态机来进行控制：

<img src="../assets/SpringCloud笔记/media/image86.png" style="width:5.75in;height:2.01042in" />

状态机包括三个状态：

**closed**：关闭状态，断路器放行所有请求，并开始统计异常比例、慢请求比例，超过阈值则切换到open状态

**open**：打开状态，服务调用被**熔断**，访问被熔断服务的请求会被拒绝，快速失败，直接走降级逻辑，Open状态持续一段时间后会进入half-open状态

**half-open**：半开状态，放行一次请求，根据执行结果来判断接下来的操作

请求成功：则切换到closed状态

请求失败：则切换到open状态

**5.2.2 配置熔断策略**

可以在控制台通过点击簇点后的熔断按钮来配置熔断策略：

<img src="../assets/SpringCloud笔记/media/image87.png" style="width:5.75in;height:1.86458in" />

<img src="../assets/SpringCloud笔记/media/image88.png" style="width:5.75in;height:2.14583in" />

熔断规则解析：熔断策略可以根据慢调用比例、异常比例、异常数来判断，这里以慢调用比例为例

最大RT：即最大响应时长（单位ms），当请求响应时长超过200ms就认为是慢调用

比例阈值：当请求中慢调用的请求所占比例超过0.5就进行熔断

熔断时长：熔断不可能一直熔断，要有熔断持续时长

最小请求数、统计时长：统计最近1000ms内的最少5次请求，如果慢调用比例不低于0.5，则触发熔断

**测试**

配置完成后，重新进行线程隔离测试，会发现一开始查询商品可以通过，但是后面查询商品通过QPS变成了0，说明服务熔断了，但是jmeter的异常比例为0，说明熔断后走的fallback逻辑，所以平均响应时长也会缩短：

<img src="../assets/SpringCloud笔记/media/image89.png" style="width:5.75in;height:2.92708in" />

<img src="../assets/SpringCloud笔记/media/image90.png" style="width:5.75in;height:0.82292in" />

**十、分布式事务**

**1.问题分析**

在下单业务中，交易服务需要调用购物车服务清空购物车和库存服务扣减库存，每个服务都有自己的事务，即**分支事务**，而此时交易服务创建订单就构成了**全局事务**，当购物车服务成功提交后，库存服务如果出现异常导致分支事务回滚，此时购物车服务已经提交，导致全局事务的ACID特性被破坏，导致数据不一致，这就是**分布式事务数据不一致问题**。

<img src="../assets/SpringCloud笔记/media/image91.png" style="width:5.75in;height:1.90625in" />

向购物车中添加几件商品，然后进行结算但不要提交订单，此时购物车表中会有几条数据：

<img src="../assets/SpringCloud笔记/media/image92.png" style="width:5.75in;height:0.60417in" />

修改其中一个商品的库存为0，这里以第一个item_id=100001511821为例（记得提交）：

<img src="../assets/SpringCloud笔记/media/image93.png" style="width:5.75in;height:1.27083in" />

然后进行提交订单操作，会发现购物车数据被清空但是商品服务扣减库存出错：

<img src="../assets/SpringCloud笔记/media/image94.png" style="width:5.75in;height:1.48958in" />

这说明出现了数据不一致。

**2.认识Seata**

一开始微服务事务一致性问题是一个难点，很多开发人员都很头疼，但是随着技术的发展，也出现了很多框架解决微服务事务一致性，其中，阿里巴巴开源的Seata使用最多。

Seata官网：

**\[该类型的内容暂不支持下载\]**

解决全局事务一致性问题的方法就是找一个统一的事务协调者，与多个分支事务通信，检测每个分支事务的执行状态，保证全局事务下的每一个分支事务同时成功或失败即可，大多数的分布式事务框架都是基于这个理论来实现的。

在Seata的事务管理中有三个重要的角色：

**TC (Transaction Coordinator) - 事务协调者**：维护全局和分支事务的状态，协调全局事务提交或回滚

**TM (Transaction Manager) - 事务管理器**：定义全局事务的范围、开始全局事务、提交或回滚全局事务

**RM (Resource Manager) - 资源管理器**：管理分支事务，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚

<img src="../assets/SpringCloud笔记/media/image95.png" style="width:5.75in;height:2.375in" />

**TM**和**RM**可以理解为Seata的客户端部分，引入到参与事务的微服务依赖中即可，将来**TM**和**RM**就会协助微服务，实现本地分支事务与**TC**之间交互，实现事务的提交或回滚。而**TC**服务则是事务协调中心，是一个独立的微服务，需要单独部署。

**3.部署TC服务**

**3.1 准备数据库表**

**\[seata-tc.sql\]**

Seata支持多种存储模式，一般会选择数据库存储进行持久化，只需要执行资料中的seata-tc.sql脚本得到seata数据库即可。

其中，branch_table为分支表，global_table为全局表，分支事务和全局事务的信息会存放在这两张表中；剩下的两张lock表就是锁，TC服务会基于数据库表实现一个锁功能确保线程安全。

**3.2 准备配置文件**

**\[seata.zip\]**

将资料中的seata文件夹拷贝到虚拟机的/root目录，其中包含seata运行所需要的配置application.yml，如果需要修改自行查看修改，具体配置含义自行查阅资料。

**3.3 Docker部署**

将资料中的seata-1.5.2.tar上传到虚拟机的/root目录，然后运行以下命令加载seata镜像：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker load -i seata-1.5.2.tar</td>
</tr>
</tbody>
</table>

在虚拟机的/root目录执行下面的命令部署seata到docker中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run --name seata \<br />
-p 8099:8099 \<br />
-p 7099:7099 \<br />
-e SEATA_IP=192.168.150.101 \<br />
-v ./seata:/seata-server/resources \<br />
--privileged=true \<br />
--network hm-net \<br />
-d \<br />
seataio/seata-server:1.5.2</td>
</tr>
</tbody>
</table>

|                                                                                                                                                      |
|------------------------------------------------------------------------------------------------------------------------------------------------------|
| **注意**：要确保nacos、mysql都在hm-net网络中，如果某个容器不在hm-net网络中可以通过命令加入hm-net网络：docker network connect \[网络名\] \[容器名\]。 |

通过如下命令检查seata是否成功部署，如果能看到seata就说明部署成功：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker ps</td>
</tr>
</tbody>
</table>

**4.微服务集成Seata**

参与分布式事务的每一个微服务都需要集成Seata（item-service、cart-service、trade-service），这里以trade-service为例。

**4.1 引入依赖**

为了方便各个微服务集成seata，需要把seata配置共享到nacos，因此trade-service模块不仅仅要引入seata依赖，还要引入nacos依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--统一配置管理--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-config&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--读取bootstrap文件--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-bootstrap&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--seata--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-seata&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**4.2 改造配置**

在nacos上添加一个共享的seata配置，命名为shared-seata.yaml：

<img src="../assets/SpringCloud笔记/media/image96.png" style="width:5.75in;height:1.47917in" />

配置内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
seata:<br />
registry: # TC服务注册中心的配置，微服务根据这些信息去注册中心获取tc服务地址<br />
type: nacos # 注册中心类型 nacos<br />
nacos:<br />
server-addr: 192.168.150.101:8848 # nacos地址<br />
namespace: "" # namespace，默认为空<br />
group: DEFAULT_GROUP # 分组，默认是DEFAULT_GROUP<br />
application: seata-server # seata服务名称<br />
username: nacos<br />
password: nacos<br />
tx-service-group: hmall # 事务组名称<br />
service:<br />
vgroup-mapping: # 事务组与tc集群的映射关系<br />
hmall: "default"</td>
</tr>
</tbody>
</table>

改造trade-service模块，添加bootstrap.yaml：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
application:<br />
name: trade-service # 服务名称<br />
profiles:<br />
active: dev<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101 # nacos地址<br />
config:<br />
file-extension: yaml # 文件后缀名<br />
shared-configs: # 共享配置<br />
- dataId: shared-jdbc.yaml # 共享mybatis配置<br />
- dataId: shared-log.yaml # 共享日志配置<br />
- dataId: shared-swagger.yaml # 共享日志配置<br />
- dataId: shared-seata.yaml # 共享seata配置</td>
</tr>
</tbody>
</table>

改造application.yaml文件，内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
server:<br />
port: 8085<br />
feign:<br />
okhttp:<br />
enabled: true # 开启OKHttp<br />
hm:<br />
swagger:<br />
package: com.hmall.trade.controller<br />
title: 交易服务接口文档<br />
description: "交易服务接口文档"<br />
db:<br />
database: hm-trade</td>
</tr>
</tbody>
</table>

**4.3 添加数据库表**

**\[seata-at.sql\]**

seata的客户端在解决分布式事务的时候需要记录一些中间数据，保存在数据库中。将资料中的seata-at.sql分别文件导入hm-trade、hm-cart、hm-item三个数据库中：

<img src="../assets/SpringCloud笔记/media/image97.png" style="width:5.75in;height:2.73958in" />

**4.4 测试**

在trade-service模块下的OrderServiceImpl类中的createOrder方法上的@Transactional注解改为Seata提供的**@GlobalTransactional**注解，代表这是一个全局事务。

然后分别在item-service模块下的ItemServiceImpl类中的deductStock方法和cart-service模块下的CartServiceImpl类中的removeByItemIds方法上分别加上**@Transactional**注解，代表这是一个分支事务。

完成后重启三个服务重新进行不一致性的测试，会发现扣减储存失败后清空购物车业务也会回滚，从而避免了全局事务数据不一致。

**5.分布式事务解决方案**

Seata支持四种不同的分布式事务解决方案：

XA

TCC

AT

SAGA

这里以XA模式和AT模式讲解实现原理。

**5.1 XA模式**

XA 规范 是 X/Open 组织定义的分布式事务处理（DTP）标准，XA规范描述了全局的TM与局部的RM之间的接口，几乎所有主流的数据库都对XA规范提供了支持。

**5.1.1 两阶段提交**

A是规范，目前主流数据库都实现了这种规范，实现的原理都是基于两阶段提交。

**正常情况**：

<img src="../assets/SpringCloud笔记/media/image98.png" style="width:5.75in;height:2.27083in" />

**异常情况**：

<img src="../assets/SpringCloud笔记/media/image99.png" style="width:5.75in;height:2.14583in" />

一阶段：

事务协调者通知每个事务参与者执行本地事务

本地事务执行完成后报告事务执行状态给事务协调者，此时事务不提交，继续持有数据库锁

二阶段：

事务协调者基于一阶段的报告来判断下一步操作

如果一阶段都成功，则通知所有事务参与者，提交事务

如果一阶段任意一个参与者失败，则通知所有事务参与者回滚事务

**5.1.2 Seata的XA模型**

Seata对原始的**XA模式**做了简单的封装和改造，以适应自己的事务模型，基本架构如图：

<img src="../assets/SpringCloud笔记/media/image100.png" style="width:5.75in;height:2.84375in" />

当业务方法开始执行时，TM会先开启全局事务报告给TC，然后执行业务方法，当执行到第一个远程调用业务（如清理购物车），RM会注册分支事务到TC，然后执行完远程业务后报告事务状态给TC，但是不提交事务，持有数据库锁，其他远程调用RM也是这样，当最后一个远程调用RM执行完（如扣减库存）后，报告事务状态给TC，当业务方法（如下单）执行完后，TM向TC报备，此时TC会检查TM内所有RM的事务状态，如果都成功就发送提交指令给TC内的所有RM，RM提交事务释放数据库锁，如果有一个RM执行失败，TC就会发送回滚指令给TC内的所有RM，RM回滚事务释放数据库锁。

XA模式优点：

事务的强一致性，满足ACID原则

常用数据库都支持，实现简单，没有代码侵入

XA模式的缺点：

因为一阶段需要锁定数据资源，等待二阶段释放才结束，性能较差

依赖关系型数据库实现事务

**XA模型的实现**

在配置文件中指定要采用的分布式事务模式，这里可以在Nacos共享shared-seata.yaml配置中设置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
seata:<br />
data-source-proxy-mode: XA</td>
</tr>
</tbody>
</table>

利用@GlobalTransactional注解标记分布式事务的入口方法：

<img src="../assets/SpringCloud笔记/media/image101.png" style="width:5.75in;height:1.53125in" />

|                                                                                                          |
|----------------------------------------------------------------------------------------------------------|
| **注意**：业务远程调用的接口方法可以加上@Transactional注解保证分支事务一致性，当然不加全局事务也会生效。 |

**5.2 AT模式**

XA模式虽然保证了数据强一致，但如果后面接口调用耗时过长，前面的分支事务数据库锁就会一直不释放，导致其他线程无法操作数据库，而**AT模式**就能避免锁一直占用问题。

**Seata的AT模型**基本架构：

<img src="../assets/SpringCloud笔记/media/image102.png" style="width:5.75in;height:2.84375in" />

当业务方法开始执行时，TM会先开启全局事务报告给TC，然后执行业务方法，当执行到第一个远程调用业务（如清理购物车），RM会注册分支事务到TC，然后根据SQL解析查询出更新前的快照记录到undo-log，然后执行业务SQL并提交，在查询出更新后的快照记录到undo-log，之后向TC报告事务状态，其他远程调用RM也是这样，TM执行完后向TC报备，TC会检查TM内所有RM的事务状态，如果都成功就发送提交指令给TC内的所有RM，RM删除undo-log，如果有一个RM执行失败，TC就会发送回滚指令给TC内的所有RM，RM根据undo_log恢复数据并删除undo-log。

AT模式和XA模式最大的区别：

XA模式一阶段不提交事务，锁定资源；AT模式一阶段直接提交，不锁定资源

XA模式依赖数据库机制实现回滚；AT模式利用数据快照实现数据回滚

XA模式强一致；AT模式最终一致

AT模式使用起来更加简单，无业务侵入，性能更好，因此企业90%的分布式事务都可以用AT模式来解决。

**AT模型的实现**

AT模型需要依赖数据库表实现快照记录，只需要在RM的数据库中执行下面SQL得到undo_log表即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
CREATE TABLE IF NOT EXISTS `undo_log`<br />
(<br />
`branch_id` BIGINT NOT NULL COMMENT 'branch transaction id',<br />
`xid` VARCHAR(128) NOT NULL COMMENT 'global transaction id',<br />
`context` VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',<br />
`rollback_info` LONGBLOB NOT NULL COMMENT 'rollback info',<br />
`log_status` INT(11) NOT NULL COMMENT '0:normal status,1:defense status',<br />
`log_created` DATETIME(6) NOT NULL COMMENT 'create datetime',<br />
`log_modified` DATETIME(6) NOT NULL COMMENT 'modify datetime',<br />
UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)<br />
) ENGINE = InnoDB<br />
AUTO_INCREMENT = 1<br />
DEFAULT CHARSET = utf8mb4 COMMENT ='AT transaction mode undo table';</td>
</tr>
</tbody>
</table>

在配置文件中指定要采用的分布式事务模式，这里可以在Nacos共享shared-seata.yaml配置中设置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
seata:<br />
data-source-proxy-mode: AT #可以不配置，默认就是AT模式</td>
</tr>
</tbody>
</table>

和XA模式一样，AT模式也需要利用@GlobalTransactional注解标记分布式事务的入口方法：

<img src="../assets/SpringCloud笔记/media/image101.png" style="width:5.75in;height:1.53125in" />

**十一、MQ**

**1.初识MQ**

**1.1 同步调用**

以用户支付业务为例，支付业务需要先调用用户服务扣减余额，然后更新交易流水，最后再更新订单状态，这些操作都是在一个方法中依次执行的，这种调用就是同步调用，但是同步调用存在很多问题：

拓展性差：如果后续支付业务有新的需求如短信通知、积分更新等等，那就只能在原来业务方法中继续添加代码，代码臃肿

性能下降：远程调用等待响应需要时间，同步调用这段时间只能阻塞等待，随着业务需求增加只会越来越慢，性能不高

级联失败：如果通知服务、积分服务出现异常，此时用户已经支付，此时所有服务都会回滚，级联失败，到手的钱又丢了😭

<img src="../assets/SpringCloud笔记/media/image103.png" style="width:5.75in;height:1.77083in" />

**1.2 异步调用**

异步调用是基于消息通知的方式，一般包含三个角色：

消息发送者：投递消息的人，就是原来的调用方

消息Broker：管理、暂存、转发消息，可以理解成微信服务器

消息接收者：接收和处理消息的人，就是原来的服务提供方

在异步调用中，发送者不直接同步调用接收者的业务接口，而是发送一条消息投递给消息Broker，接收者根据自己的需求从消息Broker订阅消息。每当发送方发送消息接受者都能获取消息并处理，例如支付服务只需要处理必须的扣减余额和更新交易流水，然后发送一条消息到Broker就结束了，其他调用逻辑全部取消，其他服务事先从Broker订阅消息，消息发送到Broker后会被分发给每一个订阅了的微服务，微服务接收到消息后处理各自的业务，即使又有短信通知、积分更新需求，只需要让对应的服务订阅消息即可：

<img src="../assets/SpringCloud笔记/media/image104.png" style="width:5.75in;height:1.60417in" />

可以看到，异步调用的优势如下：

耦合度更低

性能更好

业务拓展性强

故障隔离，避免级联失败

但是，异步调用完全依赖于Broker的可靠性、安全性和性能，而且架构复杂，后期维护和调试麻烦。

**1.3 MQ比较和选择**

消息Broker常见实现为消息队列MQ（MessageQueue），常用的Broker有四种：

|            |                         |                                   |            |            |
|------------|-------------------------|-----------------------------------|------------|------------|
|            | RabbitMQ                | ActiveMQ                          | RocketMQ   | Kafka      |
| 公司/社区  | Rabbit                  | Apache                            | 阿里       | Apache     |
| 开发语言   | Erlang                  | Java                              | Java       | Scala&Java |
| 协议支持   | AMQP，XMPP，SMTP，STOMP | OpenWire，STOMP，REST，XMPP，AMQP | 自定义协议 | 自定义协议 |
| 可用性     | 高                      | 一般                              | 高         | 高         |
| 单击吞吐量 | 一般                    | 差                                | 高         | 非常高     |
| 消息延迟   | 微秒级                  | 毫秒级                            | 毫秒级     | 毫秒以内   |
| 消息可靠性 | 高                      | 一般                              | 高         | 一般       |

在选择上根据不同场景也是不唯一的：

追求可用性：Kafka、 RocketMQ 、RabbitMQ

追求可靠性：RabbitMQ、RocketMQ

追求吞吐能力：RocketMQ、Kafka

追求消息低延迟：RabbitMQ、Kafka

这里使用RabbitMQ进行学习，另外的三种可以自行学习。

**2.RabbitMQ**

RabbitMQ的官网：

**\[该类型的内容暂不支持下载\]**

**2.1 安装**

将资料中的mq.tar镜像上传到Linux虚拟机的任意目录下，然后执行以下命令加载Docker镜像（可跳过）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker load -i mq.tar</td>
</tr>
</tbody>
</table>

运行Docker命令安装RabbitMQ：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run \<br />
-e RABBITMQ_DEFAULT_USER=itheima \<br />
-e RABBITMQ_DEFAULT_PASS=123321 \<br />
-v mq-plugins:/plugins \<br />
--name mq \<br />
--hostname mq \<br />
-p 15672:15672 \<br />
-p 5672:5672 \<br />
--network hm-net\<br />
-d \<br />
rabbitmq:3.8-management</td>
</tr>
</tbody>
</table>

这里有两个映射的端口：

15672：RabbitMQ提供的管理控制台的端口

5672：RabbitMQ的消息发送处理接口

安装完成后访问http://192.168.150.101:15672并输入用户名itheima和密码123321就可以看到RabbitMQ提供的控制台页面：

<img src="../assets/SpringCloud笔记/media/image105.png" style="width:5.75in;height:2.46875in" />

RabbitMQ对应的架构图：

<img src="../assets/SpringCloud笔记/media/image106.png" style="width:5.75in;height:2.38542in" />

**publisher**：生产者，也就是发送消息的一方

**consumer**：消费者，也就是消费消息的一方

**queue**：队列，存储消息，生产者投递的消息会暂存在消息队列中，等待消费者处理

**exchange**：交换机，负责消息路由，生产者发送的消息由交换机决定投递到哪个队列

**virtual host**：虚拟主机，起到数据隔离的作用，每个虚拟主机相互独立，有各自的exchange、queue

**2.2 收发消息**

**2.2.1 交换机**

在控制台页面，Exchanges选项卡就是交换机页面：

<img src="../assets/SpringCloud笔记/media/image107.png" style="width:5.75in;height:2.42708in" />

点击进入任一交换机（如amp.fanout）的详情页，通过publish message发送一条消息：

<img src="../assets/SpringCloud笔记/media/image108.png" style="width:5.75in;height:2.51042in" />

这里没有消费者，所以消息最终会丢失，说明交换机没有存储消息的能力。

**2.2.2 队列**

打开Queues选项卡，新建一个队列：

<img src="../assets/SpringCloud笔记/media/image109.png" style="width:5.75in;height:2.28125in" />

再以相同的方式，创建一个队列，命名为hello.queue2，最终队列列表如下：

<img src="../assets/SpringCloud笔记/media/image110.png" style="width:5.75in;height:1.20833in" />

**2.2.3 绑定关系**

点击Exchanges选项卡，点击amq.fanout交换机，进入交换机详情页，然后点击Bindings菜单，在表单中填写要绑定的队列名称：

<img src="../assets/SpringCloud笔记/media/image111.png" style="width:5.75in;height:2.20833in" />

相同的方式，将hello.queue2也绑定到该交换机，最终绑定结果如下：

<img src="../assets/SpringCloud笔记/media/image112.png" style="width:5.75in;height:1.85417in" />

**2.2.4 发送消息**

再次回到exchange页面，找到刚刚绑定的amq.fanout，点击进入详情页，再次发送一条消息：

<img src="../assets/SpringCloud笔记/media/image108.png" style="width:5.75in;height:2.51042in" />

回到Queues页面，可以发现hello.queue中已经有一条消息了：

<img src="../assets/SpringCloud笔记/media/image113.png" style="width:5.75in;height:1.17708in" />

点击队列名称，进入详情页，查看队列详情，点击get message获取消息，就可以在下面看到消息了：

<img src="../assets/SpringCloud笔记/media/image114.png" style="width:5.75in;height:2.36458in" />

此时如果有消费者监听了MQ的hello.queue1或hello.queue2队列，消费者就能拿到消息处理了。

**2.3 数据隔离**

**2.3.1 用户管理**

点击Admin选项卡，首先会看到RabbitMQ控制台的用户管理界面：

<img src="../assets/SpringCloud笔记/media/image115.png" style="width:5.75in;height:2.26042in" />

这里的用户都是RabbitMQ的管理或运维人员，目前只有安装RabbitMQ时添加的itheima这个用户。

用户表格中的字段解释：

Name：itheima，也就是用户名

Tags：administrator，说明itheima用户是超级管理员，拥有所有权限

Can access virtual host： /，可以访问的virtual host，这里的/是默认的virtual host

对于小型企业而言，出于成本考虑，我们通常只会搭建一套MQ集群，公司内的多个不同项目同时使用。为了避免互相干扰， 会利用virtual host的隔离特性，将不同项目隔离，一般会做两件事情：

给每个项目创建独立的运维账号，将管理权限分离

给每个项目创建不同的virtual host，将每个项目的数据隔离

比如，这里给黑马商城创建一个新的用户，命名为hmall，设置密码为123：

<img src="../assets/SpringCloud笔记/media/image116.png" style="width:5.75in;height:2.26042in" />

但此时hmall用户没有任何virtual host的访问权限：

<img src="../assets/SpringCloud笔记/media/image117.png" style="width:5.75in;height:1.34375in" />

**2.3.2 virtual host**

退出登录：

<img src="../assets/SpringCloud笔记/media/image118.png" style="width:5.75in;height:1.65625in" />

切换到刚刚创建的hmall用户登录，然后点击Virtual Hosts菜单，进入virtual host管理页：

<img src="../assets/SpringCloud笔记/media/image119.png" style="width:5.75in;height:1.95833in" />

可以看到目前只有一个默认的virtual host为 /。我们给黑马商城项目创建一个单独的virtual host，而不是使用默认的/。

<img src="../assets/SpringCloud笔记/media/image120.png" style="width:5.75in;height:1.54167in" />

创建完后可以看到：

<img src="../assets/SpringCloud笔记/media/image121.png" style="width:5.75in;height:0.875in" />

由于是登录hmall账户后创建的virtual host，因此回到users菜单会发现当前用户已经具备了对/hmall这个virtual host的访问权限：

<img src="../assets/SpringCloud笔记/media/image122.png" style="width:5.75in;height:1.3125in" />

此时，点击页面右上角的virtual host下拉菜单，切换virtual host为/hmall，可以看到之前的队列都不见了：

<img src="../assets/SpringCloud笔记/media/image123.png" style="width:5.75in;height:1.51042in" />

这就是基于virtual host的隔离效果。

**3.SpringAMQP**

RabbitMQ采用AMQP协议，具备跨语言的特性，任何语言如Java只要遵循AMQP协议收发消息，都可以与RabbitMQ交互。但是官方提供的客户端编码繁琐，所以Spring官方基于RabbitMQ提供了一套消息收发的模板工具SpringAMQP，SpringBoot还对其进行了自动装配，实现起来非常简单。

SpringAMQP官方地址：

**\[该类型的内容暂不支持下载\]**

SpringAMQP提供了三个功能：

自动声明队列、交换机及其绑定关系

基于注解的监听器模式，异步接收消息

封装了RabbitTemplate工具，用于发送消息

**3.1 快速入门**

为了测试方便，这里直接跳过了交换机，使用简单模型，即Publisher发布消息到Queue，消费者监听并处理Queue中的消息：

<img src="../assets/SpringCloud笔记/media/image124.png" style="width:5.75in;height:0.53125in" />

先在控制台新建一个队列simple.queue：

<img src="../assets/SpringCloud笔记/media/image125.png" style="width:5.75in;height:2.04167in" />

**3.1.1 导入Demo工程**

**\[mq-demo.zip\]**

在IDEA中打开资料中提供的mq-demo项目，项目结构如下：

<img src="../assets/SpringCloud笔记/media/image126.png" style="width:5.75in;height:2.07292in" />

mq-demo：父工程，管理项目依赖

publisher：消息的发送者

consumer：消息的消费者

在mq-demo父工程中已经配置好了SpringAMQP相关依赖：

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
&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;<br />
<br />
&lt;groupId&gt;cn.itcast.demo&lt;/groupId&gt;<br />
&lt;artifactId&gt;mq-demo&lt;/artifactId&gt;<br />
&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;<br />
&lt;modules&gt;<br />
&lt;module&gt;publisher&lt;/module&gt;<br />
&lt;module&gt;consumer&lt;/module&gt;<br />
&lt;/modules&gt;<br />
&lt;packaging&gt;pom&lt;/packaging&gt;<br />
<br />
&lt;parent&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;<br />
&lt;version&gt;2.7.12&lt;/version&gt;<br />
&lt;relativePath/&gt;<br />
&lt;/parent&gt;<br />
<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;8&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;8&lt;/maven.compiler.target&gt;<br />
&lt;/properties&gt;<br />
<br />
&lt;dependencies&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.projectlombok&lt;/groupId&gt;<br />
&lt;artifactId&gt;lombok&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--AMQP依赖，包含RabbitMQ--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-amqp&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--单元测试--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;<br />
&lt;/project&gt;</td>
</tr>
</tbody>
</table>

**3.1.2 消息发送**

首先配置MQ地址，在publisher服务的application.yml中添加配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
host: 192.168.88.131 # 虚拟主机IP<br />
port: 5672 # 端口号<br />
virtual-host: /hmall # 虚拟主机<br />
username: hmall # 用户名<br />
password: 123 # 密码</td>
</tr>
</tbody>
</table>

然后在publisher服务中编写测试类SpringAmqpTest，并利用RabbitTemplate实现消息发送：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.publisher;<br />
<br />
import org.junit.jupiter.api.Test;<br />
import org.springframework.amqp.rabbit.core.RabbitTemplate;<br />
import org.springframework.beans.factory.annotation.Autowired;<br />
import org.springframework.boot.test.context.SpringBootTest;<br />
<br />
@SpringBootTest<br />
public class SpringAmqpTest {<br />
@Autowired<br />
private RabbitTemplate rabbitTemplate;<br />
<br />
@Test<br />
public void testSimpleQueue() {<br />
//队列名称<br />
String queueName = "simple.queue";<br />
//消息<br />
String message = "hello, spring amqp!";<br />
//发送消息<br />
rabbitTemplate.convertAndSend(queueName, message);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

打开控制台，可以看到消息已经发送到队列中：

<img src="../assets/SpringCloud笔记/media/image127.png" style="width:5.75in;height:2.40625in" />

**3.1.3 消息接收**

首先配置MQ地址，在consumer服务的application.yml中添加配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
host: 192.168.88.131 # 虚拟主机IP<br />
port: 5672 # 端口号<br />
virtual-host: /hmall # 虚拟主机<br />
username: hmall # 用户名<br />
password: 123 # 密码</td>
</tr>
</tbody>
</table>

然后在consumer服务中新建一个类SpringRabbitListener：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.consumer.mq;<br />
<br />
import org.springframework.amqp.rabbit.annotation.RabbitListener;<br />
import org.springframework.stereotype.Component;<br />
<br />
@Component<br />
public class SpringRabbitListener {<br />
// 利用RabbitListener来声明要监听的队列信息<br />
// 将来一旦监听的队列中有了消息，就会推送给当前服务，调用当前方法，处理消息。<br />
// 可以看到方法体中接收的就是消息体的内容<br />
@RabbitListener(queues = "simple.queue")<br />
public void listenSimpleQueueMessage(String msg) {<br />
System.out.println("spring 消费者接收到消息：【" + msg + "】");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.1.4 测试**

启动consumer服务，然后在publisher服务中运行测试代码，发送MQ消息，最终consumer收到消息：

<img src="../assets/SpringCloud笔记/media/image128.png" style="width:5.75in;height:0.9375in" />

**3.2 WorkQueues模型**

有时，生产者生产的速度要快于消费者消费的速度，就会造成消息堆积，WorkQueues模型就是让**多个消费者绑定到一个队列，共同消费队列中的消息**，从而提高消息被消费的速度。

为了模拟消息这个场景，需要创建一个队列work.queue：

<img src="../assets/SpringCloud笔记/media/image129.png" style="width:5.75in;height:2in" />

**3.2.1 消息发送**

这里以循环发送模拟大量消息堆积，在publisher服务中的SpringAmqpTest类中添加一个测试方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
// 向work.queue队列中不停发送消息，模拟消息堆积<br />
@Test<br />
public void testWorkQueue() throws InterruptedException {<br />
//队列名称<br />
String queueName = "work.queue";<br />
//消息<br />
String message = "hello, spring amqp!";<br />
//发送消息，每20毫秒发送一次，相当于每秒发送50条消息<br />
for (int i = 1; i &lt;= 50; i++) {<br />
rabbitTemplate.convertAndSend(queueName, message + i);<br />
Thread.sleep(20);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.2.2 消息接收**

在consumer服务的SpringRabbitListener中添加2个新的方法代表两个消费者：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(queues = "work.queue")<br />
public void listenWorkQueue1(String msg) throws InterruptedException {<br />
System.out.println("消费者1接收到消息：【" + msg + "】" + LocalTime.now());<br />
Thread.sleep(20);<br />
}<br />
<br />
@RabbitListener(queues = "work.queue")<br />
public void listenWorkQueue2(String msg) throws InterruptedException {<br />
System.err.println("消费者2接收到消息：【" + msg + "】" + LocalTime.now());<br />
Thread.sleep(200);<br />
}</td>
</tr>
</tbody>
</table>

这两消费者都设置了Thead.sleep模拟任务耗时：

消费者1 sleep了20毫秒，相当于每秒钟处理50个消息

消费者2 sleep了200毫秒，相当于每秒处理5个消息

**3.2.3 测试**

启动ConsumerApplication后，在执行publisher服务中刚刚编写的发送测试方法testWorkQueue，结果如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
消费者1接收到消息：【hello, spring amqp!1】22:40:24.046481<br />
消费者2接收到消息：【hello, spring amqp!2】22:40:24.046481<br />
消费者1接收到消息：【hello, spring amqp!3】22:40:24.076502600<br />
消费者1接收到消息：【hello, spring amqp!5】22:40:24.125605100<br />
消费者1接收到消息：【hello, spring amqp!7】22:40:24.190201100<br />
消费者2接收到消息：【hello, spring amqp!4】22:40:24.250644200<br />
消费者1接收到消息：【hello, spring amqp!9】22:40:24.252671700<br />
消费者1接收到消息：【hello, spring amqp!11】22:40:24.313777300<br />
消费者1接收到消息：【hello, spring amqp!13】22:40:24.375391600<br />
消费者1接收到消息：【hello, spring amqp!15】22:40:24.438308900<br />
消费者2接收到消息：【hello, spring amqp!6】22:40:24.464995400<br />
消费者1接收到消息：【hello, spring amqp!17】22:40:24.498091900<br />
消费者1接收到消息：【hello, spring amqp!19】22:40:24.559793900<br />
消费者1接收到消息：【hello, spring amqp!21】22:40:24.620615500<br />
消费者2接收到消息：【hello, spring amqp!8】22:40:24.679047800<br />
消费者1接收到消息：【hello, spring amqp!23】22:40:24.684100100<br />
消费者1接收到消息：【hello, spring amqp!25】22:40:24.742285300<br />
消费者1接收到消息：【hello, spring amqp!27】22:40:24.804127600<br />
消费者1接收到消息：【hello, spring amqp!29】22:40:24.864965500<br />
消费者2接收到消息：【hello, spring amqp!10】22:40:24.892808100<br />
消费者1接收到消息：【hello, spring amqp!31】22:40:24.930028100<br />
消费者1接收到消息：【hello, spring amqp!33】22:40:24.988413200<br />
消费者1接收到消息：【hello, spring amqp!35】22:40:25.051277200<br />
消费者2接收到消息：【hello, spring amqp!12】22:40:25.096005900<br />
消费者1接收到消息：【hello, spring amqp!37】22:40:25.113169600<br />
消费者1接收到消息：【hello, spring amqp!39】22:40:25.175436<br />
消费者1接收到消息：【hello, spring amqp!41】22:40:25.237980300<br />
消费者2接收到消息：【hello, spring amqp!14】22:40:25.297843800<br />
消费者1接收到消息：【hello, spring amqp!43】22:40:25.299872900<br />
消费者1接收到消息：【hello, spring amqp!45】22:40:25.361151500<br />
消费者1接收到消息：【hello, spring amqp!47】22:40:25.423307400<br />
消费者1接收到消息：【hello, spring amqp!49】22:40:25.486703200<br />
消费者2接收到消息：【hello, spring amqp!16】22:40:25.500710600<br />
消费者2接收到消息：【hello, spring amqp!18】22:40:25.703609900<br />
消费者2接收到消息：【hello, spring amqp!20】22:40:25.904245100<br />
消费者2接收到消息：【hello, spring amqp!22】22:40:26.107719100<br />
消费者2接收到消息：【hello, spring amqp!24】22:40:26.311161900<br />
消费者2接收到消息：【hello, spring amqp!26】22:40:26.514137200<br />
消费者2接收到消息：【hello, spring amqp!28】22:40:26.718100900<br />
消费者2接收到消息：【hello, spring amqp!30】22:40:26.920932400<br />
消费者2接收到消息：【hello, spring amqp!32】22:40:27.124449600<br />
消费者2接收到消息：【hello, spring amqp!34】22:40:27.340069800<br />
消费者2接收到消息：【hello, spring amqp!36】22:40:27.544794300<br />
消费者2接收到消息：【hello, spring amqp!38】22:40:27.758904100<br />
消费者2接收到消息：【hello, spring amqp!40】22:40:27.975761700<br />
消费者2接收到消息：【hello, spring amqp!42】22:40:28.177904700<br />
消费者2接收到消息：【hello, spring amqp!44】22:40:28.378185400<br />
消费者2接收到消息：【hello, spring amqp!46】22:40:28.580083700<br />
消费者2接收到消息：【hello, spring amqp!48】22:40:28.782536300<br />
消费者2接收到消息：【hello, spring amqp!50】22:40:28.984652</td>
</tr>
</tbody>
</table>

可以看到消费者1只消费奇数的消息，消费者2只消费偶数的消息，各消费25条消息，由于消费者1消费速度快，消费者1很快消费完25条消息，之后消费1空闲，消费者2还在消费，显然消费者1的资源并没有充分利用。

**3.2.4 能者多劳**

能者多劳就是充分利用每一个消费者的处理能力，从而有效避免消息积压问题，例如消费者1消费完后如果还有消息，应该继续消费，而不是空闲下来。

实现能者多劳只需要修改consumer服务的application.yml文件，添加一个配置即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
listener:<br />
simple:<br />
prefetch: 1 # 每次只能获取一条消息，处理完成才能获取下一个消息</td>
</tr>
</tbody>
</table>

重新测试后结果如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
消费者1接收到消息：【hello, spring amqp!2】22:50:36.431624700<br />
消费者2接收到消息：【hello, spring amqp!1】22:50:36.431624700<br />
消费者1接收到消息：【hello, spring amqp!3】22:50:36.462066900<br />
消费者1接收到消息：【hello, spring amqp!4】22:50:36.493439500<br />
消费者1接收到消息：【hello, spring amqp!5】22:50:36.524840600<br />
消费者1接收到消息：【hello, spring amqp!6】22:50:36.556576200<br />
消费者1接收到消息：【hello, spring amqp!7】22:50:36.586560900<br />
消费者1接收到消息：【hello, spring amqp!8】22:50:36.618362<br />
消费者1接收到消息：【hello, spring amqp!9】22:50:36.649349700<br />
消费者2接收到消息：【hello, spring amqp!10】22:50:36.680773900<br />
消费者1接收到消息：【hello, spring amqp!11】22:50:36.710292<br />
消费者1接收到消息：【hello, spring amqp!12】22:50:36.741619700<br />
消费者1接收到消息：【hello, spring amqp!13】22:50:36.772893600<br />
消费者1接收到消息：【hello, spring amqp!14】22:50:36.804473<br />
消费者1接收到消息：【hello, spring amqp!15】22:50:36.836137600<br />
消费者1接收到消息：【hello, spring amqp!16】22:50:36.869356800<br />
消费者1接收到消息：【hello, spring amqp!17】22:50:36.900158400<br />
消费者2接收到消息：【hello, spring amqp!18】22:50:36.929390400<br />
消费者1接收到消息：【hello, spring amqp!19】22:50:36.961735300<br />
消费者1接收到消息：【hello, spring amqp!20】22:50:36.993206500<br />
消费者1接收到消息：【hello, spring amqp!21】22:50:37.024488900<br />
消费者1接收到消息：【hello, spring amqp!22】22:50:37.057385300<br />
消费者1接收到消息：【hello, spring amqp!23】22:50:37.085440300<br />
消费者1接收到消息：【hello, spring amqp!24】22:50:37.118149600<br />
消费者1接收到消息：【hello, spring amqp!25】22:50:37.149423900<br />
消费者2接收到消息：【hello, spring amqp!26】22:50:37.179996900<br />
消费者1接收到消息：【hello, spring amqp!27】22:50:37.211825700<br />
消费者1接收到消息：【hello, spring amqp!28】22:50:37.243344200<br />
消费者1接收到消息：【hello, spring amqp!29】22:50:37.274712400<br />
消费者1接收到消息：【hello, spring amqp!30】22:50:37.304529<br />
消费者1接收到消息：【hello, spring amqp!31】22:50:37.335297800<br />
消费者1接收到消息：【hello, spring amqp!32】22:50:37.366405700<br />
消费者1接收到消息：【hello, spring amqp!33】22:50:37.396258500<br />
消费者2接收到消息：【hello, spring amqp!34】22:50:37.428366300<br />
消费者1接收到消息：【hello, spring amqp!35】22:50:37.459359500<br />
消费者1接收到消息：【hello, spring amqp!36】22:50:37.488343700<br />
消费者1接收到消息：【hello, spring amqp!37】22:50:37.519775200<br />
消费者1接收到消息：【hello, spring amqp!38】22:50:37.552296100<br />
消费者1接收到消息：【hello, spring amqp!39】22:50:37.583095600<br />
消费者1接收到消息：【hello, spring amqp!40】22:50:37.613216100<br />
消费者1接收到消息：【hello, spring amqp!41】22:50:37.644062600<br />
消费者2接收到消息：【hello, spring amqp!42】22:50:37.674111<br />
消费者1接收到消息：【hello, spring amqp!43】22:50:37.707119900<br />
消费者1接收到消息：【hello, spring amqp!44】22:50:37.737985500<br />
消费者1接收到消息：【hello, spring amqp!45】22:50:37.770173900<br />
消费者1接收到消息：【hello, spring amqp!46】22:50:37.801731300<br />
消费者1接收到消息：【hello, spring amqp!47】22:50:37.833032100<br />
消费者1接收到消息：【hello, spring amqp!48】22:50:37.866347100<br />
消费者1接收到消息：【hello, spring amqp!49】22:50:37.896003<br />
消费者2接收到消息：【hello, spring amqp!50】22:50:37.925794600</td>
</tr>
</tbody>
</table>

可以看到消费者1消费能力强，所以消费了更多的消息，而且消息很快就被消费完了，比之前的快了3秒多。

**3.3 交换机类型**

引入交换机后，原有的消费模型就发生了很大的变化：

<img src="../assets/SpringCloud笔记/media/image130.png" style="width:5.73958in;height:2.01042in" />

过程如下：

**Publisher**：生产者，不再发送消息到队列中，而是发给交换机

**Exchange**：交换机，一方面，接收生产者发送的消息，另一方面，知道如何处理消息，例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型

**Queue**：消息队列也与以前一样，接收消息、缓存消息。不过队列一定要与交换机绑定

**Consumer**：消费者，与以前一样，订阅队列，没有变化

|                                                                                                                                                        |
|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **注意**：**Exchange（交换机）只负责转发消息，不具备存储消息的能力**，因此如果没有任何队列与Exchange绑定，或者没有符合路由规则的队列，那么消息会丢失！ |

交换机的类型有四种：

**Fanout**：广播，将消息交给所有绑定到交换机的队列，我们最早在控制台使用的正是Fanout交换机

**Direct**：订阅，基于RoutingKey（路由key）发送给订阅了消息的队列

**Topic**：通配符订阅，与Direct类似，只不过RoutingKey可以使用通配符

**Headers**：头匹配，基于MQ的消息头匹配，用的较少

这里只介绍前三种交换机模式。

**3.4 Fanout交换机**

Fanout交换机就是广播模式的交换机，工作流程如下：

<img src="../assets/SpringCloud笔记/media/image131.png" style="width:5.75in;height:1.4375in" />

生产者把消息发送到Fanout交换机后，Fanout交换机将消息转发给所有与其绑定队列，每个队列的消费者都能拿到消息。

**案例**：

<img src="../assets/SpringCloud笔记/media/image132.png" style="width:5.75in;height:1.20833in" />

创建一个名为hmall.fanout的交换机，类型是Fanout

创建两个队列fanout.queue1和fanout.queue2，绑定到交换机hmall.fanout

**3.4.1 声明队列和交换机**

在控制台创建队列fanout.queue1：

<img src="../assets/SpringCloud笔记/media/image133.png" style="width:5.75in;height:1.51042in" />

再创建一个队列fanout.queue2：

<img src="../assets/SpringCloud笔记/media/image134.png" style="width:5.75in;height:1.53125in" />

然后再创建一个交换机：

<img src="../assets/SpringCloud笔记/media/image135.png" style="width:5.75in;height:1.64583in" />

然后绑定两个队列到交换机：

<img src="../assets/SpringCloud笔记/media/image136.png" style="width:5.75in;height:2.05208in" />

**3.4.2 消息发送**

在publisher服务的SpringAmqpTest类中添加测试方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void testFanoutExchange() {<br />
//交换机名称<br />
String exchangeName = "hmall.fanout";<br />
//消息<br />
String message = "hello, everyone!";<br />
//发送消息<br />
rabbitTemplate.convertAndSend(exchangeName, "", message);<br />
}</td>
</tr>
</tbody>
</table>

**3.4.3 消息接收**

在consumer服务的SpringRabbitListener中添加两个方法，作为消费者：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(queues = "fanout.queue1")<br />
public void listenFanoutQueue1(String msg) {<br />
System.out.println("消费者1接收到消息：【" + msg + "】");<br />
}<br />
<br />
@RabbitListener(queues = "fanout.queue2")<br />
public void listenFanoutQueue2(String msg) {<br />
System.out.println("消费者2接收到消息：【" + msg + "】");<br />
}</td>
</tr>
</tbody>
</table>

最后自行测试即可，这里不演示。

**3.5 Direct交换机**

在Fanout模式中，一条消息，会被所有订阅的队列都消费，但在某些场景下，希望不同的消息被不同的队列消费，这时就要用到Direct类型的Exchange：

<img src="../assets/SpringCloud笔记/media/image137.png" style="width:5.75in;height:1.72917in" />

在Direct模型下：

队列与交换机的绑定，不能是任意绑定，而是要指定一个RoutingKey（路由key）

消息的发送方在 向 Exchange发送消息时，也必须指定消息的 RoutingKey

Exchange不再把消息交给每一个绑定的队列，而是根据消息的Routing Key进行判断，只有队列的Routingkey与消息的 Routing key完全一致，才会接收到消息

**案例**：

<img src="../assets/SpringCloud笔记/media/image138.png" style="width:5.75in;height:2.11458in" />

声明一个名为hmall.direct的交换机

声明队列direct.queue1，绑定hmall.direct，bindingKey为blud和red

声明队列direct.queue2，绑定hmall.direct，bindingKey为yellow和red

在consumer服务中，编写两个消费者方法，分别监听direct.queue1和direct.queue2

在publisher中编写测试方法，向hmall.direct发送消息

**3.5.1 声明队列和交换机**

首先在控制台声明两个队列direct.queue1和direct.queue2，这里不再展示过程：

<img src="../assets/SpringCloud笔记/media/image139.png" style="width:5.75in;height:1.45833in" />

然后声明一个direct类型的交换机，命名为hmall.direct：

<img src="../assets/SpringCloud笔记/media/image140.png" style="width:5.75in;height:1.4375in" />

然后使用red和blue作为key，绑定direct.queue1到hmall.direct：

<img src="../assets/SpringCloud笔记/media/image141.png" style="width:5.75in;height:1.53125in" />

<img src="../assets/SpringCloud笔记/media/image142.png" style="width:5.75in;height:1.6875in" />

同理，使用red和yellow作为key，绑定direct.queue2到hmall.direct，最终结果：

<img src="../assets/SpringCloud笔记/media/image143.png" style="width:5.75in;height:1.79167in" />

**3.5.2 消息接收**

在consumer服务的SpringRabbitListener中添加方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(queues = "direct.queue1")<br />
public void listenDirectQueue1(String msg) {<br />
System.out.println("消费者1接收到消息：【" + msg + "】");<br />
}<br />
<br />
@RabbitListener(queues = "direct.queue2")<br />
public void listenDirectQueue2(String msg) {<br />
System.out.println("消费者2接收到消息：【" + msg + "】");<br />
}</td>
</tr>
</tbody>
</table>

**3.5.3 消息发送**

在publisher服务的SpringAmqpTest类中添加测试方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void testDirectExchange() {<br />
//交换机名称<br />
String exchangeName = "hmall.direct";<br />
//消息<br />
String message = "最新报道，哥斯拉是居民自治巨型气球，虚惊一场！";<br />
//发送消息<br />
rabbitTemplate.convertAndSend(exchangeName, "red", message);<br />
}</td>
</tr>
</tbody>
</table>

由于使用的red这个key，所以两个消费者都收到了消息：

<img src="../assets/SpringCloud笔记/media/image144.png" style="width:5.75in;height:0.34375in" />

再切换为blue这个key：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void testDirectExchange() {<br />
//交换机名称<br />
String exchangeName = "hmall.direct";<br />
//消息<br />
String message = "最新报道，哥斯拉是居民自治巨型气球，虚惊一场！";<br />
//发送消息<br />
rabbitTemplate.convertAndSend(exchangeName, "blue", message);<br />
}</td>
</tr>
</tbody>
</table>

会发现只有消费者1收到了消息：

<img src="../assets/SpringCloud笔记/media/image145.png" style="width:5.75in;height:0.19792in" />

**3.6 Topic交换机**

Topic类型的Exchange与Direct相比，都是可以根据RoutingKey把消息路由到不同的队列，只不过Topic类型Exchange可以让队列在绑定BindingKey 的时候使用通配符。

BindingKey一般由一个或多个单词组成，多个单词之间以.分割，例如item.insert，通配符规则：

\#：匹配零个或多个词

\*：匹配不多不少恰好1个词

**案例**：

<img src="../assets/SpringCloud笔记/media/image146.png" style="width:5.75in;height:1.48958in" />

topic.queue1：绑定china.#，凡是以china.开头的routing key都可以匹配，例如china.news、china.weather

topic.queue2：绑定#.news，凡是以.news结尾的routing key都可以匹配，例如china.news、japan.news

**3.6.1 声明队列和交换机**

首先在控制台声明两个队列topic.queue1和topic.queue2，这里不再展示过程：

<img src="../assets/SpringCloud笔记/media/image147.png" style="width:5.75in;height:1.44792in" />

然后声明一个topic类型的交换机，命名为hmall.topic：

<img src="../assets/SpringCloud笔记/media/image148.png" style="width:5.75in;height:1.32292in" />

最后使用通配符绑定队列和交换机：

<img src="../assets/SpringCloud笔记/media/image149.png" style="width:5.75in;height:2.0625in" />

**3.6.2 消息发送**

在publisher服务的SpringAmqpTest类中添加测试方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void testSendTopicExchange() {<br />
//交换机名称<br />
String exchangeName = "hmall.topic";<br />
//消息<br />
String message = "喜报！孙悟空大战哥斯拉，胜!";<br />
//发送消息<br />
rabbitTemplate.convertAndSend(exchangeName, "china.news", message);<br />
}</td>
</tr>
</tbody>
</table>

**3.6.3 消息接收**

在consumer服务的SpringRabbitListener中添加方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(queues = "topic.queue1")<br />
public void listenTopicQueue1(String msg) {<br />
System.out.println("消费者1接收到topic.queue1的消息：【" + msg + "】");<br />
}<br />
<br />
@RabbitListener(queues = "topic.queue2")<br />
public void listenTopicQueue2(String msg) {<br />
System.out.println("消费者2接收到topic.queue2的消息：【" + msg + "】");<br />
}</td>
</tr>
</tbody>
</table>

**3.7 声明队列和交换机**

在实际开发中队列和交换机往往不是由程序员在控制台手动创建，而是由程序启动时自动检查队列和交换机是否存在，如果不存在自动创建。

**3.7.1 基本API**

SpringAMQP提供了一个Queue类，用来创建队列：

<img src="../assets/SpringCloud笔记/media/image150.png" style="width:5.75in;height:1.46875in" />

SpringAMQP还提供了一个Exchange接口，来表示所有不同类型的交换机：

<img src="../assets/SpringCloud笔记/media/image151.png" style="width:5.75in;height:1.61458in" />

可以通过new的方式创建队列和交换机，还可以通过ExchangeBuilder来简化这个过程：

<img src="../assets/SpringCloud笔记/media/image152.png" style="width:5.75in;height:2.15625in" />

而在绑定队列和交换机时，则需要使用BindingBuilder来创建Binding对象：

<img src="../assets/SpringCloud笔记/media/image153.png" style="width:5.75in;height:1.27083in" />

**3.7.2 fanout示例**

在consumer中创建一个类FanoutConfig，声明队列和交换机：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.consumer.config;<br />
<br />
import org.springframework.amqp.core.*;<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.context.annotation.Configuration;<br />
<br />
@Configuration<br />
public class FanoutConfig {<br />
//声明fanout类型的交换机hmall.fanout<br />
@Bean<br />
public FanoutExchange fanoutExchange(){<br />
//return ExchangeBuilder.fanoutExchange("hmall.fanout").build();<br />
return new FanoutExchange("hmall.fanout"); //默认是持久的<br />
}<br />
<br />
//声明第一个队列<br />
@Bean<br />
public Queue fanoutQueue1(){<br />
//return QueueBuilder.durable("fanout.queue1").build();<br />
return new Queue("fanout.queue1");<br />
}<br />
<br />
//绑定队列和交换机<br />
@Bean<br />
public Binding bindingQueue1(Queue fanoutQueue1, FanoutExchange fanoutExchange){<br />
return BindingBuilder.bind(fanoutQueue1).to(fanoutExchange);<br />
}<br />
<br />
//声明第二个队列<br />
@Bean<br />
public Queue fanoutQueue2(){<br />
//return QueueBuilder.durable("fanout.queue2").build();<br />
return new Queue("fanout.queue2");<br />
}<br />
<br />
//绑定队列和交换机<br />
@Bean<br />
public Binding bindingQueue2(Queue fanoutQueue2, FanoutExchange fanoutExchange){<br />
return BindingBuilder.bind(fanoutQueue2).to(fanoutExchange);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

最后自行删除原本的fanout交换机和相关队列运行测试即可。

|                                                                                                                                                                |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **说明**：如果队列已经存在，RabbitMQ会忽略重复的队列声明，不会报错。RabbitMQ的队列声明是幂等的，即多次声明同一个队列不会有问题，只要队列的名称和类型一致即可。 |

**3.7.3 direct示例**

direct模式由于要绑定多个KEY，会非常麻烦，每一个Key都要编写一个binding：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.consumer.config;<br />
<br />
import org.springframework.amqp.core.*;<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.context.annotation.Configuration;<br />
<br />
@Configuration<br />
public class DirectConfig {<br />
//声明direct类型的交换机hmall.direct<br />
@Bean<br />
public DirectExchange directExchange(){<br />
//return new DirectExchange("hmall.direct");<br />
return ExchangeBuilder.directExchange("hmall.direct").build();<br />
}<br />
<br />
//声明第一个队列<br />
@Bean<br />
public Queue directQueue1(){<br />
//return new Queue("direct.queue1");<br />
return QueueBuilder.durable("direct.queue1").build();<br />
}<br />
<br />
//绑定队列和交换机<br />
@Bean<br />
public Binding bindingQueue1WithRed(Queue directQueue1, DirectExchange directExchange){<br />
return BindingBuilder.bind(directQueue1).to(directExchange).with("red");<br />
}<br />
<br />
@Bean<br />
public Binding bindingQueue1WithBlue(Queue directQueue1, DirectExchange directExchange){<br />
return BindingBuilder.bind(directQueue1).to(directExchange).with("blue");<br />
}<br />
<br />
//声明第二个队列<br />
@Bean<br />
public Queue directQueue2(){<br />
//return new Queue("direct.queue2");<br />
return QueueBuilder.durable("direct.queue2").build();<br />
}<br />
<br />
//绑定队列和交换机<br />
@Bean<br />
public Binding bindingQueue2WithRed(Queue directQueue2, DirectExchange directExchange){<br />
return BindingBuilder.bind(directQueue2).to(directExchange).with("red");<br />
}<br />
<br />
@Bean<br />
public Binding bindingQueue2WithYellow(Queue directQueue2, DirectExchange directExchange){<br />
return BindingBuilder.bind(directQueue2).to(directExchange).with("yellow");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.7.4 基于注解声明**

基于@Bean的方式声明队列和交换机比较麻烦，因此Spring还提供了基于注解方式来声明队列和交换机。例如同样声明Direct模式的交换机和队列：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//@RabbitListener(queues = "direct.queue1")<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "direct.queue1"),<br />
exchange = @Exchange(name = "hmall.direct", type = ExchangeTypes.DIRECT),<br />
key = {"red", "blue"}<br />
))<br />
public void listenDirectQueue1(String msg) {<br />
System.out.println("消费者1接收到消息：【" + msg + "】");<br />
}<br />
<br />
//@RabbitListener(queues = "direct.queue2")<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "direct.queue2"),<br />
exchange = @Exchange(name = "hmall.direct", type = ExchangeTypes.DIRECT),<br />
key = {"red", "yellow"}<br />
))<br />
public void listenDirectQueue2(String msg) {<br />
System.out.println("消费者2接收到消息：【" + msg + "】");<br />
}</td>
</tr>
</tbody>
</table>

|                                                                                                           |
|-----------------------------------------------------------------------------------------------------------|
| **说明**：这里的@Exchange注解中type的值默认就是ExchangeTypes.DIRECT，所以direct交换机可以不指定type属性。 |

同理，Topic模式的交换机和队列声明如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//@RabbitListener(queues = "topic.queue1")<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "topic.queue1"),<br />
exchange = @Exchange(name = "hmall.topic", type = ExchangeTypes.TOPIC),<br />
key = "china.#"<br />
))<br />
public void listenTopicQueue1(String msg) {<br />
System.out.println("消费者1接收到topic.queue1的消息：【" + msg + "】");<br />
}<br />
<br />
//@RabbitListener(queues = "topic.queue2")<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "topic.queue2"),<br />
exchange = @Exchange(name = "hmall.topic", type = ExchangeTypes.TOPIC),<br />
key = "#.news"<br />
))<br />
public void listenTopicQueue2(String msg) {<br />
System.out.println("消费者2接收到topic.queue2的消息：【" + msg + "】");<br />
}</td>
</tr>
</tbody>
</table>

**3.8 消息转换器**

当使用 Spring 发送消息时，传输内容通常是 Java 对象（底层是Object），但消息队列只能处理字节数据。因此，需要先将对象序列化为字节发送，接收时再反序列化为对象。Spring 默认使用的是 JDK 的序列化机制，但这种方式格式不友好、体积大、不安全。实际开发中，通常会配置 JSON 转换器，使消息更轻量、可读且更安全。

**3.8.1 测试默认转换器**

首先，在consumer服务中声明一个新的配置类MessageConfig，利用@Bean的方式创建一个队列：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.consumer.config;<br />
<br />
import org.springframework.amqp.core.Queue; //注意不要导成java.util.Queue<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.context.annotation.Configuration;<br />
<br />
@Configuration<br />
public class MessageConfig {<br />
@Bean<br />
public Queue objectQueue(){<br />
return new Queue("object.queue");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

重启consumer服务该队列就会被自动创建：

<img src="../assets/SpringCloud笔记/media/image154.png" style="width:5.75in;height:1.5625in" />

在publisher模块的SpringAmqpTest中新增一个消息发送的代码，发送一个Map对象：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void testSendMap() {<br />
//准备消息<br />
Map&lt;String, Object&gt; message = new HashMap&lt;&gt;(2);<br />
message.put("name", "柳岩");<br />
message.put("age", 21);<br />
//发送消息<br />
rabbitTemplate.convertAndSend("object.queue", message);<br />
}</td>
</tr>
</tbody>
</table>

发送消息后查看控制台，可以看到消息是采用的JDK序列化，可读性非常差：

<img src="../assets/SpringCloud笔记/media/image155.png" style="width:5.75in;height:2.47917in" />

**3.8.2 配置JSON转换器**

我们希望消息体的体积更小、可读性更高，因此可以使用JSON方式来做序列化和反序列化。

在publisher和consumer两个服务中都引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.fasterxml.jackson.dataformat&lt;/groupId&gt;<br />
&lt;artifactId&gt;jackson-dataformat-xml&lt;/artifactId&gt;<br />
&lt;version&gt;2.9.10&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

如果项目中引入了spring-boot-starter-web依赖，则无需再次引入Jackson依赖。

配置消息转换器，在publisher和consumer两个服务的启动类中添加一个Bean即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Bean<br />
public MessageConverter messageConverter(){<br />
// 1.定义消息转换器<br />
Jackson2JsonMessageConverter jackson2JsonMessageConverter = new Jackson2JsonMessageConverter();<br />
// 2.配置自动创建消息id，用于识别不同消息，也可以在业务中基于ID判断是否是重复消息<br />
jackson2JsonMessageConverter.setCreateMessageIds(true);<br />
return jackson2JsonMessageConverter;<br />
}</td>
</tr>
</tbody>
</table>

*消息转换器中添加的messageId用于将来做幂等性判断，后面会说。*

到MQ控制台**删除**object.queue中的旧的消息：

<img src="../assets/SpringCloud笔记/media/image156.png" style="width:5.75in;height:1.65625in" />

*Purge Messages按钮用于删除队列中的所有消息。*

然后再次执行刚才的消息发送的代码，到MQ的控制台查看消息结构：

<img src="../assets/SpringCloud笔记/media/image157.png" style="width:5.75in;height:2.21875in" />

**3.8.3 消费者接收Object**

在consumer服务中定义一个新的消费者，**publisher是用Map发送，那么消费者也一定要用Map接收**，格式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(queues = "object.queue")<br />
public void listenSimpleQueueMessage(Map&lt;String, Object&gt; msg){<br />
System.out.println("消费者接收到消息：【" + msg + "】");<br />
}</td>
</tr>
</tbody>
</table>

**4.业务改造**

需求：改造余额支付功能，将支付成功后基于OpenFeign的交易服务的更新订单状态接口的同步调用，改为基于RabbitMQ的异步通知。

这里只需要关注交易服务即可，因为其他服务没有实现，具体步骤：

<img src="../assets/SpringCloud笔记/media/image158.png" style="width:5.75in;height:2.70833in" />

定义direct类型交换机，命名为pay.direct

定义消息队列，命名为trade.pay.success.queue

将trade.pay.success.queue与pay.direct绑定，BindingKey为pay.success

支付成功时不再调用交易服务更新订单状态的接口，而是发送一条消息到pay.direct，发送消息的RoutingKey 为pay.success，消息内容是订单id

交易服务监听trade.pay.success.queue队列，接收到消息后更新订单状态为已支付

**4.1 配置MQ**

为生产者pay-service和消费者trade-service配置MQ的基础信息

1）添加依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--AMQP依赖--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-amqp&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

2）配置MQ地址：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
host: 192.168.150.101 # 你的虚拟机IP<br />
port: 5672 # 端口<br />
virtual-host: /hmall # 虚拟主机<br />
username: hmall # 用户名<br />
password: 123 # 密码</td>
</tr>
</tbody>
</table>

**4.2 接收消息**

在trade-service服务中定义一个消息监听类PayStatusListener：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.trade.listener;<br />
<br />
import com.hmall.trade.service.IOrderService;<br />
import lombok.RequiredArgsConstructor;<br />
import org.springframework.amqp.rabbit.annotation.Exchange;<br />
import org.springframework.amqp.rabbit.annotation.Queue;<br />
import org.springframework.amqp.rabbit.annotation.QueueBinding;<br />
import org.springframework.amqp.rabbit.annotation.RabbitListener;<br />
import org.springframework.stereotype.Component;<br />
<br />
@Component //@RabbitListener只能在bean上生效，所以需要当前类注册为bean<br />
@RequiredArgsConstructor<br />
public class PayStatusListener {<br />
private final IOrderService orderService;<br />
<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "trade.pay.success.queue", durable = "true"),<br />
exchange = @Exchange(name = "pay.direct"),<br />
key = "pay.success"<br />
))<br />
public void listenPaySuccess(Long orderId){<br />
orderService.markOrderPaySuccess(orderId);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.3 发送消息**

修改pay-service服务下的com.hmall.pay.service.impl.PayOrderServiceImpl类中的tryPayOrderByBalance方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private final RabbitTemplate rabbitTemplate;<br />
<br />
@Override<br />
@Transactional<br />
public void tryPayOrderByBalance(PayOrderFormDTO payOrderFormDTO) {<br />
// 1.查询支付单<br />
PayOrder po = getById(payOrderFormDTO.getId());<br />
// 2.判断状态<br />
if(!PayStatus.WAIT_BUYER_PAY.equalsValue(po.getStatus())){<br />
// 订单不是未支付，状态异常<br />
throw new BizIllegalException("交易已支付或关闭！");<br />
}<br />
// 3.尝试扣减余额<br />
userClient.deductMoney(payOrderFormDTO.getPw(), po.getAmount());<br />
// 4.修改支付单状态<br />
boolean success = markPayOrderSuccess(payOrderFormDTO.getId(), LocalDateTime.now());<br />
if (!success) {<br />
throw new BizIllegalException("交易已支付或关闭！");<br />
}<br />
// 5.修改订单状态<br />
//tradeClient.markOrderPaySuccess(po.getBizOrderNo());<br />
try {<br />
rabbitTemplate.convertAndSend("pay.direct", "pay.success", po.getBizOrderNo());<br />
} catch (AmqpException e) {<br />
log.error("支付成功的消息发送失败，支付单id：{}， 交易单id：{}", po.getId(), po.getBizOrderNo(), e);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**5.发送者的可靠性**

<img src="../assets/SpringCloud笔记/media/image159.png" style="width:5.75in;height:2.01042in" />

消息从生产者到消费者的每一步都可能导致消息丢失：

发送消息时丢失：

生产者发送消息时连接MQ失败

生产者发送消息到达MQ后未找到Exchange

生产者发送消息到达MQ的Exchange后，未找到合适的Queue

消息到达MQ后，处理消息的进程发生异常

MQ导致消息丢失：

消息到达MQ，保存到队列后，尚未消费就突然宕机

消费者处理消息时：

消息接收后尚未处理突然宕机

消息接收后处理过程中抛出异常

要解决消息丢失问题，保证MQ的可靠性，就必须从3个方面入手：

确保生产者一定把消息发送到MQ

确保MQ不会将消息弄丢

确保消费者一定要处理消息

**5.1 生产者重试机制**

如果生产者发送消息时，出现了网络故障，导致与MQ的连接中断，消息就可能丢失。为了解决这个问题，SpringAMQP提供了消息发送时的重试机制，即当RabbitTemplate与MQ连接超时后，多次重试。

修改publisher模块的application.yaml文件，添加下面的内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
connection-timeout: 1s # 设置MQ的连接超时时间<br />
template:<br />
retry:<br />
enabled: false # 开启超时重试机制<br />
initial-interval: 1000ms # 失败后的初始等待时间<br />
multiplier: 1 # 失败后下次的等待时长倍数，下次等待时间 = 本次等待时间 * 下次等待时长倍数<br />
max-attempts: 3 # 最大重试次数</td>
</tr>
</tbody>
</table>

利用命令停掉RabbitMQ服务：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker stop mq</td>
</tr>
</tbody>
</table>

然后测试发送一条消息，会发现会每隔1秒重试1次，总共重试了3次。消息发送的超时重试机制配置成功了！

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意</strong>：网络不稳定时利用重试机制可以有效提高消息发送的成功率，但是SpringAMQP提供的重试机制是<strong>阻塞式</strong>的重试，多次重试等待当前线程是被阻塞的。</p>
<p>如果对于业务性能有要求，建议禁用重试机制。如果一定要使用，请合理配置等待时长和重试次数，当然也可以考虑使用异步线程来执行发送消息的代码。</p></td>
</tr>
</tbody>
</table>

**5.2 生产者确认机制**

一般只要生产者与MQ之间的网路连接顺畅，基本不会出现发送消息丢失的情况，因此大多数情况下无需考虑这种问题。不过，在少数情况下，也会出现消息发送到MQ之后丢失的现象，比如：

MQ内部处理消息的进程发生了异常

生产者发送消息到达MQ后未找到Exchange

生产者发送消息到达MQ的Exchange后，未找到合适的Queue，因此无法路由

针对上述情况，RabbitMQ提供了生产者消息确认机制，包括Publisher Confirm和Publisher Return两种，在开启确认机制的情况下，当生产者发送消息给MQ后，MQ会根据消息处理的情况返回不同的**回执**。

具体如图所示：

<img src="../assets/SpringCloud笔记/media/image160.png" style="width:5.75in;height:1.75in" />

总结如下：

当消息投递到MQ，但是路由失败时，通过**Publisher Return**返回异常信息，同时返回ack的确认信息，代表投递成功

临时消息投递到了MQ，并且入队成功，返回ACK，告知投递成功

持久消息投递到了MQ，并且入队完成持久化，返回ACK ，告知投递成功

其它情况都会返回NACK，告知投递失败

其中ack和nack属于**Publisher Confirm**机制，ack是投递成功；nack是投递失败。而return则属于**Publisher Return**机制。

默认两种机制都是关闭状态，需要通过配置文件来开启。

**5.3 实现生产者确认**

**5.3.1 开启生产者确认**

在publisher模块的application.yaml中添加配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
publisher-confirm-type: correlated # 开启publisher confirm机制，并设置confirm类型<br />
publisher-returns: true # 开启publisher return机制</td>
</tr>
</tbody>
</table>

这里publisher-confirm-type有三种模式可选：

none：关闭confirm机制

simple：同步阻塞等待MQ的回执

correlated：MQ异步回调返回回执

一般我们推荐使用correlated回调机制。

**5.3.2 定义ReturnCallback**

ReturnCallback 的作用：当消息已经到达交换机，但交换机无法将消息路由到任何队列（例如，路由键不匹配或队列不存在），MQ会返回路由失败回执，rabbitTemplate收到后就会触发**ReturnCallback**，如果正常到达队列，就不会触发。

每个RabbitTemplate只能配置一个ReturnCallback，可以在配置类中统一设置，在publisher模块定义一个配置类MqConfig：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.publisher.config;<br />
<br />
import lombok.RequiredArgsConstructor;<br />
import lombok.extern.slf4j.Slf4j;<br />
import org.springframework.amqp.core.ReturnedMessage;<br />
import org.springframework.amqp.rabbit.core.RabbitTemplate;<br />
import org.springframework.context.annotation.Configuration;<br />
<br />
import javax.annotation.PostConstruct;<br />
<br />
@Slf4j<br />
@RequiredArgsConstructor<br />
@Configuration<br />
public class MqConfig {<br />
private final RabbitTemplate rabbitTemplate;<br />
<br />
@PostConstruct<br />
public void configReturnsCallBack(){<br />
rabbitTemplate.setReturnsCallback(new RabbitTemplate.ReturnsCallback() {<br />
@Override<br />
public void returnedMessage(ReturnedMessage returnedMessage) {<br />
log.error("触发return callback");<br />
log.debug("exchange：{}", returnedMessage.getExchange());<br />
log.debug("routingKey：{}", returnedMessage.getRoutingKey());<br />
log.debug("message：{}", returnedMessage.getMessage());<br />
log.debug("replyCode：{}", returnedMessage.getReplyCode());<br />
log.debug("replyText：{}", returnedMessage.getReplyText());<br />
}<br />
});<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**5.3.3 定义ConfirmCallback**

由于每个消息发送时的处理逻辑不一定相同，因此ConfirmCallback需要在每次发消息时定义，具体来说，是在调用RabbitTemplate中的convertAndSend方法时，多传递一个参数：

<img src="../assets/SpringCloud笔记/media/image161.png" style="width:5.75in;height:1.09375in" />

这里的CorrelationData中包含两个核心的东西：

id：消息的唯一标示，MQ对不同的消息的回执以此做判断，避免混淆

SettableListenableFuture：回执结果的Future对象

将来MQ的回执就会通过这个Future来返回，可以提前给CorrelationData中的Future添加回调函数来处理消息回执：

<img src="../assets/SpringCloud笔记/media/image162.png" style="width:5.75in;height:1.22917in" />

新建一个测试，向系统自带的交换机发送消息，并且添加ConfirmCallback：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void testPublisherConfirm() throws InterruptedException {<br />
// 1.创建CorrelationData<br />
CorrelationData cd = new CorrelationData();<br />
// 2.给Future添加ConfirmCallback<br />
cd.getFuture().addCallback(new ListenableFutureCallback&lt;CorrelationData.Confirm&gt;() {<br />
// Future发生异常时的处理逻辑，基本不会触发<br />
@Override<br />
public void onFailure(Throwable ex) {<br />
log.error("send message fail", ex);<br />
}<br />
<br />
//Future接收到回执的处理逻辑，参数中的result就是回执内容<br />
@Override<br />
public void onSuccess(CorrelationData.Confirm result) {<br />
if (result.isAck()) { // result.isAck()，boolean类型，true代表ack回执，false 代表 nack回执<br />
log.debug("发送消息成功，收到 ack!");<br />
} else { // result.getReason()，String类型，返回nack时的异常描述<br />
log.error("发送消息失败，收到 nack, reason : {}", result.getReason());<br />
}<br />
}<br />
});<br />
// 3.发送消息<br />
rabbitTemplate.convertAndSend("hmall.direct", "q", "hello", cd);<br />
//休眠3秒便于接受到回执消息<br />
Thread.sleep(2000);<br />
}</td>
</tr>
</tbody>
</table>

这里最后要sleep一段时间用于接收回执消息，否则程序还没接收到回执JVM就停止了。

目前的项目日志级别为INFO，导致debug的日志信息控制台看不到，所以最后还要配置publisher日志级别为DEBUG：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
logging:<br />
level:<br />
root: DEBUG # 全局日志级别设为DEBUG</td>
</tr>
</tbody>
</table>

<img src="../assets/SpringCloud笔记/media/image163.png" style="width:5.75in;height:1.15625in" />

可以看到，由于传递的RoutingKey是错误的，路由失败后触发了return callback，同时也收到了ack。当修改为正确的RoutingKey以后，就不会触发return callback了，只收到ack。而如果连交换机都是错误的，则只会收到nack。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意</strong>：开启生产者确认比较消耗MQ性能，一般不建议开启。考虑触发确认的几种情况就知道了：</p>
<p>路由失败：一般是因为RoutingKey错误导致，往往是编程导致</p>
<p>交换机名称错误：同样是编程错误导致</p>
<p>MQ内部故障：这种需要处理，但概率往往较低。</p>
<p>因此只有对消息可靠性要求非常高的业务才需要开启，而且仅仅需要开启ConfirmCallback处理nack就可以了。</p></td>
</tr>
</tbody>
</table>

**6.MQ的可靠性**

消息到达MQ以后，如果MQ不能及时保存，也会导致消息丢失，所以MQ的可靠性也非常重要。

**6.1 数据持久化**

为了提升性能，默认情况下MQ的数据都是在内存存储的临时数据，重启后就会消失。为了保证数据的可靠性，必须配置数据持久化，包括：

交换机持久化

队列持久化

消息持久化

**6.1.1 交换机持久化**

在控制台的Exchanges页面，添加交换机时可以配置交换机的Durability参数：

<img src="../assets/SpringCloud笔记/media/image164.png" style="width:5.75in;height:1.625in" />

设置为Durable就是持久化模式，Transient就是临时模式。

使用java代码实现交换机持久化：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//不管是new的方式还是ExchangeBuilder的方式，都是默认持久化的<br />
@Bean<br />
public FanoutExchange fanoutExchange(){<br />
//return ExchangeBuilder.fanoutExchange("hmall.fanout").durable(true).build();<br />
//return ExchangeBuilder.fanoutExchange("hmall.fanout").build(); //默认持久化<br />
return new FanoutExchange("hmall.fanout"); //默认是持久的<br />
}<br />
<br />
//注解方式也是默认持久化的<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "direct.queue1"),<br />
exchange = @Exchange(name = "hmall.direct", type = ExchangeTypes.DIRECT),<br />
//exchange = @Exchange(name = "hmall.direct", type = ExchangeTypes.DIRECT, durable = "true"),<br />
key = {"red", "blue"}<br />
))<br />
...</td>
</tr>
</tbody>
</table>

**6.1.2 队列持久化**

在控制台的Queues页面，添加队列时，同样可以配置队列的Durability参数：

<img src="../assets/SpringCloud笔记/media/image165.png" style="width:5.75in;height:1.5625in" />

使用java代码实现队列持久化：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//new的方式和QueueBuilder都是默认持久化的<br />
@Bean<br />
public Queue fanoutQueue1(){<br />
//return QueueBuilder.durable("fanout.queue1").build();<br />
return new Queue("fanout.queue1");<br />
}<br />
<br />
//注解方式需要手动添加 durable = "true" 持久化<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "direct.queue2", durable = "true"),<br />
exchange = @Exchange(name = "hmall.direct", type = ExchangeTypes.DIRECT),<br />
key = {"red", "yellow"}<br />
))<br />
...</td>
</tr>
</tbody>
</table>

即使设置了 durable=true，新消息仍然优先存入内存，只有内存压力大时才写出到磁盘。

**6.1.3 消息持久化**

在控制台发送消息的时候，可以添加很多参数，而消息的持久化是要配置一个properties（Persistent代表持久化）：

<img src="../assets/SpringCloud笔记/media/image166.png" style="width:5.75in;height:1.86458in" />

MQ发送消息，默认是持久化的，如果要发送非持久化的消息，要自定义构建器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void testSendMessage200000() {<br />
//自定义构建消息<br />
Message message = MessageBuilder<br />
.withBody("hello, SpringAMQP".getBytes(StandardCharsets.UTF_8)) //消息体<br />
.setDeliveryMode(MessageDeliveryMode.NON_PERSISTENT) //设置是否消息持久化<br />
.build();<br />
//发送20万条消息<br />
for (int i = 0; i &lt; 200000; i++) {<br />
rabbitTemplate.convertAndSend("simple.queue", message);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

|                                                                                                                                                                                                                                                                                                                           |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **说明**：在开启持久化机制以后，如果同时还开启了生产者确认，那么MQ会在消息持久化以后才发送ACK回执，进一步确保消息的可靠性。不过出于性能考虑，为了减少IO次数，发送到MQ的消息并不是逐条持久化到数据库的，而是每隔一段时间批量持久化，一般间隔在100毫秒左右，这就会导致ACK有一定的延迟，因此建议生产者确认全部采用异步方式。 |

**6.2 LazyQueue**

在默认情况下，RabbitMQ会将接收到的信息保存在内存中以降低消息收发的延迟，但在某些特殊情况下，这会导致消息积压，比如：

消费者宕机或出现网络故障

消息发送量激增，超过了消费者处理速度

消费者处理业务发生阻塞

一旦出现消息堆积问题，RabbitMQ的内存占用就会越来越高，直到触发内存预警上限。此时RabbitMQ会将内存消息刷到磁盘上，这个行为称为PageOut。 PageOut会耗费一段时间，并且会阻塞队列进程。因此在这个过程中RabbitMQ不会再处理新的消息，生产者的所有请求都会被阻塞。

为了解决这个问题，从RabbitMQ的3.6.0版本开始，就增加了Lazy Queues的模式，也就是惰性队列，惰性队列的特征如下：

接收到消息后直接存入磁盘而非内存

消费者要消费消息时才会从磁盘中读取并加载到内存（也就是懒加载）

支持数百万条的消息存储

而在3.12版本之后，LazyQueue已经成为所有队列的默认格式，因此官方推荐升级MQ为3.12版本或者所有队列都设置为LazyQueue模式。

简单来说：

**非持久化**：内存放不下再写入到磁盘

**持久化**：发送消息时，直接持久化，内存里有多少，磁盘就同时有多少，发一条写一条导致处理并发能力下降

**LazyQueue**：直接写入磁盘，并且优化了IO，不管消息要不要持久化。读的时候再从磁盘加载，需求大时，会提前缓存磁盘的消息到内存

**6.2.1 控制台配置Lazy模式**

在添加队列的时候，添加x-queue-mod=lazy参数即可设置队列为Lazy模式：

<img src="../assets/SpringCloud笔记/media/image167.png" style="width:5.75in;height:1.63542in" />

|                                                                                                       |
|-------------------------------------------------------------------------------------------------------|
| **注意**：即使是 Lazy Queue，如果消息未标记为持久化，那么这些消息在 RabbitMQ 服务器重启后仍然会丢失。 |

**6.2.2 代码配置Lazy模式**

在利用SpringAMQP声明队列的时候，添加x-queue-mod=lazy参数也可设置队列为Lazy模式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Bean<br />
public Queue lazyQueue(){<br />
return QueueBuilder<br />
.durable("lazy.queue")<br />
.lazy() // 开启Lazy模式<br />
.build();<br />
}</td>
</tr>
</tbody>
</table>

当然，也可以基于注解来声明队列并设置为Lazy模式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//只声明惰性队列<br />
@RabbitListener(queuesToDeclare = @Queue(<br />
name = "lazy.queue",<br />
durable = "true",<br />
arguments = @Argument(name = "x-queue-mode", value = "lazy")<br />
))<br />
public void listenLazyQueue(String msg){<br />
log.info("接收到 lazy.queue的消息：{}", msg);<br />
}<br />
<br />
//同时声明惰性队列和交换机<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(<br />
name = "lazy.queue", //队列名称<br />
durable = "true", //持久化队列<br />
arguments = @Argument(name = "x-queue-mode", value = "lazy") //惰性队列属性<br />
),<br />
exchange = @Exchange(name = "hmall.direct"),<br />
key = "lazy"<br />
))<br />
public void listenLazyQueue(List&lt;Object&gt; msg) {<br />
System.out.println("消费者接收到lazy.queue的消息：【" + msg + "】");<br />
}</td>
</tr>
</tbody>
</table>

**6.2.3 更新已有队列为lazy模式**

对于已经存在的队列，也可以配置为lazy模式，但是要通过设置policy实现。可以基于命令行设置policy：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入mq容器<br />
docker exec -it mq bash<br />
# 设置已有队列为LazyQueue<br />
rabbitmqctl set_policy Lazy "^lazy-queue$" '{"queu e-mode":"lazy"}' --apply-to queues</td>
</tr>
</tbody>
</table>

rabbitmqctl ：RabbitMQ的命令行工具

set_policy ：添加一个策略

Lazy ：策略名称，可以自定义

"^lazy-queue\$" ：用正则表达式匹配队列的名字

'{"queue-mode":"lazy"}' ：设置队列模式为lazy模式

--apply-to queues：策略的作用对象，是所有的队列

当然，也可以在控制台配置policy，进入在控制台的Admin页面，点击Policies，即可添加配置：

<img src="../assets/SpringCloud笔记/media/image168.png" style="width:5.75in;height:2.45833in" />

**7.消费者的可靠性**

当RabbitMQ向消费者投递消息以后，需要知道消费者的处理状态如何，因为消息投递给消费者并不代表就一定被正确消费了，可能出现的故障有很多，比如：

消息投递的过程中出现了网络故障

消费者接收到消息后突然宕机

消费者接收到消息后，因处理不当导致异常

...

一旦发生上述情况，消息也会丢失。因此，RabbitMQ必须知道消费者的处理状态，一旦消息处理失败才能重新投递消息。

**7.1 消费者确认机制**

为了确认消费者是否成功处理消息，RabbitMQ提供了消费者确认机制（**Consumer Acknowledgement**），即当消费者处理消息结束后，应该向RabbitMQ发送一个回执，告知RabbitMQ自己消息处理状态。回执有三种可选值：

ack：成功处理消息，RabbitMQ从队列中删除该消息

nack：消息处理失败，RabbitMQ需要再次投递消息

reject：消息处理失败并拒绝该消息，RabbitMQ从队列中删除该消息

一般reject方式用的较少，除非是消息格式有问题，那就是开发问题了，因此大多数情况下只需要将消息处理的代码通过try catch机制捕获，消息处理成功时返回ack，处理失败时返回nack。

由于消息回执的处理代码比较统一，因此SpringAMQP帮我们实现了消息确认，并允许我们通过配置文件设置ACK处理方式，有三种模式：

**none**：不处理，即消息投递给消费者后立刻ack，消息会立刻从MQ删除。非常不安全，不建议使用

**manual**：手动模式，需要自己在业务代码中调用api，发送ack或reject。存在业务入侵，但更灵活

**auto**：自动模式，SpringAMQP利用AOP对我们的消息处理逻辑做了环绕增强，当业务正常执行时则自动返回ack，当业务出现异常时，根据异常判断返回不同结果：

如果是**业务异常**，自动返回nack

如果是**消息处理或校验异常**，自动返回reject

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>返回Reject的常见异常有：</p>
<p><strong>o.s.amqp…MessageConversionException</strong>：使用 MessageConverter 转换入站消息 payload（消息体）时，可能会抛出此异常</p>
<p><strong>o.s.messaging…MessageConversionException</strong>：如果在映射到 @RabbitListener 方法时，需要转换服务（conversion service）执行额外转换操作，可能会抛出此异常</p>
<p><strong>o.s.messaging…MethodArgumentNotValidException</strong>：如果在监听器中使用了校验机制（例如 @Valid 注解），且校验失败，可能会抛出此异常</p>
<p><strong>o.s.messaging…MethodArgumentTypeMismatchException</strong>：如果入站消息被转换为的类型与目标方法所需类型不匹配，可能会抛出此异常。例如，方法参数声明为 Message&lt;Foo&gt;，但实际接收到的是 Message&lt;Bar&gt;</p>
<p><strong>java.lang.NoSuchMethodException</strong>：在 1.6.3 版本中新增（Added in version 1.6.3）</p>
<p><strong>java.lang.ClassCastException</strong>：在 1.6.3 版本中新增（Added in version 1.6.3）</p></td>
</tr>
</tbody>
</table>

通过下面的配置可以修改消费者SpringAMQP的ACK处理方式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
listener:<br />
simple:<br />
acknowledge-mode: none # none不做处理，auto自动ACK（推荐），manual手动ACK</td>
</tr>
</tbody>
</table>

修改consumer服务的SpringRabbitListener类中的方法，模拟一个消息处理的异常：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(queues = "simple.queue")<br />
public void listenSimpleQueueMessage(String msg) {<br />
log.info("spring 消费者接收到消息：【{}】", msg);<br />
if(true){<br />
throw new MessageConversionException("消息转换异常");<br />
}<br />
log.info("消息处理完成");<br />
}</td>
</tr>
</tbody>
</table>

测试后发现，在none模式下，当消息处理发生异常时，消息依然被RabbitMQ删除了。

把确认机制修改为auto，在异常位置打断点，再次发送消息，程序卡在断点时，可以发现此时消息状态为unacked（未确定状态）：

<img src="../assets/SpringCloud笔记/media/image169.png" style="width:5.75in;height:0.53125in" />

放行以后，由于抛出的是**消息转换异常**，因此Spring会自动返回reject，所以消息依然会被删除：

<img src="../assets/SpringCloud笔记/media/image170.png" style="width:5.75in;height:0.53125in" />

将异常改为RuntimeException类型：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(queues = "simple.queue")<br />
public void listenSimpleQueueMessage(String msg) {<br />
log.info("spring 消费者接收到消息：【{}】", msg);<br />
if(true){<br />
throw new RuntimeException("业务运行异常");<br />
}<br />
log.info("消息处理完成");<br />
}</td>
</tr>
</tbody>
</table>

在异常位置打断点，然后再次发送消息测试，程序卡在断点时，可以发现此时消息状态为unacked（未确定状态）：

<img src="../assets/SpringCloud笔记/media/image169.png" style="width:5.75in;height:0.53125in" />

放行以后，由于抛出的是业务异常，所以Spring返回nack，最终消息恢复至Ready状态，并且没有被RabbitMQ删除：

<img src="../assets/SpringCloud笔记/media/image171.png" style="width:5.75in;height:0.60417in" />

当把配置改为auto时，消息处理失败后，会回到RabbitMQ，并重新投递到消费者。

**7.2 失败重试机制**

当消费者出现异常后，消息会不断requeue（重入队）到队列，再重新发送给消费者。如果消费者再次执行依然出错，消息会再次requeue到队列，再次投递，直到消息处理成功为止，极端情况就是消费者一直无法执行成功，那么消息requeue就会无限循环，导致mq的消息处理飙升，带来不必要的压力：

<img src="../assets/SpringCloud笔记/media/image172.png" style="width:5.75in;height:0.54167in" />

为了应对上述情况Spring又提供了消费者失败重试机制，在消费者出现异常时利用本地重试，而不是无限制的requeue到mq队列。

修改consumer服务的application.yml文件，添加内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
listener:<br />
simple:<br />
retry:<br />
enabled: true # 开启消费者失败重试<br />
initial-interval: 1000ms # 初始的失败等待时长为1秒<br />
multiplier: 1 # 失败的等待时长倍数，下次等待时间 = 本次等待时间 * 下次等待时长倍数<br />
max-attempts: 3 # 最大重试次数<br />
stateless: true # true无状态；false有状态。如果业务中包含事务，这里改为false</td>
</tr>
</tbody>
</table>

重启consumer服务，重复之前的测试，可以发现：

消费者在失败后消息没有重新回到MQ无限重新投递，而是在本地重试了3次

本地重试3次以后，抛出了AmqpRejectAndDontRequeueException异常。查看RabbitMQ控制台，发现消息被删除了，说明最后SpringAMQP返回的是reject

结论：

开启本地重试时，消息处理过程中抛出异常，不会requeue到队列，而是在消费者本地重试

重试达到最大次数后，Spring会返回**reject**，消息会被丢弃

**7.3 失败处理策略**

在之前的测试中，本地测试达到最大重试次数后，消息会被丢弃，这在某些对于消息可靠性要求较高的业务场景下，显然不太合适了。

因此Spring允许我们自定义重试次数耗尽后的消息处理策略，这个策略是由MessageRecovery接口来定义的，它有3个不同实现：

RejectAndDontRequeueRecoverer：重试耗尽后，直接reject，丢弃消息，默认就是这种方式

ImmediateRequeueMessageRecoverer：重试耗尽后，返回nack，消息重新入队

RepublishMessageRecoverer：重试耗尽后，将失败消息投递到指定的交换机

比较优雅的一种处理方案是RepublishMessageRecoverer，失败后将消息投递到一个指定的，专门存放异常消息的队列，后续由人工集中处理。

1）在consumer服务中定义处理失败消息的交换机和队列

2）定义一个RepublishMessageRecoverer，关联队列和交换机

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.consumer.config;<br />
<br />
import org.springframework.amqp.core.Binding;<br />
import org.springframework.amqp.core.BindingBuilder;<br />
<br />
import org.springframework.amqp.core.DirectExchange;<br />
import org.springframework.amqp.core.Queue;<br />
import org.springframework.amqp.rabbit.core.RabbitTemplate;<br />
import org.springframework.amqp.rabbit.retry.MessageRecoverer;<br />
import org.springframework.amqp.rabbit.retry.RepublishMessageRecoverer;<br />
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.context.annotation.Configuration;<br />
<br />
@Configuration<br />
//只有当指定的配置项满足条件时，当前配置类(ErrorMessageConfig)中的所有Bean才会被Spring容器创建<br />
//这里的条件就是配置文件配置了spring.rabbitmq.listener.simple.retry.enabled=true<br />
@ConditionalOnProperty(name = "spring.rabbitmq.listener.simple.retry.enabled", havingValue = "true")<br />
public class ErrorMessageConfig {<br />
@Bean<br />
public DirectExchange errorMessageExchange(){<br />
return new DirectExchange("error.direct");<br />
}<br />
@Bean<br />
public Queue errorQueue(){<br />
return new Queue("error.queue", true);<br />
}<br />
@Bean<br />
public Binding errorBinding(Queue errorQueue, DirectExchange errorMessageExchange){<br />
return BindingBuilder.bind(errorQueue).to(errorMessageExchange).with("error");<br />
}<br />
//MessageRecoverer：当消息消费重试达到最大次数后仍然失败时，定义这些"死信消息"的最终处理策略<br />
@Bean<br />
public MessageRecoverer republishMessageRecoverer(RabbitTemplate rabbitTemplate){<br />
return new RepublishMessageRecoverer(rabbitTemplate, "error.direct", "error");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**7.4 业务幂等性**

**幂等**是一个数学概念，用函数表达式来描述是这样的：f(x) = f(f(x))，例如求绝对值函数。

在程序开发中，则是指同一个业务，**执行一次或多次对业务状态的影响是一致的**，例如：

根据id删除数据

查询数据

新增数据

但数据的更新往往不是幂等的，如果重复执行可能造成不一样的后果，比如：

取消订单，恢复库存的业务，如果多次恢复就会出现库存重复增加的情况

退款业务，重复退款对商家而言会有经济损失。

所以，我们要尽可能避免业务被重复执行。

然而在实际业务场景中，由于意外经常会出现业务被重复执行的情况，例如：

页面卡顿时频繁刷新导致表单重复提交

服务间调用的重试

MQ消息的重复投递

我们在用户支付成功后会发送MQ消息到交易服务，修改订单状态为已支付，就可能出现消息重复投递的情况，如果消费者不做判断，很有可能导致消息被消费多次，出现业务故障，例如：

假如用户刚刚支付完成，并且投递消息到交易服务，交易服务更改订单为**已支付**状态

由于某种原因，例如网络故障导致生产者没有得到确认，隔了一段时间后**重新投递**给交易服务

但是，在新投递的消息被消费之前，用户选择了退款，将订单状态改为了**已退款**状态

退款完成后，新投递的消息才被消费，那么订单状态会被再次改为**已支付**，业务异常

所以必须想办法保证消息处理的幂等性，这里给出两种方案：

唯一消息ID

业务状态判断

**7.4.1 唯一消息ID**

这个思路非常简单：

每一条消息都生成一个唯一的id，与消息一起投递给消费者

消费者接收到消息后处理自己的业务，业务处理成功后将消息ID保存到数据库

如果下次又收到相同消息，去数据库查询判断是否存在，存在则为重复消息放弃处理

SpringAMQP的MessageConverter自带了MessageID的功能，只要开启这个功能即可，以Jackson的消息转换器为例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Bean<br />
public MessageConverter messageConverter(){<br />
// 1.定义消息转换器<br />
Jackson2JsonMessageConverter jackson2JsonMessageConverter = new Jackson2JsonMessageConverter();<br />
// 2.配置自动创建消息id，用于识别不同消息，也可以在业务中基于ID判断是否是重复消息<br />
jackson2JsonMessageConverter.setCreateMessageIds(true);<br />
return jackson2JsonMessageConverter;<br />
}</td>
</tr>
</tbody>
</table>

之前配置消息转换器时其实已经设置了消息ID功能，所以发送一条消息，可以在控制台看到消息ID：

<img src="../assets/SpringCloud笔记/media/image173.png" style="width:5.75in;height:2.4375in" />

要在代码中获取消息ID，需要把参数从原来的对象类型（这里是String）修改为Message类型：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//接收消息ID<br />
@RabbitListener(queues = "simple.queue")<br />
public void listenSimpleQueueMessage(Message message) {<br />
log.info("spring 消费者接收到消息：ID：【{}】", message.getMessageProperties().getMessageId());<br />
log.info("spring 消费者接收到消息：【{}】", new String(message.getBody()));<br />
}</td>
</tr>
</tbody>
</table>

业务执行完没有异常后就可以存到数据库或Redis中，每次执行前判断ID是否存在，不存在才执行业务。

**7.4.2 业务判断**

业务判断就是基于业务本身的逻辑或状态来判断是否是重复的请求或消息，不同的业务场景判断的思路也不一样。例如当前案例中，处理消息的业务逻辑是把订单状态从未支付修改为已支付，因此可以在执行业务时判断订单状态是否是未支付，如果不是则证明订单已经被处理过，无需重复处理。

相比较而言，消息ID的方案需要改造原有的数据库，所以更推荐使用业务判断的方案，但有些场景下可能业务判断就无法保证业务幂等性，这时就只能使用唯一消息ID。

以支付修改订单的业务为例，需要修改OrderServiceImpl中的markOrderPaySuccess方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public void markOrderPaySuccess(Long orderId) {<br />
//业务幂等性判断：只有订单状态为1(未支付)时才修改订单状态为2<br />
Order oldOrder = getById(orderId);<br />
if(oldOrder == null || oldOrder.getStatus() != 1){<br />
return;<br />
}<br />
//修改订单状态为已支付<br />
Order order = new Order();<br />
order.setId(orderId);<br />
order.setStatus(2);<br />
order.setPayTime(LocalDateTime.now());<br />
updateById(order);<br />
}</td>
</tr>
</tbody>
</table>

由于判断和更新是两步动作，因此在极小概率下可能存在线程安全问题，可以合并上述操作为这样：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public void markOrderPaySuccess(Long orderId) {<br />
// 本质是这条SQL：UPDATE `order` SET status = ? , pay_time = ? WHERE id = ? AND status = 1<br />
lambdaUpdate()<br />
.set(Order::getStatus, 2)<br />
.set(Order::getPayTime, LocalDateTime.now())<br />
.eq(Order::getId, orderId)<br />
.eq(Order::getStatus, 1)<br />
.update();<br />
}</td>
</tr>
</tbody>
</table>

**7.5 兜底方案**

虽然利用各种机制尽可能增加了消息的可靠性，但也不能保证消息100%可靠。兜底方案能够确保订单的支付状态一致，其思想很简单：既然MQ通知不一定发送到交易服务，那么交易服务就必须自己**主动去查询**支付状态，这样即便支付服务的MQ通知失败，依然能通过主动查询来保证订单状态的一致：

<img src="../assets/SpringCloud笔记/media/image174.png" style="width:5.75in;height:2.67708in" />

图中黄色线圈起来的部分就是MQ通知失败后的兜底处理方案，由交易服务自己主动去查询支付状态。

不过需要注意的是，交易服务并不知道用户会在什么时候支付，如果查询的时机不正确（比如查询的时候用户正在支付中），可能查询到的支付状态也不正确。

那么问题来了，我们到底该在什么时间主动查询支付状态呢？

这个时间是无法确定的，因此，通常我们采取的措施就是利用**定时任务**定期查询，例如每隔20秒就查询一次，并判断支付状态，如果发现订单已经支付，则立刻更新订单状态为已支付即可。

定时任务具体的实现这里不再赘述。

综上，支付服务与交易服务之间的订单状态一致性是如何保证的？

首先，支付服务会正在用户支付成功以后利用MQ消息通知交易服务，完成订单状态同步

其次，为了保证MQ消息的可靠性，我们采用了生产者确认机制、消费者确认、消费者失败重试等策略，确保消息投递的可靠性

最后，我们还在交易服务设置了定时任务，定期查询订单支付状态。这样即便MQ通知失败，还可以利用定时任务作为兜底方案，确保订单支付状态的最终一致性

**8.延迟消息**

在目前的用户下单业务中，如下用户下单后一直不支付，那购物车中的商品对应库存资源就会一直被占用，导致其他用户无法正常交易（库存不足），常见做法是用户下单后设置支付时间限制，一段时间（例如30分钟）后如果用户还未支付，就会立即取消订单并释放库存。

像这种在一段时间以后才执行的任务，称之为**延迟任务**，而要实现延迟任务，最简单的方案就是利用MQ的延迟消息。在RabbitMQ中实现延迟消息也有两种方案：

死信交换机+TTL

延迟消息插件

**8.1 死信交换机**

**8.1.1 认识死信和死信交换机**

当一个队列中的消息满足下列情况之一时，可以成为**死信**：

消费者使用basic.reject或 basic.nack声明消费失败，并且消息的requeue参数设置为false（默认为true，所以nack会不断重试）

消息是一个过期消息（达到了队列或消息本身设置的过期时间），超时无人消费

要投递的队列消息满了，无法投递

<img src="../assets/SpringCloud笔记/media/image175.png" style="width:5.75in;height:1.25in" />

如果一个队列中的消息已经成为死信，并且这个队列通过**dead-letter-exchange属性指定了一个交换机，那么队列中的死信就会投递到这个交换机中，而这个交换机就称为死信交换机**。此时若有队列与死信交换机绑定，则死信最终就会被投递到这个队列中。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意</strong>：</p>
<p>RabbitMQ的消息过期是基于追溯方式来实现的，也就是说当一个消息的TTL到期以后不一定会被移除或投递到死信交换机，而是在消息恰好处于队首时才会被处理</p>
<p>当队列中消息堆积很多的时候，过期消息可能不会被按时处理，因此你设置的TTL时间不一定准确</p></td>
</tr>
</tbody>
</table>

死信交换机的作用：

收集那些因处理失败而被拒绝的消息

收集那些因队列满了而被拒绝的消息

收集因TTL（有效期）到期的消息

**8.1.2 代码实现**

在consumer中设置NormalConfig类，声明队列 normal.queue 和死信交换机 dlx.direct：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.consumer.config;<br />
<br />
import org.springframework.amqp.core.*;<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.context.annotation.Configuration;<br />
<br />
@Configuration<br />
public class NormalConfig {<br />
//定义死信交换机<br />
@Bean<br />
public DirectExchange normalExchange(){<br />
return new DirectExchange("normal.direct");<br />
}<br />
//定义队列，并为其绑定死信交换机<br />
@Bean<br />
public Queue normalQueue(){<br />
return QueueBuilder<br />
.durable("normal.queue") //定义队列<br />
.deadLetterExchange("dlx.direct") //为队列绑定死信交换机，只有消息成为死信时才走死信交换机<br />
.build();<br />
}<br />
//绑定队列和死信交换机的路由规则<br />
@Bean<br />
public Binding normalExchangeBinding(Queue normalQueue, DirectExchange normalExchange){<br />
return BindingBuilder.bind(normalQueue).to(normalExchange).with("hi");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

在consumer的SpringRabbitListener中设置 dlx.queue 的消费者：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "dlx.queue"),<br />
exchange = @Exchange(name = "dlx.direct"),<br />
key = "hi"<br />
))<br />
public void listenDlxQueue(List&lt;Object&gt; msg) {<br />
System.out.println("消费者接收到dlx.queue的消息：【" + msg + "】");<br />
}</td>
</tr>
</tbody>
</table>

启动consumer服务，得到两个队列和死信交换机：

<img src="../assets/SpringCloud笔记/media/image176.png" style="width:5.75in;height:1.0625in" />

在publisher编写发送定时消息的方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
public void testSendDelayMessage() {<br />
rabbitTemplate.convertAndSend("normal.direct", "hi", List.of(1, 2, 3), new MessagePostProcessor() {<br />
@Override<br />
public Message postProcessMessage(Message message) throws AmqpException {<br />
//设置消息过期时间，单位：ms<br />
message.getMessageProperties().setExpiration("10000");<br />
return message;<br />
}<br />
});<br />
}</td>
</tr>
</tbody>
</table>

发送消息，由于normal.queue没有绑定消费者，所以可以看到一开始消息在 normal.queue 中，超时后被转发到 dlx.queue：

<img src="../assets/SpringCloud笔记/media/image177.png" style="width:5.75in;height:1.79167in" />

**8.2 延迟交换机**

**8.2.1 认识延迟消息和延迟交换机**

**延迟消息**指生产者发送的消息不会立即被消费者获取，而是在经过指定的延迟时间后才能被消费的消息。这是一种基于时间调度的消息传递机制。

**延迟交换机**是RabbitMQ中实现延迟消息的核心组件，它本身不直接存储延迟消息，而是通过插件（如rabbitmq_delayed_message_exchange）实现的特殊交换机类型。当消息到达时，它会根据消息头中指定的延迟时间将消息暂存在内存中，待延迟期满后再路由到目标队列。

<img src="../assets/SpringCloud笔记/media/image178.png" style="width:5.75in;height:0.95833in" />

例如用户下单后，系统发送一条30分钟后处理的消息到延迟交换机，消息在RabbitMQ内部暂存30分钟后，自动进入处理队列，交易服务判断用户是否已经支付，再决定是更新订单状态还是取消订单。

**8.2.2 基于死信交换机实现延迟消息**

如图，有一组绑定的交换机（ttl.fanout）和队列（ttl.queue），但是ttl.queue没有消费者监听，而是设定了死信交换机hmall.direct，而队列direct.queue1则与死信交换机绑定，RoutingKey是blue：

<img src="../assets/SpringCloud笔记/media/image179.png" style="width:5.75in;height:1.72917in" />

假如现在发送一条消息到ttl.fanout，RoutingKey为blue，并设置消息的**有效期**为5000毫秒：

<img src="../assets/SpringCloud笔记/media/image180.png" style="width:5.75in;height:1.5in" />

消息被投递到ttl.queue之后，由于没有消费者，因此消息无人消费，5秒之后，消息的有效期到期，成为**死信**，死信被再次投递到死信交换机hmall.direct，并**沿用之前的RoutingKey**，也就是blue，由于direct.queue1与hmall.direct绑定的key是blue，因此最终消息被成功路由到direct.queue1，如果此时有消费者与direct.queue1绑定， 也就能成功消费消息了，但此时已经是5秒钟以后了。也就是说，publisher发送的消息需要经过5秒钟才能到达队列direct.queue并投递给消费者，从而模拟了**延迟消息**。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意：</strong></p>
<p>RabbitMQ的消息过期是基于追溯方式来实现的，也就是说当一个消息的TTL到期以后不一定会被移除或投递到死信交换机，而是在消息恰好处于队首时才会被处理</p>
<p>当队列中消息堆积很多的时候，过期消息可能不会被按时处理，因此你设置的TTL时间不一定准确</p></td>
</tr>
</tbody>
</table>

**8.2.3 DelayExchange插件**

通过死信交换机实现延迟消息比较麻烦，延迟交换机就可以很轻松实现延迟消息，前面说过，延迟交换机需要依赖于插件，所以需要先安装DelayExchange插件。

官方文档：

**\[该类型的内容暂不支持下载\]**

DelayExchange插件下载地址：

**\[该类型的内容暂不支持下载\]**

前面安装的MQ是3.8版本，所以插件选择3.8.17版本，资料中已提供：rabbitmq_delayed_message_exchange-3.8.17.8f537ac.ez

**\[rabbitmq_delayed_message_exchange-3.8.17.8f537ac.ez\]**

先查看RabbitMQ的插件目录对应的数据卷：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
[root@localhost ~]# docker volume inspect mq-plugins<br />
[<br />
{<br />
"CreatedAt": "2025-11-27T06:35:12-08:00",<br />
"Driver": "local",<br />
"Labels": null,<br />
"Mountpoint": "/var/lib/docker/volumes/mq-plugins/_data",<br />
"Name": "mq-plugins",<br />
"Options": null,<br />
"Scope": "local"<br />
}<br />
]</td>
</tr>
</tbody>
</table>

可以看到插件目录被挂载到了/var/lib/docker/volumes/mq-plugins/\_data，将资料提供的插件上传到该目录下后，执行以下命令安装插件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
docker exec -it mq rabbitmq-plugins enable rabbitmq_delayed_message_exchange</td>
</tr>
</tbody>
</table>

执行结果出现enable就表示安装成功，安装成功后在控制台就可以看到交换机多了一种x-delayed-message类型：

<img src="../assets/SpringCloud笔记/media/image181.png" style="width:5.75in;height:1.61458in" />

**8.2.4 声明延迟交换机**

基于注解方式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = "delay.queue", durable = "true"),<br />
exchange = @Exchange(name = "delay.direct", delayed = "true"), //delayed参数指定延迟交换机<br />
key = "delay"<br />
))<br />
public void listenDelayMessage(String msg) {<br />
log.info("接收到delay.queue的延迟消息：{}", msg);<br />
}</td>
</tr>
</tbody>
</table>

基于@Bean的方式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.consumer.config;<br />
<br />
import lombok.extern.slf4j.Slf4j;<br />
import org.springframework.amqp.core.*;<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.context.annotation.Configuration;<br />
<br />
@Slf4j<br />
@Configuration<br />
public class DelayExchangeConfig {<br />
@Bean<br />
public DirectExchange delayExchange() {<br />
return ExchangeBuilder<br />
.directExchange("delay.direct") // 指定交换机类型和名称<br />
.delayed() // 设置delay的属性为true<br />
.durable(true) // 持久化<br />
.build();<br />
}<br />
@Bean<br />
public Queue delayedQueue() {<br />
return new Queue("delay.queue");<br />
}<br />
@Bean<br />
public Binding delayQueueBinding() {<br />
return BindingBuilder.bind(delayedQueue()).to(delayExchange()).with("delay");<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**8.2.5 发送延迟消息**

发送消息时，必须通过x-delay属性设定延迟时间：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testPublisherDelayMessage() {<br />
// 1.创建消息<br />
String message = "hello, delayed message";<br />
// 2.发送消息，利用消息后置处理器添加消息头<br />
rabbitTemplate.convertAndSend("delay.direct", "delay", message, new MessagePostProcessor() {<br />
@Override<br />
public Message postProcessMessage(Message message) throws AmqpException {<br />
// 添加延迟消息属性，单位ms<br />
message.getMessageProperties().setDelay(5000);<br />
return message;<br />
}<br />
});<br />
}</td>
</tr>
</tbody>
</table>

|                                                                                                                                                                                                                                           |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **注意：延迟消息插件内部会维护一个本地数据库表，同时使用Elang Timers功能实现计时，如果消息的延迟时间设置较长，可能会导致堆积的延迟消息非常多，会带来较大的CPU开销，同时延迟消息的时间会存在误差，因此不建议设置延迟时间过长的延迟消息**。 |

**8.3 超时订单问题**

接下来就在交易服务中利用延迟消息实现订单超时取消功能，大概思路如下：

<img src="../assets/SpringCloud笔记/media/image182.png" style="width:5.75in;height:2.36458in" />

假如订单超时支付时间为30分钟，理论上应该在下单时发送一条延迟消息，延迟时间为30分钟，在接收到消息时检验订单支付状态，关闭未支付订单。

**8.3.1 定义常量**

无论是消息发送还是接收都是在交易服务完成，在trade-service中定义一个常量类，用于记录交换机、队列、RoutingKey等常量：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.trade.constants;<br />
<br />
public interface MQConstants {<br />
String DELAY_EXCHANGE_NAME = "trade.delay.direct";<br />
String DELAY_ORDER_QUEUE_NAME = "trade.delay.order.queue";<br />
String DELAY_ORDER_KEY = "delay.order.query";<br />
}</td>
</tr>
</tbody>
</table>

**8.3.2 配置MQ**

在trade-service模块的pom.xml中引入amqp的依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--amqp--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-amqp&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

在trade-service的application.yaml中添加MQ的配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
rabbitmq:<br />
host: 192.168.150.101 # 虚拟主机IP<br />
port: 5672 # 端口号<br />
virtual-host: /hmall # 虚拟主机<br />
username: hmall # 用户名<br />
password: 123 # 密码</td>
</tr>
</tbody>
</table>

**8.3.3 改造下单业务，发送延迟消息**

改造下单业务，在下单完成后，发送延迟消息，查询支付状态。

修改trade-service模块的com.hmall.trade.service.impl.OrderServiceImpl类的createOrder方法，添加消息发送的代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private final RabbitTemplate rabbitTemplate;<br />
<br />
@Override<br />
@GlobalTransactional<br />
public Long createOrder(OrderFormDTO orderFormDTO) {<br />
...<br />
// 4.扣减库存<br />
...<br />
// 5.发送延迟消息，检测订单支付状态<br />
rabbitTemplate.convertAndSend(<br />
MQConstants.DELAY_EXCHANGE_NAME,<br />
MQConstants.DELAY_ORDER_KEY,<br />
order.getId(),<br />
message -&gt; {<br />
message.getMessageProperties().setDelay(10000);<br />
return message;<br />
}<br />
);<br />
return order.getId();<br />
}</td>
</tr>
</tbody>
</table>

这里延迟消息的时间应该是15分钟，不过为了测试方便，改成10秒。

**8.3.4 编写查询支付状态接口**

由于MQ消息处理时需要查询支付状态，因此要在pay-service模块定义一个这样的接口，并提供对应的FeignClient。

首先，在hm-api模块定义三个类：

1）PayOrderDTO：支付单的数据传输实体

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.dto;<br />
<br />
import io.swagger.annotations.ApiModel;<br />
import io.swagger.annotations.ApiModelProperty;<br />
import lombok.Data;<br />
<br />
import java.time.LocalDateTime;<br />
<br />
/**<br />
* &lt;p&gt;<br />
* 支付订单<br />
* &lt;/p&gt;<br />
*/<br />
@Data<br />
@ApiModel(description = "支付单数据传输实体")<br />
public class PayOrderDTO {<br />
@ApiModelProperty("id")<br />
private Long id;<br />
@ApiModelProperty("业务订单号")<br />
private Long bizOrderNo;<br />
@ApiModelProperty("支付单号")<br />
private Long payOrderNo;<br />
@ApiModelProperty("支付用户id")<br />
private Long bizUserId;<br />
@ApiModelProperty("支付渠道编码")<br />
private String payChannelCode;<br />
@ApiModelProperty("支付金额，单位分")<br />
private Integer amount;<br />
@ApiModelProperty("付类型，1：h5,2:小程序，3：公众号，4：扫码，5：余额支付")<br />
private Integer payType;<br />
@ApiModelProperty("付状态，0：待提交，1:待支付，2：支付超时或取消，3：支付成功")<br />
private Integer status;<br />
@ApiModelProperty("拓展字段，用于传递不同渠道单独处理的字段")<br />
private String expandJson;<br />
@ApiModelProperty("第三方返回业务码")<br />
private String resultCode;<br />
@ApiModelProperty("第三方返回提示信息")<br />
private String resultMsg;<br />
@ApiModelProperty("支付成功时间")<br />
private LocalDateTime paySuccessTime;<br />
@ApiModelProperty("支付超时时间")<br />
private LocalDateTime payOverTime;<br />
@ApiModelProperty("支付二维码链接")<br />
private String qrCodeUrl;<br />
@ApiModelProperty("创建时间")<br />
private LocalDateTime createTime;<br />
@ApiModelProperty("更新时间")<br />
private LocalDateTime updateTime;<br />
}</td>
</tr>
</tbody>
</table>

2）PayClient：支付系统的Feign客户端

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.client;<br />
<br />
import com.hmall.api.client.fallback.PayClientFallback;<br />
import com.hmall.api.dto.PayOrderDTO;<br />
import org.springframework.cloud.openfeign.FeignClient;<br />
import org.springframework.web.bind.annotation.GetMapping;<br />
import org.springframework.web.bind.annotation.PathVariable;<br />
<br />
@FeignClient(value = "pay-service", fallbackFactory = PayClientFallback.class)<br />
public interface PayClient {<br />
/**<br />
* 根据交易订单id查询支付单<br />
* @param id 业务订单id<br />
* @return 支付单信息<br />
*/<br />
@GetMapping("/pay-orders/biz/{id}")<br />
PayOrderDTO queryPayOrderByBizOrderNo(@PathVariable("id") Long id);<br />
}</td>
</tr>
</tbody>
</table>

3）PayClientFallback：支付系统的fallback逻辑

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.api.client.fallback;<br />
<br />
import com.hmall.api.client.PayClient;<br />
import com.hmall.api.dto.PayOrderDTO;<br />
import lombok.extern.slf4j.Slf4j;<br />
import org.springframework.cloud.openfeign.FallbackFactory;<br />
<br />
@Slf4j<br />
public class PayClientFallback implements FallbackFactory&lt;PayClient&gt; {<br />
@Override<br />
public PayClient create(Throwable cause) {<br />
return new PayClient() {<br />
@Override<br />
public PayOrderDTO queryPayOrderByBizOrderNo(Long id) {<br />
return null;<br />
}<br />
};<br />
}<br />
}</td>
</tr>
</tbody>
</table>

最后，在pay-service模块的PayController中实现该接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@ApiOperation("根据id查询支付单")<br />
@GetMapping("/biz/{id}")<br />
public PayOrderDTO queryPayOrderByBizOrderNo(@PathVariable("id") Long id) {<br />
PayOrder payOrder = payOrderService.lambdaQuery().eq(PayOrder::getBizOrderNo, id).one();<br />
return BeanUtils.copyBean(payOrder, PayOrderDTO.class);<br />
}</td>
</tr>
</tbody>
</table>

**8.3.5 监听消息，查询支付状态**

接下来，在trader-service编写一个监听器，监听延迟消息，查询订单支付状态：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.trade.listener;<br />
<br />
import com.hmall.api.client.PayClient;<br />
import com.hmall.api.dto.PayOrderDTO;<br />
import com.hmall.trade.constants.MQConstants;<br />
import com.hmall.trade.domain.po.Order;<br />
import com.hmall.trade.service.IOrderService;<br />
import lombok.RequiredArgsConstructor;<br />
import org.springframework.amqp.rabbit.annotation.Exchange;<br />
import org.springframework.amqp.rabbit.annotation.Queue;<br />
import org.springframework.amqp.rabbit.annotation.QueueBinding;<br />
import org.springframework.amqp.rabbit.annotation.RabbitListener;<br />
import org.springframework.stereotype.Component;<br />
<br />
@Component<br />
@RequiredArgsConstructor<br />
public class OrderDelayMessageListener {<br />
<br />
private final IOrderService orderService;<br />
private final PayClient payClient;<br />
<br />
@RabbitListener(bindings = @QueueBinding(<br />
value = @Queue(name = MQConstants.DELAY_ORDER_QUEUE_NAME),<br />
exchange = @Exchange(name = MQConstants.DELAY_EXCHANGE_NAME, delayed = "true"),<br />
key = MQConstants.DELAY_ORDER_KEY<br />
))<br />
public void listenOrderDelayMessage(Long orderId) {<br />
// 1.查询订单<br />
Order order = orderService.getById(orderId);<br />
// 2.检测订单状态，判断是否已支付<br />
if (order == null || order.getStatus() != 1) {<br />
// 订单不存在或者已经支付<br />
return;<br />
}<br />
// 3.未支付，需要查询支付流水状态<br />
PayOrderDTO payOrder = payClient.queryPayOrderByBizOrderNo(orderId);<br />
// 4.判断是否支付<br />
if (payOrder != null &amp;&amp; payOrder.getStatus() == 3) {<br />
// 4.1.已支付，标记订单状态为已支付<br />
orderService.markOrderPaySuccess(orderId);<br />
} else {<br />
// TODO 4.2.未支付，取消订单，恢复库存<br />
orderService.cancelOrder(orderId);<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**8.3.6 实现取消订单**

在OrderServiceImpl中实现cancelOrder方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
@Transactional<br />
public void cancelOrder(Long orderId) {<br />
//1.取消订单<br />
// 构建更新条件<br />
Order order = new Order();<br />
order.setId(orderId);<br />
order.setStatus(5);<br />
order.setCloseTime(LocalDateTime.now());<br />
updateById(order);<br />
//2. 恢复库存<br />
recoverStock(orderId);<br />
}<br />
<br />
private void recoverStock(Long orderId) {<br />
// 2.1 查询订单详情<br />
List&lt;OrderDetail&gt; orderDetails = detailService.listByOrderId(orderId);<br />
if (orderDetails == null || orderDetails.isEmpty()) {<br />
throw new BadRequestException("订单详情不存在！");<br />
}<br />
// 2.2 构造恢复库存的参数列表<br />
List&lt;OrderDetailDTO&gt; recoverItems = orderDetails.stream()<br />
.map(detail -&gt; {<br />
OrderDetailDTO recoverItem = new OrderDetailDTO();<br />
recoverItem.setItemId(detail.getItemId());<br />
recoverItem.setNum(-detail.getNum()); //TODO:注意 数量取反，表示恢复库存<br />
return recoverItem;<br />
})<br />
.collect(Collectors.toList());<br />
// 2.3 调用 deductStock 方法恢复库存<br />
try {<br />
itemClient.deductStock(recoverItems);<br />
} catch (Exception e) {<br />
throw new RuntimeException("恢复库存失败！", e);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

在OrderDetailServiceImpl中实现listByOrderId方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
<br />
@Override<br />
public List&lt;OrderDetail&gt; listByOrderId(Long orderId) {<br />
// 构建Lambda查询条件：根据order_id字段匹配<br />
LambdaQueryWrapper&lt;OrderDetail&gt; queryWrapper = new LambdaQueryWrapper&lt;OrderDetail&gt;()<br />
.eq(OrderDetail::getOrderId, orderId);<br />
// 调用MyBatis-Plus的list方法查询<br />
return this.list(queryWrapper);<br />
}</td>
</tr>
</tbody>
</table>

**十二、Elasticsearch**

**1.初识elasticsearch**

Elasticsearch的官方网站：

**\[该类型的内容暂不支持下载\]**

**1.1 认识和安装**

Elasticsearch是由elastic公司开发的一套搜索引擎技术，它是elastic技术栈中的一部分。完整的技术栈包括：

Elasticsearch：用于数据存储、计算和搜索

Logstash/Beats：用于数据收集

Kibana：用于数据可视化

整套技术栈被称为ELK，经常用来做日志收集、系统监控和状态分析等等，其核心就是用来**存储**、**搜索**、**计算**的Elasticsearch。

这里要安装2部分：

elasticsearch：存储、搜索和运算

kibana：图形化展示

Elasticsearch提供核心的数据存储、搜索、分析功能，Elasticsearch对外提供的是Restful风格的API，任何操作都可以通过发送http请求来完成，不过http请求的方式、路径、还有请求参数的格式都有严格的规范，这些规范我们要借助于Kibana服务。

Kibana是elastic公司提供的用于操作Elasticsearch的可视化控制台，它的功能包括：

对Elasticsearch数据的搜索、展示

对Elasticsearch数据的统计、聚合，并形成图形化报表、图形

对Elasticsearch的集群状态监控

它还提供了一个开发控制台（DevTools），在其中对Elasticsearch的Restful的API接口提供了**语法提示**

**1.1.1 安装elasticsearch**

将资料中的es.tar上传到Linux虚拟机中，通过如下命令加载elasticsearch的镜像（可跳过）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker load -i es.tar</td>
</tr>
</tbody>
</table>

通过下面的Docker命令即可安装单机版本的elasticsearch：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run -d \<br />
--name es \<br />
-e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \<br />
-e "discovery.type=single-node" \<br />
-v es-data:/usr/share/elasticsearch/data \<br />
-v es-plugins:/usr/share/elasticsearch/plugins \<br />
--privileged \<br />
--network hm-net \<br />
-p 9200:9200 \<br />
-p 9300:9300 \<br />
elasticsearch:7.12.1</td>
</tr>
</tbody>
</table>

安装完成后，访问9200端口，即可看到响应的Elasticsearch服务的基本信息：

<img src="../assets/SpringCloud笔记/media/image183.png" style="width:5.75in;height:1.65625in" />

**1.1.2 安装Kibana**

将资料中的kibana.tar上传到Linux虚拟机中，通过如下命令加载Kibana的镜像（可跳过）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker load -i kibana.tar</td>
</tr>
</tbody>
</table>

通过下面的Docker命令，即可部署Kibana：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run -d \<br />
--name kibana \<br />
-e ELASTICSEARCH_HOSTS=http://es:9200 \<br />
--network=hm-net \<br />
-p 5601:5601 \<br />
kibana:7.12.1</td>
</tr>
</tbody>
</table>

安装完成后，直接访问5601端口，选择Explore on my own后即可看到控制台页面：

<img src="../assets/SpringCloud笔记/media/image184.png" style="width:5.75in;height:2.71875in" />

然后选中Dev tools，进入开发工具页面：

<img src="../assets/SpringCloud笔记/media/image185.png" style="width:5.75in;height:1.8125in" />

**1.2 倒排索引**

**倒排**索引的概念是基于MySQL这样的**正向**索引而言的，他是elasticsearch高性能搜索的关键。

**1.2.1 正向索引**

例如tb_goods表：

|     |                |       |
|-----|----------------|-------|
| id  | title          | price |
| 1   | 小米手机       | 3499  |
| 2   | 华为手机       | 4999  |
| 3   | 华为小米充电器 | 49    |
| 4   | 小米手环       | 49    |
| ... | ...            | ...   |

其中的id字段已经创建了索引，由于索引底层采用了B+树结构，因此根据id搜索的速度会非常快。但是其他字段例如title，只在叶子节点上存在，因此要根据title搜索的时候只能遍历树中的每一个叶子节点，判断title数据是否符合要求。

对于SQL语句：select \* from tb_goods where title like '%手机%';，其流程如下：

<img src="../assets/SpringCloud笔记/media/image186.png" style="width:5.75in;height:2.11458in" />

检查到搜索条件为like '%手机%'，需要找到title中包含手机的数据

逐条遍历每行数据（每个叶子节点），比如第1次拿到id为1的数据

判断数据中的title字段值是否符合条件

如果符合则放入结果集，不符合则丢弃

回到步骤1

综上，根据id精确匹配时，可以走索引，查询效率较高，而当搜索条件为模糊匹配时，由于索引无法生效，导致从索引查询退化为全表扫描，效率很差。因此，正向索引适合于根据索引字段的精确搜索，不适合基于部分词条的模糊匹配。

而倒排索引恰好解决的就是根据部分词条模糊匹配的问题。

**1.2.2 倒排索引**

倒排索引中有两个非常重要的概念：

文档（Document）：用来搜索的数据，其中的每一条数据就是一个文档，例如一个网页、一个商品信息

词条（Term）：对文档数据或用户搜索数据，利用某种算法分词，得到的具备含义的词语就是词条，例如：我是中国人，就可以分为：我、是、中国人、中国、国人这样的几个词条

**创建倒排索引**是对正向索引的一种特殊处理和应用，流程如下：

将每一个文档的数据利用**分词算法**根据语义拆分，得到一个个词条

创建表，每行数据包括词条、词条所在文档id、位置等信息

因为词条唯一性，可以给词条创建**正向**索引

此时形成的这张以词条为索引的表，就是倒排索引表，两者对比如下：

<img src="../assets/SpringCloud笔记/media/image187.png" style="width:5.75in;height:1.85417in" />

倒排索引的**搜索流程**如下（以搜索"华为手机"为例）：

<img src="../assets/SpringCloud笔记/media/image188.png" style="width:5.75in;height:2.28125in" />

用户输入条件"华为手机"进行搜索

对用户输入条件**分词**，得到词条：华为、手机

拿着词条在倒排索引中查找（**由于词条有索引，查询效率很高**），即可得到包含词条的文档id：1、2、3

拿着文档id到正向索引中查找具体文档即可（由于id也有索引，查询效率也很高）

虽然要先查询倒排索引，再查询倒排索引，但是无论是词条、还是文档id都建立了索引，查询速度非常快！无需全表扫描。

**1.2.3 正向和倒排**

为什么一个叫做正向索引，一个叫做倒排索引呢？

**正向索引**是最传统的，根据id索引的方式。但根据词条查询时，必须先逐条获取每个文档，然后判断文档中是否包含所需要的词条，是**根据文档找词条的过程**

而**倒排索引**则相反，是先找到用户要搜索的词条，根据词条得到保护词条的文档的id，然后根据id获取文档。是**根据词条找文档的过程**

两者方式的优缺点：

**正向索引**：

优点：

可以给多个字段创建索引

根据索引字段搜索、排序速度非常快

缺点：

根据非索引字段，或者索引字段中的部分词条查找时，只能全表扫描

**倒排索引**：

优点：

根据词条搜索、模糊搜索时，速度非常快

缺点：

只能给词条创建索引，而不是字段

无法根据字段做排序

**1.3 基础概念**

**1.3.1 文档和字段**

elasticsearch是面向**文档（Document）**存储的，可以是数据库中的一条商品数据，一个订单信息。文档数据会被序列化为json格式后存储在elasticsearch中，例如数据库中的如下表：

|     |                |       |
|-----|----------------|-------|
| id  | title          | price |
| 1   | 小米手机       | 3499  |
| 2   | 华为手机       | 4999  |
| 3   | 华为小米充电器 | 49    |
| 4   | 小米手环       | 49    |

就对应elasticsearch中的四个文档：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"id": 1,<br />
"title": "小米手机",<br />
"price": 3499<br />
}<br />
{<br />
"id": 2,<br />
"title": "华为手机",<br />
"price": 4999<br />
}<br />
{<br />
"id": 3,<br />
"title": "华为小米充电器",<br />
"price": 49<br />
}<br />
{<br />
"id": 4,<br />
"title": "小米手环",<br />
"price": 299<br />
}</td>
</tr>
</tbody>
</table>

因此，原本数据库中的一行数据就是ES中的一个JSON文档，而数据库中每行数据都包含很多列，这些列就转换为JSON文档中的**字段（Field）**。

**1.3.2 索引和映射**

随着业务发展，需要在es中存储的文档也会越来越多，比如有商品的文档、用户的文档、订单文档等等：

<img src="../assets/SpringCloud笔记/media/image189.png" style="width:5.75in;height:2.08333in" />

所有文档散乱存放，非常混乱，不方便管理，因此，要将类型相同的文档集中在一起管理，称为**索引（Index）**，例如：

所有商品文档组织在一起，称为商品索引

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"id": 1,<br />
"title": "小米手机",<br />
"price": 3499<br />
}<br />
<br />
{<br />
"id": 2,<br />
"title": "华为手机",<br />
"price": 4999<br />
}<br />
<br />
{<br />
"id": 3,<br />
"title": "三星手机",<br />
"price": 3999<br />
}</td>
</tr>
</tbody>
</table>

所有用户文档组织在一起，称为用户索引

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"id": 101,<br />
"name": "张三",<br />
"age": 21<br />
}<br />
<br />
{<br />
"id": 102,<br />
"name": "李四",<br />
"age": 24<br />
}<br />
<br />
{<br />
"id": 103,<br />
"name": "麻子",<br />
"age": 18<br />
}</td>
</tr>
</tbody>
</table>

所有订单文档组织在一起，称为订单索引

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"id": 10,<br />
"userId": 101,<br />
"goodsId": 1,<br />
"totalFee": 294<br />
}<br />
<br />
{<br />
"id": 11,<br />
"userId": 102,<br />
"goodsId": 2,<br />
"totalFee": 328<br />
}</td>
</tr>
</tbody>
</table>

可以把索引当做是数据库中的表。

数据库的表会有约束信息，用来定义表的结构、字段的名称、类型等信息，因此，索引库中就有**映射（mapping）**，是索引中文档的字段约束信息，类似表的结构约束。

**1.3.3 mysql与elasticsearch**

mysql与elasticsearch的概念对比：

|        |               |                                                                                   |
|--------|---------------|-----------------------------------------------------------------------------------|
| MySQL  | Elasticsearch | 说明                                                                              |
| Table  | Index         | 索引(index)，就是文档的集合，类似数据库的表(table)                                |
| Row    | Document      | 文档（Document），就是一条条的数据，类似数据库中的行（Row），文档都是JSON格式     |
| Column | Field         | 字段（Field），就是JSON文档中的字段，类似数据库中的列（Column）                   |
| Schema | Mapping       | Mapping（映射）是索引中文档的约束，例如字段类型约束。类似数据库的表结构（Schema） |
| SQL    | DSL           | DSL是elasticsearch提供的JSON风格的请求语句，用来操作elasticsearch，实现CRUD       |

<img src="../assets/SpringCloud笔记/media/image190.png" style="width:5.75in;height:2.64583in" />

两者虽然相似，但各有所长，因此在企业中，往往是两者结合使用：

对安全性要求较高的写操作，使用mysql实现

对查询性能要求较高的搜索需求，使用elasticsearch实现

两者再基于某种方式，实现数据的同步，保证一致性

**1.4 IK分词器**

Elasticsearch的关键就是倒排索引，而倒排索引依赖于对文档内容的分词，而分词则需要高效、精准的分词算法，IK分词器就是这样一个中文分词算法。

**1.4.1 安装IK分词器**

**在线安装**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 安装IK分词器<br />
docker exec -it es ./bin/elasticsearch-plugin install https://release.infinilabs.com/analysis-ik/stable/elasticsearch-analysis-ik-7.12.1.zip<br />
<br />
# 重启es容器<br />
docker restart es</td>
</tr>
</tbody>
</table>

**离线安装**

查看Elasticsearch容器的plugins数据卷目录：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker volume inspect es-plugins</td>
</tr>
</tbody>
</table>

<img src="../assets/SpringCloud笔记/media/image191.png" style="width:5.75in;height:1.54167in" />

可以看到elasticsearch的插件挂载到了/var/lib/docker/volumes/es-plugins/\_data这个目录。

**\[ik.zip\]**

把资料中提供的IK分词器ik文件夹上传至这个目录，最后通过如下命令重启es容器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker restart es</td>
</tr>
</tbody>
</table>

IK分词器压缩包下载地址：

**\[该类型的内容暂不支持下载\]**

**1.4.2 使用IK分词器**

IK分词器包含两种模式：

ik_smart：智能语义切分

ik_max_word：最细粒度切分

测试Elasticsearch官方提供的标准分词器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 默认分词器<br />
POST /_analyze<br />
{<br />
"analyzer": "standard",<br />
"text": "黑马程序员学习java太棒了"<br />
}<br />
<br />
# 响应结果<br />
{<br />
"tokens" : [<br />
{<br />
"token" : "黑",<br />
"start_offset" : 0,<br />
"end_offset" : 1,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 0<br />
},<br />
{<br />
"token" : "马",<br />
"start_offset" : 1,<br />
"end_offset" : 2,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 1<br />
},<br />
{<br />
"token" : "程",<br />
"start_offset" : 2,<br />
"end_offset" : 3,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 2<br />
},<br />
{<br />
"token" : "序",<br />
"start_offset" : 3,<br />
"end_offset" : 4,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 3<br />
},<br />
{<br />
"token" : "员",<br />
"start_offset" : 4,<br />
"end_offset" : 5,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 4<br />
},<br />
{<br />
"token" : "学",<br />
"start_offset" : 5,<br />
"end_offset" : 6,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 5<br />
},<br />
{<br />
"token" : "习",<br />
"start_offset" : 6,<br />
"end_offset" : 7,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 6<br />
},<br />
{<br />
"token" : "java",<br />
"start_offset" : 7,<br />
"end_offset" : 11,<br />
"type" : "&lt;ALPHANUM&gt;",<br />
"position" : 7<br />
},<br />
{<br />
"token" : "太",<br />
"start_offset" : 11,<br />
"end_offset" : 12,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 8<br />
},<br />
{<br />
"token" : "棒",<br />
"start_offset" : 12,<br />
"end_offset" : 13,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 9<br />
},<br />
{<br />
"token" : "了",<br />
"start_offset" : 13,<br />
"end_offset" : 14,<br />
"type" : "&lt;IDEOGRAPHIC&gt;",<br />
"position" : 10<br />
}<br />
]<br />
}</td>
</tr>
</tbody>
</table>

可以看到，标准分词器智能1字1词条，无法正确对中文做分词。

再测试IK分词器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 智能语义拆分<br />
POST /_analyze<br />
{<br />
"analyzer": "ik_smart",<br />
"text": "黑马程序员学习java太棒了"<br />
}<br />
<br />
# 响应结果<br />
{<br />
"tokens" : [<br />
{<br />
"token" : "黑马",<br />
"start_offset" : 0,<br />
"end_offset" : 2,<br />
"type" : "CN_WORD",<br />
"position" : 0<br />
},<br />
{<br />
"token" : "程序员",<br />
"start_offset" : 2,<br />
"end_offset" : 5,<br />
"type" : "CN_WORD",<br />
"position" : 1<br />
},<br />
{<br />
"token" : "学习",<br />
"start_offset" : 5,<br />
"end_offset" : 7,<br />
"type" : "CN_WORD",<br />
"position" : 2<br />
},<br />
{<br />
"token" : "java",<br />
"start_offset" : 7,<br />
"end_offset" : 11,<br />
"type" : "ENGLISH",<br />
"position" : 3<br />
},<br />
{<br />
"token" : "太棒了",<br />
"start_offset" : 11,<br />
"end_offset" : 14,<br />
"type" : "CN_WORD",<br />
"position" : 4<br />
}<br />
]<br />
<br />
}</td>
</tr>
</tbody>
</table>

你也可以将analyzer字段设置为ik_max_word测试最细力度拆分，可以看到分词结果更细致，这里不演示。

**1.4.3 拓展词典**

随着互联网的发展，“造词运动”也越发频繁，出现了很多新词，在原有的词汇列表中并不存在，比如“泰裤辣”，“传智播客” 等。IK分词器无法对这些词汇分词，测试一下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 原词典分词<br />
POST /_analyze<br />
{<br />
"analyzer": "ik_max_word",<br />
"text": "传智播客开设大学,真的泰裤辣！"<br />
}<br />
<br />
# 响应结果<br />
{<br />
"tokens" : [<br />
{<br />
"token" : "传",<br />
"start_offset" : 0,<br />
"end_offset" : 1,<br />
"type" : "CN_CHAR",<br />
"position" : 0<br />
},<br />
{<br />
"token" : "智",<br />
"start_offset" : 1,<br />
"end_offset" : 2,<br />
"type" : "CN_CHAR",<br />
"position" : 1<br />
},<br />
{<br />
"token" : "播",<br />
"start_offset" : 2,<br />
"end_offset" : 3,<br />
"type" : "CN_CHAR",<br />
"position" : 2<br />
},<br />
{<br />
"token" : "客",<br />
"start_offset" : 3,<br />
"end_offset" : 4,<br />
"type" : "CN_CHAR",<br />
"position" : 3<br />
},<br />
{<br />
"token" : "开设",<br />
"start_offset" : 4,<br />
"end_offset" : 6,<br />
"type" : "CN_WORD",<br />
"position" : 4<br />
},<br />
{<br />
"token" : "大学",<br />
"start_offset" : 6,<br />
"end_offset" : 8,<br />
"type" : "CN_WORD",<br />
"position" : 5<br />
},<br />
{<br />
"token" : "真的",<br />
"start_offset" : 9,<br />
"end_offset" : 11,<br />
"type" : "CN_WORD",<br />
"position" : 6<br />
},<br />
{<br />
"token" : "泰",<br />
"start_offset" : 11,<br />
"end_offset" : 12,<br />
"type" : "CN_CHAR",<br />
"position" : 7<br />
},<br />
{<br />
"token" : "裤",<br />
"start_offset" : 12,<br />
"end_offset" : 13,<br />
"type" : "CN_CHAR",<br />
"position" : 8<br />
},<br />
{<br />
"token" : "辣",<br />
"start_offset" : 13,<br />
"end_offset" : 14,<br />
"type" : "CN_CHAR",<br />
"position" : 9<br />
}<br />
]<br />
}</td>
</tr>
</tbody>
</table>

可以看到，传智播客和泰裤辣都无法正确分词，要想正确分词，IK分词器的词库需要不断地更新，所以IK分词器提供了扩展词汇的功能。

1）查询IK分词器在es容器中的位置

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker logs es | grep "ik"</td>
</tr>
</tbody>
</table>

结果最后一行可以得到IK分词器在容器中的位置为/usr/share/elasticsearch/config/analysis-ik（每个人可能不一样）。

2）复制这个目录到本地的任意目录（例如/root），然后进入analysis-ik目录中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker cp es:/usr/share/elasticsearch/config/analysis-ik /root<br />
cd /root/analysis-ik</td>
</tr>
</tbody>
</table>

执行后可以看到本地/root目录下多了一个analysis-ik目录，cd进去即可。

3）修改analysis-ik目录下的IKAnalyzer.cfg.xml配置文件，添加自己的扩展字典：

<img src="../assets/SpringCloud笔记/media/image192.png" style="width:5.75in;height:1.32292in" />

4）在IK分词器的analysis-ik目录新建一个 ext.dic文件，并添加如下词典：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Plaintext<br />
传智播客<br />
泰裤辣</td>
</tr>
</tbody>
</table>

5）将本地的analysis-ik目录覆盖es容器中的原有目录，并删除本地的analysis-ik目录（可以不删除）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker cp /root/analysis-ik es:/usr/share/elasticsearch/config/<br />
rm -rf /root/analysis-ik</td>
</tr>
</tbody>
</table>

6）重启es容器使自定义扩展词典生效

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker restart es</td>
</tr>
</tbody>
</table>

再次测试，可以发现传智播客和泰裤辣都正确分词了：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"tokens" : [<br />
{<br />
"token" : "传智播客",<br />
"start_offset" : 0,<br />
"end_offset" : 4,<br />
"type" : "CN_WORD",<br />
"position" : 0<br />
},<br />
{<br />
"token" : "开设",<br />
"start_offset" : 4,<br />
"end_offset" : 6,<br />
"type" : "CN_WORD",<br />
"position" : 1<br />
},<br />
{<br />
"token" : "大学",<br />
"start_offset" : 6,<br />
"end_offset" : 8,<br />
"type" : "CN_WORD",<br />
"position" : 2<br />
},<br />
{<br />
"token" : "真的",<br />
"start_offset" : 9,<br />
"end_offset" : 11,<br />
"type" : "CN_WORD",<br />
"position" : 3<br />
},<br />
{<br />
"token" : "泰裤辣",<br />
"start_offset" : 11,<br />
"end_offset" : 14,<br />
"type" : "CN_WORD",<br />
"position" : 4<br />
}<br />
]<br />
}</td>
</tr>
</tbody>
</table>

**2.索引库操作**

Index就类似数据库表，Mapping映射就类似表的结构。我们要向es中存储数据，必须先创建Index和Mapping

**2.1 Mapping映射属性**

Mapping是对索引库中文档的约束，常见的Mapping属性包括：

type：字段数据类型，常见的简单类型有：

字符串：text（可分词的文本）、keyword（精确值，例如：品牌、国家、ip地址）

数值：long、integer、short、byte、double、float

布尔：boolean

日期：date

对象：object

index：是否创建索引，默认为true

analyzer：使用哪种分词器

properties：该字段的子字段

例如下面的json文档：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"age": 21,<br />
"weight": 52.1,<br />
"isMarried": false,<br />
"info": "黑马程序员Java讲师",<br />
"email": "zy@itcast.cn",<br />
"score": [99.1, 99.5, 98.9],<br />
"name": {<br />
"firstName": "云",<br />
"lastName": "赵"<br />
}<br />
}</td>
</tr>
</tbody>
</table>

对应的每个字段映射（Mapping）：

|           |           |          |                    |              |              |        |
|-----------|-----------|----------|--------------------|--------------|--------------|--------|
| 字段名    |           | 字段类型 | 类型说明           | 是否参与搜索 | 是否参与分词 | 分词器 |
| age       |           | integer  | 整数               | 是           | 否           |        |
| weight    |           | float    | 浮点数             | 是           | 否           |        |
| isMarried |           | boolean  | 布尔               | 是           | 否           |        |
| info      |           | text     | 字符串，但需要分词 | 是           | 是           | IK     |
| email     |           | keyword  | 字符串，但是不分词 | 否           | 否           |        |
| score     |           | float    | 只看数组中元素类型 | 是           | 否           |        |
| name      | firstName | keyword  | 字符串，但是不分词 | 是           | 否           |        |
|           | lastName  | keyword  | 字符串，但是不分词 | 是           | 否           |        |

**2.2 索引库的CRUD**

由于Elasticsearch采用的是Restful风格的API，因此其请求方式和路径相对都比较规范，而且请求参数也都采用JSON风格。

这里直接基于Kibana的DevTools编写请求做测试，由于有语法提示，会非常方便。

**2.2.1 创建索引库和映射**

**基本语法**：

请求方式：PUT

请求路径：/索引库名，可以自定义

请求参数：mapping映射

**格式**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
PUT /索引库名称<br />
{<br />
"mappings": {<br />
"properties": {<br />
"字段名":{<br />
"type": "text",<br />
"analyzer": "ik_smart"<br />
},<br />
"字段名2":{<br />
"type": "keyword",<br />
"index": "false"<br />
},<br />
"字段名3":{<br />
"properties": {<br />
"子字段": {<br />
"type": "keyword"<br />
}<br />
}<br />
},<br />
// ...略<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**示例**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 创建索引库<br />
PUT /heima<br />
{<br />
"mappings": {<br />
"properties": {<br />
"info": {<br />
"type": "text",<br />
"analyzer": "ik_smart"<br />
},<br />
"email": {<br />
"type": "keyword",<br />
"index": false<br />
},<br />
"name": {<br />
"properties": {<br />
"firstName": {<br />
"type": "keyword"<br />
},<br />
"lastName": {<br />
"type": "keyword"<br />
}<br />
}<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

|                                                                                                                                          |
|------------------------------------------------------------------------------------------------------------------------------------------|
| **注意**：index字段默认为true，即创建索引，如果希望这个字段参与搜索，可以不指定，如果不参与搜索，就没必要创建索引，需要手动设置为false。 |

**2.2.2 查询索引库**

**基本语法**：

请求方式：GET

请求路径：/索引库名

请求参数：无

**格式**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /索引库名</td>
</tr>
</tbody>
</table>

**示例**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 查询索引库<br />
GET /heima</td>
</tr>
</tbody>
</table>

**2.2.3 修改索引库**

倒排索引结构虽然不复杂，但是一旦数据结构改变（比如改变了分词器），就需要重新创建倒排索引，这简直是灾难，因此索引库**一旦创建，无法修改mapping**。

虽然无法修改mapping中已有的字段，但是却允许添加新的字段到mapping中，因为不会对倒排索引产生影响，因此修改索引库能做的就是向索引库中添加新字段，或者更新索引库的基础属性。

**语法说明**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
PUT /索引库名/_mapping<br />
{<br />
"properties": {<br />
"新字段名":{<br />
"type": "integer"<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**示例**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 修改索引库<br />
PUT /heima/_mapping<br />
{<br />
"properties": {<br />
"age": {<br />
"type": "integer"<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.2.4 删除索引库**

**语法**：

请求方式：DELETE

请求路径：/索引库名

请求参数：无

**格式**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
DELETE /索引库名</td>
</tr>
</tbody>
</table>

**示例**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 删除索引库<br />
DELETE /heima</td>
</tr>
</tbody>
</table>

**2.2.5 总结**

创建索引库：PUT /索引库名

查询索引库：GET /索引库名

删除索引库：DELETE /索引库名

修改索引库，添加字段：PUT /索引库名/\_mapping

**3.文档操作**

有了索引库，接下来就可以向索引库中添加数据了。Elasticsearch中的数据其实就是JSON风格的文档。操作文档自然包含增、删、改、查等几种常见操作。

**3.1 新增文档**

**语法：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
POST /索引库名/_doc/文档id<br />
{<br />
"字段1": "值1",<br />
"字段2": "值2",<br />
"字段3": {<br />
"子属性1": "值3",<br />
"子属性2": "值4"<br />
},<br />
}</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 新增文档<br />
POST /heima/_doc/1<br />
{<br />
"info": "黑马程序员Java讲师",<br />
"email": "zy@itcast.cn",<br />
"name": {<br />
"firstName": "云",<br />
"lastName": "赵"<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**响应：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"_index" : "heima",<br />
"_type" : "_doc",<br />
"_id" : "1",<br />
"_version" : 1,<br />
"result" : "created",<br />
"_shards" : {<br />
"total" : 2,<br />
"successful" : 1,<br />
"failed" : 0<br />
},<br />
"_seq_no" : 0,<br />
"_primary_term" : 1<br />
}</td>
</tr>
</tbody>
</table>

result字段为created，表示新增文档成功。

**3.2 查询文档**

根据rest风格，新增是post，查询应该是get，不过查询一般都需要条件，这里我们把文档id带上。

**语法：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /{索引库名称}/_doc/{id}</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 查询文档<br />
GET /heima/_doc/1</td>
</tr>
</tbody>
</table>

**查看结果：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"_index" : "heima",<br />
"_type" : "_doc",<br />
"_id" : "1",<br />
"_version" : 1,<br />
"_seq_no" : 0,<br />
"_primary_term" : 1,<br />
"found" : true,<br />
"_source" : {<br />
"info" : "黑马程序员Java讲师",<br />
"email" : "zy@itcast.cn",<br />
"name" : {<br />
"firstName" : "云",<br />
"lastName" : "赵"<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.3 删除文档**

删除使用DELETE请求，同样，需要根据id进行删除。

**语法：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
DELETE /{索引库名}/_doc/id值</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 删除文档<br />
DELETE /heima/_doc/1</td>
</tr>
</tbody>
</table>

**结果：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"_index" : "heima",<br />
"_type" : "_doc",<br />
"_id" : "1",<br />
"_version" : 2,<br />
"result" : "deleted",<br />
"_shards" : {<br />
"total" : 2,<br />
"successful" : 1,<br />
"failed" : 0<br />
},<br />
"_seq_no" : 1,<br />
"_primary_term" : 1<br />
}</td>
</tr>
</tbody>
</table>

result字段为deleted，表示删除成功。

**3.4 修改文档**

修改有两种方式：

全量修改：直接覆盖原来的文档

局部修改：修改文档中的部分字段

**3.4.1 全量修改**

全量修改是覆盖原来的文档，其本质是两步操作：

根据指定的id删除文档

新增一个相同id的文档

|                                                                                          |
|------------------------------------------------------------------------------------------|
| **注意**：如果根据id删除时，id不存在，第二步的新增也会执行，也就从修改变成了新增操作了。 |

**语法：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
PUT /{索引库名}/_doc/文档id<br />
{<br />
"字段1": "值1",<br />
"字段2": "值2",<br />
// ... 略<br />
}</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 修改文档（全量修改）<br />
PUT /heima/_doc/1<br />
{<br />
"info": "黑马程序员Java讲师",<br />
"email": "ZY@itcast.cn",<br />
"name": {<br />
"firstName": "云",<br />
"lastName": "赵"<br />
}<br />
}</td>
</tr>
</tbody>
</table>

由于id为1的文档已经被删除，所以第一次执行时，得到的反馈是created：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"_index" : "heima",<br />
"_type" : "_doc",<br />
"_id" : "1",<br />
"_version" : 1,<br />
"result" : "created",<br />
"_shards" : {<br />
"total" : 2,<br />
"successful" : 1,<br />
"failed" : 0<br />
},<br />
"_seq_no" : 2,<br />
"_primary_term" : 1<br />
}</td>
</tr>
</tbody>
</table>

所以如果执行第2次时，得到的反馈则是updated：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"_index" : "heima",<br />
"_type" : "_doc",<br />
"_id" : "1",<br />
"_version" : 2,<br />
"result" : "updated",<br />
"_shards" : {<br />
"total" : 2,<br />
"successful" : 1,<br />
"failed" : 0<br />
},<br />
"_seq_no" : 3,<br />
"_primary_term" : 1<br />
}</td>
</tr>
</tbody>
</table>

**3.4.2 局部修改**

局部修改是只修改指定id匹配的文档中的部分字段。

**语法：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
POST /{索引库名}/_update/文档id<br />
{<br />
"doc": {<br />
"字段名": "新的值",<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 修改文档（局部修改）<br />
POST /heima/_update/1<br />
{<br />
"doc": {<br />
"email": "zhaoyun@itcast.cn"<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**执行结果**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"_index" : "heima",<br />
"_type" : "_doc",<br />
"_id" : "1",<br />
"_version" : 3,<br />
"result" : "updated",<br />
"_shards" : {<br />
"total" : 2,<br />
"successful" : 1,<br />
"failed" : 0<br />
},<br />
"_seq_no" : 4,<br />
"_primary_term" : 1<br />
}</td>
</tr>
</tbody>
</table>

结果显示为updated，说明这是一个更新操作，且更新成功。

**3.5 批处理**

批处理采用POST请求，基本语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
POST _bulk<br />
{ "index" : { "_index" : "test", "_id" : "1" } }<br />
{ "field1" : "value1" }<br />
{ "delete" : { "_index" : "test", "_id" : "2" } }<br />
{ "create" : { "_index" : "test", "_id" : "3" } }<br />
<br />
{ "field1" : "value3" }<br />
{ "update" : {"_id" : "1", "_index" : "test"} }<br />
{ "doc" : {"field2" : "value2"} }</td>
</tr>
</tbody>
</table>

其中：

index代表新增操作

\_index：指定索引库名

\_id指定要操作的文档id

{ "field1" : "value1" }：则是要新增的文档内容

delete代表删除操作

\_index：指定索引库名

\_id指定要操作的文档id

create代表新增操作，和index不同的是

仅在 ID 不存在时创建文档到索引 test

如果 ID 存在就报错，而index是覆盖

update代表更新操作

\_index：指定索引库名

\_id指定要操作的文档id

{ "doc" : {"field2" : "value2"} }：要更新的文档字段

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 批处理<br />
# 1）批量新增<br />
POST /_bulk<br />
{"index": {"_index": "heima", "_id": "2"}}<br />
{"info": "黑马程序员C++讲师", "email": "ww.itcast.cn", "name": {"firstName": "五", "lastName": "王"}}<br />
{"index": {"_index": "heima", "_id": "3"}}<br />
{"info": "黑马程序员前端讲师", "email": "zhangsan@itcast.cn", "name":{"firstName": "三", "lastName":"张"}}<br />
# 2）批量删除<br />
POST /_bulk<br />
{"delete": {"_index": "heima", "_id": "2"}}<br />
{"delete": {"_index": "heima", "_id": "3"}}</td>
</tr>
</tbody>
</table>

**3.6 统计文档数量**

除了对文档进行CRUD操作，还可以获取某个索引库中文档的数量。

**语法：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /{索引库名}/_count</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 统计索引库中文档总量<br />
GET /heima/_count</td>
</tr>
</tbody>
</table>

**执行结果**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"count" : 3,<br />
"_shards" : {<br />
"total" : 1,<br />
"successful" : 1,<br />
"skipped" : 0,<br />
"failed" : 0<br />
}<br />
}</td>
</tr>
</tbody>
</table>

其中count字段的值为3，表示heima索引库中总共有3条文档。

**3.7 总结**

创建文档：POST /{索引库名}/\_doc/文档id { json文档 }

查询文档：GET /{索引库名}/\_doc/文档id

删除文档：DELETE /{索引库名}/\_doc/文档id

修改文档：

全量修改：PUT /{索引库名}/\_doc/文档id { json文档 }

局部修改：POST /{索引库名}/\_update/文档id { "doc": {字段}}

统计文档数量：GET /{索引库名}/\_count

**4.RestAPI**

ES官方提供了各种不同语言的客户端，用来操作ES，这些客户端的本质就是组装DSL语句，通过http请求发送给ES。

官方文档地址：

**\[该类型的内容暂不支持下载\]**

由于ES目前最新版本是8.8，提供了全新版本的客户端，老版本的客户端已经被标记为过时。而我们采用的是7.12版本，因此只能使用老版本客户端。

**4.1 初始化RestClient**

在elasticsearch提供的API中，与elasticsearch一切交互都封装在RestHighLevelClient类中，必须先完成这个对象的初始化，建立与elasticsearch的连接。

1）在item-service模块中引入es的RestHighLevelClient依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.elasticsearch.client&lt;/groupId&gt;<br />
&lt;artifactId&gt;elasticsearch-rest-high-level-client&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

2）因为SpringBoot默认的ES版本是7.17.10，所以需要覆盖默认的ES版本，只需要在item-service的父工程hmall中配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;properties&gt;<br />
&lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;<br />
&lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;<br />
&lt;elasticsearch.version&gt;7.12.1&lt;/elasticsearch.version&gt;<br />
&lt;/properties&gt;</td>
</tr>
</tbody>
</table>

3）初始化RestHighLevelClient：

初始化的代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
RestHighLevelClient client = new RestHighLevelClient(RestClient.builder(<br />
HttpHost.create("http://192.168.150.101:9200") //集群模式只需要复制多行这行代码修改IP和端口即可<br />
));</td>
</tr>
</tbody>
</table>

为了单元测试方便，创建一个测试类IndexTest，将初始化的代码编写在@BeforeEach方法中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.item.es;<br />
<br />
import org.apache.http.HttpHost;<br />
import org.elasticsearch.client.RestClient;<br />
import org.elasticsearch.client.RestHighLevelClient;<br />
import org.junit.jupiter.api.AfterEach;<br />
import org.junit.jupiter.api.BeforeEach;<br />
import org.junit.jupiter.api.Test;<br />
<br />
import java.io.IOException;<br />
<br />
public class IndexTest {<br />
private RestHighLevelClient client;<br />
<br />
@Test<br />
public void testConnection(){<br />
System.out.println("client = " + client);<br />
}<br />
<br />
@BeforeEach<br />
public void setClient() {<br />
client = new RestHighLevelClient(RestClient.builder(<br />
HttpHost.create("http://192.168.88.131:9200")<br />
));<br />
}<br />
<br />
@AfterEach<br />
public void tearDown() throws IOException {<br />
if(client != null){<br />
client.close();<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.2 创建索引库**

由于要实现对商品搜索，所以需要将商品添加到Elasticsearch中，不过需要根据搜索业务的需求来设定索引库结构，而不是一股脑的把MySQL数据写入Elasticsearch。

<img src="../assets/SpringCloud笔记/media/image193.png" style="width:5.75in;height:2.34375in" />

对应的商品表结构如下，索引库无关字段已经划掉：

<img src="../assets/SpringCloud笔记/media/image194.png" style="width:5.75in;height:2.36458in" />

结合数据库表结构，以上字段对应的mapping映射属性如下：

|              |          |                        |              |              |        |
|--------------|----------|------------------------|--------------|--------------|--------|
| 字段名       | 字段类型 | 类型说明               | 是否参与搜索 | 是否参与分词 | 分词器 |
| id           | long     | 长整数                 | 是           | 否           |        |
| name         | text     | 字符串，参与分词搜索   | 是           | 是           | IK     |
| price        | integer  | 以分为单位，所以是整数 | 是           | 否           |        |
| stock        | integer  | 字符串，但需要分词     | 是           | 否           |        |
| image        | keyword  | 字符串，但是不分词     | 否           | 否           |        |
| category     | keyword  | 字符串，但是不分词     | 是           | 否           |        |
| brand        | keyword  | 字符串，但是不分词     | 是           | 否           |        |
| sold         | integer  | 销量，整数             | 是           | 否           |        |
| commentCount | integer  | 评价，整数             | 否           | 否           |        |
| isAD         | boolean  | 布尔类型               | 是           | 否           |        |
| updateTime   | Date     | 更新时间               | 是           | 否           |        |

最终的索引库文档结构如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
PUT /items<br />
{<br />
"mappings": {<br />
"properties": {<br />
"id": {<br />
"type": "keyword"<br />
},<br />
"name":{<br />
"type": "text",<br />
"analyzer": "ik_max_word"<br />
},<br />
"price":{<br />
"type": "integer"<br />
},<br />
"stock":{<br />
"type": "integer"<br />
},<br />
"image":{<br />
"type": "keyword",<br />
"index": false<br />
},<br />
"category":{<br />
"type": "keyword"<br />
},<br />
"brand":{<br />
"type": "keyword"<br />
},<br />
"sold":{<br />
"type": "integer"<br />
},<br />
"commentCount":{<br />
"type": "integer",<br />
"index": false<br />
},<br />
"isAD":{<br />
"type": "boolean"<br />
},<br />
"updateTime":{<br />
"type": "date"<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

|                                                                                                    |
|----------------------------------------------------------------------------------------------------|
| **注意**：id字段在数据库中一般使用整数，但在elasticsearch中一般使用字符串存储，也就是keyword类型。 |

**4.2.1 创建索引**

创建索引库的API如下：

<img src="../assets/SpringCloud笔记/media/image195.png" style="width:5.75in;height:2.59375in" />

代码分为三步：

1）创建Request对象

因为是创建索引库的操作，因此Request是CreateIndexRequest

2）添加请求参数

其实就是json格式的Mapping映射参数。因为json字符串很长，这里是定义了静态字符串常量MAPPING_TEMPLATE，让代码看起来更加优雅

3）发送请求

client.indices()方法的返回值是IndicesClient类型，封装了所有与索引库操作有关的方法，例如创建索引、删除索引、判断索引是否存在等

在item-service中的IndexTest测试类中，具体代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//创建索引库<br />
@Test<br />
public void testCreateIndex() throws IOException {<br />
//1.创建Request对象<br />
CreateIndexRequest request = new CreateIndexRequest("items");<br />
//2.准备请求参数<br />
request.source(MAPPING_TEMPLATE, XContentType.JSON);<br />
//3.发送请求<br />
client.indices().create(request, RequestOptions.DEFAULT);<br />
}<br />
<br />
private static final String MAPPING_TEMPLATE = "{\n" +<br />
" \"mappings\": {\n" +<br />
" \"properties\": {\n" +<br />
" \"id\": {\n" +<br />
" \"type\": \"keyword\"\n" +<br />
" },\n" +<br />
" \"name\":{\n" +<br />
" \"type\": \"text\",\n" +<br />
" \"analyzer\": \"ik_max_word\"\n" +<br />
" },\n" +<br />
" \"price\":{\n" +<br />
" \"type\": \"integer\"\n" +<br />
" },\n" +<br />
" \"stock\":{\n" +<br />
" \"type\": \"integer\"\n" +<br />
" },\n" +<br />
" \"image\":{\n" +<br />
" \"type\": \"keyword\",\n" +<br />
" \"index\": false\n" +<br />
" },\n" +<br />
" \"category\":{\n" +<br />
" \"type\": \"keyword\"\n" +<br />
" },\n" +<br />
" \"brand\":{\n" +<br />
" \"type\": \"keyword\"\n" +<br />
" },\n" +<br />
" \"sold\":{\n" +<br />
" \"type\": \"integer\"\n" +<br />
" },\n" +<br />
" \"commentCount\":{\n" +<br />
" \"type\": \"integer\"\n" +<br />
" },\n" +<br />
" \"isAD\":{\n" +<br />
" \"type\": \"boolean\"\n" +<br />
" },\n" +<br />
" \"updateTime\":{\n" +<br />
" \"type\": \"date\"\n" +<br />
" }\n" +<br />
" }\n" +<br />
" }\n" +<br />
"}";</td>
</tr>
</tbody>
</table>

**4.2.2 删除索引库**

删除索引库的请求非常简单：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
DELETE /items</td>
</tr>
</tbody>
</table>

与创建索引库相比：

请求方式从PUT变为DELTE

请求路径不变

无请求参数

所以代码的差异，注意体现在Request对象上：

1）创建Request对象，这次是DeleteIndexRequest对象

2）准备参数，这里是无参，因此省略

3）发送请求，改用delete方法

在item-service中的IndexTest测试类中，编写单元测试，实现删除索引：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//删除索引库<br />
@Test<br />
public void testDeleteIndex() throws IOException {<br />
//1.创建Request对象<br />
DeleteIndexRequest request = new DeleteIndexRequest("items");<br />
//2.发送请求<br />
client.indices().delete(request, RequestOptions.DEFAULT);<br />
}</td>
</tr>
</tbody>
</table>

**4.3 判断索引库是否存在**

判断索引库是否存在，本质就是查询，对应的请求语句是：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /items</td>
</tr>
</tbody>
</table>

因此与删除的Java代码流程是类似的，流程如下：

1）创建Request对象，这次是GetIndexRequest对象

2）准备参数，这里是无参，直接省略

3）发送请求，改用exists方法

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//判断索引库是否存在<br />
@Test<br />
public void testExistsIndex() throws IOException {<br />
//1.创建Request对象<br />
GetIndexRequest request = new GetIndexRequest("items");<br />
//2.发送请求<br />
boolean exists = client.indices().exists(request, RequestOptions.DEFAULT);<br />
System.out.println("索引库items是否存在：" + exists);<br />
}</td>
</tr>
</tbody>
</table>

**4.4 总结**

JavaRestClient操作elasticsearch的流程基本类似，核心是client.indices()方法来获取索引库的操作对象。

索引库操作的基本步骤：

初始化RestHighLevelClient

创建XxxIndexRequest。XXX是Create、Get、Delete

准备请求参数（ Create时需要，其它是无参，可以省略）

发送请求，调用RestHighLevelClient#indices().xxx()方法，xxx是create、exists、delete

**5.RestClient操作文档**

索引库准备好以后，就可以操作文档了，为了与索引库操作分离，再次创建一个测试类，做两件事情：

初始化RestHighLevelClient

商品数据在数据库，需要利用IItemService去查询，所以注入这个接口

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.item.es;<br />
<br />
import com.hmall.item.service.IItemService;<br />
import org.apache.http.HttpHost;<br />
import org.elasticsearch.client.RestClient;<br />
import org.elasticsearch.client.RestHighLevelClient;<br />
import org.junit.jupiter.api.AfterEach;<br />
import org.junit.jupiter.api.BeforeEach;<br />
import org.springframework.beans.factory.annotation.Autowired;<br />
import org.springframework.boot.test.context.SpringBootTest;<br />
<br />
import java.io.IOException;<br />
<br />
//启动整个Spring容器，并使用local环境，用于连接数据库<br />
@SpringBootTest(properties = "spring.profiles.active=local")<br />
@Slf4j<br />
public class DocumentTest {<br />
<br />
private RestHighLevelClient client;<br />
@Autowired<br />
private IItemService itemService;<br />
<br />
@Test<br />
public void testConnection() {<br />
System.out.println("client = " + client);<br />
}<br />
<br />
<br />
@BeforeEach<br />
void setUp() {<br />
this.client = new RestHighLevelClient(RestClient.builder(<br />
HttpHost.create("http://192.168.88.131:9200")<br />
));<br />
}<br />
<br />
@AfterEach<br />
void tearDown() throws IOException {<br />
this.client.close();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**5.1 新增文档**

需要将数据库中的商品信息导入elasticsearch中，而不是造假数据。

**5.1.1 实体类**

索引库结构与数据库结构还存在一些差异，因此要定义一个索引库结构对应的实体。

在hm-service模块的com.hmall.item.domain.po包中定义一个新的po：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.item.domain.po;<br />
<br />
import io.swagger.annotations.ApiModel;<br />
import io.swagger.annotations.ApiModelProperty;<br />
import lombok.Data;<br />
<br />
import java.time.LocalDateTime;<br />
<br />
@Data<br />
@ApiModel(description = "索引库实体")<br />
public class ItemDoc {<br />
<br />
@ApiModelProperty("商品id")<br />
private String id;<br />
<br />
@ApiModelProperty("商品名称")<br />
private String name;<br />
<br />
@ApiModelProperty("价格（分）")<br />
private Integer price;<br />
<br />
@ApiModelProperty("商品图片")<br />
private String image;<br />
<br />
@ApiModelProperty("类目名称")<br />
private String category;<br />
<br />
@ApiModelProperty("品牌名称")<br />
private String brand;<br />
<br />
@ApiModelProperty("销量")<br />
private Integer sold;<br />
<br />
@ApiModelProperty("评论数")<br />
private Integer commentCount;<br />
<br />
@ApiModelProperty("是否是推广广告，true/false")<br />
private Boolean isAD;<br />
<br />
@ApiModelProperty("更新时间")<br />
private LocalDateTime updateTime;<br />
}</td>
</tr>
</tbody>
</table>

**5.1.2 API语法**

新增文档的请求语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
POST /{索引库名}/_doc/1<br />
{<br />
"name": "Jack",<br />
"age": 21<br />
}</td>
</tr>
</tbody>
</table>

对应的JavaAPI如下：

<img src="../assets/SpringCloud笔记/media/image196.png" style="width:5.75in;height:1.44792in" />

可以看到与索引库操作的API非常类似，同样是三步走：

1）创建Request对象，这里是IndexRequest，因为添加文档就是创建倒排索引的过程

2）准备请求参数，本例中就是Json文档

3）发送请求

变化的地方在于，这里直接使用client.xxx()的API，不再需要client.indices()了。

**5.1.3 完整代码**

导入商品数据，除了参考API模板“三步走”以外，还需要做几点准备工作：

商品数据来自于数据库，需要先查询出来，得到Item对象

Item对象需要转为ItemDoc对象

ItemDTO需要序列化为json格式

因此，代码整体步骤如下：

1）根据id查询商品数据Item

2）将Item封装为ItemDoc

3）将ItemDoc序列化为JSON

4）创建IndexRequest，指定索引库名和id

5）准备请求参数，也就是JSON文档

6）发送请求

在item-service的DocumentTest测试类中，编写单元测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//新增文档，也可作为全量修改<br />
@Test<br />
public void testAddDocument() throws IOException {<br />
//1.根据id查询商品数据<br />
Item item = itemService.getById(317578L);<br />
//2.转换商品数据为文档类型<br />
ItemDoc itemDoc = BeanUtil.copyProperties(item, ItemDoc.class);<br />
//3.将ItemDTO转为JSON<br />
String doc = JSONUtil.toJsonStr(itemDoc);<br />
<br />
//4.准备Request对象<br />
IndexRequest request = new IndexRequest("items").id(itemDoc.getId());<br />
//5.准备请求参数(JSON文档)<br />
request.source(doc, XContentType.JSON);<br />
//6.发送请求<br />
client.index(request, RequestOptions.DEFAULT);<br />
}</td>
</tr>
</tbody>
</table>

**5.2 查询文档**

**5.2.1 语法说明**

查询的请求语句如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /{索引库名}/_doc/{id}</td>
</tr>
</tbody>
</table>

与之前的流程类似，代码大概分2步：

创建Request对象

~~准备请求参数，这里是无参，直接省略~~

发送请求

不过查询的目的是得到结果，解析为ItemDTO，还要再加一步对结果的解析：

<img src="../assets/SpringCloud笔记/media/image197.png" style="width:5.75in;height:2.04167in" />

可以看到，响应结果是一个JSON，其中文档放在一个_source属性中，因此解析就是拿到_source，反序列化为Java对象即可。

其它代码与之前类似，流程如下：

1）准备Request对象，这次是查询，所以是GetRequest

2）发送请求，得到结果，因为是查询，这里调用client.get()方法

3）解析结果，就是对JSON做反序列化

**5.2.2 完整代码**

在item-service的DocumentTest测试类中，编写单元测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//查询文档<br />
@Test<br />
public void testGetDocumentById() throws IOException {<br />
//1.创建Request对象<br />
GetRequest request = new GetRequest("items", "317578");<br />
//2.发送请求<br />
GetResponse response = client.get(request, RequestOptions.DEFAULT);<br />
//3.解析响应结果<br />
String json = response.getSourceAsString();<br />
ItemDoc itemDoc = JSONUtil.toBean(json, ItemDoc.class);<br />
System.out.println("itemDoc = " + itemDoc);<br />
}</td>
</tr>
</tbody>
</table>

**5.3 删除文档**

删除的请求语句如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
DELETE /{索引库名称}/_doc/{id}</td>
</tr>
</tbody>
</table>

与查询相比，仅仅是请求方式从DELETE变成GET，可以想象Java代码应该依然是2步走：

1）准备Request对象，因为是删除，这次是DeleteRequest对象，要指定索引库名和id

2）~~准备参数，无参，直接省略~~

3）发送请求，因为是删除，所以是client.delete()方法

在item-service的DocumentTest测试类中，编写单元测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//删除文档<br />
@Test<br />
public void testDeleteDocument() throws IOException {<br />
//1.创建Request对象<br />
DeleteRequest request = new DeleteRequest("items", "317578");<br />
//2.发送请求<br />
client.delete(request, RequestOptions.DEFAULT);<br />
}</td>
</tr>
</tbody>
</table>

**5.4 修改文档**

修改有两种方式：

全量修改：本质是先根据id删除，再新增

局部修改：修改文档中的指定字段值

在RestClient的API中，全量修改与新增的API完全一致，判断依据是ID：

如果新增时，ID已经存在，则修改

如果新增时，ID不存在，则新增

这里主要关注局部修改的API，全量修改和5.1 新增文档一模一样。

**5.4.1 语法说明**

局部修改的请求语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
POST /{索引库名}/_update/{id}<br />
{<br />
"doc": {<br />
"字段名": "字段值",<br />
"字段名": "字段值"<br />
}<br />
}</td>
</tr>
</tbody>
</table>

<img src="../assets/SpringCloud笔记/media/image198.png" style="width:5.75in;height:1.8125in" />

与之前类似，也是三步走：

1）准备Request对象，这次是修改，所以是UpdateRequest

2）准备参数，也就是JSON文档，里面包含要修改的字段

3）更新文档，这里调用client.update()方法

**5.4.2 完整代码**

在item-service的DocumentTest测试类中，编写单元测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//增量修改<br />
@Test<br />
public void testUpdateDocument() throws IOException {<br />
//1.创建Request对象<br />
UpdateRequest request = new UpdateRequest("items", "317578");<br />
//2.准备请求参数<br />
request.doc(<br />
"price", 58800,<br />
"commentCount", 1<br />
);<br />
//3.发送请求<br />
client.update(request, RequestOptions.DEFAULT);<br />
}</td>
</tr>
</tbody>
</table>

**5.5 批量导入文档**

之前案例都是操作单个文档，而数据库中的商品数据实际会达到数十万条，某些项目中可能达到数百万条。如果要将这些数据导入索引库，肯定不能逐条导入，而是采用批处理方案，常见的方案有：

利用Logstash批量导入

需要安装Logstash

对数据的再加工能力较弱

无需编码，但要学习编写Logstash导入配置

利用JavaAPI批量导入

需要编码，但基于JavaAPI，学习成本低

更加灵活，可以任意对数据做再加工处理后写入索引库

**5.5.1 语法说明**

批处理与前面讲的文档的CRUD步骤基本一致：

创建Request，但这次用的是BulkRequest

准备请求参数

发送请求，这次要用到client.bulk()方法

BulkRequest本身其实并没有请求参数，其本质就是将多个普通的CRUD请求组合在一起发送，例如：

批量新增文档，就是给每个文档创建一个IndexRequest请求，然后封装到BulkRequest中，一起发出

批量删除，就是创建N个DeleteRequest请求，然后封装到BulkRequest，一起发出

因此BulkRequest中提供了add方法，用以添加其它CRUD的请求：

<img src="../assets/SpringCloud笔记/media/image199.png" style="width:5.75in;height:2.17708in" />

可以看到，能添加的请求有：

IndexRequest，也就是新增

UpdateRequest，也就是修改

DeleteRequest，也就是删除

因此Bulk中添加了多个IndexRequest，就是批量新增功能了，示例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testBulk() throws IOException {<br />
// 1.创建Request<br />
BulkRequest request = new BulkRequest();<br />
// 2.准备请求参数<br />
request.add(new IndexRequest("items").id("1").source("json doc1", XContentType.JSON));<br />
request.add(new IndexRequest("items").id("2").source("json doc2", XContentType.JSON));<br />
// 3.发送请求<br />
client.bulk(request, RequestOptions.DEFAULT);<br />
}</td>
</tr>
</tbody>
</table>

**5.5.2 完整代码**

由于商品数量达到数十万，因此不可能一次性全部导入，建议采用循环遍历方式，每次导入1000条左右的数据。

item-service的DocumentTest测试类中，编写单元测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//批量导入商品数据<br />
@Test<br />
public void testLoadItemDocs() throws IOException {<br />
//分页查询参数<br />
int pageNo = 1, pageSize = 1000;<br />
while (true) {<br />
//分页查询商品信息<br />
Page&lt;Item&gt; page = itemService.lambdaQuery().eq(Item::getStatus, 1).page(new Page&lt;Item&gt;(pageNo, pageSize));<br />
//非空判断<br />
List&lt;Item&gt; itemList = page.getRecords();<br />
if (CollUtils.isEmpty(itemList)) {<br />
return;<br />
}<br />
log.info("当前加载第 {} 页数据，加载 {} 条", pageNo, itemList.size());<br />
<br />
//1.准备Request对象<br />
BulkRequest bulkRequest = new BulkRequest("items");<br />
//2.准备参数，添加多个IndexRequest<br />
for (Item item : itemList) {<br />
//2.1.转换文档类型ItemDoc<br />
ItemDoc itemDoc = BeanUtil.copyProperties(item, ItemDoc.class);<br />
//2.1.准备IndexRequest<br />
IndexRequest indexRequest = new IndexRequest("items")<br />
.id(itemDoc.getId())<br />
.source(JSONUtil.toJsonStr(itemDoc), XContentType.JSON);<br />
//2.2.将新增Request添加到BulkRequest对象<br />
bulkRequest.add(indexRequest);<br />
}<br />
//3.发送请求<br />
client.bulk(bulkRequest, RequestOptions.DEFAULT);<br />
//4.翻页<br />
pageNo++;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**5.6 总结**

文档操作的基本步骤：

初始化RestHighLevelClient

创建XxxRequest

XXX是Index、Get、Update、Delete、Bulk

准备参数（Index、Update、Bulk时需要）

发送请求

调用RestHighLevelClient#.xxx()方法，xxx是index、get、update、delete、bulk

解析结果（Get时需要）

**6.DSL查询**

Elasticsearch的查询可以分为两大类：

**叶子查询（Leaf** **query** **clauses）**：一般是在特定的字段里查询特定值，属于简单查询，很少单独使用

**复合查询（Compound** **query** **clauses）**：以逻辑方式组合多个叶子查询或者更改叶子查询的行为方式

**6.1 快速入门**

查询的语法结构：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /{索引库名}/_search<br />
{<br />
"query": {<br />
"查询类型": {<br />
// .. 查询条件<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

以最简单的**无条件查询**为例，无条件查询的类型是match_all，因此其查询语句如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# DSL无条件查询<br />
GET /items/_search<br />
{<br />
"query": {<br />
"match_all": {<br />
<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

由于match_all无条件，所以条件位置不写即可，执行结果如下：

<img src="../assets/SpringCloud笔记/media/image200.png" style="width:5.75in;height:2.98958in" />

虽然是match_all，但是响应结果中并不会包含索引库中的所有文档，而是仅有10条。这是因为出于安全考虑，elasticsearch设置了默认的查询页数。

**6.2 叶子查询**

叶子查询的类型也可以进一步细分，详情查看官方文档：

**\[该类型的内容暂不支持下载\]**

这里列举一些常见的，例如：

**全文检索查询（Full Text Queries）**：利用分词器对用户输入搜索条件先分词，得到词条，然后再利用倒排索引搜索词条，例如：

match

multi_match

**精确查询（Term-level queries）**：不对用户输入搜索条件分词，根据字段内容精确值匹配，但只能查找keyword、数值、日期、boolean类型的字段，例如：

ids

term

range

**地理坐标查询：**用于搜索地理位置，搜索方式很多，例如：

geo_bounding_box：按矩形搜索

geo_distance：按点和半径搜索

**6.2.1 全文检索查询**

全文检索的种类也很多，详情参考官方文档：

**\[该类型的内容暂不支持下载\]**

以全文检索中的**match**为例，语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /{索引库名}/_search<br />
{<br />
"query": {<br />
"match": {<br />
"字段名": "搜索条件"<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 1）单字段查询<br />
GET /items/_search<br />
{<br />
"query": {<br />
"match": {<br />
"name": "华为荣耀"<br />
}<br />
}<br />
}<br />
<br />
# 响应结果<br />
{<br />
"took" : 1097,<br />
"timed_out" : false,<br />
"_shards" : {<br />
"total" : 1,<br />
"successful" : 1,<br />
"skipped" : 0,<br />
"failed" : 0<br />
},<br />
"hits" : {<br />
"total" : {<br />
"value" : 7119,<br />
"relation" : "eq"<br />
},<br />
"max_score" : 9.14279,<br />
"hits" : [<br />
{<br />
"_index" : "items",<br />
"_type" : "_doc",<br />
"_id" : "39274582877",<br />
"_score" : 9.14279,<br />
"_source" : {<br />
"id" : "39274582877",<br />
"name" : "华为（HUAWEI） 荣耀V20 华为荣耀手机 幻夜黑 全网通(6G+128G)",<br />
"price" : 14800,<br />
"image" : "https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/22244/34/2984/753889/5c235ae0Ef90aa477/a4b2fe1f88a94ca5.png!q70.jpg.webp",<br />
"category" : "手机",<br />
"brand" : "华为",<br />
"sold" : 0,<br />
"commentCount" : 0,<br />
"isAD" : false,<br />
"updateTime" : 1556640000000<br />
}<br />
},<br />
...<br />
]<br />
<br />
}<br />
}</td>
</tr>
</tbody>
</table>

与match类似的还有**multi_match**，区别在于可以同时对多个字段搜索，满足其中一个字段即可，语法示例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /{索引库名}/_search<br />
{<br />
"query": {<br />
"multi_match": {<br />
"query": "搜索条件",<br />
"fields": ["字段1", "字段2"]<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 2）多字段查询<br />
GET /items/_search<br />
{<br />
"query": {<br />
"multi_match": {<br />
"query": "华为",<br />
"fields": ["name", "brand"]<br />
}<br />
}<br />
}<br />
<br />
# 响应结果<br />
{<br />
"took" : 203,<br />
"timed_out" : false,<br />
"_shards" : {<br />
"total" : 1,<br />
"successful" : 1,<br />
"skipped" : 0,<br />
"failed" : 0<br />
},<br />
"hits" : {<br />
"total" : {<br />
"value" : 7145,<br />
"relation" : "eq"<br />
},<br />
"max_score" : 4.4712634,<br />
"hits" : [<br />
{<br />
"_index" : "items",<br />
"_type" : "_doc",<br />
"_id" : "5935273",<br />
"_score" : 4.4712634,<br />
"_source" : {<br />
"id" : "5935273",<br />
"name" : "华为 HUAWEI 礼品-华为水杯（颜色随机）",<br />
"price" : 90700,<br />
"image" : "https://m.360buyimg.com/mobilecms/s720x720_jfs/t12232/181/1792511853/125048/24976f1b/5a28d6d9N735d76a7.jpg!q70.jpg.webp",<br />
"category" : "手机",<br />
"brand" : "华为",<br />
"sold" : 0,<br />
"commentCount" : 0,<br />
"isAD" : false,<br />
"updateTime" : 1556640000000<br />
}<br />
},<br />
...<br />
]<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**6.2.2 精确查询**

精确查询，即词条级别的查询，也就是说不会对用户输入的搜索条件再分词，而是作为一个词条，与搜索的字段内容精确值匹配，因此推荐查找keyword、数值、日期、boolean类型的字段，例如：id、price、城市、地名、人名等作为一个整体才有含义的字段。

详情可以查看官方文档：

**\[该类型的内容暂不支持下载\]**

以**term**查询为例，其语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /{索引库名}/_search<br />
{<br />
"query": {<br />
"term": {<br />
"字段名": {<br />
"value": "搜索条件"<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 1）字段查询<br />
GET /items/_search<br />
{<br />
"query": {<br />
"term": {<br />
"brand": {<br />
"value": "小米"<br />
}<br />
}<br />
}<br />
}<br />
<br />
# 响应结果<br />
{<br />
"took" : 75,<br />
"timed_out" : false,<br />
"_shards" : {<br />
"total" : 1,<br />
"successful" : 1,<br />
"skipped" : 0,<br />
"failed" : 0<br />
},<br />
"hits" : {<br />
"total" : {<br />
"value" : 1498,<br />
"relation" : "eq"<br />
},<br />
"max_score" : 4.0782666,<br />
"hits" : [<br />
{<br />
"_index" : "items",<br />
"_type" : "_doc",<br />
"_id" : "3315699",<br />
"_score" : 4.0782666,<br />
"_source" : {<br />
"id" : "3315699",<br />
"name" : "小米（MI）米兔定位电话 防丢GPS定位器 车辆防盗器 儿童老人微型跟踪器 追踪器 高精度实时位置查看",<br />
"price" : 72500,<br />
"image" : "https://m.360buyimg.com/mobilecms/s720x720_jfs/t5812/112/2261117990/127001/21ab6ecb/592facfeN1314ed76.jpg!q70.jpg.webp",<br />
"category" : "手机",<br />
"brand" : "小米",<br />
"sold" : 0,<br />
"commentCount" : 0,<br />
"isAD" : false,<br />
"updateTime" : 1556640000000<br />
}<br />
},<br />
...<br />
]<br />
}<br />
}</td>
</tr>
</tbody>
</table>

当输入的搜索条件不是词条，而是短语时，由于不做分词，反而搜索不到：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 1）字段查询<br />
GET /items/_search<br />
{<br />
"query": {<br />
"term": {<br />
"brand": {<br />
"value": "华为 小米"<br />
}<br />
}<br />
}<br />
}<br />
<br />
# 响应结果<br />
{<br />
"took" : 21,<br />
"timed_out" : false,<br />
"_shards" : {<br />
"total" : 1,<br />
"successful" : 1,<br />
"skipped" : 0,<br />
"failed" : 0<br />
},<br />
"hits" : {<br />
"total" : {<br />
"value" : 0,<br />
"relation" : "eq"<br />
},<br />
"max_score" : null,<br />
"hits" : [ ]<br />
}<br />
}</td>
</tr>
</tbody>
</table>

再来看下**range**查询，语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /{索引库名}/_search<br />
{<br />
"query": {<br />
"range": {<br />
"字段名": {<br />
"gte": {最小值},<br />
"lte": {最大值}<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

range是范围查询，对于范围筛选的关键字有：

gte：大于等于

gt：大于

lte：小于等于

lt：小于

**示例：**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 2）范围查询<br />
GET /items/_search<br />
{<br />
"query": {<br />
"range": {<br />
"price": {<br />
"gte": 100,<br />
"lte": 500<br />
}<br />
}<br />
}<br />
}<br />
<br />
# 响应结果<br />
{<br />
"took" : 13,<br />
"timed_out" : false,<br />
"_shards" : {<br />
"total" : 1,<br />
"successful" : 1,<br />
"skipped" : 0,<br />
"failed" : 0<br />
},<br />
"hits" : {<br />
"total" : {<br />
"value" : 493,<br />
"relation" : "eq"<br />
},<br />
"max_score" : 1.0,<br />
"hits" : [<br />
{<br />
"_index" : "items",<br />
"_type" : "_doc",<br />
"_id" : "2188607",<br />
"_score" : 1.0,<br />
"_source" : {<br />
"id" : "2188607",<br />
"name" : "爱华仕（OIWAS）飞机轮拉杆箱6193 铝框海关密码锁行李箱 商务出差旅行硬箱 24英寸黑色",<br />
"price" : 300,<br />
"image" : "https://m.360buyimg.com/mobilecms/s720x720_jfs/t9079/42/1920530308/177611/82256ecf/59c0bf3dN6a512a50.jpg!q70.jpg.webp",<br />
"category" : "拉杆箱",<br />
"brand" : "爱华仕",<br />
"sold" : 0,<br />
"commentCount" : 0,<br />
"isAD" : false,<br />
"updateTime" : 1556640000000<br />
}<br />
},<br />
...<br />
]<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**6.3 复合查询**

复合查询大致可以分为两类：

第一类：基于逻辑运算组合叶子查询，实现组合条件，例如

bool

第二类：基于某种算法修改查询时的文档相关性算分，从而改变文档排名，例如：

function_score

dis_max

其它复合查询语法参考官方文档：

**\[该类型的内容暂不支持下载\]**

**6.3.1 算分函数查询**

利用match查询时，文档结果会根据与搜索词条的**关联度打分**（**\_score**），返回结果时按照分值降序排列。

例如，搜索 "手机"，结果如下：

<img src="../assets/SpringCloud笔记/media/image201.png" style="width:5.75in;height:3.55208in" />

从elasticsearch5.1开始，采用的相关性打分算法是BM25算法，公式如下：

<img src="../assets/SpringCloud笔记/media/image202.png" style="width:5.75in;height:1.03125in" />

基于这套公式，就可以判断出某个文档与用户搜索的关键字之间的关联度，还是比较准确的，但在实际业务需求中，常常会有竞价排名的功能，不是相关度越高排名越靠前，而是掏的钱多的排名靠前。例如在百度中搜索Java培训，排名靠前的就是广告推广：

<img src="../assets/SpringCloud笔记/media/image203.png" style="width:5.75in;height:1.38542in" />

要想人为控制相关性算分，就需要利用elasticsearch中的function score 查询。

**基本语法**：

function score 查询中包含四部分内容：

**原始查询**条件：query部分，基于这个条件搜索文档，并且基于BM25算法给文档打分，**原始算分**（query score)

**过滤条件**：filter部分，符合该条件的文档才会重新算分

**算分函数**：符合filter条件的文档要根据这个函数做运算，得到的**函数算分**（function score），有四种函数

weight：函数结果是常量

field_value_factor：以文档中的某个字段值作为函数结果

random_score：以随机数作为函数结果

script_score：自定义算分函数算法

**运算模式**：算分函数的结果、原始查询的相关性算分，两者之间的运算方式，包括：

multiply：相乘

replace：用function score替换query score

其它，例如：sum、avg、max、min

function score的运行流程如下：

1）根据**原始条件**查询搜索文档，并且计算相关性算分，称为**原始算分**（query score）

2）根据**过滤条件**，过滤文档

3）符合**过滤条件**的文档，基于**算分函数**运算，得到**函数算分**（function score）

4）将**原始算分**（query score）和**函数算分**（function score）基于**运算模式**做运算，得到最终结果，作为相关性算分

因此，其中的关键点是：

过滤条件：决定哪些文档的算分被修改

算分函数：决定函数算分的算法

运算模式：决定最终算分结果

**示例**：给Apple这个品牌的手机算分提高十倍，分析如下：

过滤条件：品牌必须为Apple

算分函数：常量weight，值为10

算分模式：相乘multiply

对应代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
#算分函数查询<br />
GET /items/_search<br />
{<br />
"query": {<br />
"function_score": {<br />
"query": {<br />
"multi_match": {<br />
"query": "Apple手机华为手机",<br />
"fields": ["brand", "name"]<br />
}<br />
},<br />
"functions": [<br />
{<br />
"filter": {<br />
"term": {<br />
"brand": "Apple"<br />
}<br />
},<br />
"weight": 10<br />
}<br />
],<br />
"boost_mode": "multiply"<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**6.3.2 bool查询**

bool查询，即布尔查询，就是利用逻辑运算来组合一个或多个查询子句的组合。bool查询支持的逻辑运算有：

must：必须匹配每个子查询，类似“与”

should：选择性匹配子查询，类似“或”

must_not：必须不匹配，**不参与算分**，类似“非”

filter：必须匹配，**不参与算分**

bool查询的语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /items/_search<br />
{<br />
"query": {<br />
"bool": {<br />
"must": [<br />
{"match": {"name": "手机"}}<br />
],<br />
"should": [<br />
{"term": {"brand": { "value": "vivo" }}},<br />
{"term": {"brand": { "value": "小米" }}}<br />
],<br />
"must_not": [<br />
{"range": {"price": {"gte": 2500}}}<br />
],<br />
"filter": [<br />
{"range": {"price": {"lte": 1000}}}<br />
]<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

出于性能考虑，与搜索关键字无关的查询尽量采用must_not或filter逻辑运算，避免参与相关性算分，例如黑马商城的搜索页面：

<img src="../assets/SpringCloud笔记/media/image204.png" style="width:5.75in;height:1.46875in" />

其中输入框的搜索条件肯定要参与相关性算分，可以采用match，但是价格范围过滤、品牌过滤、分类过滤等尽量采用filter，不要参与相关性算分。

比如搜索手机，但品牌必须是华为，价格必须是900~1599，那么可以这样写：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /items/_search<br />
{<br />
"query": {<br />
"bool": {<br />
"must": [<br />
{"match": {"name": "手机"}}<br />
],<br />
"filter": [<br />
{"term": {"brand": { "value": "华为" }}},<br />
{"range": {"price": {"gte": 90000, "lt": 159900}}}<br />
]<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**6.4 排序**

elasticsearch默认是根据相关度算分（\_score）来排序，但是也支持自定义方式对搜索结果排序，不过分词字段无法排序，能参与排序字段类型有：keyword类型、数值类型、地理坐标类型、日期类型等。

详细说明参考官方文档：

**\[该类型的内容暂不支持下载\]**

语法说明：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /indexName/_search<br />
{<br />
"query": {<br />
"match_all": {}<br />
},<br />
"sort": [<br />
{<br />
"排序字段": {<br />
"order": "排序方式asc和desc"<br />
}<br />
}<br />
]<br />
}</td>
</tr>
</tbody>
</table>

sort的值是一个数组，指定多个排序的字段。

示例，按照商品价格排序：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /items/_search<br />
{<br />
"query": {<br />
"match_all": {}<br />
},<br />
"sort": [<br />
{<br />
"price": {<br />
"order": "desc"<br />
}<br />
}<br />
]<br />
}</td>
</tr>
</tbody>
</table>

**6.5 分页**

elasticsearch 默认情况下只返回top10的数据，而如果要查询更多数据就需要修改分页参数了。

**6.5.1 基础分页**

elasticsearch中通过修改from、size参数来控制要返回的分页结果，类似于mysql中的limit ?, ?：

from：从第几个文档开始，假设页码pageNo，则 from = (pageNo - 1) \* size

size：总共查询几个文档

官方文档如下：

**\[该类型的内容暂不支持下载\]**

语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /items/_search<br />
{<br />
"query": {<br />
"match_all": {}<br />
},<br />
"from": 0, // 分页开始的位置，默认为0<br />
"size": 10, // 每页文档数量，默认10<br />
"sort": [<br />
{<br />
"price": {<br />
"order": "desc"<br />
}<br />
}<br />
]<br />
}</td>
</tr>
</tbody>
</table>

**6.5.2 深度分页**

elasticsearch的数据一般会采用分片存储，也就是把一个索引中的数据分成N份，存储到不同节点上。这种存储方式比较有利于数据扩展，但给分页带来了一些麻烦。比如一个索引库中有100000条数据，分别存储到4个分片，每个分片25000条数据，现在每页查询10条，查询第99页，那么分页查询的条件如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
GET /items/_search<br />
{<br />
"from": 990, // 从第990条开始查询<br />
"size": 10, // 每页查询10条<br />
"sort": [<br />
{<br />
"price": "asc"<br />
}<br />
]<br />
}</td>
</tr>
</tbody>
</table>

要查询第990~1000名的数据，需要将所有数据排序，找出前1000名，截取其中的990~1000的部分，但如何才能找到所有数据中的前1000名呢？要知道每一片的数据都不一样，第1片上的第900~1000，在另1个节点上并不一定依然是900~1000名，所以只能在每一个分片上都找出排名前1000的数据，然后汇总到一起，重新排序，才能找出整个索引库中真正的前1000名，此时截取990~1000的数据即可。

如图：

<img src="../assets/SpringCloud笔记/media/image205.png" style="width:5.75in;height:2.19792in" />

假如要查询的是第999页数据，也就是要找第9990~10000的数据，就需要把每个分片中的前10000名数据都查询出来，汇总在一起，在内存中排序？如果查询的分页深度更深，需要一次检索的数据会更多，由此可知，当查询分页深度较大时，汇总数据过多，对内存和CPU会产生非常大的压力。因此elasticsearch会禁止from+ size超过10000的请求。

针对深度分页，elasticsearch提供了两种解决方案：

search after：分页时需要排序，原理是从上一次的排序值开始，查询下一页数据，官方推荐使用的方式

优点：没有查询上限，支持深度分页

场景：数据迁移、手机滚动查询

scroll：原理将排序后的文档id形成快照，保存下来，基于快照做分页，官方已经不推荐使用

详情见文档：

**\[该类型的内容暂不支持下载\]**

大多数情况下采用普通分页就可以了，像百度、京东等网站其分页都有限制，例如百度最多支持77页，每页不足20条；京东最多100页，每页最多60条。因此，一般采用限制分页深度的方式即可，无需实现深度分页。

**6.6 高亮**

高亮查询与前面的查询有两点不同：

条件同样是在request.source()中指定，只不过高亮条件要基于HighlightBuilder来构造

高亮响应结果与搜索的文档结果不在一起，需要单独解析

首先来看高亮条件构造，其DSL和JavaAPI的对比如图：

<img src="../assets/SpringCloud笔记/media/image206.png" style="width:5.75in;height:2.45833in" />

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//高亮显示<br />
@Test<br />
void testHighlight() throws IOException {<br />
//1.创建Request<br />
SearchRequest request = new SearchRequest("items");<br />
//2.组织请求参数<br />
//2.1.query条件<br />
request.source().query(QueryBuilders.matchQuery("name", "脱脂牛奶"));<br />
//2.2.高亮条件<br />
request.source().highlighter(<br />
SearchSourceBuilder.highlight()<br />
.field("name")<br />
.preTags("&lt;em&gt;")<br />
.postTags("&lt;/em&gt;")<br />
);<br />
//3.发送请求<br />
SearchResponse response = client.search(request, RequestOptions.DEFAULT);<br />
//4.解析响应<br />
handleResponse(response);<br />
}</td>
</tr>
</tbody>
</table>

结果解析的文档解析的部分不变，主要是高亮内容需要单独解析出来，其DSL和JavaAPI的对比如图：

<img src="../assets/SpringCloud笔记/media/image207.png" style="width:5.75in;height:2.39583in" />

代码解读：

第3、4步：从结果中获取_source，hit.getSourceAsString()，这部分是非高亮结果，json字符串，还需要反序列为ItemDoc对象

第5步：获取高亮结果，hit.getHighlightFields()，返回值是一个Map，key是高亮字段名称，值是HighlightField对象，代表高亮值

第5.1步：从Map中根据高亮字段名称，获取高亮字段值对象HighlightField

第5.2步：从HighlightField中获取Fragments，并且转为字符串。这部分就是真正的高亮字符串了

最后：用高亮的结果替换ItemDoc中的非高亮结果

完整代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//解析查询结果<br />
private void handleResponse(SearchResponse response) {<br />
SearchHits searchHits = response.getHits();<br />
//1.获取总条数<br />
long total = searchHits.getTotalHits().value;<br />
System.out.println("共搜索到" + total + "条数据");<br />
//2.遍历结果数组<br />
SearchHit[] hits = searchHits.getHits();<br />
int rows = 1; //文档序号，方便打印结果中查看查询文档序号<br />
for (SearchHit hit : hits) {<br />
//3.得到_source，即原始数据JSON文档<br />
String source = hit.getSourceAsString();<br />
//4.反序列化原始数据（不含em标签）<br />
ItemDoc itemDoc = JSONUtil.toBean(source, ItemDoc.class);<br />
//5.获取高亮结果<br />
Map&lt;String, HighlightField&gt; hfs = hit.getHighlightFields();<br />
//有高亮结果获取高亮结果替换原始数据<br />
if(CollUtils.isNotEmpty(hfs)){<br />
HighlightField hf = hfs.get("name");<br />
if(hf != null){<br />
String hfName = hf.getFragments()[0].string();<br />
itemDoc.setName(hfName);<br />
}<br />
}<br />
//打印商品信息<br />
System.out.println(rows + ": " + itemDoc);<br />
rows++;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**hf.getFragments()解读**：

hf.getFragments()会将高亮结果字符串按照**每一处匹配**生成一个独立的片段，并按相关性排序，返回多个片段，最终会得到一个Fragment\[\] 数组，例如对于高亮结果\<em\>脱脂牛奶\</em\>是一种健康饮品。早餐时喝\<em\>脱脂牛奶\</em\>很好。此外，\<em\>脱脂牛奶\</em\>也适合烘焙...，最终可能分片成：

\<em\>脱脂牛奶\</em\>是一种健康饮品

早餐时喝\<em\>脱脂牛奶\</em\>很好

此外，\<em\>脱脂牛奶\</em\>也适合烘焙

总共三个片段，但在实际中其实这里会将整个高亮结果作为一个片段，原因在分段规则，getFragments()的默认规则如下：

最多生成的高亮片段数量number_of_fragments为5，即数组长度最大为5

每个高亮片段的大致长度fragment_size为100，即每个片段最多100字符

如果高亮结果长度超过500，将分段结果按相关性排序，只取相关性最高的5个片段

当然，我们也可以自定义分段规则，只需要构造高亮结果时添加几行代码就可以：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//2.2.高亮条件<br />
request.source().highlighter(<br />
SearchSourceBuilder.highlight()<br />
.field("name")<br />
.fragmentSize(200) //每个片段的最大长度<br />
.numOfFragments(10) //返回的最大片段数量,0表示不做分段，整个高亮结果为一个分段<br />
.preTags("&lt;em&gt;")<br />
.postTags("&lt;/em&gt;")<br />
);</td>
</tr>
</tbody>
</table>

到这里就可以知道为什么String hfName = hf.getFragments()\[0\].string()就能得到所有高亮结果了，如果有强迫也可以把这段代码换成下面的：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
String hfName = StrUtil.join("", (Object) hf.getFragments());</td>
</tr>
</tbody>
</table>

**7.数据聚合**

聚合（aggregations）可以极其方便的实现对数据的统计、分析、运算，例如：

什么品牌的手机最受欢迎？

这些手机的平均价格、最高价格、最低价格？

这些手机每月的销售情况如何？

实现这些统计功能的比数据库的sql要方便的多，而且查询速度非常快，可以实现近实时搜索效果。

官方文档：

**\[该类型的内容暂不支持下载\]**

聚合常见的有三类：

**桶（Bucket）聚合**：用来对文档做分组

TermAggregation：按照文档字段值分组，例如按照品牌值分组、按照国家分组

Date Histogram：按照日期阶梯分组，例如一周为一组，或者一月为一组

**度量（Metric）聚合**：用以计算一些值，比如最大值、最小值、平均值等

Avg：求平均值

Max：求最大值

Min：求最小值

Stats：同时求max、min、avg、sum等

**管道（pipeline）聚合**：其它聚合的结果为基础做进一步运算

|                                                               |
|---------------------------------------------------------------|
| **注意：**参加聚合的字段必须是keyword、日期、数值、布尔类型。 |

**7.1 DSL实现聚合**

**7.1.1 Bucket聚合**

例如统计所有商品中共有哪些商品分类，其实就是以分类（category）字段对数据分组，category值一样的放在同一组，属于Bucket聚合中的Term聚合。

基本语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# Bucket聚合<br />
GET /items/_search<br />
{<br />
"size": 0,<br />
"aggs": {<br />
"category_agg": {<br />
"terms": {<br />
"field": "category",<br />
"size": 20<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

size：设置size为0，就是每页查0条，则结果中就不包含文档，只包含聚合

aggs：定义聚合

category_agg：聚合名称，自定义，但不能重复

terms：聚合的类型，按分类聚合，所以用term

field：参与聚合的字段名称

size：希望返回的聚合结果的最大数量

上述DSL其实就等价于如下SQL：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
select category, count(1) as doc_count from item group by category order by doc_count desc limit 0, 20;</td>
</tr>
</tbody>
</table>

查询结果如下：

<img src="../assets/SpringCloud笔记/media/image208.png" style="width:5.75in;height:2.5in" />

**7.1.2 带条件聚合**

默认情况下，Bucket聚合是对索引库的所有文档做聚合，例如我们统计商品中所有的品牌，结果如下：

<img src="../assets/SpringCloud笔记/media/image209.png" style="width:5.75in;height:2.11458in" />

可以看到统计出的品牌非常多，但真实场景下，用户会输入搜索条件，因此聚合必须是对搜索结果聚合，那么聚合必须添加限定条件。

例如，查询价格高于3000元的手机品牌，需要从需求中分析出搜索查询的条件和聚合的目标：

搜索查询条件：

价格高于3000

必须是手机

聚合目标：统计的是品牌，肯定是对brand字段做term聚合

语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# 带条件聚合<br />
GET /items/_search<br />
{<br />
"query": {<br />
"bool": {<br />
"filter": [<br />
{<br />
"term": {<br />
"category": "手机"<br />
}<br />
},<br />
{<br />
"range": {<br />
"price": {<br />
"gte": 300000<br />
}<br />
}<br />
}<br />
]<br />
}<br />
},<br />
"size": 0,<br />
"aggs": {<br />
"brand_agg": {<br />
"terms": {<br />
"field": "brand",<br />
"size": 20<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

可以看到，结果中只剩下3个品牌了：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"took" : 662,<br />
"timed_out" : false,<br />
"_shards" : {<br />
"total" : 1,<br />
"successful" : 1,<br />
"skipped" : 0,<br />
"failed" : 0<br />
},<br />
"hits" : {<br />
"total" : {<br />
"value" : 11,<br />
"relation" : "eq"<br />
},<br />
"max_score" : null,<br />
"hits" : [ ]<br />
},<br />
"aggregations" : {<br />
"brand_agg" : {<br />
"doc_count_error_upper_bound" : 0,<br />
"sum_other_doc_count" : 0,<br />
"buckets" : [<br />
{<br />
"key" : "Apple",<br />
"doc_count" : 7<br />
},<br />
{<br />
"key" : "华为",<br />
"doc_count" : 2<br />
},<br />
{<br />
"key" : "三星",<br />
"doc_count" : 1<br />
},<br />
{<br />
"key" : "小米",<br />
"doc_count" : 1<br />
}<br />
]<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**7.1.3 Metric聚合**

上节统计了价格高于3000的手机品牌，形成了一个个桶。现在需要对桶内的商品做运算，获取每个品牌价格的最小值、最大值、平均值，这就要用到Metric聚合，例如stats聚合，就可以同时获取min、max、avg等结果。

语法如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
# Metric聚合<br />
GET /items/_search<br />
{<br />
"query": {<br />
"bool": {<br />
"filter": [<br />
{<br />
"term": {<br />
"category": "手机"<br />
}<br />
},<br />
{<br />
"range": {<br />
"price": {<br />
"gte": 300000<br />
}<br />
}<br />
}<br />
]<br />
}<br />
},<br />
"size": 0,<br />
"aggs": {<br />
"brand_agg": {<br />
"terms": {<br />
"field": "brand",<br />
"size": 20<br />
},<br />
"aggs": {<br />
"stats_meric": {<br />
"stats": {<br />
"field": "price"<br />
}<br />
}<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

可以看到brand_agg聚合内部新加了一个aggs参数，这个聚合就是brand_agg的子聚合，会对brand_agg形成的每个桶中的文档分别统计

stats_meric：聚合名称

stats：聚合类型，stats是metric聚合的一种

field：聚合字段，这里选择price，统计价格

由于stats是对brand_agg形成的每个品牌桶内文档分别做统计，因此每个品牌都会统计出自己的价格最小、最大、平均值。

结果如下：

<img src="../assets/SpringCloud笔记/media/image210.png" style="width:5.75in;height:2.64583in" />

还可以让聚合按照每个品牌的价格平均值排序：

<img src="../assets/SpringCloud笔记/media/image211.png" style="width:5.75in;height:2.30208in" />

**7.1.4 总结**

aggs代表聚合，与query同级，此时query的作用是？

限定聚合的的文档范围

聚合必须的三要素：

聚合名称

聚合类型

聚合字段

聚合可配置属性有：

size：指定聚合结果数量

order：指定聚合结果排序方式

field：指定聚合字段

**7.2 RestClient实现聚合**

可以看到在DSL中，aggs聚合条件与query条件是同一级别，都属于查询JSON参数，因此依然是利用request.source()方法来设置，不过聚合条件的要利用AggregationBuilders这个工具类来构造。

DSL与JavaAPI的语法对比如下：

<img src="../assets/SpringCloud笔记/media/image212.png" style="width:5.75in;height:2.51042in" />

聚合结果与搜索文档同一级别，因此需要单独获取和解析，具体解析语法如下：

<img src="../assets/SpringCloud笔记/media/image213.png" style="width:5.75in;height:2.88542in" />

完整代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testAgg() throws IOException {<br />
//1.创建Request<br />
SearchRequest request = new SearchRequest("items");<br />
//2.准备请求参数<br />
BoolQueryBuilder bool = QueryBuilders.boolQuery()<br />
.filter(QueryBuilders.termQuery("category", "手机"))<br />
.filter(QueryBuilders.rangeQuery("price").gte(300000));<br />
request.source().query(bool).size(0);<br />
//3.聚合参数<br />
request.source().aggregation(<br />
AggregationBuilders.terms("brand_agg").field("brand").size(5)<br />
);<br />
//4.发送请求<br />
SearchResponse response = client.search(request, RequestOptions.DEFAULT);<br />
//5.解析聚合结果<br />
Aggregations aggregations = response.getAggregations();<br />
//5.1.获取品牌聚合<br />
Terms brandTerms = aggregations.get("brand_agg");<br />
//5.2.获取聚合中的桶<br />
List&lt;? extends Terms.Bucket&gt; buckets = brandTerms.getBuckets();<br />
//5.3.遍历桶内数据<br />
for (Terms.Bucket bucket : buckets) {<br />
//5.4.获取桶内key<br />
String brand = bucket.getKeyAsString();<br />
System.out.print("brand = " + brand);<br />
long count = bucket.getDocCount();<br />
System.out.println("; count = " + count);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**十三、微服务面试篇**

**1.分布式事务**

分布式事务是指不是在单个服务或单个数据库架构下，产生的事务，例如：

跨数据源的分布式事务

跨服务的分布式事务

综合情况

之前解决分布式事务问题是直接使用Seata框架的AT模式，但是解决分布式事务问题的方案远不止这一种。

**1.1 CAP定理**

1998年，加州大学的计算机科学家 Eric Brewer 提出，分布式系统有三个指标：

**C**onsistency（一致性）

**A**vailability（可用性）

**P**artition tolerance （分区容错性）

Eric Brewer认为**任何分布式系统架构方案都不可能同时满足这3个指标**，这个结论就叫做 CAP 定理。

**1.1.1 一致性**

Consistency（一致性）：用户访问分布式系统中的任意节点，得到的数据必须一致。

比如现在包含两个节点，其中的初始数据是一致的：

<img src="../assets/SpringCloud笔记/media/image214.png" style="width:5.75in;height:1.76042in" />

当修改其中一个节点的数据时，两者的数据产生了差异：

<img src="../assets/SpringCloud笔记/media/image215.png" style="width:5.75in;height:1.58333in" />

要想保证一致性，就必须实现node01 到 node02的数据同步：

<img src="../assets/SpringCloud笔记/media/image216.png" style="width:5.75in;height:1.5in" />

**1.1.2 可用性**

Availability （可用性）：用户访问分布式系统时，读或写操作总能成功。只能读不能写，或者只能写不能读，或者两者都不能执行，就说明系统弱可用或不可用。

**1.1.3 分区容错**

Partition，就是分区，就是当分布式系统节点之间出现网络故障导致节点之间无法通信的情况：

<img src="../assets/SpringCloud笔记/media/image217.png" style="width:5.75in;height:1.59375in" />

如上图，node01和node02之间网关畅通，但是与node03之间网络断开，于是node03成为一个独立的网络分区，node01和node02在一个网络分区。

Tolerance，就是容错，即便是系统出现网络分区，整个系统也要持续对外提供服务。

**1.1.4 矛盾**

在分布式系统中，网络不能100%保证畅通，也就是说网络分区的情况一定会存在，而系统必须要持续运行，对外提供服务，所以分区容错性（P）是硬性指标，所有分布式系统都要满足。而在设计分布式系统时要取舍的就是一致性（C）和可用性（A）了。

假如现在出现了网络分区，如图：

<img src="../assets/SpringCloud笔记/media/image218.png" style="width:5.75in;height:1.63542in" />

由于网络故障，当把数据写入node01时，可以与node02完成数据同步，但是无法同步给node03，现在有两种选择：

允许用户任意读写，保证可用性。但由于node03无法完成同步，就会出现数据不一致的情况，满足AP

不允许用户写，可以读，直到网络恢复，分区消失。这样就确保了一致性，但牺牲了可用性，满足CP

可见，在分布式系统中，A和C之间只能满足一个。

**1.2 BASE理论**

既然分布式系统要遵循CAP定理，那么该牺牲一致性还是可用性？人们在总结系统设计经验时，最终得到了一些心得：

**B**asically **A**vailable **（基本可用）**：分布式系统在出现故障时，允许损失部分可用性，即保证核心可用

**S**oft State（**软状态**）：在一定时间内，允许出现中间状态，比如临时的不一致状态

**E**ventually Consistent（**最终一致性**）：虽然无法保证强一致性，但是在软状态结束后，最终达到数据一致

以上就是BASE理论。简单来说，BASE理论就是一种取舍的方案，不再追求完美，而是最终达成目标，因此解决分布式事务的思想也是这样，有两个方向：

AP思想：各个子事务分别执行和提交，无需锁定数据。允许出现结果不一致，然后采用弥补措施恢复，实现最终一致即可，例如AT模式

CP思想：各个子事务执行后不要提交，而是等待彼此结果，然后同时提交或回滚。在这个过程中锁定资源，不允许其它人访问，数据处于不可用状态，但能保证一致性，例如XA模式

**1.3 AT模式的脏写问题**

官方文档：

**\[该类型的内容暂不支持下载\]**

AT模式分为两个阶段：

第一阶段是记录数据快照，执行并提交事务

第二阶段根据阶段一的结果来判断

如果每一个分支事务都成功，则事务已经结束（因为阶段一已经提交），因此删除阶段一的快照即可

如果有任意分支事务失败，则需要根据快照恢复到更新前数据，然后删除快照

<img src="../assets/SpringCloud笔记/media/image219.png" style="width:5.75in;height:2.95833in" />

这种模式在大多数情况下不会有问题，但在极端情况特别是多线程并发访问AT模式的分布式事务时，有可能出现脏写问题：

<img src="../assets/SpringCloud笔记/media/image220.png" style="width:5.75in;height:3in" />

假设初始时id为1的用户余额为100，事务1第一阶段执行完SQL扣减余额10元，提交数据库事务释放DB锁，此时数据库为90，第二阶段还未执行时事务2成功获取DB锁，此时事务1无法获取DB锁恢复数据（假设事务1提交事务后有异常导致需要恢复），就一直等待直到事务2第1阶段结束，此时数据库为80，然后事务1获取DB锁成功根据快照恢复数据，恢复后数据库变成100，此时就出现数据不一致，少扣了10元。

解决思路就是引入全局锁的概念，在释放DB锁之前，先拿到全局锁，避免同一时刻有另外一个事务来操作当前数据：

<img src="../assets/SpringCloud笔记/media/image221.png" style="width:5.75in;height:2.875in" />

事务1执行完SQL后先获取全局锁，然后提交事务释放DB锁，此时数据库为90，第二阶段还未执行时事务2成功获取DB锁，此时事务1无法获取DB锁恢复数据，就一直等待事务2释放DB锁，事务2执行完SQL后也尝试获取全局锁，但是此时全局锁在事务1中还未释放，而事务1又等待事务2释放DB锁，产生死锁，为了避免死锁一直等待，全局锁获取失败会不断重试，默认30次，间隔10ms，300ms后，事务2获取全局锁失败任务超时，回滚SQL并释放DB锁，然后事务1获取DB锁成功根据快照恢复数据为100。

虽然引入全局锁解决了多线程并发下的脏写问题，但是这是在事务2被seata全局事务管理的情况下，如果事务2未被全局事务管理，仍然可能出现脏写：

<img src="../assets/SpringCloud笔记/media/image222.png" style="width:5.75in;height:2.83333in" />

由于事务2没有被seata全局事务管理，所以提交事务前不需要获取全局锁，这时当事务2的DB锁释放后，事务1眼中的数据库为90，事务2眼中的数据库为80，然后事务1根据快照恢复数据为100，这时仍会导致少扣10元，数据不一致，所以，seata在保存快照时，保存了两份，一份是更新前的数据用于恢复数据（100），一份是更新后的数据（90）用于判断事务一在阶段1和阶段2这个过程中是否有其他事务操作过这个数据，经过对比更新后的数据快照90和此时数据库中的数据80不一致，则seata无法根据快照恢复数据，记录异常，由人工介入。

**1.4 TCC模式**

TCC模式与AT模式非常相似，每阶段都是独立事务，不同的是TCC通过人工编码来实现数据恢复，需要实现三个方法：

try：资源的检测和预留

confirm：完成资源操作业务，要求 try 成功 confirm 一定要能成功

cancel：预留资源释放，可以理解为try的反向操作

**1.4.1 流程分析**

例如一个扣减用户余额的业务，假设账户A原来余额是100，需要余额扣减30元。

**阶段一（ Try ）**：检查余额是否充足，如果充足则冻结金额增加30元，可用余额扣除30

<img src="../assets/SpringCloud笔记/media/image223.png" style="width:5.75in;height:0.47917in" />

此时，总金额 = 冻结金额 + 可用金额，数量依然是100不变，事务直接提交无需等待其它事务。

**阶段二（Confirm)**：假如要提交，之前可用金额已经扣减，并转移到冻结金额，因此可用金额不变，直接冻结金额扣减30即可：

<img src="../assets/SpringCloud笔记/media/image224.png" style="width:5.75in;height:0.45833in" />

此时，总金额 = 冻结金额 + 可用金额 = 0 + 70 = 70元。

**阶段二(Canncel)**：如果要回滚，则释放之前冻结的金额，也就是冻结金额扣减30，可用余额增加30

<img src="../assets/SpringCloud笔记/media/image225.png" style="width:5.75in;height:0.44792in" />

**1.4.2 TCC模型**

<img src="../assets/SpringCloud笔记/media/image226.png" style="width:5.75in;height:2.60417in" />

第一阶段：开启全局事务，然后调用并注册分支事务，执行try方法做资源预留，执行完try方法RM向TC报告自己的事务执行状态

第二阶段：当全局事务方法执行完后，TM像TC报告，TC检查各分支事务的执行状态决定是提交还是回滚

如果每个分支事务都正常执行，提示RM提交，RM执行confirm方法完成资源操作业务

否则提示RM回滚，RM执行cancel方法完成预留资源释放

**1.4.3 事务悬挂和空回滚**

假如一个分布式事务中包含两个分支事务，try阶段，一个分支成功执行，另一个分支事务**阻塞**：

<img src="../assets/SpringCloud笔记/media/image227.png" style="width:5.75in;height:2.94792in" />

如果阻塞时间太长，可能导致全局事务超时而触发二阶段的cancel操作，两个分支事务都会执行cancel操作：

<img src="../assets/SpringCloud笔记/media/image228.png" style="width:5.75in;height:3.0625in" />

要知道，其中一个分支是未执行try操作的，直接执行了cancel操作，反而会导致数据错误。这种情况下，尽管cancel方法要执行，但其中不能做任何回滚操作，这就是**空回滚**。

对于整个空回滚的分支事务，将来try方法阻塞结束依然会执行，但是整个全局事务其实已经结束了，因此永远不会再有confirm或cancel，也就是说这个事务执行了一半，处于**悬挂状态**，这就是业务悬挂问题。

**1.4.4 总结**

TCC模式的每个阶段是做什么的？

Try：资源检查和预留

Confirm：业务执行和提交

Cancel：预留资源的释放

TCC的优点是什么？

一阶段完成直接提交事务，释放数据库资源，性能好

相比AT模型，无需生成快照，无需使用全局锁，性能最强

不依赖数据库事务，而是依赖补偿操作，可以用于非事务型数据库

TCC的缺点是什么？

有代码侵入，需要人为编写try、Confirm和Cancel接口，太麻烦

软状态，事务是最终一致

需要考虑Confirm和Cancel的失败情况，做好幂等处理、事务悬挂和空回滚处理

**1.5 最大努力通知**

最大努力通知是一种最终一致性的分布式事务解决方案，顾名思义，就是通过消息通知的方式来通知事务参与者完成业务执行，如果执行失败会多次通知，无需任何分布式事务组件介入。说白了，最大努力通知其实就是基于消息队列的异步调用，尽最大可能将事件 / 消息通知到目标服务，但不保证 100% 送达。

<img src="../assets/SpringCloud笔记/media/image229.png" style="width:5.75in;height:1.98958in" />

**2.注册中心**

**2.1 环境隔离**

企业实际开发中，往往会搭建多个运行环境，例如开发环境、测试环境、预发布环境、生产环境，这些不同环境之间的服务和数据之间需要隔离。还有的企业中，会开发多个项目，共享nacos集群，此时，这些项目之间也需要把服务和数据隔离。

因此，Nacos提供了基于namespace的环境隔离功能，具体的隔离层次如图所示：

<img src="../assets/SpringCloud笔记/media/image230.png" style="width:5.75in;height:2.04167in" />

Nacos中可以配置多个namespace，相互之间完全隔离，默认的namespace名为public

namespace下还可以继续分组，也就是group ，相互隔离， 默认的group是DEFAULT_GROUP

group之下就是服务和配置了

**2.1.1 创建namespace**

nacos提供了一个默认的namespace，叫做public，默认所有服务和配置都属于这个namespace，也可以自己创建新的namespace：

<img src="../assets/SpringCloud笔记/media/image231.png" style="width:5.75in;height:1.39583in" />

然后填写表单：

<img src="../assets/SpringCloud笔记/media/image232.png" style="width:5.75in;height:2.34375in" />

添加完成后，可以在页面看到我们新建的namespace，并且Nacos为我们自动生成了一个命名空间id：

<img src="../assets/SpringCloud笔记/media/image233.png" style="width:5.75in;height:1.10417in" />

切换到配置列表页，你会发现dev这个命名空间下没有任何配置：

<img src="../assets/SpringCloud笔记/media/image234.png" style="width:5.75in;height:1.28125in" />

切换到public命名空间后就能看到我们之前添加的所有配置。

**2.1.2 微服务配置namespace**

默认情况下，所有的微服务注册发现、配置管理都是走public这个命名空间，如果要指定命名空间则需要修改application.yml文件，比如修改item-service服务的bootstrap.yml文件，添加服务发现配置，指定其namespace：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
application:<br />
name: item-service # 服务名称<br />
profiles:<br />
active: dev<br />
cloud:<br />
nacos:<br />
server-addr: 192.168.150.101 # nacos地址<br />
discovery: # 服务发现配置<br />
namespace: 39c0551e-b17b-46fd-8012-0c11c5cc5d6c # 设置namespace，必须用id<br />
# ...略</td>
</tr>
</tbody>
</table>

启动item-service，查看服务列表，会发现item-service出现在dev下：

<img src="../assets/SpringCloud笔记/media/image235.png" style="width:5.75in;height:1.44792in" />

而其它服务则出现在public下：

<img src="../assets/SpringCloud笔记/media/image236.png" style="width:5.75in;height:1.625in" />

此时访问http://localhost:8082/doc.html，基于swagger做测试：

<img src="../assets/SpringCloud笔记/media/image237.png" style="width:5.75in;height:2.38542in" />

会发现查询结果中缺少商品的最新价格信息，查看服务运行日志：

<img src="../assets/SpringCloud笔记/media/image238.png" style="width:5.75in;height:0.60417in" />

会发现cart-service服务在远程调用item-service时，并没有找到可用的实例，这证明不同namespace之间确实是相互隔离的，不可访问。把namespace切换回public，或者统一都是以dev时访问恢复正常。

**2.2 分级模型**

在一些大型应用中，同一个服务可以部署很多实例，这些实例可能分布在全国各地的不同机房，由于存在地域差异，网络传输的速度会有很大不同，因此在做服务治理时需要区分不同机房的实例。

例如item-service，我们可以部署3个实例：

127.0.0.1:8081，在上海机房

127.0.0.1:8082，在上海机房

127.0.0.1:8083，在杭州机房

Nacos中提供了集群（cluster）的概念，来对应不同机房，也就是说，一个服务（service）下可以有很多集群（cluster），而一个集群（cluster）中下又可以包含很多实例（instance）

<img src="../assets/SpringCloud笔记/media/image239.png" style="width:5.75in;height:2.64583in" />

结合namespace命名空间，任何一个微服务的实例在注册到Nacos时，都会生成以下几个信息，用来确认当前实例的身份，从外到内依次是：

namespace：命名空间

group：分组

service：服务名

cluster：集群

instance：实例，包含ip和端口

这就是nacos中的服务**分级模型**。

在Nacos内部会有一个服务实例的注册表，是基于Map实现的，其结构与分级模型的对应关系如下：

<img src="../assets/SpringCloud笔记/media/image240.png" style="width:5.75in;height:2.39583in" />

查看nacos控制台，会发现默认情况下所有服务的集群都是DEFAULT：

<img src="../assets/SpringCloud笔记/media/image241.png" style="width:5.75in;height:2.79167in" />

要修改服务所在集群，只需要修改bootstrap.yml即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
cloud:<br />
nacos:<br />
discovery:<br />
cluster-name: BJ # 集群名称，自定义</td>
</tr>
</tbody>
</table>

修改item-service的bootstrap.yml，然后重新创建一个实例：

<img src="../assets/SpringCloud笔记/media/image242.png" style="width:5.75in;height:1.20833in" />

再次查看nacos，发现8084这个新的实例确实属于BJ这个集群了：

<img src="../assets/SpringCloud笔记/media/image243.png" style="width:5.75in;height:2.88542in" />

**2.3 Eureka**

Eureka是Netflix公司开源的一个服务注册中心组件，早期版本的SpringCloud都是使用Eureka作为注册中心，由于Eureka和Nacos的starter中提供的功能都是基于SpringCloudCommon规范，因此两者使用起来差别不大。

**2.3.1 启动Eureka**

**\[cloud-demo.zip\]**

用IDEA打开资料中提供的cloud-demo项目，项目结构如下：

<img src="../assets/SpringCloud笔记/media/image244.png" style="width:5.75in;height:1.0625in" />

eureka-server：Eureka的服务端，也就是注册中心，没错，Eureka服务端要自己创建项目

order-service：订单服务，是一个服务调用者，查询订单的时候要查询用户

user-service：用户服务，是一个服务提供者，对外暴露查询用户的接口

启动以后，访问http://localhost:10086即可查看到Eureka的控制台，相对于Nacos来说简陋了很多：

<img src="../assets/SpringCloud笔记/media/image245.png" style="width:5.75in;height:3.0625in" />

**2.3.2 微服务集成Eureka**

微服务引入Eureka的方式也极其简单，分两步：

在item-service服务和cart-service服务中引入eureka-client的依赖，为了方式Nacos干扰，注释掉原来的nacos依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--nacos--&gt;<br />
&lt;!--&lt;dependency&gt;<br />
&lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-alibaba-nacos-discovery&lt;/artifactId&gt;<br />
&lt;/dependency&gt;--&gt;<br />
<br />
&lt;!--Eureka--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-cloud-starter-netflix-eureka-client&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**注意**：这里eureka-client的依赖要放在最后引入服务才能正常启动。

在item-service服务和cart-service服务的bootstrap.yml文件中分别配置Eureka地址：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
eureka:<br />
client:<br />
service-url:<br />
defaultZone: http://127.0.0.1:10086/eureka</td>
</tr>
</tbody>
</table>

启动这两个服务后就能看到Eureka控制台中多了两个实例：

<img src="../assets/SpringCloud笔记/media/image246.png" style="width:5.75in;height:0.85417in" />

进行接口测试也发现没有问题：

<img src="../assets/SpringCloud笔记/media/image247.png" style="width:5.75in;height:2.375in" />

**2.4 Eureka和Nacos对比**

Eureka和Nacos都能起到注册中心的作用，用法基本类似，但还是有一些区别，例如：

Nacos支持配置管理，而Eureka则不支持

而且服务注册发现上也有区别。

停止user-service服务，然后观察Eureka控制台，会发现很长一段时间后，Eureka服务依然没有察觉user-service的异常状态，这与Eureka的健康检测机制有关。

在Eureka中，健康检测的原理如下：

微服务启动时注册信息到Eureka，这点与Nacos一致

微服务每隔30秒向Eureka发送心跳请求，报告自己的健康状态。Nacos中默认是5秒一次

Eureka如果90秒未收到心跳，则认为服务疑似故障，可能被剔除。Nacos中则是15秒超时，30秒剔除

Eureka如果发现超过85%比例的服务都心跳异常，会认为是自己的网络异常，暂停剔除服务的功能

Eureka每隔60秒执行一次服务检测和清理任务。Nacos是每隔5秒执行一次

综上，会发现Eureka是尽量不剔除服务，避免“误杀”，宁可放过一千，也不错杀一个，这就导致当服务真的出现故障时，迟迟不会被剔除，给服务的调用者带来困扰。不仅如此，当Eureka发现服务宕机并从服务列表中剔除以后，并不会将服务列表的变更消息推送给所有微服务，而是等待微服务自己来拉取时发现服务列表的变化，而微服务每隔30秒才会去Eureka更新一次服务列表，进一步推迟了服务宕机时被发现的时间。而Nacos中微服务除了自己定时去Nacos中拉取服务列表以外，Nacos还会在服务列表变更时主动推送最新的服务列表给所有的订阅者。

Eureka和Nacos的相似点有：

都支持服务注册发现功能

都有基于心跳的健康监测功能

都支持集群，集群间数据同步默认是AP模式，即最全高可用性

Eureka和Nacos的区别有：

Eureka的心跳是30秒一次，Nacos则是5秒一次

Eureka如果90秒未收到心跳，则认为服务疑似故障，可能被剔除。Nacos中则是15秒超时，30秒剔除。

Eureka每隔60秒执行一次服务检测和清理任务。Nacos是每隔5秒执行一次。

Eureka只能等微服务自己每隔30秒更新一次服务列表。Nacos既有定时更新，也有在服务变更时的广播推送

Eureka仅有注册中心功能。Nacos同时支持注册中心、配置管理

Eureka和Nacos都支持集群，而且默认都是AP模式

**3.远程调用**

微服务间远程调用都是有OpenFeign帮我们完成的，甚至帮我们实现了服务列表之间的负载均衡。但具体负载均衡的规则以及何时做的负载均衡呢？

**3.1 负载均衡原理**

在SpringCloud的早期版本中，负载均衡都是由Netflix公司开源的Ribbon组件来实现的，甚至Ribbon被直接集成到了Eureka-client和Nacos-Discovery中，但是自SpringCloud2020版本开始，已经弃用Ribbon，改用Spring自己开源的Spring Cloud LoadBalancer了，OpenFeign也已经与其整合。

**3.1.1 源码跟踪**

首先，在com.hmall.cart.service.impl.CartServiceImpl中的queryMyCarts方法中打一个断点，然后在swagger页面请求购物车列表接口，进入断点后，观察ItemClient这个接口：

<img src="../assets/SpringCloud笔记/media/image248.png" style="width:5.75in;height:2.90625in" />

会发现ItemClient是一个代理对象，而代理的处理器则是SentinelInvocationHandler，这是因为项目中引入了Sentinel导致，进入SentinelInvocationHandler类中的invoke方法：

<img src="../assets/SpringCloud笔记/media/image249.png" style="width:5.75in;height:1.67708in" />

可以看到这里是先获取被代理的方法的处理器MethodHandler，接着，Sentinel就会开启对簇点资源的监控：

<img src="../assets/SpringCloud笔记/media/image250.png" style="width:5.75in;height:2.0625in" />

开启Sentinel的簇点资源监控后，就可以调用处理器了，我们尝试跟入，会发现有两种实现：

<img src="../assets/SpringCloud笔记/media/image251.png" style="width:5.75in;height:1.67708in" />

这其实就是OpenFeign远程调用的处理器了，继续跟入会进入SynchronousMethodHandler这个实现类：

<img src="../assets/SpringCloud笔记/media/image252.png" style="width:5.75in;height:4.35417in" />

在上述方法中，会循环尝试调用executeAndDecode()方法，直到成功或者是重试次数达到Retryer中配置的上限。

继续跟入executeAndDecode()方法：

<img src="../assets/SpringCloud笔记/media/image253.png" style="width:5.75in;height:3.65625in" />

executeAndDecode()方法最终会利用client去调用execute()方法，发起远程调用。

这里的client的类型是feign.Client接口，其下有很多实现类：

<img src="../assets/SpringCloud笔记/media/image254.png" style="width:5.75in;height:1.5625in" />

由于项目中整合了seata，所以这里client对象的类型是SeataFeignBlockingLoadBalancerClient，内部实现如下：

<img src="../assets/SpringCloud笔记/media/image255.png" style="width:5.75in;height:1.48958in" />

这里直接调用了其父类，也就是FeignBlockingLoadBalancerClient的execute方法，来看一下：

<img src="../assets/SpringCloud笔记/media/image256.png" style="width:5.75in;height:2.63542in" />

整段代码中核心的有4步：

从请求的URI中找出serviceId

利用loadBalancerClient，根据serviceId做负载均衡，选出一个实例ServiceInstance

用选中的ServiceInstance的ip和port替代serviceId，重构URI

向真正的URI发送请求

所以负载均衡的关键就是这里的loadBalancerClient，类型是org.springframework.cloud.client.loadbalancer.LoadBalancerClient，这是Spring-Cloud-Common模块中定义的接口，只有一个实现类：

<img src="../assets/SpringCloud笔记/media/image257.png" style="width:5.75in;height:0.39583in" />

而这里的org.springframework.cloud.client.loadbalancer.BlockingLoadBalancerClient正是Spring-Cloud-LoadBalancer模块下的一个类：

<img src="../assets/SpringCloud笔记/media/image258.png" style="width:5.75in;height:2in" />

继续跟入其BlockingLoadBalancerClient#choose()方法：

<img src="../assets/SpringCloud笔记/media/image259.png" style="width:5.75in;height:2.83333in" />

图中代码的核心逻辑如下：

根据serviceId找到这个服务采用的负载均衡器（ReactiveLoadBalancer），也就是说我们可以给每个服务配不同的负载均衡算法

利用负载均衡器（ReactiveLoadBalancer）中的负载均衡算法，选出一个服务实例

ReactiveLoadBalancer是Spring-Cloud-Common组件中定义的负载均衡器接口规范，而Spring-Cloud-Loadbalancer组件给出了两个实现：

<img src="../assets/SpringCloud笔记/media/image260.png" style="width:5.75in;height:1.10417in" />

默认的实现是RoundRobinLoadBalancer，即**轮询**负载均衡器，负载均衡器的核心逻辑如下：

<img src="../assets/SpringCloud笔记/media/image261.png" style="width:5.75in;height:3.28125in" />

核心流程就是两步：

利用ServiceInstanceListSupplier#get()方法拉取服务的实例列表，这一步是采用响应式编程

利用本类，也就是RoundRobinLoadBalancer的getInstanceResponse()方法挑选一个实例，这里采用了轮询算法来挑选

这里的ServiceInstanceListSupplier有很多实现：

<img src="../assets/SpringCloud笔记/media/image262.png" style="width:5.75in;height:2.14583in" />

其中CachingServiceInstanceListSupplier采用了装饰模式，加了服务实例列表缓存，避免每次都要去注册中心拉取服务实例列表，而其内部是基于DiscoveryClientServiceInstanceListSupplier来实现的，在这个类的构造函数中，就会异步的基于DiscoveryClient去拉取服务的实例列表：

<img src="../assets/SpringCloud笔记/media/image263.png" style="width:5.75in;height:1.75in" />

**3.1.2 流程梳理**

Spring在整合OpenFeign的时候，实现了org.springframework.cloud.openfeign.loadbalancer.FeignBlockingLoadBalancerClient类，其中定义了OpenFeign发起远程调用的核心流程，也就是四步：

获取请求中的serviceId

根据serviceId负载均衡，找出一个可用的服务实例

利用服务实例的ip和port信息重构url

向真正的url发起请求

而具体的负载均衡则是不是由OpenFeign组件负责，而是分成了**负载均衡的接口规范**，以及**负载均衡的具体实现**两部分。

负载均衡的接口规范是定义在Spring-Cloud-Common模块中，包含下面的接口：

LoadBalancerClient：负载均衡客户端，职责是根据serviceId最终负载均衡，选出一个服务实例

ReactiveLoadBalancer：负载均衡器，负责具体的负载均衡算法

OpenFeign的负载均衡是基于Spring-Cloud-Common模块中的负载均衡规则接口，并没有写死具体实现，这就意味着以后还可以拓展其它各种负载均衡的实现，不过目前SpringCloud中只有Spring-Cloud-Loadbalancer这一种实现。

Spring-Cloud-Loadbalancer模块中，实现了Spring-Cloud-Common模块的相关接口，具体如下：

BlockingLoadBalancerClient：实现了LoadBalancerClient，会根据serviceId选出负载均衡器并调用其算法实现负载均衡

RoundRobinLoadBalancer：基于轮询算法实现了ReactiveLoadBalancer

RandomLoadBalancer：基于随机算法实现了ReactiveLoadBalancer

这样一来，整体思路就非常清楚了，流程图如下：

<img src="../assets/SpringCloud笔记/media/image264.png" style="width:5.75in;height:2.5625in" />

**3.2 NacosRule**

之前分析源码的时候发现负载均衡的算法是由ReactiveLoadBalancer来定义的，它的实现类有三个：

<img src="../assets/SpringCloud笔记/media/image265.png" style="width:5.75in;height:1.10417in" />

其中RoundRobinLoadBalancer和RandomLoadBalancer是由Spring-Cloud-Loadbalancer模块提供的，而NacosLoadBalancer则是由Nacos-Discorvery模块提供的。

**3.2.1 修改负载均衡策略**

查看源码会发现，Spring-Cloud-Loadbalancer模块中有一个自动配置类：

<img src="../assets/SpringCloud笔记/media/image266.png" style="width:5.75in;height:2.13542in" />

其中定义了默认的负载均衡器：

<img src="../assets/SpringCloud笔记/media/image267.png" style="width:5.75in;height:1.91667in" />

这个Bean上添加了@ConditionalOnMissingBean注解，也就是说如果自定义了这个类型的bean，则负载均衡的策略就会被改变。

在hm-cart模块中的添加一个配置类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmall.cart.config;<br />
<br />
import com.alibaba.cloud.nacos.NacosDiscoveryProperties;<br />
import com.alibaba.cloud.nacos.loadbalancer.NacosLoadBalancer;<br />
import org.springframework.cloud.client.ServiceInstance;<br />
import org.springframework.cloud.loadbalancer.core.ReactorLoadBalancer;<br />
import org.springframework.cloud.loadbalancer.core.ServiceInstanceListSupplier;<br />
import org.springframework.cloud.loadbalancer.support.LoadBalancerClientFactory;<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.core.env.Environment;<br />
<br />
public class OpenFeignConfig {<br />
@Bean<br />
public ReactorLoadBalancer&lt;ServiceInstance&gt; reactorServiceInstanceLoadBalancer(<br />
Environment environment, NacosDiscoveryProperties properties,<br />
LoadBalancerClientFactory loadBalancerClientFactory<br />
) {<br />
String name = environment.getProperty(LoadBalancerClientFactory.PROPERTY_NAME);<br />
return new NacosLoadBalancer(<br />
loadBalancerClientFactory.getLazyProvider(name, ServiceInstanceListSupplier.class),<br />
name,<br />
properties);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**注意**：这个配置类不要加@Configuration注解，也不要被SpringBootApplication扫描到。

由于这个OpenFeignConfig没有加@Configuration注解，也就没有被Spring加载，因此是不会生效的。接下来要在启动类上通过注解来声明这个配置。有两种做法：

全局配置：对所有服务生效

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@LoadBalancerClients(defaultConfiguration = OpenFeignConfig.class)</td>
</tr>
</tbody>
</table>

局部配置：只对某个服务生效

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@LoadBalancerClients({<br />
@LoadBalancerClient(value = "item-service", configuration = OpenFeignConfig.class)<br />
})</td>
</tr>
</tbody>
</table>

这里选择全局配置：

<img src="../assets/SpringCloud笔记/media/image268.png" style="width:5.75in;height:1.15625in" />

DEBUG重启后测试，会发现负载均衡器的类型确实切换成功：

<img src="../assets/SpringCloud笔记/media/image269.png" style="width:5.75in;height:3in" />

**3.2.2 集群优先**

RoundRobinLoadBalancer是轮询算法，RandomLoadBalancer是随机算法，那么NacosLoadBalancer是什么负载均衡算法呢？

我们通过源码来分析一下，先看第一部分：

<img src="../assets/SpringCloud笔记/media/image270.png" style="width:5.75in;height:4.26042in" />

这部分代码的大概流程如下：

通过ServiceInstanceListSupplier获取服务实例列表

获取NacosDiscoveryProperties中的clusterName，也就是yml文件中的配置，代表当前服务实例所在集群信息（参考2.2 分级模型）

然后利用stream的filter过滤找到被调用的服务实例中与当前服务实例clusterName一致的，简单来说就是**服务调用者与服务提供者要在一个集群**

为什么？假如现在有两个机房，都部署有item-service和cart-service服务：

<img src="../assets/SpringCloud笔记/media/image271.png" style="width:5.75in;height:1.55208in" />

假如这些服务实例全部都注册到了同一个Nacos，现在杭州机房的cart-service要调用item-service，会拉取到所有机房的item-service的实例，调用时会出现两种情况：

直接调用当前机房的item-service

调用其它机房的item-service

本机房调用几乎没有网络延迟，速度比较快，而跨机房调用，如果两个机房相距很远，会存在较大的网络延迟，因此应该尽可能避免跨机房调用，优先本地集群调用。

现在的情况是这样的：

cart-service所在集群是default

item-service的8081、8083所在集群的default

item-service的8088所在集群是BJ

cart-service访问item-service时，应该优先访问8081和8082，重启cart-service，测试一下：

<img src="../assets/SpringCloud笔记/media/image272.png" style="width:5.75in;height:2.63542in" />

可以看到原本是3个实例，经过筛选后还剩下2个实例，查看Debug控制台：

<img src="../assets/SpringCloud笔记/media/image273.png" style="width:5.75in;height:2.28125in" />

同集群的实例还剩下两个，接下来就需要做负载均衡了。

**3.2.3 权重配置**

继续跟踪NacosLoadBalancer源码：

<img src="../assets/SpringCloud笔记/media/image274.png" style="width:5.75in;height:1.96875in" />

打开nacos控制台，进入item-service的服务详情页，可以看到每个实例后面都有一个**编辑**按钮：

<img src="../assets/SpringCloud笔记/media/image275.png" style="width:5.75in;height:0.95833in" />

点击，可以看到一个编辑表单：

<img src="../assets/SpringCloud笔记/media/image276.png" style="width:5.75in;height:4.63542in" />

将这里的权重修改为5，访问10次购物车接口，可以发现大多数请求都访问到了8083这个实例。

**4.服务保护**

在SpringCloud的早期版本中采用的服务保护技术叫做Hystix，不过后来被淘汰，替换为Spring Cloud Circuit Breaker，其底层实现可以是Spring Retry和Resilience4J，不过在国内使用较多还是SpringCloudAlibaba中的Sentinel组件。

**4.1 线程隔离**

无论是Hystix还是Sentinel都支持线程隔离，不过其实现方式不同。

线程隔离有两种方式实现：

**线程池隔离**：给每个服务调用业务分配一个线程池，利用线程池本身实现隔离效果

优点：轻量级，无需额外开销

缺点：不支持主动超时，不支持异步调用

场景：高频调用，高扇出

**信号量隔离**：不创建线程池，而是计数器模式，记录业务使用的线程数量，达到信号量上限时，禁止新的请求

优点：支持主动超时，支持异步调用

缺点：线程的额外开销比较大

场景：底扇出

<img src="../assets/SpringCloud笔记/media/image277.png" style="width:5.75in;height:3.23958in" />

面试题：Sentinel的线程隔离与Hystix的线程隔离有什么差别？

答：Hystix默认是基于线程池实现的线程隔离，每一个被隔离的业务都要创建一个独立的线程池，线程过多会带来额外的CPU开销，性能一般，但是隔离性更强，更在意安全性和隔离性。Sentinel则是基于信号量隔离的原理，这种方式不用创建线程池，性能较好，但是隔离性一般，更在意整体的资源消耗性能。

**4.2 滑动窗口算法**

在熔断功能中，需要统计异常请求或慢请求比例，也就是计数，在限流的时候，要统计每秒钟的QPS，同样是计数，可见计数算法在熔断限流中的应用非常多，sentinel中采用的计数器算法就是滑动窗口计数算法。

**4.2.1 固定窗口计数**

要了解滑动窗口计数算法，必须先知道固定窗口计数算法，其基本原理如图：

<img src="../assets/SpringCloud笔记/media/image278.png" style="width:5.75in;height:1.53125in" />

将时间划分为多个窗口，窗口时间跨度称为Interval，本例中为1000ms

每个窗口维护1个计数器，每有1次请求就将计数器+1。限流就是设置计数器阈值，本例为3，图中红线标记

如果计数器超过了限流阈值，则超出阈值的请求都被丢弃

示例：

<img src="../assets/SpringCloud笔记/media/image279.png" style="width:5.75in;height:1.51042in" />

第1、2秒，请求数量都小于3，没问题

第3秒，请求数量为5，超过阈值，超出的请求被拒绝

考虑一种特殊场景：

<img src="../assets/SpringCloud笔记/media/image280.png" style="width:5.75in;height:1.51042in" />

假如在第5、6秒，请求数量都为3，没有超过阈值，全部放行

但是，如果第5秒的三次请求都是在4.5~5秒之间进来，第6秒的请求是在5~5.5之间进来，那么从第4.5~5.之间就有6次请求，也就是说每秒的QPS达到了6，远超阈值

这就是固定窗口计数算法的问题，它只能统计当前某1个时间窗的请求数量是否到达阈值，无法结合前后的时间窗的数据做综合统计。就需要滑动时间窗口算法来解决。

**4.2.2 滑动窗口计数**

固定时间窗口算法中窗口有很多，其跨度和位置是与时间区间绑定，因此是很多固定不动的窗口，而滑动时间窗口算法中只包含1个固定跨度的窗口，但窗口是可移动的，与时间区间无关。

具体规则如下：

窗口时间跨度Interval大小固定，例如1秒

时间区间跨度为Interval / n ，例如n=2，则时间区间跨度为500ms

窗口会随着当前请求所在时间currentTime移动，窗口范围从currentTime-Interval时刻之后的第一个时区开始，到currentTime所在时区结束

如图所示：

<img src="../assets/SpringCloud笔记/media/image281.png" style="width:5.75in;height:1.46875in" />

限流阈值依然为3，绿色小块就是请求，上面的数字是其currentTime值

在第1300ms时接收到一个请求，其所在时区就是1000~1500

按照规则，currentTime-Interval值为300ms，300ms之后的第一个时区是500~1000，因此窗口范围包含两个时区：500~1000、1000~1500，也就是粉红色方框部分

统计窗口内的请求总数，发现是3，未达到上限

若第1400ms又来一个请求，会落在1000~1500时区，虽然该时区请求总数是3，但滑动窗口内总数已经达到4，因此该请求会被拒绝：

<img src="../assets/SpringCloud笔记/media/image282.png" style="width:5.75in;height:1.47917in" />

假如第1600ms又来的一个请求，处于1500~2000时区，根据算法，滑动窗口位置应该是1000~1500和1500~2000这两个时区，也就是向后移动：

<img src="../assets/SpringCloud笔记/media/image283.png" style="width:5.75in;height:1.46875in" />

细心的人会发现，900~1600时间段只有700ms，不到1s，但是这700ms却有4个请求通过检测，超时了上限，解决办法是将区间划分的更小，如1秒钟划分为4个区间，即一个区间的时间为250ms：

<img src="../assets/SpringCloud笔记/media/image284.png" style="width:5.75in;height:1.54167in" />

这时滑动窗口区间750~1750之间就能统计到超过3个请求，从而拒绝了1600秒的请求。

综上，滑动窗口内划分的时区越多，统计越精确，但是划分的区间多意味着要维护的计数器就多，耗费的资源就越多，之前用的sentinel默认就是1秒钟的窗口划分为2个区间，一个区间500ms。

**4.3 令牌桶算法**

限流的另一种常见算法是令牌桶算法，Sentinel中的热点参数限流正是基于令牌桶算法实现的，其基本思路如图：

<img src="../assets/SpringCloud笔记/media/image285.png" style="width:5.75in;height:2.4375in" />

以固定的速率生成令牌，存入令牌桶中，如果令牌桶满了以后，多余令牌丢弃

请求进入后，必须先尝试从桶中获取令牌，获取到令牌后才可以被处理

如果令牌桶中没有令牌，则请求等待或丢弃

基于令牌桶算法，每秒产生的令牌数量基本就是QPS上限。

当然也有例外情况，例如：

某一秒令牌桶中产生了很多令牌，达到令牌桶上限N，缓存在令牌桶中，但是这一秒没有请求进入

下一秒的前半秒涌入了超过2N个请求，之前缓存的令牌桶的令牌耗尽，同时这一秒又生成了N个令牌，于是总共放行了2N个请求，超出了我们设定的QPS阈值

因此，在使用令牌桶算法时，尽量不要将令牌上限设定到服务能承受的QPS上限，而是预留一定的波动空间，这样才能应对突发流量。

**4.4 漏桶算法**

漏桶算法与令牌桶相似，但在设计上更适合应对并发波动较大的场景，以解决令牌桶中的问题。简单来说就是请求到达后不是直接处理，而是先放入一个队列，而后以固定的速率从队列中取出并处理请求，之所以叫漏桶算法，就是把请求看做水，队列看做是一个漏水的桶。

如图：

<img src="../assets/SpringCloud笔记/media/image286.png" style="width:5.75in;height:2.41667in" />

将每个请求视作"水滴"放入"漏桶"进行存储

"漏桶"以固定速率向外"漏"出请求来执行，如果"漏桶"空了则停止"漏水”

如果"漏桶"满了则多余的"水滴"会被直接丢弃

漏桶的优势就是**流量整型**，桶就像是一个大坝，请求就是水，并发量不断波动，就如同水流时大时小，但都会被大坝拦住，而后大坝按照固定的速度放水，避免下游被洪水淹没。

因此，不管并发量如何波动，经过漏桶处理后的请求一定是相对平滑的曲线：

<img src="../assets/SpringCloud笔记/media/image287.png" style="width:5.75in;height:1.28125in" />

sentinel中的限流中的排队等待功能正是基于漏桶算法实现的。

面试题：Sentinel的限流与Gateway的限流有什么差别？

答：限流算法常见的有三种实现：滑动时间窗口、令牌桶算法、漏桶算法。Gateway则采用了基于Redis实现的令牌桶算法而Sentinel内部却比较复杂：

默认限流模式是基于滑动时间窗口算法，另外Sentinel中断路器的计数也是基于滑动时间窗口算法

限流后可以快速失败和排队等待，其中排队等待基于漏桶算法，而热点参数限流则是基于令牌桶算法
