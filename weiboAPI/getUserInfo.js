const axios = require('axios');

const defaultConfig = {
  access_token: null, // 采用OAuth授权方式为必填参数，OAuth授权后获得。
  uid: null, // 需要查询的用户ID。
  screen_name: null, // 需要查询的用户昵称。
};

function getUserInfo(config = defaultConfig) {
  return axios({
    method: 'get',
    params: config,
    url: 'https://api.weibo.com/2/users/show.json',
  });
}

module.exports = getUserInfo;
