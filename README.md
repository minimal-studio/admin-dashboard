# Orion admin web 的种子项目

## 介绍

- 基于 orion-admin-web-scaffold, 实现声明式的表单与表格渲染，快速实现业务流程
- 拥有完善的页面导航机制，统一的 UI 体验

## 使用

```shell
git clone https://github.com/SANGET/orion-admin-seed.git
```

### 目录结构说明

- src 源文件目录
- src/pages 页面目录，在 index.js 中注册页面
- src/actions 业务逻辑的 actions 目录，具体布局在 pages 中继承 action 并定义页面
- src/config 配置目录，其中包含页面导航、请求过滤、中英对照、icon 对照、主程序配置等
- src/components 通用组件模块目录

### 开发步骤

1. 新建 action ，定义对应的服务器的接口的 key、所用组件的类型等，然后在 pages/index.js 中使用已存在模板或者自定义 page，然后注册到系统中

```js

```

## TODO

- 实现通过命令生成对应的组件
- 实现与之配套的 web server 支持
- 完善对应的开发文档