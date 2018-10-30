import generateNavConfig from './generate-nav-config';

const NAV_MENU_CONFIG = [
  generateNavConfig,
  {
    title: '范例菜单',
    icon: 'feather-alt',
    child: [
      {
        title: '首页',
        code: 'HomePage',
      },
      {
        title: '测试表格',
        code: 'TestReport',
      },
      {
        title: '表格异步获取查询条件',
        code: 'ReportAsync',
      },
      {
        title: '测试表单',
        code: 'TestForm',
      },
      {
        title: '异步获取表单数据示例',
        code: 'FormAsync',
      },
      {
        title: '测试表单with tmpl',
        code: 'FormWithTMPL',
      },
      {
        title: '测试表单with tmpl2',
        code: 'FormWithTMPL2',
      },
      {
        title: '404',
        code: 'Notfound',
      },
    ]
  },
  {
    title: '系统管理',
    icon: 'chalkboard',
    child: [
      {
        title: '前端资源管理',
        code: 'FEDeploy'
      }
    ]
  },
];

export default NAV_MENU_CONFIG;
