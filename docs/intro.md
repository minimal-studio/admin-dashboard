# 介绍

目的是提供了一种管理系统前端的解决方案

- 数据驱动
- 自动化构建工具
- 与远端数据交互的方式及请求过程的数据状态管理
- 统一开发方式，统一开发思路
- 业务与渲染模版完全分离
- 完全数据驱动的模版引擎

## 业务数据逻辑与模版渲染分离

- Actions 数据处理和业务逻辑模块
- Pages 数据可视化渲染
- 两者通过对象继承和高阶模版结合

一个流程示例

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
