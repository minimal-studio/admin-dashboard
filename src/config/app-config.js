import {defineGlobalScope, EventEmitter} from 'basic-helper';
import FrontEndNameMappers from './key-mappers';
import {iconMapper, iconPrefix} from './icon-mapper';

import {setUkelliConfig} from 'ukelli-ui';
import {initFields} from '../actions/lib/fields';

import {
  GateResSpeedTesterClass,
  openWindowUseHashUrl, PollClass
} from 'orion-request';
import {$request, PollingEntity} from './req-filter';

import { APIS } from './interface.js';


function getAllGateUrls() {
  return window.ManagerURL || [];
}

const gateResSpeedTester = new GateResSpeedTesterClass();
gateResSpeedTester.setConfig({
  gateUrls: getAllGateUrls(),
  suffix: '/back'
});

function SetGateUrl(selectedGate) {
  /**
   * 统一修改 gate url 的接口
   */
  let gateUrl = selectedGate || gateResSpeedTester.getFastestGate();

  let currReqUrl = `${gateUrl}/back`;
  // let currPollUrl = `${gateUrl}/back2`;

  /**
   * 设置完线路，需要把 $request 和 PollingEntity 对象中的请求地址也修改才能生效
   */
  $request.setRequestConfig({
    reqUrl: currReqUrl,
    // compressLenLimit: 1000000,
    wallet: window.__none
  });
  // PollingEntity.setPollUrl(currPollUrl);
}

function getDefaultFastestGate() {
  gateResSpeedTester.onEnd = handleRes;
  gateResSpeedTester.test();
  function handleRes(result) {
    const {fastestIdx, testRes} = result;
    let fastUrl = testRes[fastestIdx];
    SetGateUrl(fastUrl.originUrl);
  }
}

(function init() {
  SetGateUrl();
  setTimeout(() => {
    getDefaultFastestGate();
  }, 100);
})();

const defaultPaging = {
  UsePaging: 1,
  AllCount: -1,
  PageIndex: 0,
  PageSize: 10
};

function getKeyMap(key) {
  let keyMapper = Object.assign({}, window.KEY_MAPPERS);
  return key === 'all' ? keyMapper : keyMapper[key] || key || '';
}

function getImage(imageMapperKey, extendPath) {
  if(!imageMapperKey) return console.log('Wrong parameters');
  let result = $Config.IMAGE_MAPPER[imageMapperKey] || '';
  if(extendPath) result = result.replace(/\/$/, '') + '/' + extendPath;
  return result;
}

let commonFuncs = {
  getImage,
  getKeyMap,
  $request,
  DefaultPaging: defaultPaging,
  isMobile: !window.IsDesktopMode,
}

let ManagerConfig = commonFuncs;

setUkelliConfig(Object.assign({}, commonFuncs, {
  iconMapper,
  iconPrefix,
}));

/**
 * 为了已经被定义的不被覆盖，保证全局变量的唯一性与不可更改性
 * 例如
 * window.$request = null，这是不起作用的
 */
Object.defineProperties(window, {
  $request: {
    value: $request,
    writable: false
  },
  APIS: {
    value: APIS,
    writable: false
  },
});

Object.assign(window, {
  KEY_MAPPERS: Object.assign({}, window.KEY_MAPPERS, FrontEndNameMappers),
});

defineGlobalScope('$MN', ManagerConfig);
initFields();
