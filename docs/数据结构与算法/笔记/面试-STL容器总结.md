# STL容器总结

> 疑似凭据、令牌和密码示例在公开版本中已自动脱敏。

*🔗 原文链接： [⁣⁢⁣⁣⁡STL容器总结](https://my.feishu.cn/wiki/E9o4wgWS8ibw2DklA3ScYsqTncQ)*

*⏰ 剪存时间：2026-03-13 17:30:31*

*✂️ 本文档由* [*游侠飞书剪存*](https://pwwjpto7tva.feishu.cn/wiki/space/7517832277555544092) *一键生成*

*💖 更多好物请访问* [*游侠创客*](https://uibot.cn) *微信：xuefuta*

**常用STL容器总结**

**一、顺序容器 （ 存储顺序 、 访问顺序 ）**

**1️⃣ vector （动态数组）**

**特点** ：

支持随机访问

适合频繁查找和尾部插入删除

插入和删除操作效率较低（除了尾部）

**常用操作** ：

push_back(x) / emplace_back(x)

pop_back()

\[\] / at()

size() / empty()

erase(iterator)

**二、关联容器 （ 根据键进行排序 ， 支持快速查找 ）**

**1️⃣ set （集合）**

**特点** ：

存储唯一元素，并且自动按排序顺序排列

无法有重复元素

**常用操作** ：

insert(x) / emplace(x)

erase(x) / erase(iterator)

find(x) / count(x)

size() / empty()

**2️⃣ map （映射）**

**特点** ：

存储键值对（key-value），并按键排序

键唯一，值可以重复

**常用操作** ：

insert(pair) / emplace(key, value)

erase(key) / erase(iterator)

find(key) / count(key)

\[\] （会自动创建元素）

at(key) （找不到抛异常）

size() / \`empty()

**三、无序容器 （ 哈希表 ， 存储顺序不确定 ）**

**1️⃣ unordered_set （无序集合）**

**特点** ：

存储唯一元素，使用哈希表实现，存储顺序不确定

**常用操作** ：

insert(x) / emplace(x)

erase(x) / erase(iterator)

find(x) / count(x)

size() / empty()

**2️⃣ unordered_map （无序映射）**

**特点** ：

存储键值对（key-value），使用哈希表实现，键唯一

键值对存储顺序不确定

**常用操作** ：

insert(pair) / emplace(key, value)

erase(key) / erase(iterator)

find(key) / count(key)

\[\] （会自动创建元素）

at(key) （找不到抛异常）

size() / empty()

**四、栈与队列容器**

**1️⃣ stack （栈）**

**特点** ：

后进先出（LIFO）

**常用操作** ：

push(x) / emplace(x)

pop()

top()

empty()

size()

**2️⃣ queue （队列）**

**特点** ：

先进先出（FIFO）

**常用操作** ：

push(x)

pop()

front()

back()

empty()

size()

**3️⃣ priority_queue （优先队列）**

**特点** ：

优先级队列，元素按优先级顺序出队（默认大顶堆）

**常用操作** ：

push(x) / emplace(x)

pop()

top()

empty()

size()
