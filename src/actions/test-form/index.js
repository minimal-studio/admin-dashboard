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
        type: 'input',
        ref: 'Input',
        title: '操作金额',
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
        required: true,
        values: {
          val1: '单选类型1',
          val2: '单选类型2',
          val3: '单选类型3',
          val4: '单选类型4',
        }
      },
    ]
  };
  transferIn = (formHelperRef) => {
    let sendData = {
      method: 'api',
      formHelperRef,
      onSuccess: (res) => {
        console.log(res);
      }
    }
    this.sendData(sendData);
  };
  transferOut = (formHelperRef) => {
    let sendData = {
      method: 'api',
      formHelperRef,
      onSuccess: (res) => {
        console.log(res);
      }
    }
    this.sendData(sendData);
  };
  btnConfig = [
    {
      action: this.transferIn,
      text: '转入游戏',
      actingRef: 'INing',
      className: 'theme'
    },
    {
      action: this.transferOut,
      text: '转回平台',
      actingRef: 'OUTing',
      className: 'red'
    },
  ];
}
