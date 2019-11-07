# 项目结构

整合了业务与 UI 的关系，更专注于业务开发

## 目录结构与功能

- _template 用于 page-generator 生产的模版，可以修改
- build 编译后的目录
- docs 相关文档目录
- init-script 项目初始化脚本
- packages 工作区
- public 公共资源目录
- scripts 一般脚本
- version 版本嵌入脚本
- src/ 源文件
  - auth/ 验证相关
  - components/ 一些通用组件
  - config/ 项目配置
    - app-config 主配置
    - generate-nav-config 生成的导航配置
    - icon-mapper icon 的配置
    - key-mappers 内置中英对照
    - listener 监听器
    - nav-config 导航配置
  - pages/ 渲染页面
    - 具体的业务页面
    - generate-pages-refs.js page-generator 生成页面时注入到此文件
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
    - @deer-ui/admin-scaffold-demo 模版 demo，可以根据实际情况编写对应的模版
    - index.js 配置导出
  - utils/ 辅助函数
    - pagination-helper.js 分页辅助函数

## 模块说明

### 模版引擎

- 默认使用 @deer-ui/admin-scaffold/template-engine 来渲染表格和表单
- 可以在 src/template-engine 下注册新的模版引擎
- @deer-ui/admin-scaffold/@deer-ui/admin-scaffold-demo 为默认模版的例子

> for-report 表格模版说明

主要提供组合查询条件，查询按钮及操作，其它按钮的摆放等，提供一些 api，也可以进行扩展

> 关于按钮的控制权

每个按钮需要设置 id，否则不生效。按钮的与页面的应对关系

```js
// pageCode 是用于页面的标识，唯一的
{
  [pageCode]: {
    // btnId 用于区分页面之内的不同功能的按钮，页面之内不能重复
    [btnId]: true // 是否激活的按钮
  }
}
```

```js
// HOCReportRender 提供的 API，挂在在当前页面组建的 this 下
class Page extends Services {
  recordActionBtns = [
    {
      text: '',
      id: '',
      action: () => {},
    }
  ]; // 远端数据渲染的操作按钮
  reportActionBtns = [
    {
      text: '',
      id: '',
      action: () => {},
      color: 'red'
    }
  ]; // 用于拓展表格的操作按钮
  /**
   * 查询按钮的接口, 传入两个参数
   */
  queryData({conditionData, nextPagin}) {
    // api
  }
  getRecordBtns() {
    // 可以忽略
  }
}
```

#### 异步查询条件标记

如果表格中的查询条件需要异步获取，需要设置一个 loadingCondition 标记，然后在 after 函数中 return false，或者 actingRef: 'loadingCondition'

或者使用 Services 提供的 getConditionsSync 方法, 在 conditiob-options.js 中定义异步获取条件的函数

```js
class AsyncConditionDemo extends Services {
  state = {
    ...this.state,
    loadingCondition: true // 需要设置的标记为
  }
  componentDidMount() {
    await this.queryConditionData1();
  }
  // 实现 1
  queryConditionData1() {
    const options = ['datetimeRange', 'asyncCon'];
    const conditionOptions = await this.getConditionsSync(options);
    this.setState({
      conditionOptions,
      loadingCondition: false
    });
  }
  // 实现 2
  queryConditionData2() {
    const options = {
      actingRef: 'querying',
      after: (res) => {
        return {
          ...yourData,
          loadingCondition: false
        }
      }
    }
  }
  // 实现 3
  queryConditionData3() {
    const options = {
      actingRef: 'loadingCondition',
      after: (res) => {
        return {
          ...yourData,
        }
      }
    }
  }
}
```

> for-form 表格模版说明

使用 @deer-ui/core 中的 FormLayout 组件进一步封装，提供表单渲染，状态管理等，暂时不提供额外接口，可以自行拓展

### 基础服务 Services

> 逐步完善 src/services/services-baisc.js

services-baisc 提供一个便于编写业务的环境，封装了页面请求时的 state 的生命周期管理，表格和表单配置的接口，表格字段的接口等

理论上大部分的 page 都继承于 services-baisc , 获取优化处理业务流程的辅助方法，以下是一个 page 的例子

