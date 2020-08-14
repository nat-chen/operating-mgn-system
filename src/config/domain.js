
const baseDomain = `${window.location.protocol}//${window.location.host}`;
const resDomain = 'https://res.qxueyou.com/';
const serverContext = '/v3/operation';
const urlContext = '/v3/operating';

export default {
  baseDomain,
  resDomain,
  requestRoot: baseDomain + serverContext,
  // baseUrl: serverContext,
  // htmlRoot: baseDomain + htmlContext,
  // serverRoot: baseDomain + serverContext,
  // upload: `${serverContext}/base/file/upload`,
  // uploadChunk: `${serverContext}/base/file/uploadChunk`,
  // productHome: `${baseDomain}/v3/web/product/home`,
  // learningLogin: `${baseDomain}/v3/h5/#/entry/login`,
  // documentTitle: 'Q 学友运营管理系统'
}