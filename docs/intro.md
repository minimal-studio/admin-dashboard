# Hi～

## 欢迎来到 orion admin web 的示例项目。

orion admin web 这是提供了一个管理后台前端的解决方案

- 命令生成工具，自动注册菜单、注册路由、注册页面引用并且生成开发需要的注释
- 与服务端的数据交互以及该过程的数据状态管理
- 统一的开发方式，统一开发思路
- 业务与渲染模版完全分离

## 业务与渲染模版完全分离，怎么理解？

这里主要描述业务和模板的概念，分了业务 Actions 和模版 Pages 两种。

- Actions 专注于业务的逻辑，与远端服务器的数据交互的接口，以及继承系统提供的多个帮助函数。
- Pages 专注于数据的渲染，Actions 与远端准备好数据，直接可以在 Pages 中体现。
- 两者通过对象继承和高阶模版结合，实现系统的逻辑清晰，用户体验一致，敏捷开发。
- 大概十分钟完成一个通用表单或者表格。
- 两小时内完成一个复杂表单或者表格。

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

## 要的就是效率

上述的流程已经控制好了，开发方式和数据流动都是固定的，可以解决最开始说的问题

- 我们喜欢重复做轮子，觉得这就是技术，这就是提升自我，这就是技术的奥义。
- 然而很多时候只是在浪费时间罢了。
- 多出来的时间，可以感受多姿多彩的生命，多陪陪家人，多读读书，多做更多有意义的事情。
- 从无尽又重复的，管理后台难以统一调整样式，复制粘贴代码这种问题中解脱。

## 也许不完美，但是我会尽力推广我的理念，维护这个项目，节省使用者的时间。谢谢。