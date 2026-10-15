# 一、RAGFlow安装

## 1.环境准备

注意：由于这几个镜像占用内存较大，建议把虚拟机的内存调大，8g左右即可

![](./images/image-20261004140102.png)

## 2.下载github项目源码

[https://github.com/infiniflow/ragflow.git](https://github.com/infiniflow/ragflow)

![](./images/image-20261004140103.png)



然后解压`ragflow-main.zip` 压缩包（当天资料中已提供，最好创建一个目录）（虚拟机已经提供好了）

```Bash
unzip ragflow-0.24.0.zip
```

由于前面我们已经安装了Dify项目，这两个项目都依赖了redis，且web端的端口都是默认80端口，因此，为了避免冲突，我们需要修改ragflow\-main目录下的相关配置文件。

## 3.修改配置信息

修改web访问默认端口

修改文件位置： `ragflow-main/docker/docker-compose.yml` 文件

![](./images/image-20261004141017.png)

### 3.1.修改redis配置

修改 `ragflow-main/docker/.env` 文件

![](./images/image-20261004141141.png)

修改 `ragflow-main/docker/docker-compose-base.yml` 文件

![](./images/image-20261004141221.png)

## 4.启动服务

进入目录：`/ragflow_dev/ragflow-main/docker`，执行命令：

```Python
docker compose up -d
```

![](./images/image-20261004140110.png)

时间比较久，需要大家耐心等待。

## 5.访问RAGFlow

由于前面，我们把web端口设置为了8800端口，docker镜像拉取后，等待容器启动完成，在浏览器输入:

192\.168\.100\.128:8800   即可访问

![](./images/image-20261004140111.png)

用户名：itheima@itcast\.cn

密码：heima123

至此，ragflow就安装完成了，注册完成后主页面如下：

![](./images/image-20261004140112.png)

## 6.接入大模型

![](./images/image-20261004141508.png)

# 二、对接Dify

提示词：

```markdown
请详细阅读根目录的两份接口文档：
- DifyController接口文档.md   用于和前端项目对接
- Dify智能体接口.md  用于后端项目跟dify服务对接
- 其他要求：
     - 跟dify对接的时候，对话是流式输出，使用到的技术是webflux
     - 跟dify对接的时候，除了对话接口，其他接口都采用http请求，最好使用HttpUtil（糊涂工具提供）
```

我已详细阅读两份接口文档。下面是我的理解与对接思路梳理，请您确认后再开始编码。

## 1.接口对应关系总览

| 前端接口（DifyController）                    | Dify 智能体接口                                   | 通信方式                  |
| --------------------------------------------- | ------------------------------------------------- | ------------------------- |
| `DELETE /dify/history/{chatId}` 删除聊天历史  | `DELETE /conversations/{conversation_id}`         | HttpUtil（同步）          |
| `GET /dify/history/{chatId}` 获取聊天历史消息 | `GET /messages`                                   | HttpUtil（同步）          |
| `GET /dify/history` 获取用户对话列表          | `GET /conversations`                              | HttpUtil（同步）          |
| `POST /dify/chat` AI实时聊天（SSE 流式）      | `POST /chat-messages`（response\_mode=streaming） | WebFlux WebClient（流式） |

## 2.关键对接要点

### 2.1.基础配置

1.Dify Base URL：`http://192.168.100.128/v1`

2.认证头：`Authorization: Bearer app-C89ApY0QLxjLPrNSIhNAPOxo`

3.用户标识 user：取自 `SecurityUtils.getUserId()`（转为字符串，作为 Dify 端的唯一用户标识）

### 2.2.流式对话（POST /dify/chat）

1.入参：`prompt`（=\> Dify `query`），`chatId`（=\> Dify `conversation_id`，为空则新建）

2.必传 Dify 字段：`response_mode=streaming`、`user`、`query`，可选 `inputs={}`

3.技术方案：使用 `WebClient` 调用 Dify `/chat-messages`，订阅 `text/event-stream`，逐条解析 `data:` 分片：

- 取 `event=message` 时的 `answer` 字段累加输出给前端

- 遇 `event=message_end` 结束流

- 遇 `event=error` 转友好错误提示

4.响应给前端：`Flux<String>`，`MediaType.TEXT_PLAIN`（与文档一致），客户端 cancel 时通过 `doOnCancel` 终止上游订阅

5.全局异常返回 `"抱歉，服务暂时不可用，请稍后重试。"`

### 2.3.非流式接口（统一用 Hutool HttpUtil）

1.获取历史消息：`GET /messages?conversation_id={chatId}&user={userId}`

2.提取响应 `data[]` 中的 `query` 与 `answer`，封装为 `List<MsgVo>` 返回

3.获取会话列表：`GET /conversations?user={userId}`

直接透传 `data[]`（含 `id/name/status/created_at/updated_at`）

4.删除会话：`DELETE /conversations/{conversationId}`，body 为 `{"user":"{userId}"}`，HTTP 204 视为成功

5.统一封装 Header（Bearer）和 JSON 请求体，统一异常 → `AjaxResult.error("xxx失败")`

## 3.计划落地的代码结构

```markdown
xhzb-admin (或合适模块)
└── controller/dify/
    └── DifyController.java          // 4 个对前端接口
└── service/dify/
    ├── DifyService.java             // 接口
    └── impl/DifyServiceImpl.java    // 三个 HttpUtil 同步方法 + 一个 WebClient 流式方法
└── config/
    └── DifyProperties.java          // base-url / api-key 配置
└── domain/vo/
    └── MsgVo.java                   // {query, answer}
```

依赖确认：

- `xhzb-admin/pom.xml` 需要 `spring-boot-starter-webflux`（WebClient）

- Hutool（HttpUtil）按现有项目应已具备，编码时再确认  


## 4.需要您确认的事项

请确认以下两点后我即开始编码：

收到，我先探查 `xhzb-nursing-platform` 模块结构与已有约定，再开始编码。

模块结构已掌握：`spring-boot-starter-webflux` 已就绪，包结构清晰。我看下现有 ChatController 的写法以便沿袭风格，同时确认 Hutool HttpUtil 是否可用。

环境完全摸清：Hutool 可用、WebFlux 已就绪、AjaxResult 是统一返回类型，配置统一在 `application-dev.yml`。现在创建 todo 并开始落地编码。

所有上下文齐备，开始创建文件。先建配置类与配置项：

现在创建 Service 接口与实现：

项目无 mvnw 包装器，环境也未安装 mvn 命令。改为通过静态检查已读代码确认编译性后完成任务。

## 5.已完成的对接实现

### 5.1.新增/修改文件

| 文件                                                         | 说明                                     |
| ------------------------------------------------------------ | ---------------------------------------- |
| [DifyProperties.java](file:///d:/2026/AI01/nursing_code/ai01-xhzb/xhzb-nursing-platform/src/main/java/com/xhzb/nursing/config/DifyProperties.java) | 配置类：`dify.base-url` / `dify.api-key` |
| [MsgVo.java](file:///d:/2026/AI01/nursing_code/ai01-xhzb/xhzb-nursing-platform/src/main/java/com/xhzb/nursing/domain/vo/MsgVo.java) | 历史消息 VO（query/answer）              |
| [IDifyService.java](file:///d:/2026/AI01/nursing_code/ai01-xhzb/xhzb-nursing-platform/src/main/java/com/xhzb/nursing/service/IDifyService.java) | 4 个对接方法签名                         |
| [DifyServiceImpl.java](file:///d:/2026/AI01/nursing_code/ai01-xhzb/xhzb-nursing-platform/src/main/java/com/xhzb/nursing/service/impl/DifyServiceImpl.java) | 核心实现                                 |
| [DifyController.java](file:///d:/2026/AI01/nursing_code/ai01-xhzb/xhzb-nursing-platform/src/main/java/com/xhzb/nursing/controller/DifyController.java) | 对前端 4 个接口                          |
| [application-dev.yml](file:///d:/2026/AI01/nursing_code/ai01-xhzb/xhzb-admin/src/main/resources/application-dev.yml) | 末尾追加 `dify` 配置块                   |

### 5.2.技术选型落实情况

1.流式对话 `POST /dify/chat`：使用 `WebClient` 调用 Dify `/chat-messages`，`response_mode=streaming`，`bodyToFlux(String.class)` 接 SSE，过滤 `event=message/agent_message` 取 `answer`，遇 `error` 转友好提示，`doOnCancel` 兜底客户端断开。返回 `Flux<String>`、`text/plain;charset=UTF-8`，与文档一致。

2.其余 3 个接口（获取历史消息、获取会话列表、删除会话）：全部使用 Hutool `HttpUtil` / `HttpRequest` 同步调用 Dify `/messages`、`/conversations`、`DELETE /conversations/{id}`，结果用 `JSONUtil` 解析。

### 5.3.与文档接口的映射

| 前端接口                        | Dify 接口                                  | 实现方式       |
| ------------------------------- | ------------------------------------------ | -------------- |
| `POST /dify/chat`               | `POST /chat-messages` \(streaming\)        | WebClient 流式 |
| `GET /dify/history/{chatId}`    | `GET /messages?conversation_id=&user=`     | HttpUtil       |
| `GET /dify/history`             | `GET /conversations?user=`                 | HttpUtil       |
| `DELETE /dify/history/{chatId}` | `DELETE /conversations/{id}` body=`{user}` | HttpUtil       |

### 5.4.注意事项

1.项目当前激活 `dev` profile，仅在 `application-dev.yml` 中加了 `dify` 配置；若要发布到 `prod/test`，请同步在 `application-prod.yml` / `application-test.yml` 添加同样配置。

2.`user` 字段统一取 `SecurityUtils.getUserId()` 转字符串，作为 Dify 端用户唯一标识。

3.已存在 \[ChatController\]\(file:///d:/2026/AI01/nursing\_code/ai01\-xhzb/xhzb\-nursing\-platform/src/main/java/com/xhzb/nursing/controller/ChatController\.java\)（`/ai/chat`）走 Spring AI 本地大模型，不与新加 `/dify/` 冲突。

4.工程无 `mvnw` 也未安装 mvn，未做编译实测；如需构建验证，请用 IDE 一键编译 `xhzb-nursing-platform` 模块即可。
