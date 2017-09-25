import axios from 'axios';

export type EmotionsConfig = {
  access_token: string, // 采用OAuth授权方式为必填参数，OAuth授权后获得。
  type?: string, // false string 表情类别，face：普通表情、ani：魔法表情、cartoon：动漫表情，默认为face。
  language?: string, // false string 语言类别，cnname：简体、twname：繁体，默认为cnname。
};

/**
 * 获取当前登录用户及其所关注（授权）用户的最新微博
 * @param {Object} 请求参数
 */
function getEmotions(params: EmotionsConfig) {
  const config = Object.assign({}, params);
  return axios({
    url: 'https://api.weibo.com/2/emotions.json',
    method: 'get',
    params: config,
  });
}

export default getEmotions;
