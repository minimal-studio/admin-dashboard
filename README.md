# Orion admin web seed

## 介绍

[查看更多介绍内容](./docs/intro.md)

管理后台的前端开发部分总会遇到一些问题

- 虽然每个管理后台处理的业务不同，但是有很多共同的功能，项目开始的时候可能导致重复开发
- 技术方案不一样，中后期维护(例如修改模版，调整总体样式)，人员变动等因素会导致维护成本变高
- 与服务端的数据交互以及该过程的数据状态管理无法很好统一
- 视觉质量、UI 体验参差不齐，什么元素摆什么位置没有一个谱

此项目的立场是为了解决这些问题，「提高管理后台系统的开发效率」。

以下是解决方案的目标

- 业务与模版分离
- 统一的开发方式
- 统一的 UI 和视觉
- 更关注应用的业务流程，减少编写 html/css 的必要
- 支持多标签页面机制
- 前端 hash 路由
- 生成页面时自动添加相关注释

## 依赖

NodeJs, npm

## 业务与模版

业务逻辑与渲染模版完全分离，互相独立，可以快速开发基于前后端完全分离的后台管理系统，快速实现业务，抢尽先机。

### Actions: 业务逻辑数据交互集合

- 定义与服务器交换数据的接口以及逻辑
- 定义表单的交互数据
- 定义表格需要的查询条件数据类型，以及需要渲染的列表数据，以及数据的过滤器

### Pages: 页面渲染模版，根据上述 Actions 的类型选择不同的模版进行渲染

- 渲染表格的 report-page
- 渲染表单的 form-page
- 也可以是完全独立的模版

### [更多请看这里](./docs/structure.md)

## 使用

### 1. 推荐使用 orion-admin-generator 自动化生成工具，自动生成系统所需的 action，page 和添加菜单数据

安装 orion cli

```shell
npm i orion-admin-generator -g # 安装成功可以使用 orion cli

orion -v
```

生成项目，根据提示操作即可，方便轻松

```shell
orion init
# 此处是分步操作，根据提示，分别输入项目的英文名称，开发者名称
# 以下例子使用 test-proj
# 初始化成功后会在当前目录生成 ./test-proj 项目
```

项目初始化

```shell
cd ./test-proj

npm run init
# 运行初始化脚本，程序会自动执行 npm install; git init; npm run setVersion，并且生成系统需要的一些依赖文件，等两分钟就好了
```

准备就绪，启动项目，程序自动在浏览器中打开，并且提供 webpack react 的热更新机制

```shell
npm start
```

添加功能页面，以 “系统公告 xtgg” 为例

```shell
orion add xtgg

# 此处同样是分步操作，根据提示选择页面的类型，输入页面的中文名称即可
# 页面类型 report | form | iframe(未实现)
# 后面会详细讲述不同的类型
```

系统会在项目对应的目录下创建 xtgg.js，并且添加到菜单中，菜单可以自行调整位置

### 2. 手动，需要手动添加页面的 action 和 page

```shell
git clone https://github.com/SANGET/orion-admin-seed.git
```

## 多语言支持

使用了中文的 map 方式，编码时更方便，语言包在 /public/i18n/ 中

## TODO

- 实现与之配套的 web server 支持
- 实现可视化的生成操作
