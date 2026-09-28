# MyBatisPlus笔记

**MybatisPlus笔记**

在日常开发中，单表的CRUD操作重复率很高，也没有难度。但是这部分代码量比较大，开发费时。

MybatisPlus组件就是用来简化或省略单表的CRUD开发工作，它不仅仅可以简化单表操作，而且还对Mybatis的功能有很多的增强，更加简介、高效。

**一、快速入门**

**1.环境准备**

复制以下mp-demo项目文件夹到自己的工作目录（不要包含空格和特殊字符），然后用IDEA工具打开：

**\[mp-demo.zip\]**

<img src="../assets/MyBatisPlus笔记/media/image1.png" style="width:5.75in;height:2.69792in" />

配置项目的JDK版本为JDK11：

<img src="../assets/MyBatisPlus笔记/media/image2.png" style="width:5.75in;height:2.3125in" />

执行以下mp.sql脚本，得到两个数据库表adress和user：

**\[mp.sql\]**

最后，在application.yaml中修改jdbc参数为自己的数据库参数：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
datasource:<br />
url: jdbc:mysql://127.0.0.1:3306/mp?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: root<br />
password: MySQL123<br />
logging:<br />
level:<br />
com.itheima: debug<br />
pattern:<br />
dateformat: HH:mm:ss</td>
</tr>
</tbody>
</table>

**2.快速开始**

**2.1 引入依赖**

MybatisPlus提供起步依赖，包含对mybatis的自动装配和MybatisPlus的自动装配，所以MybatisPlus是对mybatis增强，而非替代，他完全可以替换Mybatis的起步依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.baomidou&lt;/groupId&gt;<br />
&lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;3.5.3.1&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

最终，项目的依赖如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependencies&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.baomidou&lt;/groupId&gt;<br />
&lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;3.5.3.1&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.mysql&lt;/groupId&gt;<br />
&lt;artifactId&gt;mysql-connector-j&lt;/artifactId&gt;<br />
&lt;scope&gt;runtime&lt;/scope&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.projectlombok&lt;/groupId&gt;<br />
&lt;artifactId&gt;lombok&lt;/artifactId&gt;<br />
&lt;optional&gt;true&lt;/optional&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;<br />
&lt;scope&gt;test&lt;/scope&gt;<br />
&lt;/dependency&gt;<br />
&lt;/dependencies&gt;</td>
</tr>
</tbody>
</table>

**2.2 定义Mapper**

MybatisPlus提供了一个基础的BaseMapper接口，其中已经实现了单表的CRUD：

<img src="../assets/MyBatisPlus笔记/media/image3.png" style="width:5.75in;height:3.84375in" />

因此自定义的Mapper只要实现了BaseMapper，就无需自己实现单表CRUD了。

使com.itheima.mp.mapper包下的UserMapper接口继承BaseMapper：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.mapper;<br />
<br />
import com.baomidou.mybatisplus.core.mapper.BaseMapper;<br />
import com.itheima.mp.domain.po.User;<br />
<br />
public interface UserMapper extends BaseMapper&lt;User&gt; {<br />
}</td>
</tr>
</tbody>
</table>

**2.3 测试**

