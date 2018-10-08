import {setUkelliConfig} from 'ukelli-ui';

// import { initFields } from '../lib/fields';
import FrontEndNameMappers from './key-mappers';
import { iconMapper, iconPrefix } from './icon-mapper';
import { $request } from './req-filter';
import { APIS } from './interface';

import './listener';

function SetGateUrl(selectedGate) {
  /**
   * 统一修改 gate url 的接口
   */
  let gateUrl = selectedGate;

  /**
   * 设置完线路，需要把 $request 和 PollingEntity 对象中的请求地址也修改才能生效
   */
  $request.setConfig({
    baseUrl: gateUrl,
    // compressLenLimit: 1000000,
    wallet: window.__wallet
  });
}

(function init() {
  SetGateUrl(window.ManagerURL);
})();

export function getKeyMap(key) {
  let keyMapper = Object.assign({}, window.KEY_MAPPERS);
  return key === 'all' ? keyMapper : keyMapper[key] || key || '';
}

export function getImage(imageMapperKey, extendPath) {
  if(!imageMapperKey) return console.log('Wrong parameters');
  let result = window.$Config.IMAGE_MAPPER[imageMapperKey] || '';
  if(extendPath) result = result.replace(/\/$/, '') + '/' + extendPath;
  return result;
}

const commonFuncs = {
  getImage,
  getKeyMap,
  $request,
  isMobile: !window.IsDesktopMode,
};

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
  $R: {
    value: $request,
    writable: false
  },
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

// initFields();
