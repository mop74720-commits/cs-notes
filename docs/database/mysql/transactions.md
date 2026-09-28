# MySQL 事务

## ACID

| 属性 | 含义 |
|---|---|
| Atomicity | 原子性 |
| Consistency | 一致性 |
| Isolation | 隔离性 |
| Durability | 持久性 |

## 隔离级别

- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

下一步把事务与 [MVCC](mvcc.md) 和 [锁](locks.md) 连起来。
