/**
 * 这里是根据具体业务的处理filter
 */

import {EventEmitter} from 'basic-helper';
import {$request, PollClass} from 'uke-request';

// import {getUserInfo, onLoginFail} from '../login-actions';
import {authStore} from '../login-actions';

function getUserName() {
  return authStore.getState().username;
}
function getSessID() {
  return authStore.getState().sessID;
}

/**
 * 获取全局的请求的 header
 */
function getCommonHeader() {
  let reqHeader = {
    SessId: getSessID(),
    AdminName: getUserName(),
    Platform: window.PLATFORM,
    Device: window.DEVICE,
  };

  window.COMMON_REQ_HEADER = reqHeader;
  return reqHeader;
}

/**
 * 前端应该与服务端的接口分离
 * 通过此方法实现对接远端需要的 request 数据
 */
$request.wrapDataBeforeSend = (options) => {
  const {isCompress, method, data, ...params} = options;
  return {
    header: Object.assign({}, getCommonHeader(data), {
      Compress: isCompress ? 1 : 0,
      Method: method,
    }, {...params}),
    // path: method,
    data
  };
};

/**
 * 前端应该与服务端的接口分离
 * 通过此方法实现对接 response 数据
 * 前端统一接口
 * resData = {
 *   data: {} || [], // 对接远端接口的数据
 *   paging: {},     // 分页信息
 *   resCode: '',    // response 的业务代码，0 或者没有代指业务错误
 *   err: null || 'description' // 对接 response 的错误描述
 * }
 */
$request.setResDataHook = (resData) => {
  if(typeof resData !== 'object') resData = {};
  resData.data = resData.data || resData.Data || {};
  return resData;
};

/**
 * 设置 $request 对象的 res
 */
function handleRes({resData, callback}) {
  // let errcode = resData.errCode;
  // switch (errcode) {
  //   case '1':
  //   case '2':
  //   case '3':
  //     // TODO 处理登录错误的业务
  //     // onLoginFail(errcode.Desc);
  //     break;
  // }
}

/**
 * 监听 $request res 处理函数
 */
$request.on('onRes', handleRes);

/**
 * 轮询对象的设置
 */
const PollingEntity = new PollClass(2);
PollingEntity.setReqObj($request);

export {
  $request, PollingEntity
};
