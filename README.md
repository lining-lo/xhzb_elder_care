# 星海智伴 · 智慧养老护理平台

> 基于 RuoYi-Vue 3.9.0 + Spring Boot 3 + Vue 3 的养老院一体化管理平台，集成 Spring AI 大模型、华为云 IoT 设备接入、知识库 RAG、Dify 智能体等能力。

星海智伴为养老院量身定制，覆盖 **来访管理、入退管理、在住管理、服务管理、财务管理** 的完整业务链路，实现从来访参观到退住办理的全流程数字化。系统同时接入智能硬件与 AI 能力，让护理排班、健康评估、异常报警等工作从"人工记录"走向"数据驱动"。

---

## 目录

- [业务背景](#业务背景)
- [系统架构](#系统架构)
- [功能模块](#功能模块)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [配置说明](#配置说明)
- [AI 能力](#ai-能力)
- [IoT 设备接入与报警](#iot-设备接入与报警)
- [接口文档](#接口文档)
- [开发规范](#开发规范)
- [常用命令](#常用命令)
- [部署方案](#部署方案)
- [开发笔记索引](#开发笔记索引)

---

## 业务背景

中国老龄化程度持续加深，智慧养老已成为养老服务体系发展的必然趋势。2026 年中国养老产业市场规模约 18.5 万亿元，预计 2027 年将达到 21.1 万亿元，产业链正在从"人工看护"向"互联网 + 养老"的多元化服务模式整合。

星海智伴正是在这一背景下建设的养老院管理软件：一方面把院内日常运营流程标准化、线上化，另一方面用 AI 与 IoT 能力降低护理人员的工作负担、提升照护质量。

## 系统架构

项目分为两端，共用一套后端服务：

| 端 | 使用方 | 主要职责 |
| --- | --- | --- |
| 管理后台 | 养老院员工 | 入住 / 退住办理、护理服务记录、设备管理与监控、报表统计、财务管理 |
| 家属端（小程序） | 老人家属 | 查看老人信息、健康与床位数据、在线缴费、下单服务 |

```
                      ┌──────────────────────────────┐
   管理后台 (Web)  ──▶ │                              │
                      │      星海智伴后端服务          │
   家属端 (小程序) ──▶ │   RuoYi-Vue / Spring Boot 3  │
                      │                              │
                      └──────────────────────────────┘
                            │        │         │
                    MySQL / Redis   │         └──▶ 华为云 IoTDA ──▶ 智能设备
                                     │
                     Spring AI ──────┴──▶ DashScope / DeepSeek / Ollama
                                     └──▶ Dify / RAGFlow 智能体
```

## 功能模块

**基础平台（RuoYi 内置）**

- 用户、角色、部门、岗位、菜单与按钮级权限管理
- 数据字典、参数配置、通知公告
- 操作日志、登录日志、在线用户、定时任务
- 代码生成器、文件上传下载、系统监控（CPU / 内存 / 缓存 / 连接池）

**护理业务**

- 护理项目、护理计划、护理等级管理
- 老人档案与健康评估（含 AI 智能评估）
- 入住办理：床位选择、申请入住、入住详情、退住办理
- 来访管理、在住管理、服务记录、财务管理
- 家属端小程序：微信登录、老人信息查看、缴费与下单

**智能化能力**

- AI 对话与流式响应，支持多轮会话记忆与历史记录
- 知识库 RAG（星海智询）：文档上传、切分、向量化、检索问答
- 智能评估：基于提示词工程生成老人能力评估与健康评估结果
- IoT 产品与设备管理、物模型数据、设备影子
- 智能床位可视化、设备上报数据处理
- 报警规则配置、数据过滤与站内信 / 短信通知

## 技术栈

**后端**

| 类别 | 技术 |
| --- | --- |
| 基础框架 | Spring Boot 3.5.0、Java 17、RuoYi-Vue 3.9.0 |
| 持久层 | MyBatis、MyBatis-Plus 3.5.7、Druid 连接池 |
| 安全 | Spring Security、JWT 多终端认证、RBAC 权限模型 |
| 缓存 / 存储 | Redis、MySQL |
| AI | Spring AI 1.1.2（OpenAI 兼容协议 / Ollama / DeepSeek） |
| 文档 | Swagger / Knife4j / SpringDoc OpenAPI |
| 消息 | AMQP（消费 IoT 平台转发的设备数据） |
| 定时任务 | Quartz |
| 文件存储 | 阿里云 OSS |

**前端**

| 类别 | 技术 |
| --- | --- |
| 框架 | Vue 3.4.0、Vite 5.0.4 |
| UI | Element Plus 2.4.3 |
| 状态 / 路由 | Pinia 2.1.7、Vue Router 4.2.5 |
| 请求 | Axios 0.27.2 |
| 小程序 | 微信小程序（微信登录 + 后端接口对接） |

**外部平台**

华为云 IoTDA、阿里云百炼（DashScope）、DeepSeek、Ollama、Coze、Dify、RAGFlow、Redis Stack（向量库）。

## 项目结构

```
├── xhzb-admin/              # 主应用模块（启动入口，端口 8080）
├── xhzb-framework/          # 核心框架组件（安全、拦截器、配置）
├── xhzb-system/             # 系统管理模块
├── xhzb-nursing-platform/   # 护理平台业务模块
├── xhzb-common/             # 通用工具类与常量
├── xhzb-quartz/             # 定时任务模块
├── xhzb-generator/          # 代码生成模块
├── xhzb-oss/                # 文件存储模块
├── xhzb_ui/                 # 前端 Vue 3 应用
├── sql/                     # 数据库脚本
└── pom.xml                  # Maven 父 POM
```

关键入口：

- 后端启动类：`xhzb-admin/src/main/java/com/xhzb/XhzbApplication.java`
- 后端配置：`xhzb-admin/src/main/resources/application-{dev,prod}.yml`
- 前端入口：`xhzb_ui/src/main.js`

## 环境要求

| 组件 | 版本 / 说明 |
| --- | --- |
| JDK | 17+ |
| Maven | 3.6+ |
| Node.js | 18+（配合 Vite 5） |
| MySQL | 8.x |
| Redis | 6.x+（知识库需要 Redis Stack 以支持向量检索） |
| Docker | 可选，用于部署 MySQL / Redis / Redis Stack / Nginx |

## 快速开始

### 1. 准备基础服务

```bash
# MySQL
docker run -d --name mysql -p 3306:3306 --restart=always \
  -e MYSQL_ROOT_PASSWORD=your_password mysql:8

# Redis
docker run -d --name redis -p 6379:6379 --restart=always \
  redis --requirepass your_password

# Redis Stack（知识库向量存储）
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 \
  redis/redis-stack:latest
```

导入数据库结构与初始数据：

```bash
mysql -u root -p xhzb < sql/xhzb.sql
```

### 2. 启动后端

```bash
# 构建所有模块（跳过测试）
mvn clean install -DskipTests

# 运行（开发环境）
cd xhzb-admin
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

启动后服务地址为 `http://localhost:8080`。

### 3. 启动前端

```bash
cd xhzb_ui
npm install
npm run dev
```

开发服务器默认地址 `http://localhost:3000`，通过 Vite 代理访问后端接口。

## 配置说明

### 数据源与缓存

在 `xhzb-admin/src/main/resources/application-dev.yml` 中配置 MySQL 与 Redis 连接：

```yaml
spring:
  datasource:
    driverClassName: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://<host>:3306/xhzb?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
    username: <username>
    password: <password>
  data:
    redis:
      host: <redis-host>
      port: 6379
      database: 0
      password: <redis-password>
```

> 项目默认多环境配置：`application-dev.yml` / `application-prod.yml`，通过 `--spring.profiles.active` 切换。

### 环境变量

| 变量 | 用途 |
| --- | --- |
| `OPENAI_API_KEY` | DashScope（OpenAI 兼容模式）调用密钥 |
| `DEEPSEEK_API_KEY` | DeepSeek 模型调用密钥 |
| `OSS_ACCESS_KEY_ID` | 阿里云 OSS 访问标识 |
| `OSS_ACCESS_KEY_SECRET` | 阿里云 OSS 访问密钥 |

> 请勿把真实密钥提交到代码仓库，上述凭据统一通过环境变量或配置中心注入。

## AI 能力

### 多模型接入（Spring AI）

系统通过 Spring AI 统一接入多家模型服务，按需切换：

```yaml
spring:
  ai:
    openai:                          # 阿里云百炼（DashScope）OpenAI 兼容模式
      base-url: https://dashscope.aliyuncs.com/compatible-mode
      chat:
        options:
          model: qwen-max-latest
    ollama:                          # 本地部署模型
      base-url: http://localhost:11434
      chat:
        options:
          model: qwen3.5:9b
    deepseek:
      base-url: https://api.deepseek.com
      chat:
        options:
          model: deepseek-chat
```

### 对话能力

- 普通对话与流式对话（`Flux<String>` 逐步返回）
- System 角色设定，控制助手人设与回答边界
- Advisors 机制：日志记录、会话记忆
- 基于 `ChatMemory` + `CONVERSATION_ID` 的多轮会话隔离
- 会话历史持久化：保存会话 ID、查询会话列表、查看会话详情、删除会话
- Tool Calling：让模型调用业务工具（如天气查询）

### 知识库（RAG）

解决大模型幻觉问题的核心方案，流程如下：

1. **Reader**：读取普通文本与 PDF 文档
2. **Chunk**：按策略切分文档
3. **写入向量库**：调用向量模型生成 Embedding 并写入 Redis Stack
4. **Retrieval**：用户提问时检索相似片段，拼接上下文交给大模型生成回答

配套的知识库管理功能包含文档上传、拆分与向量化、文档删除及向量数据清理。

### 智能评估

基于提示词工程完成老人能力评估与健康评估：先按评估规则匹配，再交给大模型分析生成结论，最终落库并支持查看、修改、取消与删除评估记录。

### 智能体（Dify / RAGFlow）

- 使用 Dify 构建企业智能体，接入内部知识库与工作流
- 通过 RAGFlow 解决文档中图片内容的解析问题，并作为外部知识库挂载到 Dify
- 后台通过 Dify 开放 API 对接智能体，实现"内部知识问答"与"养老院数据查询"两类场景
- 工作流中的 HTTP 节点调用业务系统对外接口，使智能体能读取预约、老人基本信息、健康信息等实时数据
- 支持 MCP 工具集成（如高德地图、文档生成）

## IoT 设备接入与报警

### 设备管理

接入华为云 IoTDA 平台，实现智能手环、智能床垫等设备的统一管理：

- 从 IoT 平台同步产品列表，维护产品模型
- 注册、修改、删除设备，分页查询设备列表
- 查询设备详情、物模型数据（运行状态、服务调用）
- 查看设备上报数据（设备影子）

### 数据流转

```
智能设备 ──▶ 华为云 IoTDA ──▶ AMQP 数据转发 ──▶ 后端消费并落库 ──▶ 业务展示
```

后端通过 `ApplicationRunner` 启动 AMQP 客户端，持续消费设备上报数据；智能床位模块据此获取楼层、房间中的智能设备及实时数据。

### 报警管理

- 报警规则：按产品、设备、物模型功能定义监控字段、运算符、阈值、持续周期
- 生效时间与报警沉默周期，避免重复打扰
- 报警数据过滤：定时任务周期检查，命中规则即生成报警数据
- 通知对象：老人异常数据通知护理员，设备异常数据通知后勤维修
- 通知渠道：站内信、短信（紧急提醒）

## 接口文档

项目集成 SpringDoc OpenAPI 与 Knife4j，启动后可直接访问在线接口文档：

- Swagger UI：`http://localhost:8080/swagger-ui.html`
- OpenAPI JSON：`http://localhost:8080/v3/api-docs`

常用注解：`@Tag`（模块分组）、`@Operation`（接口说明）、`@Parameter`（参数说明）、`@Schema`（模型字段说明）。

## 开发规范

`xhzb-nursing-platform` 遵循标准三层架构，推荐使用内置代码生成器生成基础 CRUD 后再补充业务逻辑。

| 层级 | 规范 |
| --- | --- |
| Domain | 继承 `BaseEntity`，使用 `@Data` / `@Schema` / `@Excel`，数据库下划线字段自动转驼峰 |
| Mapper | 继承 `BaseMapper<T>`，方法命名 `selectXxxById` / `selectXxxList` / `insertXxx` / `updateXxx` / `deleteXxxById`，XML 使用 `resultMap`、`sql` 片段与动态 SQL |
| Service | 接口继承 `IService<T>`，返回值统一用 `int` 表示影响行数，复杂业务使用 DTO |
| Controller | 继承 `BaseController`，使用 `@PreAuthorize` 控权、`@Log` 记录操作日志、`@Operation` 补文档，统一返回 `AjaxResult`，路径前缀 `/nursing/` |

标准控制器写法：

```java
// 分页查询
@GetMapping("/list")
public TableDataInfo list(Xxx xxx) {
    startPage();
    List<Xxx> list = xxxService.selectXxxList(xxx);
    return getDataTable(list);
}

// 新增
@PostMapping
public AjaxResult add(@RequestBody Xxx xxx) {
    return toAjax(xxxService.insertXxx(xxx));
}
```

AI 接口示例：

```java
@RestController
@RequestMapping("/ai")
public class ChatController {

    @Autowired
    private ChatClient openAiChatClient;

    public Flux<String> chat(String prompt, String chatId) {
        return openAiChatClient.prompt()
                .user(prompt)
                .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, chatId))
                .stream()
                .content();
    }
}
```

## 常用命令

```bash
# ---------- 后端 ----------
mvn clean install                      # 构建所有模块
mvn clean install -pl xhzb-admin       # 构建指定模块
mvn clean install -DskipTests          # 跳过测试构建
mvn test                               # 运行所有测试
mvn test -Dtest=MyTestClass#testMethod # 运行单个测试方法

# ---------- 前端 ----------
cd xhzb_ui
npm install
npm run dev                            # 开发服务器
npm run build:stage                    # 测试环境构建
npm run build:prod                     # 生产环境构建

# ---------- 数据库 ----------
mysql -u root -p xhzb < sql/xhzb.sql
```

## 部署方案

采用 DevOps 思路，通过 Jenkins Pipeline 实现持续集成与持续部署：

1. **基础环境**：JDK 17、Maven、Docker，构建统一的 JDK 基础镜像
2. **多环境分支**：开发分支 `dev` 集成，发布时合并到 `release` / `master`，配合多环境配置文件打包
3. **后端部署**：Jenkins 流水线拉取代码 → Maven 打包 → 构建镜像 → 启动容器，暴露服务端口
4. **前端部署**：多环境选择打包 → 构建 Nginx 镜像 → 部署静态资源并配置反向代理指向后台服务
5. **日志管理**：
   - `docker logs` 查看容器日志，进入容器内部使用 Linux 命令排查
   - ELK（Elasticsearch + Logstash + Kibana）集中采集与检索日志，快速定位线上问题

生产环境建议配合 Nginx 反向代理、HTTPS、数据库定期备份与监控告警使用。

