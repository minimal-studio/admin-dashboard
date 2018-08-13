/**
 * 表单 Action 模版
 */

import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';

import {ActionFormBasic} from '../actions-basic';

export class ActionTestForm extends ActionFormBasic {
  constructor(props) {
    super(props);

    this.formOptions = [
      {
        type: 'hidden',
        value: 'hiddenID',
        ref: 'hiddenID'
      },
      {
        type: 'password',
        ref: 'password',
        required: true
      },
      {
        type: 'input',
        ref: 'RefField',
        title: '输入',
        desc: '描述',
        required: true
      },
    ]
  }
  onSubmit(formHelperRef) {
    let sendData = {
      method: 'api',
      formHelperRef,
      onSuccess: (res) => {
        console.log(res);
      }
    }
    this.sendData(sendData);
  }
}