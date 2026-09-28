# SQL 基础

## 查询执行的基本逻辑

```text
表
→ 筛选
→ 连接
→ 分组
→ 聚合
→ 排序
→ 输出
```

## JOIN

```sql
SELECT c1.Cno, c2.Cpno
FROM Course AS c1
JOIN Course AS c2
  ON c1.Cpno = c2.Cno
WHERE c2.Cpno IS NOT NULL;
```

把 JOIN 看成：根据条件，把两张表中能够对应的行组合起来。

## GROUP BY

后续补充聚合函数、`GROUP BY`、`HAVING` 与 WHERE 的区别。
