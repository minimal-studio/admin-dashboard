/**
 * 公用的 fields
 * 定义所有的报表的字段的属性
 */

let namesMapper = [
  'TransferType',
  'Unit',
  'Status',
];
let moneyMapper = [
  'RealCost',
  'Award',
  'TransferAmt',
  'BetAmount',
  'NetAmount',
  'Profit',
  'Salary',
  'Deposit',
  'Withdraw',
  'Ret',
  'Activity',
  'Adjust',
  'SlotBet',
  'SlotAward',
  'SlotProfit',
  'SscProfit',
  'TotalProfit',
  'ValidBetAmount',
  'TotalCost',
  'AfterBalance',
  'AfterBonus',
];
let abvMoneyMapper = [
  'Bet',
  'Amount',
];
let datetimeMapper = [
  'OrderTime',
  'AddTime',
  'UpdTime',
  'PayTime',
  'BetTime',
  'ActionTime',
];
let dateMapper = [
  // 'CalcEndDate',
  // 'CalcStartDate',
];
let normalFields = [
  'Account',
  'OrderId',
  'LottType',
  'PlayType',
  'Issue',
  'BillNo',
  'Cagent',
  'ErrMsg',
  'ApplyId',
  'ReportDate',
  'Currency',
  'GameName',
  'Flag',
  'SubtypeCnName',
  'Remark',
  'FundChangeId',
];

/**
 * 为了避免：不同的功能的同样的字段的冲突的问题
 * 如果 commonFields 定义了有对应的字段，则会自动赋予对应的属性
 */
let scopeFields = {};

function initFields() {
  if(scopeFields.common) return;
  let commonFields = (function() {
    let resultObj = {};
    function setResultObj(key, val) {
      if(resultObj.hasOwnProperty(key)) console.log('重复配置了 ' + key + ' 请检查');
      resultObj[key] = val;
    }
    namesMapper.map(item => setResultObj(item, {namesMapper: $MN.getKeyMap('all')}));
    moneyMapper.map(item => setResultObj(item, {money: true}));
    abvMoneyMapper.map(item => setResultObj(item, {abvMoney: true}));
    dateMapper.map(item => setResultObj(item, {date: true}));
    datetimeMapper.map(item => setResultObj(item, {datetime: true}));
    normalFields.map(item => setResultObj(item, ''));

    return resultObj;
  })();
  scopeFields = {
    common: commonFields
  };
}

const defaultScope = 'common';

function setFields(fields, scope = defaultScope) {
  if(!scopeFields[scope]) scopeFields[scope] = {};
  Object.assign(scopeFields[scope], fields);
}
function getFields(options) {
  /**
   * TODO 写下参数说明
   */
  let {names, scope = defaultScope, extend} = options;
  let _configNames = Array.isArray(names) ? names : [names];
  let result = [];
  let currScopeFieldGroup = scopeFields[scope];

  _configNames.forEach(name => {
    if(!name) return;
    let currConfig = currScopeFieldGroup[name];
    let currCommonField = scopeFields.common[name];
    result.push(Object.assign({}, {
      key: name,
    }, currConfig, currCommonField));
  });
  if(extend) result.push(extend);
  return result;
}
function getFieldsConfig(scope) {
  return scope ? Object.assign({}, scopeFields[scope]) : scopeFields;
}

export {
  getFieldsConfig, getFields, setFields, initFields
}
