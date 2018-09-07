/**
 * 这个是设置更多操作的示例
 * 1. 通过继承 Action 的获取业务数据的接口
 * 2. 如果需要更多操作，可以通过定义 getActionBtn 来生成操作按钮
 * 3. 这里都是编写 page 的业务逻辑的，更专注于模版
 */

import React from 'react';

import { ShowGlobalModal, CloseGlobalModal } from 'ukelli-ui';
import { ActionTestReport } from '../action-refs';
import { GeneralReportRender } from '../../template-engine';

class TestReportClass extends ActionTestReport {
  actionBtnConfig = [
    {
      text: '详情',
      action: (...args) => {
        this.showDetail(...args)
      }
    }
  ];
  showDetail(item) {
    console.log(item)
    let ModalId = ShowGlobalModal({
      title: '详情',
      width: 700,
      children: (
        <h1 className="text-center" onClick={e => CloseGlobalModal(ModalId)}>当前人: {item.UserName}</h1>
      )
    })
  }
}

const TestReport = GeneralReportRender(TestReportClass);

export default TestReport;
