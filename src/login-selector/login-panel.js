import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { FormGenerator, Button, TipPanel } from 'ukelli-ui';

var defaultUserInfo = {
  AdminName: window.DefaultAdmin || '',
  Password: window.DefaultPW || ''
};

export default class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.formOptions = [
      {
        ref: 'AdminName',
        type: 'input',
        defaultValue: defaultUserInfo.AdminName,
        title: '账号',
        iconName: 'account',
        required: true
      },
      {
        ref: 'Password',
        type: 'password',
        defaultValue: defaultUserInfo.Password,
        title: '密码',
        iconName: 'lock',
        required: true
      },
      {
        ref: 'GooglePassword',
        type: 'input',
        iconName: 'security',
        title: 'Google认证码'
      }
    ];
  }
  componentDidMount() {
    let loaderDOM = document.querySelector('#loadingBg');
    if(!loaderDOM) return;
    loaderDOM.classList.add('loaded');
    setTimeout(() => {
      loaderDOM.parentNode.removeChild(loaderDOM);
    }, 1000);
  }
  render() {
    const { logging, login, loginResDesc } = this.props;

    return (
      <form
        className="login-panel"
        onSubmit={e => {
          e.preventDefault();
          login(this.refs.formHelper.value);
        }}>
        <div className="form-layout">
          <h3 className="title">管理系统</h3>
          {
            loginResDesc ? (
              <TipPanel text={loginResDesc}/>
            ) : null
          }
          <FormGenerator
            // className="login"
            formOptions={this.formOptions} ref="formHelper">
            <div className="form-group">
              <button className="btn theme flat login-btn" id="freeLogin">
                {logging ? '登录中...' : '登录'}
              </button>
            </div>
          </FormGenerator>
        </div>
      </form>
    );
  }
}
