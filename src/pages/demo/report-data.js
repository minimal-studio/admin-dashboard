import React from 'react';
import { ShowModal, CloseModal, DescHelper } from 'ukelli-ui';

const getTestData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          UserName: 'Name1',
          Address: 'gd',
          Phone: '99999999',
          Status: '在家',
          Weight: 58,
        },
        {
          UserName: 'Name2',
          Address: 'hk',
          Phone: '99999998',
          Status: '在外',
          Weight: 58,
        },
        {
          UserName: 'Name3',
          Address: 'moc',
          Phone: '99999997',
          Status: '在内',
          Weight: 58,
        },
      ]);
    }, 1000);
  });
};

const keyFieldsForReport = [
  'username_for_user',
  {
    key: 'Address',
    labels: {
      gd: 'red',
      hk: 'green',
      moc: 'orange',
    },
    namesMapper: {
      gd: '广东',
      hk: '香港',
      moc: '澳门',
    }
  },
  {
    key: 'Status',
    title: {
      type: 'selector',
      values: {
        0: '在家',
        1: '在外',
        2: '在内',
      },
      onChange: (val) => {
        ShowModal({
          title: '改变的值',
          children: (
            <div>{JSON.stringify(val)}</div>
          )
        });
      }
    }
  },
  'Phone',
  {
    key: 'Weight',
    filter: (str, item, mapper, idx) => {
      // 这里是过滤每一条 Weight 字段的 filter 函数
      return str + 'kg';
    }
  }
];

export {
  getTestData, keyFieldsForReport
};