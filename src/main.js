'use strict';

/**
 * Author: Alex Zhang
 * Desc: 此文件为生成环境的主要入口文件
 */

import React from 'react';
import { Provider, connect } from 'unistore/react';
import { hot } from 'react-hot-loader';

/**
 * 通用代码块
 */

import './config/app-config';

import * as AllManagerPages from './pages';

/**
 * 样式文件
 */
import './app.scss';

import { CallFunc } from 'basic-helper';
import { ManagerAPP } from 'uke-admin-web-scaffold';
import LoginSelector from './login-selector';
import { authStore, authActions } from './login-actions';
import VersionInfo from './version.json';

const pageComponents = AllManagerPages;

const i18nConfig = {
  'zh-CN': '中文',
  'en-US': 'English',
}

function selector(state) {
  return state;
}

const Status = ({onLogout}) => {
  return (
    <React.Fragment>
      <span className="flex"></span>
      <div className="actions mr10">
        <span className="_btn" onClick={e => onLogout()}>退出登录</span>
      </div>
    </React.Fragment>
  )
}

class LoginFilter extends React.Component {
  componentDidMount() {
    // this.props.autoLogin();
    CallFunc(window.OnLuanched)();
  }
  render() {
    const { isLogin, userInfo, onLogout } = this.props;
    return (
      <LoginSelector {...this.props}>
        {
          isLogin ? (
            <ManagerAPP
              {...this.props}
              // 必须填写的
              username={userInfo.username}
              versionInfo={VersionInfo}
              menuMappers={{
                child: 'child',
                code: 'code',
                title: 'title',
                icon: 'icon',
              }}
              i18nConfig={i18nConfig}
              pluginComponent={{
                Statusbar: <Status/>
              }}
              pageComponents={pageComponents}
            />
          ): null
        }
      </LoginSelector>
    )
  }
}
const LoginFilterWithStore = connect(selector, authActions)((userStore) => {
  return (
    <LoginFilter {...userStore}/>
  )
});

const C = () => (
  <Provider store={authStore}>
    <LoginFilterWithStore/>
  </Provider>
);

export default hot(module)(C);