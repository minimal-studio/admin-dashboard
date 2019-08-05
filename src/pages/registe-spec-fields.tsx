/**
 * 这里是注册公用的 username 字段
 * 1. 统一处理查看用户详情
 * 2. 处理代理详情
 * 3. TODO
 */

import React from 'react';

import { Link } from 'uke-admin-web-scaffold';

import { setFields } from '../services/fields';

setFields({
  username_for_user: {
    key: 'Username',
    fixed: 'left',
    filter: (str, item, mapper, idx) => {
      return (
        <Link to="TestLink" params={{
          n: str
        }}>
          {str}
        </Link>
      );
    }
  },
});