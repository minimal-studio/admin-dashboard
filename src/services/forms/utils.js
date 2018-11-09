import { IsFunc } from "basic-helper";

const defaultRetrueObj = false;

const resolveParams = (params) => {
  const hasParams = params.length > 0;
  if(!hasParams) return console.log('need params');

  const isArray = Array.isArray(params);
  const names = isArray ? params : [params];

  return names;
};

const getFromMapper = (mapper, params, merger, options = {}) => {
  const { returnObj = defaultRetrueObj } = options;
  const names = resolveParams(params);

  let result = returnObj ? {} : [];
  
  for (const name of names) {
    const currMapper = mapper[name];
    if(currMapper) {
      const res = IsFunc(currMapper) ? currMapper() : Object.assign({}, currMapper, merger ? merger[name] || {} : {});
      returnObj ? result[name] = res : result.push(res);
    }
  }
  return result;
};

const getFromMapperSync = async (mapper, params, merger, options = {}) => {
  const { returnObj = defaultRetrueObj } = options;
  const names = resolveParams(params);

  let result = returnObj ? {} : [];
  
  for (const name of names) {
    const currMapper = mapper[name];
    if(currMapper) {
      const res = IsFunc(currMapper) ? await currMapper() : Object.assign({}, currMapper, merger ? merger[name] || {} : {});
      returnObj ? result[name] = res : result.push(res);
    }
  }
  return result;
};

export {
  getFromMapper, getFromMapperSync
};