```js
import React from 'react';

import { ShowModal, CloseModal } from '@deer-ui/core';
import { Services } from '../services';
import { HOCReportRender } from '../../template-engine';

class TestReportClass extends Services {
  state = {
    ...this.state,
  }
  constructor(props) {
    super(props);

    // 模版 HOCReportRender 渲染 conditions 的接口
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
          return this.getRecordBtns(...other);
        }
      }
    ];

    // 模版 HOCReportRender 渲染表格时的接口，通过 this.getFields 生成可用的配置
    this.columns = [
      ...this.getFields({
        names: keyFields,
      })
    ];
  }
  // 与 HOCReportRender 模版对接的查询接口
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
    let ModalId = ShowModal({
      title: '详情',
      width: 700,
      children: (
        <div className="text-center" onClick={e => CloseModal(ModalId)}>当前人: {item.UserName}</div>
      )
    });
  }
  // 与 HOCReportRender 模版对接的按钮接口
  recordActionBtns = [
    {
      text: '详情',
      action: (...args) => {
        this.showDetail(...args);
      }
    }
  ];
}

const TestReport = HOCReportRender(TestReportClass);

export default TestReport;
```

### 逐步开始

A. 应用程序的加载顺序，从上优先于下，左优先于右

1. [app-config] 先加载配置
2. [nav-config, page-refs, @deer-ui/admin-scaffold] 容器加载对应的路由, 页面引用等模块，填充脚手架的具体内容

B. Page 模块加载顺序

[[Apis, Fields, Forms], Services, Page] 页面的继承顺序，可以在 Services 之前添加对应的方法来优化业务

> 继承于 Services 的功能

```js
apis: {} // 通过 src/services/apis 注册的所有 api
checkForm: {} // 用于检查 formGenerator 的表单对象
conditions: {} // 获取通过 src/services/forms/condition-options.js 注册的所有查询条件选项
getConditions: func([names], merge, options) // 用于获取查询条件的选项的接口
forms: {} // 获取通过 src/services/forms/forms-options.js 注册的所有表单选项
getForms: func([names], merge, options) // 用于获取表单的选项的接口
getFields: func([names], options) // 用于获取表格字段过滤器的接口
setFields: func({}) // 用于设置和注册表格字段过滤器的接口
getFieldsConfig: {} // 用于获取表格字段过滤器的接口
getUrlParams: func() // 用于获取当前路由参数的方法
routerParams: {} // 初始化的路由参数对象
paginHelper: {} // 用于包装分页数据的接口
reqAgent: func(api, agentOptions) // 用于封装 API 请求过程的，让开发更关注业务，忽略 setState
```

> 根据页面类型定义业务配置, 用于于与渲染模版对接, 表格类型

```js
recordActionBtns: [{ text: '', action: func }] // 用于表格渲染中的操作按钮们
conditionOptions: [{}] // 用于渲染表格的查询条件
columns: [{}] // 用于渲染表格的显示的具体字段以及字段的过滤器
queryData: [{}] // 用于表格查询的默认方法，也可以自定义
```

> 表单类型

```js
btnConfig: [{text: '', action: func, actingRef: '用于标记该按钮的状态'}] // 用于表单的按钮们
formOptions: [{}] // 用于表单对应项的渲染
```

> 来自 @deer-ui/admin-scaffold 传入的 props 接口, 在实体 Page 中的 this.props 中，也可以通过 src/main.js 中传入

```js
gm: func // getMapper 的缩写，用于国际化包装，开发时需要把页面中需要做国际化的地方用这个方法包裹
onNavigate: func // 用于导航，详情查看 @deer-ui/admin-scaffold 导航机制
history: {} // 通过 history 模块对浏览器的 history 对象的封装对象
userInfo: {} // 当前登录用户的信息，在 src/auth 模块中返回
username: {} // 当前登录用户的用户名
```

### 异步获取表单的查询调整以及表格选项的写法约定

```js
// src/pages/test-form-async 例子
export default class TestFormAsync extends Services {
  state = {
    ...this.state,
    querying: true
  }
  componentDidMount() {
    this.getFormOptions();
  }
  getFormOptions() {
    const agentOptions = {
      actingRef: 'querying',
      after: (remoteData) => {
        const options = ['hideDemo', 'inputDemo', 'pwDemo', 'selectDemo', 'radioDemo'];
        const merge = {
          selectDemo: {
            values: remoteData
          }
        };
        const formOptions = this.getForms(options, merge);
        return {
          formOptions
        };
      }
    };
    // 使用 reqAgent 管理页面请求状态
    this.reqAgent(demoGetFormFromRemote, agentOptions)();
  }
  btnConfig = [{}];
  render() {
    const { querying } = this.state;

    return (
      <div className="card mb10">
        {/* 如果是异步获取表单初始化数据，需要 Loading */}
        <Loading loading={querying}>
          {
            querying ? null : (
              <FormLayout
                tipInfo={{
                  title: '如果是异步获取表单初始化数据，需要 Loading'
                }}
                {...this.state}
                btnConfig={this.btnConfig}/>
            )
          }
        </Loading>
      </div>
    );
  }
}
```
