/**
 * Author: Alex
 * Desc: 继承于 ActionAgent，基础 Services，提供请求的状态管理机制
 * 提供 reqAgent 机制，管理请求的生命周期，管理对应的接口的状态
 */

import React, {Component, PureComponent} from 'react';

import { Call, ToBasicUnitMoney, DebounceClaaass } from 'basic-helper';
import ActionAgent from "uke-admin-web-scaffold/action-agent";
import { Notify } from 'ukelli-ui';

import * as APIs from './apis';
import * as paginHelper from '../utils/pagination-helper';
import { Conditions, Forms } from "./forms";
import { getFromMapper, getFromMapperSync } from './forms/utils';
import { getFields, setFields, getFieldsConfig } from './fields';

window.addEventListener('error', (e) => {
  Notify({
    config: {
      title: '未捕获的异常错误',
      text: e + '',
      lifecycle: 0
    }
  });
});

export default class Services extends ActionAgent {
  apis = APIs;
  getFields = getFields;
  setFields = setFields;
  getFieldsConfig = getFieldsConfig;
  paginHelper = paginHelper;
  /** 用于注册 conditions */
  conditions = Conditions;
  /** 用于注册 forms */
  forms = Forms;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hasErr: false,
      resDesc: '',
      resData: {},
      records: [],
      pagingInfo: paginHelper.getDefPagin(),
    };
  }
  
  componentDidCatch(error, info) {
    Notify({
      config: {
        title: '程序异常提示',
        lifecycle: -1,
        text: (
          <div>
            <p>
              error:
              {error}
            </p>
            <p>
              info:
              {info}
            </p>
          </div>
        )
      }
    });
  }

  async getConditionsSync() {
    return await getFromMapperSync(this.conditions, ...arguments);
  }
  getConditions() {
    return getFromMapper(this.conditions, ...arguments);
  }

  async getFormsSync() {
    return await getFromMapperSync(this.forms, ...arguments);
  }
  getForms() {
    return getFromMapper(this.forms, ...arguments);
  }
  /**
   * 重写 ActionAgent 的 resStatus 接口
   * 调用顺序为接口 return 前
   * @param {object} res 远端返回的数据
   */
  resStatus(res) {
    this.showDesc && this.showDesc({
      title: '消息提示',
      msg: res.err,
      type: res.err ? 'error' : 'success'
    });
  }
  /**
   * 重写 ActionAgent 的接口
   * 调用顺序为接口返回数据后， setState 前
   * @param {object} res 远端返回的数据
   */
  _after(res) {
    return {};
  }
  checkForm = (formRef) => {
    const checkRes = formRef.checkForm();
    if(!checkRes.isPass) {
      return this.stateSetter({
        hasErr: true,
        resDesc: checkRes.desc
      });
    }
    return checkRes.isPass;
  }
  reportDataFilter({ conditionData, nextPaging }) {
    /**
     * 这里需要根据业务字段配置对应的
     */
    return {
      data: conditionData,
      pagin: nextPaging
    };
  }
}
