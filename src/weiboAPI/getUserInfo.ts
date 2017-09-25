import axios from 'axios';

export type UserInfoConfig = {
  access_token: string, // 采用OAuth授权方式为必填参数，OAuth授权后获得。
  uid?: number, // 需要查询的用户ID。
  screen_name?: string, // 需要查询的用户昵称。
};

/**
 * 根据用户ID获取用户信息
 * @param {Object} params
 */
function getUserInfo(params: UserInfoConfig) {
  const config = Object.assign({}, params);
  return axios({
    method: 'get',
    params: config,
    url: 'https://api.weibo.com/2/users/show.json',
  });
}

export default getUserInfo;
