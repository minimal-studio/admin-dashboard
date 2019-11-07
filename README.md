# @deer-ui/admin-dashboard

是一款基于 React 的前后端分离的管理系统前端应用，高度整合处理业务与 UI 的关系。应用于企业级管理系统，适合团队协作开发。提供业务与 UI 分离的开发方式，可以更专注于业务，提高开发效率，高度系统统一性(开发方式，接入方式，UI交互，视觉效果展示等)。

## Live demo

> 可以输入任意账号密码登入

[https://admin.thinkmore.xyz/](https://admin.thinkmore.xyz/)

## 依赖

- Node
- Typescript
- @deer-ui/core
- @deer-ui/admin-scaffold

## Usage 使用

```shell
git clone https://github.com/minimal/admin-dashboard.git
cd admin-dashbard
yarn init; yarn start
```

## 特性

admin-dashboard 高度整合了业务开发与 UI 的关系，通过业务驱动 UI。主要是整合了 `@deer-ui/core` 与 `@deer-ui/admin-scaffold`：

- `@deer-ui/core` 提供基础 UI 功能
- `@deer-ui/admin-scaffold` 提供管理后台脚手架，主要是处理 __Navigation__ 与 __RenderPage__ 的关系

## 参考

- [项目结构](./docs/structure.md)
- [实际问题与解决方案](./docs/resolution.md)
- [多语言支持](./docs/i18n.md)
- [应用程序版本机制](./version/README.md)
- [使用 page-generator 构建页面](./docs/cli.md)
- [TODO](./docs/todo.md)
