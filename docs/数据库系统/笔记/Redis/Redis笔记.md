# Redis笔记

**一、快速入门**

**1.初始Redis**

**1.1 认识NoSQL**

NoSQL是一种非关系型数据库，是一种相对于传统关系型数据库而言，有很大差异的一种数据库。具体差异如下：

**结构化与非结构化**：传统的关系型数据库每张表都有严格的约束条件，如字段名、字段数据类型、字段约束；而NoSQL较为松散，没有严格的约束，可以是键值型、文档型、图类型等

**关联和非关联**：传统的关系型数据库表与表之间往往存在关联，如外键；而非关系型数据库不存在关联，维护关系可以通过业务逻辑或数据间的耦合。

**查询方式**：传统的关系型数据库基于SQL进行查询；而非关系型数据库查询语法五花八门，如Redis和MongoDB的查询语法就不一样

**事务**：传统的关系型数据库能满足事务的ACID特性；而非关系型数据库往往不支持事务，只能维持基本的数据一致性

**存储方式**：传统的关系型数据库数据存储在磁盘，性能收到影响；而非关系型数据库数据存储在内存，性能高

**扩展性**：关系型数据库集群模式一般是主从，主从数据一致，起到数据备份的作用，称为垂直扩展；而非关系型数据库可以将数据拆分到不同服务器，可以保存海量数据，成为水平扩展；关系型数据库如果想水平扩展，会因为关联带来麻烦。

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td></td>
<td>SQL</td>
<td>NoSQL</td>
</tr>
<tr class="even">
<td>数据结构</td>
<td>结构化</td>
<td>非结构化</td>
</tr>
<tr class="odd">
<td>数据关联</td>
<td>关联的</td>
<td>无关联的</td>
</tr>
<tr class="even">
<td>查询方式</td>
<td>SQL查询</td>
<td>非SQL</td>
</tr>
<tr class="odd">
<td>事务特性</td>
<td>ACID</td>
<td>BASE</td>
</tr>
<tr class="even">
<td>存储方式</td>
<td>磁盘</td>
<td>内存</td>
</tr>
<tr class="odd">
<td>扩展性</td>
<td>垂直</td>
<td>水平</td>
</tr>
<tr class="even">
<td>使用场景</td>
<td>1）数据结构固定<br />
2）对数据安全性、一致性要求较高</td>
<td>1）数据结构不固定<br />
2）对数据安全性、一致性要求不高<br />
3）对性能要求</td>
</tr>
</tbody>
</table>

**1.2 认识Redis**

Redis诞生于2009年，是一个基于内存的键值型NoSQL数据库。有如下特征：

键值型（key-value），value支持多种不同数据结构，功能丰富

单线程，每个命令具备原子性

低延迟，速度快（基于内存、IO多路复用、良好的编码）

支持数据持久化

支持主从集群、分片集群

支持多语言客户端

官网地址：

**\[该类型的内容暂不支持下载\]**

**1.3 安装Redis**

由于Redis官方没有提供Windows版本的安装包，所以在Linux操作系统上安装Redis。

**1.3.1 安装依赖**

安装Redis所需要的gcc依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
yum install -y gcc tcl</td>
</tr>
</tbody>
</table>

**1.3.2 上传并解压安装包**

将资料提供的Redis安装包上传到虚拟机的任意目录（这里用/usr/local/src目录），并解压缩：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
tar -xzf /usr/local/src/redis-6.2.6.tar.gz</td>
</tr>
</tbody>
</table>

进入redis目录：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
cd /usr/local/src/redis-6.2.6</td>
</tr>
</tbody>
</table>

运行编译命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
make &amp;&amp; make install</td>
</tr>
</tbody>
</table>

如果没有出错，应该就安装成功了。默认的安装路径是 /usr/local/bin目录：

<img src="../assets/Redis笔记/media/image1.png" style="width:5.75in;height:1in" />

此时，任意目录下都能运行如下指令：

redis-cli：是redis提供的命令行客户端

redis-server：是redis的服务端启动脚本

redis-sentinel：是redis的哨兵启动脚本

**1.3.3 启动**

redis的启动方式有很多种：

**默认启动**

安装完成后，在任意目录输入redis-server命令即可启动Redis：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-server</td>
</tr>
</tbody>
</table>

<img src="../assets/Redis笔记/media/image2.png" style="width:5.75in;height:2.58333in" />

这种启动属于前台启动，会阻塞整个会话窗口，窗口关闭或者按下Ctrl + C则Redis停止。不推荐使用。

**指定配置启动**

如果要让Redis以后台方式启动，则必须修改Redis配置文件redis.conf。

找到配置文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
cd /usr/local/src/redis-6.2.6</td>
</tr>
</tbody>
</table>

备份配置文件redis.conf：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
cp redis.conf redis.conf.bck</td>
</tr>
</tbody>
</table>

修改redis.conf文件中的配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0<br />
bind 0.0.0.0<br />
# 守护进程，修改为yes后即可后台运行<br />
daemonize yes<br />
# 密码，设置后访问Redis必须输入密码<br />
requirepass 123321<br />
<br />
# 监听的端口<br />
port 6379<br />
# 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志、持久化等文件会保存在这个目录<br />
dir .<br />
# 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15<br />
databases 1<br />
# 设置redis能够使用的最大内存<br />
maxmemory 512mb<br />
# 日志文件，默认为空，不记录日志，可以指定日志文件名<br />
logfile "redis.log"</td>
</tr>
</tbody>
</table>

启动Redis：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入redis安装目录<br />
cd /usr/local/src/redis-6.2.6<br />
# 启动<br />
redis-server redis.conf</td>
</tr>
</tbody>
</table>

停止服务：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，<br />
# 因为之前配置了密码，因此需要通过 -u 来指定密码<br />
redis-cli -u 123321 shutdown</td>
</tr>
</tbody>
</table>

**开机自启**

首先，新建一个系统服务文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
vi /etc/systemd/system/redis.service</td>
</tr>
</tbody>
</table>

内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
[Unit]<br />
Description=redis-server<br />
After=network.target<br />
<br />
[Service]<br />
Type=forking<br />
ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf<br />
PrivateTmp=true<br />
<br />
[Install]<br />
WantedBy=multi-user.target</td>
</tr>
</tbody>
</table>

然后重载系统服务：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
systemctl daemon-reload</td>
</tr>
</tbody>
</table>

执行下面的命令，让redis开机自启：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
systemctl enable redis</td>
</tr>
</tbody>
</table>

此时redis就成为了系统服务，可以用systemctl命令控制：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 启动<br />
systemctl start redis<br />
# 停止<br />
systemctl stop redis<br />
# 重启<br />
systemctl restart redis<br />
# 查看状态<br />
systemctl status redis</td>
</tr>
</tbody>
</table>

**1.4 Redis客户端**

**1.4.1 命令行客户端**

Redis安装完成后就自带了命令行客户端redis-cli：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-cli [options] [commonds]</td>
</tr>
</tbody>
</table>

常见的options有：

-h 127.0.0.1：指定要连接的redis节点的IP地址，默认是127.0.0.1

-p 6379：指定要连接的redis节点的端口，默认是6379

-a 123321：指定redis的访问密码

其中的commonds就是Redis的操作命令，例如：

ping：与redis服务端做心跳测试，服务端正常会返回pong

不指定commond时，会进入redis-cli的交互控制台：

<img src="../assets/Redis笔记/media/image3.png" style="width:5.75in;height:1.01042in" />

**1.4.2 图形化客户端**

Redis的图形化桌面客户端的windows安装包：

**\[该类型的内容暂不支持下载\]**

<img src="../assets/Redis笔记/media/image4.png" style="width:5.75in;height:1.6875in" />

**1.4.3 安装和使用**

双击资料中可执行文件rdm-2021.9.4.0.0.exe按照顺序安装即可。

安装后双击打开rdm，点击左上角的连接到Redis服务器按钮，在弹出的窗口中填写Redis服务信息：

<img src="../assets/Redis笔记/media/image5.png" style="width:5.75in;height:1.88542in" />

点击确定后，在左侧菜单会出现这个链接：

<img src="../assets/Redis笔记/media/image6.png" style="width:5.75in;height:0.19792in" />

点击即可建立连接：

<img src="../assets/Redis笔记/media/image7.png" style="width:5.75in;height:2.47917in" />

Redis默认有16个仓库，编号从0至15. 通过配置文件可以设置仓库数量，但是不超过16，并且不能自定义仓库名称。

如果是基于redis-cli连接Redis服务，可以通过select命令来选择数据库：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 选择 0号库<br />
select 0</td>
</tr>
</tbody>
</table>

*如果连接不上redis数据库，需要关闭Linux的防火墙：systemctl stop firewalld*

**2.Redis常见命令**

Redis是典型的key-value数据库，key一般是字符串，而value包含很多不同的数据类型：

<img src="../assets/Redis笔记/media/image8.png" style="width:5.75in;height:1.53125in" />

不同类型的命令称为一个group，通过help命令可以查看各种不同group的命令，如以下命令可以查看通用命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
help @generic</td>
</tr>
</tbody>
</table>

**2.1 Redis通用命令**

**通用命令**是任何数据类型都能使用的命令，常见的有：

KEYS：查看符合模板的所有key，\*代表任意个字符，如a\*表示以a开头的所有key

DEL：删除一个指定的key

EXISTS：判断key是否存在

EXPIRE：给一个key设置有效期，有效期到期时该key会被自动删除（需要键已经存在）

TTL：查看一个KEY的剩余有效期

通过help \[command\]命令可以查看一个命令的具体用法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 查看keys命令的帮助信息：<br />
127.0.0.1:6379&gt; help keys<br />
<br />
KEYS pattern<br />
summary: Find all keys matching the given pattern<br />
since: 1.0.0<br />
group: generic</td>
</tr>
</tbody>
</table>

**2.2 String类型**

String类型即字符串类型，是Redis中最简单的存储类型。根据字符串的格式不同，value又可以分为3类：

string：普通字符串

int：整数类型，可以做自增、自减操作

float：浮点类型，可以做自增、自减操作

不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同。

**String的常见命令有**：

SET：添加或者修改已经存在的一个String类型的键值对

GET：根据key获取String类型的value

MSET：批量添加多个String类型的键值对

MGET：根据多个key获取多个String类型的value

INCR：让一个整型的key自增1

INCRBY：让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2

INCRBYFLOAT：让一个浮点类型的数字自增并指定步长

SETNX：添加一个String类型的键值对，前提是这个key不存在，否则不执行

SETEX：添加一个String类型的键值对，并且指定有效期

**2.3 Key结构**

Redis的key允许由多个单词形成层级结构，多个单词之间用:隔开，格式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Plaintext<br />
项目名:业务名:类型:id</td>
</tr>
</tbody>
</table>

这个格式并不固定，也可以根据自己的需求来删除或添加词条，例如项目名称iheima，有user和product两种不同类型的数据，定义key：

user相关的key：**iheima:user:1**

product相关的key：**iheima:product:1**

String类型还可以存储JSON格式字符串，如set itheima:user:1 '{"id":1, "name": "Jack", "age": 21}'

**2.4 Hash类型**

String类型存放JSON数据时，操作某个字段很不方便，此时Hash类型的优势就体现出来了。

Hash类型也叫散列，其value是一个无序字典，类似于Java中的HashMap结构：

<img src="../assets/Redis笔记/media/image9.png" style="width:5.75in;height:1.375in" />

**Hash的常见命令有**：

HSET key field value：添加或者修改hash类型key的field的值

HGET key field：获取一个hash类型key的field的值

HMSET：批量添加多个hash类型key的field的值

HMGET：批量获取多个hash类型key的field的值

HGETALL：获取一个hash类型的key中的所有的field和value

HKEYS：获取一个hash类型的key中的所有的field

HINCRBY：让一个hash类型key的字段值自增并指定步长

HSETNX：添加一个hash类型的key的field值，前提是这个field不存在，否则不执行

**2.5 List类型**

List类型与Java中的LinkedList类似，可看作一个双向链表结构，支持正向检索和反向检索，特点如下：

有序

元素可以重复

插入和删除快

查询速度一般

**List的常见命令有**：

LPUSH key element ... ：向列表左侧插入一个或多个元素

LPOP key：移除并返回列表左侧的第一个元素，没有则返回nil

RPUSH key element ... ：向列表右侧插入一个或多个元素

RPOP key：移除并返回列表右侧的第一个元素

LRANGE key star end：返回一段角标范围内的所有元素

BLPOP和BRPOP：与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil

List类型的正向索引从0开始，反向索引从-1开始，如果想要正向获取列表所有内容，可以使用lrange key 0 -1实现。

**List模拟数据结构**（了解即可）：

用List模拟栈：入口和出口在同一边

用List模拟队列：入口和出口在不同边

用List模拟阻塞队列：入口和出口在不同边，并且出队时采用BLPOP或BRPOP

**2.6 Set类型**

Set类型与Java中的HashSet类似，可看作是一个value为null的HashMap，特点如下：

无序

元素不可重复

查找快

支持交集、并集、差集等功能

**Set的常见命令有**：

SADD key member ... ：向set中添加一个或多个元素

SREM key member ... ：移除set中的指定元素

SCARD key：返回set中元素的个数

SISMEMBER key member：判断一个元素是否存在于set中

SMEMBERS：获取set中的所有元素

SINTER key1 key2 ... ：求key1与key2的交集

SDIFF key1 key2 ... ：求key1与key2的差集

SUNION key1 key2 ...：求key1和key2的并集

**2.7 SortedSet类型**

SortedSet是一个可排序set集合，与Java中的TreeSet类似，但底层数据结构却差别很大，SortedSet中的每一个元素都有一个score属性，用于元素排序，底层是实现一个跳表（SkipList）加 hash表。特点如下：

可排序

元素不重复

查询速度快

**SortedSet的常见命令有**：

ZADD key score member：添加一个或多个元素到sorted set ，如果已经存在则更新其score值

ZREM key member：删除sorted set中的一个指定元素

ZSCORE key member : 获取sorted set中的指定元素的score值

ZRANK key member：获取sorted set 中的指定元素的排名

ZCARD key：获取sorted set中的元素个数

ZCOUNT key min max：统计score值在给定范围内的所有元素的个数

ZINCRBY key increment member：让sorted set中的指定元素自增，步长为指定的increment值

ZRANGE key min max：按照score排序后，获取指定排名范围内的元素

ZRANGEBYSCORE key min max：按照score排序后，获取指定score范围内的元素

ZDIFF、ZINTER、ZUNION：求差集、交集、并集

SortedSet的排序排名是从0开始的，依次递增。

SortedSet默认是采用**升序**排序，如果想要降序，只需要在命令的Z后加上REV即可，如：

升序：ZRANK key member

降序：Z**REV**RANK key member

**3.Redis的Java客户端**

Redis官网提供了各种语言的客户端：

**\[该类型的内容暂不支持下载\]**

Java的客户端有很多，比较推荐的有三种：

|             |                                                                                                                            |
|-------------|----------------------------------------------------------------------------------------------------------------------------|
| Redis客户端 | 描述                                                                                                                       |
| Jedis       | 以Redis命令作为方法名称，学习成本低，简单实用。但是Jedis实例是线程不安全的，多线程环境下需要基于连接池来使用               |
| lettuce     | Lettuce是基于Netty实现的，支持同步、异步和响应式编程方式，并且是线程安全的。支持Redis的哨兵模式、集群模式和管道模式        |
| Redisson    | Redisson是一个基于Redis实现的分布式、可伸缩的Java数据结构集合。包含了诸如Map、Queue、Lock、Semaphore、AtomicLong等强大功能 |

Jedis和Lettuce：提供了Redis命令对应的API，方便我们操作Redis。**SpringDataRedis**对这两种做了抽象和封装，后期会直接以SpringDataRedis来学习。

Redisson：在Redis基础上实现了分布式的可伸缩的java数据结构，例如Map、Queue等，而且支持跨进程的同步机制：Lock、Semaphore等待，适合实现特殊的功能需求。

**3.1 Jedis客户端**

Jedis的官网地址：

**\[该类型的内容暂不支持下载\]**

**3.1.1 快速入门**

**引入依赖**

新建一个maven项目后，引入如下依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--jedis--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;redis.clients&lt;/groupId&gt;<br />
&lt;artifactId&gt;jedis&lt;/artifactId&gt;<br />
&lt;version&gt;3.7.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--单元测试--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;<br />
&lt;artifactId&gt;junit-jupiter&lt;/artifactId&gt;<br />
&lt;version&gt;5.7.0&lt;/version&gt;<br />
&lt;scope&gt;test&lt;/scope&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**建立连接**

新建一个单元测试类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private Jedis jedis;<br />
<br />
@BeforeEach<br />
void setUp() {<br />
// 1.建立连接<br />
// jedis = new Jedis("192.168.150.101", 6379);<br />
jedis = JedisConnectionFactory.getJedis();<br />
// 2.设置密码<br />
jedis.auth("123321");<br />
// 3.选择库<br />
jedis.select(0);<br />
}</td>
</tr>
</tbody>
</table>

**测试单元**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testString() {<br />
// 存入数据<br />
String result = jedis.set("name", "虎哥");<br />
System.out.println("result = " + result);<br />
// 获取数据<br />
String name = jedis.get("name");<br />
System.out.println("name = " + name);<br />
}<br />
<br />
@Test<br />
void testHash() {<br />
// 插入hash数据<br />
jedis.hset("user:1", "name", "Jack");<br />
jedis.hset("user:1", "age", "21");<br />
<br />
// 获取<br />
Map&lt;String, String&gt; map = jedis.hgetAll("user:1");<br />
System.out.println(map);<br />
}</td>
</tr>
</tbody>
</table>

**释放资源**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@AfterEach<br />
void tearDown() {<br />
if (jedis != null) {<br />
jedis.close();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.1.2 连接池**

Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此推荐使用Jedis连接池代替Jedis的直连方式

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.jedis.util;<br />
<br />
import redis.clients.jedis.*;<br />
<br />
public class JedisConnectionFactory {<br />
<br />
private static JedisPool jedisPool;<br />
<br />
static {<br />
// 配置连接池<br />
JedisPoolConfig poolConfig = new JedisPoolConfig();<br />
poolConfig.setMaxTotal(8);<br />
poolConfig.setMaxIdle(8);<br />
poolConfig.setMinIdle(0);<br />
poolConfig.setMaxWaitMillis(1000);<br />
// 创建连接池对象，参数：连接池配置、服务端ip、服务端端口、超时时间、密码<br />
jedisPool = new JedisPool(poolConfig, "192.168.150.101", 6379, 1000, "123321");<br />
}<br />
<br />
public static Jedis getJedis(){<br />
return jedisPool.getResource();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**改造原始代码**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@BeforeEach<br />
void setUp(){<br />
//建立连接<br />
/*jedis = new Jedis("127.0.0.1",6379);*/<br />
jedis = JedisConnectionFacotry.getJedis();<br />
//选择库<br />
jedis.select(0);<br />
}<br />
<br />
@AfterEach<br />
void tearDown() {<br />
if (jedis != null) {<br />
jedis.close();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.2 SpringDataRedis客户端**

SpringDataRedis官网地址：

**\[该类型的内容暂不支持下载\]**

SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis。

提供了对不同Redis客户端的整合（Lettuce和Jedis）

提供了RedisTemplate统一API来操作Redis

支持Redis的发布订阅模型

支持Redis哨兵和Redis集群

支持基于Lettuce的响应式编程

支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化

支持基于Redis的JDKCollection实现

SpringDataRedis提供了RedisTemplate工具类，其中封装了各种对Redis的操作，并且将不同数据类型的操作API封装到了不同的类型中：

|                             |                 |                       |
|-----------------------------|-----------------|-----------------------|
| API                         | 返回值类型      | 说明                  |
| redisTemplate.opsForValue() | ValueOperations | 操作String类型数据    |
| redisTemplate.opsForHash()  | HashOperations  | 操作Hash类型数据      |
| redisTemplate.opsForList()  | ListOperations  | 操作List类型数据      |
| redisTemplate.opsForSet()   | SetOperations   | 操作Set类型数据       |
| redisTemplate.opsForZSet()  | ZSetOperations  | 操作SortedSet类型数据 |
| redisTemplate               |                 | 通用的命令            |

**3.2.1 快速入门**

SpringBoot已经提供了对SpringDataRedis的支持。

新建一个SpringBoot项目，引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;!--Redis依赖--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;<br />
&lt;/dependency&gt;<br />
&lt;!--连接池依赖--&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.apache.commons&lt;/groupId&gt;<br />
&lt;artifactId&gt;commons-pool2&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**配置Redis**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
redis:<br />
host: 192.168.150.101<br />
port: 6379<br />
password: 123321<br />
lettuce:<br />
pool:<br />
max-active: 8 #最大连接<br />
max-idle: 8 #最大空闲连接<br />
min-idle: 0 #最小空闲连接<br />
max-wait: 100ms #连接等待时间</td>
</tr>
</tbody>
</table>

**注入RedisTemplate**

SpringBoot已经自动装配，直接注入即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@SpringBootTest<br />
class RedisStringTests {<br />
<br />
@Autowired<br />
private RedisTemplate redisTemplate;<br />
}</td>
</tr>
</tbody>
</table>

**编写测试**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@SpringBootTest<br />
class RedisStringTests {<br />
<br />
@Autowired<br />
private RedisTemplate redisTemplate;<br />
<br />
@Test<br />
void testString() {<br />
// 写入一条String数据<br />
redisTemplate.opsForValue().set("name", "虎哥");<br />
// 获取string数据<br />
Object name = redisTemplate.opsForValue().get("name");<br />
System.out.println("name = " + name);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.2.2 自定义序列化**

RedisTemplate可以接收任意Object作为值写入Redis，只不过写入前会把Object序列化为字节形式，默认是采用JDK序列化：

<img src="../assets/Redis笔记/media/image10.png" style="width:5.75in;height:0.86458in" />

但是JDK序列化后内存占用高、可读性差，所以自定义RedisTemplate的序列化方式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration<br />
public class RedisConfig {<br />
<br />
@Bean<br />
public RedisTemplate&lt;String, Object&gt; redisTemplate(RedisConnectionFactory connectionFactory){<br />
// 创建RedisTemplate对象<br />
RedisTemplate&lt;String, Object&gt; template = new RedisTemplate&lt;&gt;();<br />
// 设置连接工厂<br />
template.setConnectionFactory(connectionFactory);<br />
// 创建JSON序列化工具<br />
GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();<br />
// 设置Key的序列化<br />
template.setKeySerializer(RedisSerializer.string());<br />
template.setHashKeySerializer(RedisSerializer.string());<br />
// 设置Value的序列化<br />
template.setValueSerializer(jsonRedisSerializer);<br />
template.setHashValueSerializer(jsonRedisSerializer);<br />
// 返回<br />
return template;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

这样采用JSON序列化代替JDK序列化，可读性大大提高：

<img src="../assets/Redis笔记/media/image11.png" style="width:5.75in;height:1.02083in" />

但是会记录序列化时对应的class名称，以至于查询时实现自动反序列化。

**3.2.3 StringRedisTemplate**

为了更加节省内存，可以不使用JSON序列化器，统一使用String序列化器，要求只能存储String类型的key和value。如果要存对象，可以手动实现序列化和反序列化：

<img src="../assets/Redis笔记/media/image12.png" style="width:5.75in;height:2.03125in" />

StringRedisTemplate是SpringDataRedis提供的RedisTemplate的子类，它的key和value的序列化方式默认就是String方式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Autowired<br />
private StringRedisTemplate stringRedisTemplate;<br />
// JSON序列化工具<br />
private static final ObjectMapper mapper = new ObjectMapper();<br />
<br />
@Test<br />
void testSaveUser() throws JsonProcessingException {<br />
// 创建对象<br />
User user = new User("虎哥", 21);<br />
// 手动序列化<br />
String json = mapper.writeValueAsString(user);<br />
// 写入数据<br />
stringRedisTemplate.opsForValue().set("user:200", json);<br />
<br />
// 获取数据<br />
String jsonUser = stringRedisTemplate.opsForValue().get("user:200");<br />
// 手动反序列化<br />
User user1 = mapper.readValue(jsonUser, User.class);<br />
System.out.println("user1 = " + user1);<br />
}</td>
</tr>
</tbody>
</table>

**二、Redis实战**

**1.短信登录**

**1.1 环境准备**

**准备数据库**

**\[hmdp.sql\]**

执行以上hmdp.sql脚本文件，得到数据库如下（MySQL版本5.7以上）：

tb_user：用户表

tb_user_info：用户详情表

tb_shop：商户信息表

tb_shop_type：商户类型表

tb_blog：用户日记表（达人探店日记）

tb_follow：用户关注表

tb_voucher：优惠券表

tb_voucher_order：优惠券的订单表

**导入后端项目**

**\[hm-dianping.zip\]**

用idea导入上面的hm-dianping项目，并修改配置文件中的mysql、redis等地址信息为自己对应的信息。

启动项目，打开浏览器访问http://localhost:8081/shop-type/list，如果看到数据就表示项目导入成功。

**导入前端工程**

**\[nginx-1.18.0.zip\]**

将上面的前端工程nginx-1.18.0放在一个不包含中文空格的路径下，双击nginx.exe启动前端项目。

**运行前端项目**

打开浏览器，开启浏览器的手机模式，然后访问http://localhost:8080，就可以看到前端页面了：

<img src="../assets/Redis笔记/media/image13.png" style="width:5.75in;height:2.46875in" />

**1.2 基于Session实现登录**

基于Session实现登录功能分为三个接口：

**发送验证码**：用户提交手机号后，校验手机号是否合法，不合法重新输入，合法就生成并保存验证码，并将验证码响应给用户。

**短信验证码登录、注册**：后端拿到手机号和验证码后，和session中的验证码比较，不一致无法通过，一致就查询用户是否存在，不存在的用户创建并保存一个新用户，然后同一致保存用户到session。

**校验登录状态**：用户请求时，后台从Cookie获取sessionID，然后从session中获取用户信息，只有用户存在才保存用户信息到ThreadLocal并放行，否则不放行。

<img src="../assets/Redis笔记/media/image14.png" style="width:5.75in;height:2.19792in" />

**1.2.1 发送验证码**

完善UserContrllor对应的TODO项：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
/**<br />
* 发送手机验证码<br />
*/<br />
@PostMapping("code")<br />
public Result sendCode(@RequestParam("phone") String phone, HttpSession session) {<br />
// 发送短信验证码并保存验证码<br />
return userService.sendCode(phone, session);<br />
}</td>
</tr>
</tbody>
</table>

IUserService接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
Result sendCode(String phone, HttpSession session);</td>
</tr>
</tbody>
</table>

UserServiceImpl类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result sendCode(String phone, HttpSession session) {<br />
// 1.校验手机号<br />
if (RegexUtils.isPhoneInvalid(phone)) {<br />
// 2.如果不符合，返回错误信息<br />
return Result.fail("手机号格式错误！");<br />
}<br />
// 3.符合，生成验证码<br />
String code = RandomUtil.randomNumbers(6);<br />
<br />
// 4.保存验证码到 session<br />
session.setAttribute("code", code);<br />
// 5.发送验证码<br />
log.debug("发送短信验证码成功，验证码：{}", code);<br />
// 返回ok<br />
return Result.ok();<br />
}</td>
</tr>
</tbody>
</table>

**1.2.2 登录注册**

完善UserContrllor对应的TODO项：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
/**<br />
* 登录功能<br />
* @param loginForm 登录参数，包含手机号、验证码；或者手机号、密码<br />
*/<br />
@PostMapping("/login")<br />
public Result login(@RequestBody LoginFormDTO loginForm, HttpSession session){<br />
// 实现登录功能<br />
return userService.login(loginForm, session);<br />
}</td>
</tr>
</tbody>
</table>

IUserService接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
Result login(LoginFormDTO loginForm, HttpSession session);</td>
</tr>
</tbody>
</table>

UserServiceImpl类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result login(LoginFormDTO loginForm, HttpSession session) {<br />
// 1.校验手机号<br />
String phone = loginForm.getPhone();<br />
if (RegexUtils.isPhoneInvalid(phone)) {<br />
// 2.如果不符合，返回错误信息<br />
return Result.fail("手机号格式错误！");<br />
}<br />
// 3.校验验证码<br />
Object cacheCode = session.getAttribute("code");<br />
String code = loginForm.getCode();<br />
if(cacheCode == null || !cacheCode.toString().equals(code)){<br />
//3.不一致，报错<br />
return Result.fail("验证码错误");<br />
}<br />
//一致，根据手机号查询用户<br />
User user = query().eq("phone", phone).one();<br />
<br />
//5.判断用户是否存在<br />
if(user == null){<br />
//不存在，则创建<br />
user = createUserWithPhone(phone);<br />
}<br />
//7.保存用户信息到session中<br />
session.setAttribute("user", BeanUtils.copyProperties(user,UserDTO.class));<br />
<br />
return Result.ok();<br />
}<br />
<br />
private User createUserWithPhone(String phone) {<br />
// 1.创建用户<br />
User user = new User();<br />
user.setPhone(phone);<br />
user.setNickName(USER_NICK_NAME_PREFIX + RandomUtil.randomString(10));<br />
// 2.保存用户<br />
save(user);<br />
return user;<br />
}</td>
</tr>
</tbody>
</table>

**1.2.3 登录拦截功能**

在utils包下定义拦截器LoginInterceptor：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class LoginInterceptor implements HandlerInterceptor {<br />
<br />
@Override<br />
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {<br />
//1.获取session<br />
HttpSession session = request.getSession();<br />
//2.获取session中的用户<br />
Object user = session.getAttribute("user");<br />
//3.判断用户是否存在<br />
if(user == null){<br />
//4.不存在，拦截，返回401状态码<br />
response.setStatus(401);<br />
return false;<br />
}<br />
//5.存在，保存用户信息到Threadlocal<br />
UserHolder.saveUser((UserDTO) user);<br />
//6.放行<br />
return true;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

在config包下注册拦截器，使其生效：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration<br />
public class MvcConfig implements WebMvcConfigurer {<br />
<br />
@Override<br />
public void addInterceptors(InterceptorRegistry registry) {<br />
// 登录拦截器<br />
registry.addInterceptor(new LoginInterceptor())<br />
.excludePathPatterns(<br />
"/shop/**",<br />
"/voucher/**",<br />
"/shop-type/**",<br />
"/upload/**",<br />
"/blog/hot",<br />
"/user/code",<br />
"/user/login"<br />
);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

完善UserContrllor对应的TODO项：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/me")<br />
public Result me(){<br />
// 获取当前登录的用户并返回<br />
UserDTO user = UserHolder.getUser();<br />
return Result.ok(user);<br />
}</td>
</tr>
</tbody>
</table>

**1.3 Session共享**

实际开发中，往往采用集群分布，即使用多台tomcat处理请求，由于http协议是无状态协议，假如第一次登录请求到第一台tomcat，此时第一台tomcat上会存储对应的session，其他tomcat并没有存放这个session，下一次请求到第二台tomcat时，由于服务器没有对应的session，会认为用户没有登录，当然，这时用户已经登录了。

Session共享即当任意一台服务器的session修改时，都会同步给其他的Tomcat服务器的session，此时就能解决集群分布下session失效问题。但是，这样会带来额外的开销，给服务器带来压力。

<img src="../assets/Redis笔记/media/image15.png" style="width:5.75in;height:2.58333in" />

**1.4 Redis代替Session共享**

由于Redis是基于内存的，而且可被多台tomcat服务器共享，所以用Redis代替Session共享能很好的解决集群分布的session问题。

**1.4.1 业务流程**

**发送短信验证码**：和原来的业务逻辑基本一致，只不过是验证码不再是保存到session，而是保存到Redis。

**短信验证码登录、注册**：后端拿到手机号和验证码后，从redis中获取正确的验证码，然后和用户输入的验证码校对，不一致无法通过，一致就根据手机号从MySQL获取用户，用户不存在创建并保存一个新用户，然后同一致保存用户到Redis中。

<img src="../assets/Redis笔记/media/image16.png" style="width:5.75in;height:2.85417in" />

**校验登录状态**：和原来的业务逻辑基本一致，只是获取用户不再是从session获取，而是从Redis获取。

<img src="../assets/Redis笔记/media/image17.png" style="width:5.75in;height:2.77083in" />

**1.4.2 Key-Value的设计**

再进行往Redis中存数据时，需要考虑如下几点：

value的数据结构（数据类型）

key的选择：唯一性、方便携带

合适的存储粒度：内存占用

如验证码使用string类型，键使用login:code:手机号的格式；用户信息使用Hash类型，键使用login:token:UUID的格式

**1.4.3 代码改造**

UserServiceImpl代码改造：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmdp.service.impl;<br />
...<br />
@Service<br />
@Slf4j<br />
public class UserServiceImpl extends ServiceImpl&lt;UserMapper, User&gt; implements IUserService {<br />
<br />
@Resource<br />
private StringRedisTemplate stringRedisTemplate;<br />
<br />
@Override<br />
public Result sendCode(String phone, HttpSession session) {<br />
//校验手机号是否合法<br />
if(RegexUtils.isPhoneInvalid(phone)){<br />
//不合法，返回错误信息<br />
return Result.fail("手机号格式不正确");<br />
}<br />
<br />
//合法，生成验证码<br />
String code = RandomUtil.randomNumbers(6);<br />
<br />
//保存验证码到redis<br />
stringRedisTemplate.opsForValue().set(RedisConstants.LOGIN_CODE_KEY + phone, code, RedisConstants.LOGIN_CODE_TTL, TimeUnit.MINUTES);<br />
<br />
//发送验证码<br />
log.debug("验证码：{}", code);<br />
<br />
//返回OK<br />
return Result.ok();<br />
}<br />
<br />
@Override<br />
public Result login(LoginFormDTO loginForm, HttpSession session) {<br />
//验证手机号是否合法<br />
String phone = loginForm.getPhone();<br />
if(phone == null || RegexUtils.isPhoneInvalid(phone)){<br />
//手机号不合法返回错误信息<br />
return Result.fail("手机号格式不正确");<br />
}<br />
<br />
//校验验证码是否一致<br />
String rightCode = stringRedisTemplate.opsForValue().get(RedisConstants.LOGIN_CODE_KEY + phone);<br />
String userCode = loginForm.getCode();<br />
if(rightCode == null || !userCode.equals(rightCode)){<br />
//不一致返回错误<br />
return Result.fail("验证码不正确，请检查后重新输入");<br />
}<br />
<br />
//根据手机号获取用户<br />
User user = query().eq("phone", phone).one();<br />
<br />
//用户不存在就创建一个用户到数据库<br />
if(user == null){<br />
user = createUserWithPhone(phone);<br />
}<br />
<br />
//保存用户到redis<br />
String token = UUID.randomUUID().toString();<br />
UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);<br />
Map&lt;String, Object&gt; userMap = BeanUtil.beanToMap(userDTO, new HashMap&lt;&gt;(),<br />
CopyOptions.create()<br />
.setIgnoreNullValue(true)<br />
.setFieldValueEditor((fieldName, fieldValue) -&gt; fieldValue.toString()));<br />
stringRedisTemplate.opsForHash().putAll(RedisConstants.LOGIN_USER_KEY + token, userMap);<br />
stringRedisTemplate.expire(RedisConstants.LOGIN_USER_KEY + token, RedisConstants.LOGIN_USER_TTL, TimeUnit.MINUTES);<br />
<br />
//返回OK<br />
return Result.ok(token);<br />
}<br />
<br />
private User createUserWithPhone(String phone) {<br />
...<br />
}<br />
}</td>
</tr>
</tbody>
</table>

重写LoginInterceptor拦截器的业务逻辑：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmdp.utils;<br />
<br />
public class LoginInterceptor implements HandlerInterceptor {<br />
<br />
private StringRedisTemplate stringRedisTemplate;<br />
<br />
public LoginInterceptor(StringRedisTemplate stringRedisTemplate) {<br />
this.stringRedisTemplate = stringRedisTemplate;<br />
}<br />
<br />
@Override<br />
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {<br />
//获取请求头中的token<br />
String token = request.getHeader("authorization");<br />
<br />
//token不存在，返回401状态码，拦截<br />
if(StrUtil.isBlank(token)){<br />
response.setStatus(401);<br />
return false;<br />
}<br />
<br />
//基于token获取redis中的用户<br />
String key = RedisConstants.LOGIN_USER_KEY + token;<br />
Map&lt;Object, Object&gt; userMap = stringRedisTemplate.opsForHash().entries(key);<br />
<br />
//判断用户是否存在<br />
if(userMap.isEmpty()){<br />
//用户不存在返回401状态码，拦截<br />
response.setStatus(401);<br />
return false;<br />
}<br />
<br />
//将查到的用户转换成userDTO<br />
UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap, new UserDTO(), false);<br />
<br />
//保存用户信息到ThreadLocal<br />
UserHolder.saveUser(userDTO);<br />
<br />
//刷新token有效期<br />
stringRedisTemplate.expire(key, RedisConstants.LOGIN_USER_TTL, TimeUnit.MINUTES);<br />
<br />
//放行<br />
return true;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

|                                                                                                                                            |
|--------------------------------------------------------------------------------------------------------------------------------------------|
| **注意**：由于LoginInterceptor的对象的手动创建的，而非Spring创建的，所以并不能通过@Resource或@Autowired注解注入StringRedisTemplate的对象。 |

修改拦截器注册类MvcConfig：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmdp.config;<br />
<br />
@Configuration<br />
public class MvcConfig implements WebMvcConfigurer {<br />
@Resource<br />
private StringRedisTemplate stringRedisTemplate;<br />
<br />
@Override<br />
public void addInterceptors(InterceptorRegistry registry) {<br />
// 登录拦截器<br />
registry.addInterceptor(new LoginInterceptor(stringRedisTemplate))<br />
... //这部分不变<br />
);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**1.4.4 解决状态登录刷新问题**

在注册拦截器LoginInterceptor时，排除了一些路径，如果用户在指定时间内只使用了这些排除的路径，那超时会被判定未登录，显然用户体验不好。

可以在LoginInterceptor拦截器之前再定义一个拦截器，拦截所有请求，这个拦截器实现基本逻辑（用户存在性判断以外的其他逻辑），并更新token有效期：

<img src="../assets/Redis笔记/media/image18.png" style="width:5.75in;height:1.84375in" />

在utils包下新建一个拦截器RefreshTokenInterceptor：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmdp.utils;<br />
<br />
public class RefreshTokenInterceptor implements HandlerInterceptor {<br />
@Resource<br />
private StringRedisTemplate stringRedisTemplate;<br />
<br />
public RefreshTokenInterceptor(StringRedisTemplate stringRedisTemplate) {<br />
this.stringRedisTemplate = stringRedisTemplate;<br />
}<br />
<br />
@Override<br />
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {<br />
// 1.获取请求头中的token<br />
String token = request.getHeader("authorization");<br />
if (StrUtil.isBlank(token)) {<br />
return true;<br />
}<br />
<br />
// 2.基于token获取redis中的用户<br />
String key = RedisConstants.LOGIN_USER_KEY + token;<br />
Map&lt;Object, Object&gt; userMap = stringRedisTemplate.opsForHash().entries(key);<br />
<br />
// 3.判断用户是否存在<br />
if (userMap.isEmpty()) {<br />
return true;<br />
}<br />
<br />
// 5.将查询到的hash数据转为UserDTO<br />
UserDTO userDTO = BeanUtil.fillBeanWithMap(userMap, new UserDTO(), false);<br />
<br />
// 6.存在，保存用户信息到 ThreadLocal<br />
UserHolder.saveUser(userDTO);<br />
<br />
// 7.刷新token有效期<br />
stringRedisTemplate.expire(key, RedisConstants.LOGIN_USER_TTL, TimeUnit.MINUTES);<br />
<br />
// 8.放行<br />
return true;<br />
}<br />
<br />
@Override<br />
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {<br />
UserHolder.removeUser();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

修改拦截器注册类MvcConfig：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public void addInterceptors(InterceptorRegistry registry) {<br />
// 登录拦截器<br />
registry.addInterceptor(new LoginInterceptor(stringRedisTemplate))<br />
.excludePathPatterns(<br />
"/shop/**",<br />
"/voucher/**",<br />
"/shop-type/**",<br />
"/upload/**",<br />
"/blog/hot",<br />
"/user/code",<br />
"/user/login"<br />
).order(1);<br />
//token刷新拦截器<br />
registry.addInterceptor(new RefreshTokenInterceptor(stringRedisTemplate)).addPathPatterns("/**").order(0);<br />
}</td>
</tr>
</tbody>
</table>

**2.商户查询缓存**

**2.1 缓存介绍**

一个实际存在的网站，如果访问的用户量很大，这些用户的请求都会达到SQL数据库，此时SQL数据库的压力就很大，通过缓存，可以减轻数据库的压力。

缓存，顾名思义，就是数据交换的**缓冲区**，俗称的缓存就是**缓冲区内的数据**。比如，可以把数据库里的数据缓存到内存中（常用Redis），由于内存的速度显著高于磁盘，当请求到达服务器时，服务器就会尝试从缓存中获取数据，获取成功就返回缓存中的数据，否则再访问数据库。

当然，缓存是双面的，有优点和缺点：

缓存的作用（优点）：降低后端负载；提高读写效率，降低相应时间

缓存的成本（缺点）：数据一致性成本；代码维护成本；运维成本

数据一致性：数据库发生改变，Redis还没及时更新，那么从缓存内取到的数据就会出错，就是数据一致性问题

**2.2 添加商户缓存**

**2.2.1 缓存模型和思路**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/{id}")<br />
public Result queryShopById(@PathVariable("id") Long id) {<br />
//这里是直接查询数据库<br />
return shopService.queryById(id);<br />
}</td>
</tr>
</tbody>
</table>

<img src="../assets/Redis笔记/media/image19.png" style="width:5.75in;height:0.73958in" />

当前端点击103茶餐厅选项后（其他也一样），后端就请求到queryShopById方法从数据库获取店铺信息，可以缓存对应的店铺信息到Redis中，后续请求时只要从Redis中取数据即可，从而降低数据库压力并提高效率，相应的缓存模型和业务逻辑为：

<img src="../assets/Redis笔记/media/image20.png" style="width:5.75in;height:2.04167in" />

**2.2.2 代码实现**

ShopController：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/{id}")<br />
public Result queryShopById(@PathVariable("id") Long id) {<br />
return shopService.queryById(id);<br />
}</td>
</tr>
</tbody>
</table>

IShopService接口新增一个方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
Result queryById(Long id);</td>
</tr>
</tbody>
</table>

ShopServiceImpl新增一个方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryById(Long id) {<br />
//1.从Redis查询商铺缓存<br />
String key = RedisConstants.CACHE_SHOP_KEY + id;<br />
String shopJson = stringRedisTemplate.opsForValue().get(key);<br />
<br />
//2.判断是否存在，存在直接返回<br />
if(StrUtil.isNotBlank(shopJson)){<br />
Shop shop = JSONUtil.toBean(shopJson, Shop.class);<br />
return Result.ok(shop);<br />
}<br />
<br />
//3.不存在，根据id查询数据库<br />
Shop shop = getById(id);<br />
<br />
//4.数据库中也不存在，返回错误<br />
if(shop == null){<br />
return Result.fail("店铺不存在");<br />
}<br />
<br />
//5.存在，缓存到Redis<br />
stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(shop));<br />
<br />
//6.返回<br />
return Result.ok(shop);<br />
}</td>
</tr>
</tbody>
</table>

**2.3 添加商户类型缓存**

ShopTypeController：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("list")<br />
public Result queryTypeList() {<br />
return typeService.queryList();<br />
}</td>
</tr>
</tbody>
</table>

IShopTypeService添加queryList方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
Result queryList();</td>
</tr>
</tbody>
</table>

RedisConstants添加两个属性：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public static final String CACHE_SHOPTYPE_KEY = "cache:shop_type:shop_type_list";<br />
public static final Long CACHE_SHOPTYPE_TTL = 60L;</td>
</tr>
</tbody>
</table>

ShopTypeServiceImpl添加queryList方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryList() {<br />
//1.从Redis中获取商户类型列表<br />
String key = RedisConstants.CACHE_SHOPTYPE_KEY;<br />
List&lt;String&gt; list = stringRedisTemplate.opsForList().range(key, 0, -1);<br />
<br />
//2.商户类型列表存在，直接返回<br />
List&lt;ShopType&gt; typeList = new ArrayList&lt;&gt;();<br />
if(CollectionUtil.isNotEmpty(list)){<br />
for (String s : list) {<br />
ShopType shopType = JSONUtil.toBean(s, ShopType.class);<br />
typeList.add(shopType);<br />
}<br />
return Result.ok(typeList);<br />
}<br />
<br />
//3.商户类型列表不存在，从数据库查找商户类型列表<br />
typeList = query().orderByAsc("sort").list();<br />
<br />
//4.数据库也不存在商户类型列表，返回错误<br />
if(CollectionUtil.isEmpty(typeList)){<br />
return Result.fail("不存在商户类型");<br />
}<br />
<br />
//5.序列化商户类型列表<br />
for (ShopType shopType : typeList) {<br />
String s = JSONUtil.toJsonStr(shopType);<br />
list.add(s);<br />
}<br />
<br />
//6.将商户类型列表写入Redis<br />
stringRedisTemplate.opsForList().rightPushAll(key, list);<br />
stringRedisTemplate.expire(key, RedisConstants.CACHE_SHOPTYPE_TTL, TimeUnit.MINUTES);<br />
<br />
//7.返回ok<br />
return Result.ok(typeList);<br />
}</td>
</tr>
</tbody>
</table>

**2.4 缓存更新策略**

**2.4.1 缓存淘汰**

由于我们只往内存中写数据，却不进行更新删除，久而久之，内存就会不足，从而引起一些问题，所以，内存中的数据需要定时更新，也就是缓存淘汰，缓存淘汰的方案有三种：

|              |                                                                                                               |                                                        |                                                |
|--------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|------------------------------------------------|
|              | 内存淘汰                                                                                                      | 超时剔除                                               | 主动更新                                       |
| **说明**     | 不用自己维护，利用Redis的内存淘汰机制，当内存不足时自动淘汰部分数据（不确定淘汰哪些数据），下次查询时更新缓存 | 给缓存添加超时时间，到期后自动删除，下次查询时更新缓存 | 编写业务逻辑，在修改数据库的同时，手动更新缓存 |
| **一致性**   | 差                                                                                                            | 一般                                                   | 好                                             |
| **维护成本** | 无                                                                                                            | 低                                                     | 高                                             |

**业务场景**：

低一致性需求：使用内存淘汰机制，例如店铺类型的查询缓存

高一致性需求：主动更新，并以超时剔除作为兜底方案，例如店铺详情查询的缓存

**2.4.2 缓存不一致**

由于缓存是数据来源于数据库，如果数据库的数据发生变化时，缓存中的数据没有同步更新，此时用户会使用旧的数据，就会产生类似多线程数据安全问题，导致数据库缓存不一致问题。

现有三种方案解决数据库不一致问题：

<img src="../assets/Redis笔记/media/image21.png" style="width:5.75in;height:1.5in" />

如果使用Cache Aside Pattern方案，需要考虑三个问题：

删除缓存还是更新缓存？

更新缓存：每次更新数据库都要更新缓存，假如只有最后一次更新有效，那前几次更新缓存都无效，无效写操作较多

删除缓存：更新数据库时让缓存失效，查询时再更新缓存，胜出

如何保证缓存与数据库的操作同时成功或失败？

单体系统，将缓存与数据库操作放在一个事务

分布式系统，利用TCC等分布式事务方案

先操作缓存还是先操作数据库？

先删缓存再操作数据库

先操作数据库再删缓存

那到底是先操作缓存还是先操作数据库呢？

先删除缓存再操作数据库：假如原来缓存中数据为10，线程1删除缓存完成后更新数据库，由于更新数据库的操作在磁盘上进行，速度慢于操作缓存，此时线程2完成了查询缓存，未命中，查询出数据库的数据10并写入缓存，写入完成后线程1更新完数据库数据为20，此时缓存数据和数据库数据发生不一致。

先操作数据库再操作缓存：假如此时缓存失效（比如超时），数据库中数据为10，线程1查询缓存，未命中，查询数据库，将要写入缓存时或写入缓存的过程中，此时线程2更新数据库内容为20，然后删除缓存，之后线程1将数据10写入缓存，此时缓存数据和数据库数据发生不一致。

<img src="../assets/Redis笔记/media/image22.png" style="width:5.75in;height:2.83333in" />

由于写入缓存的速度很快，这段时间基本不可能有其他线程完成业务逻辑，所以先操作数据库再操作缓存的不一致现象很难发生，而先删除缓存再操作数据库的不一致现象就很常见，所以先操作数据库再操作缓存胜出。

**2.4.3 缓存更新策略最佳解决方案**

根据上一节的分析，得出缓存更新策略最佳解决方案：

低一致性需求：使用Redis自带的内存淘汰机制

高一致性需求：主动更新，并以超时剔除作为兜底方案

读操作：

缓存命中则直接返回

缓存未命中则查询数据库，并写入缓存，设定超时时间

写操作：

先写数据库，然后再删除缓存

要确保数据库与缓存操作的原子性

**2.5 实现商铺缓存和数据库的双写一致**

**2.5.1 需求**

修改ShopController中的业务逻辑，满足下面的需求：

根据id查询店铺时，如果缓存未命中，则查询数据库，将数据库结果写入缓存，并设置超时时间

根据id修改店铺时，先修改数据库，再删除缓存

**2.5.2 代码实现**

修改ShopServiceImpl的queryById方法，设置缓存时添加过期时间：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryById(Long id) {<br />
... //业务代码不变<br />
<br />
//5.存在，缓存到Redis<br />
stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(shop), RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);<br />
<br />
//6.返回<br />
return Result.ok(shop);<br />
}</td>
</tr>
</tbody>
</table>

修改ShopController的updateShop方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public Result updateShop(@RequestBody Shop shop) {<br />
// 写入数据库<br />
return shopService.update(shop);<br />
}</td>
</tr>
</tbody>
</table>

IShopService接口添加update方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
Result update(Shop shop);</td>
</tr>
</tbody>
</table>

ShopServiceImpl类添加update方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
@Transactional<br />
public Result update(Shop shop) {<br />
//店铺id不能为空<br />
Long id = shop.getId();<br />
if(id == null){<br />
return Result.fail("店铺id不能为空");<br />
}<br />
<br />
//更新数据库<br />
updateById(shop);<br />
<br />
//删除缓存<br />
stringRedisTemplate.delete(RedisConstants.CACHE_SHOP_KEY + id);<br />
return Result.ok();<br />
}</td>
</tr>
</tbody>
</table>

**2.6 缓存穿透**

缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远不会生效，这些请求都会打到数据库，带来巨大压力。

**2.6.1 解决方案**

缓存穿透常见解决方案有两种：

缓存空对象：当客户端访问不存在的数据时，会穿透Redis直击数据库，但是数据库中也没有数据，此时我们也把这个数据存到Redis，只是值为null，并设置有效期，下次客户端再访问这个资源时，就会直接访问到Redis，而不会到达数据库。

布隆过滤：采用哈希思想，利用一个庞大的二进制数组，走哈希思想判断当前请求的数据是否存在（对应位置是0还是1），如果存在，则放行，如果不存在，则直接返回。布隆过滤虽然节约内存空间，但是由于哈希冲突，存在误判风险。

<img src="../assets/Redis笔记/media/image23.png" style="width:5.75in;height:2.63542in" />

缓存空对象

优点：实现简单，维护方便

缺点：额外的内存消耗；可能造成短期的不一致

布隆过滤

优点：内存占用较少，没有多余key

缺点：实现复杂；存在误判可能

**2.6.2 解决商品查询的缓存穿透问题**

在原来的逻辑中，如果这个数据在mysql中不存在，直接就返回404，这样会存在缓存穿透，我们使用缓存空对象解决，实现思路如下：

<img src="../assets/Redis笔记/media/image24.png" style="width:5.75in;height:2.25in" />

**代码实现**

修改ShopServiceImpl类的queryById方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryById(Long id) {<br />
//1.从Redis查询商铺缓存<br />
String key = RedisConstants.CACHE_SHOP_KEY + id;<br />
String shopJson = stringRedisTemplate.opsForValue().get(key);<br />
<br />
//2.判断是否存在，存在直接返回<br />
if(StrUtil.isNotBlank(shopJson)){<br />
Shop shop = JSONUtil.toBean(shopJson, Shop.class);<br />
return Result.ok(shop);<br />
}<br />
<br />
//3.不存在，判断命中值是否是空值，为空值返回错误<br />
if(shopJson == null){<br />
return Result.fail("店铺不存在");<br />
}<br />
<br />
//4.数据库中也不存在，缓存空字符串，返回错误<br />
Shop shop = getById(id);<br />
if(shop == null){<br />
stringRedisTemplate.opsForValue().set(key, "", RedisConstants.CACHE_NULL_TTL, TimeUnit.MINUTES);<br />
return Result.fail("店铺不存在");<br />
}<br />
<br />
//5.存在，缓存到Redis<br />
stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(shop), RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);<br />
<br />
//6.返回<br />
return Result.ok(shop);<br />
}</td>
</tr>
</tbody>
</table>

**2.7 缓存雪崩**

缓存雪崩是指在同一时段大量的缓存key同时失效或者Redis服务宕机，导致大量请求到达数据库，带来巨大压力。

解决方案：

给不同的Key的TTL添加随机值

利用Redis集群提高服务的可用性

给缓存业务添加降级限流策略

给业务添加多级缓存

<img src="../assets/Redis笔记/media/image25.png" style="width:5.75in;height:2.41667in" />

**2.8 缓存击穿**

缓存击穿问题也叫**热点Key问题**，就是一个被高并发访问并且缓存重建业务较复杂的key突然失效了，无数的请求访问会在瞬间给数据库带来巨大的冲击。

详细解释：假设线程1在查询缓存之后，查询数据库并重建缓存数据，此时线程1正在执行，线程2、线程3、线程4...同时访问当前这个方法， 且都没有从缓存中查到数据，就会同一时刻访问查询访问数据库，同时执行数据库代码，数据库压力就会过大。

<img src="../assets/Redis笔记/media/image26.png" style="width:5.75in;height:3in" />

常见的解决方案有两种：互斥锁、逻辑过期

**2.8.1 缓存击穿解决方案**

**互斥锁介绍**

利用锁的互斥性，如果第一个线程获取锁成功，就可以执行业务逻辑，这个过程中其他线程只能等待，直到第一个线程释放锁，才能进行业务逻辑，从而解决缓存击穿问题。但是这会使业务从并行变成串行，而且其他线程等待过程不能执行任何逻辑。

如下图：线程1先过来访问，未命中缓存，获取互斥锁并查询数据库重建缓存，此时线程2访问，未命中缓存，尝试获取锁，由于互斥锁线程1未释放，就会获取失败，然后休眠等待不断尝试获取锁，只有线程1业务执行完释放锁后，线程2才能获取锁成功，命中缓存，返回缓存中的数据。

<img src="../assets/Redis笔记/media/image27.png" style="width:5.75in;height:2.53125in" />

**逻辑过期介绍**

在互斥锁方案中提到，互斥锁方案会造成业务串行化，影响用户体验，导致的根本原因是缓存失效（过期），导致未命中缓存从而不断尝试获取锁。解决办法是使用逻辑过期时间代替真实TTL过期时间，并牺牲数据的及时性，用业务逻辑判断是否过期，过期的话缓存重建的过程用另一个线程完成，没重建完成前使用原来的数据，即脏数据。

如下图：当线程1请求过来时，通过逻辑判断发现缓存过期，尝试获取互斥锁，获取成功，开启一个新的线程实现查询数据库并重建缓存，重置过期时间，而线程1先返回脏数据，即使其他线程插队，也会从缓存中获取过期数据，尝试获取互斥锁，获取失败，返回脏数据。

<img src="../assets/Redis笔记/media/image28.png" style="width:5.75in;height:2.36458in" />

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td>解决方案</td>
<td>优点</td>
<td>缺点</td>
</tr>
<tr class="even">
<td>互斥锁</td>
<td>没有额外的内存消耗<br />
保证一致性<br />
实现简单</td>
<td>线程需要等待，性能受到影响<br />
可能有死锁风险</td>
</tr>
<tr class="odd">
<td>逻辑过期</td>
<td>线程无需等待，性能较好</td>
<td>不保证一致性<br />
有额外内存消耗<br />
实现复杂</td>
</tr>
</tbody>
</table>

**2.8.1 互斥锁解决店铺查询缓存击穿**

使用**互斥锁**解决商品查询业务的缓存击穿问题，业务逻辑如下：

<img src="../assets/Redis笔记/media/image29.png" style="width:5.75in;height:2.59375in" />

如何获取全局唯一的互斥锁：利用redis的setnx方法，如果redis中没有这个key，则插入成功返回1，stringRedisTemplate中对应true；如果有这个key，则插入失败返回0，stringRedisTemplate中对应false，通过true或false，来表示是否成功获得互斥锁。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private boolean tryLock(String key) {<br />
Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 10, TimeUnit.SECONDS);<br />
return BooleanUtil.isTrue(flag);<br />
}<br />
<br />
<br />
private void unlock(String key) {<br />
stringRedisTemplate.delete(key);<br />
}</td>
</tr>
</tbody>
</table>

先封装ShopServiceImpl类中原来的缓存穿透代码，防止丢失：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private Shop queryWithPassThrough(Long id){<br />
//1.从Redis查询商铺缓存<br />
String key = RedisConstants.CACHE_SHOP_KEY + id;<br />
String shopJson = stringRedisTemplate.opsForValue().get(key);<br />
<br />
//2.判断是否存在，存在直接返回<br />
if(StrUtil.isNotBlank(shopJson)){<br />
return JSONUtil.toBean(shopJson, Shop.class);<br />
}<br />
<br />
//3.不存在，判断命中值是否是空值，为空值返回错误<br />
if(shopJson == null) return null;<br />
<br />
//4.数据库中也不存在，缓存空字符串，返回错误<br />
Shop shop = getById(id);<br />
if(shop == null){<br />
stringRedisTemplate.opsForValue().set(key, "", RedisConstants.CACHE_NULL_TTL, TimeUnit.MINUTES);<br />
return null;<br />
}<br />
<br />
//5.存在，缓存到Redis<br />
stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(shop), RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);<br />
<br />
//6.返回<br />
return shop;<br />
}</td>
</tr>
</tbody>
</table>

定义queryWithMutex方法实现互斥锁解决缓存击穿：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public Shop queryWithMutex(Long id){<br />
//1.从redis中查询商铺缓存<br />
String key = RedisConstants.CACHE_SHOP_KEY + id;<br />
<br />
//2.判断是否存在，存在就直接返回<br />
String shopJson = stringRedisTemplate.opsForValue().get(key);<br />
if(StrUtil.isNotBlank(shopJson)){<br />
return JSONUtil.toBean(shopJson, Shop.class);<br />
}<br />
<br />
//3.判断命中值是否为空值，空值返回错误<br />
if(shopJson != null) return null;<br />
<br />
//4.实现缓存重构<br />
//4.1 获取互斥锁<br />
String lockKey = RedisConstants.LOCK_SHOP_KEY + id;<br />
Shop shop = null;<br />
try {<br />
boolean islock = tryLock(lockKey);<br />
<br />
//4.2 判断是否获取成功，获取失败则休眠重试<br />
if(!islock){<br />
Thread.sleep(40);<br />
return queryWithMutex(id);<br />
}<br />
<br />
//4.3 获取成功，根据id查询数据库<br />
shop = getById(id);<br />
<br />
//5 数据库也不存在，将空值写入redis，返回错误<br />
if(shop == null){<br />
stringRedisTemplate.opsForValue().set(key, "", RedisConstants.CACHE_NULL_TTL, TimeUnit.MINUTES);<br />
return null;<br />
}<br />
<br />
//存在，写入商铺信息到redis<br />
stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(shop), RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);<br />
} catch (InterruptedException e) {<br />
throw new RuntimeException(e);<br />
} finally {<br />
//释放锁<br />
unlock(lockKey);<br />
}<br />
<br />
return shop;<br />
}</td>
</tr>
</tbody>
</table>

修改queryById方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryById(Long id) {<br />
/*//缓存穿透<br />
Shop shop = queryWithPassThrough(id);*/<br />
<br />
//互斥锁解决缓存击穿<br />
Shop shop = queryWithMutex(id);<br />
<br />
if(shop==null) return Result.fail("店铺不存在!");<br />
<br />
return Result.ok(shop);<br />
}</td>
</tr>
</tbody>
</table>

**测试**

使用Postman实现100个请求：

<img src="../assets/Redis笔记/media/image30.png" style="width:5.75in;height:3.57292in" />

如果在控制台发现只有一次SQL语句，表示测试成功。

**2.8.2 逻辑过期解决店铺查询缓存击穿**

使用**逻辑过期**解决商品查询业务的缓存击穿问题，业务逻辑如下：

<img src="../assets/Redis笔记/media/image31.png" style="width:5.75in;height:2.53125in" />

现在有一个问题，逻辑过期时间字段是添加在原有pojo上还是新建一个类RedisData，并继承pojo？都不是，代码开发尽量不要修改源代码，所以使用一个Object字段或泛型字段定义真实数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Data<br />
public class RedisData {<br />
private LocalDateTime expireTime;<br />
private Object data;<br />
}</td>
</tr>
</tbody>
</table>

ShopServiceImpl类新增方法saveShop2Redis和queryWithLogicalExpire：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
/**<br />
* 缓存重建方法<br />
*/<br />
public void saveShop2Redis(Long id, Long expireSeconds) throws InterruptedException {<br />
//1.查询店铺信息<br />
Shop shop = getById(id);<br />
<br />
//2.封装逻辑过期时间<br />
RedisData redisData = new RedisData();<br />
redisData.setData(shop);<br />
redisData.setExpireTime(LocalDateTime.now().plusSeconds(expireSeconds));<br />
<br />
//3.写入Redis<br />
stringRedisTemplate.opsForValue().set(RedisConstants.CACHE_SHOP_KEY + id, JSONUtil.toJsonStr(redisData));<br />
}<br />
<br />
private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);<br />
<br />
/**<br />
* 逻辑过期解决缓存击穿<br />
*/<br />
public Shop queryWithLogicalExpire(Long id) {<br />
// 1.从redis查询商铺缓存<br />
String key = RedisConstants.CACHE_SHOP_KEY + id;<br />
String json = stringRedisTemplate.opsForValue().get(key);<br />
<br />
// 2.判断是否存在<br />
if (StrUtil.isBlank(json)) {<br />
// 3.不存在，直接返回<br />
return null;<br />
}<br />
<br />
// 4.命中，需要先把json反序列化为对象<br />
RedisData redisData = JSONUtil.toBean(json, RedisData.class);<br />
Shop shop = JSONUtil.toBean((JSONObject) redisData.getData(), Shop.class);<br />
LocalDateTime expireTime = redisData.getExpireTime();<br />
<br />
// 5.判断是否过期<br />
if (expireTime.isAfter(LocalDateTime.now())) {<br />
// 5.1.未过期，直接返回店铺信息<br />
return shop;<br />
}<br />
<br />
// 5.2.已过期，需要缓存重建<br />
// 6.缓存重建<br />
// 6.1.获取互斥锁<br />
String lockKey = RedisConstants.LOCK_SHOP_KEY + id;<br />
boolean isLock = tryLock(lockKey);<br />
<br />
// 6.2.判断是否获取锁成功<br />
if (isLock) {<br />
CACHE_REBUILD_EXECUTOR.submit(() -&gt; {<br />
try {<br />
//重建缓存<br />
this.saveShop2Redis(id, 20L);<br />
} catch (Exception e) {<br />
throw new RuntimeException(e);<br />
} finally {<br />
unlock(lockKey);<br />
}<br />
});<br />
}<br />
<br />
// 6.4.返回过期的商铺信息<br />
return shop;<br />
}</td>
</tr>
</tbody>
</table>

最后修改ShopServiceImpl类的queryById方法内原来的调用互斥锁方案修改成调用逻辑过期方案。

**测试**

删除Redis中对应的店铺缓存，然后编写测试单元缓存对应的脏数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testSaveShop() throws InterruptedException {<br />
shopService.saveShop2Redis(1L, 10L);<br />
}</td>
</tr>
</tbody>
</table>

然后修改数据库中id为1的店铺信息，如店铺名为104茶餐厅，使缓存中的数据成为脏数据。

启动项目后，使用Postman发送200条请求：

<img src="../assets/Redis笔记/media/image32.png" style="width:5.75in;height:3.5625in" />

最后看到前面的几条请求的响应数据是103茶餐厅（脏数据），后面的响应数据就都正确了。

**2.9 缓存工具封装**

由于缓存问题非常常见，如果每个业务都解决缓存穿透、缓存击穿（缓存雪崩一般使用redis集群解决，后面会学习），会给业务开发带来不小的压力，所以，我们需要工具类帮我们提供这些操作，而工具类需要我们手动书写。

方法1：将任意Java对象序列化为json并存储在string类型的key中，并且可以设置TTL过期时间

方法2：将任意Java对象序列化为json并存储在string类型的key中，并且可以设置逻辑过期时间，用于处理缓存击穿问题

方法3：根据指定的key查询缓存，并反序列化为指定类型，利用缓存空值的方式解决缓存穿透问题

方法4：根据指定的key查询缓存，并反序列化为指定类型，需要利用逻辑过期解决缓存击穿问题

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmdp.utils;<br />
<br />
import cn.hutool.core.util.BooleanUtil;<br />
import cn.hutool.core.util.StrUtil;<br />
import cn.hutool.json.JSONObject;<br />
import cn.hutool.json.JSONUtil;<br />
import lombok.extern.slf4j.Slf4j;<br />
import org.springframework.data.redis.core.StringRedisTemplate;<br />
import org.springframework.stereotype.Component;<br />
<br />
import java.time.LocalDateTime;<br />
import java.util.concurrent.ExecutorService;<br />
import java.util.concurrent.Executors;<br />
import java.util.concurrent.TimeUnit;<br />
import java.util.function.Function;<br />
<br />
@Slf4j<br />
@Component<br />
public class CacheClientUtil {<br />
private final StringRedisTemplate stringRedisTemplate;<br />
<br />
private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);<br />
<br />
private static final Long CACHE_NULL_TTL = 2L;<br />
<br />
private static final String LOCK_SHOP_KEY = "lock:shop:";<br />
<br />
public CacheClientUtil(StringRedisTemplate stringRedisTemplate) {<br />
this.stringRedisTemplate = stringRedisTemplate;<br />
}<br />
<br />
/**<br />
* 将java对象序列化到redis的string类型中，并指定TTL<br />
* @param key redis中对应的key<br />
* @param value redis中key对应的对象<br />
* @param TTL TTL<br />
* @param unit TTL对应的单位<br />
*/<br />
public void set(String key, Object value, Long TTL, TimeUnit unit) {<br />
stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(value), TTL, unit);<br />
}<br />
<br />
/**<br />
* 将java对象序列化到redis的string类型中，并指定逻辑TTL<br />
* @param key redis中对应的key<br />
* @param value redis中key对应的对象<br />
* @param LogicalTTL 逻辑TTL<br />
* @param unit 逻辑TTL对应的单位<br />
*/<br />
public void setWithLogicalExpire(String key, Object value, Long LogicalTTL, TimeUnit unit) {<br />
// 设置逻辑过期<br />
RedisData redisData = new RedisData();<br />
redisData.setData(value);<br />
redisData.setExpireTime(LocalDateTime.now().plusSeconds(unit.toSeconds(LogicalTTL)));<br />
// 写入Redis<br />
stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));<br />
}<br />
<br />
/**<br />
* 根据key查询缓存，并反序列化为指定类型，利用空值解决缓存穿透<br />
* @param keyPrefix 缓存key前缀<br />
* @param id 查询的使用的id<br />
* @param type 返回值类型<br />
* @param dbFallback 查询业务逻辑函数<br />
* @param time key的TTL<br />
* @param unit TTL对应的单位<br />
* @param &lt;R&gt; 返回值泛型<br />
* @param &lt;ID&gt; id泛型<br />
* @return 返回最终查询的数据<br />
*/<br />
public &lt;R, ID&gt; R queryByIdWithPassThrough(String keyPrefix, ID id, Class&lt;R&gt; type, Function&lt;ID, R&gt; dbFallback, Long time, TimeUnit unit) {<br />
String key = keyPrefix + id;<br />
// 1.从redis查询商铺缓存<br />
String json = stringRedisTemplate.opsForValue().get(key);<br />
// 2.判断是否存在<br />
if (StrUtil.isNotBlank(json)) {<br />
// 3.存在，直接返回<br />
return JSONUtil.toBean(json, type);<br />
}<br />
// 判断命中的是否是空值<br />
if (json != null) {<br />
// 返回null<br />
return null;<br />
}<br />
<br />
// 4.不存在，根据id查询数据库<br />
R r = dbFallback.apply(id);<br />
// 5.不存在，返回null<br />
if (r == null) {<br />
// 将空值写入redis<br />
stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit.MINUTES);<br />
// 返回null<br />
return null;<br />
}<br />
// 6.存在，写入redis<br />
this.set(key, r, time, unit);<br />
return r;<br />
}<br />
<br />
/**<br />
* 根据key查询缓存，并反序列化为指定类型，利用逻辑过期解决缓存击穿<br />
* @param keyPrefix 缓存key前缀<br />
* @param id 查询的使用的id<br />
* @param type 返回值类型<br />
* @param dbFallback 查询业务逻辑函数<br />
* @param time key的TTL<br />
* @param unit TTL对应的单位<br />
* @param &lt;R&gt; 返回值泛型<br />
* @param &lt;ID&gt; id泛型<br />
* @return 返回最终查询的数据<br />
*/<br />
public &lt;R, ID&gt; R queryWithLogicalExpire(String keyPrefix, ID id, Class&lt;R&gt; type, Function&lt;ID, R&gt; dbFallback, Long time, TimeUnit unit) {<br />
String key = keyPrefix + id;<br />
// 1.从redis查询商铺缓存<br />
String json = stringRedisTemplate.opsForValue().get(key);<br />
// 2.判断是否存在<br />
if (StrUtil.isBlank(json)) {<br />
// 3.存在，直接返回<br />
return null;<br />
}<br />
// 4.命中，需要先把json反序列化为对象<br />
RedisData redisData = JSONUtil.toBean(json, RedisData.class);<br />
R r = JSONUtil.toBean((JSONObject) redisData.getData(), type);<br />
LocalDateTime expireTime = redisData.getExpireTime();<br />
// 5.判断是否过期<br />
if (expireTime.isAfter(LocalDateTime.now())) {<br />
// 5.1.未过期，直接返回店铺信息<br />
return r;<br />
}<br />
// 5.2.已过期，需要缓存重建<br />
// 6.缓存重建<br />
// 6.1.获取互斥锁<br />
String lockKey = LOCK_SHOP_KEY + id;<br />
boolean isLock = tryLock(lockKey);<br />
// 6.2.判断是否获取锁成功<br />
if (isLock) {<br />
// 6.3.成功，开启独立线程，实现缓存重建<br />
CACHE_REBUILD_EXECUTOR.submit(() -&gt; {<br />
try {<br />
// 查询数据库<br />
R newR = dbFallback.apply(id);<br />
// 重建缓存<br />
this.setWithLogicalExpire(key, newR, time, unit);<br />
} catch (Exception e) {<br />
throw new RuntimeException(e);<br />
} finally {<br />
// 释放锁<br />
unlock(lockKey);<br />
}<br />
});<br />
}<br />
// 6.4.返回过期的商铺信息<br />
return r;<br />
}<br />
<br />
/**<br />
* 根据key查询缓存，并反序列化为指定类型，利用互斥锁解决缓存击穿，同时利用缓存空值解决了缓存穿透<br />
* @param keyPrefix 缓存key前缀<br />
* @param id 查询的使用的id<br />
* @param type 返回值类型<br />
* @param dbFallback 查询业务逻辑函数<br />
* @param time key的TTL<br />
* @param unit TTL对应的单位<br />
* @param &lt;R&gt; 返回值泛型<br />
* @param &lt;ID&gt; id泛型<br />
* @return 返回最终查询的数据<br />
*/<br />
public &lt;R, ID&gt; R queryWithMutex(String keyPrefix, ID id, Class&lt;R&gt; type, Function&lt;ID, R&gt; dbFallback, Long time, TimeUnit unit) {<br />
String key = keyPrefix + id;<br />
// 1.从redis查询商铺缓存<br />
String shopJson = stringRedisTemplate.opsForValue().get(key);<br />
// 2.判断是否存在<br />
if (StrUtil.isNotBlank(shopJson)) {<br />
// 3.存在，直接返回<br />
return JSONUtil.toBean(shopJson, type);<br />
}<br />
// 判断命中的是否是空值<br />
if (shopJson != null) {<br />
// 返回一个错误信息<br />
return null;<br />
}<br />
<br />
<br />
// 4.实现缓存重建<br />
// 4.1.获取互斥锁<br />
String lockKey = LOCK_SHOP_KEY + id;<br />
R r = null;<br />
try {<br />
boolean isLock = tryLock(lockKey);<br />
// 4.2.判断是否获取成功<br />
if (!isLock) {<br />
// 4.3.获取锁失败，休眠并重试<br />
Thread.sleep(50);<br />
return queryWithMutex(keyPrefix, id, type, dbFallback, time, unit);<br />
}<br />
// 4.4.获取锁成功，根据id查询数据库<br />
r = dbFallback.apply(id);<br />
// 5.不存在，返回错误<br />
if (r == null) {<br />
// 将空值写入redis<br />
stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit.MINUTES);<br />
// 返回错误信息<br />
return null;<br />
}<br />
// 6.存在，写入redis<br />
this.set(key, r, time, unit);<br />
} catch (InterruptedException e) {<br />
throw new RuntimeException(e);<br />
} finally {<br />
// 7.释放锁<br />
unlock(lockKey);<br />
}<br />
// 8.返回<br />
return r;<br />
}<br />
<br />
private boolean tryLock(String key) {<br />
Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 10, TimeUnit.SECONDS);<br />
return BooleanUtil.isTrue(flag);<br />
}<br />
<br />
private void unlock(String key) {<br />
stringRedisTemplate.delete(key);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**测试**

在ShopServiceImpl类中改造queryById方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private CacheClient cacheClient;<br />
<br />
@Override<br />
public Result queryById(Long id) {<br />
// 解决缓存穿透<br />
Shop shop = cacheClientUtil<br />
.queryWithPassThrough(RedisConstants.CACHE_SHOP_KEY, id, Shop.class, this::getById, RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);<br />
<br />
/*//互斥锁解决缓存击穿<br />
Shop shop = cacheClientUtil<br />
.queryWithMutex(RedisConstants.CACHE_SHOP_KEY, id, Shop.class, this::getById, RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);<br />
<br />
//逻辑过期解决缓存击穿<br />
Shop shop = cacheClientUtil<br />
.queryWithLogicalExpire(RedisConstants.CACHE_SHOP_KEY, id, Shop.class, this::getById, 20L, TimeUnit.SECONDS);*/<br />
<br />
if (shop == null) {<br />
return Result.fail("店铺不存在！");<br />
}<br />
// 7.返回<br />
return Result.ok(shop);<br />
}</td>
</tr>
</tbody>
</table>

最后像之前的测试即可。

**3.优惠卷秒杀**

**3.1 全局唯一ID**

在电商系统中，订单表往往会有大量的数据存储，如果数据量庞大，将来会拆分订单表，如果都采用id自增，由于各个表独立，会造成有多个订单的id一致的情况，这个设计初衷id唯一相悖，而且，id自增很容易让别人猜测出一些信息，此时就要使用一种全局唯一的id

以优惠券秒杀来说，购买优惠券后就会生成一个订单到tb_voucher_order表，这个表就需要全局唯一id。

**全局ID生成器**：一种在分布式系统下生成全局唯一ID的工具，一般要具备五点特性，唯一性、高可用、递增性、高性能、安全性。

常见全局ID生成策略：

UUID

Redis自增

snowflake算法

数据库自增：维护一张表专门用于id自增，从而保证id唯一

**3.2 Redis自增**

对于long型id，占用8个字节64位，对这64位进行分解：

<img src="../assets/Redis笔记/media/image33.png" style="width:5.75in;height:0.51042in" />

最高位：符号位：1bit，永远为0

时间戳：31bit，以秒为单位，可以使用69年

序列号：32bit，秒内的计数器，支持每秒产生2^32个不同ID

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Component<br />
public class RedisIdWorker {<br />
/**<br />
* 开始时间戳<br />
*/<br />
private static final long BEGIN_TIMESTAMP = 1760895122L;<br />
/**<br />
* 序列号的位数<br />
*/<br />
private static final int COUNT_BITS = 32;<br />
<br />
private StringRedisTemplate stringRedisTemplate;<br />
<br />
public RedisIdWorker(StringRedisTemplate stringRedisTemplate) {<br />
this.stringRedisTemplate = stringRedisTemplate;<br />
}<br />
<br />
public long nextId(String keyPrefix) {<br />
// 1.生成时间戳<br />
LocalDateTime now = LocalDateTime.now();<br />
long nowSecond = now.toEpochSecond(ZoneOffset.UTC);<br />
long timestamp = nowSecond - BEGIN_TIMESTAMP;<br />
<br />
// 2.生成序列号<br />
// 2.1.获取当前日期，精确到天<br />
String date = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));<br />
// 2.2.自增长<br />
long count = stringRedisTemplate.opsForValue().increment("icr:" + keyPrefix + ":" + date);<br />
<br />
// 3.拼接并返回<br />
return timestamp &lt;&lt; COUNT_BITS | count;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**测试性能**

在测试之前，先了解一下CountDownLatch：countdownlatch名为信号枪，用于同步协调在多线程的等待与唤醒问题。

由于程序是异步的，有可能其他线程还没有运行完时，主线程却运行完了，而我们希望的是主线程在其他线程运行结束后才能运行，此时就需要CountDownLatch，其中有两个重要方法：countDown和await

await 方法是阻塞方法，可以实现阻塞main线程，使其在其他线程全部运行完毕后再运行，即当CountDownLatch内部维护的变量变为0时不再阻塞，放行，而只要调用一次countDown方法，就能使CountDownLatch维护的变量减1，通过使分线程绑定并合理设置这个变量，使得所有分线程全部运行完时变量刚好为0，就能实现main线程最后执行。

了解完countdownlatch后，就编写测试单元模拟多线程生成大量全局唯一ID：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private RedisIdWorker redisIdWorker;<br />
private final ExecutorService es = Executors.newFixedThreadPool(500); //线程池<br />
<br />
@Test<br />
void testIdWorker() throws InterruptedException {<br />
CountDownLatch latch = new CountDownLatch(300);<br />
<br />
Runnable task = () -&gt; {<br />
for (int i = 0; i &lt; 100; i++) {<br />
long id = redisIdWorker.nextId("order");<br />
System.out.println("id = " + id);<br />
}<br />
latch.countDown();<br />
};<br />
long begin = System.currentTimeMillis();<br />
for (int i = 0; i &lt; 300; i++) {<br />
es.submit(task);<br />
}<br />
latch.await();<br />
long end = System.currentTimeMillis();<br />
System.out.println("time = " + (end - begin));<br />
}</td>
</tr>
</tbody>
</table>

测试完成后发现，生成30000个id用时近3s，平均一个id生成用时0.1ms，性能还是很高的。

**3.3 添加优惠券**

每个店铺都可以发布优惠券，分为平价券和特价券，平价券优惠力度低，所以没有太多限制，而特价券优惠力度高，所以有数量、抢购时间、结束时间等限制，牵扯到两张表：

tb_voucher：优惠券的基本信息，优惠金额、使用规则等

tb_seckill_voucher：优惠券的库存、开始抢购时间，结束抢购时间。特价优惠券才需要填写这些信息

**新增普通券业务代码**和**新增秒杀券业务代码**项目已经实现，我们打开Postman，发送一个请求POST http://localhost:8081/voucher/seckill，并添加请求数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>JSON<br />
{<br />
"shopId":1,<br />
"title":"100元代金券",<br />
"subTitle":"周一至周五均可使用",<br />
"rules":"全场通用\n无需预约\n可无限叠加\n不兑现、不找零\n仅限堂食",<br />
"payValue":8000,<br />
"actualValue":10000,<br />
"type":1,<br />
"stock":100,<br />
"beginTime":"2025-10-19T10:09:17",<br />
"endTime":"2025-11-20T22:10:17"<br />
}</td>
</tr>
</tbody>
</table>

如果在tb_voucher表中能看到插入的优惠券就表示请求成功（如果前端看不到优惠券请合理修改开始结束时间）。

**3.4 实现秒杀下单**

如果前端点击优惠券的抢购按钮，就会请求到/voucher-order/seckill/{id}实现秒杀下单操作，并保存订单信息到tb_seckill_voucher表。

秒杀下单需要保证在秒杀时间范围内且库存充足，具体思路如下：

<img src="../assets/Redis笔记/media/image34.png" style="width:5.75in;height:2.4375in" />

修改VoucherOrderController类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
@RequestMapping("/voucher-order")<br />
public class VoucherOrderController {<br />
@Resource<br />
private IVoucherOrderService voucherOrderService;<br />
<br />
@PostMapping("seckill/{id}")<br />
public Result seckillVoucher(@PathVariable("id") Long voucherId) {<br />
return voucherOrderService.seckillVoucher(voucherId);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

IVoucherOrderService接口新增seckillVoucher方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
Result seckillVoucher(Long voucherId);</td>
</tr>
</tbody>
</table>

VoucherOrderServiceImpl新增seckillVoucher方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private ISeckillVoucherService seckillVoucherService;<br />
@Resource<br />
private RedisIdWorker redisIdWorker;<br />
<br />
@Override<br />
public Result seckillVoucher(Long voucherId) {<br />
// 1.查询优惠券<br />
SeckillVoucher voucher = seckillVoucherService.getById(voucherId);<br />
// 2.判断秒杀是否开始<br />
if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {<br />
// 尚未开始<br />
return Result.fail("秒杀尚未开始！");<br />
}<br />
// 3.判断秒杀是否已经结束<br />
if (voucher.getEndTime().isBefore(LocalDateTime.now())) {<br />
// 尚未开始<br />
return Result.fail("秒杀已经结束！");<br />
}<br />
// 4.判断库存是否充足<br />
if (voucher.getStock() &lt; 1) {<br />
// 库存不足<br />
return Result.fail("库存不足！");<br />
}<br />
//5，扣减库存<br />
boolean success = seckillVoucherService.update()<br />
.setSql("stock = stock -1")<br />
.eq("voucher_id", voucherId).update();<br />
if (!success) {<br />
//扣减库存<br />
return Result.fail("库存不足！");<br />
}<br />
//6.创建订单<br />
VoucherOrder voucherOrder = new VoucherOrder();<br />
// 6.1.订单id<br />
long orderId = redisIdWorker.nextId("order");<br />
voucherOrder.setId(orderId);<br />
// 6.2.用户id<br />
Long userId = UserHolder.getUser().getId();<br />
voucherOrder.setUserId(userId);<br />
// 6.3.代金券id<br />
voucherOrder.setVoucherId(voucherId);<br />
save(voucherOrder);<br />
<br />
return Result.ok(orderId);<br />
}</td>
</tr>
</tbody>
</table>

打开浏览器访问103茶餐厅，点击抢购后tb_seckill_coucher表的库存字段减1，tb_voucher_order表新增了一条数据。

**3.5 库存超卖问题**

**3.5.1 问题分析**

先用JMeter发送200个请求实现抢购，会发现，数据库中会产生超过100个订单，库存最后是个负数，但是券仅限购100份，出现库存超卖。

原因分析：如下图，线程1查询出库存假设为1，操作数据库扣减库存，由于操作数据库较慢，此时线程2、线程3也查询库存，而此时线程1并没有更新库存完毕，所以也认为还有库存还有，就会更新数据库，最终导致库存超卖。

<img src="../assets/Redis笔记/media/image35.png" style="width:5.75in;height:1.90625in" />

**3.5.2 乐观锁和悲观锁分析**

解决库存超卖的方案就是加锁，但是锁分为悲观锁和乐观锁，两种锁都能解决库存超卖：

<img src="../assets/Redis笔记/media/image36.png" style="width:5.75in;height:1.45833in" />

**悲观锁**：实现对于数据的串行化执行，确保某一逻辑同一时间只能有一个线程执行，如Synchronized、Lock锁等都属于悲观锁。

**乐观锁**：乐观锁有两种方法实现：

版本号法：通过版本号，每次更新数据库都使版本号加1，如果更新数据库时版本号还是原来的版本号，说明这段时间没有线程更新数据库，可以更新数据库，如果更新数据库时版本号已经改变，就说明这段时间已经有线程更新数据库，就不更新或重新处理请求逻辑。

<img src="../assets/Redis笔记/media/image37.png" style="width:5.75in;height:1.69792in" />

**CAS法**：CAS法就是利用数据本身有没有变化来判断拒绝更新还是重试，如果更新数据库时数据和原来的数据不一样，说明这段时间有线程操作了数据库，就不更新或重新处理请求逻辑，否则，说明这段时间没有线程插队，线程安全，可以更新。

<img src="../assets/Redis笔记/media/image38.png" style="width:5.75in;height:1.71875in" />

**3.5.3 乐观锁解决库存超卖**

由于版本号法还要修改数据库表结构，甚至修改pojo，不方便，所以这里使用CAS法利用stock字段是否发生变化来解决库存超卖问题。

修改原来的扣减库存操作为以下内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
boolean success = seckillVoucherService.update()<br />
.setSql("stock = stock -1")<br />
.eq("voucher_id", voucherId)<br />
.eq("stock",voucher.getStock()) //where id = ? and stock = ?<br />
.update();</td>
</tr>
</tbody>
</table>

测试后发现，虽然不会导致库存超卖，但是售出的却不足100份，原因在于：假如100个线程都拿到了库存，然后一起修改库存，但是，这100个更新同一时间只能有1个成功，其他线程都会修改失败，导致大量优惠券没有卖出。

解决方案是只要库存大于0，就让线程去修改库存，从而避免上述问题：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
boolean success = seckillVoucherService.update()<br />
.setSql("stock = stock -1")<br />
.eq("voucher_id", voucherId)<br />
.gt("stock",0) //where id = ? and stock &gt; 0<br />
.update();</td>
</tr>
</tbody>
</table>

**3.6 一人一单**

**3.6.1 问题分析**

优惠券是为了引流，但是现在，一个用户可以重复下单，最终优惠券被同一个用户抢光，而我们希望，一个人往往只能下单一次。

实现思路：如果秒杀开始，则进一步判断库存是否足够，然后再根据优惠卷id和用户id查询用户是否已经下过这个订单，如果下过这个订单，则不再下单，否则进行下单

<img src="../assets/Redis笔记/media/image39.png" style="width:5.75in;height:2.08333in" />

**3.6.2 代码实现**

**初步代码：增加一人一单逻辑**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
@Transactional<br />
public Result seckillVoucher(Long voucherId) {<br />
// 1.查询优惠券<br />
SeckillVoucher voucher = seckillVoucherService.getById(voucherId);<br />
// 2.判断秒杀是否开始<br />
if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {<br />
// 尚未开始<br />
return Result.fail("秒杀尚未开始！");<br />
}<br />
// 3.判断秒杀是否已经结束<br />
if (voucher.getEndTime().isBefore(LocalDateTime.now())) {<br />
// 尚未开始<br />
return Result.fail("秒杀已经结束！");<br />
}<br />
// 4.判断库存是否充足<br />
if (voucher.getStock() &lt; 1) {<br />
// 库存不足<br />
return Result.fail("库存不足！");<br />
}<br />
// 5.一人一单逻辑<br />
// 5.1.用户id<br />
Long userId = UserHolder.getUser().getId();<br />
int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();<br />
// 5.2.判断是否存在<br />
if (count &gt; 0) {<br />
// 用户已经购买过了<br />
return Result.fail("用户已经购买过一次！");<br />
}<br />
<br />
//6，扣减库存<br />
boolean success = seckillVoucherService.update()<br />
.setSql("stock= stock -1")<br />
.eq("voucher_id", voucherId).update();<br />
if (!success) {<br />
//扣减库存<br />
return Result.fail("库存不足！");<br />
}<br />
//7.创建订单<br />
VoucherOrder voucherOrder = new VoucherOrder();<br />
// 7.1.订单id<br />
long orderId = redisIdWorker.nextId("order");<br />
voucherOrder.setId(orderId);<br />
<br />
voucherOrder.setUserId(userId);<br />
// 7.3.代金券id<br />
voucherOrder.setVoucherId(voucherId);<br />
save(voucherOrder);<br />
<br />
return Result.ok(orderId);<br />
<br />
}</td>
</tr>
</tbody>
</table>

再次进行并发测试，会发现，还是会存在一人多单问题，原因是：当同个用户多个请求线程并发运行时，都查询数据库发现未下单，然后都进行扣减库存生成订单。解决方法是加锁，乐观锁适合于更新操作，而现在是插入，需要使用悲观锁。

封装createVoucherOrder方法，并为方法加上synchronized锁以保证线程安全，同时删除seckillVoucher的事务管理：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Transactional<br />
public synchronized Result createVoucherOrder(Long voucherId) {<br />
Long userId = UserHolder.getUser().getId();<br />
// 5.1.查询订单<br />
int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();<br />
// 5.2.判断是否存在<br />
if (count &gt; 0) {<br />
// 用户已经购买过了<br />
return Result.fail("用户已经购买过一次！");<br />
}<br />
<br />
// 6.扣减库存<br />
boolean success = seckillVoucherService.update()<br />
.setSql("stock = stock - 1") // set stock = stock - 1<br />
.eq("voucher_id", voucherId).gt("stock", 0) // where id = ? and stock &gt; 0<br />
.update();<br />
if (!success) {<br />
// 扣减失败<br />
return Result.fail("库存不足！");<br />
}<br />
<br />
// 7.创建订单<br />
VoucherOrder voucherOrder = new VoucherOrder();<br />
// 7.1.订单id<br />
long orderId = redisIdWorker.nextId("order");<br />
voucherOrder.setId(orderId);<br />
// 7.2.用户id<br />
voucherOrder.setUserId(userId);<br />
// 7.3.代金券id<br />
voucherOrder.setVoucherId(voucherId);<br />
save(voucherOrder);<br />
<br />
// 7.返回订单id<br />
return Result.ok(orderId);<br />
}</td>
</tr>
</tbody>
</table>

但现在锁是加载方法上的，锁的对象是this，如果是不同用户请求过来，那就只能一个一个串行执行，效率低，可以设置锁的对象是用户id，保证不同用户线程能并行执行，同一用户线程串行执行：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Transactional<br />
public Result createVoucherOrder(Long voucherId) {<br />
Long userId = UserHolder.getUser().getId();<br />
synchronized(userId.toString().intern()){<br />
// 5.1.查询订单<br />
int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();<br />
// 5.2.判断是否存在<br />
if (count &gt; 0) {<br />
// 用户已经购买过了<br />
return Result.fail("用户已经购买过一次！");<br />
}<br />
<br />
// 6.扣减库存<br />
boolean success = seckillVoucherService.update()<br />
.setSql("stock = stock - 1") // set stock = stock - 1<br />
.eq("voucher_id", voucherId).gt("stock", 0) // where id = ? and stock &gt; 0<br />
.update();<br />
if (!success) {<br />
// 扣减失败<br />
return Result.fail("库存不足！");<br />
}<br />
<br />
// 7.创建订单<br />
VoucherOrder voucherOrder = new VoucherOrder();<br />
// 7.1.订单id<br />
long orderId = redisIdWorker.nextId("order");<br />
voucherOrder.setId(orderId);<br />
// 7.2.用户id<br />
voucherOrder.setUserId(userId);<br />
// 7.3.代金券id<br />
voucherOrder.setVoucherId(voucherId);<br />
save(voucherOrder);<br />
<br />
// 7.返回订单id<br />
return Result.ok(orderId);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

toString方法底层使用new的方法，会导致用户id字符串对象不一致，intern方法保证用户id字符串是唯一的

但是这样会导致一个问题，锁的释放在事务提交前执行，如果事务还没来得及提交，这个用户又来一个线程先一步完成了抢购业务，这时就有两个事务提交，还是不会一人一单。所以这个事务要放在锁的范围内，从而保证事务先提交再释放锁。

删除createVoucherOrder中的锁的逻辑，保留事务，修改seckillVoucher的调用逻辑：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
//原来逻辑<br />
// return createVoucherOrder(voucherId);<br />
<br />
//修改后<br />
Long userId = UserHolder.getUser().getId();<br />
synchronized (userId.toString().intern()){<br />
return this.createVoucherOrder(voucherId);<br />
}</td>
</tr>
</tbody>
</table>

这里调用createVoucherOrder是使用this调用的，而不是通过代理对象调用的，所以会事务失效（事务失效情况自行搜索学习），所以，这里要用原始的事务对象操作事务才能使事务生效：

导入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.aspectj&lt;/groupId&gt;<br />
&lt;artifactId&gt;aspectjweaver&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

启动类上加 @EnableAspectJAutoProxy(exposeProxy = true) 暴露出代理对象

修改调用逻辑：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
Long userId = UserHolder.getUser().getId();<br />
synchronized (userId.toString().intern()){<br />
//获取代理对象<br />
IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();<br />
return proxy.createVoucherOrder(voucherId);<br />
}</td>
</tr>
</tbody>
</table>

**3.6.3 集群模式下的并发问题**

首先复制一个服务器HmDianPingApplication2，并指定端口号为8082：

<img src="../assets/Redis笔记/media/image40.png" style="width:5.75in;height:1.88542in" />

然后修改nginx服务器的配置：

<img src="../assets/Redis笔记/media/image41.png" style="width:5.75in;height:1.17708in" />

进入nginx的目录的命令行，执行nginx.exe -s reload命令重启nginx。

使用jmeter分别向两台服务器发送请求，通过debug调试，会发现两个线程同时获取锁是可以的，这会导致一人多单。

**锁失效原因分析**：如下图，两个服务器就有两个虚拟机，当JVM1中的线程1获取锁并查询订单不存在，与此同时JVM2也会尝试获取锁，虽然用户id一致，但是两台虚拟机是相互独立的，JVM2的线程3会在自己的范围内生成一个对象，JVM1和JVM2的对象是不同的，所以都能获取锁成功，线程3查询订单不存在，线程1和线程3同时插入订单，导致一人多单。

<img src="../assets/Redis笔记/media/image42.png" style="width:5.75in;height:2.04167in" />

**4.分布式锁**

**4.1 基本原理和实现方式**

分布式锁，满足分布式系统或集群模式下多进程可见并且互斥的锁。核心思想是让所有线程都使用同一把锁，这样就能保证所有线程串行化，而不会出现锁失效的情况。

<img src="../assets/Redis笔记/media/image43.png" style="width:5.75in;height:2.28125in" />

分布式锁应满足以下几点：

可见性：多个线程都能看到相同的结果

互斥：分布式锁的最基本的条件，使得程序串行执行

高可用：程序不易崩溃，时时刻刻都保证较高的可用性

高性能：较高的加锁性能和释放锁性能

安全性：安全是程序中必不可少的一环

常见的分布式锁有三种：

|            |                           |                          |                                  |
|------------|---------------------------|--------------------------|----------------------------------|
|            | MySQL                     | Redis                    | Zookeeper                        |
| **互斥**   | 利用mysql本身的互斥锁机制 | 利用setnx这样的互斥命令  | 利用节点的唯一性和有序性实现互斥 |
| **高可用** | 好                        | 好                       | 好                               |
| **高性能** | 一般                      | 好                       | 一般                             |
| **安全性** | 断开连接，自动释放锁      | 利用锁超时机制，到期释放 | 临时节点，断开连接自动释放       |

**4.2 Redis分布式锁**

**4.2.1 核心思路**

利用setnx命令，当有多个线程时，只能有一个线程执行成功，获得锁，其他线程执行失败，休眠重试或返回错误。当然，为了确保设置超时时间和setnx命令同时成功或失败，需要setnx和设置超时时间通过一个命令完成，如set lock thread1 ex 10 nx。

**4.2.2 基本实现**

定义ILock接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.hmdp.utils;<br />
<br />
public interface ILock {<br />
/**<br />
* 尝试获取锁<br />
* @Param timeoutSec 锁的持有时间<br />
* @return true:获取成功 false:获取失败<br />
*/<br />
boolean tryLock(long timeoutSec);<br />
<br />
/**<br />
* 释放锁<br />
*/<br />
void unlock();<br />
}</td>
</tr>
</tbody>
</table>

定义SimpleRedisLock类实现ILock接口：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class SimpleRedisLock implements ILock {<br />
private String name;<br />
private StringRedisTemplate stringRedisTemplate;<br />
private static final String KEY_PREFIX = "lock:";<br />
<br />
public SimpleRedisLock(String name, StringRedisTemplate stringRedisTemplate) {<br />
this.name = name;<br />
this.stringRedisTemplate = stringRedisTemplate;<br />
}<br />
<br />
<br />
@Override<br />
public boolean tryLock(long timeoutSec) {<br />
//获取线程标识<br />
long threadId = Thread.currentThread().getId();<br />
//获取锁<br />
Boolean success = stringRedisTemplate.opsForValue().setIfAbsent(KEY_PREFIX + name, threadId + "", timeoutSec, TimeUnit.SECONDS);<br />
<br />
return Boolean.TRUE.equals(success); //null值也返回false<br />
}<br />
<br />
@Override<br />
public void unlock() {<br />
stringRedisTemplate.delete(KEY_PREFIX + name);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

修改业务代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private StringRedisTemplate stringRedisTemplate;<br />
<br />
@Override<br />
public Result seckillVoucher(Long voucherId) {<br />
// 1.查询优惠券<br />
SeckillVoucher voucher = seckillVoucherService.getById(voucherId);<br />
// 2.判断秒杀是否开始<br />
if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {<br />
// 尚未开始<br />
return Result.fail("秒杀尚未开始！");<br />
}<br />
// 3.判断秒杀是否已经结束<br />
if (voucher.getEndTime().isBefore(LocalDateTime.now())) {<br />
// 尚未开始<br />
return Result.fail("秒杀已经结束！");<br />
}<br />
// 4.判断库存是否充足<br />
if (voucher.getStock() &lt; 1) {<br />
// 库存不足<br />
return Result.fail("库存不足！");<br />
}<br />
Long userId = UserHolder.getUser().getId();<br />
<br />
//创建锁对象(新增代码)<br />
SimpleRedisLock lock = new SimpleRedisLock("order:" + userId, stringRedisTemplate);<br />
//获取锁对象<br />
boolean isLock = lock.tryLock(5);<br />
//加锁失败<br />
if (!isLock) {<br />
return Result.fail("不允许重复下单");<br />
}<br />
try {<br />
//获取代理对象(事务)<br />
IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();<br />
return proxy.createVoucherOrder(voucherId);<br />
} finally {<br />
//释放锁<br />
lock.unlock();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.2.3 Redis分布式锁误删**

如下图，线程1获取锁后业务发生阻塞，触发锁的超时释放，然后线程2获取锁，由于锁已经释放，线程2获取成功，执行业务过程中线程1好了，完成业务并释放了不属于自己的锁，释放完的同时线程3又可以获取锁执行业务，这时就有线程2和线程3并发执行业务。

<img src="../assets/Redis笔记/media/image44.png" style="width:5.75in;height:1.59375in" />

解决办法是线程释放锁时判断锁是否还是自己的，如果还是自己的锁，就说明这个过程没有其他线程执行，可以删除，否则就不删除：

<img src="../assets/Redis笔记/media/image45.png" style="width:5.75in;height:1.85417in" />

**代码实现**

实现思路：在存入锁时，放入自己线程的标识 ，在删除锁时，判断当前这把锁的标识是不是自己存入的，如果是，则进行删除，如果不是，则不进行删除。

<img src="../assets/Redis笔记/media/image46.png" style="width:5.75in;height:2.02083in" />

对于多台虚拟机，每台虚拟机相互独立，可能出现两个线程标识（如线程id）一致的情况，可以利用UUID类和static关键字实现为每台虚拟机生成唯一标识，再拼接线程标识就保证了分布式下线程的唯一标识。

只要修改SimpleRedisLock类的tryLock和unlock的代码即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private static final String ID_PREFIX = UUID.randomUUID().toString(true) + "-"; //hutool包下<br />
<br />
@Override<br />
public boolean tryLock(long timeoutSec) {<br />
// 获取线程标示<br />
String threadId = ID_PREFIX + Thread.currentThread().getId();<br />
// 获取锁<br />
Boolean success = stringRedisTemplate.opsForValue()<br />
.setIfAbsent(KEY_PREFIX + name, threadId, timeoutSec, TimeUnit.SECONDS);<br />
return Boolean.TRUE.equals(success);<br />
}<br />
<br />
public void unlock() {<br />
// 获取线程标示<br />
String threadId = ID_PREFIX + Thread.currentThread().getId();<br />
// 获取锁中的标示<br />
String id = stringRedisTemplate.opsForValue().get(KEY_PREFIX + name);<br />
// 判断标示是否一致<br />
if(threadId.equals(id)) {<br />
// 释放锁<br />
stringRedisTemplate.delete(KEY_PREFIX + name);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.2.4 分布式锁的原子性**

如下图，当线程1获取锁执行完业务后，判断锁是自己的，这时业务阻塞，导致锁超时释放，线程2就能成功获取锁，而线程1这时又结束阻塞直接删除线程2的锁，然后线程3就又能获取锁，这就是分布式锁的原子性问题。解决方案就是保证判断锁逻辑和释放锁逻辑保持原子性，同时成功。

<img src="../assets/Redis笔记/media/image47.png" style="width:5.75in;height:1.89583in" />

**4.2.5 Lua脚本**

Redis脚本提供了Lua脚本功能，一个脚本内编写多条Redis命令，执行时确保所有命令同时成功，类似MySQL的事务。

Lua编程语言基本语法参考网站：

**\[该类型的内容暂不支持下载\]**

**Lua脚本编写Redis命令**

Redis提供了调用函数执行redis命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
redis.call('命令名称', 'key', '其它参数', ...)<br />
<br />
-- 例如执行 set name jack<br />
redis.call('set', 'name', 'jack')</td>
</tr>
</tbody>
</table>

例如先执行set name Rose，再执行get name的脚本为：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 先执行 set name jack<br />
redis.call('set', 'name', 'Rose')<br />
-- 再执行 get name<br />
local name = redis.call('get', 'name')<br />
-- 返回<br />
return name</td>
</tr>
</tbody>
</table>

调用脚本的Redis命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
<br />
EVAL script numkeys key [key ...] arg [arg ...]</td>
</tr>
</tbody>
</table>

script：Lua脚本

numkeys：键的数量，2表示后面的2个参数作为键

arg：去除键后剩下的参数就是值，和键一一对应

例如执行 redis.call('set', 'name', 'jack') 这个脚本：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
EVAL "redis.call('set', 'name', 'jack')" 0</td>
</tr>
</tbody>
</table>

key、value也可以作为参数传递，key类型参数会放入KEYS数组，其它参数会放入ARGV数组：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
EVAL "return redis.call('set', KEYS[1], ARGV[1])" 1 name Rose</td>
</tr>
</tbody>
</table>

**Lua脚本解决分布式锁的原子性**

RedisTemplate提供了execute方法执行Lua脚本：

<img src="../assets/Redis笔记/media/image48.png" style="width:5.75in;height:0.9375in" />

在resources目录下编写Lua脚本unlock.lua：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 获取锁中的标示，判断是否与当前线程标示一致<br />
if (redis.call('GET', KEYS[1]) == ARGV[1]) then<br />
-- 一致，则删除锁<br />
return redis.call('DEL', KEYS[1])<br />
end<br />
-- 不一致，则直接返回<br />
return 0</td>
</tr>
</tbody>
</table>

Java代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private static final DefaultRedisScript&lt;Long&gt; UNLOCK_SCRIPT;<br />
static {<br />
UNLOCK_SCRIPT = new DefaultRedisScript&lt;&gt;();<br />
UNLOCK_SCRIPT.setLocation(new ClassPathResource("unlock.lua"));<br />
UNLOCK_SCRIPT.setResultType(Long.class);<br />
}<br />
<br />
public void unlock() {<br />
// 调用lua脚本<br />
stringRedisTemplate.execute(<br />
UNLOCK_SCRIPT,<br />
Collections.singletonList(KEY_PREFIX + name),<br />
ID_PREFIX + Thread.currentThread().getId()<br />
);<br />
}</td>
</tr>
</tbody>
</table>

**4.3 Redisson分布式锁**

到这一步，我们的锁基本已经可以商业使用了，但是仍存在隐患：

**不可重入**：同一个线程无法多次获取同一把锁

**不可重试**：获取锁只尝试一次就返回false，没有重试机制

**超时释放**：锁超时释放虽然可以避免死锁，但如果是业务执行耗时较长，也会导致锁释放，存在安全隐患

**主从一致性**：如果Redis提供了主从集群，主从同步存在延迟，当主宕机时，如果从并未同步主中的锁数据，则会出现锁实现

Redisson是一个在Redis的基础上实现的Java驻内存数据网格。不仅提供了一系列的分布式的Java常用对象，还提供了许多分布式服务，其中就包含了各种分布式锁的实现。

**4.3.1 Redisson快速入门**

引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.redisson&lt;/groupId&gt;<br />
&lt;artifactId&gt;redisson&lt;/artifactId&gt;<br />
&lt;version&gt;3.13.6&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

配置Redisson客户端：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration<br />
public class RedissonConfig {<br />
@Bean<br />
public RedissonClient redissonClient(){<br />
//配置<br />
Config config = new Config();<br />
config.useSingleServer().setAddress("redis://192.168.88.130:6379")<br />
.setPassword("123456")<br />
.setDatabase(1);<br />
//创建RedissonClient对象<br />
return Redisson.create(config);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

测试Redission的分布式锁（可重入）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private RedissionClient redissonClient;<br />
<br />
@Test<br />
void testRedisson() throws Exception{<br />
//获取锁(可重入)，指定锁的名称<br />
RLock lock = redissonClient.getLock("anyLock");<br />
//尝试获取锁，参数分别是：获取锁的最大等待时间(期间会重试)，锁自动释放时间，时间单位<br />
boolean isLock = lock.tryLock(1,10,TimeUnit.SECONDS);<br />
//判断获取锁成功<br />
if(isLock){<br />
try{<br />
System.out.println("执行业务");<br />
}finally{<br />
//释放锁<br />
lock.unlock();<br />
}<br />
<br />
}<br />
}</td>
</tr>
</tbody>
</table>

修改优惠券秒杀业务，把自己的锁换成Redisson的锁：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private RedissonClient redissonClient;<br />
<br />
@Override<br />
public Result seckillVoucher(Long voucherId) {<br />
// 1.查询优惠券<br />
SeckillVoucher voucher = seckillVoucherService.getById(voucherId);<br />
// 2.判断秒杀是否开始<br />
if (voucher.getBeginTime().isAfter(LocalDateTime.now())) {<br />
// 尚未开始<br />
return Result.fail("秒杀尚未开始！");<br />
}<br />
// 3.判断秒杀是否已经结束<br />
if (voucher.getEndTime().isBefore(LocalDateTime.now())) {<br />
// 尚未开始<br />
return Result.fail("秒杀已经结束！");<br />
}<br />
// 4.判断库存是否充足<br />
if (voucher.getStock() &lt; 1) {<br />
// 库存不足<br />
return Result.fail("库存不足！");<br />
}<br />
Long userId = UserHolder.getUser().getId();<br />
//创建锁对象 这个代码不用了，因为我们现在要使用分布式锁<br />
//SimpleRedisLock lock = new SimpleRedisLock("order:" + userId, stringRedisTemplate);<br />
RLock lock = redissonClient.getLock("lock:order:" + userId);<br />
//获取锁对象<br />
boolean isLock = lock.tryLock();<br />
<br />
//加锁失败<br />
if (!isLock) {<br />
return Result.fail("不允许重复下单");<br />
}<br />
try {<br />
//获取代理对象(事务)<br />
IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();<br />
return proxy.createVoucherOrder(voucherId);<br />
} finally {<br />
//释放锁<br />
lock.unlock();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**4.3.2 Redisson可重入锁原理**

利用Redis的Hash结构，field存放线程的唯一标识（UUID+线程id），value存放线程重入次数。

调试下面的测试方法可以看到每一次获取锁都是将锁的重入次数加1，释放锁将锁的重入次数减1，最后重入次数为0释放锁，从而实现可重入锁。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void method1(){<br />
//创建锁对象<br />
RLock lock = redissonClient.getLock("lock");<br />
<br />
boolean isLock = lock.tryLock();<br />
if(!isLock){<br />
log.error("获取锁失败, 1");<br />
return;<br />
}<br />
try {<br />
log.info("获取锁成功, 1");<br />
method2(lock);<br />
} finally {<br />
log.info("释放锁, 1");<br />
lock.unlock();<br />
}<br />
}<br />
void method2(RLock lock){<br />
boolean isLock = lock.tryLock();<br />
if(!isLock){<br />
log.error("获取锁失败, 2");<br />
return;<br />
}<br />
try {<br />
log.info("获取锁成功, 2");<br />
} finally {<br />
log.info("释放锁, 2");<br />
lock.unlock();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

可重入的具体实现流程如下：

<img src="../assets/Redis笔记/media/image49.png" style="width:5.75in;height:2.55208in" />

其中，获取锁的Lua脚本如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
local key = KEYS[1]; -- 锁的key<br />
local threadId = ARGV[1] -- 线程唯一标识<br />
local releaseTime = ARGV[2] -- 锁的自动释放时间<br />
-- 判断是否存在<br />
if(redis.call('exists', key) == 0) then<br />
-- 不存在，获取锁<br />
redis.call('hset', key, threadId, '1');<br />
-- 设置有效期<br />
redis.call('expire', key, releaseTime);<br />
return 1; -- 返回结果<br />
end;<br />
-- 锁已经存在，判断threadId是否是自己的<br />
if(redis.call('hexists', key, threadId) == 1) then<br />
-- 是自己的，获取锁，重入次数+1<br />
redis.call('hincrby', key, threadId, '1');<br />
-- 设置有效期<br />
redis.call('expire', key, releaseTime);<br />
return 1; -- 返回结果<br />
end;<br />
return 0; --代码走到这里，说明获取锁的不是自己，获取锁失败</td>
</tr>
</tbody>
</table>

释放锁的Lua脚本如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
local key = KEYS[1]; -- 锁的key<br />
local threadId = ARGV[1] -- 线程唯一标识<br />
local releaseTime = ARGV[2] -- 锁的自动释放时间<br />
-- 判断当前锁是否还是被自己持有<br />
if(redis.call('HEXISTS', key， threadId) == 0) then<br />
return nil; -- 如果已经不是自己，则直接返回<br />
end;<br />
-- 是自己的锁，则重入次数-1<br />
local count = redis.call('HINCRBY'， key, threadId, -1);<br />
-- 判断是否重入次数已经为0<br />
if(count &gt; 0) then<br />
-- 大于0说明不能释放锁，重置有效期然后返回<br />
redis.call('EXPIRE', key, releaseTime);<br />
return nil;<br />
else -- 等于0说明可以释放锁，直接删除<br />
redis.call('DEL', key);<br />
return nil;<br />
end;</td>
</tr>
</tbody>
</table>

**4.3.3 redission锁重试和WatchDog机制**

tryLock()方法支持传递参数，如下图，其中包含尝试锁重试时间waitTime和锁有效期leaseTime，第三个参数为时间单位，这里以两个参数讲解redission锁重试和WatchDog机制

<img src="../assets/Redis笔记/media/image50.png" style="width:5.75in;height:0.70833in" />

**锁重试**

<img src="../assets/Redis笔记/media/image51.png" style="width:5.75in;height:0.84375in" />

调用tryLock()方法并指定锁重试时间后，进入tryAcquire()方法获取锁的剩余有效期：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private Long tryAcquire(long waitTime, long leaseTime, TimeUnit unit, long threadId) {<br />
return (Long)this.get(this.tryAcquireAsync(waitTime, leaseTime, unit, threadId));<br />
}</td>
</tr>
</tbody>
</table>

get()方法阻塞等待tryAcquireAsync()的剩余有效期（null或者有效期），tryAcquireAsync()方法有两种返回值：

null：没有锁存在，获取锁成功

剩余有效期：获取锁失败，尝试再次获取

进入到tryAcquireAsync，如果leaseTime不等于-1，表示指定了锁持有时间（有效期），使用指定的锁持有时间获取锁，否则，表示没有指定锁的持有时间，会指定默认的锁监视超时时间lockWatchdogTimeout作为leaseTime，默认值为30000毫秒即30秒，然后调用tryLockInnerAsync()方法，得到返回的 RFuture 对象 ttlRemainingFuture。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private &lt;T&gt; RFuture&lt;Long&gt; tryAcquireAsync(long waitTime, long leaseTime, TimeUnit unit, long threadId) {<br />
if (leaseTime != -1L) {<br />
return this.tryLockInnerAsync(waitTime, leaseTime, unit, threadId, RedisCommands.EVAL_LONG);<br />
} else {<br />
RFuture&lt;Long&gt; ttlRemainingFuture = this.tryLockInnerAsync(waitTime, this.commandExecutor.getConnectionManager().getCfg().getLockWatchdogTimeout(), TimeUnit.MILLISECONDS, threadId, RedisCommands.EVAL_LONG);<br />
ttlRemainingFuture.onComplete((ttlRemaining, e) -&gt; {<br />
if (e == null) {<br />
if (ttlRemaining == null) {<br />
this.scheduleExpirationRenewal(threadId);<br />
}<br />
}<br />
});<br />
return ttlRemainingFuture;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

进入tryLockInnerAsync()方法获取锁的信息，这里可以看到之前的获取锁Lua脚本，脚本nil即对应null，表示获取锁成 功，redis.call('pttl', KEYS\[1\])得到锁的剩余有效期，表示获取锁失败

<img src="../assets/Redis笔记/media/image52.png" style="width:5.75in;height:1.9375in" />

回到tryLock()源码，获取到锁的剩余有效期ttl后，如果ttl不为null，计算当前剩余等待时间time，如果time小于等于0，证明获取锁逻辑耗费完了等待获取锁时间，调用acquireFailed()方法处理。

**订阅**：time大于0时，获取系统当前时间current，然后创建一个用于订阅锁释放通知的 subscribeFuture，调用 subscribe() 方法进行订阅。接下来调用subscribeFuture.await(time, TimeUnit.MILLISECONDS)等待 time 毫秒时间，等待订阅结果。如果在等待期间未收到订阅结果，表示等待超时。等待超时后代码会尝试取消订阅任务。如果取消失败，会在subscribeFuture.onComplete()方法中进行处理，判断是否需要取消订阅，并调用unsubscribe()方法进行处理。如果取消成功，则代码调用acquireFailed()方法进行处理，表示当前线程获取锁失败，最终返回false

<img src="../assets/Redis笔记/media/image53.png" style="width:5.75in;height:2.69792in" />

订阅的通知就是释放锁Lua脚本当中发布的通知：

<img src="../assets/Redis笔记/media/image54.png" style="width:5.75in;height:0.375in" />

如果在time时间之内获得释放锁的通知，则会走以下代码逻辑，这也是**锁重试**的原理：

首先，获取当前时间 current 并计算剩余等待时间 time

如果 time 小于等于 0，表示等待锁的时间已经超过了剩余过期时间，或者锁的剩余过期时间非法。调用 acquireFailed() 方法进行处理，并返回 false

如果 time 大于 0，表示还有剩余的时间需要进行等待，也即就是还能去获取锁。代码会进入一个 do-while 循环，并不断尝试获取锁

在循环中，代码会再次获取当前时间 currentTime，然后调用 tryAcquire() 方法尝试获得锁，得到锁的剩余过期时间 ttl

如果锁的剩余过期时间 ttl 为空，表示成功获取到锁，会返回 true

否则，计算并判断剩余等待时间 time ，如果 time \<= 0 ，说明尝试获取锁已经消耗完了剩余等待时间，获取锁失败，调用acquireFailed()方法处理

如果剩余过期时间 ttl 大于等于 0 且小于等于剩余等待时间 time，表示还有足够的时间可以等待，代码会使用 tryAcquire() 方法返回的 ttl 来等待锁的释放

如果剩余过期时间 ttl 大于剩余等待时间 time，表示还需要等待更长的时间，代码会使用 time 来等待锁的释放

在循环中，每次等待之后，会重新计算剩余等待时间 time

当剩余等待时间 time 小于或等于 0，表示等待超时，会调用 acquireFailed() 方法进行处理，并返回 false

最后，无论等待成功还是失败，都会调用 unsubscribe() 方法取消订阅并释放资源

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
try {<br />
time -= System.currentTimeMillis() - current;<br />
if (time &lt;= 0L) {<br />
this.acquireFailed(waitTime, unit, threadId);<br />
boolean var20 = false;<br />
return var20;<br />
} else {<br />
boolean var16;<br />
do {<br />
long currentTime = System.currentTimeMillis();<br />
ttl = this.tryAcquire(waitTime, leaseTime, unit, threadId);<br />
if (ttl == null) {<br />
var16 = true;<br />
return var16;<br />
}<br />
time -= System.currentTimeMillis() - currentTime;<br />
if (time &lt;= 0L) {<br />
this.acquireFailed(waitTime, unit, threadId);<br />
var16 = false;<br />
return var16;<br />
}<br />
currentTime = System.currentTimeMillis();<br />
if (ttl &gt;= 0L &amp;&amp; ttl &lt; time) {<br />
((RedissonLockEntry)subscribeFuture.getNow()).getLatch().tryAcquire(ttl, TimeUnit.MILLISECONDS);<br />
} else {<br />
((RedissonLockEntry)subscribeFuture.getNow()).getLatch().tryAcquire(time, TimeUnit.MILLISECONDS);<br />
}<br />
time -= System.currentTimeMillis() - currentTime;<br />
} while(time &gt; 0L);<br />
this.acquireFailed(waitTime, unit, threadId);<br />
var16 = false;<br />
return var16;<br />
}<br />
<br />
} finally {<br />
this.unsubscribe(subscribeFuture, threadId);<br />
}</td>
</tr>
</tbody>
</table>

当然，如果没有传递最大等待时间waitTime，那就不会进行锁重试，获取锁失败就直接返回false表示获取锁失败。

**WatchDog看门狗机制**

WatchDog机制就是用于解决业务阻塞导致锁**超时释放**的安全问题，原理是定期更新锁的有效期，同时监控当前线程是否仍然持有锁。

回顾之前的tryAcquireAsync()方法，还有一部分onComplete()没有分析，这一段就是用来定时更新锁有效期的：

异步获取锁后，代码会在 ttlRemainingFuture.onComplete() 方法中定义一个回调函数，在获取结果后进行处理

如果回调函数中异常参数 e 为 null，表示获取结果成功。此时，代码判断返回的 ttlRemaining 是否为 null，如果为 null，表示锁的状态为有效，调用 scheduleExpirationRenewal() 方法进行锁的过期续约

<img src="../assets/Redis笔记/media/image55.png" style="width:5.75in;height:2.10417in" />

进入到scheduleExpirationRenewal()方法，EXPIRATION_RENEWAL_MAP.putIfAbsent(this.getEntryName(), entry)方法将这个新的Entry对象放入一个名为EXPIRATION_RENEWAL_MAP的map集合中，使用this.getEntryName()方法返回一个唯一的名称（可以理解为锁的名称）作为键。

<img src="../assets/Redis笔记/media/image56.png" style="width:5.75in;height:1.48958in" />

如果不是第一次获取锁，putIfAbsent()会返回旧的Entry，执行addThreadId()方法为当前线程的重入次数自增1，如果是第一次获取锁，除了执行addThreadId()方法新增Redis可重入锁，还会执行renewExpiration()方法，开启一个Timeout定时任务，每隔internalLockLeaseTime / 3 时间即10秒更新锁的有效期即续约。

简单来说，WatchDog机制每10秒检查一次，续期时间为30秒。当程序没有显式释放锁的操作时，watchdog会不断地执行续期操作，确保分布式锁的key不会过期。这样可以避免其他节点认为锁已经过期而尝试获取锁。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意</strong>：</p>
<p>要想看门狗机制启动，不能传leaseTime参数</p>
<p>锁重试和waitTime参数挂钩，看门狗机制和leaseTime参数挂钩</p></td>
</tr>
</tbody>
</table>

**释放锁流程**

<img src="../assets/Redis笔记/media/image57.png" style="width:5.75in;height:0.69792in" />

unlock()释放锁会进入cancelExpirationRenewal()方法取消自动更新，如removeThreadId()删除锁，timeout.cancel()取消Timeout定时任务，最终remove()确保删除EXPIRATION_RENEWAL_MAP中的目标ExpirationEntry对象，即使释放锁出现异常，WatchDog也会通过判断后不再给锁续期。

<img src="../assets/Redis笔记/media/image58.png" style="width:5.75in;height:2.3125in" />

**总结下来**，获取锁和释放锁的业务流程如下：

<img src="../assets/Redis笔记/media/image59.png" style="width:5.75in;height:2.3125in" />

**可重入**：利用hash结构记录线程id和重入次数

**可重试**：利用信号量和PubSub功能实现等待、唤醒，获取锁失败的重试机制

**超时续约**：利用watchDog，每隔一段时间（releaseTime / 3），重置超时时间

**4.3.4 redission锁的MutiLock原理**

**Redis集群分布**

为了提高redis的可用性，常会搭建集群结构或者主从结构。

假设现在有一台主机和一台从机组成主从结构，假设主机还没来得及把数据写入到从机时，主机宕机，哨兵会发现主机宕机，并选举一个slave变成master，而此时新的master中并没有锁信息，导致锁信息丢失：

<img src="../assets/Redis笔记/media/image60.png" style="width:5.75in;height:1.38542in" />

为了解决这个问题，redission提出了MutiLock锁。建立多个主从结构，每个主节点的地位一致，MutiLock锁进行加锁时，仅当所有主节点都写入锁时才算加锁成功，只要有一个主节点没有写入锁，就算加锁失败，即使一个节点宕机了，其他主节点也有同样的锁，从而保证锁的可靠性：

<img src="../assets/Redis笔记/media/image61.png" style="width:5.75in;height:1.53125in" />

**基本使用**

RedissonConfig新增两个客户端：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Bean<br />
public RedissonClient redissonClient2() {<br />
//配置<br />
Config config = new Config();<br />
config.useSingleServer().setAddress("redis://192.168.88.131:6379")<br />
.setPassword("123456")<br />
.setDatabase(1);<br />
//创建RedissonClient对象<br />
return Redisson.create(config);<br />
}<br />
<br />
@Bean<br />
public RedissonClient redissonClient3() {<br />
//配置<br />
Config config = new Config();<br />
config.useSingleServer().setAddress("redis://192.168.88.132:6379")<br />
.setPassword("123456")<br />
.setDatabase(1);<br />
//创建RedissonClient对象<br />
return Redisson.create(config);<br />
}</td>
</tr>
</tbody>
</table>

原来注入1个RedissonClient修改为注入3个RedissonClient，并创建MultiLock对象：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private RedissonClient redissonClient;<br />
@Resource<br />
private RedissonClient redissonClient2;<br />
@Resource<br />
private RedissonClient redissonClient3;<br />
private RLock lock;<br />
<br />
@BeforeEach<br />
void setUp() {<br />
RLock lock1 = redissonClient.getLock("order");<br />
RLock lock2 = redissonClient2.getLock("order");<br />
RLock lock3 = redissonClient3.getLock("order");<br />
//创建multiLock<br />
lock = redissonClient.getMultiLock(lock1, lock2, lock3);<br />
}</td>
</tr>
</tbody>
</table>

保留原有的测试单元不变：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void method1() {<br />
boolean isLock = lock.tryLock();<br />
if (!isLock) {<br />
log.error("获取锁失败, 1");<br />
return;<br />
}<br />
try {<br />
log.info("获取锁成功, 1");<br />
method2(lock);<br />
} finally {<br />
log.info("释放锁, 1");<br />
lock.unlock();<br />
}<br />
}<br />
<br />
void method2(RLock lock) {<br />
boolean isLock = lock.tryLock();<br />
if (!isLock) {<br />
log.error("获取锁失败, 2");<br />
return;<br />
}<br />
try {<br />
log.info("获取锁成功, 2");<br />
} finally {<br />
log.info("释放锁, 2");<br />
lock.unlock();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

经过调试可以发现，三个redis客户端都能写入锁和释放锁，且锁完全一致。

**原理分析**

当设置了多个锁时，redission会将多个锁添加到一个集合中，然后用while循环去不停地尝试拿锁，但是会有一个总共的加锁时间，这个时间是用 需要加锁的个数 \* 1500ms ，假设有3个锁，那么时间就是4500ms，假设在这4500ms内，所有的锁都加锁成功， 那么此时才算是加锁成功，如果在4500ms有线程加锁失败，则会再次去进行重试：

<img src="../assets/Redis笔记/media/image62.png" style="width:5.75in;height:1.66667in" />

**5.秒杀优化**

原有的下单流程分为如下几步：

查询优惠卷

判断秒杀库存是否足够

查询订单

校验是否是一人一单

扣减库存

创建订单

其中，查询优惠券、查询订单、扣减库存、创建订单都会操作数据库，导致业务效率低下，那该怎么优化呢？

我们可以把查询优惠券、判断库存、查询订单、校验一人一单交给Redis去做，而扣减库存和创建订单这些必须操作数据库的放到阻塞队列中开启一个线程慢慢执行。

<img src="../assets/Redis笔记/media/image63.png" style="width:5.75in;height:2.52083in" />

**Redis端**：当用户下单之后，判断库存是否充足只需要到redis中去根据key找对应的value是否大于0，如果不充足，则直接结束，如果充足，继续在redis中判断用户是否可以下单，如果set集合中没有这条数据，说明他可以下单，如果set集合中没有这条记录，则将userId和优惠卷存入到redis中，并且返回0，整个过程需要保证是原子性，所以使用lua来操作。

**服务端**：当Redis逻辑走完后，判断当前redis中返回的结果是否是0 ，如果是0，则表示可以下单，则将之前说的信息存入到到queue中去，然后返回，然后再来个线程异步的下单，前端可以通过返回的订单id来判断是否下单成。

**5.1 Redis完成秒杀资格判断**

修改VoucherServiceImpl的新增秒杀券业务方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
@Transactional<br />
public void addSeckillVoucher(Voucher voucher) {<br />
// 保存优惠券<br />
save(voucher);<br />
// 保存秒杀信息<br />
SeckillVoucher seckillVoucher = new SeckillVoucher();<br />
seckillVoucher.setVoucherId(voucher.getId());<br />
seckillVoucher.setStock(voucher.getStock());<br />
seckillVoucher.setBeginTime(voucher.getBeginTime());<br />
seckillVoucher.setEndTime(voucher.getEndTime());<br />
seckillVoucherService.save(seckillVoucher);<br />
// 保存秒杀库存到Redis中<br />
stringRedisTemplate.opsForValue().set(RedisConstans.SECKILL_STOCK_KEY + voucher.getId(), voucher.getStock().toString());<br />
}</td>
</tr>
</tbody>
</table>

在resources包下创建Lua脚本seckill.lua：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 1.参数列表<br />
-- 1.1.优惠券id<br />
local voucherId = ARGV[1]<br />
-- 1.2.用户id<br />
local userId = ARGV[2]<br />
<br />
-- 2.数据key<br />
-- 2.1.库存key<br />
local stockKey = 'seckill:stock:' .. voucherId<br />
-- 2.2.订单key<br />
local orderKey = 'seckill:order:' .. voucherId<br />
<br />
-- 3.脚本业务<br />
-- 3.1.判断库存是否充足 get stockKey<br />
if(tonumber(redis.call('get', stockKey)) &lt;= 0) then<br />
-- 3.2.库存不足，返回1<br />
return 1<br />
end<br />
-- 3.2.判断用户是否下单 SISMEMBER orderKey userId<br />
if(redis.call('sismember', orderKey, userId) == 1) then<br />
-- 3.3.存在，说明是重复下单，返回2<br />
return 2<br />
end<br />
-- 3.4.扣库存 incrby stockKey -1<br />
redis.call('incrby', stockKey, -1)<br />
-- 3.5.下单（保存用户）sadd orderKey userId<br />
redis.call('sadd', orderKey, userId)<br />
return 0</td>
</tr>
</tbody>
</table>

初步修改VoucherOrderServiceImpl中下单逻辑：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
private static final DefaultRedisScript&lt;Long&gt; SECKILL_SCRIPT;<br />
static {<br />
SECKILL_SCRIPT = new DefaultRedisScript&lt;&gt;();<br />
SECKILL_SCRIPT.setLocation(new ClassPathResource("seckill.lua"));<br />
SECKILL_SCRIPT.setResultType(Long.class);<br />
}<br />
<br />
@Override<br />
public Result seckillVoucher(Long voucherId) {<br />
//获取用户<br />
Long userId = UserHolder.getUser().getId();<br />
// 1.执行lua脚本<br />
Long result = stringRedisTemplate.execute(<br />
SECKILL_SCRIPT,<br />
Collections.emptyList(),<br />
voucherId.toString(), userId.toString()<br />
);<br />
int r = result.intValue();<br />
// 2.判断结果是否为0<br />
if (r != 0) {<br />
// 2.1.不为0 ，代表没有购买资格<br />
return Result.fail(r == 1 ? "库存不足" : "不能重复下单");<br />
}<br />
// 2.2.为0，有购买资格，把下单信息保存到阻塞队列<br />
long orderId = redisIdWorker.nextId("order");<br />
//TODO 保存阻塞队列<br />
// 3.返回订单id<br />
return Result.ok(orderId);<br />
}</td>
</tr>
</tbody>
</table>

**5.2 基于阻塞队列实现秒杀优化**

IVoucherOrderService接口新增createVoucherOrder方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
void createVoucherOrder(VoucherOrder voucherOrder);</td>
</tr>
</tbody>
</table>

完善VoucherOrderServiceImpl的下单逻辑，最后完整代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Service<br />
public class VoucherOrderServiceImpl extends ServiceImpl&lt;VoucherOrderMapper, VoucherOrder&gt; implements IVoucherOrderService {<br />
@Resource<br />
private ISeckillVoucherService seckillVoucherService;<br />
@Resource<br />
private RedisIdWorker redisIdWorker;<br />
@Resource<br />
private StringRedisTemplate stringRedisTemplate;<br />
@Resource<br />
private RedissonClient redissonClient;<br />
private static final DefaultRedisScript&lt;Long&gt; SECKILL_SCRIPT;<br />
//异步处理线程池<br />
private static final ExecutorService SECKILL_ORDER_EXECUTOR = Executors.newSingleThreadExecutor();<br />
private BlockingQueue&lt;VoucherOrder&gt; orderTasks = new ArrayBlockingQueue&lt;&gt;(1024 * 1024);<br />
private IVoucherOrderService proxy;<br />
<br />
static {<br />
SECKILL_SCRIPT = new DefaultRedisScript&lt;&gt;();<br />
SECKILL_SCRIPT.setLocation(new ClassPathResource("seckill.lua"));<br />
SECKILL_SCRIPT.setResultType(Long.class);<br />
}<br />
<br />
//在类初始化之后执行，因为当这个类初始化好了之后，随时都是有可能要执行的<br />
@PostConstruct<br />
private void init() {<br />
SECKILL_ORDER_EXECUTOR.submit(new VoucherOrderHandler());<br />
}<br />
<br />
private class VoucherOrderHandler implements Runnable {<br />
@Override<br />
public void run() {<br />
while (true) {<br />
try {<br />
//1.获取订单中的队列消息<br />
VoucherOrder voucherOrder = orderTasks.take();<br />
//2.创建订单<br />
handleVoucherOrder(voucherOrder);<br />
} catch (Exception e) {<br />
log.error("处理订单异常:", e);<br />
}<br />
}<br />
}<br />
}<br />
<br />
private void handleVoucherOrder(VoucherOrder voucherOrder) {<br />
// 1.获取用户<br />
Long userId = voucherOrder.getUserId();<br />
// 2.创建锁对象<br />
RLock redisLock = redissonClient.getLock("lock:order:" + userId);<br />
// 3.尝试获取锁<br />
boolean isLock = redisLock.tryLock();<br />
// 4.判断是否获得锁成功<br />
if (!isLock) {<br />
// 获取锁失败，直接返回失败或者重试<br />
log.error("不允许重复下单！");<br />
return;<br />
}<br />
try {<br />
//注意：由于是spring的事务是放在threadLocal中，此时的是多线程，事务会失效<br />
proxy.createVoucherOrder(voucherOrder);<br />
} finally {<br />
// 释放锁<br />
redisLock.unlock();<br />
}<br />
}<br />
<br />
@Override<br />
@Transactional<br />
public void createVoucherOrder(VoucherOrder voucherOrder) {<br />
Long userId = voucherOrder.getUserId();<br />
// 5.1.查询订单<br />
int count = query().eq("user_id", userId).eq("voucher_id", voucherOrder.getVoucherId()).count();<br />
// 5.2.判断是否存在<br />
if (count &gt; 0) {<br />
// 用户已经购买过了<br />
log.error("用户已经购买过一次！");<br />
}<br />
// 6.扣减库存<br />
boolean success = seckillVoucherService.update()<br />
.setSql("stock = stock - 1") // set stock = stock - 1<br />
.eq("voucher_id", voucherOrder.getVoucherId()).gt("stock", 0) // where id = ? and stock &gt; 0<br />
.update();<br />
if (!success) {<br />
// 扣减失败<br />
log.error("库存不足！");<br />
}<br />
// 7.创建订单<br />
save(voucherOrder);<br />
}<br />
<br />
<br />
@Override<br />
public Result seckillVoucher(Long voucherId) {<br />
//获取用户<br />
Long userId = UserHolder.getUser().getId();<br />
// 1.执行lua脚本<br />
Long result = stringRedisTemplate.execute(<br />
SECKILL_SCRIPT,<br />
Collections.emptyList(),<br />
voucherId.toString(), userId.toString()<br />
);<br />
int r = result.intValue();<br />
// 2.判断结果是否为0<br />
if (r != 0) {<br />
// 2.1.不为0 ，代表没有购买资格<br />
return Result.fail(r == 1 ? "库存不足" : "不能重复下单");<br />
}<br />
// 2.2.为0，有购买资格，把下单信息保存到阻塞队列<br />
VoucherOrder voucherOrder = new VoucherOrder();<br />
// 2.3.订单id<br />
long orderId = redisIdWorker.nextId("order");<br />
voucherOrder.setId(orderId);<br />
// 2.4.用户id<br />
voucherOrder.setUserId(userId);<br />
// 2.5.代金券id<br />
voucherOrder.setVoucherId(voucherId);<br />
// 2.6.放入阻塞队列<br />
orderTasks.add(voucherOrder);<br />
//3.获取代理对象<br />
proxy = (IVoucherOrderService) AopContext.currentProxy();<br />
// 3.返回订单id<br />
return Result.ok(orderId);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**5.3 Redis消息队列**

阻塞队列实现的秒杀存在两个问题：

JVM的内存限制问题

数据安全问题：JVM的内存数据没有持久化，当服务器重启或宕机或从阻塞队列取的时候遇到异常，数据都会丢失

可以使用**消息队列**解决这两个问题。

**5.3.1 消息队列介绍**

消息队列，即存放消息的队列，最简单的消息队列包含3个角色：

消息队列：存储和管理消息，也被称为消息代理（Message Broker）

生产者：发送消息到消息队列

消费者：从消息队列获取消息并处理消息

消息队列最大的好处是**解耦**，例如：下单后，Redis校验下单条件，再通过队列把消息发送出去，然后再启动一个线程消费这个消息，完成解耦，同时也加快了响应速度。

虽然可以使用现成的mp如kafka，但这里使用Redis自带的mp方案实现消息队列。

**5.3.2 基于List实现消息队列**

由于Redis的List数据结构是一个双向链表，设置当入口和出口在不同边时，就能模拟一个队列，为了实现阻塞效果，出口使用BRPOP或BLPOP，这样，就用List模拟出一个消息队列：

<img src="../assets/Redis笔记/media/image64.png" style="width:5.75in;height:0.40625in" />

优点：

利用Redis存储，不受限于JVM内存上限

基于Redis的持久化机制，数据安全性有保证

可以满足消息有序性

缺点：

无法避免消息丢失

只支持单消费者

**5.3.3 基于PubSub的消息队列**

PubSub是Redis2.0版本引入的消息传递模型。顾名思义，消费者可以订阅一个或多个channel，生产者向对应channel发送消息后，所有订阅者都能收到相关消息。

<img src="../assets/Redis笔记/media/image65.png" style="width:5.75in;height:1.38542in" />

SUBSCRIBE channel \[channel\] ：订阅一个或多个频道

PUBLISH channel msg ：向一个频道发送消息

PSUBSCRIBE pattern \[pattern\] ：订阅与pattern格式匹配的所有频道

?，匹配任意一个字符，如h?llo能匹配hallo，不能匹配haallo

\*，匹配任意0个或多个字符，如h\*llo能匹配hallo和haallo

\[ae\]，仅能匹配a或e，如h\[ae\]llo能匹配hallo和hello，不能匹配hcllo和heallo，其他类似

优点：

采用发布订阅模型，支持多生产、多消费

缺点：

不支持数据持久化

无法避免消息丢失，服务器宕机即使重启也无法接受宕机期间的任何消息

消息堆积有上限，超出时数据丢失

**5.3.4 基于Stream的消息队列-单消费**

Stream 是Redis 5.0引入的一种新数据类型，可以实现一个功能非常完善的消息队列，并支持数据持久化。

发送消息的命令：

<img src="../assets/Redis笔记/media/image66.png" style="width:5.75in;height:0.80208in" />

其中，key为消息队列名称，NOMKSTREAM参数一般不指定，常用写法为：

<img src="../assets/Redis笔记/media/image67.png" style="width:5.75in;height:0.71875in" />

读取消息的方式之一XREAD：

<img src="../assets/Redis笔记/media/image68.png" style="width:5.75in;height:1.14583in" />

例如从第一条消息开始读取users队列中的一条消息：

<img src="../assets/Redis笔记/media/image69.png" style="width:5.75in;height:1.27083in" />

读取users队列中的最新一条消息，并等待1秒：

<img src="../assets/Redis笔记/media/image70.png" style="width:5.75in;height:0.53125in" />

业务中通过XREAD阻塞结合循环就能实现持续监听队列的效果：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
while(true){<br />
// 尝试读取队列中的消息，最多阻塞2秒<br />
Object msg = redis.execute("XREAD COUNT 1 BLOCK 2000 STREAMS users $");<br />
if(msg == null){<br />
continue;<br />
}<br />
<br />
// 处理消息<br />
handleMessage(msg);<br />
}</td>
</tr>
</tbody>
</table>

当我们指定起始ID为\$时，代表读取最新的消息，如果我们处理一条消息的过程中，又有超过1条以上的消息到达队列，则下次获取时也只能获取到最新的一条，会出现**漏读消息**的问题。

**5.4.5 基于Stream的消息队列-消费者组**

消费者组，将多个消费者划分到一个组中，监听同一个队列。具备下列特点：

**消息分流**：队列中的消息会分流给组内的不同消费者，而不是重复消费，从而加快消息处理的速度

**消息标示**：消费者组会维护一个标示，记录最后一个被处理的消息，哪怕消费者宕机重启，还会从标示之后读取消息。确保每一个消息都会被消费

**消息确认**：消费者获取消息后，消息处于pending状态，并存入一个pending-list。当处理完成后需要通过XACK来确认消息，标记消息为已处理，才会从pending-list移除

创建消费者组：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
XGROUP CREATE key groupName ID [MKSTREAM]</td>
</tr>
</tbody>
</table>

key：队列名称

groupName：消费者组名称

ID：起始消费位置ID标示，\$代表队列中最后一个消息，0则代表队列中第一个消息

MKSTREAM：队列不存在时自动创建队列

删除指定的消费者组：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
XGROUP DESTROY key groupName</td>
</tr>
</tbody>
</table>

给指定的消费者组添加消费者：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
XGROUP CREATECONSUMER key groupname consumername</td>
</tr>
</tbody>
</table>

删除消费者组中的指定消费者：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
XGROUP DELCONSUMER key groupname consumername</td>
</tr>
</tbody>
</table>

从消费者组读取消息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] ID [ID ...]</td>
</tr>
</tbody>
</table>

group：消费组名称

consumer：消费者名称，如果消费者不存在，会自动创建一个消费者

count：本次查询的最大数量

BLOCK milliseconds：当没有消息时最长等待时间

NOACK：无需手动ACK，获取到消息后自动确认

默认收到消息后需要手动执行ACK命令进行消息确认，指定NOACK会自动确认

STREAMS key：指定队列名称

ID：获取消息的起始ID：

\>：从下一个**未消费**的消息开始

其它：根据指定id从pending-list中获取已消费但未确认的消息，0指从pending-list中的第一个消息开始

确认消费者组中的消息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
XACK key group ID [ID ...]</td>
</tr>
</tbody>
</table>

查询消费组里已被拉取但未确认的消息（即待处理超时或未完成的消息）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
XPENDING key group [[IDLE min-idle-time] start end count [consumer]]</td>
</tr>
</tbody>
</table>

key：队列名称

group：消费组名称

IDLE min-idle-time：删选出闲置时间超过min-idle-time的未确认消息

start end：指定消息ID的范围，常用- +查看所有未确认的消息

count：查询未确认消息的数量

consumer：只查询某个消费者的未确认消息

消费者监听消息的基本思路：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
while(true){<br />
// 尝试监听队列，使用阻塞模式，最长等待2000毫秒<br />
Object msg = redis.call("XREADGROUP GROUP g1 c1 COUNT 1 BLOCK 2000 STREAMS s1 &gt;");<br />
if(msg == null){ // null说明没有消息，继续下一次<br />
continue;<br />
}<br />
try {<br />
//处理消息，完成后一定要ACK<br />
handleMessage(msg);<br />
} catch(Exception e){<br />
while(true){<br />
Object msg = redis.call("XREADGROUP GROUP g1 c1 COUNT 1 STREAMS s1 0");<br />
if(msg == null){ // null说明没有异常消息，所有消息都已确认，结束循环<br />
break;<br />
}<br />
try {<br />
//说明没有异常消息，再次处理<br />
handleMessage(msg);<br />
} catch(Exception e){<br />
//再次出现异常，记录日志，继续循环<br />
continue;<br />
}<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

STREAM类型消息队列的XREADGROUP命令特点：

消息可回溯

可以多消费者争抢消息，加快消费速度

可以阻塞读取

没有消息漏读的风险

有消息确认机制，保证消息至少被消费一次

总结下来，List、PubSub、Stream三者的区别如下：

|                  |                                          |                    |                                                        |
|------------------|------------------------------------------|--------------------|--------------------------------------------------------|
|                  | List                                     | PubSub             | Stream                                                 |
| **消息持久化**   | 支持                                     | 不支持             | 支持                                                   |
| **阻塞读取**     | 支持                                     | 支持               | 支持                                                   |
| **消息堆积处理** | 受限于内存空间，可以利用多消费者加快处理 | 受限于消费者缓冲区 | 受限于队列长度，可以利用消费者组提高消费速度，减少堆积 |
| **消息确认机制** | 不支持                                   | 不支持             | 支持                                                   |
| **消息回溯**     | 不支持                                   | 不支持             | 支持                                                   |

**5.4.6 基于消息队列实现异步秒杀下单**

创建一个Stream类型的消息队列stream.orders：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
XGROUP CREATE stream.orders g1 0 MKSTREAM</td>
</tr>
</tbody>
</table>

修改Lua脚本，最终脚本内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 1.参数列表<br />
-- 1.1.优惠券id<br />
local voucherId = ARGV[1]<br />
-- 1.2.用户id<br />
local userId = ARGV[2]<br />
-- 1.3.订单id<br />
local orderId = ARGV[3]<br />
<br />
-- 2.数据key<br />
-- 2.1.库存key<br />
local stockKey = 'seckill:stock:' .. voucherId<br />
-- 2.2.订单key<br />
local orderKey = 'seckill:order:' .. voucherId<br />
<br />
-- 3.脚本业务<br />
-- 3.1.判断库存是否充足 get stockKey<br />
if(tonumber(redis.call('get', stockKey)) &lt;= 0) then<br />
-- 3.2.库存不足，返回1<br />
return 1<br />
end<br />
-- 3.2.判断用户是否下单 SISMEMBER orderKey userId<br />
if(redis.call('sismember', orderKey, userId) == 1) then<br />
-- 3.3.存在，说明是重复下单，返回2<br />
return 2<br />
end<br />
-- 3.4.扣库存 incrby stockKey -1<br />
redis.call('incrby', stockKey, -1)<br />
-- 3.5.下单（保存用户）sadd orderKey userId<br />
redis.call('sadd', orderKey, userId)<br />
-- 3.6.发送消息到队列中，XADD stream.orders * k1 v1 k2 v2<br />
redis.call('xadd', 'stream.orders', '*', 'userId', userId, 'voucherId', voucherId, 'id', orderId)<br />
return 0</td>
</tr>
</tbody>
</table>

修改VoucherOrderServiceImpl的下单逻辑，最后完整代码如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Service<br />
public class VoucherOrderServiceImpl extends ServiceImpl&lt;VoucherOrderMapper, VoucherOrder&gt; implements IVoucherOrderService {<br />
@Resource<br />
private ISeckillVoucherService seckillVoucherService;<br />
@Resource<br />
private RedisIdWorker redisIdWorker;<br />
@Resource<br />
private StringRedisTemplate stringRedisTemplate;<br />
@Resource<br />
private RedissonClient redissonClient;<br />
private static final DefaultRedisScript&lt;Long&gt; SECKILL_SCRIPT;<br />
//异步处理线程池<br />
private static final ExecutorService SECKILL_ORDER_EXECUTOR = Executors.newSingleThreadExecutor();<br />
private IVoucherOrderService proxy;<br />
private static final String queueName = "stream.orders";<br />
<br />
static {<br />
SECKILL_SCRIPT = new DefaultRedisScript&lt;&gt;();<br />
SECKILL_SCRIPT.setLocation(new ClassPathResource("seckill.lua"));<br />
SECKILL_SCRIPT.setResultType(Long.class);<br />
}<br />
<br />
//在类初始化之后执行，因为当这个类初始化好了之后，随时都是有可能要执行的<br />
@PostConstruct<br />
private void init() {<br />
SECKILL_ORDER_EXECUTOR.submit(new VoucherOrderHandler());<br />
}<br />
<br />
private class VoucherOrderHandler implements Runnable {<br />
@Override<br />
public void run() {<br />
// 初始化消费者组<br />
try {<br />
// 创建消费者组，如果组已存在则忽略错误<br />
stringRedisTemplate.opsForStream().createGroup(queueName, "g1");<br />
} catch (Exception e) {<br />
log.warn("消费者组 g1 已存在，跳过创建");<br />
}<br />
while (true) {<br />
try {<br />
// 1.获取消息队列中的订单信息 XREADGROUP GROUP g1 c1 COUNT 1 BLOCK 2000 STREAMS stream.orders &gt;<br />
List&lt;MapRecord&lt;String, Object, Object&gt;&gt; list = stringRedisTemplate.opsForStream().read(<br />
Consumer.from("g1", "c1"),<br />
StreamReadOptions.empty().count(1).block(Duration.ofSeconds(5)),<br />
StreamOffset.create(queueName, ReadOffset.lastConsumed())<br />
);<br />
// 2.判断订单信息是否为空<br />
if (list == null || list.isEmpty()) {<br />
// 如果为null，说明没有消息，继续下一次循环<br />
continue;<br />
}<br />
// 3.解析消息中的订单信息<br />
MapRecord&lt;String, Object, Object&gt; record = list.get(0);<br />
Map&lt;Object, Object&gt; values = record.getValue();<br />
VoucherOrder voucherOrder = BeanUtil.fillBeanWithMap(values, new VoucherOrder(), true);<br />
// 4.如果获取成功，可以下单<br />
//createVoucherOrder(voucherOrder);<br />
handleVoucherOrder(voucherOrder);<br />
// 5.确认消息 XACK stream.orders g1 id<br />
stringRedisTemplate.opsForStream().acknowledge(queueName, "g1", record.getId());<br />
} catch (Exception e) {<br />
log.error("处理订单异常:", e);<br />
//处理异常消息<br />
handlePendingList();<br />
}<br />
}<br />
}<br />
<br />
private void handlePendingList() {<br />
while (true) {<br />
try {<br />
// 1.获取pending-list中的订单信息 XREADGROUP GROUP g1 c1 COUNT 1 STREAMS stream.orders 0<br />
List&lt;MapRecord&lt;String, Object, Object&gt;&gt; list = stringRedisTemplate.opsForStream().read(<br />
Consumer.from("g1", "c1"),<br />
StreamReadOptions.empty().count(1),<br />
StreamOffset.create(queueName, ReadOffset.from("0"))<br />
);<br />
// 2.判断消息是否获取成功<br />
if (list == null || list.isEmpty()) {<br />
// 如果获取失败，，说明pending-list没有异常消息，结束循环<br />
break;<br />
}<br />
// 3.解析消息中的订单信息<br />
MapRecord&lt;String, Object, Object&gt; record = list.get(0);<br />
Map&lt;Object, Object&gt; values = record.getValue();<br />
VoucherOrder voucherOrder = BeanUtil.fillBeanWithMap(values, new VoucherOrder(), true);<br />
// 4.如果获取成功，可以下单<br />
handleVoucherOrder(voucherOrder);<br />
// 4.确认消息 XACK stream.orders g1 id<br />
stringRedisTemplate.opsForStream().acknowledge(queueName, "g1", record.getId());<br />
} catch (Exception e) {<br />
log.error("处理pendding订单异常", e);<br />
try {<br />
Thread.sleep(20);<br />
} catch (InterruptedException ex) {<br />
ex.printStackTrace();<br />
}<br />
}<br />
}<br />
}<br />
}<br />
<br />
<br />
private void handleVoucherOrder(VoucherOrder voucherOrder) {<br />
// 1.获取用户<br />
Long userId = voucherOrder.getUserId();<br />
// 2.创建锁对象<br />
RLock redisLock = redissonClient.getLock("lock:order:" + userId);<br />
// 3.尝试获取锁<br />
boolean isLock = redisLock.tryLock();<br />
// 4.判断是否获得锁成功<br />
if (!isLock) {<br />
// 获取锁失败，直接返回失败或者重试<br />
log.error("不允许重复下单！");<br />
return;<br />
}<br />
try {<br />
//注意：由于是spring的事务是放在threadLocal中，此时的是多线程，事务会失效<br />
proxy.createVoucherOrder(voucherOrder);<br />
} finally {<br />
// 释放锁<br />
redisLock.unlock();<br />
}<br />
}<br />
<br />
@Override<br />
@Transactional<br />
public void createVoucherOrder(VoucherOrder voucherOrder) {<br />
Long userId = voucherOrder.getUserId();<br />
// 5.1.查询订单<br />
int count = query().eq("user_id", userId).eq("voucher_id", voucherOrder.getVoucherId()).count();<br />
// 5.2.判断是否存在<br />
if (count &gt; 0) {<br />
// 用户已经购买过了<br />
log.error("用户已经购买过一次！");<br />
}<br />
// 6.扣减库存<br />
boolean success = seckillVoucherService.update()<br />
.setSql("stock = stock - 1") // set stock = stock - 1<br />
.eq("voucher_id", voucherOrder.getVoucherId()).gt("stock", 0) // where id = ? and stock &gt; 0<br />
.update();<br />
if (!success) {<br />
// 扣减失败<br />
log.error("库存不足！");<br />
}<br />
// 7.创建订单<br />
save(voucherOrder);<br />
}<br />
<br />
@Override<br />
public Result seckillVoucher(Long voucherId) {<br />
//获取用户<br />
Long userId = UserHolder.getUser().getId();<br />
//获取订单id<br />
long orderId = redisIdWorker.nextId("order");<br />
// 1.执行lua脚本<br />
Long result = stringRedisTemplate.execute(<br />
SECKILL_SCRIPT,<br />
Collections.emptyList(),<br />
voucherId.toString(), userId.toString(), String.valueOf(orderId)<br />
);<br />
int r = result.intValue();<br />
// 2.判断结果是否为0<br />
if (r != 0) {<br />
// 2.1.不为0 ，代表没有购买资格<br />
return Result.fail(r == 1 ? "库存不足" : "不能重复下单");<br />
}<br />
//3.获取代理对象<br />
proxy = (IVoucherOrderService) AopContext.currentProxy();<br />
// 3.返回订单id<br />
return Result.ok(orderId);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**6.达人探店**

**6.1 发布探店笔记**

当点击主页下方的加号时就能实现发布探店笔记：

<img src="../assets/Redis笔记/media/image71.png" style="width:5.75in;height:1.47917in" />

tb_blog：探店笔记表，包含笔记中的标题、文字、图片等

tb_blog_comments：其他用户对探店笔记的评价

这个功能已经实现了，只需修改SystemConstants.IMAGE_UPLOAD_DIR为自己的nginx服务器图片路径即可：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public static final String IMAGE_UPLOAD_DIR = "E:\\software\\Java\\project\\itheima-redis\\nginx-1.18.0\\html\\hmdp\\imgs";</td>
</tr>
</tbody>
</table>

**6.2 查看探店笔记**

点击某一篇笔记后，会发起请求查看探店笔记的详细信息，接口设计：

请求方式：GET

请求路径：/blog/{id}

请求参数：id，blog的id

返回值：Blog，笔记信息，包含用户信息

BlogController新增queryBlogById方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/{id}")<br />
public Result queryBlogById(@PathVariable Long id){<br />
return blogService.queryBlogById(id);<br />
}</td>
</tr>
</tbody>
</table>

BlogServiceImpl：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Service<br />
public class BlogServiceImpl extends ServiceImpl&lt;BlogMapper, Blog&gt; implements IBlogService {<br />
<br />
@Resource<br />
private IUserService userService;<br />
<br />
@Override<br />
public Result queryBlogById(Long id) {<br />
// 1.查询blog<br />
Blog blog = getById(id);<br />
if (blog == null) {<br />
return Result.fail("笔记不存在！");<br />
}<br />
// 2.查询blog有关的用户<br />
queryBlogUser(blog);<br />
return Result.ok(blog);<br />
}<br />
<br />
private void queryBlogUser(Blog blog) {<br />
Long userId = blog.getUserId();<br />
User user = userService.getById(userId);<br />
blog.setName(user.getNickName());<br />
blog.setIcon(user.getIcon());<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**6.3 点赞功能**

现已有的点赞逻辑likeBlog()方法一人可以多次点按，需要实现一人只能点赞一次，再次点击取消点赞。实现思路是基于Redis的Set集合，通过判断Set集合是否含有用户判断是否点赞，并修改tb_blog表的liked字段。

Blog类新增isLike属性（已经实现）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
/**<br />
* 是否点赞过了<br />
*/<br />
@TableField(exist = false)<br />
private Boolean isLike;</td>
</tr>
</tbody>
</table>

修改BlogController类原有的likeBlog方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@PutMapping("/like/{id}")<br />
public Result likeBlog(@PathVariable("id") Long id) {<br />
return blogService.likeBlog(id);<br />
}</td>
</tr>
</tbody>
</table>

BlogServiceImpl类新增likeBlog方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private StringRedisTemplate stringRedisTemplate;<br />
<br />
@Override<br />
public Result likeBlog(Long id) {<br />
// 1.获取登录用户<br />
Long userId = UserHolder.getUser().getId();<br />
// 2.判断当前登录用户是否已经点赞<br />
String key = RedisConstants.BLOG_LIKED_KEY + id;<br />
Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, userId.toString());<br />
if (BooleanUtil.isFalse(isMember)) {<br />
//3.如果未点赞，可以点赞<br />
//3.1 数据库点赞数+1<br />
boolean isSuccess = update().setSql("liked = liked + 1").eq("id", id).update();<br />
//3.2 保存用户到Redis的set集合<br />
if (isSuccess) {<br />
stringRedisTemplate.opsForSet().add(key, userId.toString());<br />
}<br />
} else {<br />
//4.如果已点赞，取消点赞<br />
//4.1 数据库点赞数-1<br />
boolean isSuccess = update().setSql("liked = liked - 1").eq("id", id).update();<br />
//4.2 把用户从Redis的set集合移除<br />
if (isSuccess) {<br />
stringRedisTemplate.opsForSet().remove(key, userId.toString());<br />
}<br />
}<br />
return Result.ok();<br />
}</td>
</tr>
</tbody>
</table>

此时点赞功能已经实现，但是点赞后并不会点亮点赞按钮，还需要修改探店笔记查询接口。

修改queryHotBlog中queryHotBlog方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/hot")<br />
public Result queryHotBlog(@RequestParam(value = "current", defaultValue = "1") Integer current) {<br />
return blogService.queryHotBlog(current);<br />
}</td>
</tr>
</tbody>
</table>

修改BlogServiceImpl类添加如下内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryHotBlog(Integer current) {<br />
// 根据用户查询<br />
Page&lt;Blog&gt; page = query()<br />
.orderByDesc("liked")<br />
.page(new Page&lt;&gt;(current, SystemConstants.MAX_PAGE_SIZE));<br />
// 获取当前页数据<br />
List&lt;Blog&gt; records = page.getRecords();<br />
// 查询用户<br />
records.forEach(blog -&gt;{<br />
this.queryBlogUser(blog);<br />
this.isBlogLiked(blog);<br />
});<br />
return Result.ok(records);<br />
}<br />
<br />
private void isBlogLiked(Blog blog) {<br />
//1.获取登录用户<br />
Long userId = UserHolder.getUser().getId();<br />
//2.判断当前登录用户是否已经点赞<br />
String key = RedisConstants.BLOG_LIKED_KEY + blog.getId();<br />
Boolean isMember = stringRedisTemplate.opsForSet().isMember(key, userId.toString());<br />
blog.setIsLike(BooleanUtil.isTrue(isMember));<br />
}</td>
</tr>
</tbody>
</table>

**6.4 点赞排行榜**

在探店笔记详情页面，需要按照点赞时间的前后顺序显示Top5点赞排行榜：

<img src="../assets/Redis笔记/media/image72.png" style="width:5.75in;height:1.46875in" />

由于需要按点赞时间排序，原来的Set集合就不能使用了，需要使用SortedSet集合进行存放点赞用户，score字段放置时间戳。

修改BlogServiceImpl原有的点赞逻辑：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result likeBlog(Long id) {<br />
// 1.获取登录用户<br />
Long userId = UserHolder.getUser().getId();<br />
// 2.判断当前登录用户是否已经点赞<br />
String key = RedisConstants.BLOG_LIKED_KEY + id;<br />
Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());<br />
if (score == null) {<br />
//3.如果未点赞，可以点赞<br />
//3.1 数据库点赞数+1<br />
boolean isSuccess = update().setSql("liked = liked + 1").eq("id", id).update();<br />
//3.2 保存用户到Redis的set集合<br />
if (isSuccess) {<br />
stringRedisTemplate.opsForZSet().add(key, userId.toString(), System.currentTimeMillis());<br />
}<br />
} else {<br />
//4.如果已点赞，取消点赞<br />
//4.1 数据库点赞数-1<br />
boolean isSuccess = update().setSql("liked = liked - 1").eq("id", id).update();<br />
//4.2 把用户从Redis的set集合移除<br />
if (isSuccess) {<br />
stringRedisTemplate.opsForZSet().remove(key, userId.toString());<br />
}<br />
}<br />
return Result.ok();<br />
}<br />
<br />
private void isBlogLiked(Blog blog) {<br />
//1.获取登录用户<br />
UserDTO user = UserHolder.getUser();<br />
if(user == null){<br />
// 用户未登录，无需查询是否点赞<br />
return;<br />
}<br />
Long userId = user.getId();<br />
//2.判断当前登录用户是否已经点赞<br />
String key = RedisConstants.BLOG_LIKED_KEY + blog.getId();<br />
Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());<br />
blog.setIsLike(score != null);<br />
}</td>
</tr>
</tbody>
</table>

BlogController新增queryBlogLikes方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/likes/{id}")<br />
public Result queryBlogLikes(@PathVariable("id") Long id) {<br />
return blogService.queryBlogLikes(id);<br />
}</td>
</tr>
</tbody>
</table>

BlogServiceImpl类新增queryBlogLikes方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryBlogLikes(Long id) {<br />
String key = RedisConstants.BLOG_LIKED_KEY + id;<br />
// 1.查询top5的点赞用户 zrange key 0 4<br />
Set&lt;String&gt; top5 = stringRedisTemplate.opsForZSet().range(key, 0, 4);<br />
if (top5 == null || top5.isEmpty()) {<br />
return Result.ok(Collections.emptyList());<br />
}<br />
// 2.解析出其中的用户id<br />
List&lt;Long&gt; ids = top5.stream().map(Long::valueOf).collect(Collectors.toList());<br />
String idStr = StrUtil.join(",", ids);<br />
// 3.根据用户id查询用户 WHERE id IN ( 5 , 1 ) ORDER BY FIELD(id, 5, 1)<br />
List&lt;UserDTO&gt; userDTOS = userService.query()<br />
.in("id", ids).last("ORDER BY FIELD(id," + idStr + ")").list()<br />
.stream()<br />
.map(user -&gt; BeanUtil.copyProperties(user, UserDTO.class))<br />
.collect(Collectors.toList());<br />
// 4.返回<br />
return Result.ok(userDTOS);<br />
}</td>
</tr>
</tbody>
</table>

**7.好友关注**

**7.1 关注和取消关注**

用户和用户的关注关系为多对多，这里使用tb_follow表用于记录关注关系，关注即查询信息是否存在，取消关注即删除数据。

FollowController新增follow方法和isFollow方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private IFollowService followService;<br />
<br />
//关注<br />
@PutMapping("/{id}/{isFollow}")<br />
public Result follow(@PathVariable("id") Long followUserId, @PathVariable("isFollow") Boolean isFollow) {<br />
return followService.follow(followUserId, isFollow);<br />
}<br />
//取消关注<br />
@GetMapping("/or/not/{id}")<br />
public Result isFollow(@PathVariable("id") Long followUserId) {<br />
return followService.isFollow(followUserId);<br />
}</td>
</tr>
</tbody>
</table>

FollowServiceImpl：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Service<br />
public class FollowServiceImpl extends ServiceImpl&lt;FollowMapper, Follow&gt; implements IFollowService {<br />
<br />
@Override<br />
public Result follow(Long followUserId, Boolean isFollow) {<br />
// 1.获取登录用户<br />
Long userId = UserHolder.getUser().getId();<br />
String key = "follows:" + userId;<br />
// 1.判断到底是关注还是取关<br />
if (isFollow) {<br />
// 2.关注，新增数据<br />
Follow follow = new Follow();<br />
follow.setUserId(userId);<br />
follow.setFollowUserId(followUserId);<br />
boolean isSuccess = save(follow);<br />
} else {<br />
// 3.取关，删除 delete from tb_follow where user_id = ? and follow_user_id = ?<br />
remove(new QueryWrapper&lt;Follow&gt;()<br />
.eq("user_id", userId).eq("follow_user_id", followUserId));<br />
}<br />
return Result.ok();<br />
}<br />
<br />
<br />
@Override<br />
public Result isFollow(Long followUserId) {<br />
// 1.获取登录用户<br />
Long userId = UserHolder.getUser().getId();<br />
// 2.查询是否关注 select count(*) from tb_follow where user_id = ? and follow_user_id = ?<br />
Integer count = query().eq("user_id", userId).eq("follow_user_id", followUserId).count();<br />
// 3.判断<br />
return Result.ok(count &gt; 0);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**7.2 共同关注**

查询两个人的共同关注就是求两个人关注列表的交集，考虑到Redis的Set集合有求交集功能，这里用Set集合实现。

<img src="../assets/Redis笔记/media/image73.png" style="width:5.75in;height:1.72917in" />

UserController导入查询用户详情的代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/{id}")<br />
public Result queryUserById(@PathVariable("id") Long userId){<br />
// 查询详情<br />
User user = userService.getById(userId);<br />
if (user == null) {<br />
return Result.ok();<br />
}<br />
UserDTO userDTO = BeanUtil.copyProperties(user, UserDTO.class);<br />
// 返回<br />
return Result.ok(userDTO);<br />
}</td>
</tr>
</tbody>
</table>

BlogController导入查询用户笔记代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/of/user")<br />
public Result queryBlogByUserId(<br />
@RequestParam(value = "current", defaultValue = "1") Integer current,<br />
@RequestParam("id") Long id) {<br />
// 根据用户查询<br />
Page&lt;Blog&gt; page = blogService.query()<br />
.eq("user_id", id).page(new Page&lt;&gt;(current, SystemConstants.MAX_PAGE_SIZE));<br />
// 获取当前页数据<br />
List&lt;Blog&gt; records = page.getRecords();<br />
return Result.ok(records);<br />
}</td>
</tr>
</tbody>
</table>

改造FollowServiceImpl的关注功能代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result follow(Long followUserId, Boolean isFollow) {<br />
// 1.获取登录用户<br />
Long userId = UserHolder.getUser().getId();<br />
String key = "follows:" + userId;<br />
// 1.判断到底是关注还是取关<br />
if (isFollow) {<br />
// 2.关注，新增数据<br />
Follow follow = new Follow();<br />
follow.setUserId(userId);<br />
follow.setFollowUserId(followUserId);<br />
boolean isSuccess = save(follow);<br />
if (isSuccess) {<br />
// 把关注用户的id，放入redis的set集合 sadd userId followerUserId<br />
stringRedisTemplate.opsForSet().add(key, followUserId.toString());<br />
}<br />
} else {<br />
// 3.取关，删除 delete from tb_follow where user_id = ? and follow_user_id = ?<br />
boolean isSuccess = remove(new QueryWrapper&lt;Follow&gt;()<br />
.eq("user_id", userId).eq("follow_user_id", followUserId));<br />
if (isSuccess) {<br />
// 把关注用户的id从Redis集合中移除<br />
stringRedisTemplate.opsForSet().remove(key, followUserId.toString());<br />
}<br />
}<br />
return Result.ok();<br />
}</td>
</tr>
</tbody>
</table>

FollowController新增followCommons方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/common/{id}")<br />
public Result followCommons(@PathVariable Long id){<br />
return followService.followCommons(id);<br />
}</td>
</tr>
</tbody>
</table>

FollowServiceImpl新增followCommons方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private IUserService userService;<br />
<br />
@Override<br />
public Result followCommons(Long id) {<br />
// 1.获取当前用户<br />
Long userId = UserHolder.getUser().getId();<br />
String key = "follows:" + userId;<br />
// 2.求交集<br />
String key2 = "follows:" + id;<br />
Set&lt;String&gt; intersect = stringRedisTemplate.opsForSet().intersect(key, key2);<br />
if (intersect == null || intersect.isEmpty()) {<br />
// 无交集<br />
return Result.ok(Collections.emptyList());<br />
}<br />
// 3.解析id集合<br />
List&lt;Long&gt; ids = intersect.stream().map(Long::valueOf).collect(Collectors.toList());<br />
// 4.查询用户<br />
List&lt;UserDTO&gt; users = userService.listByIds(ids)<br />
.stream()<br />
.map(user -&gt; BeanUtil.copyProperties(user, UserDTO.class))<br />
.collect(Collectors.toList());<br />
return Result.ok(users);<br />
}</td>
</tr>
</tbody>
</table>

**7.3 关注推送**

**7.3.1 Feed流**

推送就是把消息推送给用户，使用户可以及时看到消息，而关注推送就是用户如果发布了一篇笔记，就把这篇笔记推送给所有的粉丝，为用户提供沉侵式体验，通过无限下拉刷新获取新的消息，也叫**Feed流**。

Feed流的实现有两种模式：

**Timeline**：不做内容筛选，简单的按照内容发布时间排序，常用于好友或关注。例如朋友圈

优点：信息全面，不会有缺失。并且实现也相对简单

缺点：信息噪音较多，用户不一定感兴趣，内容获取效率低

**智能排序**：利用智能算法屏蔽掉违规的、用户不感兴趣的内容。推送用户感兴趣信息来吸引用户

优点：投喂用户感兴趣信息，用户粘度很高，容易沉迷

缺点：如果算法不精准，可能起到反作用

本例基于关注的好友来做Feed流，所以采用Timeline模式。Timeline模式的实现模式有三种：

**拉模式**

拉模式也叫读扩散，比如：张三、李四、王五各自有自己的发件箱，发送消息发送到自己的发件箱，如果赵六要读取，需要拉取三个人的发件箱信息到自己的收件箱，然后按照时间排序，读取完清除。

<img src="../assets/Redis笔记/media/image74.png" style="width:5.75in;height:1.53125in" />

优点：节约空间，没有重复读取，读完清除

缺点：比较延迟，每次读取都要拉取，如果关注的人多，会造成压力

**推模式**

推模式也叫写扩散，比如：每个粉丝都有自己的收件箱，张三或李四发布内容要推送到所有粉丝的收件箱里。

<img src="../assets/Redis笔记/media/image75.png" style="width:5.75in;height:1.64583in" />

优点：时效快，不用临时拉取

缺点：内存压力大，如果粉丝很多就会推送麻烦

**推拉结合模式**

推拉结合模式也叫读写混合，兼具推和拉两种模式的优点，比如：普通用户粉丝少，就可以直接把消息推动给所有粉丝，而大V粉丝多，有一个自己的发件箱，发送消息写入发件箱的同时推送给活跃的粉丝，不活跃的粉丝查看时自己从发件箱读。

<img src="../assets/Redis笔记/media/image76.png" style="width:5.75in;height:1.51042in" />

Timeline模式三种实现模式对比：

|                  |          |                   |                       |
|------------------|----------|-------------------|-----------------------|
|                  | 拉模式   | 推模式            | 推拉模式              |
| **写比例**       | 低       | 高                | 中                    |
| **读比例**       | 高       | 低                | 中                    |
| **用户读取延迟** | 高       | 低                | 低                    |
| **实现难度**     | 复杂     | 简单              | 很复杂                |
| **使用场景**     | 很少使用 | 用户量少，没有大V | 过千万的用户量，有大V |

**7.3.2 推送到粉丝收件箱**

需求：

修改新增探店笔记的业务，在保存blog到数据库的同时，推送到粉丝的收件箱

收件箱满足可以根据时间戳排序，必须用Redis的数据结构实现

查询收件箱数据时，可以实现分页查询

**思路分析**

以传统的分页查询为例，如下图，t1时刻查询第一页数据到6，t2时刻Feed流推送了新的消息11，t3时再查询第二页数据理论上应该从5开始，但是实际是从6开始，所以原始的分页查询不适用，此时就要用到**滚动分页查询**。

<img src="../assets/Redis笔记/media/image77.png" style="width:5.75in;height:1.5in" />

如下图，采用滚动分页时，t1时刻查询到6，此时记录下这一次查询的最后值6，t2时刻Feed流推动了新的消息11，但是此时我们从上一次查询的最后值6往后分页查询，就查询到了正确的数据。

<img src="../assets/Redis笔记/media/image78.png" style="width:5.75in;height:1.45833in" />

考虑到Set集合只能通过索引分页，所以这里使用SortedSet集合实现，以时间戳为score，每次记录最后的时间戳score，下次从这里开始，用到的命令如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]</td>
</tr>
</tbody>
</table>

key：集合名称

max：分数的上限，包含该值

min：分数的下限，包含该值

WITHSCORES：返回成员是否要包含其分数，加上表示包含

LIMIT：用于分页，offset表示起始位置（从0开始），count表示返回几条数据

经过分析，本次案例参数的设置如下：

max：第一页使用当前时间戳，其他页使用上一次查询的最小时间戳

min：0

offset：第一次使用0，后面使用上一次结果中与最小值一样的元素的个数

count：3

**代码实现**

修改BlogController的saveBlog方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@PostMapping<br />
public Result saveBlog(@RequestBody Blog blog) {<br />
return blogService.saveBlog(blog);<br />
}</td>
</tr>
</tbody>
</table>

BlogServiceImpl类添加saveBlog方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Resource<br />
private IFollowService followService;<br />
<br />
@Override<br />
public Result saveBlog(Blog blog) {<br />
// 1.获取登录用户<br />
UserDTO user = UserHolder.getUser();<br />
blog.setUserId(user.getId());<br />
// 2.保存探店笔记<br />
boolean isSuccess = save(blog);<br />
if (!isSuccess) {<br />
return Result.fail("新增笔记失败!");<br />
}<br />
// 3.查询笔记作者的所有粉丝 select * from tb_follow where follow_user_id = ?<br />
List&lt;Follow&gt; follows = followService.query().eq("follow_user_id", user.getId()).list();<br />
// 4.推送笔记id给所有粉丝<br />
for (Follow follow : follows) {<br />
// 4.1.获取粉丝id<br />
Long userId = follow.getUserId();<br />
// 4.2.推送<br />
String key = RedisConstants.FEED_KEY + userId;<br />
stringRedisTemplate.opsForZSet().add(key, blog.getId().toString(), System.currentTimeMillis());<br />
}<br />
// 5.返回id<br />
return Result.ok(blog.getId());<br />
}</td>
</tr>
</tbody>
</table>

**7.3.3 实现分页查询收邮箱**

<img src="../assets/Redis笔记/media/image79.png" style="width:5.75in;height:1.47917in" />

在dto包下创建实体类ScrollResult（已经实现）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Data<br />
public class ScrollResult {<br />
private List&lt;?&gt; list;<br />
private Long minTime;<br />
private Integer offset;<br />
}</td>
</tr>
</tbody>
</table>

BlogController新增queryBlogOfFollow方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/of/follow")<br />
public Result queryBlogOfFollow(@RequestParam("lastId") Long max,@RequestParam(value = "offset",defaultValue = "0") Integer offset){<br />
return blogService.queryBloyOfFollow(max,offset);<br />
}</td>
</tr>
</tbody>
</table>

BlogServiceImpl类新增queryBlogOfFollow方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryBloyOfFollow(Long max, Integer offset) {<br />
// 1.获取当前用户<br />
Long userId = UserHolder.getUser().getId();<br />
// 2.查询收件箱 ZREVRANGEBYSCORE key Max Min LIMIT offset count<br />
String key = RedisConstants.FEED_KEY + userId;<br />
Set&lt;ZSetOperations.TypedTuple&lt;String&gt;&gt; typedTuples = stringRedisTemplate.opsForZSet()<br />
.reverseRangeByScoreWithScores(key, 0, max, offset, 2);<br />
// 3.非空判断<br />
if (typedTuples == null || typedTuples.isEmpty()) {<br />
return Result.ok();<br />
}<br />
// 4.解析数据：blogId、minTime（时间戳）、offset<br />
List&lt;Long&gt; ids = new ArrayList&lt;&gt;(typedTuples.size());<br />
long minTime = 0;<br />
int os = 1;<br />
for (ZSetOperations.TypedTuple&lt;String&gt; tuple : typedTuples) {<br />
// 4.1.获取id<br />
ids.add(Long.valueOf(tuple.getValue()));<br />
// 4.2.获取分数(时间戳）<br />
long time = tuple.getScore().longValue();<br />
if (time == minTime) {<br />
os++;<br />
} else {<br />
minTime = time;<br />
os = 1;<br />
}<br />
}<br />
// 5.根据id查询blog<br />
String idStr = StrUtil.join(",", ids);<br />
List&lt;Blog&gt; blogs = query().in("id", ids).last("ORDER BY FIELD(id," + idStr + ")").list();<br />
for (Blog blog : blogs) {<br />
// 5.1.查询blog有关的用户<br />
queryBlogUser(blog);<br />
// 5.2.查询blog是否被点赞<br />
isBlogLiked(blog);<br />
}<br />
// 6.封装并返回<br />
ScrollResult r = new ScrollResult();<br />
r.setList(blogs);<br />
r.setOffset(os);<br />
r.setMinTime(minTime);<br />
return Result.ok(r);<br />
}</td>
</tr>
</tbody>
</table>

**8.附近商户**

**8.1 GEO数据结构**

Redis引入了对GEO的支持，用于存储地理坐标信息，帮助我们通过经纬度检索数据。GEO常用命令如下：

GEOADD：添加一个地理空间信息，包含：经度（longitude）、纬度（latitude）、值（member）

GEODIST：计算指定的两个点之间的距离并返回

GEOHASH：将指定member的坐标转为hash字符串形式并返回

GEOPOS：返回指定member的坐标

~~GEORADIUS~~：指定圆心、半径，找到该圆内包含的所有member，并按照与圆心之间的距离排序后返回。6.以后已废弃

GEOSEARCH：在指定范围内搜索member，并按照与指定点之间的距离排序后返回。范围可以是圆形或矩形。6.2.新功能

GEOSEARCHSTORE：与GEOSEARCH功能一致，不过可以把结果存储到一个指定的key。 6.2.新功能

**8.2 导入店铺数据到GEO**

首页点击某个频道，即可按照距离显示各个频道的店铺信息：

<img src="../assets/Redis笔记/media/image80.png" style="width:5.75in;height:1.4375in" />

现在的问题是怎么合理设置Redis的结构，我们可以以商铺类型id作为键key，key中存放每个店铺的坐标，店铺的值就使用店铺id，这样查询时只需要根据类型到指定key中查找店铺与当前位置的距离即可。

编写测试单元，导入店铺的坐标数据（对应tb_shop表的x、y字段）到Redis：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void loadShopData() {<br />
// 1.查询店铺信息<br />
List&lt;Shop&gt; list = shopService.list();<br />
// 2.把店铺分组，按照typeId分组，typeId一致的放到一个集合<br />
Map&lt;Long, List&lt;Shop&gt;&gt; map = list.stream().collect(Collectors.groupingBy(Shop::getTypeId));<br />
// 3.分批完成写入Redis<br />
for (Map.Entry&lt;Long, List&lt;Shop&gt;&gt; entry : map.entrySet()) {<br />
// 3.1.获取类型id<br />
Long typeId = entry.getKey();<br />
String key = RedisConstants.SHOP_GEO_KEY + typeId;<br />
// 3.2.获取同类型的店铺的集合<br />
List&lt;Shop&gt; value = entry.getValue();<br />
List&lt;RedisGeoCommands.GeoLocation&lt;String&gt;&gt; locations = new ArrayList&lt;&gt;(value.size());<br />
// 3.3.写入redis GEOADD key 经度 纬度 member<br />
for (Shop shop : value) {<br />
// stringRedisTemplate.opsForGeo().add(key, new Point(shop.getX(), shop.getY()), shop.getId().toString());<br />
locations.add(new RedisGeoCommands.GeoLocation&lt;&gt;(<br />
shop.getId().toString(),<br />
new Point(shop.getX(), shop.getY())<br />
));<br />
}<br />
stringRedisTemplate.opsForGeo().add(key, locations);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**8.3 实现附近商户功能**

由于SpringDataRedis2.3.9版本并不支持Redis 6.2提供的GEOSEARCH命令，因此需要修改POM：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;<br />
&lt;exclusions&gt;<br />
&lt;exclusion&gt;<br />
&lt;artifactId&gt;spring-data-redis&lt;/artifactId&gt;<br />
&lt;groupId&gt;org.springframework.data&lt;/groupId&gt;<br />
&lt;/exclusion&gt;<br />
&lt;exclusion&gt;<br />
&lt;artifactId&gt;lettuce-core&lt;/artifactId&gt;<br />
&lt;groupId&gt;io.lettuce&lt;/groupId&gt;<br />
&lt;/exclusion&gt;<br />
&lt;/exclusions&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.data&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-data-redis&lt;/artifactId&gt;<br />
&lt;version&gt;2.6.2&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;io.lettuce&lt;/groupId&gt;<br />
&lt;artifactId&gt;lettuce-core&lt;/artifactId&gt;<br />
&lt;version&gt;6.1.6.RELEASE&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

修改ShopController的queryShopByType方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/of/type")<br />
public Result queryShopByType(<br />
@RequestParam("typeId") Integer typeId,<br />
@RequestParam(value = "current", defaultValue = "1") Integer current,<br />
@RequestParam(value = "x", required = false) Double x,<br />
@RequestParam(value = "y", required = false) Double y<br />
) {<br />
return shopService.queryShopByType(typeId, current, x, y);<br />
}</td>
</tr>
</tbody>
</table>

ShopServiceImpl新增queryShopByType方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result queryShopByType(Integer typeId, Integer current, Double x, Double y) {<br />
// 1.判断是否需要根据坐标查询<br />
if (x == null || y == null) {<br />
// 不需要坐标查询，按数据库查询<br />
Page&lt;Shop&gt; page = query()<br />
.eq("type_id", typeId)<br />
.page(new Page&lt;&gt;(current, SystemConstants.DEFAULT_PAGE_SIZE));<br />
// 返回数据<br />
return Result.ok(page.getRecords());<br />
}<br />
<br />
// 2.计算分页参数<br />
int from = (current - 1) * SystemConstants.DEFAULT_PAGE_SIZE;<br />
int end = current * SystemConstants.DEFAULT_PAGE_SIZE;<br />
<br />
// 3.查询redis、按照距离排序、分页。结果：shopId、distance<br />
String key = RedisConstants.SHOP_GEO_KEY + typeId;<br />
GeoResults&lt;RedisGeoCommands.GeoLocation&lt;String&gt;&gt; results = stringRedisTemplate.opsForGeo() // GEOSEARCH key BYLONLAT x y BYRADIUS 10 WITHDISTANCE<br />
.search(<br />
key,<br />
GeoReference.fromCoordinate(x, y),<br />
new Distance(5000),<br />
RedisGeoCommands.GeoSearchCommandArgs.newGeoSearchArgs().includeDistance().limit(end)<br />
);<br />
// 4.解析出id<br />
if (results == null) {<br />
return Result.ok(Collections.emptyList());<br />
}<br />
List&lt;GeoResult&lt;RedisGeoCommands.GeoLocation&lt;String&gt;&gt;&gt; list = results.getContent();<br />
if (list.size() &lt;= from) {<br />
// 没有下一页了，结束<br />
return Result.ok(Collections.emptyList());<br />
}<br />
// 4.1.截取 from ~ end的部分<br />
List&lt;Long&gt; ids = new ArrayList&lt;&gt;(list.size());<br />
Map&lt;String, Distance&gt; distanceMap = new HashMap&lt;&gt;(list.size());<br />
list.stream().skip(from).forEach(result -&gt; {<br />
// 4.2.获取店铺id<br />
String shopIdStr = result.getContent().getName();<br />
ids.add(Long.valueOf(shopIdStr));<br />
// 4.3.获取距离<br />
Distance distance = result.getDistance();<br />
distanceMap.put(shopIdStr, distance);<br />
});<br />
// 5.根据id查询Shop<br />
String idStr = StrUtil.join(",", ids);<br />
List&lt;Shop&gt; shops = query().in("id", ids).last("ORDER BY FIELD(id," + idStr + ")").list();<br />
for (Shop shop : shops) {<br />
shop.setDistance(distanceMap.get(shop.getId().toString()).getValue());<br />
}<br />
// 6.返回<br />
return Result.ok(shops);<br />
}</td>
</tr>
</tbody>
</table>

**9.用户签到**

虽然可以使用tb_sign表存储用户的签到信息，但是每一次签到都要记录一条记录，对于巨大的用户和频繁的签到，那记录的数据量是难以想象的，所以，可以用一串由0、1构成的字符串存储用户这个月的签到情况，一个位置代表一天，0表示未签到，1表示已签到，这种思想也被成为**位图**。

<img src="../assets/Redis笔记/media/image81.png" style="width:5.75in;height:0.70833in" />

**9.1 BitMap**

Redis提供了利用String类型数据结构实现位图的BitMap，最大上限是512M，转换为bit则是 2^32个bit位。

BitMap的操作命令：

SETBIT：向指定位置（offset）存入一个0或1

GETBIT ：获取指定位置（offset）的bit值

BITCOUNT ：统计BitMap中值为1的bit位的数量

BITFIELD ：操作（查询、修改、自增）BitMap中bit数组中的指定位置（offset）的值

BITFIELD_RO ：获取BitMap中bit数组，并以十进制形式返回

BITOP ：将多个BitMap的结果做位运算（与 、或、异或）

BITPOS ：查找bit数组中指定范围内第一个0或1出现的位置

BITFIELD完整命令格式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]</td>
</tr>
</tbody>
</table>

key：要操作的字符串键

子命令（可同时包含多个，按顺序执行）：

GET type offset：读取指定偏移量（从0开始）处、指定类型的位值，返回读取的位值

SET type offset value：将指定偏移量处、指定类型的位值设置为value

INCRBY type offset increment：对指定偏移量处、指定类型的位值进行自增（increment可正可负）

OVERFLOW WRAP\|SAT\|FAIL：可选参数，指定INCRBY操作的溢出策略（默认WRAP）：

WRAP：溢出时循环（如无符号整数溢出后从 0 重新开始）

SAT：饱和模式（溢出时保持最大值 / 最小值，不循环）

FAIL：溢出时返回错误，不执行操作

type用于指定位操作的位宽和符号属性，格式为 \[u\|i\]\<bits\>：

u\<bits\>：无符号整数，bits可为 1~64（如 u8 表示 8 位无符号整数）

i\<bits\>：有符号整数，bits可为 1~63（如 i16 表示 16 位有符号整数）

例如BITFIELD field1 GET u3 1表示field1中从第2位开始，读取3位，返回二进制结果对应的无符号整数。

**9.2 实现签到功能**

请求方式：POST

请求路径：/user/sign

请求参数和返回值均无

UserController新增sign方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@PostMapping("/sign")<br />
public Result sign() {<br />
return userService.sign();<br />
}</td>
</tr>
</tbody>
</table>

UserServiceImpl类新增sign方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result sign() {<br />
// 1.获取当前登录用户<br />
Long userId = UserHolder.getUser().getId();<br />
// 2.获取日期<br />
LocalDateTime now = LocalDateTime.now();<br />
// 3.拼接key<br />
String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));<br />
String key = RedisConstants.USER_SIGN_KEY + userId + keySuffix;<br />
// 4.获取今天是本月的第几天<br />
int dayOfMonth = now.getDayOfMonth();<br />
// 5.写入Redis SETBIT key offset 1<br />
stringRedisTemplate.opsForValue().setBit(key, dayOfMonth - 1, true);<br />
return Result.ok();<br />
}</td>
</tr>
</tbody>
</table>

**9.3 签到统计**

签到统计就是统计从今天开始往前倒数用户本月连续签到的天数，请求信息如下：

请求方式：GET

请求路径：/user/sign/count

请求参数：无

返回值：连续签到的天数

怎么查到到现在为止用户本月的所有签到次数呢，方法是使用BITFIELD key GET u\[dayOfMonth\] 0命令，其中dayOfMonth表示今天是本月的第几天，通俗讲就是几号；由于GET得到的是一个十进制整数，怎么得到最后一比特位，方法是和1进行与运算，得到的结果就是最后一比特位。

UserController新增signCount方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@GetMapping("/sign/count")<br />
public Result signCount() {<br />
return userService.signCount();<br />
}</td>
</tr>
</tbody>
</table>

UserServiceImpl新增signCount方法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public Result signCount() {<br />
// 1.获取当前登录用户<br />
Long userId = UserHolder.getUser().getId();<br />
// 2.获取日期<br />
LocalDateTime now = LocalDateTime.now();<br />
// 3.拼接key<br />
String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));<br />
String key = RedisConstants.USER_SIGN_KEY + userId + keySuffix;<br />
// 4.获取今天是本月的第几天<br />
int dayOfMonth = now.getDayOfMonth();<br />
// 5.获取本月截止今天为止的所有的签到记录，返回的是一个十进制的数字 BITFIELD sign:5:202203 GET u14 0<br />
List&lt;Long&gt; result = stringRedisTemplate.opsForValue().bitField(<br />
key,<br />
BitFieldSubCommands.create()<br />
.get(BitFieldSubCommands.BitFieldType.unsigned(dayOfMonth)).valueAt(0)<br />
);<br />
if (result == null || result.isEmpty()) {<br />
// 没有任何签到结果<br />
return Result.ok(0);<br />
}<br />
Long num = result.get(0);<br />
if (num == null || num == 0) {<br />
return Result.ok(0);<br />
}<br />
// 6.循环遍历<br />
int count = 0;<br />
while (true) {<br />
// 6.1.让这个数字与1做与运算，得到数字的最后一个bit位 // 判断这个bit位是否为0<br />
if ((num &amp; 1) == 0) {<br />
// 如果为0，说明未签到，结束<br />
break;<br />
} else {<br />
// 如果不为0，说明已签到，计数器+1<br />
count++;<br />
}<br />
// 把数字右移一位，抛弃最后一个bit位，继续下一个bit位<br />
num &gt;&gt;&gt;= 1;<br />
}<br />
return Result.ok(count);<br />
}</td>
</tr>
</tbody>
</table>

**10.UV统计**

UV：也叫独立访客量，指通过互联网访问、浏览这个网页的自然人。1天内同一个用户多次访问该网站，只记录1次

PV：也叫页面访问量或点击量，用户每访问网站的一个页面，记录1次PV，用户多次打开页面，则记录多次PV。往往用来衡量网站的流量

一般来说PV比UV要大得多，如果每次访问都保存到Redis，那么对内存是极大的消耗，为了解决这个问题，可以使用Redis提供的Hyperloglog统计。

**10.1 HyperLogLog**

HyperLogLog（HLL）是从Loglog算法派生的概率算法，用于确定非常大的集合的基数，而不需要存储其所有值。

Redis中的HLL是基于String实现的，单个HLL内存**永远小于16kb，内存占用极低**，但是测量结果不一定准确，有小于0.81％的误差。

原理可以参考网站：

**\[该类型的内容暂不支持下载\]**

HyperLogLog常用命令：

PFADD key element \[element ...\] ：向HyperLogLog中添加元素，重复的元素只添加一个

PFCOUNT key \[key ...\] ：统计HyperLogLog中存放的元素的个数，只是粗略统计，结果不一定准确

PFMERGE destkey sourcekey \[sourcekey ...\] ：合并多个HyperLogLog，相当于Set集合求并集

**10.2 测试百万数据的统计**

编写测试单元测试100万个数据的统计量：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testHyperLogLog() {<br />
//准备数组，装存储到HLL中的数据<br />
String[] values = new String[1000];<br />
//数组角标<br />
int j = 0;<br />
for (int i = 0; i &lt; 1000000; i++) {<br />
//计算角标<br />
j = i % 1000;<br />
//得到HLL中的数据<br />
values[j] = "user_" + i;<br />
//每1000条发送一次<br />
if (j == 999) {<br />
stringRedisTemplate.opsForHyperLogLog().add("hll2", values);<br />
}<br />
}<br />
//统计数量<br />
Long size = stringRedisTemplate.opsForHyperLogLog().size("hll2");<br />
System.out.println("size = " + size);<br />
}</td>
</tr>
</tbody>
</table>

从结果可以看到插入了100万条数据到HLL，但是却统计出997593，说明HLL有一定误差，但是误差还是可以接受。

**三、分布式缓存**

单机的Redis存在的问题与解决方案：

|              |                                                                |                                        |
|--------------|----------------------------------------------------------------|----------------------------------------|
|              | 问题描述                                                       | 解决方案                               |
| 数据丢失问题 | Redis是内存存储，服务重启可能会丢失数据                        | 实现Redis数据持久化                    |
| 并发能力问题 | 单节点Redis并发能力虽然不错，但也无法满足如618这样的高并发场景 | 搭建主从集群，实现读写分离             |
| 存储能力问题 | Redis基于内存，单节点能存储的数据量是难以满足海量数据需求      | 搭建分片集群，利用插槽机制实现动态扩容 |
| 故障恢复问题 | 如果Redis宕机，则服务不可用，需要一种自动的故障恢复手段        | 利用Redis哨兵，实现健康检测和自动恢复  |

**1.Redis持久化**

**1.1 RDB持久化**

RDB即Redis数据备份文件，也被叫做Redis数据快照。将内存中的所有数据都记录到磁盘中，当Redis实例故障重启后，从磁盘读取快照文件，恢复数据。快照文件称为RDB文件，默认是保存在当前运行目录。

**1.1.1 执行时机**

RDB持久化在四种情况下会执行：

执行save命令：save命令立马执行RDB持久化，但是主线程会被阻塞，期间其他命令无法执行，只有数据迁移时可能用到

执行bgsave命令：bgsave命令开启一个新线程执行RDB持久化，主线程不会被阻塞，不影响主进程处理用户请求

Redis停机时：Redis停机时会自动执行一次save命令，实现RDB持久化

触发RDB条件时：在redis.conf文件中可以配置RDB触发条件

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
# 如save 900 1表示：900秒内如果至少有1个key被修改，则执行bgsave<br />
# save ""则表示禁用RDB<br />
save 900 1<br />
save 300 10<br />
save 60 10000<br />
<br />
# 是否压缩，建议设置no不开启，压缩也会消耗cpu，磁盘的话不值钱<br />
rdbcompression yes<br />
<br />
# RDB文件名称，默认是dump.rdb<br />
dbfilename dump.rdb<br />
<br />
# rdb文件保存的路径目录，./表示当前目录<br />
dir ./</td>
</tr>
</tbody>
</table>

**1.1.2 RDB原理**

bgsave开始时会fork主进程得到子进程，子进程共享主进程的内存数据。完成fork后读取内存数据并写入 RDB 文件。

fork采用的是copy-on-write技术：

当主进程执行读操作时，访问共享内存

当主进程执行写操作时，则会拷贝一份数据，执行写操作

<img src="../assets/Redis笔记/media/image82.png" style="width:5.75in;height:1.73958in" />

Redis并不会直接操作内存，而是为进程设置一个虚拟内存，并通过页表保存虚拟内存和物理内存的映射关系，bgsave开始fork主进程得到一个子进程，同时将物理内存中的数据标记为read-only，仅仅复制页表，子进程根据页表读取内存中的数据写一个新的rdb文件替换旧的rdb文件，如果复制页表或写rdb文件时主进程执行写操作，会将内存中的原数据拷贝一个副本，修改并读取副本的数据。

RDB的缺点：执行间隔时间长，两次RDB之间写入数据有丢失的风险；fork子进程、压缩、写出RDB文件都比较耗时。

**1.2 AOF持久化**

**1.2.1 AOF原理**

AOF即追加文件。Redis处理的每一个写命令都会记录在AOF文件，可以看做是命令日志文件：

<img src="../assets/Redis笔记/media/image83.png" style="width:5.75in;height:1.27083in" />

**1.2.2 AOF配置**

AOF默认是关闭的，需要修改redis.conf配置文件开启AOF：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
# 是否开启AOF功能，默认是no<br />
appendonly yes<br />
# AOF文件的名称<br />
appendfilename "appendonly.aof"</td>
</tr>
</tbody>
</table>

AOF的命令记录的频率也可以通过redis.conf文件来配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
# 表示每执行一次写命令，立即记录到AOF文件<br />
appendfsync always<br />
# 写命令执行完先放入AOF缓冲区，然后表示每隔1秒将缓冲区数据写到AOF文件，是默认方案<br />
appendfsync everysec<br />
# 写命令执行完先放入AOF缓冲区，由操作系统决定何时将缓冲区内容写回磁盘，不建议<br />
appendfsync no</td>
</tr>
</tbody>
</table>

|          |              |                          |                              |
|----------|--------------|--------------------------|------------------------------|
| 配置项   | 刷盘时机     | 优点                     | 缺点                         |
| Always   | 同步刷盘     | 可靠性高，几乎不丢失数据 | 性能影响大                   |
| everysec | 每秒刷盘     | 性能适中                 | 最多丢失1秒数据              |
| no       | 操作系统控制 | 性能最好                 | 可靠性较差，可能丢失大量数据 |

**1.2.3 AOF文件重写**

因为AOF文件记录命令，往往比RDB文件大得多。对同一条数据的两次修改只有最后一条命令有效，但是会记录两次命令，通过bgrewriteaof命令可以对AOF文件进行重写，节省空间：

<img src="../assets/Redis笔记/media/image84.png" style="width:5.75in;height:0.40625in" />

Redis也会在触发阈值时自动去重写AOF文件，阈值可以在redis.conf中配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
# AOF文件比上次文件 增长超过多少百分比则触发重写<br />
auto-aof-rewrite-percentage 100<br />
# AOF文件体积最小多大以上才触发重写<br />
auto-aof-rewrite-min-size 64mb</td>
</tr>
</tbody>
</table>

**1.3 RDB与AOF对比**

RDB和AOF各有自己的优缺点，如果对数据安全性要求较高，在实际开发中往往会**结合**两者来使用。

|                    |                                              |                                                          |
|--------------------|----------------------------------------------|----------------------------------------------------------|
|                    | RDB                                          | AOF                                                      |
| **持久化方式**     | 定时对整个内存做快照                         | 记录每一次执行的命令                                     |
| **数据完整性**     | 不完整，两次备份之间会丢失                   | 相对完整，取决于刷盘策略                                 |
| **文件大小**       | 会有压缩，文件体积小                         | 记录命令，文件体积很大                                   |
| **宕机恢复速度**   | 很快                                         | 慢                                                       |
| **数据恢复优先级** | 低，因为数据完整性不如AOF                    | 高，因为数据完整性更高                                   |
| **系统资源占用**   | 高，大量CPU和内存消耗                        | 低，主要是磁盘IO资源，但AOF重写时会占用大量CPU和内存资源 |
| **使用场景**       | 可以容忍数分钟的数据丢失，追求更快的启动速度 | 对数据安全性要求较高要求                                 |

**2.Redis主从**

单节点Redis的并发能力是有上限的，要进一步提高Redis的并发能力，就需要搭建主从集群，实现读写分离。

<img src="../assets/Redis笔记/media/image85.png" style="width:5.75in;height:1.51042in" />

**2.1 Redis主从环境搭建**

以在同一台虚拟机开启多个Redis实例为例进行主从集群搭建：

|                 |      |        |
|-----------------|------|--------|
| IP              | PORT | 角色   |
| 192.168.150.101 | 7001 | master |
| 192.168.150.101 | 7002 | slave  |
| 192.168.150.101 | 7003 | slave  |

**2.1.1 准备实例和配置**

创建三个文件夹，名字分别叫7001、7002、7003：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入/tmp目录<br />
cd /tmp<br />
# 创建目录<br />
mkdir 7001 7002 7003</td>
</tr>
</tbody>
</table>

修改redis-6.2.4/redis.conf文件，将持久化模式改为RDB模式，关闭AOF模式：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
# 开启RDB<br />
# save ""<br />
save 3600 1<br />
save 300 100<br />
save 60 10000<br />
<br />
# 关闭AOF<br />
appendonly no</td>
</tr>
</tbody>
</table>

将redis-6.2.4/redis.conf文件拷贝到三个目录中（在/tmp下执行）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 方式一：逐个拷贝<br />
cp redis-6.2.4/redis.conf 7001<br />
cp redis-6.2.4/redis.conf 7002<br />
cp redis-6.2.4/redis.conf 7003<br />
<br />
# 方式二：管道组合命令，一键拷贝<br />
echo 7001 7002 7003 | xargs -t -n 1 cp redis-6.2.4/redis.conf</td>
</tr>
</tbody>
</table>

修改每个文件夹内的配置文件，将端口分别修改为7001、7002、7003，将rdb文件保存位置修改为自己所在目录（在/tmp下执行）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
sed -i -e 's/6379/7001/g' -e 's/dir .\//dir \/tmp\/7001\//g' 7001/redis.conf<br />
sed -i -e 's/6379/7002/g' -e 's/dir .\//dir \/tmp\/7002\//g' 7002/redis.conf<br />
sed -i -e 's/6379/7003/g' -e 's/dir .\//dir \/tmp\/7003\//g' 7003/redis.conf</td>
</tr>
</tbody>
</table>

在redis.conf文件中指定每一个实例的绑定ip信息（在/tmp下执行）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 逐一执行<br />
sed -i '1a replica-announce-ip 192.168.150.101' 7001/redis.conf<br />
sed -i '1a replica-announce-ip 192.168.150.101' 7002/redis.conf<br />
sed -i '1a replica-announce-ip 192.168.150.101' 7003/redis.conf<br />
<br />
# 或者一键修改<br />
printf '%s\n' 7001 7002 7003 | xargs -I{} -t sed -i '1a replica-announce-ip 192.168.150.101' {}/redis.conf</td>
</tr>
</tbody>
</table>

**2.1.2 启动Redis**

打开3个ssh窗口，分别启动3个redis实例：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 第1个<br />
redis-server 7001/redis.conf<br />
# 第2个<br />
redis-server 7002/redis.conf<br />
# 第3个<br />
redis-server 7003/redis.conf</td>
</tr>
</tbody>
</table>

运行以下命令可以一键停止（在/tmp下执行），当然，也可以在三个窗口中一个个停止：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
printf '%s\n' 7001 7002 7003 | xargs -I{} -t redis-cli -p {} shutdown</td>
</tr>
</tbody>
</table>

**2.1.3 开启主从关系**

现在三个实例还没有任何关系，要配置主从可以使用replicaof或者slaveof（5.0以前）命令。有临时和永久两种模式：

修改配置文件（永久生效）

在redis.conf中添加一行配置：slaveof \<masterip\> \<masterport\>

使用redis-cli客户端连接到redis服务，执行slaveof命令（重启后失效）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
slaveof &lt;masterip&gt; &lt;masterport&gt;<br />
masterauth master_password #若主节点有密码，必须配置此项，否则可以不配置</td>
</tr>
</tbody>
</table>

|                                                           |
|-----------------------------------------------------------|
| **注意**：在5.0以后新增命令replicaof，与salveof效果一致。 |

这里以临时修改为例开启主从关系：

通过redis-cli命令连接7002，执行下面命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 连接 7002<br />
redis-cli -p 7002<br />
# 执行slaveof<br />
slaveof 192.168.150.101 7001</td>
</tr>
</tbody>
</table>

通过redis-cli命令连接7003，执行下面命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 连接 7003<br />
redis-cli -p 7003<br />
# 执行slaveof<br />
slaveof 192.168.150.101 7001</td>
</tr>
</tbody>
</table>

然后连接 7001节点，查看集群状态（可选）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 连接 7001<br />
redis-cli -p 7001<br />
# 查看状态<br />
info replication</td>
</tr>
</tbody>
</table>

<img src="../assets/Redis笔记/media/image86.png" style="width:5.75in;height:0.88542in" />

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>注意</strong>：</p>
<p>如果主节点设置了密码，执行slaveof命令后还需要执行命令config set masterauth password指定password密码</p>
<p>如果是不同的主机进行搭建主从环境，只需要执行slaveof命令并指定密码即可，准备实例和配置可以略过</p></td>
</tr>
</tbody>
</table>

**2.1.4 测试**

分别在三个Redis的客户端运行命令set num 123和get num，最后可以看到，只有7001可以执行写操作，7002和7003只能执行读操作。

**2.2 主从数据同步原理**

**2.2.1 全量同步**

主从第一次建立连接时，会执行**全量同步**，将master节点的所有数据都拷贝给slave节点：

<img src="../assets/Redis笔记/media/image87.png" style="width:5.75in;height:2.17708in" />

第一次建立连接时，slave执行replicaof命令并建立连接，请求master进行数据同步，master判断是否是第一次同步，是第一次同步，返回master的数据版本信息，slave收到并保存版本信息，然后master执行bgsave命令生成RDB文件并发送RDB文件到slave，slave清空本地数据并加载收到的RDB文件，但是RDB期间可能有新的命令执行，master会记录这些命令缓存到repl_baklog中，RDB结束后master再发送repl_baklog中的命令给slave，slave在执行收到的命令，如果期间再有命令，还是缓存到repl_baklog，然后不断地发送执行，从而保证主从数据同步。

**Replication Id**：简称replid，是数据集的标记，id一致则说明是同一数据集。每一个master都有唯一的replid，slave则会继承master节点的replid

**offset**：偏移量，随着记录在repl_baklog中的数据增多而逐渐增大。slave完成同步时也会记录当前同步的offset。如果slave的offset小于master的offset，说明slave数据落后于master，需要更新。

slave做数据同步必须向master声明自己的replid和offset，master才可以判断是否是第一次同步、同步哪些数据：初始时slave有自己的replid和offset，建立连接时，master发现slave发送来的replid与自己的不一致，需要做全量同步，并将自己的replid和offset都发送给这个slave，slave保存这些信息，以后slave的replid就与master一致了。

<img src="../assets/Redis笔记/media/image88.png" style="width:5.75in;height:2.05208in" />

**2.2.2 增量同步**

全量同步是在master与slave第一次建立连接时执行的，其他情况、slave重启时都是进行的**增量同步**，所谓增量同步，即只更新slave与master存在差异的部分数据：

<img src="../assets/Redis笔记/media/image89.png" style="width:5.75in;height:1.66667in" />

当slave重启后，携带replid和offset向master请求数据同步，master判断请求的replid与自己的一致，则不是第一次，回复continue给slave，然后获取repl_baklog中offset偏移量之后的数据（命令）并发送给slave，slave执行收到的命令保证主从数据一致。

**2.2.3 repl_backlog原理**

repl_backlog是一个固定大小的环形数组，即角标到达数组末尾后，会再次从0开始读写。repl_baklog中会记录Redis处理过的命令日志及offset，包括master当前的offset，和slave已经拷贝到的offset：

<img src="../assets/Redis笔记/media/image90.png" style="width:5.75in;height:1.07292in" />

进行增量同步时，仅仅是拷贝slave偏移量和master偏移量有差别的部分（即红色区域），随着不断地拷贝，slave也在不断追赶master，即使数组已经满了进行覆盖旧数据，由于这部分旧数据已经被slave同步，所以并不会有影响。

但是，如果slave宕机时间太长，以至于master偏移量超过了slave偏移量（如下图），此时slave重启发现自己的slave偏移量已经没有了，无法进行增量同步，就只能进行**全量同步**。

<img src="../assets/Redis笔记/media/image91.png" style="width:5.75in;height:1.15625in" />

**总结**

全量同步执行场景：

主从第一次建立连接时

从节点宕机时间太长，导致repl_backlog中尚未同步的数据被覆盖，无法基于log做增量同步

增量同步执行场景：

主从第一次建立后，即全量同步后都执行增量同步

从节点宕机重启，且repl_backlog中没有尚未同步的数据

**2.3 主从同步优化**

如果主从集群规模比较大，这时进行数据同步就会比较麻烦，可以从如下方面进行优化：

在master配置文件中配置repl-diskless-sync yes启用无磁盘复制，避免全量同步时的磁盘IO，但要保证网络情况良好

Redis单节点上的内存占用不要太大，减少RDB导致的过多磁盘IO

适当提高master配置文件中repl_baklog的大小，发现slave宕机时尽快实现故障恢复，尽可能避免全量同步

限制一个master上的slave节点数量，如果实在是太多slave，则可以采用主-从-从链式结构，减少master压力

<img src="../assets/Redis笔记/media/image92.png" style="width:5.75in;height:1.42708in" />

**3.Redis哨兵**

Redis的哨兵机制用来实现主从集群的自动故障恢复：

**监控**：Sentinel 会不断检查master和slave是否按预期工作

**自动故障恢复**：如果master故障，Sentinel会将一个slave提升为master。当故障实例恢复后也以新的master为主

**通知**：Sentinel充当Redis客户端的服务发现来源，当集群发生故障转移时，会将最新信息推送给Redis的客户端

<img src="../assets/Redis笔记/media/image93.png" style="width:5.75in;height:1.69792in" />

**3.1 集群监控原理**

Sentinel是怎么判断Redis服务器是否发生故障？答案是基于**心跳机制**监测服务状态，每隔1秒向集群的每个实例发送ping命令：

主观下线：如果某Sentinel节点发现某实例未在规定时间响应，则认为该实例**主观下线**

客观下线：若超过指定数量（quorum）的sentinel都认为该实例主观下线，则该实例**客观下线**。quorum值最好超过Sentinel实例数量的一半

<img src="../assets/Redis笔记/media/image94.png" style="width:5.75in;height:1.40625in" />

**3.2 集群故障恢复原理**

Sentinel判断出master发生故障后，是怎么进行故障恢复的？

首先是选择一个新的slave作为master，选择机制如下：

首先判断slave节点与master节点断开时间长短，如果超过指定值down-after-milliseconds \* 10则会排除该slave节点

然后判断slave节点的slave-priority值，越小优先级越高，如果是0则永不参与选举

如果slave-prority一样，则判断slave节点的offset值，越大说明数据越新，优先级越高

最后是判断slave节点的运行id大小，越小优先级越高

选出一个新的master后，该如何实现切换：

sentinel给备选的slave1节点发送slaveof no one命令，让该节点成为master

sentinel给所有其它slave发送slaveof 192.168.150.101 7002（新master的IP和端口）命令，让这些slave成为新master的从节点，开始从新的master上同步数据

最后，sentinel将故障节点标记为slave（修改配置文件添加slaveof），当故障节点恢复后会自动成为新的master的slave节点

<img src="../assets/Redis笔记/media/image95.png" style="width:5.75in;height:1.60417in" />

**3.3 哨兵集群环境搭建**

三个sentinel实例信息如下：

|      |                 |       |
|------|-----------------|-------|
| 节点 | IP              | PORT  |
| s1   | 192.168.150.101 | 27001 |
| s2   | 192.168.150.101 | 27002 |
| s3   | 192.168.150.101 | 27003 |

**3.3.1 准备实例和配置**

创建三个文件夹，名字分别叫s1、s2、s3：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入/tmp目录<br />
cd /tmp<br />
# 创建目录<br />
mkdir s1 s2 s3</td>
</tr>
</tbody>
</table>

<img src="../assets/Redis笔记/media/image96.png" style="width:5.75in;height:0.85417in" />

在s1目录创建一个sentinel.conf文件，添加如下内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
# 当前sentinel实例的端口<br />
port 27001<br />
# 当前sentinel实例的IP<br />
sentinel announce-ip 192.168.150.101<br />
# 指定master信息：<br />
# mymaster: 主节点名称，任意写<br />
# 192.168.150.101 7001: master的IP和端口<br />
# 2: 选举master时的quorum值，2表示至少两个sentinel认为master下线才进行故障恢复<br />
sentinel monitor mymaster 192.168.150.101 7001 2<br />
# 判定master主观下线的超时时间，5000表示5秒内未ping通就认为master发生故障<br />
sentinel down-after-milliseconds mymaster 5000<br />
# 故障转移超时时间，60000表示60秒内未进行完故障转移重新进行<br />
sentinel failover-timeout mymaster 60000<br />
# 哨兵节点的工作目录<br />
dir "/tmp/s1"</td>
</tr>
</tbody>
</table>

然后将s1/sentinel.conf文件拷贝到s2、s3两个目录中（在/tmp下执行）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 方式一：逐个拷贝<br />
cp s1/sentinel.conf s2<br />
cp s1/sentinel.conf s3<br />
# 方式二：管道组合命令，一键拷贝<br />
echo s2 s3 | xargs -t -n 1 cp s1/sentinel.conf</td>
</tr>
</tbody>
</table>

修改s2、s3两个文件夹内的配置文件，将端口分别修改为27002、27003：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
sed -i -e 's/27001/27002/g' -e 's/s1/s2/g' s2/sentinel.conf<br />
sed -i -e 's/27001/27003/g' -e 's/s1/s3/g' s3/sentinel.conf</td>
</tr>
</tbody>
</table>

**3.3.2 启动Sentinel**

打开3个ssh窗口，分别启动3个redis实例（在/tmp下执行）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 第1个<br />
redis-sentinel s1/sentinel.conf<br />
# 第2个<br />
redis-sentinel s2/sentinel.conf<br />
# 第3个<br />
redis-sentinel s3/sentinel.conf</td>
</tr>
</tbody>
</table>

**3.3.3 测试**

尝试让master节点7001宕机，查看sentinel日志：

<img src="../assets/Redis笔记/media/image97.png" style="width:5.75in;height:2.84375in" />

查看7003的日志：

<img src="../assets/Redis笔记/media/image98.png" style="width:5.75in;height:2.46875in" />

查看7002的日志：

<img src="../assets/Redis笔记/media/image99.png" style="width:5.75in;height:1.9375in" />

**3.4 RedisTemplate**

在Sentinel集群监管下的Redis主从集群，其节点会因为自动故障转移而发生变化，Redis的客户端必须感知这种变化并及时更新连接信息。Spring的RedisTemplate底层利用lettuce实现了节点的感知和自动切换。

**导入Demo工程**：导入以下redis-demo项目到Idea中

**\[redis-demo.zip\]**

**引入依赖**：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**配置Redis地址**：在配置文件application.yml中指定redis的sentinel相关信息

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
redis:<br />
sentinel:<br />
master: mymaster<br />
nodes:<br />
- 192.168.150.101:27001<br />
- 192.168.150.101:27002<br />
- 192.168.150.101:27003</td>
</tr>
</tbody>
</table>

**配置读写分离**：在启动类中或新建一个配置类中添加一个新的bean

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Bean<br />
public LettuceClientConfigurationBuilderCustomizer clientConfigurationBuilderCustomizer(){<br />
return clientConfigurationBuilder -&gt; clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);<br />
}</td>
</tr>
</tbody>
</table>

ReadFrom是配置Redis的读取策略，是一个枚举：

MASTER：从主节点读取

MASTER_PREFERRED：优先从master节点读取，master不可用才读取replica

REPLICA：从slave（replica）节点读取

REPLICA \_PREFERRED：优先从slave（replica）节点读取，所有的slave都不可用才读取master

然后测试Controller中的接口并查看sentinel的控制台即可，最终可以发现即使master宕机也不会影响写操作。

**4.Redis分片集群**

分片集群就是由多个主从搭建的Redis集群模式，可以解决海量数据存储和高并发问题：

集群中有多个master，每个master保存不同数据

每个master都可以有多个slave节点

master之间通过ping监测彼此健康状态

客户端请求可以访问集群任意节点，最终都会被转发到正确节点

<img src="../assets/Redis笔记/media/image100.png" style="width:5.75in;height:1.95833in" />

**4.1 分片集群环境搭建**

每个Redis的信息如下：

|                 |      |        |
|-----------------|------|--------|
| IP              | PORT | 角色   |
| 192.168.150.101 | 7001 | master |
| 192.168.150.101 | 7002 | master |
| 192.168.150.101 | 7003 | master |
| 192.168.150.101 | 8001 | slave  |
| 192.168.150.101 | 8002 | slave  |
| 192.168.150.101 | 8003 | slave  |

**4.1.2 准备实例和配置**

删除之前的7001、7002、7003目录，重新创建出7001、7002、7003、8001、8002、8003目录：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入/tmp目录<br />
cd /tmp<br />
# 删除旧的，避免配置干扰<br />
rm -rf 7001 7002 7003<br />
# 创建目录<br />
mkdir 7001 7002 7003 8001 8002 8003</td>
</tr>
</tbody>
</table>

在/tmp下准备一个新的redis.conf文件，内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
port 6379<br />
# 开启集群功能<br />
cluster-enabled yes<br />
# 集群的配置文件名称，不需要我们创建，由redis自己维护<br />
cluster-config-file /tmp/6379/nodes.conf<br />
# 节点心跳失败的超时时间<br />
cluster-node-timeout 5000<br />
# 持久化文件存放目录<br />
dir /tmp/6379<br />
# 绑定地址<br />
bind 0.0.0.0<br />
# 让redis后台运行<br />
daemonize yes<br />
# 注册的实例ip<br />
replica-announce-ip 192.168.150.101<br />
# 保护模式<br />
protected-mode no<br />
# 数据库数量<br />
databases 1<br />
# 日志<br />
logfile /tmp/6379/run.log</td>
</tr>
</tbody>
</table>

将配置文件拷贝到每个目录下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入/tmp目录<br />
cd /tmp<br />
# 执行拷贝<br />
echo 7001 7002 7003 8001 8002 8003 | xargs -t -n 1 cp redis.conf</td>
</tr>
</tbody>
</table>

修改每个目录下的redis.conf，将其中的6379修改为与所在目录一致：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入/tmp目录<br />
cd /tmp<br />
# 修改配置文件<br />
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t sed -i 's/6379/{}/g' {}/redis.conf</td>
</tr>
</tbody>
</table>

**4.1.2 启动**

因为已经配置了后台启动模式，所以可以直接启动服务：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入/tmp目录<br />
cd /tmp<br />
# 一键启动所有服务<br />
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-server {}/redis.conf</td>
</tr>
</tbody>
</table>

通过ps查看状态：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
ps -ef | grep redis</td>
</tr>
</tbody>
</table>

发现服务都已经正常启动：

<img src="../assets/Redis笔记/media/image101.png" style="width:5.75in;height:0.80208in" />

如果要关闭所有进程，可以执行命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
ps -ef | grep redis | awk '{print $2}' | xargs kill</td>
</tr>
</tbody>
</table>

或者（推荐这种方式）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
printf '%s\n' 7001 7002 7003 8001 8002 8003 | xargs -I{} -t redis-cli -p {} shutdown</td>
</tr>
</tbody>
</table>

**4.1.3 创建集群**

现在每个Redis服务是相互独立的，没有任何关联，需要执行命令创建集群。

**Redis5.0之前**

Redis5.0之前集群命令都是用redis安装包下的src/redis-trib.rb来实现的。因为redis-trib.rb是由ruby语言编写的所以需要安装ruby环境：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 安装依赖<br />
yum -y install zlib ruby rubygems<br />
gem install redis</td>
</tr>
</tbody>
</table>

然后通过命令来管理集群：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 进入redis的src目录<br />
cd /tmp/redis-6.2.4/src<br />
# 创建集群<br />
./redis-trib.rb create --replicas 1 192.168.150.101:7001 192.168.150.101:7002 192.168.150.101:7003 192.168.150.101:8001 192.168.150.101:8002 192.168.150.101:8003</td>
</tr>
</tbody>
</table>

**Redis5.0以后**

Redis5.0以后集群管理已经集成到了redis-cli中，格式如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-cli --cluster create --cluster-replicas 1 192.168.150.101:7001 192.168.150.101:7002 192.168.150.101:7003 192.168.150.101:8001 192.168.150.101:8002 192.168.150.101:8003</td>
</tr>
</tbody>
</table>

**命令说明**

redis-cli --cluster或者./redis-trib.rb：代表集群操作命令

create：代表是创建集群

--replicas 1或者--cluster-replicas 1 ：指定集群中每个master的副本个数为1，此时节点总数 ÷ (replicas + 1) 得到的就是master的数量。因此节点列表中的前n个就是master，其它节点都是slave节点，随机分配到不同master

运行后的样子：

<img src="../assets/Redis笔记/media/image102.png" style="width:5.75in;height:2.33333in" />

这里输入yes，则集群开始创建：

<img src="../assets/Redis笔记/media/image103.png" style="width:5.75in;height:3.17708in" />

通过以下命令可以查看集群状态：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-cli -p 7001 cluster nodes</td>
</tr>
</tbody>
</table>

**4.1.4 测试**

尝试连接7001节点，存储一个数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 连接，这里一定要加-c选项表示是集群模式，否则会出错<br />
redis-cli -c -p 7001<br />
# 存储数据<br />
set num 123<br />
# 读取数据<br />
get num<br />
# 再次存储<br />
set a 1</td>
</tr>
</tbody>
</table>

**4.2 散列插槽**

Redis会把每一个master节点映射到0~16383共16384个插槽（hash slot）上，查看集群信息时就能看到：

<img src="../assets/Redis笔记/media/image104.png" style="width:5.75in;height:0.6875in" />

数据key不是与节点绑定，而是与插槽绑定。redis会根据key的**有效部分**计算插槽值：

key中包含"{}"，且“{}”中至少包含1个字符，“{}”中的部分是有效部分

key中不包含“{}”，整个key都是有效部分

例如key是num，那么就根据num计算，如果是{itcast}num，则根据itcast计算。计算方式是利用CRC16算法得到一个hash值，然后对16384取余，得到的结果就是slot值。

<img src="../assets/Redis笔记/media/image105.png" style="width:5.75in;height:0.58333in" />

*要想将一类数据固定的保存在同一个Redis实例，可以使它们的key都以{typeId}为前缀，从而保证key有效部分相同。*

**4.3 集群伸缩**

redis-cli --cluster提供了很多操作集群的命令，可以通过redis-cli --cluster help命令查看。

**4.3.1 需求分析**

向集群中添加一个新的master节点，并向其中存储 num = 10

启动一个新的redis实例，端口为7004

添加7004到之前的集群，并作为一个master节点

给7004节点分配插槽，使得num这个key可以存储到7004实例

**4.3.2 创建新的redis实例**

进入/tmp目录：cd /tmp

创建一个文件夹：mkdir 7004

拷贝配置文件：cp redis.conf /7004

修改配置文件：sed /s/6379/7004/g 7004/redis.conf

启动：redis-server 7004/redis.conf

**4.3.3 添加新节点到redis**

执行以下命令将7004添加到Redis集群：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-cli --cluster add-node 192.168.150.101:7004 192.168.150.101:7001</td>
</tr>
</tbody>
</table>

通过命令查看集群状态：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-cli -p 7001 cluster nodes</td>
</tr>
</tbody>
</table>

如图，7004加入了集群，并且默认是一个master节点：

<img src="../assets/Redis笔记/media/image106.png" style="width:5.75in;height:0.90625in" />

但是，7004节点的插槽数量为0，因此没有任何数据可以存储到7004上

**4.3.4 转移插槽**

通过get num命令可以看到num对应的插槽位置是2765：

<img src="../assets/Redis笔记/media/image107.png" style="width:5.75in;height:0.47917in" />

要想使num这个key存储到7004实例，可以将前3000个插槽从7001转移到7004，转移插槽的命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-cli --cluster reshard 192.168.150.101:7001</td>
</tr>
</tbody>
</table>

执行命令后，首先会询问要移动多少个插槽，输入3000即可：

<img src="../assets/Redis笔记/media/image108.png" style="width:5.75in;height:0.29167in" />

然后，会询问哪个节点接收这些插槽，需要输入节点ID，7004节点的ID在4.3.3中的日志就可以看到，拷贝到控制台即可：

<img src="../assets/Redis笔记/media/image109.png" style="width:5.75in;height:0.54167in" />

之后会询问插槽是从哪里移动过来的，这里要从7001获取，因此填写7001的ID：

all：代表全部，也就是三个节点各转移一部分

具体的id：目标节点的id

done：没有了

<img src="../assets/Redis笔记/media/image110.png" style="width:5.75in;height:1.01042in" />

最后会询问是否确认转移，输入yes就可以了。

通过以下命令查看结果：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-cli -p 7001 cluster node</td>
</tr>
</tbody>
</table>

<img src="../assets/Redis笔记/media/image111.png" style="width:5.75in;height:0.96875in" />

**4.4 故障转移**

**4.4.1 自动故障转移**

当集群中有一个master宕机时，会自动提升一个slave为master，即使master重新启动了，也会变成slave。

尝试让7002宕机：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
redis-cli -p 7002 shutdown</td>
</tr>
</tbody>
</table>

首先是该实例与其它实例失去连接

然后是疑似宕机：

<img src="../assets/Redis笔记/media/image112.png" style="width:5.75in;height:0.48958in" />

最后是确定下线，自动提升一个slave为新的master：

<img src="../assets/Redis笔记/media/image113.png" style="width:5.75in;height:0.51042in" />

当7002再次启动，就会变为一个slave节点：

<img src="../assets/Redis笔记/media/image114.png" style="width:5.75in;height:0.5625in" />

**4.4.2 手动故障转移**

如果需要更新或修复某个master节点，可以通过手动故障转移方式选一个slave代替这个master。

利用cluster failover命令可以手动让集群中的某个master宕机，切换到执行cluster failover命令的这个slave节点，实现无感知的数据迁移，具体流程如下：

<img src="../assets/Redis笔记/media/image115.png" style="width:5.75in;height:2.35417in" />

failover命令可以指定三种模式：

缺省：默认的流程，如图1~6歩

force：省略了对offset的一致性校验，直接从第4步开始

takeover：直接执行第5步，忽略数据一致性、忽略master状态和其它master的意见

在自动故障转移中，7002节点成为了slave，如果想要让7002节点重新成为master，与其同步的master就会成为slave，实现方式：

利用redis-cli -p 7002连接7002这个节点

执行cluster failover命令

**4.5 RedisTemplate访问分片集群**

RedisTemplate底层同样基于lettuce实现了分片集群的支持，而使用的步骤与哨兵模式基本一致：

**引入redis的starter依赖**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**配置分片集群地址**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
redis:<br />
cluster:<br />
nodes:<br />
- 192.168.150.101:7001<br />
- 192.168.150.101:7002<br />
- 192.168.150.101:7003<br />
- 192.168.150.101:8001<br />
- 192.168.150.101:8002<br />
- 192.168.150.101:8003</td>
</tr>
</tbody>
</table>

*由于分片集群自带故障恢复（故障转移），所以原来的哨兵集群配置删除也没有影响*

**配置读写分离**

在启动类中或新建一个配置类中添加一个新的bean：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Bean<br />
public LettuceClientConfigurationBuilderCustomizer clientConfigurationBuilderCustomizer(){<br />
return clientConfigurationBuilder -&gt; clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);<br />
}</td>
</tr>
</tbody>
</table>

可以看到，分片集群的使用和哨兵模式的差别仅仅在于集群地址的配置（yaml文件），其他一模一样。

**四、多级缓存**

传统的缓存策略是请求到达Tomcat后，先查Redis缓存，如果Redis缓存未命中则查数据库。如果Redis缓存失效会对数据库产生冲击，而且Tomcat也会成为整个系统的瓶颈。

多级缓存就是充分利用请求处理的每个环节，分别添加缓存，减轻Tomcat压力，提升服务性能：

<img src="../assets/Redis笔记/media/image116.png" style="width:5.75in;height:1.625in" />

浏览器访问静态资源时，优先读取浏览器本地缓存，访问非静态资源（Ajax查数据）时，访问服务器，当请求到达Nginx后，优先读取**Nginx本地缓存**，如果Nginx本地缓存未命中，则去查Redis缓存（不经过Tomcat），若Redis也没命中，则查Tomcat内的**JVM进程缓存**，如果JVM进程缓存也没命中，最后才查数据库。

在多级缓存架构中，Nginx内部需要编写本地缓存查询、Redis查询、Tomcat查询的业务逻辑，因此这样的nginx不再是一个反向代理服务器，而是一个编写**业务的Web服务器**，所以需要搭建Nginx集群，再由专门的Nginx反向代理。同理，Tomcat也需要搭建集群。最终的多级缓存架构如下：

<img src="../assets/Redis笔记/media/image117.png" style="width:5.75in;height:1.35417in" />

**1.JVM进程缓存**

**1.1 导入案例**

**1.1.1 安装MySQL**

为了方便后期配置MySQL，先准备两个目录，用于挂载容器的数据和配置文件目录：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
# 进入/tmp目录<br />
cd /tmp<br />
# 创建文件夹<br />
mkdir mysql<br />
# 进入mysql目录<br />
cd mysql</td>
</tr>
</tbody>
</table>

进入mysql目录后，执行以下Docker命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run \<br />
-p 3306:3306 \<br />
--name mysql \<br />
-v $PWD/conf:/etc/mysql/conf.d \<br />
-v $PWD/logs:/logs \<br />
-v $PWD/data:/var/lib/mysql \<br />
-e MYSQL_ROOT_PASSWORD=123 \<br />
--privileged \<br />
-d \<br />
mysql:5.7.25</td>
</tr>
</tbody>
</table>

在/tmp/mysql/conf目录添加一个my.cnf文件，作为mysql的配置文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
# 创建文件<br />
touch /tmp/mysql/conf/my.cnf</td>
</tr>
</tbody>
</table>

文件内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
[mysqld]<br />
skip-name-resolve<br />
character_set_server=utf8<br />
datadir=/var/lib/mysql<br />
server-id=1000</td>
</tr>
</tbody>
</table>

配置修改后，必须重启容器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker restart mysql</td>
</tr>
</tbody>
</table>

**1.1.2 导入SQL**

**\[item.sql\]**

使用MySQL工具连接上MySQL，运行上面提供的item.sql脚本文件，得到两张表：

tb_item：商品表，包含商品的基本信息

tb_item_stock：商品库存表，包含商品的库存信息

**1.1.3 导入Demo工程**

**\[item-service.zip\]**

导入上面的item-service项目到IDEA，最终项目结构如下：

<img src="../assets/Redis笔记/media/image118.png" style="width:5.75in;height:1.80208in" />

修改配置文件的MySQL信息为自己的数据库信息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
application:<br />
name: itemservice<br />
datasource:<br />
url: jdbc:mysql://127.0.0.1:3306/heima?useSSL=false<br />
username: root<br />
password: 123456<br />
driver-class-name: com.mysql.jdbc.Driver</td>
</tr>
</tbody>
</table>

启动服务，访问http://localhost:8081/item/10001即可查询数据。

**1.1.4 启动Nginx**

**\[nginx-1.18.1.zip\]**

将上面的nginx-1.18.1文件夹拷贝到一个不含中文和空格的目录下，双击nginx.exe运行。访问 http://localhost/item.html?id=10001就可以看到商品查询页面。

**1.2 初识Caffeine**

缓存可以分为两类：

分布式缓存，例如Redis：

优点：存储容量更大、可靠性更好、可以在集群间共享

缺点：访问缓存有网络开销

场景：缓存数据量较大、可靠性要求较高、需要在集群间共享

进程本地缓存，例如HashMap、GuavaCache：

优点：读取本地内存，没有网络开销，速度更快

缺点：存储容量有限、可靠性较低、无法共享

场景：性能要求较高，缓存数据量较小

**Caffeine**是基于Java8开发的，提供了近乎最佳命中率的高性能的本地缓存库，目前Spring内部的缓存使用的就是Caffeine。

Caffeine的Github网址：

**\[该类型的内容暂不支持下载\]**

Caffeine基本使用：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testBasicOps() {<br />
// 构建cache对象<br />
Cache&lt;String, String&gt; cache = Caffeine.newBuilder().build();<br />
// 存数据<br />
cache.put("gf", "迪丽热巴");<br />
// 取数据<br />
String gf = cache.getIfPresent("gf");<br />
System.out.println("gf = " + gf);<br />
// 取数据，包含两个参数：<br />
// 参数一：缓存的key<br />
// 参数二：Lambda表达式，表达式参数就是缓存的key，方法体是查询数据库的逻辑<br />
// 优先根据key查询JVM缓存，如果未命中，则执行参数二的Lambda表达式<br />
String defaultGF = cache.get("defaultGF", key -&gt; {<br />
// 根据key去数据库查询数据<br />
return "柳岩";<br />
});<br />
System.out.println("defaultGF = " + defaultGF);<br />
}</td>
</tr>
</tbody>
</table>

Caffeine有三种**缓存驱逐策略**，用于清除缓存，避免内存消耗：

基于容量：设置缓存的数量上限

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
// 创建缓存对象<br />
Cache&lt;String, String&gt; cache = Caffeine.newBuilder()<br />
.maximumSize(1) // 设置缓存大小上限为1<br />
.build();</td>
</tr>
</tbody>
</table>

基于时间：设置缓存的有效时间

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
// 创建缓存对象<br />
Cache&lt;String, String&gt; cache = Caffeine.newBuilder()<br />
// 设置缓存有效期为10秒，最后一次写入经过10秒未被访问就清除<br />
.expireAfterWrite(Duration.ofSeconds(10))<br />
.build();</td>
</tr>
</tbody>
</table>

基于引用：设置缓存为软引用或弱引用，利用GC来回收缓存数据。性能较差，不建议使用。

|                                                                                                                                                    |
|----------------------------------------------------------------------------------------------------------------------------------------------------|
| **注意**：在默认情况下，当一个缓存元素过期的时候，Caffeine不会自动立即将其清理和驱逐，而是在一次读或写操作后，或者在空闲时间完成对失效数据的驱逐。 |

**1.3 实现JVM进程缓存**

需求：

给根据id查询商品的业务添加缓存，缓存未命中时查询数据库

给根据id查询商品库存的业务添加缓存，缓存未命中时查询数据库

缓存初始大小为100

缓存上限为10000

在com.heima.item.config包下定义配置类CaffeineConfig，其中定义两个Caffeine缓存对象，分别保存商品、库存的缓存数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Configuration<br />
public class CaffeineConfig {<br />
@Bean<br />
public Cache&lt;Long, Item&gt; itemCache() {<br />
return Caffeine.newBuilder()<br />
.initialCapacity(100) //初始大小为100<br />
.maximumSize(10_000) //缓存上限为10000<br />
.build();<br />
}<br />
<br />
@Bean<br />
public Cache&lt;Long, ItemStock&gt; stockCache() {<br />
return Caffeine.newBuilder()<br />
.initialCapacity(100) //初始大小为100<br />
.maximumSize(10_000) //缓存上限为10000<br />
.build();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

修改ItemController类，添加缓存逻辑：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@RestController<br />
@RequestMapping("item")<br />
public class ItemController {<br />
@Autowired<br />
private Cache&lt;Long, Item&gt; itemCache;<br />
@Autowired<br />
private Cache&lt;Long, ItemStock&gt; stockCache;<br />
<br />
//...其它略<br />
<br />
@GetMapping("/{id}")<br />
public Item findById(@PathVariable("id") Long id) {<br />
return itemCache.get(id, key -&gt; itemService.query()<br />
.ne("status", 3).eq("id", key)<br />
.one()<br />
);<br />
}<br />
<br />
@GetMapping("/stock/{id}")<br />
public ItemStock findStockById(@PathVariable("id") Long id) {<br />
return stockCache.get(id, key -&gt; stockService.getById(key));<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.Lua语法入门**

Lua官网：

**\[该类型的内容暂不支持下载\]**

**2.1 HelloWorld**

CentOS7默认已经安装了Lua语言环境，所以可以直接运行Lua代码。

在Linux虚拟机的任意目录下新建一个hello.lua文件：touch hello.lua

使用vi/vim编辑hello.lua，添加如下内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
print("Hello World!")</td>
</tr>
</tbody>
</table>

执行指令运行hello.lua脚本：lua hello.lua

**2.2 变量和循环**

**2.2.1 Lua的数据类型**

<img src="../assets/Redis笔记/media/image119.png" style="width:5.75in;height:1.625in" />

可以通过type()函数判断数据类型，如print(type('Hello World'))输出结果为string

**2.2.2 声明变量**

Lua声明变量无需指定数据类型，而是用local来声明变量为局部变量：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 声明字符串，可以用单引号或双引号<br />
local str = 'hello'<br />
-- 字符串拼接使用 ..<br />
local str2 = 'hello' .. 'world'<br />
-- 声明数字<br />
local num = 21<br />
-- 声明布尔类型<br />
local flag = true</td>
</tr>
</tbody>
</table>

Lua中的table类型既可以作为数组，又可以作为Java中的Map来使用。数组就是特殊的table，只是key是数组角标而已：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 声明数组 ，key为角标的 table<br />
local arr = {'java', 'python', 'lua'}<br />
-- 声明table，类似java的map<br />
local map = {name='Jack', age=21}</td>
</tr>
</tbody>
</table>

Lua中的数组角标是从1开始，访问的时候与Java中类似：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 访问数组第一个元素，lua数组的角标从1开始<br />
print(arr[1])</td>
</tr>
</tbody>
</table>

Lua中的table可以用key来访问：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 访问table<br />
print(map['name'])<br />
print(map.name)</td>
</tr>
</tbody>
</table>

**2.2.3 循环**

对于table，可以利用for循环来遍历，不过数组和普通table遍历略有差异。

遍历数组：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 声明数组 key为索引的 table<br />
local arr = {'java', 'python', 'lua'}<br />
-- 遍历数组<br />
for index,value in ipairs(arr) do<br />
print(index, value)<br />
end</td>
</tr>
</tbody>
</table>

遍历普通table

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 声明map，也就是table<br />
local map = {name='Jack', age=21}<br />
-- 遍历table<br />
for key,value in pairs(map) do<br />
print(key, value)<br />
end</td>
</tr>
</tbody>
</table>

**2.3 条件控制、函数**

**2.3.1 函数**

定义函数语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
function 函数名(argument1, argument2..., argumentn)<br />
-- 函数体<br />
return 返回值<br />
end</td>
</tr>
</tbody>
</table>

例如，定义printArr函数打印数组：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
function printArr(arr)<br />
for index, value in ipairs(arr) do<br />
print(value)<br />
end<br />
end</td>
</tr>
</tbody>
</table>

**2.3.2 条件控制**

条件分支语句语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
if(布尔表达式) then<br />
--[ 布尔表达式为 true 时执行该语句块 --]<br />
else<br />
--[ 布尔表达式为 false 时执行该语句块 --]<br />
end</td>
</tr>
</tbody>
</table>

与JAVA不同的是，布尔表达式中的逻辑运算是基于英文单词：

<img src="../assets/Redis笔记/media/image120.png" style="width:5.75in;height:1.08333in" />

例如，自定义printArr函数打印table，当参数为nil时打印错误信息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
function printArr(arr)<br />
if not arr then<br />
print('数组不能为空！')<br />
return<br />
end<br />
for index, value in ipairs(arr) do<br />
print(value)<br />
end<br />
end</td>
</tr>
</tbody>
</table>

**3.实现多级缓存**

**3.1 安装OpenResty**

OpenResty是一个基于Nginx的高性能 Web 平台，用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。具备下列特点：

具备Nginx的完整功能

基于Lua语言进行扩展，集成了大量精良的 Lua 库、第三方模块

允许使用Lua**自定义业务逻辑**、**自定义库**

官方网站：

**\[该类型的内容暂不支持下载\]**

**3.1.1 安装**

安装OpenResty的依赖开发库，执行命令：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
yum install -y pcre-devel openssl-devel gcc --skip-broken</td>
</tr>
</tbody>
</table>

添加 openresty 仓库，便于未来安装或更新软件包（通过 yum check-update 命令）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
#如果yum-config-manager运行失败需要先执行这个指令<br />
yum install -y yum-utils<br />
<br />
yum-config-manager --add-repo https://openresty.org/package/centos/openresty.repo</td>
</tr>
</tbody>
</table>

安装openresty软件包：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
yum install -y openresty</td>
</tr>
</tbody>
</table>

安装OpenResty的管理工具opm，opm可以帮助我们安装一个第三方的Lua模块：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
yum install -y openresty-opm</td>
</tr>
</tbody>
</table>

默认情况下，OpenResty安装的目录是/usr/local/openresty，目录结构如下：

<img src="../assets/Redis笔记/media/image121.png" style="width:5.75in;height:1.92708in" />

通过nginx目录可以看到，OpenResty就是在Nginx基础上集成了一些Lua模块。

配置nginx的环境变量：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
# 打开配置文件<br />
vi /etc/profile<br />
<br />
# 在配置文件最下面添加如下内容<br />
# NGINX_HOME就是OpenResty安装目录下的nginx的目录<br />
export NGINX_HOME=/usr/local/openresty/nginx<br />
export PATH=${NGINX_HOME}/sbin:$PATH<br />
<br />
# 让配置生效<br />
source /etc/profile</td>
</tr>
</tbody>
</table>

**3.1.2 启动和运行**

OpenResty底层是基于Nginx的，查看OpenResty目录的nginx目录，结构与windows中安装的nginx基本一致：

<img src="../assets/Redis笔记/media/image122.png" style="width:5.75in;height:0.82292in" />

所以运行方式与nginx基本一致：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
# 启动nginx<br />
nginx<br />
# 重新加载配置<br />
nginx -s reload<br />
# 停止<br />
nginx -s stop</td>
</tr>
</tbody>
</table>

由于nginx的默认配置文件注释太多，影响后续编辑，这里将nginx.conf中的注释部分删除，保留有效部分。

修改/usr/local/openresty/nginx/conf/nginx.conf文件，内容如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
#user nobody;<br />
worker_processes 1;<br />
error_log logs/error.log;<br />
<br />
events {<br />
worker_connections 1024;<br />
}<br />
<br />
http {<br />
include mime.types;<br />
default_type application/octet-stream;<br />
sendfile on;<br />
keepalive_timeout 65;<br />
<br />
server {<br />
listen 8081;<br />
server_name localhost;<br />
location / {<br />
root html;<br />
index index.html index.htm;<br />
}<br />
error_page 500 502 503 504 /50x.html;<br />
location = /50x.html {<br />
root html;<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

在Linux的控制台输入命令以启动nginx：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
nginx</td>
</tr>
</tbody>
</table>

访问页面http://192.168.150.101:8081，注意ip地址替换为自己的虚拟机IP，就可以看到 Welcome to OpenResty! 页面。

**3.2 OpenResty快速入门**

在多级缓存架构中，Windows上的Nginx用来做反向代理服务，将前端的查询商品的Ajax请求代理到OpenResty集群，OpenResty集群用来编写多级缓存业务。

**3.2.1 反向代理流程**

访问商品查询页http://localhost/item.html?id=10001时，会发送一个GET请求http://localhost/api/item/10001，请求被Windows上的Nginx捕获，并反向代理给OpenResty集群，也就是缓存Nginx集群。

<img src="../assets/Redis笔记/media/image123.png" style="width:5.75in;height:1.46875in" />

我们需要在OpenResty中编写业务，查询商品数据（假数据）并返回到浏览器。

**3.2.2 OpenResty监听请求**

OpenResty的很多功能都依赖于其目录下的Lua库，需要在nginx.conf中指定依赖库的目录，并导入依赖：

添加对OpenResty的Lua模块的加载，修改/usr/local/openresty/nginx/conf/nginx.conf文件，在其中的http下面，添加下面代码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
#lua 模块<br />
lua_package_path "/usr/local/openresty/lualib/?.lua;;";<br />
#c模块<br />
lua_package_cpath "/usr/local/openresty/lualib/?.so;;";</td>
</tr>
</tbody>
</table>

监听/api/item路径，修改/usr/local/openresty/nginx/conf/nginx.conf文件，在nginx.conf的server下面，添加对/api/item这个路径的监听：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
location /api/item {<br />
# 默认的响应类型，这里相应的是JSON数据<br />
default_type application/json;<br />
# 响应结果由lua/item.lua文件来决定<br />
content_by_lua_file lua/item.lua;<br />
}</td>
</tr>
</tbody>
</table>

**3.2.3 编写item.lua**

在/usr/loca/openresty/nginx/lua文件夹下，新建item.lua文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
# 进入nginx目录<br />
cd /usr/local/openresty/nginx<br />
# 创建lua文件夹<br />
mkdir lua<br />
# 创建item.lua文件<br />
touch lua/item.lua</td>
</tr>
</tbody>
</table>

在item.lua中，利用ngx.say()函数返回数据到Response中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
ngx.say('{"id":10001,"name":"SALSA AIR","title":"RIMOWA 16寸托运箱拉杆箱 SALSA AIR系列果绿色 820.70.36.4","price":18900,"image":"https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp","category":"拉杆箱","brand":"RIMOWA","spec":"","status":1,"createTime":"2019-04-30T16:00:00.000+00:00","updateTime":"2019-04-30T16:00:00.000+00:00","stock":2999,"sold":31290}')</td>
</tr>
</tbody>
</table>

重新加载配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
nginx -s reload</td>
</tr>
</tbody>
</table>

刷新商品页面http://localhost/item.html?id=1001即可看到效果。

**3.3 请求参数处理**

**3.3.1 获取参数的API**

OpenResty中提供了一些API用来获取不同类型的前端请求参数：

<img src="../assets/Redis笔记/media/image124.png" style="width:5.75in;height:2.19792in" />

**3.3.2 获取参数并返回**

由于请求路径http://localhost/api/item/10001使用的路径参数获取商品数据，所以这里使用正则表达式获取ID。

修改/usr/loca/openresty/nginx/nginx.conf文件中监听/api/item的代码，利用正则表达式获取ID：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
# ~表示这是一个正则路径，()表示分组，\d表示任意数字，+表示至少一位数字<br />
location ~ /api/item/(\d+) {<br />
# 默认的响应类型<br />
default_type application/json;<br />
# 响应结果由lua/item.lua文件来决定<br />
content_by_lua_file lua/item.lua;<br />
}</td>
</tr>
</tbody>
</table>

修改/usr/loca/openresty/nginx/lua/item.lua文件，获取id并拼接到结果中返回：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 获取商品id<br />
local id = ngx.var[1]<br />
-- 拼接并返回<br />
ngx.say('{"id":' .. id .. ',"name":"SALSA AIR","title":"RIMOWA 21寸托运箱拉杆箱 SALSA AIR系列果绿色 820.70.36.4","price":17900,"image":"https://m.360buyimg.com/mobilecms/s720x720_jfs/t6934/364/1195375010/84676/e9f2c55f/597ece38N0ddcbc77.jpg!q70.jpg.webp","category":"拉杆箱","brand":"RIMOWA","spec":"","status":1,"createTime":"2019-04-30T16:00:00.000+00:00","updateTime":"2019-04-30T16:00:00.000+00:00","stock":2999,"sold":31290}')</td>
</tr>
</tbody>
</table>

运行命令以重新加载OpenResty配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
nginx -s reload</td>
</tr>
</tbody>
</table>

刷新页面通过调试工具可以看到结果中的ID随着路径的变化而变化。

**3.4 查询Tomcat**

此时lua脚本中的数据还是静态的，我们需要实现商品数据从Tomcat获取，再响应给前端：

<img src="../assets/Redis笔记/media/image125.png" style="width:5.75in;height:1.35417in" />

需要注意的是，Tomcat在Windows，而OpenResty在Linux，只需要将Linux上的IP最后一位变成1，前三位不变，就能得到Windows的IP，例如192.168.150.**101**对应到本地Windows就是192.168.150.**1**

**3.4.1 发送http请求的API**

nginx提供了内部API用以发送http请求：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
local resp = ngx.location.capture("/path",{<br />
method = ngx.HTTP_GET, -- 请求方式<br />
args = {a=1,b=2}, -- get方式传参数<br />
body = "c=3&amp;d=4" -- post方式传参数，get请求参数和post请求参数只能使用一个<br />
})</td>
</tr>
</tbody>
</table>

返回的响应内容包括：

resp.status：响应状态码

resp.header：响应头，是一个table

resp.body：响应体，就是响应数据

**注意**：这里的path是路径，并不包含IP和端口。这个请求会被nginx内部的server监听并处理，需要编写一个server用于反向代理这个路径到Tomcat：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
location /path {<br />
# 这里是windows电脑的ip和Java服务端口，需要确保windows防火墙处于关闭状态<br />
proxy_pass http://192.168.150.1:8081;<br />
}</td>
</tr>
</tbody>
</table>

<img src="../assets/Redis笔记/media/image126.png" style="width:5.75in;height:1.28125in" />

**3.4.2 封装http工具**

由于请求Tomcat经常使用，这里封装一个工具基于ngx.location.capture来实现查询tomcat。

因为item-service中的接口都是/item开头，所以需要监听/item路径代理到windows上的tomcat服务。修改/usr/local/openresty/nginx/conf/nginx.conf文件，添加一个location：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
location /item {<br />
proxy_pass http://192.168.150.1:8081; # 使用自己的Linux对应Windows上Tomcat的IP和端口<br />
}</td>
</tr>
</tbody>
</table>

在/usr/local/openresty/lualib目录下，新建一个common.lua文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
vi /usr/local/openresty/lualib/common.lua</td>
</tr>
</tbody>
</table>

在common.lua脚本中添加以下内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 封装函数，发送http请求，并解析响应<br />
local function read_http(path, params)<br />
local resp = ngx.location.capture(path,{<br />
method = ngx.HTTP_GET,<br />
args = params,<br />
})<br />
if not resp then<br />
-- 记录错误信息到/usr/local/openresty/nginx/logs/error.log，返回404<br />
ngx.log(ngx.ERR, "http请求查询失败, path: ", path , ", args: ", args)<br />
ngx.exit(404)<br />
end<br />
return resp.body<br />
end<br />
-- 将方法导出<br />
local _M = {<br />
read_http = read_http<br />
}<br />
return _M</td>
</tr>
</tbody>
</table>

*工具将read_http函数封装到_M这个table类型的read_http变量中，并且返回（类似于导出）。使用时可以利用require('common')导入该函数库，这里的common是函数库的文件名。*

修改/usr/loca/openresty/nginx/lua/item.lua文件，利用刚刚封装的函数库实现对tomcat的查询：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 引入自定义common工具模块，返回值是common中返回的 _M<br />
local common = require("common")<br />
-- 从 common中获取read_http这个函数<br />
local read_http = common.read_http<br />
-- 获取路径参数<br />
local id = ngx.var[1]<br />
-- 根据id查询商品<br />
local itemJSON = read_http("/item/" .. id, nil)<br />
-- 根据id查询商品库存<br />
local itemStockJSON = read_http("/item/stock/".. id, nil)</td>
</tr>
</tbody>
</table>

这里查询到商品JSON串和商品库存JSON串，需要将其转换成Lua的table并合并，然后将合并的table转为JSON返回。JSON的序列化和反序列化需要用到cjson工具。

**3.4.3 CJSON工具类**

cjson模块是OpenResty提供的用来处理JSON的序列化和反序列化的工具。官网地址：

**\[该类型的内容暂不支持下载\]**

**基本使用**

引入cjson模块：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
local cjson = require "cjson"</td>
</tr>
</tbody>
</table>

序列化：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
local obj = {<br />
name = 'jack',<br />
age = 21<br />
}<br />
-- 把 table 序列化为 json<br />
local json = cjson.encode(obj)</td>
</tr>
</tbody>
</table>

反序列化：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
local json = '{"name": "jack", "age": 21}'<br />
-- 反序列化 json为 table<br />
local obj = cjson.decode(json);<br />
print(obj.name)</td>
</tr>
</tbody>
</table>

**3.4.4 实现Tomcat查询**

修改之前的item.lua中的业务，添加json处理功能：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 导入common函数库<br />
local common = require('common')<br />
local read_http = common.read_http<br />
-- 导入cjson库<br />
local cjson = require('cjson')<br />
<br />
-- 获取路径参数<br />
local id = ngx.var[1]<br />
-- 根据id查询商品<br />
local itemJSON = read_http("/item/".. id, nil)<br />
-- 根据id查询商品库存<br />
local itemStockJSON = read_http("/item/stock/".. id, nil)<br />
<br />
-- JSON转化为lua的table<br />
local item = cjson.decode(itemJSON)<br />
local stock = cjson.decode(itemStockJSON)<br />
<br />
-- 组合数据<br />
item.stock = stock.stock<br />
item.sold = stock.sold<br />
<br />
-- 把item序列化为json 返回结果<br />
ngx.say(cjson.encode(item))</td>
</tr>
</tbody>
</table>

运行命令以重新加载OpenResty配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
nginx -s reload</td>
</tr>
</tbody>
</table>

**3.4.5 基于ID负载均衡**

在实际开发中，Tomcat使用的是集群模式，由于每一台JVM的进程缓存是独立的，使用默认的负载均衡规则也就是轮询模式时，第二次请求的Tomcat和第一次请求的Tomcat不相同，此时第一台JVM的进程缓存JVM2是没有的，就会查询数据库，进程缓存就会失效。

nginx提供了基于请求路径做负载均衡的算法，根据请求路径做hash运算，把得到的数值对tomcat服务的数量取余，余数是几，就访问第几个服务，实现负载均衡，这样每个路径多次访问就会到达同一台Tomcat。

**实现基于ID负载均衡**

定义tomcat集群，并设置基于路径做负载均衡（http下添加）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
upstream tomcat-cluster {<br />
hash $request_uri;<br />
server 192.168.150.1:8081;<br />
server 192.168.150.1:8082;<br />
}</td>
</tr>
</tbody>
</table>

修改对tomcat服务的反向代理，目标指向tomcat集群：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
location /item {<br />
proxy_pass http://tomcat-cluster;<br />
}</td>
</tr>
</tbody>
</table>

重新加载OpenResty

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
nginx -s reload</td>
</tr>
</tbody>
</table>

**测试**

复制Tomcat服务，并指定端口号为8082（参考实战篇一人一单）：

<img src="../assets/Redis笔记/media/image127.png" style="width:5.75in;height:2.08333in" />

同时启动两个tomcat并多次访问http://localhost/api/item/10001，可以看到只有8082第一次访问有查询数据库的SQL，后几次没有日志记录，说明请求到达8082并且缓存生效。

**3.5 Redis缓存预热**

Redis缓存会面临冷启动问题：

**冷启动**：服务刚刚启动时，Redis中并没有缓存，如果所有数据都在第一次查询时添加缓存，可能会给数据库带来较大压力。

**缓存预热**：在实际开发中，利用大数据统计用户访问的热点数据，在项目启动时将这些热点数据提前查询并保存到Redis中。

由于这里商品数据不大，所以我们缓存所有商品数据到Redis。

利用Docker安装Redis：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run --name redis -p 6379:6379 -d redis redis-server --appendonly yes</td>
</tr>
</tbody>
</table>

在item-service服务中引入Redis依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;<br />
&lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

配置Redis地址（设置为自己的虚拟机地址）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
spring:<br />
redis:<br />
host: 192.168.150.101</td>
</tr>
</tbody>
</table>

缓存预热需要在项目启动时完成，并且必须是拿到RedisTemplate之后。这里利用InitializingBean接口来实现，因为InitializingBean可以在对象被Spring创建并且成员变量全部注入后执行：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.item.config;<br />
<br />
@Component<br />
public class RedisHandler implements InitializingBean {<br />
@Autowired<br />
private StringRedisTemplate redisTemplate;<br />
@Autowired<br />
private IItemService itemService;<br />
@Autowired<br />
private IItemStockService stockService;<br />
<br />
private static final ObjectMapper MAPPER = new ObjectMapper();<br />
<br />
@Override<br />
public void afterPropertiesSet() throws Exception {<br />
// 初始化缓存<br />
// 1.查询商品信息<br />
List&lt;Item&gt; itemList = itemService.list();<br />
// 2.放入缓存<br />
for (Item item : itemList) {<br />
// 2.1.item序列化为JSON<br />
String json = MAPPER.writeValueAsString(item);<br />
// 2.2.存入redis<br />
redisTemplate.opsForValue().set("item:id:" + item.getId(), json);<br />
}<br />
<br />
// 3.查询商品库存信息<br />
List&lt;ItemStock&gt; stockList = stockService.list();<br />
// 4.放入缓存<br />
for (ItemStock stock : stockList) {<br />
// 2.1.item序列化为JSON<br />
String json = MAPPER.writeValueAsString(stock);<br />
// 2.2.存入redis<br />
redisTemplate.opsForValue().set("item:stock:id:" + stock.getId(), json);<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**3.6 查询Redis缓存**

Redis缓存已经有了，接下来是在OpenResty中实现查询Redis的逻辑，如果Redis缓存命中，就响应Redis中的数据，否则查询Tomcat。

**3.6.1 封装Redis工具**

OpenResty已经提供了操作Redis的模块，就是/usr/local/openresty/lualib/resty/redis.lua，只需要导入使用即可。

为了方便，我们将Redis操作封装到之前的common.lua文件中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 导入redis模块<br />
local redis = require('resty.redis')<br />
-- 初始化redis对象<br />
local red = redis:new()<br />
-- 第一个参数是连接超时时间，第二个参数是发送命令超时时间，第三个参数是接受响应结果超时时间，这里都是1秒<br />
red:set_timeouts(1000, 1000, 1000)<br />
<br />
-- 关闭redis连接的工具方法，其实是放入连接池<br />
local function close_redis(red)<br />
local pool_max_idle_time = 10000 -- 连接的空闲时间，单位是毫秒<br />
local pool_size = 100 --连接池大小<br />
local ok, err = red:set_keepalive(pool_max_idle_time, pool_size)<br />
if not ok then<br />
ngx.log(ngx.ERR, "放入redis连接池失败: ", err)<br />
end<br />
end<br />
<br />
-- 查询redis的方法 ip和port是redis地址，key是查询的key<br />
local function read_redis(ip, port, key)<br />
-- 获取一个连接<br />
local ok, err = red:connect(ip, port)<br />
if not ok then<br />
ngx.log(ngx.ERR, "连接redis失败 : ", err)<br />
return nil<br />
end<br />
-- 查询redis<br />
local resp, err = red:get(key)<br />
-- 查询失败处理<br />
if not resp then<br />
ngx.log(ngx.ERR, "查询Redis失败: ", err, ", key = " , key)<br />
end<br />
--得到的数据为空处理<br />
if resp == ngx.null then<br />
resp = nil<br />
ngx.log(ngx.ERR, "查询Redis数据为空, key = ", key)<br />
end<br />
close_redis(red)<br />
return resp<br />
<br />
end<br />
<br />
-- 封装函数，发送http请求，并解析响应<br />
local function read_http(path, params)<br />
local resp = ngx.location.capture(path,{<br />
method = ngx.HTTP_GET,<br />
args = params,<br />
})<br />
if not resp then<br />
-- 记录错误信息，返回404<br />
ngx.log(ngx.ERR, "http查询失败, path: ", path , ", args: ", args)<br />
ngx.exit(404)<br />
end<br />
return resp.body<br />
end<br />
-- 将方法导出<br />
local _M = {<br />
read_http = read_http,<br />
read_redis = read_redis<br />
}<br />
return _M</td>
</tr>
</tbody>
</table>

**3.6.2 实现Redis查询**

修改/usr/loca/openresty/nginx/lua/item.lua文件，添加查询Redis逻辑，如果Redis查询失败，再查询Tomcat：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 导入common函数库<br />
local common = require('common')<br />
local read_http = common.read_http<br />
local read_redis = common.read_redis<br />
-- 导入cjson库<br />
local cjson = require('cjson')<br />
<br />
-- 封装查询函数<br />
function read_data(key, path, params)<br />
-- 查询本地缓存<br />
local val = read_redis("127.0.0.1", 6379, key)<br />
-- 判断查询结果<br />
if not val then<br />
ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)<br />
-- redis查询失败，去查询http<br />
val = read_http(path, params)<br />
end<br />
-- 返回数据<br />
return val<br />
end<br />
<br />
-- 获取路径参数<br />
local id = ngx.var[1]<br />
<br />
-- 查询商品信息<br />
local itemJSON = read_data("item:id:" .. id, "/item/" .. id, nil)<br />
-- 查询库存信息<br />
local stockJSON = read_data("item:stock:id:" .. id, "/item/stock/" .. id, nil)<br />
<br />
-- JSON转化为lua的table<br />
local item = cjson.decode(itemJSON)<br />
local stock = cjson.decode(stockJSON)<br />
-- 组合数据<br />
item.stock = stock.stock<br />
item.sold = stock.sold<br />
<br />
-- 把item序列化为json 返回结果<br />
ngx.say(cjson.encode(item))</td>
</tr>
</tbody>
</table>

重新加载OpenResty：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
nginx -s reload</td>
</tr>
</tbody>
</table>

**3.7 Nginx本地缓存**

现在已经实现了Redis缓存、JVM缓存，还差Nginx本地缓存。当接收到请求时，优先查询Nginx本地缓存，未命中再查询Redis缓存，最后才是JVM缓存。

**3.7.1 本地缓存API**

OpenResty为Nginx提供了**shard dict**的功能，可以在nginx的多个worker之间共享数据，实现缓存功能。

开启共享字典，在nginx.conf的http下添加配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Nginx<br />
# 共享字典，也就是本地缓存，名称叫做：item_cache，大小150MB<br />
# 当然，缓存名称和大小可以自行设置，如local_cache 200m<br />
lua_shared_dict item_cache 150m;</td>
</tr>
</tbody>
</table>

操作共享字典：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 获取本地缓存对象<br />
local item_cache = ngx.shared.item_cache<br />
-- 存储, 指定key、value、过期时间(单位s)，默认为0代表永不过期<br />
item_cache:set('key', 'value', 1000)<br />
-- 读取<br />
local val = item_cache:get('key')</td>
</tr>
</tbody>
</table>

**3.7.2 实现本地缓存查询**

修改/usr/loca/openresty/nginx/lua/item.lua文件，添加本地缓存逻辑：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Lua<br />
-- 导入common函数库<br />
local common = require('common')<br />
local read_http = common.read_http<br />
local read_redis = common.read_redis<br />
-- 导入cjson库<br />
local cjson = require('cjson')<br />
-- 导入共享词典，本地缓存<br />
local item_cache = ngx.shared.item_cache<br />
<br />
-- 封装查询函数<br />
function read_data(key, expire, path, params)<br />
-- 查询本地缓存<br />
local val = item_cache:get(key)<br />
if not val then<br />
ngx.log(ngx.ERR, "本地缓存查询失败，尝试查询Redis， key: ", key)<br />
-- 查询redis<br />
val = read_redis("127.0.0.1", 6379, key)<br />
-- 判断查询结果<br />
if not val then<br />
ngx.log(ngx.ERR, "redis查询失败，尝试查询http， key: ", key)<br />
-- redis查询失败，去查询http<br />
val = read_http(path, params)<br />
end<br />
end<br />
-- 查询成功，把数据写入本地缓存，并指定超时时间<br />
item_cache:set(key, val, expire)<br />
-- 返回数据<br />
return val<br />
end<br />
<br />
-- 获取路径参数<br />
local id = ngx.var[1]<br />
<br />
-- 查询商品信息，设置缓存超时时间为30分钟<br />
local itemJSON = read_data("item:id:" .. id, 1800, "/item/" .. id, nil)<br />
-- 查询库存信息，设置缓存超时时间为1分钟<br />
local stockJSON = read_data("item:stock:id:" .. id, 60, "/item/stock/" .. id, nil)<br />
<br />
-- JSON转化为lua的table<br />
local item = cjson.decode(itemJSON)<br />
local stock = cjson.decode(stockJSON)<br />
-- 组合数据<br />
item.stock = stock.stock<br />
item.sold = stock.sold<br />
<br />
-- 把item序列化为json 返回结果<br />
ngx.say(cjson.encode(item))</td>
</tr>
</tbody>
</table>

重新加载OpenResty：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
nginx -s reload</td>
</tr>
</tbody>
</table>

**3.8 缓存同步**

**3.8.1 数据同步策略**

缓存同步就是要保证缓存中的数据和数据库的数据保持一致，缓存数据同步常见的方式有三种：

**设置有效期**：给缓存设置有效期，到期后自动删除，再次查询时更新

优势：简单、方便

缺点：时效性差，缓存过期之前可能不一致

场景：更新频率较低，时效性要求低的业务

**同步双写**：在修改数据库的同时，直接修改缓存

优势：时效性强，缓存与数据库强一致

缺点：有代码侵入，耦合度高

场景：对一致性、时效性要求较高的缓存数据

**异步通知**：修改数据库时发送事件通知，相关服务监听到通知后修改缓存数据

优势：低耦合，可以同时通知多个缓存服务

缺点：时效性一般，可能存在中间不一致状态

场景：时效性要求一般，有多个服务需要同步

异步实现又可以基于消息队列（MQ）或者Canal来实现：

**基于MQ的异步通知**：业务完成对数据的修改后，发送一条消息到MQ中，缓存服务监听MQ消息，然后更新缓存，但是这种方式仍然有少量代码入侵

<img src="../assets/Redis笔记/media/image128.png" style="width:5.75in;height:1.64583in" />

**基于Canal的通知**：业务完成对数据的修改后直接结束，Canal监听MySQL变化，当发现MySQL变化后，立即通知缓存服务，缓存服务进行缓存更新，这种方式实现了代码零入侵

<img src="../assets/Redis笔记/media/image129.png" style="width:5.75in;height:1.52083in" />

**3.8.2 Canal工作原理**

Canal是阿里巴巴旗下的一款开源项目，基于Java开发。基于数据库增量日志解析，提供增量数据订阅和消费。

Canal的Github网址：

**\[该类型的内容暂不支持下载\]**

Canal是基于MySQL的主从同步来实现的，MySQL主从同步的原理如下：

<img src="../assets/Redis笔记/media/image130.png" style="width:5.75in;height:1.84375in" />

MySQL master 将数据变更写入二进制日志（binary log），其中记录的数据叫做binary log events，MySQL slave 将 master 的 binary log events拷贝到它的中继日志（relay log），然后重放 relay log 中事件，将数据变更反映它自己的数据。

Canal就是把自己伪装成MySQL的一个slave节点，从而监听master的binary log变化，再把得到的变化信息通知给Canal的客户端，进而完成对其它数据库的同步。

**3.8.3 安装Canal**

**开启MySQL主从**

打开自己的MySQL容器挂载的日志文件（以/tmp/mysql/conf为例）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
cd /tmp/mysql/conf</td>
</tr>
</tbody>
</table>

修改文件：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
vi /tmp/mysql/conf/my.cnf</td>
</tr>
</tbody>
</table>

在文件最后添加内容：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Properties<br />
log-bin=/var/lib/mysql/mysql-bin<br />
binlog-do-db=heima</td>
</tr>
</tbody>
</table>

log-bin=/var/lib/mysql/mysql-bin：设置binary log文件的存放地址和文件名，叫做mysql-bin

binlog-do-db=heima：指定对哪个database记录binary log events，这里记录heima这个库

在MySQL图形化工具（如DataGrip）运行以下命令，添加一个仅用于数据同步的账户，仅提供对heima这个库的操作权限：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
CREATE USER canal@'%' IDENTIFIED by 'canal';<br />
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT,SUPER ON *.* TO 'canal'@'%' identified by 'canal';<br />
FLUSH PRIVILEGES;</td>
</tr>
</tbody>
</table>

重启MySQL容器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker restart mysql</td>
</tr>
</tbody>
</table>

在MySQL图形化工具运行如下命令，测试设置是否成功（是否查到结果）：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>SQL<br />
show master status;</td>
</tr>
</tbody>
</table>

**安装Canal**

创建一个网络，将MySQL、Canal、MQ放到同一个Docker网络中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker network create heima</td>
</tr>
</tbody>
</table>

让MySQL加入这个网络：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker network connect heima mysql</td>
</tr>
</tbody>
</table>

复制资料中的canal.tar到虚拟机，然后通过如下命令导入：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker load -i canal.tar</td>
</tr>
</tbody>
</table>

运行命令创建Canal容器：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
docker run -p 11111:11111 --name canal \<br />
-e canal.destinations=heima \<br />
-e canal.instance.master.address=mysql:3306 \<br />
-e canal.instance.dbUsername=canal \<br />
-e canal.instance.dbPassword=canal \<br />
-e canal.instance.connectionCharset=UTF-8 \<br />
-e canal.instance.tsdb.enable=true \<br />
-e canal.instance.gtidon=false \<br />
-e canal.instance.filter.regex=heima\\..* \<br />
--network heima \<br />
-d canal/canal-server:v1.1.5</td>
</tr>
</tbody>
</table>

-p 11111:11111：这是canal的默认监听端口

-e canal.instance.master.address=mysql:3306：数据库地址和端口，如果不知道mysql容器地址，可以通过docker inspect 容器id来查看

-e canal.instance.dbUsername=canal：数据库用户名

-e canal.instance.dbPassword=canal ：数据库密码

-e canal.instance.filter.regex=：要监听的表名称

监听表名称的语法：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>PowerShell<br />
mysql 数据解析关注的表，Perl正则表达式.<br />
多个正则之间以逗号(,)分隔，转义符需要双斜杠(\\)<br />
常见例子：<br />
1. 所有表：.* or .*\\..*<br />
2. canal schema下所有表： canal\\..*<br />
3. canal下的以canal打头的表：canal\\.canal.*<br />
4. canal schema下的一张表：canal.test1<br />
5. 多个规则组合使用然后以逗号隔开：canal\\..*,mysql.test1,mysql.test2</td>
</tr>
</tbody>
</table>

**3.8.4 监听Canal**

Canal提供了各种语言的客户端，当Canal监听到binlog变化时，会通知Canal的客户端，这里使用Java客户端：

<img src="../assets/Redis笔记/media/image131.png" style="width:5.75in;height:1.38542in" />

我们使用Github上的第三方客户端canal-starter，它与SpringBoot完美整合，自动装配，比官方客户端简单好用。

canal-starter的Github地址：

**\[该类型的内容暂不支持下载\]**

引入依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;top.javatool&lt;/groupId&gt;<br />
&lt;artifactId&gt;canal-spring-boot-starter&lt;/artifactId&gt;<br />
&lt;version&gt;1.2.1-RELEASE&lt;/version&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

编写配置：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>YAML<br />
canal:<br />
destination: heima # canal的集群名字，要与安装canal时设置的名称一致<br />
server: 192.168.150.101:11111 # canal服务地址，使用自己的虚拟机地址</td>
</tr>
</tbody>
</table>

修改Item实体类，通过@Id、@Column、@Transient注解完成Item与数据库表字段的映射：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.item.pojo;<br />
<br />
import org.springframework.data.annotation.Id;<br />
import org.springframework.data.annotation.Transient;<br />
<br />
@Data<br />
@TableName("tb_item")<br />
public class Item {<br />
@TableId(type = IdType.AUTO)<br />
@Id<br />
private Long id;//商品id<br />
@Column(name = "name")<br />
private String name;//商品名称<br />
private String title;//商品标题<br />
private Long price;//价格（分）<br />
private String image;//商品图片<br />
private String category;//分类名称<br />
private String brand;//品牌名称<br />
private String spec;//规格<br />
private Integer status;//商品状态 1-正常，2-下架<br />
private Date createTime;//创建时间<br />
private Date updateTime;//更新时间<br />
@TableField(exist = false)<br />
@Transient<br />
private Integer stock;<br />
@TableField(exist = false)<br />
@Transient<br />
private Integer sold;<br />
}</td>
</tr>
</tbody>
</table>

@Id：标记表中的id字段

@Column(name = "name")：标记表中与属性名不一致的字段，当然，这里可以不添加

@Transient：标记不属于表中的字段

通过实现EntryHandler\<T\>接口编写监听器，监听Canal消息：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.item.canal;<br />
<br />
import com.github.benmanes.caffeine.cache.Cache;<br />
<br />
@CanalTable("tb_item")<br />
@Component<br />
public class ItemHandler implements EntryHandler&lt;Item&gt; {<br />
@Autowired<br />
private RedisHandler redisHandler;<br />
@Autowired<br />
private Cache&lt;Long, Item&gt; itemCache;<br />
<br />
@Override<br />
public void insert(Item item) {<br />
// 写数据到JVM进程缓存<br />
itemCache.put(item.getId(), item);<br />
// 写数据到redis<br />
redisHandler.saveItem(item);<br />
}<br />
<br />
@Override<br />
public void update(Item before, Item after) {<br />
// 写数据到JVM进程缓存<br />
itemCache.put(after.getId(), after);<br />
// 写数据到redis<br />
redisHandler.saveItem(after);<br />
}<br />
<br />
@Override<br />
public void delete(Item item) {<br />
// 删除数据到JVM进程缓存<br />
itemCache.invalidate(item.getId());<br />
// 删除数据到redis<br />
redisHandler.deleteItemById(item.getId());<br />
}<br />
}</td>
</tr>
</tbody>
</table>

@CanalTable("tb_item")用于指定要监听的表

EntryHandler\<Item\>的泛型指定表关联的实体类

insert、update、delete方法分别监听数据库表的增、删、改的消息

这里对Redis的操作都封装到了RedisHandler这个类中：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.item.config;<br />
<br />
@Component<br />
public class RedisHandler implements InitializingBean {<br />
@Autowired<br />
private StringRedisTemplate redisTemplate;<br />
@Autowired<br />
private IItemService itemService;<br />
@Autowired<br />
private IItemStockService stockService;<br />
<br />
private static final ObjectMapper MAPPER = new ObjectMapper();<br />
<br />
@Override<br />
public void afterPropertiesSet() throws Exception {<br />
// 初始化缓存<br />
// 1.查询商品信息<br />
List&lt;Item&gt; itemList = itemService.list();<br />
// 2.放入缓存<br />
for (Item item : itemList) {<br />
// 2.1.item序列化为JSON<br />
String json = MAPPER.writeValueAsString(item);<br />
// 2.2.存入redis<br />
redisTemplate.opsForValue().set("item:id:" + item.getId(), json);<br />
}<br />
<br />
// 3.查询商品库存信息<br />
List&lt;ItemStock&gt; stockList = stockService.list();<br />
// 4.放入缓存<br />
for (ItemStock stock : stockList) {<br />
// 2.1.item序列化为JSON<br />
String json = MAPPER.writeValueAsString(stock);<br />
// 2.2.存入redis<br />
redisTemplate.opsForValue().set("item:stock:id:" + stock.getId(), json);<br />
}<br />
}<br />
<br />
public void saveItem(Item item) {<br />
try {<br />
String json = MAPPER.writeValueAsString(item);<br />
redisTemplate.opsForValue().set("item:id:" + item.getId(), json);<br />
} catch (JsonProcessingException e) {<br />
throw new RuntimeException(e);<br />
}<br />
}<br />
<br />
<br />
public void deleteItemById(Long id) {<br />
redisTemplate.delete("item:id:" + id);<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**测试**

启动8081服务，访问http://localhost:8081/，修改某个商品的信息并查看Redis，会发现Redis及时更新数据。

**五、Redis最佳实践**

**1.Redis键值设置**

**1.1 优雅的key结构**

Redis的Key虽然可以自定义，但最好遵循以下约定：

遵循基本格式：\[业务名称\]:\[数据名\]:\[id\]

长度不超过44字节

不包含特殊字符

例如登录业务（login），保存用户信息（user），其key就可以设计为login:user:10。这样设计有以下几点好处：

可读性强

避免key冲突

方便管理

更节省内存

key的本质是字符串，会被存储在字典结构，每个key对应字典结构中的一个键值对节点，所以key底层编码包含int、embstr和raw三种：

embstr在小于44字节使用，采用连续内存空间，内存占用更小；

当字节数大于44字节时，会转为raw模式存储，在raw模式下，内存空间不是连续的，而是采用一个指针指向了另外一段内存空间，在这段空间里存储SDS内容，这样空间不连续，访问的时候性能也就会收到影响，还有可能产生内存碎片。

由于string类型的key-value结构类似键值对节点，所以可以用string类型模拟不同的编码，需要的命令：

TYPE key：查询指定key的数据类型

OBJECT ENCODING key：查看指定key对应的底层编码方式

**1.2 BigKey**

BigKey通常以Key的大小和Key中成员的数量来综合判定，判断标准（不唯一）：

Key本身的数据量过大：一个String类型的Key，它的值为5 MB

Key中的成员数过多：一个ZSET类型的Key，它的成员数量为10,000个

Key中成员的数据量过大：一个Hash类型的Key，成员数量虽然只有1,000个但这些成员的Value（值）总大小为100 MB

寻找BigKey需要用到如下几个命令：

MEMORY USAGE key：查询指定key及其对应的值在Redis中**实际占用的内存字节数**（不是简单的key和值所占字节数之和）

STRLEN key：只适用于string类型，查询key对应的**value的字节长度**（不包含key本身的字节）

LLEN key：只适用于list类型，查询列表中的**元素个数**（即列表长度），key不存在返回0

|                                                                   |
|-------------------------------------------------------------------|
| **建议**：单个key的value小于10KB，集合类型的key元素数量小于1000。 |

*由于MEMORY USAGE key对CPU使用率比较高，所以不建议使用*

BigKey带来的危害：

网络阻塞：对BigKey执行读请求时，少量的QPS就可能导致带宽使用率被占满，导致Redis实例，乃至所在物理机变慢

数据倾斜：BigKey所在的Redis实例内存使用率远超其他实例，无法使数据分片的内存资源达到均衡

Redis阻塞：对元素较多的hash、list、zset等做运算会耗时较旧，使主线程被阻塞

CPU压力：对BigKey的数据序列化和反序列化会导致CPU的使用率飙升，影响Redis实例和本机其它应用

目前有四种方式可以发现BigKey：redis-cli --bigkeys、scan扫描、第三方工具、网络监控。

*QPS：每秒查询率，是衡量系统每秒能处理请求次数的核心指标，直接反映 Redis 等数据库或缓存的吞吐量与性能上限*

**1.2.1 redis-cli --bigkeys**

利用redis-cli提供的--bigkeys参数可以遍历分析所有key，并返回Key的整体统计信息与每个类型数据的Top1的big key。

命令：redis-cli -a 密码 --bigkeys

<img src="../assets/Redis笔记/media/image132.png" style="width:5.75in;height:1.52083in" />

**说明**：这种方式仅仅能统计每个类型数据占用内存最大的key，但这个key不一定是BigKey

**1.2.2 scan扫描**

Redis提供了SCAN命令用于迭代遍历数据库中所有key，命令格式：SCAN cursor \[MATCH pattern\] \[COUNT count\] \[TYPE type\]

cursor：迭代游标，用于标记迭代位置，首次调用必须传入0开启新的迭代，后续调用使用上一次返回的游标值，直到返回游标为0表示迭代结束

MATCH pattern：可选，用于过滤key的匹配模式，支持通配符，如\*匹配任意字符，?匹配单个字符

COUNT count：可选，提示Redis每次迭代应返回的大约数量（非精确值），默认为10

TYPE type：可选，Redis6.0+支持，只返回指定类型的key，如string、hash、list

SCAN命令会返回两个元素，第一个是下一次迭代的光标，第二个是List，存放一个匹配的key的数组。

我们可以自己编程，利用SCAN扫描Redis中的所有key，利用strlen、hlen等命令判断key的长度：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.item.test;<br />
<br />
import com.heima.jedis.util.JedisConnectionFactory;<br />
import org.junit.jupiter.api.AfterEach;<br />
import org.junit.jupiter.api.BeforeEach;<br />
import org.junit.jupiter.api.Test;<br />
import redis.clients.jedis.Jedis;<br />
import redis.clients.jedis.ScanResult;<br />
import java.util.List;<br />
<br />
public class JedisTest {<br />
private Jedis jedis;<br />
<br />
@BeforeEach<br />
void setUp() {<br />
// 1.建立连接<br />
jedis = JedisConnectionFactory.getJedis();<br />
// 2.设置密码，如果没有密码不需要设置<br />
jedis.auth("123321");<br />
// 3.选择库<br />
jedis.select(0);<br />
}<br />
<br />
//string类型的阈值长度，单位：字节<br />
final static int STR_MAX_LEN = 10 * 1024;<br />
//hash、list、set、zset的长度阈值<br />
final static int HASH_MAX_LEN = 500;<br />
<br />
@Test<br />
void testScan() {<br />
int maxLen = 0;<br />
long len = 0;<br />
<br />
String cursor = "0";<br />
do {<br />
// 扫描并获取一部分key<br />
ScanResult&lt;String&gt; result = jedis.scan(cursor);<br />
// 记录cursor<br />
cursor = result.getCursor();<br />
List&lt;String&gt; list = result.getResult();<br />
if (list == null || list.isEmpty()) {<br />
break;<br />
}<br />
// 遍历<br />
for (String key : list) {<br />
// 判断key的类型<br />
String type = jedis.type(key);<br />
switch (type) {<br />
case "string":<br />
len = jedis.strlen(key);<br />
maxLen = STR_MAX_LEN;<br />
break;<br />
case "hash":<br />
len = jedis.hlen(key);<br />
maxLen = HASH_MAX_LEN;<br />
break;<br />
case "list":<br />
len = jedis.llen(key);<br />
maxLen = HASH_MAX_LEN;<br />
break;<br />
case "set":<br />
len = jedis.scard(key);<br />
maxLen = HASH_MAX_LEN;<br />
break;<br />
case "zset":<br />
len = jedis.zcard(key);<br />
maxLen = HASH_MAX_LEN;<br />
break;<br />
default:<br />
break;<br />
}<br />
if (len &gt;= maxLen) {<br />
System.out.printf("Found big key : %s, type: %s, length or size: %d %n", key, type, len);<br />
}<br />
}<br />
} while (!cursor.equals("0"));<br />
}<br />
<br />
@AfterEach<br />
void tearDown() {<br />
if (jedis != null) {<br />
jedis.close();<br />
}<br />
}<br />
<br />
}</td>
</tr>
</tbody>
</table>

代码需要用到JedisConnectionFactory类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.jedis.util;<br />
<br />
public class JedisConnectionFactory {<br />
<br />
private static JedisPool jedisPool;<br />
<br />
static {<br />
// 配置连接池<br />
JedisPoolConfig poolConfig = new JedisPoolConfig();<br />
poolConfig.setMaxTotal(8);<br />
poolConfig.setMaxIdle(8);<br />
poolConfig.setMinIdle(0);<br />
poolConfig.setMaxWaitMillis(1000);<br />
// 创建连接池对象，参数：连接池配置、服务端ip、服务端端口、超时时间、密码<br />
jedisPool = new JedisPool(poolConfig, "192.168.88.130", 6379, 1000);<br />
}<br />
<br />
public static Jedis getJedis() {<br />
return jedisPool.getResource();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

还需要引入Jedis的依赖：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>XML<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;redis.clients&lt;/groupId&gt;<br />
&lt;artifactId&gt;jedis&lt;/artifactId&gt;<br />
&lt;version&gt;3.7.0&lt;/version&gt;<br />
&lt;/dependency&gt;<br />
&lt;dependency&gt;<br />
&lt;groupId&gt;org.junit.jupiter&lt;/groupId&gt;<br />
&lt;artifactId&gt;junit-jupiter&lt;/artifactId&gt;<br />
&lt;version&gt;5.7.0&lt;/version&gt;<br />
&lt;scope&gt;test&lt;/scope&gt;<br />
&lt;/dependency&gt;</td>
</tr>
</tbody>
</table>

**1.2.3 第三方工具**

利用第三方工具，如 Redis-Rdb-Tools 分析RDB快照文件，全面分析内存使用情况。

Redis-Rdb-Tools的Github网址：

**\[该类型的内容暂不支持下载\]**

**1.2.4 网络监控**

自定义工具，监控进出Redis的网络数据，超出预警值时主动告警。一般阿里云搭建的云服务器就有相关监控页面：

<img src="../assets/Redis笔记/media/image133.png" style="width:5.75in;height:1.08333in" />

**1.2.5 删除BigKey**

BigKey内存占用较多，即便是删除这样的key也需要耗费很长时间，导致Redis主线程阻塞，引发一系列问题。

Redis 3.0 之前：如果是集合类型，则遍历BigKey的元素，先逐个删除子元素，最后删除BigKey

<img src="../assets/Redis笔记/media/image134.png" style="width:5.75in;height:1.19792in" />

Redis 4.0 以后：Redis在4.0后提供了异步删除的命令UNLINK key \[key ...\]，它会开启新线程进行删除

**1.3 恰当的数据类型**

存储一个User对象，可以有三种存储方式：

**方式一：json字符串**

|        |                          |
|--------|--------------------------|
| user:1 | {"name":"Jack","age":21} |

优点：实现简单粗暴

缺点：数据耦合，不够灵活

**方式二：字段打散**

|             |            |
|-------------|------------|
| user:1:name | user:1:age |
| Jack        | 21         |

优点：可以灵活访问对象任意字段

缺点：占用空间大、没办法做统一控制

**方式三：hash（推荐）**

|        |      |      |
|--------|------|------|
| user:1 | name | jack |
|        | age  | 21   |

优点：底层使用ziplist，空间占用小，可以灵活访问对象的任意字段

缺点：代码相对复杂

但是，如果hash类型的key其中有100万对field和value，field是自增id，如下：

|         |           |             |
|---------|-----------|-------------|
| key     | field     | value       |
| someKey | id:0      | value0      |
|         | .....     | .....       |
|         | id:999999 | value999999 |

这时hash的entry数量超过500，会使用哈希表而不是ZipList，内存占用较多：

可以通过MEMORY USAGE key命令查看内存占用，课程中提供的info memory会统计整个Redis服务器的指标，包含内存使用量used_memory_human，结果不只限于单个hash

entry使用哈希表的上限500可以通过config set hash-max-ziplist-entries maxLen命令进行修改（不建议超过1000），也可以通过config get hash-max-ziplist-entries命令查看

结果hash类型内存占用大的方案有两个：

**方案一**：拆分为string类型

|           |             |
|-----------|-------------|
| key       | value       |
| id:0      | value0      |
| .....     | .....       |
| id:999999 | value999999 |

这种方案spring底层没有太多内存优化，可能内存占用更大，而且获取数据也麻烦。

**方案二**：拆分为小的hash，将 id / 100 作为key， 将id % 100 作为field，这样每100个元素为一个Hash

|          |       |             |
|----------|-------|-------------|
| key      | field | value       |
| key:0    | id:00 | value0      |
|          | ..... | .....       |
|          | id:99 | value99     |
| key:1    | id:00 | value100    |
|          | ..... | .....       |
|          | id:99 | value199    |
| ....     |       |             |
| key:9999 | id:00 | value999900 |
|          | ..... | .....       |
|          | id:99 | value999999 |

在JedisTest中新增以下几个测试单元，通过info memory命令比较各种方案的区别：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testSetBigKey() {<br />
Map&lt;String, String&gt; map = new HashMap&lt;&gt;();<br />
for (int i = 1; i &lt;= 650; i++) {<br />
map.put("hello_" + i, "world!");<br />
}<br />
jedis.hmset("m2", map);<br />
}<br />
<br />
@Test<br />
void testBigHash() {<br />
Map&lt;String, String&gt; map = new HashMap&lt;&gt;();<br />
for (int i = 1; i &lt;= 100000; i++) {<br />
map.put("key_" + i, "value_" + i);<br />
}<br />
jedis.hmset("test:big:hash", map);<br />
}<br />
<br />
@Test<br />
void testBigString() {<br />
for (int i = 1; i &lt;= 100000; i++) {<br />
jedis.set("test:str:key_" + i, "value_" + i);<br />
}<br />
}<br />
<br />
@Test<br />
void testSmallHash() {<br />
int hashSize = 100;<br />
Map&lt;String, String&gt; map = new HashMap&lt;&gt;(hashSize);<br />
for (int i = 1; i &lt;= 100000; i++) {<br />
int k = (i - 1) / hashSize;<br />
int v = i % hashSize;<br />
map.put("key_" + v, "value_" + v);<br />
if (v == 0) {<br />
jedis.hmset("test:small:hash_" + k, map);<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

最后可以发现方案二的内存占用少了很多，而方案一内存占用反而增加了。

**1.4 总结**

Key的最佳实践

固定格式：\[业务名\]:\[数据名\]:\[id\]

足够简短：不超过44字节

不包含特殊字符

Value的最佳实践：

合理的拆分数据，拒绝BigKey

选择合适数据结构

Hash结构的entry数量不要超过1000

设置合理的超时时间

**2.批处理优化**

**2.1 Pipeline**

当客户端一次需要操作多次Redis时（即执行多个Redis命令），可以请求多次Redis，每次执行一个命令，也可以请求一次Redis，一次执行所有命令。

单个命令的执行流程：一次命令的响应时间 = 1次往返的网络传输耗时 + 1次Redis执行命令耗时

<img src="../assets/Redis笔记/media/image135.png" style="width:5.75in;height:1in" />

N条命令的执行流程：N次命令的响应时间 = N次往返的网络传输耗时 + N次Redis执行命令耗时

<img src="../assets/Redis笔记/media/image136.png" style="width:5.75in;height:0.98958in" />

由于Redis执行命令很快，所以命令响应时间往往只取决于网络传输耗时，所以可以一次发送N条命令，这时N条命令的执行流程就变化成：N次命令的响应时间 = 1次往返的网络传输耗时 + N次Redis执行命令耗时

<img src="../assets/Redis笔记/media/image137.png" style="width:5.75in;height:0.97917in" />

**2.1.1 MSET**

Redis提供了很多Mxxx这样的命令，可以实现批量插入数据，例如：

MSET key value \[key value ...\]：仅支持string类型

HMSET key field value \[field value ...\]：仅支持hash类型，而且只能添加一个key

利用MSET批量插入10万条数据：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testMxx() {<br />
String[] arr = new String[2000];<br />
int j;<br />
long b = System.currentTimeMillis();<br />
for (int i = 1; i &lt;= 100000; i++) {<br />
//每1000条命令发送一次请求，避免造成CPU一次插入10万数据的压力<br />
j = (i % 1000) &lt;&lt; 1;<br />
arr[j] = "test:key_" + i;<br />
arr[j + 1] = "value_" + i;<br />
if (j == 0) {<br />
jedis.mset(arr);<br />
}<br />
}<br />
long e = System.currentTimeMillis();<br />
System.out.println("time: " + (e - b));<br />
}</td>
</tr>
</tbody>
</table>

**2.1.2 Pipeline**

MSET命令只能操作string类型，其他类型如果想要一次操作多个key，就需要用到Pipeline。

Pipeline即管道，允许客户端一次发送多个命令给Redis服务器，然后Redis依次执行这些命令，最后将结果按顺序打包响应给客户端。但是遇到执行异常的命令会跳过执行下一条，所以**Pipeline不保证数据的原子性**。

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testPipeline() {<br />
// 创建管道<br />
Pipeline pipeline = jedis.pipelined();<br />
long b = System.currentTimeMillis();<br />
for (int i = 1; i &lt;= 100000; i++) {<br />
// 放入命令到管道<br />
pipeline.set("test:key_" + i, "value_" + i);<br />
if (i % 1000 == 0) {<br />
// 每放入1000条命令，批量执行，不建议一次携带太多命令<br />
pipeline.sync();<br />
}<br />
}<br />
long e = System.currentTimeMillis();<br />
System.out.println("time: " + (e - b));<br />
}</td>
</tr>
</tbody>
</table>

**2.2 集群下的批处理**

在Redis集群模式下，MSET或Pipeline中的命令所有的key必须要落在**同一个插槽**，否则会执行失败，但这是很难保证的（不建议使用{}使大量key在同一个插槽）。

目前有4种解决方案（slot表示插槽）：

<img src="../assets/Redis笔记/media/image138.png" style="width:5.75in;height:2.05208in" />

**2.2.1 串行化执行代码实践**

JedisClusterTest测试类：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class JedisClusterTest {<br />
<br />
private JedisCluster jedisCluster;<br />
<br />
@BeforeEach<br />
void setUp() {<br />
// 配置连接池<br />
JedisPoolConfig poolConfig = new JedisPoolConfig();<br />
poolConfig.setMaxTotal(8);<br />
poolConfig.setMaxIdle(8);<br />
poolConfig.setMinIdle(0);<br />
poolConfig.setMaxWaitMillis(1000);<br />
HashSet&lt;HostAndPort&gt; nodes = new HashSet&lt;&gt;();<br />
nodes.add(new HostAndPort("192.168.150.101", 7001));<br />
nodes.add(new HostAndPort("192.168.150.101", 7002));<br />
nodes.add(new HostAndPort("192.168.150.101", 7003));<br />
nodes.add(new HostAndPort("192.168.150.101", 8001));<br />
nodes.add(new HostAndPort("192.168.150.101", 8002));<br />
nodes.add(new HostAndPort("192.168.150.101", 8003));<br />
jedisCluster = new JedisCluster(nodes, poolConfig);<br />
}<br />
<br />
/* 测试集群模式下MSET是否成功 */<br />
@Test<br />
void testMSet() {<br />
jedisCluster.mset("name", "Jack", "age", "21", "sex", "male");<br />
}<br />
<br />
/* 串行slot测试 */<br />
@Test<br />
void testMSet2() {<br />
Map&lt;String, String&gt; map = new HashMap&lt;&gt;(3);<br />
map.put("name", "Jack");<br />
map.put("age", "21");<br />
map.put("sex", "Male");<br />
//对Map数据进行分组。根据相同的slot放在一个分组<br />
//key就是slot，value就是一个组<br />
Map&lt;Integer, List&lt;Map.Entry&lt;String, String&gt;&gt;&gt; result = map.entrySet()<br />
.stream()<br />
.collect(Collectors.groupingBy(<br />
entry -&gt; ClusterSlotHashUtil.calculateSlot(entry.getKey())) //自定义工具类计算插槽<br />
);<br />
//串行的去执行mset的逻辑<br />
for (List&lt;Map.Entry&lt;String, String&gt;&gt; list : result.values()) {<br />
String[] arr = new String[list.size() * 2];<br />
int j = 0;<br />
for (int i = 0; i &lt; list.size(); i++) {<br />
j = i &lt;&lt; 1;<br />
Map.Entry&lt;String, String&gt; e = list.get(i);<br />
arr[j] = e.getKey();<br />
arr[j + 1] = e.getValue();<br />
}<br />
jedisCluster.mset(arr);<br />
}<br />
}<br />
<br />
@AfterEach<br />
void tearDown() {<br />
if (jedisCluster != null) {<br />
jedisCluster.close();<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

ByteUtils：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.JedisUtil;<br />
<br />
import java.nio.ByteBuffer;<br />
import java.nio.charset.Charset;<br />
import java.nio.charset.StandardCharsets;<br />
import java.util.ArrayList;<br />
import java.util.Arrays;<br />
import java.util.List;<br />
<br />
/**<br />
* 一些处理{@code byte}数组的实用方法。<br />
*<br />
* @author Christoph Strobl<br />
* @author Mark Paluch<br />
* @since 1.7<br />
*/<br />
public final class ByteUtils {<br />
<br />
private ByteUtils() {}<br />
<br />
/**<br />
* 将给定的{@code byte}数组连接成一个数组，重叠的数组元素会被包含两次。<br />
* &lt;p /&gt;<br />
* 原始数组中元素的顺序会被保留。<br />
*<br />
* @param array1 第一个数组。<br />
* @param array2 第二个数组。<br />
* @return 新的数组。<br />
*/<br />
public static byte[] concat(byte[] array1, byte[] array2) {<br />
byte[] result = Arrays.copyOf(array1, array1.length + array2.length);<br />
System.arraycopy(array2, 0, result, array1.length, array2.length);<br />
<br />
return result;<br />
}<br />
<br />
/**<br />
* 将给定的{@code byte}数组连接成一个数组，重叠的数组元素会被包含两次。<br />
* 如果{@code arrays}为空，则返回一个新的空数组；如果{@code arrays}只包含一个数组，则返回该数组。<br />
* &lt;p /&gt;<br />
* 原始数组中元素的顺序会被保留。<br />
*<br />
* @param arrays 要连接的数组。<br />
* @return 新的数组。<br />
*/<br />
public static byte[] concatAll(byte[]... arrays) {<br />
if (arrays.length == 0) {<br />
return new byte[] {};<br />
}<br />
if (arrays.length == 1) {<br />
return arrays[0];<br />
}<br />
<br />
byte[] cur = concat(arrays[0], arrays[1]);<br />
for (int i = 2; i &lt; arrays.length; i++) {<br />
cur = concat(cur, arrays[i]);<br />
}<br />
return cur;<br />
}<br />
<br />
/**<br />
* 使用分隔符{@code c}将{@code source}分割成多个子数组。<br />
*<br />
* @param source 源数组。<br />
* @param c 分隔符。<br />
* @return 分割后的子数组。<br />
*/<br />
public static byte[][] split(byte[] source, int c) {<br />
if (ObjectUtils.isEmpty(source)) {<br />
return new byte[][] {};<br />
}<br />
<br />
List&lt;byte[]&gt; bytes = new ArrayList&lt;&gt;();<br />
int offset = 0;<br />
for (int i = 0; i &lt;= source.length; i++) {<br />
<br />
if (i == source.length) {<br />
<br />
bytes.add(Arrays.copyOfRange(source, offset, i));<br />
break;<br />
}<br />
<br />
if (source[i] == c) {<br />
bytes.add(Arrays.copyOfRange(source, offset, i));<br />
offset = i + 1;<br />
}<br />
}<br />
return bytes.toArray(new byte[bytes.size()][]);<br />
}<br />
<br />
/**<br />
* 将多个{@code byte}数组合并成一个二维数组<br />
*<br />
* @param firstArray 不能为{@literal null}<br />
* @param additionalArrays 不能为{@literal null}<br />
* @return 合并后的二维数组<br />
*/<br />
public static byte[][] mergeArrays(byte[] firstArray, byte[]... additionalArrays) {<br />
Assert.notNull(firstArray, "第一个数组不能为null");<br />
Assert.notNull(additionalArrays, "附加数组不能为null");<br />
<br />
byte[][] result = new byte[additionalArrays.length + 1][];<br />
result[0] = firstArray;<br />
System.arraycopy(additionalArrays, 0, result, 1, additionalArrays.length);<br />
<br />
return result;<br />
}<br />
<br />
/**<br />
* 从{@link ByteBuffer}中提取字节数组，不消耗缓冲区内容。<br />
*<br />
* @param byteBuffer 不能为{@literal null}。<br />
* @return 提取的字节数组<br />
* @since 2.0<br />
*/<br />
public static byte[] getBytes(ByteBuffer byteBuffer) {<br />
Assert.notNull(byteBuffer, "ByteBuffer不能为null!");<br />
<br />
ByteBuffer duplicate = byteBuffer.duplicate();<br />
byte[] bytes = new byte[duplicate.remaining()];<br />
duplicate.get(bytes);<br />
return bytes;<br />
}<br />
<br />
/**<br />
* 测试{@code haystack}是否以给定的{@code prefix}开头。<br />
*<br />
* @param haystack 要扫描的源数组。<br />
* @param prefix 要查找的前缀。<br />
* @return 如果{@code haystack}在{@code offset}位置以{@code prefix}开头，则返回{@literal true}。<br />
* @since 1.8.10<br />
* @see #startsWith(byte[], byte[], int)<br />
*/<br />
public static boolean startsWith(byte[] haystack, byte[] prefix) {<br />
return startsWith(haystack, prefix, 0);<br />
}<br />
<br />
/**<br />
* 测试从指定{@code offset}位置开始的{@code haystack}是否以给定的{@code prefix}开头。<br />
*<br />
* @param haystack 要扫描的源数组。<br />
* @param prefix 要查找的前缀。<br />
* @param offset 开始查找的偏移量。<br />
* @return 如果{@code haystack}在{@code offset}位置以{@code prefix}开头，则返回{@literal true}。<br />
* @since 1.8.10<br />
*/<br />
public static boolean startsWith(byte[] haystack, byte[] prefix, int offset) {<br />
int to = offset;<br />
int prefixOffset = 0;<br />
int prefixLength = prefix.length;<br />
<br />
if ((offset &lt; 0) || (offset &gt; haystack.length - prefixLength)) {<br />
return false;<br />
}<br />
<br />
<br />
while (--prefixLength &gt;= 0) {<br />
if (haystack[to++] != prefix[prefixOffset++]) {<br />
return false;<br />
}<br />
}<br />
<br />
return true;<br />
}<br />
<br />
/**<br />
* 在指定的字节数组中搜索指定的值。返回{@code haystack}中第一个匹配值的索引，<br />
* 如果未找到{@code needle}，则返回{@code -1}。<br />
*<br />
* @param haystack 要扫描的源数组。<br />
* @param needle 要搜索的值。<br />
* @return 第一个匹配项的索引，如果未找到则返回-1。<br />
* @since 1.8.10<br />
*/<br />
public static int indexOf(byte[] haystack, byte needle) {<br />
for (int i = 0; i &lt; haystack.length; i++) {<br />
if (haystack[i] == needle) {<br />
return i;<br />
}<br />
}<br />
<br />
return -1;<br />
}<br />
<br />
/**<br />
* 使用{@link StandardCharsets#UTF_8}将{@link String}转换为{@link ByteBuffer}。<br />
*<br />
* @param theString 不能为{@literal null}。<br />
* @return 转换后的ByteBuffer<br />
* @since 2.1<br />
*/<br />
public static ByteBuffer getByteBuffer(String theString) {<br />
return getByteBuffer(theString, StandardCharsets.UTF_8);<br />
}<br />
<br />
/**<br />
* 使用给定的{@link Charset}将{@link String}转换为{@link ByteBuffer}。<br />
*<br />
* @param theString 不能为{@literal null}。<br />
* @param charset 不能为{@literal null}。<br />
* @return 转换后的ByteBuffer<br />
* @since 2.1<br />
*/<br />
public static ByteBuffer getByteBuffer(String theString, Charset charset) {<br />
Assert.notNull(theString, "字符串不能为null!");<br />
Assert.notNull(charset, "字符集不能为null!");<br />
return charset.encode(theString);<br />
}<br />
<br />
/**<br />
* 通过复制缓冲区并获取其内容，从给定的{@link ByteBuffer}中提取/传输字节到数组中。<br />
*<br />
* @param buffer 不能为{@literal null}。<br />
* @return 提取的字节数组<br />
* @since 2.1<br />
*/<br />
public static byte[] extractBytes(ByteBuffer buffer) {<br />
ByteBuffer duplicate = buffer.duplicate();<br />
byte[] bytes = new byte[duplicate.remaining()];<br />
duplicate.get(bytes);<br />
return bytes;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

ObjectUtils：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.JedisUtil;<br />
<br />
import com.sun.istack.internal.Nullable;<br />
import java.lang.reflect.Array;<br />
import java.util.Collection;<br />
import java.util.Map;<br />
import java.util.Optional;<br />
<br />
public class ObjectUtils {<br />
public static boolean isEmpty(@Nullable Object obj) {<br />
if (obj == null) {<br />
return true;<br />
}<br />
<br />
if (obj instanceof Optional) {<br />
return !((Optional&lt;?&gt;) obj).isPresent();<br />
}<br />
if (obj instanceof CharSequence) {<br />
return ((CharSequence) obj).length() == 0;<br />
}<br />
if (obj.getClass().isArray()) {<br />
return Array.getLength(obj) == 0;<br />
}<br />
if (obj instanceof Collection) {<br />
return ((Collection&lt;?&gt;) obj).isEmpty();<br />
}<br />
if (obj instanceof Map) {<br />
return ((Map&lt;?, ?&gt;) obj).isEmpty();<br />
}<br />
// else<br />
return false;<br />
}<br />
}</td>
</tr>
</tbody>
</table>

Assert：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.JedisUtil;<br />
<br />
public class Assert {<br />
public static void notNull(Object obj, String msg){<br />
if (obj == null) {<br />
throw new RuntimeException(msg);<br />
}<br />
}<br />
public static void hasText(String str, String msg){<br />
if (str == null) {<br />
throw new RuntimeException(msg);<br />
}<br />
if (str.trim().isEmpty()) {<br />
throw new RuntimeException(msg);<br />
}<br />
}<br />
}</td>
</tr>
</tbody>
</table>

ClusterSlotHashUtil：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
package com.heima.JedisUtil;<br />
<br />
import java.nio.ByteBuffer;<br />
import java.util.Arrays;<br />
import java.util.Collection;<br />
<br />
/**<br />
* Redis集群槽位哈希工具类，用于计算key所属的集群哈希槽位，判断多个key是否在同一槽位<br />
*<br />
* @author Christoph Strobl<br />
* @since 1.7<br />
*/<br />
public final class ClusterSlotHashUtil {<br />
<br />
// Redis集群的总槽位数量，固定为16384个<br />
private static final int SLOT_COUNT = 16384;<br />
<br />
// 用于提取key中哈希计算部分的起始字符（'{'），遵循Redis集群key标签规则<br />
private static final byte SUBKEY_START = '{';<br />
// 用于提取key中哈希计算部分的结束字符（'}'），遵循Redis集群key标签规则<br />
private static final byte SUBKEY_END = '}';<br />
<br />
// CRC16校验算法的 lookup table（查表法），用于快速计算CRC16值<br />
private static final int[] LOOKUP_TABLE = { 0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50A5, 0x60C6, 0x70E7, 0x8108,<br />
0x9129, 0xA14A, 0xB16B, 0xC18C, 0xD1AD, 0xE1CE, 0xF1EF, 0x1231, 0x0210, 0x3273, 0x2252, 0x52B5, 0x4294, 0x72F7,<br />
0x62D6, 0x9339, 0x8318, 0xB37B, 0xA35A, 0xD3BD, 0xC39C, 0xF3FF, 0xE3DE, 0x2462, 0x3443, 0x0420, 0x1401, 0x64E6,<br />
0x74C7, 0x44A4, 0x5485, 0xA56A, 0xB54B, 0x8528, 0x9509, 0xE5EE, 0xF5CF, 0xC5AC, 0xD58D, 0x3653, 0x2672, 0x1611,<br />
0x0630, 0x76D7, 0x66F6, 0x5695, 0x46B4, 0xB75B, 0xA77A, 0x9719, 0x8738, 0xF7DF, 0xE7FE, 0xD79D, 0xC7BC, 0x48C4,<br />
0x58E5, 0x6886, 0x78A7, 0x0840, 0x1861, 0x2802, 0x3823, 0xC9CC, 0xD9ED, 0xE98E, 0xF9AF, 0x8948, 0x9969, 0xA90A,<br />
0xB92B, 0x5AF5, 0x4AD4, 0x7AB7, 0x6A96, 0x1A71, 0x0A50, 0x3A33, 0x2A12, 0xDBFD, 0xCBDC, 0xFBBF, 0xEB9E, 0x9B79,<br />
0x8B58, 0xBB3B, 0xAB1A, 0x6CA6, 0x7C87, 0x4CE4, 0x5CC5, 0x2C22, 0x3C03, 0x0C60, 0x1C41, 0xEDAE, 0xFD8F, 0xCDEC,<br />
0xDDCD, 0xAD2A, 0xBD0B, 0x8D68, 0x9D49, 0x7E97, 0x6EB6, 0x5ED5, 0x4EF4, 0x3E13, 0x2E32, 0x1E51, 0x0E70, 0xFF9F,<br />
0xEFBE, 0xDFDD, 0xCFFC, 0xBF1B, 0xAF3A, 0x9F59, 0x8F78, 0x9188, 0x81A9, 0xB1CA, 0xA1EB, 0xD10C, 0xC12D, 0xF14E,<br />
0xE16F, 0x1080, 0x00A1, 0x30C2, 0x20E3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83B9, 0x9398, 0xA3FB, 0xB3DA, 0xC33D,<br />
0xD31C, 0xE37F, 0xF35E, 0x02B1, 0x1290, 0x22F3, 0x32D2, 0x4235, 0x5214, 0x6277, 0x7256, 0xB5EA, 0xA5CB, 0x95A8,<br />
0x8589, 0xF56E, 0xE54F, 0xD52C, 0xC50D, 0x34E2, 0x24C3, 0x14A0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xA7DB,<br />
0xB7FA, 0x8799, 0x97B8, 0xE75F, 0xF77E, 0xC71D, 0xD73C, 0x26D3, 0x36F2, 0x0691, 0x16B0, 0x6657, 0x7676, 0x4615,<br />
0x5634, 0xD94C, 0xC96D, 0xF90E, 0xE92F, 0x99C8, 0x89E9, 0xB98A, 0xA9AB, 0x5844, 0x4865, 0x7806, 0x6827, 0x18C0,<br />
0x08E1, 0x3882, 0x28A3, 0xCB7D, 0xDB5C, 0xEB3F, 0xFB1E, 0x8BF9, 0x9BD8, 0xABBB, 0xBB9A, 0x4A75, 0x5A54, 0x6A37,<br />
0x7A16, 0x0AF1, 0x1AD0, 0x2AB3, 0x3A92, 0xFD2E, 0xED0F, 0xDD6C, 0xCD4D, 0xBDAA, 0xAD8B, 0x9DE8, 0x8DC9, 0x7C26,<br />
0x6C07, 0x5C64, 0x4C45, 0x3CA2, 0x2C83, 0x1CE0, 0x0CC1, 0xEF1F, 0xFF3E, 0xCF5D, 0xDF7C, 0xAF9B, 0xBFBA, 0x8FD9,<br />
0x9FF8, 0x6E17, 0x7E36, 0x4E55, 0x5E74, 0x2E93, 0x3EB2, 0x0ED1, 0x1EF0 };<br />
<br />
// 私有构造方法，防止工具类被实例化<br />
private ClusterSlotHashUtil() {}<br />
<br />
/**<br />
* 判断集合中所有ByteBuffer类型的key是否属于同一集群槽位<br />
*<br />
* @param keys 待判断的key集合，不能为null<br />
* @return true：所有key在同一槽位；false：存在key在不同槽位<br />
* @since 2.0<br />
*/<br />
public static boolean isSameSlotForAllKeys(Collection&lt;ByteBuffer&gt; keys) {<br />
Assert.notNull(keys, "Keys must not be null!"); // 断言：key集合不能为null<br />
if (keys.size() &lt;= 1) { // 若key数量≤1，默认属于同一槽位<br />
return true;<br />
}<br />
// 将ByteBuffer类型的key转换为byte数组，调用重载方法判断<br />
return isSameSlotForAllKeys((byte[][]) keys.stream() //<br />
.map(ByteBuffer::duplicate) // 复制ByteBuffer（避免修改原缓冲区）<br />
.map(ByteUtils::getBytes) // 调用ByteUtils工具类提取byte数组<br />
.toArray(byte[][]::new));<br />
}<br />
<br />
/**<br />
* 判断可变参数中所有ByteBuffer类型的key是否属于同一集群槽位<br />
*<br />
* @param keys 待判断的key可变参数，不能为null<br />
* @return true：所有key在同一槽位；false：存在key在不同槽位<br />
* @since 2.0<br />
*/<br />
public static boolean isSameSlotForAllKeys(ByteBuffer... keys) {<br />
Assert.notNull(keys, "Keys must not be null!"); // 断言：key数组不能为null<br />
return isSameSlotForAllKeys(Arrays.asList(keys)); // 转换为集合，调用上面的集合重载方法<br />
}<br />
<br />
/**<br />
* 判断可变参数中所有byte数组类型的key是否属于同一集群槽位<br />
*<br />
* @param keys 待判断的key可变参数（byte数组），不能为null<br />
* @return true：所有key在同一槽位；false：存在key在不同槽位<br />
*/<br />
public static boolean isSameSlotForAllKeys(byte[]... keys) {<br />
Assert.notNull(keys, "Keys must not be null!"); // 断言：key数组不能为null<br />
if (keys.length &lt;= 1) { // 若key数量≤1，默认属于同一槽位<br />
return true;<br />
}<br />
<br />
// 计算第一个key的槽位，作为基准槽位<br />
int slot = calculateSlot(keys[0]);<br />
// 遍历剩余key，判断是否与基准槽位一致<br />
for (int i = 1; i &lt; keys.length; i++) {<br />
if (slot != calculateSlot(keys[i])) {<br />
return false;<br />
}<br />
}<br />
return true;<br />
}<br />
<br />
/**<br />
* 根据字符串类型的key，计算其所属的Redis集群槽位<br />
*<br />
* @param key 待计算的key，不能为null或空字符串<br />
* @return key所属的集群槽位（0~16383之间的整数）<br />
*/<br />
public static int calculateSlot(String key) {<br />
Assert.hasText(key, "Key must not be null or empty!"); // 断言：key不能为null或空<br />
return calculateSlot(key.getBytes()); // 转换为byte数组，调用byte数组重载方法<br />
}<br />
<br />
/**<br />
* 根据byte数组类型的key，计算其所属的Redis集群槽位<br />
* 遵循Redis集群key标签规则：若key包含"{}"，则仅用"{}"内的内容计算槽位；否则用整个key计算<br />
*<br />
* @param key 待计算的key（byte数组），不能为null<br />
* @return key所属的集群槽位（0~16383之间的整数）<br />
*/<br />
public static int calculateSlot(byte[] key) {<br />
Assert.notNull(key, "Key must not be null!"); // 断言：key不能为null<br />
<br />
byte[] finalKey = key; // 最终用于计算槽位的key（默认是原key）<br />
// 查找key中'{'的位置（起始索引）<br />
int start = indexOf(key, SUBKEY_START);<br />
if (start != -1) { // 若找到'{'<br />
// 从'{'的下一个位置开始，查找'}'的位置（结束索引）<br />
int end = indexOf(key, start + 1, SUBKEY_END);<br />
// 若找到'}'，且'{'和'}'之间有内容（不是空的"{}"）<br />
if (end != -1 &amp;&amp; end != start + 1) {<br />
// 提取"{}"内的子串作为最终计算槽位的key<br />
finalKey = new byte[end - (start + 1)];<br />
System.arraycopy(key, start + 1, finalKey, 0, finalKey.length);<br />
}<br />
}<br />
// 对最终key计算CRC16值，再对总槽位数量取模，得到槽位<br />
return crc16(finalKey) % SLOT_COUNT;<br />
}<br />
<br />
/**<br />
* 在byte数组中查找指定字节（needle）的第一次出现位置，从数组起始处开始查找<br />
*<br />
* @param haystack 待查找的byte数组（干草堆）<br />
* @param needle 要查找的目标字节（针）<br />
* @return 目标字节的索引；若未找到，返回-1<br />
*/<br />
private static int indexOf(byte[] haystack, byte needle) {<br />
return indexOf(haystack, 0, needle); // 调用带起始索引的重载方法，从0开始查找<br />
}<br />
<br />
/**<br />
* 在byte数组中查找指定字节（needle）的第一次出现位置，从指定起始索引（start）开始查找<br />
*<br />
* @param haystack 待查找的byte数组（干草堆）<br />
* @param start 查找的起始索引（包含）<br />
* @param needle 要查找的目标字节（针）<br />
* @return 目标字节的索引；若未找到，返回-1<br />
*/<br />
private static int indexOf(byte[] haystack, int start, byte needle) {<br />
// 从起始索引遍历到数组末尾<br />
for (int i = start; i &lt; haystack.length; i++) {<br />
if (haystack[i] == needle) { // 找到目标字节，返回当前索引<br />
return i;<br />
}<br />
}<br />
return -1; // 遍历结束未找到，返回-1<br />
}<br />
<br />
/**<br />
* 计算byte数组的CRC16校验值（使用查表法，基于LOOKUP_TABLE）<br />
* CRC16算法是Redis集群用于计算key槽位的核心算法<br />
*<br />
* @param bytes 待计算的byte数组<br />
* @return 16位CRC校验值（0~65535之间的整数）<br />
*/<br />
private static int crc16(byte[] bytes) {<br />
int crc = 0x0000; // CRC初始值<br />
<br />
<br />
// 遍历byte数组中的每个字节，更新CRC值<br />
for (byte b : bytes) {<br />
// 查表法计算CRC：(当前CRC左移8位) XOR (从LOOKUP_TABLE中获取对应值)<br />
crc = ((crc &lt;&lt; 8) ^ LOOKUP_TABLE[((crc &gt;&gt;&gt; 8) ^ (b &amp; 0xFF)) &amp; 0xFF]);<br />
}<br />
return crc &amp; 0xFFFF; // 确保结果是16位整数（只保留低16位）<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**2.2.2 Spring集群环境下批处理代码**

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Test<br />
void testMSetInCluster() {<br />
Map&lt;String, String&gt; map = new HashMap&lt;&gt;(3);<br />
map.put("name", "Rose");<br />
map.put("age", "21");<br />
map.put("sex", "Female");<br />
stringRedisTemplate.opsForValue().multiSet(map); //MSET<br />
<br />
List&lt;String&gt; strings = stringRedisTemplate.opsForValue().multiGet(Arrays.asList("name", "age", "sex")); //MGET<br />
strings.forEach(System.out::println);<br />
}</td>
</tr>
</tbody>
</table>

最终运行会发现并没有报错，这是因为Spring提供的客户端已经解决了集群模式下的批处理问题，原理如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
@Override<br />
public RedisFuture&lt;String&gt; mset(Map&lt;K, V&gt; map) {<br />
Map&lt;Integer, List&lt;K&gt;&gt; partitioned = SlotHash.partition(codec, map.keySet());<br />
<br />
if (partitioned.size() &lt; 2) {<br />
return super.mset(map);<br />
}<br />
<br />
Map&lt;Integer, RedisFuture&lt;String&gt;&gt; executions = new HashMap&lt;&gt;();<br />
<br />
for (Map.Entry&lt;Integer, List&lt;K&gt;&gt; entry : partitioned.entrySet()) {<br />
Map&lt;K, V&gt; op = new HashMap&lt;&gt;();<br />
entry.getValue().forEach(k -&gt; op.put(k, map.get(k)));<br />
<br />
RedisFuture&lt;String&gt; mset = super.mset(op);<br />
executions.put(entry.getKey(), mset);<br />
}<br />
<br />
return MultiNodeExecution.firstOfAsync(executions);<br />
}</td>
</tr>
</tbody>
</table>

底层的RedisAdvancedClusterAsyncCommandsImpl类首先根据slotHash算出来一个partitioned的map，map中的key就是slot，而他的value就是对应的相同slot的key对应的数据，然后通过RedisFuture\<String\> mset = super.mset(op)进行异步slot的消息发送。

**3.服务器端优化**

**3.1 持久化配置**

Redis的持久化虽然可以保证数据安全，但也会带来很多额外的开销，因此持久化请遵循下列建议：

用来做缓存的Redis实例尽量不要开启持久化功能

建议关闭RDB持久化功能，使用AOF持久化

利用脚本定期在slave节点做RDB，实现数据备份

设置合理的rewrite阈值，避免频繁的bgrewrite

配置no-appendfsync-on-rewrite = yes，禁止在rewrite期间做aof，避免因AOF引起的阻塞

主线程接收到写操作后，不仅将数据写到内存，还要将命令写到AOF缓冲区，根据刷盘策略（如每1秒刷盘）开启新线程同步进行刷盘，同时监听本次刷盘时间，如果刷盘超过2秒，主线程阻塞等待刷盘完成为止，否则通过正常执行指令：

> <img src="../assets/Redis笔记/media/image139.png" style="width:5.75in;height:1.60417in" />

部署有关建议：

Redis实例的物理机要预留足够内存，应对fork和rewrite

单个Redis实例内存上限不要太大，例如4G或8G。可以加快fork的速度、减少主从同步、数据迁移压力

不要与CPU密集型应用部署在一起

不要与高硬盘负载应用一起部署，例如：数据库、消息队列

**3.2 慢查询优化**

慢查询指那些Redis执行时耗时超过某个阈值的命令。

Redis是单线程的，客户端发出的指令都会进入到Redis底层的queue（队列）来执行，如果此时有一些慢查询的数据，就会导致大量请求阻塞，从而引起报错：

<img src="../assets/Redis笔记/media/image140.png" style="width:5.75in;height:0.97917in" />

慢查询的阈值对应配置项slowlog-log-slower-than，单位微妙，默认是10000，建议1000，可以通过命令临时修改：

config get slowlog-log-slower-than：查看慢查询阈值

config set slowlog-log-slower-than 阈值：临时修改慢查询阈值

慢查询会被放在慢查询日志中，日志的长度（即可存慢查询个数）对应配置项slowlog-max-len，和慢查询日志一样，也可以通过config get\|set slowlog-max-len \[日志长度\] 命令查询或临时设置。

|                                                                                           |
|-------------------------------------------------------------------------------------------|
| 如果想要永久设置，需要修改Redis配置文件中的配置项slowlog-log-slower-than或slowlog-max-len |

通过如下命令可以查看慢查询日志列表：

slowlog len：查询慢查询日志长度

slowlog get \[n\]：读取n条慢查询日志

slowlog reset：清空慢查询列表

<img src="../assets/Redis笔记/media/image141.png" style="width:5.75in;height:1.33333in" />

**3.3 命令及安全配置**

Redis会绑定在0.0.0.0:6379，这样将会将Redis服务暴露到公网上，而Redis如果没有做身份认证，会出现严重的安全漏洞。

漏洞重现方式：

**\[该类型的内容暂不支持下载\]**

为什么会出现不需要密码也能登录？Redis考虑到每次登录都比较麻烦，所以Redis就有一种ssh免秘钥登录的方式，生成一对公钥和私钥，私钥放在本地，公钥放在Redis端，当登录服务器时，服务器和本地进行公钥和私钥的认证，如果没有问题，则不需要利用Redis的登录也能访问，这种做法本身也很常见。但前提是公钥必须保存在服务器上，但是Redis的漏洞在于在不登录的情况下，也能把公钥送到Linux服务器，从而产生漏洞。

漏洞出现的核心原因：

Redis未设置密码

利用了Redis的config set命令动态修改Redis配置

使用了root账号权限启动Redis

为了避免这样的漏洞，尽量采用如下建议：

Redis一定要设置密码

禁止线上使用下面命令：keys、flushall、flushdb、config set等命令。可以利用rename-command禁用

bind：限制网卡，禁止外网网卡访问

开启防火墙

不要使用root账户启动Redis

尽量不使用默认的端口

**3.4 内存划分和内存配置**

当Redis内存不足时，可能导致Key频繁被删除、响应时间变长、QPS不稳定等问题。当内存使用率达到 90% 以上时就需要警惕，并快速定位到内存占用原因。

|            |                                                                                                                                                       |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| 内存占用   | 说明                                                                                                                                                  |
| 数据内存   | 是Redis最主要的部分，存储Redis的键值信息。主要问题是BigKey问题、内存碎片问题                                                                          |
| 进程内存   | Redis主进程本身运⾏也需要占⽤内存，如代码、常量池等等；这部分内存⼤约⼏兆，在⼤多数⽣产环境中与Redis数据占⽤的内存相⽐可以忽略                        |
| 缓冲区内存 | 一般包括客户端缓冲区、AOF缓冲区、复制缓冲区等。客户端缓冲区又包括输入缓冲区和输出缓冲区两种。这部分内存占用波动较大，不当使用BigKey，可能导致内存溢出 |

*内存碎片：Redis底层分配并不是key有多大就会分配多大，而是有自己的分配策略，比如8, 16, 20等等，假定当前key只需10个字节，此时分配8不够，就会分配16个字节，多出来的6个字节就会空闲，成为内存碎片。*

通过一些命令可以查看Redis目前内存分配状态：

info memory：查看内存分配的情况

memory xxx：查看key的主要占用情况，如memory stats用于查看内存相关统计信息，其结果解释参考下面的Redis内存说明.txt文件

**\[Redis内存说明.txt\]**

内存缓冲区常见的有三种：

复制缓冲区：主从复制的repl_backlog_buf，如果太小可能导致频繁的全量复制，影响性能。通过replbacklog-size来设置，默认1mb

AOF缓冲区：AOF刷盘之前的缓存区域，AOF执行rewrite的缓冲区。无法设置容量上限

客户端缓冲区：分为输入缓冲区和输出缓冲区，输入缓冲区最大1G且不能设置。输出缓冲区可以设置

复制缓冲区和AOF缓冲区不会有问题，最关键就是**客户端缓冲区**问题。

客户端缓冲区：我们发送命令时，客户端用来缓存命令的一个缓冲区，也就是向Redis输入数据的输入端缓冲区和Redis向客户端返回数据的响应缓存区。输入缓冲区最大1G且不能设置，如果超过了这个空间，Redis会直接断开，我们需要担心的是输出端缓冲区。

client-output-buffer-limit是 Redis 用于限制客户端输出缓冲区大小的配置项，

格式：client-output-buffer-limit \<class\> \<hard limit\> \<soft limit\> \<soft seconds\>

\<class\>：客户端类型，normal为普通客户端、slave为从节点客户端、pubsub为发布订阅客户端

\<hard limit\>：若客户端输出缓冲区超过此值（字节），Redis会立即断开客户端连接

\<soft limit\>和\<soft seconds\>：若输出缓冲区在soft seconds秒内持续超过soft limit字节数，Redis会断开客户端连接

client-output-buffer-limit的默认配置如下：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
client-output-buffer-limit normal 0 0 0 # 普通客户端没有限制<br />
client-output-buffer-limit replica 256mb 64mb 60 # 早期版本为slave<br />
client-output-buffer-limit pubsub 32mb 8mb 60</td>
</tr>
</tbody>
</table>

由于普通客户端输出缓冲区没有限制，如果突然处理大量的BigKey，会导致内存突然占满，就会导致Redis断开，解决方式有两个：

设置输出缓冲区大小，避免BigKey

增加服务器带宽大小，避免突然出现大量数据超过Redis的承受能力

定位出现问题的客户端需要使用到两个命令：

info clients：返回客户端连接的**统计性概览**，聚焦整体连接状态，不包含单个客户端的详细信息

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Bash<br />
connected_clients:10 # 当前已连接的客户端总数（包括普通客户端、从节点、发布订阅客户端等）<br />
client_recent_max_input_buffer:2048 # 最近客户端输入缓冲区的最大大小（字节）<br />
client_recent_max_output_buffer:4096 # 最近客户端输出缓冲区的最大大小（字节）<br />
blocked_clients:2 # 被阻塞的客户端数量（如执行 BLPOP、BRPOP 等命令的客户端）<br />
tracking_clients:0 # 开启键空间通知跟踪的客户端数量<br />
clients_in_timeout_table:0 # 处于超时表中的客户端数量</td>
</tr>
</tbody>
</table>

client list：返回**每个客户端连接的详细信息**，包括客户端 ID、地址、状态、缓冲区大小等

id：客户端唯一标识

addr：客户端的 IP 和端口

flags：客户端类型（N= 普通客户端，S= 从节点，P= 发布订阅客户端）

**omem**：输出缓冲区大小（字节），若过大可能导致内存问题

cmd：客户端最近执行的命令

**4.服务器端集群优化**

集群虽然具备高可用特性，能实现自动故障恢复，但是如果使用不当，也会存在一些问题。

**集群完整性问题**

在Redis的默认配置中，如果发现任意一个插槽不可用，则整个集群都会停止对外服务。

为了保证高可用性，建议将配置文件中cluster-require-full-coverage配置为 no

**集群带宽问题**

集群节点之间会不断的互相Ping来确定集群中其它节点的状态。每次Ping携带的信息至少包括：插槽信息和集群状态信息。

集群节点越多，集群状态信息数据量也越大，10个节点的相关信息可能达到1kb，此时每次集群互通需要的带宽会非常高，导致集群大量的带宽都被ping占用。

解决途径：

避免大集群，集群节点数不要太多，最好少于1000，如果业务庞大，则建立多个集群

避免在单个物理机中运行太多Redis实例

配置合适的cluster-node-timeout值

**数据倾斜问题**

数据出现BigKey或集群批处理时使用了相同的hash_tag，都会造成数据倾斜问题。

**客户端性能问题**

一旦做了集群，将来客户端不管是利用Jedis还是lettuce，在访问集群的时候都需要在集群中做节点的选择、读写分离的判断、插槽的判断等等，势必会给客户端性能带来一些影响。

**命令的集群兼容性问题**

当使用批处理的命令时，redis要求key必须落在相同的slot上，然后大量的key同时操作是无法完成的，客户端必须要对这样的数据进行处理具体参考批处理优化部分。

**lua和事务问题**

lua和事务都是要保证原子性，如果key不在一个节点，那么无法保证lua的执行和事务的特性，所以在集群模式无法执行lua和事务。

**集群和主从的选择**：单体Redis（主从Redis）已经能达到万级别的QPS，并且也具备很强的高可用特性。如果主从能满足业务需求，尽量使用主从。不到万不得已，尽量不要搭建Redis集群。

**六、Redis数据结构**

**1.动态字符串SDS**

Redis的key本质是一个字符串，value也往往是字符串或字符串的集合，可见字符串是Redis最常用的数据结构。

C语言的字符串存在如下问题：

没有内置的字符串类：C语言并没有提供字符串类型，字符串在C语言中是以空字符\0结尾的字符数组

获取字符串长度的需要通过运算：C语言并没有提供字符数组的长度字段，要获取字符串（字符数组）的长度必须遍历整个数组

非二进制安全：由于字符串以空字符\0结尾，所以字符串不能包含\0，这限制了字符串保存二进制数据（图片、视频等）的能力

所以Redis设计了新的字符串结构，即简单动态字符串，简称SDS。例如执行set name jack，Redis会创建两个SDS，分别是包含name的SDS和包含jack的SDS。

SDS是一个结构体，源码如下：

<img src="../assets/Redis笔记/media/image142.png" style="width:5.75in;height:0.9375in" />

初始时alloc和len相同，但随着动态扩容，两者会有差异

字符数组buf\[\]用于保存字符串，末尾有一个结束标识\0

为了适应不同长度的字符串，Redis设计了五种SDS头部结构，这些结构的主要区别在于它们能够表示的字符串长度的范围不同：

<img src="../assets/Redis笔记/media/image143.png" style="width:5.75in;height:2.71875in" />

例如保存一个"hi"字符串的SDS结构为：

<img src="../assets/Redis笔记/media/image144.png" style="width:5.75in;height:0.4375in" />

SDS还具备动态扩容能力，比如在"hi"字符串后追加 “,Amy” ，首先申请内存空间：

如果新字符串小于1M，则新空间为 扩展后字符串长度的两倍+1

如果新字符串大于1M，则新空间为 扩展后字符串长度+1M+1 ，称为内存预分配

<img src="../assets/Redis笔记/media/image145.png" style="width:5.75in;height:0.34375in" />

SDS的优点：

获取字符串长度的时间复杂度为O(1)

支持动态扩容

减少内存分配次数

二进制安全

*当Redis需要存储一个字符串时，会根据字符串的实际长度来选择合适的SDS头部结构。*

*当Redis中存储的字符串长度发生变化超出当前SDS（简单动态字符串）结构存储上限时，SDS会进行动态扩容，而不是切换到其他SDS结构存储。*

*SDS还采用了内存预分配和惰性空间释放策略来优化内存使用：*

当字符串需要扩容时，SDS会根据一定的规则分配新的内存空间

当字符串缩短时，SDS并不会立即回收多余的内存空间，而是将其记录下来，以便将来使用。这种惰性空间释放策略减少了内存分配和释放的次数，提高了性能

**2.IntSet**

IntSet是Redis中set集合的一种实现方式，基于整数数组来实现，并且具备长度可变、有序等特征。 结构如下：

<img src="../assets/Redis笔记/media/image146.png" style="width:5.75in;height:0.92708in" />

其中的encoding包含三种模式，表示存储的整数大小不同：

<img src="../assets/Redis笔记/media/image147.png" style="width:5.75in;height:0.90625in" />

为了方便查找，Redis会将intset中所有的整数按照**升序**依次保存在contents数组中。例如存放数据\[5，10，20\]，采用INTSET_ENC_INT16编码，插入后的intset结构：

<img src="../assets/Redis笔记/media/image148.png" style="width:5.75in;height:1.04167in" />

现在，数组中每个数字都在int16_t的范围内，因此采用的编码方式是INTSET_ENC_INT16，每部分占用的字节大小：

encoding：4字节

length：4字节

contents：2字节 \* 3 = 6字节

数组中每个数字采用相同的编码方式，即占用空间大小相同，结合数组起始地址和数组下标可以快速定位到每个元素的物理地址：startPtr + (sizeof(int16) \* index)，所以数组下标也表示当前元素到数组起始地址间隔了多少个元素。

<img src="../assets/Redis笔记/media/image149.png" style="width:5.75in;height:0.4375in" />

现在向数组\[5，10，20\]中添加元素50000，这个数字已经超出INTSET_ENC_INT16的范围，intset将自动升级编码方式到合适的大小：

升级编码为INTSET_ENC_INT32，每个整数占4字节，并按照新的编码方式及元素个数扩容数组

倒序依次将数组中的元素拷贝到扩容后的正确位置

将待添加的元素放入数组末尾

最后，将inset的encoding属性改为INTSET_ENC_INT32，将length属性改为4

<img src="../assets/Redis笔记/media/image150.png" style="width:5.75in;height:0.78125in" />

添加元素的源码如下：

<img src="../assets/Redis笔记/media/image151.png" style="width:5.75in;height:2.05208in" />

总结下来，Intset可以看做是特殊的整数数组，具备如下特点：

Redis会确保Intset中的元素唯一、有序

具备类型升级机制，可以节省内存空间

底层采用二分查找方式来查询

**3.Dict**

**3.1 Dict的结构**

Redis是一个键值型数据库，可以根据键实现快速的增删改查。而键与值的映射关系正是通过Dict实现的。

Dict由三部分组成，分别是：哈希表（DictHashTable）、哈希节点（DictEntry）、字典（Dict）

<img src="../assets/Redis笔记/media/image152.png" style="width:5.75in;height:1.28125in" />

哈希表实际上是一个数组，其中：

dictEntry \*\*table：一个DictEntry类型的数组指针，数组内保存的是指向一个个DictEntry对象的指针

size：哈希表数组的大小，默认为4，总是2的幂次方

siezmask：哈希表大小的掩码，总等于size - 1

used：哈希表数组中已存在的entry的个数

向Dict添加键值对时，Redis首先根据key计算出hash值h，然后利用h & sizemask（等同于h对size求余）计算元素应该存储到数组中的哪个索引位置。

*h & sizemask相当于 h % size，由于size总是2的幂次方，对应二进制总是一位为1，其余位为0，所以size - 1即siezmask的二进制就是1后面所有位是1（不包含原来的1），其余位是0，而h % size就是得到size中1后面所有低位对应h二进制中的数据，恰好是h & sizemask：*

<img src="../assets/Redis笔记/media/image153.png" style="width:5.75in;height:0.54167in" />

若此时要插入两个键值对k1-v1、k2-v2，加入k1计算出的hash值h = 1，1 & 3 = 1，所以存储在数组索引为1的位置，假如k2计算出也要存放在数组索引为1的位置，就会发生Hash冲突，Redis会将两个哈希结点形成链表，把k2-v2采用头插法插入链表头部（table指向链表第一个哈希节点，采用尾插法需要遍历找到最后一个节点再插入，效率低）：

<img src="../assets/Redis笔记/media/image154.png" style="width:5.75in;height:0.92708in" />

接下来看看字典的结构：

<img src="../assets/Redis笔记/media/image155.png" style="width:5.75in;height:0.9375in" />

<img src="../assets/Redis笔记/media/image156.png" style="width:5.75in;height:1.73958in" />

**3.2 Dict的扩容**

Dict中的HashTable就是数组结合单向链表的实现，当集合中元素较多时，必然导致哈希冲突增多，链表过长，则查询效率会大大降低。

Dict在每次新增键值对时都会检查负载因子（LoadFactor = used/size） ，以下两种情况都会触发哈希表扩容：

哈希表的 LoadFactor \>= 1，并且服务器没有执行 BGSAVE 或者 BGREWRITEAOF 等后台进程

哈希表的 LoadFactor \> 5

扩容的源码如下：

<img src="../assets/Redis笔记/media/image157.png" style="width:5.75in;height:1.82292in" />

**3.3 Dict的收缩**

Dict除了扩容以外，每次删除元素时，也会对负载因子做检查，当LoadFactor \< 0.1时，会做哈希表收缩：

<img src="../assets/Redis笔记/media/image158.png" style="width:5.75in;height:2.27083in" />

扩容和收缩都会调用dictExpand方法，其源码如下：

<img src="../assets/Redis笔记/media/image159.png" style="width:5.75in;height:7.47917in" />

**3.4 Dict的rehash**

不管是扩容还是收缩，必定会创建新的哈希表，导致哈希表的size和sizemask变化，而key的查询与sizemask有关。因此必须对哈希表中的每一个key重新计算索引，插入新的哈希表，这个过程称为rehash。rehash的流程如下：

计算新hash表的realeSize，值取决于当前要做的是扩容还是收缩：

如果是扩容，则新size为第一个大于等于dict.ht\[0\].used + 1的2^n

如果是收缩，则新size为第一个小于等于dict.ht\[0\].used的2^n （不得小于4）

按照新的realeSize申请内存空间，创建dictht，并赋值给dict.ht\[1\]

设置dict.rehashidx = 0，标示开始rehash

将dict.ht\[0\]中的每一个dictEntry都rehash到dict.ht\[1\]

将dict.ht\[1\]赋值给dict.ht\[0\]，给dict.ht\[1\]初始化为空哈希表，释放原来的dict.ht\[0\]的内存

将rehashidx赋值为-1，代表rehash结束

执行过程截图：

<img src="../assets/Redis笔记/media/image160.png" style="width:5.75in;height:2.73958in" />

但是rehash是在执行增删操作时判断是否要执行rehash，而这些操作是在Redis的主进程中进行的，若一次迁移太多的entry会导致主进程阻塞，直至完成rehash后才能处理新命令。

因此，Dict的rehash并不是一次性完成的，如果entry太多，rehash就可能导致主进程阻塞，因此实际Dict的rehash是分多次、渐进式的完成，因此称为**渐进式rehash**。渐进式rehash相比rehash的流程变化：

计算新hash表的realeSize，值取决于当前要做的是扩容还是收缩：

如果是扩容，则新size为第一个大于等于dict.ht\[0\].used + 1的2^n

如果是收缩，则新size为第一个小于等于dict.ht\[0\].used的2^n（不得小于4）

按照新的realeSize申请内存空间，创建dictht，并赋值给dict.ht\[1\]

设置dict.rehashidx = 0，标示开始rehash

*~~将dict.ht\[0\]中的每一个dictEntry都rehash到dict.ht\[1\]~~*

每次执行增删改查时，都检查一下 dict.rehashidx 是否大于-1，如果是则将dict.ht\[0\].table\[rehashidx\]的entryl链表rehash到dict.ht\[1\]，并且将rehashidx++，直至dict.ht\[0\]的所有数据都rehash到dict.ht\[1\]

将dict.ht\[1\]赋值给dict.ht\[0\]，给dict.ht\[1\]初始化为空哈希表，释放原来的dict.ht\[0\]的内存

将rehashidx赋值为-1，代表rehash结束

在rehash过程中，新增操作，则直接写入ht\[1\]，查询、修改和删除由于不确定数据在dict.ht\[0\]还是dict.ht\[1\]，会在dict.ht\[0\]和dict.ht\[1\]依次查找并执行命令，这样可以确保ht\[0\]的数据只减不增，随着rehash最终为空

**4.ZipList**

**4.1 ziplist结构**

dict由数组 + 单向链表实现，数据存储不连续，需要使用指针相互关联，这种方式主要问题是内存浪费，容易产生内存碎片，而且指针本身也需要字节空间。

ziplist是一种压缩存储结构，用于存储字符串或整数，它使用一系列特殊编码的连续内存块存储数据，可以把它看做特殊的双端链表（类似数组，但是每个节点长度不一致）。ziplist需要通过记录结点长度来推算出前后节点的位置，它可以在任一端进行压入/弹出操作，并且该操作时间复杂度为O(1)。

ziplist结构如下：

<img src="../assets/Redis笔记/media/image161.png" style="width:5.75in;height:1.71875in" />

zlbytes：类型uint32_t，长度4 字节，记录整个压缩列表占用的内存字节数

zltail：类型uint32_t，长度4 字节，记录压缩列表表尾节点距离压缩列表的起始地址有多少字节，通过这个偏移量，可以确定表尾节点的地址

zllen：类型uint16_t，长度2 字节，记录了压缩列表包含的节点数量。最大值为UINT16-MAX（65534），如果超过这个值，此处会记录为65535，但节点的真实数量需要遍历整个压缩列表才能计算得出

entry：压缩列表包含的各个节点，节点的长度由节点保存的内容决定，长度不定

zlend：类型uint8_t，长度1 字节，特殊值0xFF（十进制255），用于标记这是压缩列表的末端

**4.2 ZipListEntry结构**

ZipList 中的Entry并不像普通链表那样记录前后节点的指针，因为记录两个指针要占用16个字节，浪费内存。而是采用了下面的结构：

<img src="../assets/Redis笔记/media/image162.png" style="width:5.75in;height:0.34375in" />

previous_entry_length：前一个节点的长度，占1个或5个字节

如果前一节点的长度小于254字节，则采用1个字节来保存这个长度值

如果前一节点的长度大于254字节，则采用5个字节来保存这个长度值，第一个字节为0xfe，后四个字节才是真实长度数据

encoding：编码属性，记录content的数据类型（字符串还是整数）以及长度，占用1个、2个或5个字节

contents：负责保存节点的数据，可以是字符串或整数

要获得下一节点的地址，只需用 当前节点的地址 + entry 的长度即可；

要获得前一结点的地址，只需用 当前节点的地址 - previous_entry_length 即可；

ZipList中所有存储长度的数值均采用**小端字节序**，即低位字节在前，高位字节在后。例如：数值0x1234，采用小端字节序后实际存储值为：0x3412（十六进制两位对应一个字节）；

如果列表数据过多，导致链表过长，查询中间的某个数据时要经过多次计算寻址，可能影响查询性能。

**4.3 Encoding编码**

ZipListEntry中的encoding编码分为字符串和整数两种：

**字符串**：如果encoding是以“00”、“01”或者“10”开头，则证明content是字符串

<img src="../assets/Redis笔记/media/image163.png" style="width:5.75in;height:0.84375in" />

例如依次存储“ab”和“bc”，previous_entry_length = 0，对应二进制00000000，“a”和“b”的UTF-8编码分别是97、98，即01100001、01100010，“ab”长度为2bytes，所以采用00xxxxxx，对应encoding是00000010，所以ab的entry为：

<img src="../assets/Redis笔记/media/image164.png" style="width:5.75in;height:0.9375in" />

"bc"类似，所以插入“ab”和“bc”后最终ziplist结构为：

<img src="../assets/Redis笔记/media/image165.png" style="width:5.75in;height:0.82292in" />

**整数**：如果encoding是以“11”开始，则证明content是整数，且encoding固定只占用1个字节

<img src="../assets/Redis笔记/media/image166.png" style="width:5.75in;height:1.16667in" />

整数的数据类型只有byte、short、int、long，对应的数据分别为1、2、4、8个字节，所以整数只要确定了类型，其content的长度就确定了，所以整数编码无需保存content的长度。

为了更加节省空间，将剩下的1111xxxx中后四位用来存放代替content存放数据，由于0000和1110已经被使用，所以这四位只能存放0001~1101范围的数据，减一后结果为实际值，这样在0~12范围内的整数不再需要content。

例如，一个ZipList中包含两个整数值："2"和"5"，其Entry结构和整个ZipList结构如下：

<img src="../assets/Redis笔记/media/image167.png" style="width:5.75in;height:2.08333in" />

**4.4 连锁更新问题**

ZipList的每个Entry都包含previous_entry_length字段来记录上一个节点的大小。这个字段的长度是1个或5个字节：

如果前一节点的长度小于254字节，则采用1个字节来保存这个长度值

如果前一节点的长度大于等于254字节，则采用5个字节来保存这个长度值，其中第一个字节为0xfe，后四个字节才是真实长度数据

假设有N个连续的、长度为250~253字节之间的entry，因此entry的previous_entry_length属性用1个字节即可表示，如图所示：

<img src="../assets/Redis笔记/media/image168.png" style="width:5.75in;height:0.85417in" />

若此时在表头插入一个长度为254字节的entry，原来表头entry的previous_entry_length就要从1个字节变为5个字节，那么这个entry的长度就变成254字节。原来第二个entry为了记录前面entry的长度，它的previous_entry_length也要从1个字节变为5个字节，它的长度也变成254字节，又会引起后面一个entry的previous_entry_length变大...：

<img src="../assets/Redis笔记/media/image169.png" style="width:5.75in;height:0.65625in" />

ZipList这种特殊情况下产生的连续多次空间扩展操作称之为连锁更新。新增、删除都可能导致连锁更新，但是连锁更新发生概率很低，所以不用在意。

如果接受不了连锁更新，可以更新Redis到7.0以上版本，在Redis 5版本中，引入了ZipList的替代版本ListPack。ListPack移除了prevlen字段，采用了不同的结构来存储数据，Redis 5只是将ListPack用于Stream，从7.0以后才全面替代 ZipList，从而解决了连锁更新的问题。

总结下来，ZipList具有以下特性：

压缩列表的可以看做一种连续内存空间的"双向链表"

列表的节点之间不是通过指针连接，而是记录上一节点和本节点长度来寻址，内存占用较低

如果列表数据过多，导致链表过长，可能影响查询性能

增或删较大数据时有可能发生连续更新问题

**5.QuickList**

由于ZipList申请的内存必须是连续的，如果内存占用较大，申请效率会很低，所以需要限制ZipList的长度和entry大小，若要存储大量数据，超出ZipList最佳上限，就需要使用多个ZipList分片存储数据，这时就要一个数据结构用来管理这些ZipList分片，QuickList就是用来管理多个ZipList，保证他们之间联系的数据结构。

QuickList是Redis3.2引入的数据结构，它是一个双端链表，只不过链表中的每个节点都是一个ZipList。QuickList结合了ZipList和双向链表的优点，旨在提供高效的内存利用率和快速的插入、删除操作，其结构如下：

<img src="../assets/Redis笔记/media/image170.png" style="width:5.75in;height:1.20833in" />

为了避免QuickList中的每个ZipList的entry过多，Redis提供了配置项list-max-ziplist-size来限制：

正值代表ZipList的允许的entry个数的最大值

负值代表ZipList的最大内存大小，分5种情况：

-1：每个ZipList的内存占用不能超过4kb

-2：每个ZipList的内存占用不能超过8kb

-3：每个ZipList的内存占用不能超过16kb

-4：每个ZipList的内存占用不能超过32kb

-5：每个ZipList的内存占用不能超过64kb

可以通过config get\|set list-max-ziplist-size查看或临时修改list-max-ziplist-size，也可以在配置文件中修改，默认值是 -2

除了控制ZipList的大小，QuickList还可以对节点的ZipList做压缩，通过配置项list-compress-depth来控制：

0：特殊值，代表不压缩

1：标示QuickList的首尾各有1个节点不压缩，中间节点压缩

2：标示QuickList的首尾各有2个节点不压缩，中间节点压缩

......以此类推

同样通过config get\|set list-compress-depth查看或临时修改list-max-ziplist-size，也可以在配置文件中修改，默认值是 0

QuickList和QuickListNode的结构源码：

<img src="../assets/Redis笔记/media/image171.png" style="width:5.75in;height:2.0625in" />

QuickList和QuickListNode的结构内存图：

<img src="../assets/Redis笔记/media/image172.png" style="width:5.75in;height:2.14583in" />

*当向QuickList中插入1个元素时，Redis会根据一定的策略选择一个合适的quicklistNode，并将元素插入到该节点中。如果插入操作导致quicklistNode中的元素数量超过了一定的阈值（由list-max-ziplist-size参数决定），Redis会将该节点拆分成两个节点。同样，如果删除操作导致quicklistNode中的元素数量过少，Redis会将相邻的两个节点合并成一个节点。*

总结下来，QuickList的特点如下：

是一个节点为ZipList的双端链表

节点采用ZipList，解决了传统链表的内存占用问题

控制了ZipList大小，解决连续内存空间申请效率问题

中间节点可以压缩，进一步节省了内存

**6.SkipList**

SkipList即跳表，是为了解决有序集合的高效查找、插入和删除操作而设计的，它结合了平衡树和链表的优点，既保持了数据的有序性，又提供了快速的访问速度。

SkipList首先是链表，但与传统链表相比有几点差异：

元素按照升序排列存储

节点可能包含多个指针，指针跨度不同（多级指针）

<img src="../assets/Redis笔记/media/image173.png" style="width:5.75in;height:1.5in" />

SkipList结构定义如下：

<img src="../assets/Redis笔记/media/image174.png" style="width:5.75in;height:1.05208in" />

ele：结点的值，类型是动态字符串

score：结点的分数，按分数对结点升序排列存储，用于排序和查找

\*backward：前一个结点的指针

level\[\]：多级索引数组，每个结点包含的指针数量不确定，首节点的最多，中间节点的较少，故用数组保存；这些指针分布在不同的层级上，用于实现多级索引；每个指针包括指向下一节点的指针和该指针的跨度

SkipList内存结构：

<img src="../assets/Redis笔记/media/image175.png" style="width:5.75in;height:2.0625in" />

**查找操作**：

从最高层开始，通过前进指针逐层向下查找

如果当前节点的下一个节点的值小于要查找的值，则向右移动；如果大于要查找的值，则向下移动

重复上述过程，直到找到目标节点或确定目标节点不存在

**插入操作**：

首先进行查找操作，找到插入位置

随机生成一个层数，根据这个层数在每一层插入新节点

更新相关节点的前进指针和跨度

*SkipList的一个关键特性是它允许节点在不同的层级上存在。为了确定新节点的层级，通常会使用一个概率模型来随机选择。例如，可以设置一个预设值p（通常是一个小于1的常数），然后生成一个0到1之间的随机数。如果这个随机数小于p，就将节点的层数加1，直到达到一个预设的最大层数或者随机数不再小于p为止。这个过程确保了节点层级的随机性，从而有助于保持SkipList的平衡性。*

**删除操作**：

首先进行查找操作，找到要删除的节点

然后在每一层删除这个节点，并调整相关节点的前进指针和跨度

总结下来，SkipList的特点：

跳跃表是一个双向链表，每个节点都包含score和ele值

节点按照score值排序，score值一样则按照ele字典排序

每个节点都可以包含多层指针，层数是1到32之间的随机数

不同层指针到下一个节点的跨度不同，层级越高，跨度越大

增删改查效率与红黑树基本一致，实现却更简单

**7.RedisObject**

Redis中的所有数据都是以key-value的形式存放的，存放一个key-value结构需要存储三个内容，key、value、key和value的映射关系，key使用一个存储结构SDS动态字符串就足够了，映射关系通过dict字典维护，但是value包含5种基本的类型（string、list、hash、set、sortedset），为了在同⼀个dict内能够存储不同类型的value，需要一个通用的数据类型，这就是**redisObject**，简写为robj，Redis中所有value都被存储为redisObject类型。

redisObject的结构源码：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>C<br />
typedef struct redisObject {<br />
unsigned type:4; // 数据类型，如字符串、列表、哈希等<br />
unsigned encoding:4; // 编码方式，如int、raw、hashtable等<br />
unsigned lru:LRU_BITS; // Least Recently Used，用于记录对象最近被访问的时间<br />
int refcount; // 引用计数，用于自动内存管理<br />
void *ptr; // 指向实际存储数据的指针<br />
} robj;</td>
</tr>
</tbody>
</table>

type：表示数据对象的类型，用4bit位表示，对应着Redis的五基本数据类型，string、hash、list、set和zset

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>C<br />
#define OBJ_STRING 0<br />
#define OBJ_LIST 1<br />
#define OBJ_SET 2<br />
#define OBJ_ZSET 3<br />
#define OBJ_HASH 4</td>
</tr>
</tbody>
</table>

encoding：底层编码方式，共有11种，占4个bit位，不同的编码方式对应不同的存储结构

lru：记录对象最近被访问的时间，占用24个bit位，用于实现LRU策略（最近最少使用策略）的内存淘汰

refcount：对象引用计数器，通常占用4个字节，用于自动内存管理。当引用计数为0时，表示对象可以被释放。Redis通过引用计数来管理内存，避免内存泄漏

ptr：指向实际存储数据的指针，根据不同的数据类型和编码方式，指向不同的数据结构，32位系统占用4字节，64位系统占用8字节

*64位系统一个redisObject的头信息占用（4 + 4）/ 8 + 24 / 8 + 4 + 8 = 16字节，如果有n个字符串要存储，每个字符串都采用string类型存储，会造成大量空间浪费在头信息上，若采用List集合存储这些字符串，一个redisObject就可以，所以，当有大量数据存储时，尽量选择集合类型进行存储，避免内存浪费*

Redis中会根据存储的数据类型不同，选择不同的编码方式，共包含11种不同类型：

|          |                         |                        |
|----------|-------------------------|------------------------|
| **编号** | **编码方式**            | **说明**               |
| 0        | OBJ_ENCODING_RAW        | raw编码动态字符串      |
| 1        | OBJ_ENCODING_INT        | long类型的整数的字符串 |
| 2        | OBJ_ENCODING_HT         | hash表（字典dict）     |
| 3        | OBJ_ENCODING_ZIPMAP     | 已废弃                 |
| 4        | OBJ_ENCODING_LINKEDLIST | 双端链表               |
| 5        | OBJ_ENCODING_ZIPLIST    | 压缩列表               |
| 6        | OBJ_ENCODING_INTSET     | 整数集合               |
| 7        | OBJ_ENCODING_SKIPLIST   | 跳表                   |
| 8        | OBJ_ENCODING_EMBSTR     | embstr的动态字符串     |
| 9        | OBJ_ENCODING_QUICKLIST  | 快速列表               |
| 10       | OBJ_ENCODING_STREAM     | Stream流               |

Redis有五种基本的数据类型，每种数据类型的使用的编码方式如下：

|              |                                                    |
|--------------|----------------------------------------------------|
| **数据类型** | **编码方式**                                       |
| OBJ_STRING   | int、embstr、raw                                   |
| OBJ_LIST     | LinkedList和ZipList(3.2以前)、QuickList（3.2以后） |
| OBJ_SET      | intset、HT                                         |
| OBJ_ZSET     | ZipList、HT、SkipList                              |
| OBJ_HASH     | ZipList、HT                                        |

RedisObject的作用：

统一对象管理：为Redis中的各种数据类型提供统一的接口，使得Redis能够以一致的方式处理不同类型的数据

内存优化：通过引用计数和LRU机制，实现了自动内存管理和淘汰策略，有效地节省了内存空间，提高了内存利用率

操作一致性：为不同类型的数据提供了统一的操作接口，如获取对象类型、编码方式、值等，保证了操作的一致性

Redis底层数据结构包括SDS、IntSet、Dict、ZipList、QuickList、SkipList，RedisObject对这些底层数据结构进行抽象和封装，其中ptr字段指向实际存储数据的指针，数据的结构由type和encoding共同决定，例如一个RedisObject的type属性为OBJ_LIST，encoding属性为OBJ_ENCODING_QUICKLIST，那么代表的就是一个List，它的值保存在QuickList数据结构，而ptr指针就指向QuickList的对象。

**8.五种不同的数据类型**

**8.1 String类型**

String是Redis中最常见的数据存储类型：

基本编码方式是**RAW**，基于简单动态字符串（SDS）实现，存储上限为512mb

<img src="../assets/Redis笔记/media/image176.png" style="width:5.75in;height:1.10417in" />

如果存储的SDS长度小于44字节，则会采用**EMBSTR**编码，此时RedisObject对象头和SDS是一段连续空间，申请内存时只需要调用一次内存分配函数，效率更高

<img src="../assets/Redis笔记/media/image177.png" style="width:5.75in;height:0.46875in" />

为什么是44字节？SDS头信息中len、alloc、flags各占一字节，字符结束符\0占一字节，字符串内容44字节，整个SDS共占48字节，RedisObject头信息共占16字节，加起来是64字节，Redis中jemalloc是默认的内存分配器，Jemalloc会为不同大小的内存请求分配固定大小的块（这些块的大小通常是2的幂次），在分配内存时会尽量满足内存对齐的要求，以减少由于频繁的内存分配和释放操作导致的内存碎片。64字节刚好是Jemalloc的一个内存分配单位，能把这些数据存储在一个连续的内存块中而不产生内存碎片。

当存储的字符串是整数值，并且大小在LONG_MAX范围内，则会采用**INT**编码，直接将数据保存在RedisObject的ptr指针位置，不再需要SDS：

<img src="../assets/Redis笔记/media/image178.png" style="width:5.75in;height:0.58333in" />

如果整数值超过了LONG_MAX的范围，就会使用**ROW**编码方式，把整数当成字符串存储

最后看一下RAW、EMBSTR、INT三种编码对比加深印象：

<img src="../assets/Redis笔记/media/image179.png" style="width:5.75in;height:2.04167in" />

**8.2 List类型**

Redis的List类型需要从首、尾操作列表中的元素，而且支持根据索引查询，哪个数据结构满足这些要求？

LinkedList ：普通链表，可以从双端访问，内存占用较高，内存碎片较多

ZipList ：压缩列表，可以从双端访问，内存占用低，存储上限低

QuickList：LinkedList + ZipList，可以从双端访问，内存占用较低，包含多个ZipList，存储上限高

在3.2版本之前：Redis采用**ZipList和LinkedList**来实现List，当元素数量小于512并且元素大小小于64字节时采用**ZipList**编码，超过则采用LinkedList编码。

在3.2版本之后：Redis统一采用**QuickList**来实现List：

<img src="../assets/Redis笔记/media/image180.png" style="width:5.75in;height:1.77083in" />

**8.3 Set类型**

Set是Redis中的单列集合，满足下列特点：

不保证有序性

保证元素唯一（需要判断元素是否存在）

求交集、并集、差集

进行集合的操作要查询集合确定重复元素，保证元素唯一也需要查询集合确定是否存在，可以看到，Set集合对查询性能要求很高，很容易考虑到HashTable，对应Dict：

为了查询效率和唯一性，Set采用**HT编码**（Dict）。Dict中的key用来存储元素，value统一为null

当存储的所有数据都是整数，并且元素数量不超过set-max-intset-entries时，Set会采用**IntSet编码**，以节省内存

set-max-intset-entries可以在配置文件中设置，默认为512

当第一次向set中添加元素时会创建新的set，会根据元素的值来决定采用什么编码，创建什么结构来存储？

如果该字符是数值类型，会采用IntSet编码，并创建IntSet存储元素

如果该字符不是数值类型，则会采用HT编码，创建Dict存储元素

<img src="../assets/Redis笔记/media/image181.png" style="width:5.75in;height:1.625in" />

在向set插入元素过程中（非第一次插入）：

若原来的编码类型是HT，则直接插入

若当前的编码是IntSet，需要进行判断。当目前插入的元素不是数值类型或者该元素是数值类型，但成功插入后Set中的元素个数超过了设定值时，该Set的编码会从IntSet切换为HT，并使用Dict存储当前IntSet中的值。若这两个条件都不满足，则继续在原来的IntSet中存储新元素。

<img src="../assets/Redis笔记/media/image182.png" style="width:5.75in;height:4.08333in" />

通过内存图来理解IntSet编码切换为HT编码：

<img src="../assets/Redis笔记/media/image183.png" style="width:5.75in;height:2.38542in" />

**8.4 ZSet类型**

ZSet也就是SortedSet，其中每一个元素都需要指定一个score值和member值：

可以根据score值排序

member必须唯一

可以根据member查询分数

因此，zset底层数据结构必须满足键值存储、键必须唯一、可排序，哪种编码结构可以满足？

SkipList：可排序，并且可以同时存储score和ele值（member），但无法保证键的唯一性，也无法快速根据member找score（只能遍历）

HT（Dict）：可以键值存储，并且可以根据key找value，但无法排序

Zset底层同时使用了这两种编码结构，结合它们的功能满足Zset的需要，ZSet的结构定义如下，在创建ZsetObject对象时，先创建了Zset对象，再为Zset对象创建了Dict和SkipList，并将编码方式设置为**OBJ_ENCODING_SKIPLIST**：

<img src="../assets/Redis笔记/media/image184.png" style="width:5.75in;height:1.125in" />

<img src="../assets/Redis笔记/media/image185.png" style="width:5.75in;height:2.71875in" />

当元素数量不多时，HT和SkipList的优势不明显，而且更耗内存，同一份数据存储了两份。因此zset还会采用**ZipList**结构来节省内存，不过需要同时满足两个条件：

元素数量小于zset_max_ziplist_entries，默认值128

每个元素都小于zset_max_ziplist_value字节，默认值64

但是ziplist本身没有排序功能，而且没有键值对的概念，因此需要通过逻辑编码实现：

ZipList是连续内存，因此score和element是紧挨在一起的两个entry，element在前，score在后

score越小越接近队首，score越大越接近队尾，按照score值升序排列

<img src="../assets/Redis笔记/media/image186.png" style="width:5.75in;height:1.16667in" />

**ZipList实现ZSet源码分析**：

创建Zset：在zadd添加元素时，先根据key找到zset，不存在则创建新的zset。创建时判断配置文件中zset_max_ziplist_entries值是否为0，设置为0就是禁用了zipList，或者value大小超过了zset_max_ziplist_value，此时采用HT和SKipList结合方案，否则采用ZipList：

<img src="../assets/Redis笔记/media/image187.png" style="width:5.75in;height:1.91667in" />

向Zset中添加元素时，首先判断编码方式，若本身是SKIPLIST编码，无序转换。否则，可能存在编码转换的可能：

<img src="../assets/Redis笔记/media/image188.png" style="width:5.75in;height:4.21875in" />

**8.5 Hash类型**

Redis中的Hash结构与Zset非常类似：键值存储、根据键获取值、键唯一，区别如下：

zset的键是member，值是score；hash的键和值都是任意值

zset要根据score排序；hash则无需排序

所以Hash底层采用的编码与Zset也基本一 致，只是没有SkipList。

Hash结构默认采用**ZipList**编码，用以节省内存，ZipList中相邻的两个entry分别保存field和value：

<img src="../assets/Redis笔记/media/image189.png" style="width:5.75in;height:1.08333in" />

当数据量较大时，Hash结构会转为**HT编码**，也就是Dict，触发条件有两种：

ZipList中的元素数量超过了hash-max-ziplist-entries（默认512）

ZipList中的任意entry大小超过了hash-max-ziplist-value（默认64字节）

<img src="../assets/Redis笔记/media/image190.png" style="width:5.75in;height:1.29167in" />

**源码分析**：

创建Hash结构时默认采用ZipList编码，由于存在两种编码格式，在添加元素时可能会发生格式转换：

<img src="../assets/Redis笔记/media/image191.png" style="width:5.75in;height:3.58333in" />

**七、Redis网络模型**

**1.用户空间和内核空间**

ubuntu和Centos都是Linux的发行版，发行版可以看成对linux包了一层壳，任何Linux发行版，其系统内核都是Linux。

Redis、MySQL等用户应用无法直接执行访问系统硬件，需要通过发行版的这个壳子访问内核，再通过内核访问计算机硬件。

计算机硬件包括CPU、内存、网卡等，内核通过寻址空间可以操作硬件，但是内核需要不同设备的**驱动**，有了这些驱动后就可以对计算机硬件进行内存管理，文件系统管理，进程管理等等。

<img src="../assets/Redis笔记/media/image192.png" style="width:5.75in;height:2.0625in" />

用户应用想要访问计算机硬件，计算机就必须对外暴露的一些**接口**才能访问到，从而间接实现对内核的操控，但是内核本身也是一个应用，也需要一些内存、CPU等设备资源，用户应用也在消耗这些资源。为了避免了用户程序随意操作系统资源，错误或恶意执行危险指令（如清空内存、修改时钟），就需要把用户和内核隔离开。所以进程的寻址空间被划分成**内核空间**和**用户空间**，也就是内核态和用户态。

用户空间和内核空间都无法直接访问物理内存，而是通过分配**虚拟内存**映射到物理内存，通过虚拟内存可以将内核空间与用户空间隔离开来，避免用户程序错误地或恶意地访问内核空间。在32位Linux操作系统中，虚拟内存空间大小为 4GB，高位的1G空间作为内核空间，低位的3G空间作为用户空间。

<img src="../assets/Redis笔记/media/image193.png" style="width:5.75in;height:2.21875in" />

在linux中权限分成两个等级，0和3，用户空间只能执行受限的命令（Ring3），不能直接调用系统资源，必须通过内核提供的接口来访问。内核空间可以执行特权命令（Ring0），调用一切系统资源。一般情况下，用户操作运行在用户空间，内核运行的数据在内核空间，而有些情况下，应用程序需要调用一些特权资源，去调用一些内核空间的操作，此时需要在用户态和内核态之间进行切换。

**2.Linux IO模型**

Linux系统为了提高IO效率，会在用户空间和内核空间都加入缓冲区：

写数据时，把用户缓冲数据拷贝到内核缓冲区，然后写入设备

读数据时，从设备读取数据到内核缓冲区，然后拷贝到用户缓冲区

用户读数据时，向内核态申请读取内核的数据，而内核数据要等待驱动程序从硬件上读取数据，当从磁盘上加载到数据之后，内核会将数据写入到内核的缓冲区中，然后再将数据拷贝到用户态的缓冲区中，返回给应用程序：

<img src="../assets/Redis笔记/media/image194.png" style="width:5.75in;height:2.5625in" />

该过程主要的时间花费在用户等待数据就绪以及用户态和内核态数据缓冲区之间的数据拷贝。为了提高IO效率，Linux的五种不同的IO模型就是在等待数据就绪和读取数据这两个阶段做了不同的处理：

<img src="../assets/Redis笔记/media/image195.png" style="width:5.75in;height:1.30208in" />

五种IO模型：

阻塞IO（Blocking IO）

非阻塞IO（Nonblocking IO）

IO多路复用（IO Multiplexing）

信号驱动IO（Signal Driven IO）

异步IO（Asynchronous IO）

**2.1 阻塞IO**

阻塞IO分为两个阶段，数据从硬件读取到内核缓冲区 和 内核拷贝缓冲区数据到用户缓冲区，阻塞IO的这两个阶段都是阻塞的：

<img src="../assets/Redis笔记/media/image196.png" style="width:5.75in;height:1.875in" />

当应用程序调用IO函数（如read或write）时，如果数据没有准备好，用户进程会被阻塞，直到数据准备好并被复制到应用程序的缓冲区中。在阻塞期间，进程无法执行其他任务，阻塞 IO 的阻塞期间不会占用 CPU 资源。

**2.2 非阻塞IO**

非阻塞IO的recvfrom操作会立即返回结果而不是阻塞用户进程，如果数据没有准备好，函数会立即返回一个错误码（如EWOULDBLOCK），表示当前没有数据可读或可写。用户程序需要不断轮询内核，检查数据是否准备好，这会导致CPU资源的浪费：

<img src="../assets/Redis笔记/media/image197.png" style="width:5.75in;height:1.88542in" />

非阻塞IO模型中，用户进程第一个阶段是非阻塞，第二个阶段是阻塞状态。虽然是非阻塞，但性能并没有得到提高。而且忙等机制会导致CPU空转，CPU使用率暴增。

**2.3 IO多路复用**

无论是阻塞IO还是非阻塞IO，用户应用在第一阶段都需要调用recvfrom获取数据，差别在于无数据时的处理方案：

如果调用recvfrom时，恰好没有数据，阻塞IO使CPU阻塞，非阻塞IO使CPU空转，都不能充分发挥CPU的作用

如果调用recvfrom时，恰好有数据，则用户进程可以直接进入第二阶段，读取并处理数据

比如服务端处理客户端Socket请求时，单线程情况下只能依次处理每一个socket，如果正在处理的socket恰好未就绪（数据不可读或不可写），线程就会被阻塞，所有其它客户端socket都必须等待，性能自然会很差。解决方式是利用单个线程监听多个socket，当socket就绪时用户应用再读取数据，监听过程线程处于休眠状态。

文件描述符：简称**FD**，是一个从0开始递增的无符号整数，用来关联Linux中的一个文件。在Linux中，一切皆文件，例如常规文件、视频、硬件设备等，当然也包括网络套接字socket。

**IO多路复用**是利用单个线程同时监听多个FD，并在某个FD可读、可写时得到通知，从而避免无效的等待，充分利用CPU资源

<img src="../assets/Redis笔记/media/image198.png" style="width:5.75in;height:1.97917in" />

Linux系统监听FD的方式、通知的方式有多种实现，常见的有**select**、**poll**和**epoll**，它们是Linux提供的用于监听多个文件描述符状态的系统调用，这些系统调用允许程序将一组文件描述符注册到监听队列中，当其中任何一个文件描述符的状态发生变化时（如可读、可写或发生错误），系统调用会返回并通知应用程序。

**2.3.1 select实现IO多路复用**

select是Linux中最早的I/O多路复用实现方案，源码如下：

<img src="../assets/Redis笔记/media/image199.png" style="width:5.75in;height:2.16667in" />

数组fds_bits每个元素占用4 \* 8 = 32个bit，数组长度为32，所以数组可以表示32 \* 32 = 1024bit，其中每个比特位监听一个FD文件，将来要监听哪个FD，就把对应位置（自低位从1开始）比特为置为1，如1,2,5要监听对应的就是...00010011。

select方式进行IO多路复用的流程如下：

假设现在的IO都是读操作，创建fd_set rfds（rfds是readfds简写），初始时将所有比特位都置为零

假如要监听 fd = 1，2，5，将rfds中对应的比特位置为1

调用select函数（这里执行 select(5 + 1, rfds, null, null, 3) ）将这些fd信息拷贝到内核空间，内核负责对这些fd进行监听

内核遍历rfds，从最低位开始，到传入的最大值 nfds - 1 为止，判断这个范围内被标记的fd是否已经就绪

若当前没有就绪的fd，休眠等待数据就绪被唤醒或超时

<img src="../assets/Redis笔记/media/image200.png" style="width:5.75in;height:1.90625in" />

当有fd就绪时，内核遍历rfds找到被监听的fd，将其与已就绪的fd比较，相同则保留，其余的fd置为0，之后内核将自己的rfds拷贝回用户空间的rfds，此时rfds中保存的是已就绪的fd，并且select函数返回已就绪fd的数量

<img src="../assets/Redis笔记/media/image201.png" style="width:5.75in;height:1.80208in" />

最后用户进程遍历fd_set，找到就绪的fd，读取其中的数据

如果还有未就绪的fd或者其他数据，线程按照上述流程将要读取的fd添加到rfds中（一个fd可能循环拷贝多次）传到内核中进行监听，再次执行一次上述流程，循环往复处理读写数据请求。

select模式存在的问题：

需要将整个fd_set从用户空间拷贝到内核空间，select结束还要再次拷贝回用户空间

select无法得知具体是哪个fd就绪，需要遍历整个fd_set fd_set

监听的fd数量不能超过1024

**2.3.2 poll实现IO多路复用**

poll模式对select模式做了简单改进，但性能提升不明显，源码如下：

<img src="../assets/Redis笔记/media/image202.png" style="width:5.75in;height:2.14583in" />

poll方式实现IO多路复用的流程如下：

用户进程调用poll()函数：

用户进程通过调用poll()函数，将需要监听的fd及其关注的事件类型（如读就绪、写就绪等）传递给内核

传递给poll()函数的是一个pollfd结构体数组，每个结构体中包含了一个文件描述符和该文件描述符所关注的事件类型

内核处理poll()请求：

内核接收到poll()调用后，会将这些文件描述符和事件类型注册到内核内部的监听列表中（转链表存储，无上限）

内核会监视这些文件描述符的状态，当其中一个或多个文件描述符的事件就绪时，内核会进行相应的处理

内核通知用户进程：

当内核检测到某个fd的事件已经就绪时，它会修改该fd的pollfd结构体中的revents为已就绪，并将pollfd结构体数组从内核空间拷贝回用户空间，并返回就绪fd数量

用户进程处理就绪事件：

用户进程通过调用poll()函数，阻塞等待直到有文件描述符就绪或者超时

当poll()函数返回时，用户进程通过遍历pollfd结构体数组中的revents成员，可以得知哪些文件描述符的事件已经就绪，进而可以读取对应fd的数据

poll和select对比：

select模式中的fd_set大小固定为1024，而pollfd在内核中采用链表，理论上无上限

poll()函数在内核中是通过轮询方式来检查文件描述符的状态，监听FD越多，每次遍历消耗时间也越久，性能反而会下降

**2.3.3 epoll实现IO多路复用**

**epoll工作原理和实现流程**

epoll是对select和poll的改进，能够显著减少数据复制的开销并提高系统资源的利用率，工作原理如下：

**事件驱动**：epoll采用事件通知机制，只有文件描述符FD有事件发生时（比如FD就绪）才会被通知，与select和poll的轮询机制相比，epoll避免了无效轮询，提高了处理效率

**数据结构**：epoll使用红黑树和就绪链表管理文件描述符FD，红黑树用于快速查找和管理注册的文件描述符，就绪列表则用于存储已经就绪的文件描述符

**回调机制**：epoll通过回调函数来通知用户进程文件描述符的事件状态，当事件发生时，内核会调用相应的回调函数，将事件信息添加到就绪链表中

epoll方式实现IO多路复用的流程如下：

epoll_create：在内核创建eventpoll结构体，返回对应的句柄epfd，即该eventpoll的唯一标识。每一个句柄epfd对应一个eventpoll

<img src="../assets/Redis笔记/media/image203.png" style="width:5.75in;height:1.61458in" />

epoll_ctl：将一个FD添加到eventpoll的红黑树中并对其进行监听，但不会等待FD就绪，而是对该FD设置事件发生时的回调函数ep_poll_callback，当要监听的事件发生时，自动调用该回调函数，把对应的FD加入到就绪链表list_head中

<img src="../assets/Redis笔记/media/image204.png" style="width:5.75in;height:1.85417in" />

epoll_wait：将FD添加到红黑树中后，调用epoll_wait 检查就绪链表是否为空，不为空则返回就绪的FD的数量，同时将就绪链表中的FD拷贝到用户空间的events数组中（只拷贝就绪的FD），如果epoll_wait为空就等待FD就绪

<img src="../assets/Redis笔记/media/image205.png" style="width:5.75in;height:1.95833in" />

小总结：

select模式存在的三个问题：

能监听的FD最大不超过1024

每次select都需要把所有要监听的FD都拷贝到内核空间

每次都要遍历所有FD来判断就绪状态

poll模式的问题：

poll利用链表解决了select中监听FD上限的问题，但依然要遍历所有FD，如果监听较多，性能会下降

epoll模式中如何解决这些问题的？

基于epoll实例中的红黑树保存要监听的FD，理论上无上限，而且增删改查效率都非常高

每个FD只需要执行一次epoll_ctl添加到红黑树，以后每次epol_wait无需传递任何参数，无需重复拷贝FD到内核空间

利用ep_poll_callback机制来监听FD状态，无需遍历所有FD，因此性能不会随监听的FD数量增多而下降

**事件通知机制**

在IO多路复用中，事件通知机制主要有两种触发模式LT和ET，它们定义了当文件描述符上的事件发生时（如FD就绪），内核如何通知用户进程，并且用户进程应该如何处理这些事件：

水平触发LT：

工作原理：当FD有数据可读时，每次调用epoll_wait都会返回该事件（**会重复通知多次**），直至数据处理完成，是Epoll的默认模式

特点：LT模式相对简单直观，用户进程可以在每次调用epoll_wait时处理一部分数据，而不必担心遗漏事件，但如果事件处理不及时，可能会导致事件堆积，增加处理复杂度

边缘触发ET：

工作原理：当FD有数据可读时，**只会被通知一次**，不管数据是否处理完成，用户进程必须确保接收到通知后一次性处理完所有就绪的事件，否则可能会遗漏后续的事件

特点：ET模式要求用户进程对事件进行高效处理，以避免遗漏，通常与非阻塞IO结合使用，可以提高系统的吞吐量和响应速度，但实现起来相对复杂，需要用户进程仔细管理事件的处理逻辑

在epoll模式中，将就绪链表list_head中的FD拷贝到用户空间events数组之前，会先将就绪的FD从list_head移除，假设第一次没有拷贝完FD的数据，若采用LT模式拷贝完会将这些FD重新添加回list_head，若采用ET模式则不会添加回list_head。

<img src="../assets/Redis笔记/media/image206.png" style="width:5.75in;height:1.67708in" />

例如：

假设一个客户端socket对应的FD已经注册到了epoll实例中

客户端socket发送了2kb的数据

服务端调用epoll_wait，得到通知说FD就绪

服务端从FD读取了1kb数据回到步骤3

再次调用epoll_wait，形成循环

若采用LT模式，因为FD中仍有1kb数据，第5步依然返回结果并得到通知

若采用ET模式，因为第3步已经消费了FD，第5步FD状态并没有变化，因此epoll_wait不会返回，数据无法读取，客户端响应超时

在实际应用中，应根据应用场景和需求选择LT模式还是ET模式：

LT模式适用于可以容忍一定延迟，但希望简化事件处理逻辑的应用场景

ET模式适用于需要高效处理大量并发事件，对延迟敏感的应用场景，如高性能网络服务器

**基于epoll的服务器端流程**

<img src="../assets/Redis笔记/media/image207.png" style="width:5.75in;height:2.1875in" />

服务器启动时，在服务端调用epoll_create创建epoll实例，即在内核中创建红黑树（管理监听FD）和就绪链表（存储就绪FD）

创建serverSocket，得到一个服务端监听套接字的文件描述符，记为ssfd

ssfd专门用于监听客户端的连接请求，有客户端连接服务器时才会被唤醒

调用epoll_ctl将ssfd添加到红黑树中，并指定监听的事件类型（通常是读就绪事件EPOLLIN），同时注册FD就绪时的回调函数ep_poll_callback

进入事件循环，调用epoll_wait函数等待ssfd上有事件发生（其实就是等待有客户端连接服务器）

等待指定时间后若无事件发生（一段时间内无客户端连接服务器），则再次调用epoll_wait

当被监听的fd上有事件发生时（有客户端连接服务器），根据epoll_wait返回的事件类型，进行相应的处理

如果是读就绪事件EPOLLIN，判断是不是ssfd可读

如果ssfd发生读就绪事件，即有客户端进行连接，调用accpt()函数接收客户端socket，得到客户端socket的FD，并调用epoll_ctl为客户端socket添加监听

如果不是ssfd发生读就绪事件，即发生的是客户端socket的读就绪事件，代表客户端socket发送了命令，使用read()或recv()函数读取客户端发送的数据，进行处理后返回响应

如果客户端连接关闭或发生错误（EPOLLERR事件），则使用close()函数关闭客户端套接字，并从epoll树中删除这个客户端socket的FD

循环处理事件，重复步骤4-9，继续等待并处理下一个事件，直到服务器进程被终止

**2.4 信号驱动IO**

信号驱动IO允许用户进程通过注册一个 信号处理函数 来异步接收数据可用的通知。当设备数据可用时，内核会向用户进程发送一个SIGIO信号，触发用户进程预先注册的信号处理函数，进而执行相应的IO操作，期间用户应用可以执行其它业务，无需阻塞等待：

<img src="../assets/Redis笔记/media/image208.png" style="width:5.75in;height:2.28125in" />

与其他IO模型的比较：

与阻塞IO相比，信号驱动IO避免了用户进程在IO操作完成前的阻塞，提高了IO效率

与非阻塞IO相比，信号驱动IO不需要用户进程通过轮询方式不断尝试读写文件描述符，减少了CPU资源的浪费

与IO复用（select、poll、epoll）相比，信号驱动IO通过信号机制实现IO操作的异步通知，不需要进程主动调用轮询函数来检查IO状态

与异步IO相比，信号驱动IO仍然需要用户进程在信号处理函数中执行IO操作，而异步IO则完全由内核处理IO操作，并在完成后通知用户进程

当有大量IO操作时，信号较多，SIGIO处理函数不能及时处理可能导致信号队列溢出而且内核空间与用户空间的频繁信号交互性能也较低。

**2.5 异步IO**

异步IO的整个过程都是非阻塞的，用户进程调用完异步API后就可以去做其它事情，内核等待数据就绪并拷贝到用户空间后才会递交信号，通知用户进程：

<img src="../assets/Redis笔记/media/image209.png" style="width:5.75in;height:2.13542in" />

**优点**

高性能：异步IO能够在IO操作进行的同时，让CPU去执行其他任务，从而提高系统的整体性能

资源利用率高：异步IO可以让一个线程同时处理多个IO操作，避免了频繁的线程切换，从而提高了CPU和内存的利用率

提高响应速度：由于异步IO不需要等待IO操作完成，可以立即返回执行其他任务，因此可以提高系统的响应速度

高并发处理能力：异步IO可以处理大量的并发IO请求，使得系统能够更有效地处理多个IO操作

**缺点**

编程复杂度增加：异步编程模型相对于同步编程模型更加复杂，因为它涉及到事件循环、回调函数等概念，可能会增加代码的编写和维护成本

错误处理困难：异步编程中可能存在回调地狱(Callback Hell)等问题，导致代码难以理解和调试，容易出现逻辑错误和内存泄漏等问题

调试困难：异步程序中的事件顺序可能比较随机，因此在调试时可能会很难追踪代码的执行流程，特别是当存在大量异步操作时更加困难

资源竞争：如果异步操作涉及共享资源的读写，可能会导致资源竞争和数据一致性问题，需要额外的同步机制来解决

在IO操作中，同步和异步 与 阻塞和非阻塞没有直接关系。IO操作是同步还是异步，关键看数据在内核空间与用户空间的拷贝过程（数据读写的IO操作），也就是阶段二是同步还是异步：

<img src="../assets/Redis笔记/media/image210.png" style="width:5.75in;height:2.44792in" />

**3.Redis网络模型**

**3.1 Redis为什么使用单线程**

**Redis是单线程还是多线程？**

Redis的核心业务部分（命令处理）使用的是单线程，但是整个Redis又使用多线程。

Redis版本迭代过程中在两个重要的时间节点上引入了多线程的支持：

Redis v4.0：引入多线程异步处理一些耗时较长的任务，例如异步删除命令unlink

Redis v6.0：在核心网络模型中引入多线程，进一步提高对于多核CPU的利用率

**为什么Redis要选择单线程？**

抛开持久化不谈，Redis是纯内存操作，执行速度非常快，它的性能瓶颈是网络延迟而不是执行速度，因此多线程并不会带来巨大的性能提升

多线程会导致过多的上下文切换，带来不必要的开销

引入多线程会面临线程安全问题，必然要引入线程锁这样的安全手段，实现复杂度增高，而且性能也会大打折扣

**3.2 Redis单线程网络模型执行流程**

Redis通过IO多路复用来提高网络性能，支持各种不同的多路复用实现，Redis将这些实现进行封装，提供了统一的高性能事件库API库 AE：

<img src="../assets/Redis笔记/media/image211.png" style="width:5.75in;height:1.79167in" />

在ae.c中根据当前系统支持的多路复用方式，引入对应响应的API库，之后调用API时就会调用对应文件中的函数：

<img src="../assets/Redis笔记/media/image212.png" style="width:5.75in;height:1.63542in" />

在Linux系统下，Redis底层使用epoll实现多路复用，分析Redis单线程网络模型的源码：

<img src="../assets/Redis笔记/media/image213.png" style="width:5.75in;height:1.86458in" />

Redis单线程网络模型的代码执行流程如下：

server.c中的main方法是整个服务器的入口，服务器启动时执行main方法

首先，执行initServer()方法初始化服务：先调用aeApiCreate（类似epoll_create）创建epoll实例（红黑树和就绪链表），然后监听TCP端口创建服务端监听套接字ServerSocket并得到FD（就是ssfd），之后注册Socket连接处理器，该处理器内部会调用aeApiAddEvent（类似epoll_ctl）监听ServerSocket的读事件，并为其绑定事件触发（有客户端连接）时的处理器acceptTcpHandler

在acceptTcpHandler中处理ServerSocket上的读事件：接收客户端socket连接，获取客户端FD，将FD关联到客户端连接实例conn上，然后监听客户端socket的读事件，并为其绑定读事件触发时的处理器readQueryFromClient

readQueryFromClient负责处理客户端发来的命令请求：

获取当前客户端实例（客户端的所有内容都在这个实例中），读取客户端的请求数据（可以理解为redis命令）到客户端的读缓冲区 c-\>querybuf

现在读缓冲区中的内容是一个个字节，需要解析这些字节转为Redis命令参数存入 c-\>argv 数组

redis将各种命令都封装成xxxCommand函数，并建立了命令和对应函数的字典，通过命令如set可以得到对应的处理函数如setCommand，所以下一步要从argv数组中得到命令名称，然后根据名称找到对应的command，执行command得到响应结果

之后将响应结果写到客户端写缓冲区 c-\>buf，如果c-\>buf满了写不下，就写到c-\>reply，这是一个链表，容量无上限

最后将客户端添加到server.clients_pending_write这个队列，等待被写出给到客户端

绑定事件触发处理器acceptTcpHandler后，不会立即进行epoll_wait，而是先注册一个ae_api_poll前的处理器，处理器触发时会执行beforeSleep

初始化服务后，执行aeMain方法开始循环监听事件，等待FD就绪，不过在休眠等待FD就绪前，会先调用一次前置处理器beforeSleep，对clients_pending_write这个队列中等待写出的客户端进行处理，依次将其中的数据返回给客户端

最后开始监听FD，执行aeApiPoll（类似以epoll_wait），当有FD就绪时，返回就绪FD的数量，调用对应的处理器处理就绪的FD

<img src="../assets/Redis笔记/media/image214.png" style="width:5.75in;height:2.40625in" />

整体来讲，Redis使用了IO多路复用技术，允许单个线程同时监听多个文件描述符（包括服务端的ServerSocket和客户端的socket），并在有数据可读或可写时将任务派发给不同的处理器进行处理。具体来说：

当服务端的ServerSocket发生读事件时，说明有客户端进行连接，将对应的任务分配给连接应答处理器**tcpAcceptHandler**，获取客户端socket对应的fd，并为其注册监听

当客户端socket发生读事件时，说明有客户端命令请求到达，将对应的任务分配给命令请求处理器**readQueryFromClient**，从客户端读缓冲区c-\>queryBuf中读取命令字符串并解析为Redis命令进行处理，将处理结果写到客户端写缓冲区buf或reply，并将该客户端放入clients_pending_write队列等待数据写回

在每次循环监听fd之前，通过beforesleep方法调用命令回复处理器**sendReplyToClient**处理clients_pending_write队列中的客户端，将存储在客户端输出缓冲区（buf字段）或输出链表（reply字段）中的响应数据发送给客户端

对于redis，监听fd和命令执行单线程完全足够，真正影响性能的永远是IO：

处理客户端命令请求时需从客户端Socket中读出命令，此过程涉及网络IO的读操作，会受到网络带宽等影响

将服务端处理结果写回客户端Socket中也涉及到了网络IO的写操作，这又是一个性能瓶颈

所以Redis 6.0引入了多线程以提高IO读写效率，因此在解析客户端命令、写响应结果时采用了多线程。核心的命令执行、IO多路复用模块依然是由主线程执行：

<img src="../assets/Redis笔记/media/image215.png" style="width:5.75in;height:2.33333in" />

**4.Redis通信协议**

Redis是一个CS架构的软件，通信一般分两步（不包括pipeline和PubSub）：

客户端（client）向服务端（server）发送一条命令

服务端解析并执行命令，返回响应结果给客户端

因此客户端发送命令的格式、服务端响应结果的格式必须有一个规范，这个规范就是**通信协议**。

**4.1 RESP协议**

在Redis中采用的是RESP协议：

Redis 1.2版本引入了RESP协议

Redis 2.0版本中成为与Redis服务端通信的标准，称为RESP2

Redis 6.0版本中，从RESP2升级到了RESP3协议，增加了更多数据类型并且支持6.0的新特性——客户端缓存

但目前默认使用的依然是RESP2协议，下面通称RESP。

在RESP中，通过首字节的字符来区分不同数据类型，常用的数据类型包括5种：

单行字符串：首字节是+，后面跟上单行字符串，以CRLF（\r\n）结尾，例如字符串OK为+OK\r\n

单行字符串的数据中只能包含普通字符串，不允许包含\r\n，是非二进制安全的，通常用于服务端返回的信息

错误（Errors）：首字节是-，后用空格和异常信息隔开，以CRLF结尾，例如-Error message\r\n异常信息是message

数值：首字节是:，后面跟上数字格式的字符串，以CRLF结尾。例如:10\r\n表示数字10

多行字符串：首字节是\$，表示二进制安全的字符串，记录时保存**字符串长度**和**字符串本身**，最大支持512MB：

<img src="../assets/Redis笔记/media/image216.png" style="width:5.75in;height:0.71875in" />

如果大小为0，则代表空字符串："\$0\r\n\r\n"

如果大小为-1，则代表不存在："\$-1\r\n"

数组：首字节是\*，后面跟上数组元素个数，再跟上元素，元素数据类型不限：

<img src="../assets/Redis笔记/media/image217.png" style="width:5.75in;height:0.70833in" />

**4.2 自定义Redis客户端**

Redis支持TCP通信，因此可以使用Socket来模拟客户端，与Redis服务端建立连接：

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td>Java<br />
public class Main {<br />
<br />
static Socket s;<br />
static PrintWriter writer;<br />
static BufferedReader reader;<br />
<br />
public static void main(String[] args) {<br />
try {<br />
// 1.建立连接<br />
String host = "192.168.150.101";<br />
int port = 6379;<br />
s = new Socket(host, port);<br />
// 2.获取输出流、输入流<br />
writer = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), StandardCharsets.UTF_8));<br />
reader = new BufferedReader(new InputStreamReader(s.getInputStream(), StandardCharsets.UTF_8));<br />
<br />
// 3.发出请求<br />
// 3.1.获取授权 auth 123321<br />
sendRequest("auth", "123321");<br />
Object obj = handleResponse();<br />
System.out.println("obj = " + obj);<br />
<br />
// 3.2.set name 虎哥<br />
sendRequest("set", "name", "虎哥");<br />
// 4.解析响应<br />
obj = handleResponse();<br />
System.out.println("obj = " + obj);<br />
<br />
// 3.2.set name 虎哥<br />
sendRequest("get", "name");<br />
// 4.解析响应<br />
obj = handleResponse();<br />
System.out.println("obj = " + obj);<br />
<br />
// 3.2.set name 虎哥<br />
sendRequest("mget", "name", "num", "msg");<br />
// 4.解析响应<br />
obj = handleResponse();<br />
System.out.println("obj = " + obj);<br />
} catch (IOException e) {<br />
e.printStackTrace();<br />
} finally {<br />
// 5.释放连接<br />
try {<br />
if (reader != null) reader.close();<br />
if (writer != null) writer.close();<br />
if (s != null) s.close();<br />
} catch (IOException e) {<br />
e.printStackTrace();<br />
}<br />
}<br />
}<br />
<br />
private static Object handleResponse() throws IOException {<br />
// 读取首字节<br />
int prefix = reader.read();<br />
// 判断数据类型标示<br />
switch (prefix) {<br />
case '+': // 单行字符串，直接读一行<br />
return reader.readLine();<br />
case '-': // 异常，也读一行<br />
throw new RuntimeException(reader.readLine());<br />
case ':': // 数字<br />
return Long.parseLong(reader.readLine());<br />
case '$': // 多行字符串<br />
// 先读长度<br />
int len = Integer.parseInt(reader.readLine());<br />
if (len == -1) {<br />
return null;<br />
}<br />
if (len == 0) {<br />
return "";<br />
}<br />
// 再读数据,读len个字节。我们假设没有特殊字符，所以读一行（简化）<br />
return reader.readLine();<br />
case '*':<br />
return readBulkString();<br />
default:<br />
throw new RuntimeException("错误的数据格式！");<br />
}<br />
}<br />
<br />
private static Object readBulkString() throws IOException {<br />
// 获取数组大小<br />
int len = Integer.parseInt(reader.readLine());<br />
if (len &lt;= 0) {<br />
return null;<br />
}<br />
// 定义集合，接收多个元素<br />
List&lt;Object&gt; list = new ArrayList&lt;&gt;(len);<br />
// 遍历，依次读取每个元素<br />
for (int i = 0; i &lt; len; i++) {<br />
list.add(handleResponse());<br />
}<br />
return list;<br />
}<br />
<br />
// set name 虎哥<br />
private static void sendRequest(String ... args) {<br />
writer.println("*" + args.length);<br />
for (String arg : args) {<br />
writer.println("$" + arg.getBytes(StandardCharsets.UTF_8).length);<br />
writer.println(arg);<br />
}<br />
writer.flush();<br />
}<br />
}</td>
</tr>
</tbody>
</table>

**5.Redis内存回收**

Redis是基于内存存储的，单个节点的内存内存大小不宜太大，会影响持久化或主从同步性能。内存使用达到上限时Redis就无法存储更多数据，当然，可以修改配置文件的maxmemory配置修改Redis内存上限。

**5.1 过期key处理**

Redis通过expire命令可以为key设置一个有效期TTL，当key过期后，访问这个key会返回nil，代表key不存在，对应的内存也就会被回收。

在Redis中最多可以有16个数据库，每个数据库都被保存为一个redisDb实例。Redis所有数据都是以key-value的形式存在，在redisDb实例中，dict用于存放所有的key和value，expires用于存放所有key的有效期TTL（不包含value）：

<img src="../assets/Redis笔记/media/image218.png" style="width:5.75in;height:1.48958in" />

redisDb实例的结构示意图：

<img src="../assets/Redis笔记/media/image219.png" style="width:5.75in;height:1.94792in" />

当key的TTL到期后，key不是会被立即删除，删除情况有惰性删除和周期删除两种：

**惰性删除**：在访问一个key的时候，检查该key的存活时间，如果已经过期才执行删除

<img src="../assets/Redis笔记/media/image220.png" style="width:5.75in;height:1.60417in" />

但是如果很多key过期后很长时间没有被访问，只采用惰性删除时，这些key就无法被释放，这就需要周期删除。

**周期删除**：通过一个定时任务，周期性地抽样部分过期的key，然后执行删除。执行周期有两种：

Redis服务初始化函数initServer()中设置定时任务，按照 server.hz 的频率执行过期key清理，模式为SLOW

Redis的每个事件循环前会调用beforeSleep()函数，执行过期key清理，模式为FAST

周期删除源码解析：

initServer初始化服务器时，会创建一个定时器关联serverCron函数，这个函数初始时1ms后会执行一次

serverCron先更新并获取当前时钟lruclock，lruclock可以理解为Redis内部维护的一个时钟，会不停更新记录时间，获取时钟后调用databasesCron进行过期数据清理（例如过期key处理）并返回下一次执行serverCron的时间（固定值100ms），用于第4步判断

databasesCron使用SLOW模式循环不断地尝试清理过期的key

初始化服务完成后，调用aeMain函数，aeMain函数会开启一个无限循环

循环内先调用beforeSleep函数使用FAST模式尝试清理过期的key，然后执行aeApiPoll等待FD就绪

有FD就绪处理完IO事件后，判断是否到可以调用serverCron使用SLOW模式清理（就是判断距离上次执行serverCron是否过去了100ms），如果可以清理就调用serverCron清理，否则下一次循环

<img src="../assets/Redis笔记/media/image221.png" style="width:5.75in;height:1.94792in" />

SLOW模式规则：

执行频率受 server.hz 影响，默认为10，即每秒执行10次，每个执行周期100ms

执行清理耗时不超过一次执行周期的25%（默认slow模式耗时不超过25ms）

逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期

bucket：每个redisDb实例的expires字段数据结构其实是哈希表，哈希表每个table下标下都可以有dictEntry组成的链表，可以理解成每次依次遍历这些链表中的dictEntry，取20个dictEntry判断是否过期，并记录本次遍历的位置

如果清理时间没达到清理耗时上限（25ms）并且过期key比例大于10%，再进行一次抽样，否则结束

FAST模式规则（过期key比例小于10%不执行）：

执行频率受 beforesleep() 调用频率影响，但两次FAST模式间隔不低于2ms

执行清理耗时不超过1ms

逐个遍历db，逐个遍历db中的bucket，抽取20个key判断是否过期

如果清理时间没达到清理耗时上限（1ms）并且过期key比例大于10%，再进行一次抽样，否则结束

**5.2 内存淘汰**

内存淘汰就是当Redis内存使用达到设置的上限时，主动挑选部分key删除以释放更多的内存。

任何一条数据的写入操作都可能会导致内存溢出，因此Redis会在每一条命令执行前检查内存是否足够，如果不够会进行内存清理。

Redis会在处理客户端命令的方法 processCommand() 中尝试做内存淘汰：

<img src="../assets/Redis笔记/media/image222.png" style="width:5.75in;height:1.95833in" />

Redis支持8种不同策略来选择要删除的key：

noeviction： 不淘汰任何key，但是内存满时不允许写入新数据，默认就是这种策略

volatile-ttl： 对设置了TTL的key，比较key的剩余TTL值，TTL越小越先被淘汰

allkeys-random：对全体key ，随机进行淘汰，也就是直接从 db-\>dict 中随机挑选

volatile-random：对设置了TTL的key ，随机进行淘汰。也就是从 db-\>expires 中随机挑选

allkeys-lru： 对全体key，基于LRU算法进行淘汰

volatile-lru： 对设置了TTL的key，基于LRU算法进行淘汰

allkeys-lfu： 对全体key，基于LFU算法进行淘汰

volatile-lfu： 对设置了TTL的key，基于LFU算法进行淘汰

*LRU（Least Recently Used），最少最近使用。用当前时间减去最后一次访问时间，这个值越大则淘汰优先级越高*

*LFU（Least Frequently Used），最少频率使用。会统计每个key的访问频率，值越小淘汰优先级越高*

Redis的数据都会被封装为一个redisObject，其中的unsigned lru:LRU_BITS属性用来统计当前RedisObject对象的访问信息，根据配置文件中配置的淘汰策略会记录不同的值：

若采用LRU淘汰策略，该字段会以秒为单位记录最近一次访问时间，长度24bit

若采用LFU淘汰策略，该字段会用高16位 以分钟为单位记录最近一次访问时间，低8位记录逻辑访问次数

<img src="../assets/Redis笔记/media/image223.png" style="width:5.75in;height:1.11458in" />

Redis会通过unsigned lru:LRU_BITS统计一个key最近一次的访问时间或最近一次访问的频率，其中LFU策略的逻辑访问次数并不是key的真实访问次数，而是通过计算得到：

生成0~1之间的随机数R

计算 1 / (旧次数 \* lfu_log_factor + 1)，记录为P，lfu_log_factor默认为10

如果 R \< P ，则计数器 + 1，且最大不超过255

访问次数会随时间衰减，距离上一次访问时间每隔 lfu_decay_time 分钟（默认为1），计数器 -1

随着该key的访问次数增多，得到的P越来越小，R\<P的可能就越来越小，该key的逻辑访问次数增加的可能也会越来越小。如果长时间不访问，访问次数会随时间衰减。逻辑访问次数虽然不是真正访问次数，但是对所有key来说，这个次数还是能说明一个key的访问频率的高低。

Redis在执行每一条客户端命令前执行 processCommand() 进行内存淘汰，该函数根据设置的淘汰策略淘汰一部分key，执行流程如下：

<img src="../assets/Redis笔记/media/image224.png" style="width:5.75in;height:2.84375in" />

执行 LRU\|LFU\|TTL 淘汰策略本质是比较key的过期时间进行淘汰，但数据库通常有成千上万的key，不可能遍历所有key进行比较，所以就创建一个淘汰池 evication_pool 从数据库（遍历所有DB）中随机找一部分key进行比较，池子的规则是按照某一种规则进行升序排列，排列后值越大的的越先淘汰，具体的算法根据淘汰策略不同进行调整使之可以适用越大越先淘汰的逻辑，池子中的数据删除时倒序值越大越应该删除。
