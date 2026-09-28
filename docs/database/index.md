# 数据库

```mermaid
flowchart TD
    A[SQL] --> B[索引]
    B --> C[事务]
    C --> D[MVCC]
    D --> E[锁]
    E --> F[性能优化]
    A --> G[Redis]
```

目前先以 MySQL 为主。
