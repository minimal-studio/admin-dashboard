import React from 'react';
import { Menus } from 'ukelli-ui';

const menus = ({ hide }) => {
  return (
    <Menus data={[
      {
        text: 'Menu1',
        action: () => {
          hide();
        }
      },
      {
        text: 'Menu2',
        action: () => {}
      },
      {
        text: 'Menu3',
        action: () => {}
      },
    ]} />
  );
};

const statusbarConfig = [
  {
    title: '',
    icon: 'user',
    children: menus
  },
  {
    title: '',
    icon: 'comment',
    children: menus
  },
  {
    title: '',
    icon: 'tasks',
    children: menus
  },
];

export default statusbarConfig;