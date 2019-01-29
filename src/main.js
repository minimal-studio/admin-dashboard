'use strict';

/**
 * Author: Alex Zhang
 * Desc: 此文件为生成环境的主要入口文件
 */

import React from 'react';
import { Provider, connect } from 'unistore/react';
import { hot } from 'react-hot-loader';

import { Call } from 'basic-helper';

/**
 * 通用代码块
 */

import { AdminWebScaffold } from 'uke-admin-web-scaffold';

import './config/app-config';
import * as AllManagerPages from './pages';

import LoginSelector from './auth/selector';
import { authStore, authActions } from './auth/actions';
import VersionInfo from './version.json';
import DashBoard from './dash-board';
import statusbarConfig from './statusbar-config';

/**
 * 样式文件
 */
import './app.scss';

const pageComponents = {...AllManagerPages, DashBoard};

const i18nConfig = {
  'zh-CN': '中文',
  'en-US': 'English',
};

function selector(state) {
  return state;
}

const Status = ({onLogout}) => {
  return (
    <React.Fragment>
      <span className="flex"/>
      {/* <div className="actions mr10">
        <span className="_btn" onClick={e => onLogout()}>退出登录</span>
      </div> */}
    </React.Fragment>
  );
};

class LoginFilter extends React.Component {
  componentDidMount() {
    // this.props.autoLogin();
    Call(window.OnLuanched);
  }
  render() {
    const { isLogin, userInfo } = this.props;
    return (
      <LoginSelector {...this.props}>
        {
          isLogin ? (
            <AdminWebScaffold
              {...this.props}
              // 必须填写的
              bgStyle={{
                // background: `url(./images/bg/bg_1.jpg)`,
                // backgroundColor: '#f3f3f3',
                // opacity: 0.1
              }}
              username={userInfo.username}
              statusbarConfig={statusbarConfig}
              versionInfo={VersionInfo}
              menuMappers={{
                child: 'child',
                code: 'code',
                title: 'title',
                icon: 'icon',
              }}
              title="Uke 管理系统"
              i18nConfig={i18nConfig}
              pluginComponent={{
                Statusbar: <Status />,
                DashBoard: <DashBoard />
              }}
              pageComponents={pageComponents} />
          ): null
        }
      </LoginSelector>
    );
  }
}
const LoginFilterWithStore = connect(selector, authActions)((userStore) => {
  return (
    <LoginFilter {...userStore}/>
  );
});

const C = () => (
  <Provider store={authStore}>
    <LoginFilterWithStore/>
  </Provider>
);

export default hot(module)(C);