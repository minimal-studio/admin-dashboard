import { IsFunc } from "basic-helper";

export default function getFromMapper() {
  const [mapper, ...preArguments] = arguments;
  const hasParams = preArguments.length > 0;
  if(!hasParams) return console.log('need params');

  const isArray = Array.isArray(preArguments[0]);
  const names = isArray ? preArguments[0] : preArguments;

  let result = [];
  
  for (const name of names) {
    if(mapper[name]) {
      result.push(IsFunc(mapper[name]) ? mapper[name]() : mapper[name]);
    }
  }
  return result;
}