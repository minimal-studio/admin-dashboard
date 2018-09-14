# Uke 管理系统的前端脚手架工程

## 依赖

- NodeJs
- Babel 7
- Webpack 4
- basic-helper
- ukelli-ui
- uke-request
- uke-admin-web-scaffold
- uke-web-server

先安装 babel cli

```shell
npm i @babel/core @babel/node @babel/cli -g
```

- [更多介绍内容](./docs/intro.md)
- [遇到的实际问题](./docs/resolution.md)
- [应用程序版本机制](./version/README.md)

## 开始使用

### 安装构建工具 uke-cli

```shell
npm i uke-cli -g
```

### 构建 web server

```shell
uks init
# 根据提示输入
# 例如项目名为 yourProjName

cd yourProjName
npm start
```

浏览器打开 <a href="http://127.0.0.1:28101/dyr/test" target="_blank">http://127.0.0.1:28101/dyr/test</a>

### 构建 admin web

```shell
uka init
# 此处是分步操作，根据提示，分别输入项目的英文名称，开发者名称
# 以下例子使用 test-proj
# 初始化成功后会在当前目录生成 ./test-proj 项目

cd ./test-proj

# 准备就绪，启动项目，程序自动在浏览器中打开，并且提供 webpack react 的热更新机制
npm start
```

添加功能页面，以 “系统公告 xtgg” 为例

同步操作 uke addp *pageName* *pageAlias* *pageTypeFlag*

```shell
uke addp xtgg 系统公告 -r

# 此处是同步操作, 创建一个 report 类型的系统公告 action 和 page
# 页面类型 -r == report | -f == form | -i == iframe(未实现) | -m == markdown(未实现)
```

分步操作

```shell
uke add xtgg

# 此处同样是分步操作，根据提示选择页面的类型，输入页面的中文名称即可
# 页面类型 report | form | iframe(未实现) | markdown(未实现)
# 后面会详细讲述不同的类型
```

系统会在项目对应的目录下创建 xtgg.js，并且添加到菜单中，菜单可以自行调整位置

### 手动添加页面的 action 和 page

```shell
git clone https://github.com/SANGET/uke-admin-seed.git
```

-----------

## 多语言支持

支持中文的 map 反射，编码方式更友好，语言包在 /public/i18n/ 中

```js
// 向所有 page 传入 gm (getMap) 语言反射
let i18nConfig = {
  '值': 'key'
}
gm('值');
```

TODO 完善自动化调用翻译接口自动翻译基于中文的语言包

-----------

## TODO

- 实现与之配套的 web server 支持
- 实现可视化的构建操作
