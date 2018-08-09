'use strict';

/**
 * Author: Alex Zhang
 * Desc: 此文件为生成环境的主要入口文件
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'unistore/react';

/**
 * 通用代码块
 */

import './config/app-config';

import * as AllManagerPages from './pages';

/**
 * 样式文件
 */
import './app.scss';

import {ManagerAPP} from 'orion-admin-web-scaffold';
import LoginSelector from './login-selector';
import {authStore, authActions} from './login-actions';
import VersionInfo from './version/version';

const pageComponents = AllManagerPages;

function selector(state) {
  return state;
}

class LoginFilter extends React.Component {
  componentDidMount() {
    this.props.autoLogin();
  }
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
              HeaderPlugin={null}
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

ReactDOM.render(
  <Provider store={authStore}>
    <LoginFilterWithStore/>
  </Provider>,
  document.getElementById('Main')
);
