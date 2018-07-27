/**
 * 中英映射，主要是映射一些服务器没法配置的项
 */

const FrontEndNameMappers = {
  // 前端字段映射
  action: '操作',
  // 表单的映射
  username: '用户名',
  oldPassword: '旧资金密码',
  newPassword: '新登录密码',
  changeType: '账变类型',
  citySelector: '开户银行城市',
  newSecPassword: '新资金密码',
  displayBal: '现金余额',

  UserBankCardId: '选择银行',

  _subtypes: '账变类型',
  BALANCE: '现金',
  BONUS: '分红',
  TeamMemberNumber: '团队总人数',
  ParentNames: '代理层级',
  AGTDBB: 'AG团队报表',
  AGGRBB: 'AG个人报表',
  Mailbox: '留言反馈',
  ActivityThumb: '活动列表',
  AgTransfer: 'AG 钱包',
  ShabaTransfer: '沙巴钱包',
  KYTransfer: '开元钱包',
  Bonus2Cash: '分红转现金',
  YXZZJL: '钱包转换记录',

  // 按钮
  orderDirectBtn: '直接投注',
  pickOrder: '加入选号区',
  pickedList: '选号区',
  randomBtn: '机选',
  showhand: '一键梭哈',
  clearBtn: '清空选号区',
  sureOrderBtn: '确认投注',
  apBtn: '追号',

  DEPOSIT: '存款',
  PECX: '配额查询',

  HostCodeStatistic: '冷热',
  LeakCodeStatistic: '遗漏',

  INIT_NETWORK_STATUS: '',
  NO_LOGIN_TOKEN: '安全登录',
  LOGGING: '登录中',
  AUTO_LOGGING: '自动登录中, 请稍后',
  LOGIN_SUCCESS: '登录成功',
  LOCK_SCREEN: '锁屏中, 请输入密码解锁',
  UN_LOCKING_SCREEN: '解锁中',
  LOGIN_FAIL: '登录错误',
  LOGOUT: '登出成功',
}

export default FrontEndNameMappers;
