/**
 * 基础 Action 组件, 主要实现了请求方式, 包含表单验证的方式
 * @Alex
 */

import React, {Component, PureComponent} from 'react';

import {MANAGER_APIS} from '../lib/apis';
import {getFields, setFields, getFieldsConfig} from '../lib/fields';

export default class ActionBasic extends Component {
  getFields = getFields;
  setFields = setFields;
  getFieldsConfig = getFieldsConfig;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasErr: false,
      resDesc: '',
      resData: {},
      records: [],
      pagingInfo: $MN.DefaultPaging,
    };
    this.apis = MANAGER_APIS;
  }
  setModal(modalSetting) {
    const {onAppResponse} = this.props;
    onAppResponse && onAppResponse({
      type: 'OPEN_TOP_MODAL',
      modalSetting
    })
  }
  toBasicUnitMoney(money) {
    return $GH.ToBasicUnitMoney(money);
  }
  closeModal() {
    const {onAppResponse} = this.props;
    onAppResponse && onAppResponse({
      type: 'CLOSE_TOP_LV_MODAL'
    })
  }
  getResDescInfo(resErrCode) {
    const resInfo = {
      hasErr: resErrCode.Code != '0',
      resDesc: resErrCode.Desc
    };
    this.showResDesc(resInfo)
    return resInfo;
  }
  defaultStateAfterPost(res, actingRef, recordsRef) {
    let resData = res.Data || {};
    let records = resData.Results || [];
    let pagingInfo = resData.Paging || this.state.pagingInfo || $MN.DefaultPaging;
    let errCode = res.Header.ErrCode;

    return Object.assign({}, this.getResDescInfo(errCode), {
      [actingRef]: false,
      resData,
      records,
      pagingInfo,
    });
  }
  getStateBeforePost(params, actingRef) {
    return Object.assign({}, {
      [actingRef]: true,
    }, params);
  }
  componentWillUnmount() {
    this.__unmount = true;
  }
  showResDesc() {
    /**
     * 可以通过重写此接口
     * @type {Object}
     */
  }
  delayExec(...args) {
    if(!this._delayExec) this._delayExec = new $GH.Debounce();
    return this._delayExec.exec(...args);
  }
  stateSetter(state) {
    if(!this.__unmount) this.setState(state);
  }
  async _sendData(options) {
    /**
     * 参数说明
     * method@String          请求的接口
     * ---------------------------------
     * data@Object            请求的 Data，一般由继承 Helper 组件包装成功后传入，
     *                        参见 action-form-basic || action-report-basic
     *                        action-form-basic 处理大部分表单的统一验证
     *                        action-report-basic 处理大部分报表的查询条件业务
     * ---------------------------------
     * stateBeforePost@Object 追加 state 到请求发起前的 setState
     * stateAfterPostHook@func    追加 state 到请求完成后的 setState，必须返回一个 Object
     * actingRef@String       请求状态的标记为，默认是 loading，兼容记录多个接口的请求状态
     * recordsRef@String      请求响应的数据存储字段标识，默认为 Results， 此默认字段为与服务端接口的约定，有服务端没有处理成 Results 的特殊情况
     * onSuccess@Func         业务请求成功的 callback
     * onRes@Func             发起的请求成功，包括业务错误
     */
    const {
      method, data = {}, header,
      stateBeforePost = {},
      stateAfterPostHook = (res) => {},
      actingRef = 'loading', recordsRef = 'Results',
      onSuccess,
      onRes
    } = options;

    this.stateSetter(this.getStateBeforePost(stateBeforePost, actingRef));

    const sendData = Object.assign({},
      method ? {method} : {},
      {
        data: data
      }
    );

    const sendDataRes = await $MN.$request.send({sendData});

    if(sendDataRes) {
      $GH.CallFunc(onRes)(sendDataRes);
      $GH.CallFunc(onSuccess)(sendDataRes.Data);
      this.stateSetter(
        Object.assign({},
          this.defaultStateAfterPost(sendDataRes, actingRef, recordsRef),
          $GH.CallFunc(stateAfterPostHook)(sendDataRes)
        )
      );
    } else {
      // 其他错误处理
      this.stateSetter({loading: false}); // 取消 loading 状态
    }
  }
}
