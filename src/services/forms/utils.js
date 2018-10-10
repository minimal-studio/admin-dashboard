import { IsFunc } from "basic-helper";

export default function getFromMapper(mapper, params, merger, options = {}) {
  const hasParams = params.length > 0;
  if(!hasParams) return console.log('need params');
  const { returnObj = false } = options;

  const isArray = Array.isArray(params);
  const names = isArray ? params : [params];

  let result = returnObj ? {} : [];
  
  for (const name of names) {
    if(mapper[name]) {
      const res = IsFunc(mapper[name]) ? mapper[name]() : Object.assign({}, mapper[name], merger ? merger[name] || {} : {});
      returnObj ? result[name] = res : result.push(res);
    }
  }
  return result;
}