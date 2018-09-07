import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ActionReportBasic} from '../actions-basic';

const testRemoteData = [
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
]

export class ActionTestReport extends ActionReportBasic {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.state, {
      customeState: []
    });

    const {dateRange} = this.conditionOptionsMapper;
    this.conditionOptions = [
      dateRange,
    ];

    let keyFields = [
      'UserName',
      'Address',
      'Phone',
      {
        key: 'Weight',
        filter: (str, item, mapper, idx) => {
          // 这里是过滤每一条 Weight 字段的 filter 函数
          return str + 'kg'
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
  queryData = (reportData) => {
    let sendData = {
      ...reportData,
      path: this.apis.TEST_DATA,
      onSuccess: res => {
        console.log(res);
      },
      onRes: () => {

      },
      stateAfterPostHook: (res) => {
        return {
          records: testRemoteData
        }
      }
    };
    // this.sendData 接口提供一系列提供完整的数据的生命周期状态，包括获取中，获取完成后的数据，以及错误信息处理
    // 如果使用 this.sendData ，则不需要手动设置状态
    this.sendData(sendData);
  }
}
