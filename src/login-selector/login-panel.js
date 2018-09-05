import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { FormGenerator, Button, TipPanel } from 'ukelli-ui';

let isDev = process.env.NODE_ENV == 'development';

var defaultUserInfo = {
  AdminName: window.DefaultAdmin || (isDev ? 'alex' : ''),
  Password: window.DefaultPW || (isDev ? 'qwe123' : '')
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
    setTimeout(() => {
      // isDev && document.querySelector('#freeLogin').click();
    }, 100);
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
            className="login-form-container"
            // inlineTitle={true}
            showInputTitle={true}
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
