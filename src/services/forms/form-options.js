/**
 * 根据具体的业务制定所有的表单配置
 */

import getFromMapper from "./utils";

/**
 * 根据具体业务的名字命名，在外层通过 getForms(['name']) 获取对应配置
 */
const Conditions = {
  hideDemo: {
    type: 'hidden',
    value: 'hiddenID',
    ref: 'hiddenID'
  },
  inputDemo: {
    type: 'input',
    ref: 'Input',
    title: '操作金额',
    required: true
  },
  pwDemo: {
    type: 'password',
    ref: 'Password',
    title: '密码',
    required: true
  },
  selectDemo: {
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
  radioDemo: {
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
};

export function getForms() {
  return getFromMapper(Conditions, ...arguments);
}