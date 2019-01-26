/**
 * 这个是设置更多操作的示例
 * 1. 通过继承 Action 的获取业务数据的接口
 * 2. 如果需要更多操作，可以通过定义 getActionBtn 来生成操作按钮
 * 3. 这里都是编写 page 的业务逻辑的，更专注于模版
 */

import React from 'react';

import { ShowModal, CloseModal, DescHelper } from 'ukelli-ui';
import { Services } from '../services';
import { GeneralReportRender } from '../template-engine';
import { getTestData, keyFieldsForReport } from '../report-data';

const demoGetFormFromRemote = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        value1: '哈哈',
        value2: '呵呵',
        value3: '嘻嘻',
      });
    }, 1000);
  });
};

class TestReportClass extends Services {
  state = {
    ...this.state,
    loadingCondition: true
  }
  constructor(props) {
    super(props);

    this.keyMapper = [
      ...this.getFields({
        names: keyFieldsForReport,
      }),
      {
        key: 'action',
        filter: (str, ...other) => {
          return this.getActionBtn(...other);
        }
      }
    ];
  }
  componentDidMount() {
    // this.getFormOptions1();
    this.getFormOptions2();
  }
  getFormOptions1 = async () => {
    await this.reqAgent(demoGetFormFromRemote, {
      actingRef: 'loadingCondition',
      after: (remoteData) => {
        const options = ["hideDemo","dateRangeDemo","dateRangeDemo2","radioDemo","checkboxDemo","radioMultipleDemo","selectorDemo","inputDemo","customerFormDemo","customerFormDemo2","inputRangeDemo","refuDemo","inputSelectorDemo","switchDemo","datetimeRange","asyncCon"];
        const merge = {
          selectDemo: {
            values: remoteData
          }
        };
        const conditionOptions = this.getConditions(options, merge);
        return {
          conditionOptions
        };
      }
    })();
  }
  getFormOptions2 = async () => {
    const options = ["hideDemo","dateRangeDemo","dateRangeDemo2","radioDemo","checkboxDemo","radioMultipleDemo","selectorDemo","inputDemo","customerFormDemo","customerFormDemo2","inputRangeDemo","refuDemo","inputSelectorDemo","switchDemo","datetimeRange","asyncCon"];
    const conditionOptions = await this.getConditionsSync(options);
    this.setState({
      conditionOptions,
      loadingCondition: false
    });
  }
  // 与 GeneralReportRender 模版对接的查询接口
  queryData = async (reportData) => {
    const postData = this.reportDataFilter(reportData);
    const agentOptions = {
      actingRef: 'querying',
      id: 'queryData',
      after: (res) => {
        return {
          records: res
        };
      },
    };
    const res = await this.reqAgent(getTestData, agentOptions)(postData);
  }
  showDetail(item) {
    let ModalId = ShowGlobalModal({
      title: '详情',
      width: 700,
      children: (
        <DescHelper keyMapper={this.keyMapper} record={item} />
      )
    });
  }
  // 与 GeneralReportRender 模版对接的按钮接口
  actionBtnConfig = [
    {
      text: '详情',
      id: 'detail',
      action: (...args) => {
        this.showDetail(...args);
      }
    }
  ];
}

const TestReportAsync = GeneralReportRender(TestReportClass);

export default TestReportAsync;
