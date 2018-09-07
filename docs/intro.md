# Hi～

## 欢迎来到 uke admin web 的示例项目。

uke admin web 提供了一种管理系统前端的解决方案

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

Action

```js
/**
 * 表单 Action 模版
 */
import React from 'react';

/**
 * ActionFormBasic 是内置的提供与服务器通讯的基础类库，通过 extends 的方式获取其中的功能
 */
import {ActionFormBasic} from '../actions-basic';

/**
 * 定义业务 action
 */
export class ActionTestForm extends ActionFormBasic {
  constructor(props) {
    super(props);

    // 定义表单项，如果需要异步获取表单条件，需要添加 querying 的状态判定
    this.formOptions = [
      {
        type: 'hidden',
        value: 'hiddenID',
        ref: 'hiddenID'
      },
      {
        type: 'input',
        ref: 'Input',
        title: '输入',
        required: true
      },
      {
        type: 'password',
        ref: 'Password',
        title: '密码',
        required: true
      },
      {
        type: 'select',
        ref: 'Select',
        title: '下拉选择',
        desc: '下拉选择的描述',
        required: true,
        values: {
          val1: '下拉选择类型1',
          val2: '下拉选择类型2',
          val3: '下拉选择类型3',
          val4: '下拉选择类型4',
        }
      },
      {
        type: 'radio',
        ref: 'Radio',
        title: '单选',
        desc: '单选的描述',
        required: true, // 必填的表单验证标记
        verify: (val) => {
          // 验证该值的回调，统一在 formBasic 中处理
          return true
        },
        values: {
          val1: '单选类型1',
          val2: '单选类型2',
          val3: '单选类型3',
          val4: '单选类型4',
        }
      },
    ]
  };
  /**
   * 定义与服务端交互的具体业务逻辑
   * 如果按钮被操作了，将会回传一个完整的表单
   */
  action1 = (formHelperRef) => {
    let sendData = {
      method: 'api',
      formHelperRef,
      onSuccess: (res) => {
        console.log(res);
      }
    }
    this.sendData(sendData);
  };
  action2 = (formHelperRef) => {
    let sendData = {
      method: 'api',
      formHelperRef,
      onSuccess: (res) => {
        console.log(res);
      }
    }
    this.sendData(sendData);
  };
  // 定义操作按钮的逻辑
  btnConfig = [
    {
      action: this.action1,
      text: '操作1',
      actingRef: 'Action1',
      className: 'theme'
    },
    {
      action: this.action2,
      text: '操作2',
      actingRef: 'Action2',
      className: 'red'
    },
  ];
}
```

Page 模版的实现

```js
import {FormLayout, Loading} from 'ukelli-ui';

// 引用上述的 ActionTestForm
import {ActionTestForm} from '../action-refs';

/**
 * 说明
 * submiting 是否提交中
 * querying  如果需要异步获取表单条件的，需要用 Loading 包装一层，并且 !querying 的时候渲染 FormLayout
 * 通过 extends ActionTestForm 获取表单项和对应的业务接口
 */
export default class TestForm extends ActionTestForm {
  render() {
    const {querying = false} = this.state;

    return (
      <div>
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
                  btnConfig={this.btnConfig}
                  formOptions={this.formOptions}/>
              )
            }
          </Loading>
        </div>
        <div className="card">
          {/* 如果是已经定义好的数据，则不需要 Loading */}
          <FormLayout
            tipInfo={{
              title: '如果是已经定义好的数据，则不需要 Loading'
            }}
            {...this.state}
            formOptions={this.formOptions}
            btnConfig={this.btnConfig}/>
        </div>
      </div>
    )
  }
}

// 高阶模版

const FormRender = (Action, ...other) => {
  return class AdvenceComponent extends Action {
    render() {
      return (
        <FormLayout
          tipInfo={{
            title: '高阶组件'
          }}
          {...this.state}
          formOptions={this.formOptions}
          btnConfig={this.btnConfig}/>
      )
    }
  }
}

// 生成一个 page，复用 FormRender
let FormPage = FormRender(TestForm);
```