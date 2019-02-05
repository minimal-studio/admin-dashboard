import React from 'react';
import { Menus } from 'ukelli-ui';

const menusForUser = (options) => {
  const { hide, logout } = options;
  return (
    <Menus data={[
      {
        text: 'Setting',
        action: () => {
          hide();
        }
      },
      {
        text: 'Profile',
        action: () => {}
      },
      '-',
      {
        text: 'Logout',
        action: () => {
          hide();
          logout();
        }
      },
    ]} />
  );
};

const menusForTask = ({ hide }) => {
  return (
    <Menus data={[
      {
        text: 'Github',
        icon: 'git',
        action: () => {
          hide();
          window.open('https://github.com/SANGET/uke-dashboard.git');
        }
      },
      {
        text: 'Blog',
        icon: 'rss-square',
        action: () => {
          hide();
          window.open('https://ukelli.com');
        }
      },
      {
        text: 'About',
        icon: 'assistive-listening-systems',
        action: () => {
          hide();
          window.open('https://ukelli.com');
        }
      },
    ]} />
  );
};

const menusForComment = ({ hide }) => {
  return (
    <Menus data={[
      {
        text: 'Item1',
        action: () => {
          hide();
        }
      },
      {
        text: 'Item2',
        action: () => {}
      },
      {
        text: 'Item3',
        action: () => {}
      },
    ]} />
  );
};

const statusbarConfig = [
  {
    title: '',
    icon: 'user',
    children: menusForUser
  },
  {
    title: '',
    icon: 'comment',
    children: menusForComment
  },
  {
    title: '',
    icon: 'tasks',
    children: menusForTask
  },
];

export default statusbarConfig;