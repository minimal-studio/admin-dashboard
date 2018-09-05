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

import {ManagerAPP} from 'uke-admin-web-scaffold';
import LoginSelector from './login-selector';
import {authStore, authActions} from './login-actions';
import VersionInfo from './version.json';

const pageComponents = AllManagerPages;

const i18nConfig = {
  'zh-CN': '中文',
  'en-US': 'English',
}

function selector(state) {
  return state;
}

class LoginFilter extends React.Component {
  // componentDidMount() {
  //   this.props.autoLogin();
  // }
  render() {
    const {isLogin} = this.props;
    return (
      <LoginSelector {...this.props}>
        {
          isLogin ? (
            <ManagerAPP
              {...this.props}
              versionInfo={VersionInfo}
              menuMappers={{
                child: 'child',
                code: 'code',
                title: 'title',
                icon: 'icon',
              }}
              i18nConfig={i18nConfig}
              pluginComponent={{}}
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