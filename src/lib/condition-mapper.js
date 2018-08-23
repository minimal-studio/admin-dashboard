/**
 * 根据具体的业务制定所有的查询条件
 */


/**
 * 同步获取查询条件的定义
 */
export const SYNC_CONDITION_DEMO = {
  key1: '字段1',
  key2: '字段2',
};
export let conditionOptionsMapper = {
  condition1: {
    type: 'radio',
    ref: 'AgentType',
    defaultValue: 'key2',
    values: SYNC_CONDITION_DEMO
  },
}

/**
 * 异步获取查询条件的定义
 */
let asyncConditions = {
  conditionFromRemote: {
    type: 'select',
    isMultiple: true,
    _asyncConfig: {
      /**
       * [key] 异步设置的字段
       */
      values: getChangeTypes('object'),
      defaultValue: setChangeTypesDefaultVal
    },
    className: 'fund-change-selector',
    ref: '_subtypes'
  },
}

export function getConditionOptionsMapper(optionKeys) {
  let result = Object.assign({}, conditionOptionsMapper);
  if(optionKeys) {
    let optionKeysArr = Array.isArray(optionKeys) ? optionKeys : [optionKeys];
    optionKeysArr.forEach(key => {
      result[key] = Object.assign({}, conditionOptionsMapper[key]);
    });
  }
  return result;
}

export async function getAsyncConditions(name) {
  if(!name) return console.log('pass name');
  let asyncConfig = asyncConditions[name]._asyncConfig;
  for (var setter in asyncConfig) {
    let getDataFunc = asyncConfig[setter];
    if($GH.IsFunc(getDataFunc)) {
      const resData = await getDataFunc();
      asyncConditions[name][setter] = resData;
    }
  }
  return asyncConditions[name];
}

async function queryRemoteCondition() {
  const sendData = {
    method: 'api',
    data: {}
  };
  const resData = await $MN.$request.send({sendData});

  return {
    values: resData,
    defaultValue: resData[1]
  }
}

let remoteConditionData = {
  values: [],
  defaultValue: ''
};
function getChangeTypes(returnType = 'object') {
  return async function() {
    const hasData = remoteConditionData.length != 0;

    if(!hasData) remoteConditionData = await queryRemoteCondition();

    switch (returnType) {
      case 'object':
        return remoteConditionData;
      case 'array':
        return remoteConditionData.values;
    }
  }
}

function setChangeTypesDefaultVal() {
  let result = Object.keys(ChangeTypesForSelect);
  return result;
}
