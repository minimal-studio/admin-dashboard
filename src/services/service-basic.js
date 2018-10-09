/**
 * Author: Alex
 * Desc: 继承于 ActionAgent，基础 Services，提供请求的状态管理机制
 * 提供 reqAgent 机制，管理请求的生命周期，管理对应的接口的状态
 */

import React, {Component, PureComponent} from 'react';

import { Call, ToBasicUnitMoney, DebounceClaaass } from 'basic-helper';
import ActionAgent from "uke-admin-web-scaffold/action-agent";

import * as APIs from './apis';
import * as paginHelper from '../utils/pagination-helper';
import { Conditions, Forms } from "./forms";
import { getFields, setFields, getFieldsConfig } from './fields';

export default class Services extends ActionAgent {
  getFields = getFields;
  setFields = setFields;
  getFieldsConfig = getFieldsConfig;
  apis = APIs;
  conditions = Conditions;
  getConditions = Conditions.getConditions;
  forms = Forms;
  getForms = Forms.getForms;
  paginHelper = paginHelper;
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
  /**
   * 重写 ActionAgent 的 resStatus 接口
   * 调用顺序为接口 return 前
   * @param {object} res 远端返回的数据
   */
  resStatus(res) {

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
