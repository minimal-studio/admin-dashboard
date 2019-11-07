# 开始使用

## 安装依赖

### 安装构建工具 @mini-code/page-generator

```shell
npm i @mini-code/page-generator -g
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

同步操作 pg addp *pageName* *pageAlias* *pageTypeFlag*

```shell
pg addp xtgg 系统公告 -r

# 此处是同步操作, 创建一个 report 类型的系统公告 action 和 page
# 页面类型 -r == report | -f == form | -i == iframe(未实现) | -m == markdown(未实现)
```

分步操作

```shell
pg add xtgg

# 此处同样是分步操作，根据提示选择页面的类型，输入页面的中文名称即可
# 页面类型 report | form | iframe(未实现) | markdown(未实现)
# 后面会详细讲述不同的类型
```

系统会在项目对应的目录下创建 xtgg.js，并且添加到菜单中，菜单可以自行调整位置

### 手动添加页面 page

```shell
git clone https://github.com/SANGET/pg-admin-seed.git
```

-----------
