# Uke 管理系统的前端脚手架工程

- 数据驱动

## 依赖

- NodeJs
- Babel 7
- Webpack 4
- basic-helper
- ukelli-ui
- uke-request
- uke-admin-web-scaffold
- uke-web-server
- uke-scrips

先安装 babel cli

```shell
npm i @babel/core @babel/node @babel/cli -g
```

- [安装](./docs/start.md)
- [遇到的实际问题](./docs/resolution.md)
- [多语言支持](./docs/i18n.md)
- [应用程序版本机制](./version/README.md)
- [TODO](./docs/todo.md)
<!-- - [更多介绍](./docs/intro.md) -->

## 目录结构与功能

- src/ 源文件
  - auth/ 验证相关
  - components/ 一些通用组件
  - config/ 项目配置
    - app-config 主配置
    - generate-nav-config 生成的导航配置
    - icon-mapper icon 的配置
    - key-mappers 内置中英对照
    - listener 监听器
    - nav-config 导航配置
  - pages/ 渲染页面
    - 具体的业务页面
    - generate-pages-refs.js uke-cli 生成页面时注入到此文件
    - index.js 注册所有页面
    - registe-spec-fields.js 注册特殊的路由页面
    - services.js 导出基础服务
  - services/ 基础服务，提供与远端数据交互时，页面的 state 生命周期管理；提供所有表单表格注册和获取的方式；提供所有 api 接口的获取方式，下面会详细介绍此模块
    - apis/ 业务接口
    - forms/ 表单和查询条件注册目录
    - fields.js 注册表格的字段和对应字段的过滤器
    - index.js 导出配置
    - req-filter.js 请求对象过滤器
    - service-basic.js 基础服务类，大部分组件都继承于此
  - style/ 样式
  - template-engin/ 模版引擎
    - uke-admin-web-scaffold-demo 模版 demo，可以根据实际情况编写对应的模版
    - index.js 配置导出
  - utils/ 辅助函数
    - pagination-helper.js 分页辅助函数

## 重要模块说明

### 基础服务 Services

提供一个便于编写业务的环境，封装了页面请求时的 state 的生命周期管理，表格和表单配置的接口，表格字段的接口等，以下是一个 page 的例子

```js
import React from 'react';

import { ShowGlobalModal, CloseGlobalModal } from 'ukelli-ui';
import { Services } from '../services';
import { GeneralReportRender } from '../../template-engine';

class TestReportClass extends Services {
  state = {
    ...this.state,
  }
  constructor(props) {
    super(props);

    // 模版 GeneralReportRender 渲染 conditions 的接口
    this.conditionOptions = this.getConditions('datetimeRange');

    // 定义表格渲染字段的过滤器
    let keyFields = [
      'username_for_user',
      'Address',
      'Phone',
      {
        key: 'Weight',
        filter: (str, item, mapper, idx) => {
          // 这里是过滤每一条 Weight 字段的 filter 函数
          return str + 'kg';
        }
      },
      {
        key: 'action',
        filter: (str, ...other) => {
          return this.getActionBtn(...other);
        }
      }
    ];

    // 模版 GeneralReportRender 渲染表格时的接口，通过 this.getFields 生成可用的配置
    this.keyMapper = [
      ...this.getFields({
        names: keyFields,
      })
    ];
  }
  // 与 GeneralReportRender 模版对接的查询接口
  queryData = async (reportData) => {
    // this.reportDataFilter services 提供的表格查询数据过滤器
    const postData = this.reportDataFilter(reportData);
    const agentOptions = {
      actingRef: 'querying',
      id: 'queryData',
      // after 页面 state 生命周期，在请求返回后、 setState 之前调用，返回值作为 state 的一部分
      after: (res) => {
        return {
          records: res.data
        };
      },
    };
    // this.reqAgent services api 包装函数，用于封装页面的请求过程，state 的控制由 services 提供
    const res = await this.reqAgent(this.apis.getTestData, agentOptions)(postData);
  }
  showDetail(item) {
    let ModalId = ShowGlobalModal({
      title: '详情',
      width: 700,
      children: (
        <div className="text-center" onClick={e => CloseGlobalModal(ModalId)}>当前人: {item.UserName}</div>
      )
    });
  }
  // 与 GeneralReportRender 模版对接的按钮接口
  actionBtnConfig = [
    {
      text: '详情',
      action: (...args) => {
        this.showDetail(...args);
      }
    }
  ];
}

const TestReport = GeneralReportRender(TestReportClass);

export default TestReport;
```
