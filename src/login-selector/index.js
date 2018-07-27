import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import LoginPanel from './login-panel';

export default class LoginSelector extends Component {
  render() {
    const { children, isLogin } = this.props;

    let container;
    switch (true) {
      case isLogin:
        container = React.cloneElement(children, this.props);
        break;
      default:
        container = (
          <LoginPanel
            {...this.props}/>
        );
    }
    return (
      <TransitionGroup component={null}>
        <CSSTransition
          key={isLogin ? 'LOGIN_SUCCESS' : 'NO_LOGIN_YET'}
          classNames="fade" timeout={200}>
          {container}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
