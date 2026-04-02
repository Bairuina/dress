# 后端学习说明

这是一个适合前端转全栈入门的 `FastAPI + SQLAlchemy + MySQL` 后端骨架。

## 目录说明

```text
app/
  api/        # 路由层：定义接口 URL、请求方式、返回值
  core/       # 配置、异常等基础能力
  crud/       # 数据库读写逻辑
  db/         # 数据库连接与会话
  models/     # SQLAlchemy 模型，对应数据库表
  schemas/    # Pydantic 数据结构，对应请求体和响应体
  main.py     # FastAPI 应用入口
```

## 建议你这样理解每一层

- `models`
  数据库表长什么样，就在这里定义。
- `schemas`
  接口入参和出参长什么样，就在这里定义。
- `crud`
  真正的数据库增删改查逻辑放这里。
- `api/routes`
  接口路由只负责收参数、调 CRUD、返回结果。

## 当前已有接口

- `GET /health`
- `GET /api/v1/clothes`
- `GET /api/v1/clothes/{clothes_id}`
- `POST /api/v1/clothes`
- `PUT /api/v1/clothes/{clothes_id}`
- `DELETE /api/v1/clothes/{clothes_id}`

## 推荐学习顺序

1. 先看 `app/main.py`
2. 再看 `app/api/routes/clothes.py`
3. 再看 `app/schemas/clothes.py`
4. 再看 `app/models/clothes.py`
5. 最后看 `app/crud/clothes.py`

## 你现在缺的本地环境

- Python
- MySQL

这两个没装前，你可以先读代码结构；环境装好后再跑接口。
