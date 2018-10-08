/**
 * 基础表单 Action 组件, 主要实现了请求方式
 * 只提供更基础的 state : {
 *   errCode: {}
 *   loading
 * }
 * @Alex
 */

import React, {Component, PureComponent} from 'react';
import ActionBasic from './action-basic';

export default class ActionFormBasic extends ActionBasic {
  checkForm(formHelperRef) {
    let isPass = true;
    if(formHelperRef) {
      let checkFormResult = formHelperRef.checkForm();

      if(!checkFormResult.isPass) {
        this.setState(this.getResDescInfo({
          err: `${checkFormResult.desc} 不正确.`
        }));
        isPass = false;
      }
    }
    return isPass;
  }
  sendData(options) {
    const {
      formHelperRef, data,
    } = options;

    const isPass = this.checkForm(formHelperRef);
    if(!isPass) return;

    const postData = Object.assign({}, options, {
      data,
      actingRef: 'submiting'
    });

    this._sendData(postData);
  }
}
