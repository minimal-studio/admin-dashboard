/**
 * 这个是设置更多操作的示例
 * 1. 通过继承 Action 的获取业务数据的接口
 * 2. 如果需要更多操作，可以通过定义 getActionBtn 来生成操作按钮
 * 3. 这里都是编写 page 的业务逻辑的，更专注于模版
 */

import React from 'react';

import { ShowGlobalModal, CloseGlobalModal } from 'ukelli-ui';
import { Services } from '../services';
import { GeneralReportRender } from '../template-engine';

const getTestData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          UserName: 'Name1',
          Address: '广州',
          Phone: '99999999',
          Weight: 58,
        },
        {
          UserName: 'Name2',
          Address: '香港',
          Phone: '99999998',
          Weight: 58,
        },
        {
          UserName: 'Name3',
          Address: '澳门',
          Phone: '99999997',
          Weight: 58,
        },
      ]);
    }, 1000);
  });
};

class TestReportClass extends Services {
  state = {
    ...this.state,
  }
  templateOptions = {
    needCheck: true,
    whenCheckAction: (
      <div>选中后出现的 DOM</div>
    )
  }
  constructor(props) {
    super(props);

    this.conditionOptions = this.getConditions(['datetimeRange']);

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

    this.keyMapper = [
      ...this.getFields({
        names: keyFields,
      })
    ];
  }
  // 与 GeneralReportRender 模版对接的查询接口
  queryData = async (reportData) => {
    const postData = this.reportDataFilter(reportData);
    const agentOptions = {
      actingRef: 'querying',
      after: (res) => {
        return {
          records: res
        };
      },
    };
    await this.reqAgent(getTestData, agentOptions)(postData);
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