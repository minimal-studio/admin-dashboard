import generateNavConfig from './generate-nav-config';

const NAV_MENU_CONFIG = [
  generateNavConfig,
  {
    title: '范例菜单',
    icon: 'demo',
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
        title: '测试表单',
        code: 'TestForm',
      },
      {
        title: '测试表单with tmpl',
        code: 'TestFormWithTMPL',
      },
    ]
  },
  {
    title: '系统管理',
    icon: 'system',
    child: [
      {
        title: '前端资源管理',
        code: 'FEDeploy'
      }
    ]
  },
]

export default NAV_MENU_CONFIG;