新建一个测试类，编写几个单元测试，测试基本的CRUD功能：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.mapper;<br />
<br />
import com.itheima.mp.domain.po.User;<br />
import org.junit.jupiter.api.Test;<br />
import org.springframework.beans.factory.annotation.Autowired;<br />
import org.springframework.boot.test.context.SpringBootTest;<br />
<br />
import java.time.LocalDateTime;<br />
import java.util.List;<br />
<br />
@SpringBootTest<br />
class UserMapperTest {<br />
<br />
@Autowired<br />
private UserMapper userMapper;<br />
<br />
@Test<br />
void testInsert() {<br />
User user = new User();<br />
user.setId(5L);<br />
user.setUsername("Lucy");<br />
user.setPassword("123");<br />
user.setPhone("18688990011");<br />
user.setBalance(200);<br />
user.setInfo("{\"age\": 24, \"intro\": \"英文老师\", \"gender\": \"female\"}");<br />
user.setCreateTime(LocalDateTime.now());<br />
user.setUpdateTime(LocalDateTime.now());<br />
userMapper.insert(user);<br />
}<br />
<br />
@Test<br />
void testSelectById() {<br />
User user = userMapper.selectById(5L);<br />
System.out.println("user = " + user);<br />
}<br />
<br />
@Test<br />
void testSelectByIds() {<br />
List&lt;User&gt; users = userMapper.selectBatchIds(List.of(1L, 2L, 3L, 4L, 5L));<br />
users.forEach(System.out::println);<br />
}<br />
<br />
@Test<br />
void testUpdateById() {<br />
User user = new User();<br />
user.setId(5L);<br />
user.setBalance(20000);<br />
userMapper.updateById(user);<br />
}<br />
<br />
@Test<br />
void testDelete() {<br />
userMapper.deleteById(5L);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

可以看到在运行过程中打印出的SQL日志：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
11:05:01 INFO 15524 --- [ main] com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Starting...<br />
11:05:02 INFO 15524 --- [ main] com.zaxxer.hikari.HikariDataSource : HikariPool-1 - Start completed.<br />
11:05:02 DEBUG 15524 --- [ main] c.i.mp.mapper.UserMapper.selectById : ==&gt; Preparing: SELECT id,username,password,phone,info,status,balance,create_time,update_time FROM user WHERE id=?<br />
11:05:02 DEBUG 15524 --- [ main] c.i.mp.mapper.UserMapper.selectById : ==&gt; Parameters: 5(Long)<br />
11:05:02 DEBUG 15524 --- [ main] c.i.mp.mapper.UserMapper.selectById : &lt;== Total: 1<br />
user = User(id=5, username=Lucy, password=123, phone=18688990011, info={"age": 21}, status=1, balance=20000, createTime=Fri Jun 30 11:02:30 CST 2023, updateTime=Fri Jun 30 11:02:30 CST 2023)</td>
</tr>
</tbody>
</table>

**3.常见注解**

MybatisPlus之所以能推断出表的信息，是靠继承BaseMapper时指定的泛型（PO实体），从而生成SQL：

MybatisPlus会把PO实体的**类名驼峰转下划线作为表名**

MybatisPlus会把PO实体的所有**变量名驼峰转下划线作为表的字段名**，并**根据变量类型推断字段类型**

MybatisPlus会把**名为id的字段作为主键**

有些情况下，默认的实现与实际场景不符，通过MybatisPlus提供的一些注解便可以正确映射。

**3.1 @TableName**

描述：表名注解，标识实体类对应的表

使用位置：实体类

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@TableName("user")<br />
public class User {<br />
private Long id;<br />
private String name;<br />
}</td>
</tr>
</tbody>
</table>

TableName注解除了指定表名以外，还可以指定很多其它属性：

|                   |            |          |        |                                                                                           |
|-------------------|------------|----------|--------|-------------------------------------------------------------------------------------------|
| 属性              | 类型       | 必须指定 | 默认值 | 描述                                                                                      |
| value             | String     | 否       | ""     | 表名                                                                                      |
| schema            | String     | 否       | ""     | schema                                                                                    |
| keepGlobalPrefix  | boolean    | 否       | false  | 是否保持使用全局的 tablePrefix 的值（当全局 tablePrefix 生效时）                          |
| **resultMap**     | String     | 否       | ""     | xml 中 resultMap 的 id（用于满足特定类型的实体类对象绑定）                                |
| **autoResultMap** | boolean    | 否       | false  | 是否自动构建 resultMap 并使用（如果设置 resultMap 则不会进行 resultMap 的自动构建与注入） |
| excludeProperty   | String\[\] | 否       | {}     | 需要排除的属性名 @since 3.3.1                                                             |

**3.2 @TableId**

描述：主键注解，标识实体类中的主键字段

使用位置：实体类的主键字段

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@TableName("user")<br />
public class User {<br />
@TableId<br />
private Long id;<br />
private String name;<br />
}</td>
</tr>
</tbody>
</table>

TableId注解支持两个属性：

|       |        |          |             |              |
|-------|--------|----------|-------------|--------------|
| 属性  | 类型   | 必须指定 | 默认值      | 描述         |
| value | String | 否       | ""          | 表名         |
| type  | Enum   | 否       | IdType.NONE | 指定主键类型 |

IdType支持的类型有：

|                   |                                                                                                                                                           |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| 值                | 描述                                                                                                                                                      |
| AUTO              | 数据库 ID 自增                                                                                                                                            |
| NONE              | 无状态，该类型为未设置主键类型（注解里等于跟随全局，全局里约等于 INPUT）                                                                                  |
| INPUT             | insert 前自行 set 主键值                                                                                                                                  |
| ASSIGN_ID         | 分配 ID(主键类型为 Number(Long 和 Integer)或 String)(since 3.3.0),使用接口IdentifierGenerator的方法nextId(默认实现类为DefaultIdentifierGenerator雪花算法) |
| ASSIGN_UUID       | 分配 UUID,主键类型为 String(since 3.3.0),使用接口IdentifierGenerator的方法nextUUID(默认 default 方法)                                                     |
| ~~ID_WORKER~~     | 分布式全局唯一 ID 长整型类型(please use ASSIGN_ID)                                                                                                        |
| ~~UUID~~          | 32 位 UUID 字符串(please use ASSIGN_UUID)                                                                                                                 |
| ~~ID_WORKER_STR~~ | 分布式全局唯一 ID 字符串类型(please use ASSIGN_ID)                                                                                                        |

比较常见的有三种：

AUTO：利用数据库的id自增长

INPUT：手动生成id

ASSIGN_ID：雪花算法生成Long类型的全局唯一id，这是默认的ID策略

**3.3 @TableField**

描述：普通字段注解

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@TableName("user")<br />
public class User {<br />
@TableId<br />
private Long id;<br />
private String name;<br />
private Integer age;<br />
@TableField("is_married")<br />
private Boolean isMarried;<br />
@TableField("`concat`")<br />
private String concat;<br />
}</td>
</tr>
</tbody>
</table>

一般情况下不用给字段添加@TableField注解，一些特殊情况除外：

成员变量名与数据库字段名不一致

成员变量是以isXXX命名，按照JavaBean的规范，MybatisPlus识别字段时会把is去除，这就导致与数据库不符

成员变量名与数据库一致，但是与数据库的关键字冲突。使用@TableField注解给字段名添加转义字符\`\`

支持的其它属性如下：

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<tbody>
<tr class="odd">
<td>属性</td>
<td>类型</td>
<td>必填</td>
<td>默认值</td>
<td>描述</td>
</tr>
<tr class="even">
<td>value</td>
<td>String</td>
<td>否</td>
<td>""</td>
<td>数据库字段名</td>
</tr>
<tr class="odd">
<td>exist</td>
<td>boolean</td>
<td>否</td>
<td>true</td>
<td>是否为数据库表字段</td>
</tr>
<tr class="even">
<td>condition</td>
<td>String</td>
<td>否</td>
<td>""</td>
<td>字段 where 实体查询比较条件，有值设置则按设置的值为准，没有则为默认全局的 %s=#{%s}</td>
</tr>
<tr class="odd">
<td>update</td>
<td>String</td>
<td>否</td>
<td>""</td>
<td>字段 update set 部分注入，例如：当在version字段上注解update="%s+1" 表示更新时会 set version=version+1 （该属性优先级高于 el 属性）</td>
</tr>
<tr class="even">
<td>insertStrategy</td>
<td>Enum</td>
<td>否</td>
<td>FieldStrategy.DEFAULT</td>
<td>举例：NOT_NULL<br />
insert into table_a(&lt;if test="columnProperty != null"&gt;column&lt;/if&gt;) values (&lt;if test="columnProperty != null"&gt;#{columnProperty}&lt;/if&gt;)</td>
</tr>
<tr class="odd">
<td>updateStrategy</td>
<td>Enum</td>
<td>否</td>
<td>FieldStrategy.DEFAULT</td>
<td>举例：IGNORED<br />
update table_a set column=#{columnProperty}</td>
</tr>
<tr class="even">
<td>whereStrategy</td>
<td>Enum</td>
<td>否</td>
<td>FieldStrategy.DEFAULT</td>
<td>举例：NOT_EMPTY<br />
where &lt;if test="columnProperty != null and columnProperty!=''"&gt;column=#{columnProperty}&lt;/if&gt;</td>
</tr>
<tr class="odd">
<td>fill</td>
<td>Enum</td>
<td>否</td>
<td>FieldFill.DEFAULT</td>
<td>字段自动填充策略</td>
</tr>
<tr class="even">
<td>select</td>
<td>boolean</td>
<td>否</td>
<td>true</td>
<td>是否进行 select 查询</td>
</tr>
<tr class="odd">
<td>keepGlobalFormat</td>
<td>boolean</td>
<td>否</td>
<td>false</td>
<td>是否保持使用全局的 format 进行处理</td>
</tr>
<tr class="even">
<td>jdbcType</td>
<td>JdbcType</td>
<td>否</td>
<td>JdbcType.UNDEFINED</td>
<td>JDBC 类型 (该默认值不代表会按照该值生效)</td>
</tr>
<tr class="odd">
<td>typeHandler</td>
<td>TypeHander</td>
<td>否</td>
<td></td>
<td>类型处理器 (该默认值不代表会按照该值生效)</td>
</tr>
<tr class="even">
<td>numericScale</td>
<td>String</td>
<td>否</td>
<td>""</td>
<td>指定小数点后保留的位数</td>
</tr>
</tbody>
</table>

**4.常见配置**

MybatisPlus也支持基于yaml文件的自定义配置，详见官方文档：

**\[该类型的内容暂不支持下载\]**

大多数的配置都有默认值，但还有一些没有默认值，例如:

实体类的别名扫描包

全局id类型

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
mybatis-plus:<br />
type-aliases-package: com.itheima.mp.domain.po<br />
global-config:<br />
db-config:<br />
id-type: auto # 全局id类型为自增长</td>
</tr>
</tbody>
</table>

MyBatisPlus也支持手写SQL，而mapper文件的读取地址可以自行配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
mybatis-plus:<br />
mapper-locations: "classpath*:/mapper/**/*.xml" # Mapper.xml文件地址，当前这个是默认值。</td>
</tr>
</tbody>
</table>

classpath\*:/mapper/\*\*/\*.xml就是说只要把mapper.xml文件放置在mapper目录下就一定会被加载。

例如，新建一个UserMapper.xml文件：

<img src="../assets/MyBatisPlus笔记/media/image4.png" style="width:5.75in;height:1.38542in" />

然后在其中定义一个方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;?xml version="1.0" encoding="UTF-8"?&gt;<br />
&lt;!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd"&gt;<br />
&lt;mapper namespace="com.itheima.mp.mapper.UserMapper"&gt;<br />
&lt;select id="queryById" resultType="User"&gt;<br />
SELECT * FROM user WHERE id = #{id}<br />
&lt;/select&gt;<br />
&lt;/mapper&gt;</td>
</tr>
</tbody>
</table>

在测试类UserMapperTest中测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testQuery() {<br />
User user = userMapper.queryById(1L);<br />
System.out.println("user = " + user);<br />
}</td>
</tr>
</tbody>
</table>

**二、核心功能**

**1.条件构造器**

BaseMapper中提供的方法除了以id作为where条件以外，还支持更加复杂的where条件：

<img src="../assets/MyBatisPlus笔记/media/image5.png" style="width:5.75in;height:1.97917in" />

Wrapper参数为条件构造的抽象类，其下有很多实现：

<img src="../assets/MyBatisPlus笔记/media/image6.png" style="width:5.75in;height:1.77083in" />

Wrapper的子类AbstractWrapper提供了where中包含的所有条件构造方法：

<img src="../assets/MyBatisPlus笔记/media/image7.png" style="width:5.75in;height:4.60417in" />

QueryWrapper在AbstractWrapper的基础上拓展了一个select方法，允许指定查询字段：

<img src="../assets/MyBatisPlus笔记/media/image8.png" style="width:5.75in;height:0.6875in" />

UpdateWrapper在AbstractWrapper的基础上拓展了一个set方法，允许指定SQL中的SET部分：

<img src="../assets/MyBatisPlus笔记/media/image9.png" style="width:5.75in;height:0.66667in" />

**1.1 QueryWrapper**

无论是修改、删除、查询，都可以使用QueryWrapper来构建查询条件，例如：

**查询**：查询出名字中带o的，存款大于等于1000元的人。代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testQueryWrapper() {<br />
// 1.构建查询条件 where name like "%o%" AND balance &gt;= 1000<br />
QueryWrapper&lt;User&gt; wrapper = new QueryWrapper&lt;User&gt;()<br />
.select("id", "username", "info", "balance")<br />
.like("username", "o")<br />
.ge("balance", 1000);<br />
// 2.查询数据<br />
List&lt;User&gt; users = userMapper.selectList(wrapper);<br />
users.forEach(System.out::println);<br />
}</td>
</tr>
</tbody>
</table>

**更新**：更新用户名为Jack的用户的余额为2000，代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testUpdateByQueryWrapper() {<br />
// 1.构建查询条件 where name = "Jack"<br />
QueryWrapper&lt;User&gt; wrapper = new QueryWrapper&lt;User&gt;().eq("username", "Jack");<br />
// 2.更新数据，user中非null字段都会作为set语句<br />
User user = new User();<br />
user.setBalance(2000);<br />
userMapper.update(user, wrapper);<br />
}</td>
</tr>
</tbody>
</table>

**1.2 UpdateWrapper**

BaseMapper中的update方法更新时只能直接赋值，对于一些复杂的需求就难以实现。

例如：将id为1,2,4的用户余额扣除200，SET的赋值结果是基于字段现有值的，这时需要UpdateWrapper中的setSql功能：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testUpdateWrapper() {<br />
List&lt;Long&gt; ids = List.of(1L, 2L, 4L);<br />
// 1.生成SQL<br />
UpdateWrapper&lt;User&gt; wrapper = new UpdateWrapper&lt;User&gt;()<br />
.setSql("balance = balance - 200") // SET balance = balance - 200<br />
.in("id", ids); // WHERE id in (1, 2, 4)<br />
// 2.更新，注意第一个参数可以给null，也就是不填更新字段和数据，<br />
// 而是基于UpdateWrapper中的setSQL来更新<br />
userMapper.update(null, wrapper);<br />
}</td>
</tr>
</tbody>
</table>

**1.3 LambdaQueryWrapper**

无论是QueryWrapper还是UpdateWrapper，在构造条件的时候都需要写死字段名称，这在开发中是不被允许的。利用变量的get方法，结合反射技术，MybatisPlus就能根据传递的方法识别出对应的变量名。传递方法可以使用JDK8中的方法引用和Lambda表达式

MybatisPlus提供了一套基于Lambda的Wrapper：LambdaQueryWrapper、LambdaUpdateWrapper，分别对应QueryWrapper和UpdateWrapper

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testLambdaQueryWrapper() {<br />
// 1.构建条件 WHERE username LIKE "%o%" AND balance &gt;= 1000<br />
QueryWrapper&lt;User&gt; wrapper = new QueryWrapper&lt;&gt;();<br />
wrapper.lambda()<br />
.select(User::getId, User::getUsername, User::getInfo, User::getBalance)<br />
.like(User::getUsername, "o")<br />
.ge(User::getBalance, 1000);<br />
// 2.查询<br />
List&lt;User&gt; users = userMapper.selectList(wrapper);<br />
users.forEach(System.out::println);<br />
}</td>
</tr>
</tbody>
</table>

**2.自定义SQL**

**2.1 基本用法**

将id为1,2,4的用户余额扣除200的案例中，把SQL语句写在了业务层，但是在实际开发中，我们希望SQL语句被定义在持久层：

<img src="../assets/MyBatisPlus笔记/media/image10.png" style="width:5.75in;height:0.57292in" />

MybatisPlus提供了自定义SQL功能，可以让我们利用Wrapper生成查询条件，再结合Mapper.xml编写SQL：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testCustomWrapper() {<br />
// 1.准备自定义查询条件<br />
List&lt;Long&gt; ids = List.of(1L, 2L, 4L);<br />
QueryWrapper&lt;User&gt; wrapper = new QueryWrapper&lt;User&gt;().in("id", ids);<br />
<br />
// 2.调用mapper的自定义方法，直接传递Wrapper<br />
userMapper.deductBalanceByIds(200, wrapper);<br />
}</td>
</tr>
</tbody>
</table>

然后在UserMapper中自定义SQL：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.mapper;<br />
<br />
import com.baomidou.mybatisplus.core.mapper.BaseMapper;<br />
import com.itheima.mp.domain.po.User;<br />
import org.apache.ibatis.annotations.Param;<br />
import org.apache.ibatis.annotations.Update;<br />
import org.apache.ibatis.annotations.Param;<br />
<br />
public interface UserMapper extends BaseMapper&lt;User&gt; {<br />
@Select("UPDATE user SET balance = balance - #{money} ${ew.customSqlSegment}")<br />
void deductBalanceByIds(@Param("money") int money, @Param("ew") QueryWrapper&lt;User&gt; wrapper);<br />
}</td>
</tr>
</tbody>
</table>

**注意**：这里Wrapper参数的@Param注解属性值必须为ew，如果不记得了可以使用Constants.WRAPPER代替。

**2.3 多表关联**

理论上Mybatis不支持多表查询，但是可以利用Wrapper中自定义条件结合自定义SQL实现多表查询的效果。

例如，查询出所有收货地址在北京的并且用户id在1、2、4之中的用户：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testCustomJoinWrapper() {<br />
// 1.准备自定义查询条件<br />
QueryWrapper&lt;User&gt; wrapper = new QueryWrapper&lt;User&gt;()<br />
.in("u.id", List.of(1L, 2L, 4L))<br />
.eq("a.city", "北京");<br />
<br />
// 2.调用mapper的自定义方法<br />
List&lt;User&gt; users = userMapper.queryUserByWrapper(wrapper);<br />
<br />
users.forEach(System.out::println);<br />
}</td>
</tr>
</tbody>
</table>

然后在UserMapper中自定义方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Select("SELECT u.* FROM user u INNER JOIN address a ON u.id = a.user_id ${ew.customSqlSegment}")<br />
List&lt;User&gt; queryUserByWrapper(@Param("ew")QueryWrapper&lt;User&gt; wrapper);</td>
</tr>
</tbody>
</table>

或者在UserMapper.xml中写SQL：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;select id="queryUserByIdAndAddr" resultType="com.itheima.mp.domain.po.User"&gt;<br />
SELECT * FROM user u INNER JOIN address a ON u.id = a.user_id ${ew.customSqlSegment}<br />
&lt;/select&gt;</td>
</tr>
</tbody>
</table>

**3.Service接口**

MybatisPlus不仅提供了BaseMapper，还提供了通用的Service接口及默认实现，封装了一些常用的service模板方法。

通用接口为IService，默认实现为ServiceImpl，其中封装的方法可以分为以下几类：

save：新增

remove：删除

update：更新

get：查询单个结果

list：查询集合结果

count：计数

page：分页查询

**3.1 CRUD**

**新增**：

<img src="../assets/MyBatisPlus笔记/media/image11.png" style="width:5.75in;height:1.375in" />

save是新增单个元素

saveBatch是批量新增

saveOrUpdate是根据id判断，如果数据存在就更新，不存在则新增

saveOrUpdateBatch是批量的新增或修改

**删除**：

<img src="../assets/MyBatisPlus笔记/media/image12.png" style="width:5.75in;height:2.01042in" />

removeById：根据id删除

removeByIds：根据id批量删除

removeByMap：根据Map中的键值对为条件删除

remove(Wrapper\<T\>)：根据Wrapper条件删除

removeBatchByIds：暂不支持

**修改**：

<img src="../assets/MyBatisPlus笔记/media/image13.png" style="width:5.75in;height:2.13542in" />

updateById：根据id修改

update(Wrapper\<T\>)：根据UpdateWrapper修改，Wrapper中包含set和where部分

update(T，Wrapper\<T\>)：按照T内的数据修改与Wrapper匹配到的数据

updateBatchById：根据id批量修改

**Get**：

<img src="../assets/MyBatisPlus笔记/media/image14.png" style="width:5.75in;height:1.34375in" />

getById：根据id查询1条数据

getOne(Wrapper\<T\>)：根据Wrapper查询1条数据

getBaseMapper：获取Service内的BaseMapper实现，某些时候需要直接调用Mapper内的自定义SQL时可以用这个方法获取到Mapper

**List**：

<img src="../assets/MyBatisPlus笔记/media/image15.png" style="width:5.75in;height:1.80208in" />

listByIds：根据id批量查询

list(Wrapper\<T\>)：根据Wrapper条件查询多条数据

list()：查询所有

**Count**：

<img src="../assets/MyBatisPlus笔记/media/image16.png" style="width:5.75in;height:0.60417in" />

count()：统计所有数量

count(Wrapper\<T\>)：统计符合Wrapper条件的数据数量

**getBaseMapper**：

<img src="../assets/MyBatisPlus笔记/media/image17.png" style="width:5.75in;height:0.46875in" />

getBaseMapper()：在service中调用Mapper中自定义SQL时，通过它获取service对应的Mapper

**3.2 基本用法**

由于Service中经常需要定义与业务有关的自定义方法，因此我们不能直接使用IService，而是自定义Service接口，然后继承IService以拓展方法。同时，让自定义的Service实现类继承ServiceImpl，这样就不用自己实现IService中的接口了。

首先，定义IUserService，继承IService：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.service;<br />
<br />
import com.baomidou.mybatisplus.extension.service.IService;<br />
import com.itheima.mp.domain.po.User;<br />
<br />
public interface IUserService extends IService&lt;User&gt; {<br />
// 拓展自定义方法<br />
}</td>
</tr>
</tbody>
</table>

然后，编写UserServiceImpl类，继承ServiceImpl，实现UserService：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.service.impl;<br />
<br />
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;<br />
import com.itheima.mp.domain.po.User;<br />
import com.itheima.mp.domain.po.service.IUserService;<br />
import com.itheima.mp.mapper.UserMapper;<br />
import org.springframework.stereotype.Service;<br />
<br />
@Service<br />
public class UserServiceImpl extends ServiceImpl&lt;UserMapper, User&gt; implements IUserService {<br />
}</td>
</tr>
</tbody>
</table>

项目结构如下：

<img src="../assets/MyBatisPlus笔记/media/image18.png" style="width:5.75in;height:0.78125in" />

接下来，快速实现下面4个接口：

|      |                |          |             |              |            |
|------|----------------|----------|-------------|--------------|------------|
| 编号 | 接口           | 请求方式 | 请求路径    | 请求参数     | 返回值     |
| 1    | 新增用户       | POST     | /users      | 用户表单实体 | 无         |
| 2    | 删除用户       | DELETE   | /users/{id} | 用户id       | 无         |
| 3    | 根据id查询用户 | GET      | /users/{id} | 用户id       | 用户VO     |
| 4    | 根据id批量查询 | GET      | /users      | 用户id集合   | 用户VO集合 |

首先，在项目中引入几个依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--swagger--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;com.github.xiaoymin&lt;/groupId&gt;<br />
&lt;artifactId&gt;knife4j-openapi2-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;4.1.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--web--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

然后配置swagger信息：

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
title: 用户管理接口文档<br />
description: "用户管理接口文档"<br />
email: zhanghuyi@itcast.cn #负责人邮箱<br />
concat: 虎哥 #联系人名称<br />
url: https://www.itcast.cn #组织或项目的官方网址<br />
version: v1.0.0<br />
group:<br />
default:<br />
group-name: default<br />
api-rule: package<br />
api-rule-resources:<br />
- com.itheima.mp.controller</td>
</tr>
</tbody>
</table>

然后，接口需要两个实体：

UserFormDTO：代表新增时的用户表单

UserVO：代表查询的返回结果

首先是UserFormDTO：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.dto;<br />
<br />
import com.baomidou.mybatisplus.annotation.TableField;<br />
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;<br />
import io.swagger.annotations.ApiModel;<br />
import io.swagger.annotations.ApiModelProperty;<br />
import lombok.Data;<br />
<br />
@Data<br />
@ApiModel(description = "用户表单实体")<br />
public class UserFormDTO {<br />
<br />
@ApiModelProperty("id")<br />
private Long id;<br />
<br />
@ApiModelProperty("用户名")<br />
private String username;<br />
<br />
@ApiModelProperty("密码")<br />
private String password;<br />
<br />
@ApiModelProperty("注册手机号")<br />
private String phone;<br />
<br />
@ApiModelProperty("详细信息，JSON风格")<br />
private String info;<br />
<br />
@ApiModelProperty("账户余额")<br />
private Integer balance;<br />
}</td>
</tr>
</tbody>
</table>

然后是UserVO：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.vo;<br />
<br />
import io.swagger.annotations.ApiModel;<br />
import io.swagger.annotations.ApiModelProperty;<br />
import lombok.Data;<br />
<br />
@Data<br />
@ApiModel(description = "用户VO实体")<br />
public class UserVO {<br />
<br />
@ApiModelProperty("用户id")<br />
private Long id;<br />
<br />
@ApiModelProperty("用户名")<br />
private String username;<br />
<br />
@ApiModelProperty("详细信息")<br />
private String info;<br />
<br />
@ApiModelProperty("使用状态（1正常 2冻结）")<br />
private Integer status;<br />
<br />
@ApiModelProperty("账户余额")<br />
private Integer balance;<br />
}</td>
</tr>
</tbody>
</table>

最后，按照Restful风格编写Controller接口方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.controller;<br />
<br />
import cn.hutool.core.bean.BeanUtil;<br />
import com.itheima.mp.domain.dto.UserFormDTO;<br />
import com.itheima.mp.domain.po.User;<br />
import com.itheima.mp.domain.vo.UserVO;<br />
import com.itheima.mp.service.IUserService;<br />
import io.swagger.annotations.Api;<br />
import io.swagger.annotations.ApiOperation;<br />
import lombok.RequiredArgsConstructor;<br />
import org.springframework.web.bind.annotation.*;<br />
<br />
import java.util.List;<br />
<br />
@Api(tags = "用户管理接口")<br />
@RequiredArgsConstructor<br />
@RestController<br />
@RequestMapping("users")<br />
public class UserController {<br />
<br />
private final IUserService userService;<br />
<br />
@PostMapping<br />
@ApiOperation("新增用户")<br />
public void saveUser(@RequestBody UserFormDTO userFormDTO){<br />
// 1.转换DTO为PO<br />
User user = BeanUtil.copyProperties(userFormDTO, User.class);<br />
// 2.新增<br />
userService.save(user);<br />
}<br />
<br />
@DeleteMapping("/{id}")<br />
@ApiOperation("删除用户")<br />
public void removeUserById(@PathVariable("id") Long userId){<br />
userService.removeById(userId);<br />
}<br />
<br />
@GetMapping("/{id}")<br />
@ApiOperation("根据id查询用户")<br />
public UserVO queryUserById(@PathVariable("id") Long userId){<br />
// 1.查询用户<br />
User user = userService.getById(userId);<br />
// 2.处理vo<br />
return BeanUtil.copyProperties(user, UserVO.class);<br />
}<br />
<br />
@GetMapping<br />
@ApiOperation("根据id集合查询用户")<br />
public List&lt;UserVO&gt; queryUserByIds(@RequestParam("ids") List&lt;Long&gt; ids){<br />
// 1.查询用户<br />
List&lt;User&gt; users = userService.listByIds(ids);<br />
// 2.处理vo<br />
return BeanUtil.copyToList(users, UserVO.class);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

可以看到上述接口都直接在controller即可实现，无需编写任何service代码，非常方便。

但是一些带有业务逻辑的接口则需要在service中自定义实现，例如根据id扣减用户余额时，需要两个判断：

判断用户状态是否正常

判断用户余额是否充足

首先在UserController中定义一个方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@PutMapping("{id}/deduction/{money}")<br />
@ApiOperation("扣减用户余额")<br />
public void deductBalance(@PathVariable("id") Long id, @PathVariable("money")Integer money){<br />
userService.deductBalance(id, money);<br />
}</td>
</tr>
</tbody>
</table>

然后是UserService接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.service;<br />
<br />
import com.baomidou.mybatisplus.extension.service.IService;<br />
import com.itheima.mp.domain.po.User;<br />
<br />
public interface IUserService extends IService&lt;User&gt; {<br />
void deductBalance(Long id, Integer money);<br />
}</td>
</tr>
</tbody>
</table>

最后是UserServiceImpl实现类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.service.impl;<br />
<br />
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;<br />
import com.itheima.mp.domain.po.User;<br />
import com.itheima.mp.mapper.UserMapper;<br />
import com.itheima.mp.service.IUserService;<br />
import org.springframework.stereotype.Service;<br />
<br />
@Service<br />
public class UserServiceImpl extends ServiceImpl&lt;UserMapper, User&gt; implements IUserService {<br />
@Override<br />
public void deductBalance(Long id, Integer money) {<br />
// 1.查询用户<br />
User user = getById(id);<br />
// 2.判断用户状态<br />
if (user == null || user.getStatus() == 2) {<br />
throw new RuntimeException("用户状态异常");<br />
}<br />
// 3.判断用户余额<br />
if (user.getBalance() &lt; money) {<br />
throw new RuntimeException("用户余额不足");<br />
}<br />
// 4.扣减余额<br />
baseMapper.deductMoneyById(id, money);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

最后是mapper：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Update("UPDATE user SET balance = balance - #{money} WHERE id = #{id}")<br />
void deductMoneyById(@Param("id") Long id, @Param("money") Integer money);</td>
</tr>
</tbody>
</table>

**3.3 Lambda**

IService中还提供了Lambda功能来简化复杂查询及更新功能。这里通过两个案例来学习。

**案例一**：实现一个复杂条件查询用户的接口，查询条件如下：

name：用户名关键字，可以为空

status：用户状态，可以为空

minBalance：最小余额，可以为空

maxBalance：最大余额，可以为空

定义一个查询条件实体，UserQuery实体：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.query;<br />
<br />
import io.swagger.annotations.ApiModel;<br />
import io.swagger.annotations.ApiModelProperty;<br />
import lombok.Data;<br />
<br />
@Data<br />
@ApiModel(description = "用户查询条件实体")<br />
public class UserQuery {<br />
@ApiModelProperty("用户名关键字")<br />
private String name;<br />
@ApiModelProperty("用户状态：1-正常，2-冻结")<br />
private Integer status;<br />
@ApiModelProperty("余额最小值")<br />
private Integer minBalance;<br />
@ApiModelProperty("余额最大值")<br />
private Integer maxBalance;<br />
}</td>
</tr>
</tbody>
</table>

在UserController中定义一个controller方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/list")<br />
@ApiOperation("根据id集合查询用户")<br />
public List&lt;UserVO&gt; queryUsers(UserQuery query){<br />
// 1.组织条件<br />
String username = query.getName();<br />
Integer status = query.getStatus();<br />
Integer minBalance = query.getMinBalance();<br />
Integer maxBalance = query.getMaxBalance();<br />
LambdaQueryWrapper&lt;User&gt; wrapper = new QueryWrapper&lt;User&gt;().lambda()<br />
.like(username != null, User::getUsername, username)<br />
.eq(status != null, User::getStatus, status)<br />
.ge(minBalance != null, User::getBalance, minBalance)<br />
.le(maxBalance != null, User::getBalance, maxBalance);<br />
// 2.查询用户<br />
List&lt;User&gt; users = userService.list(wrapper);<br />
// 3.处理vo<br />
return BeanUtil.copyToList(users, UserVO.class);<br />
}</td>
</tr>
</tbody>
</table>

这里第一个参数Xxx != null就是一个条件，只有条件满足时才会添加这个查询条件。

Service中对LambdaQueryWrapper和LambdaUpdateWrapper的用法进一步做了简化，无需new一个Wrapper，而是直接调用lambdaQuery和lambdaUpdate方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/list")<br />
@ApiOperation("根据id集合查询用户")<br />
public List&lt;UserVO&gt; queryUsers(UserQuery query){<br />
// 1.组织条件<br />
String username = query.getName();<br />
Integer status = query.getStatus();<br />
Integer minBalance = query.getMinBalance();<br />
Integer maxBalance = query.getMaxBalance();<br />
// 2.查询用户<br />
List&lt;User&gt; users = userService.lambdaQuery()<br />
.like(username != null, User::getUsername, username)<br />
.eq(status != null, User::getStatus, status)<br />
.ge(minBalance != null, User::getBalance, minBalance)<br />
.le(maxBalance != null, User::getBalance, maxBalance)<br />
.list();<br />
// 3.处理vo<br />
return BeanUtil.copyToList(users, UserVO.class);<br />
}</td>
</tr>
</tbody>
</table>

链式编程的最后一步list()就是执行SQL，告诉MP调用结果需要是一个list集合，可选的方法有：

.one()：最多1个结果

.list()：返回集合结果

.count()：返回计数结果

MybatisPlus会根据链式编程的最后一个方法来判断最终的返回结果。

与lambdaQuery方法类似，IService中的lambdaUpdate方法可以非常方便的实现复杂更新业务。

**案例二**：改造根据id修改用户余额接口，如果扣减后余额为0，则将用户status修改为冻结状态（status=2）

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
@Transactional<br />
public void deductBalance(Long id, Integer money) {<br />
// 1.查询用户<br />
User user = getById(id);<br />
// 2.校验用户状态<br />
if (user == null || user.getStatus() == 2) {<br />
throw new RuntimeException("用户状态异常！");<br />
}<br />
// 3.校验余额是否充足<br />
if (user.getBalance() &lt; money) {<br />
throw new RuntimeException("用户余额不足！");<br />
}<br />
// 4.扣减余额 update tb_user set balance = balance - ?<br />
int remainBalance = user.getBalance() - money;<br />
lambdaUpdate()<br />
.set(User::getBalance, remainBalance) // 更新余额<br />
.set(remainBalance == 0, User::getStatus, 2) // 动态判断，是否更新status<br />
.eq(User::getId, id)<br />
.eq(User::getBalance, user.getBalance()) // 乐观锁<br />
.update();<br />
}</td>
</tr>
</tbody>
</table>

**3.4 批量新增**

创建方法buildUser用于得到一条用户信息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private User buildUser(int i) {<br />
User user = new User();<br />
user.setUsername("user_" + i);<br />
user.setPassword("123");<br />
user.setPhone("" + (18688190000L + i));<br />
user.setBalance(2000);<br />
user.setInfo("{\"age\": 24, \"intro\": \"英文老师\", \"gender\": \"female\"}");<br />
user.setCreateTime(LocalDateTime.now());<br />
user.setUpdateTime(user.getCreateTime());<br />
return user;<br />
}</td>
</tr>
</tbody>
</table>

逐条插入的代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testSaveOneByOne() {<br />
long b = System.currentTimeMillis();<br />
for (int i = 1; i &lt;= 100000; i++) {<br />
userService.save(buildUser(i));<br />
}<br />
long e = System.currentTimeMillis();<br />
System.out.println("耗时：" + (e - b));<br />
}</td>
</tr>
</tbody>
</table>

批量插入的代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testSaveBatch() {<br />
// 准备10万条数据<br />
List&lt;User&gt; list = new ArrayList&lt;&gt;(1000);<br />
long b = System.currentTimeMillis();<br />
for (int i = 1; i &lt;= 100000; i++) {<br />
list.add(buildUser(i));<br />
// 每1000条批量插入一次<br />
if (i % 1000 == 0) {<br />
userService.saveBatch(list);<br />
list.clear();<br />
}<br />
}<br />
long e = System.currentTimeMillis();<br />
System.out.println("耗时：" + (e - b));<br />
}</td>
</tr>
</tbody>
</table>

由于批量插入每次都传递一个集合，所以插入速率会显著提高，但是，运行时间还是比较长，效率低。

先简单查看一下MybatisPlus源码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Transactional(rollbackFor = Exception.class)<br />
@Override<br />
public boolean saveBatch(Collection&lt;T&gt; entityList, int batchSize) {<br />
String sqlStatement = getSqlStatement(SqlMethod.INSERT_ONE);<br />
return executeBatch(entityList, batchSize, (sqlSession, entity) -&gt; sqlSession.insert(sqlStatement, entity));<br />
}<br />
// ...SqlHelper<br />
public static &lt;E&gt; boolean executeBatch(Class&lt;?&gt; entityClass, Log log, Collection&lt;E&gt; list, int batchSize, BiConsumer&lt;SqlSession, E&gt; consumer) {<br />
Assert.isFalse(batchSize &lt; 1, "batchSize must not be less than one");<br />
return !CollectionUtils.isEmpty(list) &amp;&amp; executeBatch(entityClass, log, sqlSession -&gt; {<br />
int size = list.size();<br />
int idxLimit = Math.min(batchSize, size);<br />
int i = 1;<br />
for (E element : list) {<br />
consumer.accept(sqlSession, element);<br />
if (i == idxLimit) {<br />
sqlSession.flushStatements();<br />
idxLimit = Math.min(idxLimit + batchSize, size);<br />
}<br />
i++;<br />
}<br />
});<br />
}</td>
</tr>
</tbody>
</table>

可以发现其实MybatisPlus的批处理是基于PrepareStatement的预编译模式，然后批量提交，最终在数据库执行时还是会有多条insert语句，逐条插入数据，但这是MySQL数据库的原因，MybatisPlus不背锅。

如果想要批量插入，一次提交多条数据，需要修改MySQL的客户端连接参数rewriteBatchedStatements，这个参数的默认值是false，我们需要修改连接参数，将其配置为true（在url最后后拼接即可）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
datasource:<br />
url: jdbc:mysql://127.0.0.1:3306/mp?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai&amp;rewriteBatchedStatements=true<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: root<br />
password: MySQL123</td>
</tr>
</tbody>
</table>

此时再次测试，批处理的效率就很高了。

**三、扩展功能**

**1.代码生成**

在使用MybatisPlus的过程中，基础的Mapper、Service、PO代码相对固定，重复高（仅仅泛型不一样），如果有多张表，就需要写很多次。虽然MybatisPlus官方提供了代码生成器可以根据数据库表结构生成PO、Mapper、Service等相关代码，但是代码生成器同样要编码使用，也很麻烦。

通过idea的MybatisPlus插件，可以基于图形化界面完成MybatisPlus的代码生成，非常简单。

**1.1 安装插件**

在Idea的plugins市场中搜索并安装MyBatisPlus插件，然后重启idea：

<img src="../assets/MyBatisPlus笔记/media/image19.png" style="width:5.70833in;height:1.10417in" />

**1.2 使用**

以生成address表对应的实体和mapper等基础代码为例学习使用MyBatisPlus插件。

配置数据库地址，在Idea顶部菜单中，找到other，选择Config Database：

<img src="../assets/MyBatisPlus笔记/media/image20.png" style="width:5.75in;height:0.78125in" />

填写数据库连接的基本信息：

<img src="../assets/MyBatisPlus笔记/media/image21.png" style="width:5.75in;height:2.36458in" />

点击OK后，再次点击Idea顶部菜单中的other，然后选择Code Generator:

<img src="../assets/MyBatisPlus笔记/media/image22.png" style="width:5.75in;height:0.53125in" />

在弹出的表单中填写信息：

<img src="../assets/MyBatisPlus笔记/media/image23.png" style="width:5.75in;height:1.98958in" />

最后查看项目就会发现相应的代码就已经生成了。

**2.静态工具**

有时Service之间也会相互调用，为了避免出现循环依赖问题，MybatisPlus提供一个静态工具类：Db，其中的一些静态方法与IService中方法签名基本一致，也可以帮助我们实现CRUD功能：

<img src="../assets/MyBatisPlus笔记/media/image24.png" style="width:5.75in;height:4.09375in" />

示例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testDbGet() {<br />
User user = Db.getById(1L, User.class);<br />
System.out.println(user);<br />
}<br />
<br />
@Test<br />
void testDbList() {<br />
// 利用Db实现复杂条件查询<br />
List&lt;User&gt; list = Db.lambdaQuery(User.class)<br />
.like(User::getUsername, "o")<br />
.ge(User::getBalance, 1000)<br />
.list();<br />
list.forEach(System.out::println);<br />
}<br />
<br />
@Test<br />
void testDbUpdate() {<br />
Db.lambdaUpdate(User.class)<br />
.set(User::getBalance, 2000)<br />
.eq(User::getUsername, "Rose");<br />
}</td>
</tr>
</tbody>
</table>

需求：改造根据id用户查询的接口，查询用户的同时返回用户收货地址列表

首先，我们要添加一个收货地址的VO对象：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.vo;<br />
<br />
import io.swagger.annotations.ApiModel;<br />
import io.swagger.annotations.ApiModelProperty;<br />
import lombok.Data;<br />
<br />
@Data<br />
@ApiModel(description = "收货地址VO")<br />
public class AddressVO{<br />
<br />
@ApiModelProperty("id")<br />
private Long id;<br />
<br />
@ApiModelProperty("用户ID")<br />
private Long userId;<br />
<br />
@ApiModelProperty("省")<br />
private String province;<br />
<br />
@ApiModelProperty("市")<br />
private String city;<br />
<br />
@ApiModelProperty("县/区")<br />
private String town;<br />
<br />
@ApiModelProperty("手机")<br />
private String mobile;<br />
<br />
@ApiModelProperty("详细地址")<br />
private String street;<br />
<br />
@ApiModelProperty("联系人")<br />
private String contact;<br />
<br />
@ApiModelProperty("是否是默认 1默认 0否")<br />
private Boolean isDefault;<br />
<br />
@ApiModelProperty("备注")<br />
private String notes;<br />
}</td>
</tr>
</tbody>
</table>

然后，改造原来的UserVO，添加一个地址属性：

<img src="../assets/MyBatisPlus笔记/media/image25.png" style="width:5.75in;height:0.86458in" />

接下来，修改UserController中根据id查询用户的业务接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/{id}")<br />
@ApiOperation("根据id查询用户")<br />
public UserVO queryUserById(@PathVariable("id") Long userId){<br />
// 基于自定义service方法查询<br />
return userService.queryUserAndAddressById(userId);<br />
}</td>
</tr>
</tbody>
</table>

由于查询业务复杂，所以要在service层来实现。首先在IUserService中定义方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.service;<br />
<br />
import com.baomidou.mybatisplus.extension.service.IService;<br />
import com.itheima.mp.domain.po.User;<br />
import com.itheima.mp.domain.vo.UserVO;<br />
<br />
public interface IUserService extends IService&lt;User&gt; {<br />
void deduct(Long id, Integer money);<br />
<br />
UserVO queryUserAndAddressById(Long userId);<br />
}</td>
</tr>
</tbody>
</table>

然后，在UserServiceImpl中实现该方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public UserVO queryUserAndAddressById(Long userId) {<br />
// 1.查询用户<br />
User user = getById(userId);<br />
if (user == null) {<br />
return null;<br />
}<br />
// 2.查询收货地址<br />
List&lt;Address&gt; addresses = Db.lambdaQuery(Address.class)<br />
.eq(Address::getUserId, userId)<br />
.list();<br />
// 3.处理vo<br />
UserVO userVO = BeanUtil.copyProperties(user, UserVO.class);<br />
userVO.setAddresses(BeanUtil.copyToList(addresses, AddressVO.class));<br />
return userVO;<br />
}</td>
</tr>
</tbody>
</table>

在查询地址时，采用了Db的静态方法，避免了注入AddressService，减少了循环依赖的风险。

**3.逻辑删除**

对于一些比较重要的数据，往往会采用逻辑删除的方案，即：

在表中添加一个字段标记数据是否被删除

当删除数据时把标记置为true

查询时过滤掉标记为true的数据

一旦采用了逻辑删除，所有的查询和删除逻辑都要跟着变化，非常麻烦。

为了解决这个问题，MybatisPlus就添加了对逻辑删除的支持。

|                                                                                                 |
|-------------------------------------------------------------------------------------------------|
| **注意**：只有MybatisPlus生成的SQL语句才支持自动的逻辑删除，自定义SQL需要自己手动处理逻辑删除。 |

例如，给address表添加一个逻辑删除字段：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
alter table address add deleted bit default b'0' null comment '逻辑删除';</td>
</tr>
</tbody>
</table>

然后给Address实体添加deleted字段：

<img src="../assets/MyBatisPlus笔记/media/image26.png" style="width:5.75in;height:0.98958in" />

接下来，在application.yml中配置逻辑删除字段：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
mybatis-plus:<br />
global-config:<br />
db-config:<br />
logic-delete-field: deleted # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)<br />
logic-delete-value: 1 # 逻辑已删除值(默认为 1)<br />
logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)</td>
</tr>
</tbody>
</table>

**测试**

首先，执行一个删除操作：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testDeleteByLogic() {<br />
// 删除方法与以前没有区别<br />
addressService.removeById(59L);<br />
}</td>
</tr>
</tbody>
</table>

方法与普通删除一模一样，但是底层的SQL逻辑变了：

<img src="../assets/MyBatisPlus笔记/media/image27.png" style="width:5.75in;height:0.4375in" />

查询一下试试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testQuery() {<br />
List&lt;Address&gt; list = addressService.list();<br />
list.forEach(System.out::println);<br />
}</td>
</tr>
</tbody>
</table>

会发现id为59的确实没有查询出来，而且SQL中也对逻辑删除字段做了判断：

<img src="../assets/MyBatisPlus笔记/media/image28.png" style="width:5.75in;height:0.23958in" />

|                                                                                                                                                                             |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **注意**：逻辑删除会导致数据库表垃圾数据越来越多，而且SQL全都需要对逻辑删除字段做判断，导致查询效率变低，所以不推荐使用逻辑删除，如果实在需要，可以把删除数据迁移到其他表。 |

**4.通用枚举**

User类中有一个用户状态字段status，它只有两个值：1（正常）、2（冻结），这种字段一般会定义一个枚举，业务判断时可以直接基于枚举做比较，但是数据库采用的是int类型，对应的是Integer类型，因此业务操作需要手动转换枚举与Integer，比较麻烦。

MybatisPlus提供了一个处理枚举的类型转换器，可以帮我们**把枚举类型与数据库类型自动转换**。

**4.1 定义枚举**

在com.itheima.mp.enums包下定义一个用户状态的枚举：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.enums;<br />
<br />
import com.baomidou.mybatisplus.annotation.EnumValue;<br />
import lombok.Getter;<br />
<br />
@Getter<br />
public enum UserStatus {<br />
NORMAL(1, "正常"),<br />
FREEZE(2, "冻结")<br />
;<br />
private final int value;<br />
private final String desc;<br />
<br />
UserStatus(int value, String desc) {<br />
this.value = value;<br />
this.desc = desc;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

把User类中的status字段改为UserStatus 类型：

<img src="../assets/MyBatisPlus笔记/media/image29.png" style="width:5.75in;height:0.73958in" />

要让MybatisPlus处理枚举与数据库类型自动转换，必须告诉MybatisPlus，枚举中的哪个字段的值作为数据库值。

MybatisPlus提供了@EnumValue注解来标记枚举属性：

<img src="../assets/MyBatisPlus笔记/media/image30.png" style="width:5.75in;height:0.64583in" />

**4.2 配置枚举处理器**

在application.yaml文件中添加配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
mybatis-plus:<br />
configuration:<br />
default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler</td>
</tr>
</tbody>
</table>

**4.3 测试**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testService() {<br />
List&lt;User&gt; list = userService.list();<br />
list.forEach(System.out::println);<br />
}</td>
</tr>
</tbody>
</table>

最终，查询出的User类的status字段会是枚举类型：

<img src="../assets/MyBatisPlus笔记/media/image31.png" style="width:5.75in;height:1.83333in" />

为了使前端页面查询结果也是枚举格式，我们需要修改UserVO中的status属性（这一步可有可无）：

<img src="../assets/MyBatisPlus笔记/media/image32.png" style="width:5.75in;height:0.35417in" />

并且，在UserStatus枚举中通过@JsonValue注解标记JSON序列化时展示的字段：

<img src="../assets/MyBatisPlus笔记/media/image33.png" style="width:5.75in;height:0.51042in" />

最终，前端得到的结果如下：

<img src="../assets/MyBatisPlus笔记/media/image34.png" style="width:5.75in;height:0.53125in" />

**5.JSON类型处理器**

数据库的user表中有一个info字段，是JSON类型，而目前User实体类中却是String类型。一旦把info改为对象类型，就需要在写入数据库时手动转为String，再读取数据库时，手动转换为对象，这会非常麻烦。

MybatisPlus提供了很多特殊类型字段的类型处理器，解决特殊字段类型与数据库类型转换的问题。例如处理JSON就可以使用JacksonTypeHandler处理器。

**5.1 定义实体**

首先，定义一个单独实体类来与info字段的属性匹配：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.po;<br />
<br />
import lombok.Data;<br />
<br />
@Data<br />
public class UserInfo {<br />
private Integer age;<br />
private String intro;<br />
private String gender;<br />
}</td>
</tr>
</tbody>
</table>

**5.2 使用类型处理器**

将User类的info字段修改为UserInfo类型，并声明类型处理器：

<img src="../assets/MyBatisPlus笔记/media/image35.png" style="width:5.75in;height:0.66667in" />

同时，在User类上添加一个注解，声明自动映射：

<img src="../assets/MyBatisPlus笔记/media/image36.png" style="width:5.75in;height:0.51042in" />

测试可以发现，所有数据都正确封装到UserInfo当中了。

同时，为了让页面返回的结果也以对象格式返回，我们要修改UserVO中的info字段：

<img src="../assets/MyBatisPlus笔记/media/image37.png" style="width:5.75in;height:0.46875in" />

**6.配置加密**

由于配置文件中的很多参数都是明文，如果开发人员发生流动，很容易导致敏感信息的泄露。所以MybatisPlus支持配置文件的加密和解密功能。

我们以数据库的用户名和密码为例。

**6.1 生成秘钥**

首先，我们利用AES工具生成一个随机秘钥，然后对用户名、密码加密：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp;<br />
<br />
import com.baomidou.mybatisplus.core.toolkit.AES;<br />
import org.junit.jupiter.api.Test;<br />
<br />
class MpDemoApplicationTests {<br />
@Test<br />
void contextLoads() {<br />
// 生成 16 位随机 AES 密钥<br />
String randomKey = AES.generateRandomKey();<br />
System.out.println("randomKey = " + randomKey);<br />
<br />
// 利用密钥对用户名加密<br />
String username = AES.encrypt("root", randomKey);<br />
System.out.println("username = " + username);<br />
<br />
// 利用密钥对密码加密<br />
String password = AES.encrypt("MySQL123", randomKey);<br />
System.out.println("password = " + password);<br />
<br />
}<br />
}</td>
</tr>
</tbody>
</table>

打印结果如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Plain Text<br />
randomKey = 6234633a66fb399f<br />
username = px2bAbnUfiY8K/IgsKvscg==<br />
password = FGvCSEaOuga3ulDAsxw68Q==</td>
</tr>
</tbody>
</table>

**6.2 修改配置**

修改application.yaml文件，把jdbc的用户名、密码修改为刚刚加密生成的密文：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
datasource:<br />
url: jdbc:mysql://127.0.0.1:3306/mp?useUnicode=true&amp;characterEncoding=UTF-8&amp;autoReconnect=true&amp;serverTimezone=Asia/Shanghai&amp;rewriteBatchedStatements=true<br />
driver-class-name: com.mysql.cj.jdbc.Driver<br />
username: mpw:px2bAbnUfiY8K/IgsKvscg== # 密文要以 mpw:开头<br />
password: mpw:FGvCSEaOuga3ulDAsxw68Q== # 密文要以 mpw:开头</td>
</tr>
</tbody>
</table>

**6.3 测试**

把刚才生成的秘钥添加到启动参数中，模版：--mpw.key=6234633a66fb399f

<img src="../assets/MyBatisPlus笔记/media/image38.png" style="width:5.75in;height:1.71875in" />

随意运行一个单元测试，可以发现数据库查询正常。

**四、插件功能**

MybatisPlus提供了很多的插件功能，进一步拓展其功能。目前已有的插件有：

PaginationInnerInterceptor：自动分页

TenantLineInnerInterceptor：多租户

DynamicTableNameInnerInterceptor：动态表名

OptimisticLockerInnerInterceptor：乐观锁

IllegalSQLInnerInterceptor：sql 性能规范

BlockAttackInnerInterceptor：防止全表更新与删除

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意</strong>：使用多个分页插件的时候需要注意插件定义顺序，建议使用顺序如下：</p>
<p>多租户，动态表名</p>
<p>分页，乐观锁</p>
<p>sql 性能规范，防止全表更新与删除</p></td>
</tr>
</tbody>
</table>

**1.分页插件**

在未引入分页插件的情况下，MybatisPlus是不支持分页功能的，IService和BaseMapper中的分页方法都无法正常起效。

**1.1 配置分页插件**

在com.itheima.mp.config包下新建一个配置类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.config;<br />
<br />
import com.baomidou.mybatisplus.annotation.DbType;<br />
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;<br />
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;<br />
import org.springframework.context.annotation.Bean;<br />
import org.springframework.context.annotation.Configuration;<br />
<br />
@Configuration<br />
public class MybatisConfig {<br />
<br />
@Bean<br />
public MybatisPlusInterceptor mybatisPlusInterceptor() {<br />
// 初始化核心插件<br />
MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();<br />
// 添加分页插件<br />
interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));<br />
return interceptor;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**1.2 分页API**

编写一个分页查询的测试：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testPageQuery() {<br />
// 1.分页查询，new Page()的两个参数分别是：页码、每页大小<br />
Page&lt;User&gt; p = userService.page(new Page&lt;&gt;(2, 2));<br />
// 2.总条数<br />
System.out.println("total = " + p.getTotal());<br />
// 3.总页数<br />
System.out.println("pages = " + p.getPages());<br />
// 4.数据<br />
List&lt;User&gt; records = p.getRecords();<br />
records.forEach(System.out::println);<br />
}</td>
</tr>
</tbody>
</table>

运行的SQL如下：

<img src="../assets/MyBatisPlus笔记/media/image39.png" style="width:5.75in;height:2.6875in" />

这里用到了分页参数，Page，即可以支持分页参数，也可以支持排序参数。常见的API如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
int pageNo = 1, pageSize = 5;<br />
// 分页参数<br />
Page&lt;User&gt; page = Page.of(pageNo, pageSize);<br />
// 排序参数, 通过OrderItem来指定<br />
page.addOrder(new OrderItem("balance", false));<br />
<br />
userService.page(page);</td>
</tr>
</tbody>
</table>

**2.通用分页实体**

实现一个用户分页查询的接口，接口规范如下：

请求方式：GET

请求路径：/users/page

请求参数：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"pageNo": 1,<br />
"pageSize": 5,<br />
"sortBy": "balance",<br />
"isAsc": false,<br />
"name": "o",<br />
"status": 1<br />
}</td>
</tr>
</tbody>
</table>

返回值：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"total": 100006,<br />
"pages": 50003,<br />
"list": [<br />
{<br />
"id": 1685100878975279298,<br />
"username": "user_9****",<br />
"info": {<br />
"age": 24,<br />
"intro": "英文老师",<br />
"gender": "female"<br />
},<br />
"status": "正常",<br />
"balance": 2000<br />
}<br />
]<br />
}</td>
</tr>
</tbody>
</table>

特殊说明：

如果排序字段为空，默认按照更新时间排序

排序字段不为空，则按照排序字段排序

这里需要定义3个实体：

UserQuery：分页查询条件的实体，包含分页、排序参数、过滤条件

PageDTO：分页结果实体，包含总条数、总页数、当前页数据

UserVO：用户页面视图实体

**2.1 实体**

在com.itheima.mp.query包下创建分页参数实体类PageQuery：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Data<br />
@ApiModel(description = "分页查询实体")<br />
public class PageQuery {<br />
@ApiModelProperty("页码")<br />
private Long pageNo;<br />
@ApiModelProperty("每页数据条数")<br />
private Long pageSize;<br />
@ApiModelProperty("排序字段")<br />
private String sortBy;<br />
@ApiModelProperty("是否升序")<br />
private Boolean isAsc;<br />
}</td>
</tr>
</tbody>
</table>

使已有的UserQuery继承PageQuery：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.query;<br />
<br />
import io.swagger.annotations.ApiModel;<br />
import io.swagger.annotations.ApiModelProperty;<br />
import lombok.Data;<br />
import lombok.EqualsAndHashCode;<br />
<br />
@EqualsAndHashCode(callSuper = true)<br />
@Data<br />
@ApiModel(description = "用户查询条件实体")<br />
public class UserQuery extends PageQuery {<br />
@ApiModelProperty("用户名关键字")<br />
private String name;<br />
@ApiModelProperty("用户状态：1-正常，2-冻结")<br />
private Integer status;<br />
@ApiModelProperty("余额最小值")<br />
private Integer minBalance;<br />
@ApiModelProperty("余额最大值")<br />
private Integer maxBalance;<br />
}</td>
</tr>
</tbody>
</table>

沿用之前定义的UserVO实体，最后定义分页实体PageDTO：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.dto;<br />
<br />
import io.swagger.annotations.ApiModel;<br />
import io.swagger.annotations.ApiModelProperty;<br />
import lombok.Data;<br />
<br />
import java.util.List;<br />
<br />
@Data<br />
@ApiModel(description = "分页结果")<br />
public class PageDTO&lt;T&gt; {<br />
@ApiModelProperty("总条数")<br />
private Long total;<br />
@ApiModelProperty("总页数")<br />
private Long pages;<br />
@ApiModelProperty("集合")<br />
private List&lt;T&gt; list;<br />
}</td>
</tr>
</tbody>
</table>

**2.2 开发接口**

在UserController中定义分页查询用户的接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.controller;<br />
<br />
import com.itheima.mp.domain.dto.PageDTO;<br />
import com.itheima.mp.domain.query.PageQuery;<br />
import com.itheima.mp.domain.vo.UserVO;<br />
import com.itheima.mp.service.UserService;<br />
import lombok.RequiredArgsConstructor;<br />
import org.springframework.web.bind.annotation.GetMapping;<br />
import org.springframework.web.bind.annotation.RequestMapping;<br />
import org.springframework.web.bind.annotation.RestController;<br />
<br />
@RestController<br />
@RequestMapping("users")<br />
@RequiredArgsConstructor<br />
public class UserController {<br />
<br />
private final UserService userService;<br />
<br />
@GetMapping("/page")<br />
public PageDTO&lt;UserVO&gt; queryUsersPage(UserQuery query){<br />
return userService.queryUsersPage(query);<br />
}<br />
<br />
// ...<br />
}</td>
</tr>
</tbody>
</table>

然后在IUserService中创建queryUsersPage方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
PageDTO&lt;UserVO&gt; queryUsersPage(PageQuery query);</td>
</tr>
</tbody>
</table>

接下来，在UserServiceImpl中实现该方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public PageDTO&lt;UserVO&gt; queryUsersPage(PageQuery query) {<br />
// 1.构建条件<br />
// 1.1.分页条件<br />
Page&lt;User&gt; page = Page.of(query.getPageNo(), query.getPageSize());<br />
// 1.2.排序条件<br />
if (query.getSortBy() != null) {<br />
page.addOrder(new OrderItem(query.getSortBy(), query.getIsAsc()));<br />
}else{<br />
// 默认按照更新时间排序<br />
page.addOrder(new OrderItem("update_time", false));<br />
}<br />
// 2.查询<br />
page(page);<br />
// 3.数据非空校验<br />
List&lt;User&gt; records = page.getRecords();<br />
if (records == null || records.size() &lt;= 0) {<br />
// 无数据，返回空结果<br />
return new PageDTO&lt;&gt;(page.getTotal(), page.getPages(), Collections.emptyList());<br />
}<br />
// 4.有数据，转换<br />
List&lt;UserVO&gt; list = BeanUtil.copyToList(records, UserVO.class);<br />
// 5.封装返回<br />
return new PageDTO&lt;UserVO&gt;(page.getTotal(), page.getPages(), list);<br />
}</td>
</tr>
</tbody>
</table>

启动项目，在浏览器访问http://localhost:8080/users/page?pageNo=1&pageSize=2就可以看到查询的数据了。

**2.3 改造PageQuery实体**

在刚才的代码中，从PageQuery到MybatisPlus的Page之间转换的过程还是比较麻烦的。

完全可以在PageQuery这个实体中定义一个工具方法，简化开发。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.query;<br />
<br />
import com.baomidou.mybatisplus.core.metadata.OrderItem;<br />
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;<br />
import lombok.Data;<br />
<br />
@Data<br />
public class PageQuery {<br />
private Integer pageNo;<br />
private Integer pageSize;<br />
private String sortBy;<br />
private Boolean isAsc;<br />
<br />
public &lt;T&gt; Page&lt;T&gt; toMpPage(OrderItem ... orders){<br />
// 1.分页条件<br />
Page&lt;T&gt; p = Page.of(pageNo, pageSize);<br />
// 2.排序条件<br />
// 2.1.先看前端有没有传排序字段<br />
if (sortBy != null) {<br />
p.addOrder(new OrderItem(sortBy, isAsc));<br />
return p;<br />
}<br />
// 2.2.再看有没有手动指定排序字段<br />
if(orders != null){<br />
p.addOrder(orders);<br />
}<br />
return p;<br />
}<br />
<br />
public &lt;T&gt; Page&lt;T&gt; toMpPage(String defaultSortBy, boolean isAsc){<br />
return this.toMpPage(new OrderItem(defaultSortBy, isAsc));<br />
}<br />
<br />
public &lt;T&gt; Page&lt;T&gt; toMpPageDefaultSortByCreateTimeDesc() {<br />
return toMpPage("create_time", false);<br />
}<br />
<br />
public &lt;T&gt; Page&lt;T&gt; toMpPageDefaultSortByUpdateTimeDesc() {<br />
return toMpPage("update_time", false);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

这样就可以省去从PageQuery到Page的转换：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
// 1.构建条件<br />
Page&lt;User&gt; page = query.toMpPageDefaultSortByCreateTimeDesc();</td>
</tr>
</tbody>
</table>

**2.4 改造PageDTO实体**

在查询出分页结果后，数据的非空校验，数据的vo转换都是模板代码，编写起来很麻烦。

完全可以将其封装到PageDTO的工具方法中，简化整个过程：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.itheima.mp.domain.dto;<br />
<br />
import cn.hutool.core.bean.BeanUtil;<br />
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;<br />
import lombok.AllArgsConstructor;<br />
import lombok.Data;<br />
import lombok.NoArgsConstructor;<br />
<br />
import java.util.Collections;<br />
import java.util.List;<br />
import java.util.function.Function;<br />
import java.util.stream.Collectors;<br />
<br />
@Data<br />
@NoArgsConstructor<br />
@AllArgsConstructor<br />
public class PageDTO&lt;V&gt; {<br />
private Long total;<br />
private Long pages;<br />
private List&lt;V&gt; list;<br />
<br />
/**<br />
* 返回空分页结果<br />
* @param p MybatisPlus的分页结果<br />
* @param &lt;V&gt; 目标VO类型<br />
* @param &lt;P&gt; 原始PO类型<br />
* @return VO的分页对象<br />
*/<br />
public static &lt;V, P&gt; PageDTO&lt;V&gt; empty(Page&lt;P&gt; p){<br />
return new PageDTO&lt;&gt;(p.getTotal(), p.getPages(), Collections.emptyList());<br />
}<br />
<br />
/**<br />
* 将MybatisPlus分页结果转为 VO分页结果<br />
* @param p MybatisPlus的分页结果<br />
* @param voClass 目标VO类型的字节码<br />
* @param &lt;V&gt; 目标VO类型<br />
* @param &lt;P&gt; 原始PO类型<br />
* @return VO的分页对象<br />
*/<br />
public static &lt;V, P&gt; PageDTO&lt;V&gt; of(Page&lt;P&gt; p, Class&lt;V&gt; voClass) {<br />
// 1.非空校验<br />
List&lt;P&gt; records = p.getRecords();<br />
if (records == null || records.size() &lt;= 0) {<br />
// 无数据，返回空结果<br />
return empty(p);<br />
}<br />
// 2.数据转换<br />
List&lt;V&gt; vos = BeanUtil.copyToList(records, voClass);<br />
// 3.封装返回<br />
return new PageDTO&lt;&gt;(p.getTotal(), p.getPages(), vos);<br />
}<br />
<br />
/**<br />
* 将MybatisPlus分页结果转为 VO分页结果，允许用户自定义PO到VO的转换方式<br />
* @param p MybatisPlus的分页结果<br />
* @param convertor PO到VO的转换函数<br />
* @param &lt;V&gt; 目标VO类型<br />
* @param &lt;P&gt; 原始PO类型<br />
* @return VO的分页对象<br />
*/<br />
public static &lt;V, P&gt; PageDTO&lt;V&gt; of(Page&lt;P&gt; p, Function&lt;P, V&gt; convertor) {<br />
// 1.非空校验<br />
List&lt;P&gt; records = p.getRecords();<br />
if (records == null || records.size() &lt;= 0) {<br />
// 无数据，返回空结果<br />
return empty(p);<br />
}<br />
// 2.数据转换<br />
List&lt;V&gt; vos = records.stream().map(convertor).collect(Collectors.toList());<br />
// 3.封装返回<br />
return new PageDTO&lt;&gt;(p.getTotal(), p.getPages(), vos);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

最终，业务层的代码可以简化为：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public PageDTO&lt;UserVO&gt; queryUserByPage(PageQuery query) {<br />
// 1.构建条件<br />
Page&lt;User&gt; page = query.toMpPageDefaultSortByCreateTimeDesc();<br />
// 2.查询<br />
page(page);<br />
// 3.封装返回<br />
return PageDTO.of(page, UserVO.class);<br />
}</td>
</tr>
</tbody>
</table>

如果希望自定义PO到VO的转换过程，可以这样做：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public PageDTO&lt;UserVO&gt; queryUserByPage(PageQuery query) {<br />
// 1.构建条件<br />
Page&lt;User&gt; page = query.toMpPageDefaultSortByCreateTimeDesc();<br />
// 2.查询<br />
page(page);<br />
// 3.封装返回<br />
return PageDTO.of(page, user -&gt; {<br />
// 拷贝属性到VO<br />
UserVO vo = BeanUtil.copyProperties(user, UserVO.class);<br />
// 用户名脱敏<br />
String username = vo.getUsername();<br />
vo.setUsername(username.substring(0, username.length() - 2) + "**");<br />
return vo;<br />
});<br />
}</td>
</tr>
</tbody>
</table>

最终查询的结果如下：

<img src="../assets/MyBatisPlus笔记/media/image40.png" style="width:5.75in;height:3.79167in" />
