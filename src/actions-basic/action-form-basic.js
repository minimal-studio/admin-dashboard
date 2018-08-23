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
import {wrapMapperToTextValue} from '../lib/condition-mapper';

export default class ActionFormBasic extends ActionBasic {
  wrapMapperToTextValue = wrapMapperToTextValue;
  checkForm(formHelperRef) {
    let isPass = true;
    if(!!formHelperRef) {
      let checkFormResult = formHelperRef.checkForm();

      if(!checkFormResult.isPass) {
        this.setState(this.getResDescInfo({
          Code: -1,
          Desc: `${checkFormResult.desc} 不正确.`
        }));
        isPass = false;
      }
    }
    return isPass;
  }
  sendData(options) {
    console.log(options);
    const {
      formHelperRef, data,
    } = options;

    const isPass = this.checkForm(formHelperRef);
    if(!isPass) return;

    const _data = data || formHelperRef.value;

    const postData = Object.assign({}, options, {
      data: Object.assign({}, _data, {
        Id: +(_data.Id) || undefined,
      }),
      actingRef: 'submiting'
    });

    this._sendData(postData);
  }
}
