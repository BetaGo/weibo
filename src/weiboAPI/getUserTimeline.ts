import axios from 'axios';

export type UserTimelineConfig = {
  access_token: string,     // true  string 采用OAuth授权方式为必填参数，OAuth授权后获得。
  uid?: number,              // false  int64  需要查询的用户ID。
  screen_name?: string,      // false  string  需要查询的用户昵称。
  since_id?: number,         // false  int64  若指定此参数，则返回ID比since_id大的微博（即比since_id时间晚的微博），默认为0。
  max_id?: number,           // false  int64  若指定此参数，则返回ID小于或等于max_id的微博，默认为0。
  count?: number,            // false  int  单页返回的记录条数，最大不超过100，超过100以100处理，默认为20。
  page?: number,             // false  int  返回结果的页码，默认为1。
  base_app?: 0 | 1,         // false  int  是否只获取当前应用的数据。0为否（所有数据），1为是（仅当前应用），默认为0。
  feature?: 0 | 1 | 2 | 3 | 4,          // false  int  过滤类型ID，0：全部、1：原创、2：图片、3：视频、4：音乐，默认为0。
  trim_user?: 0 | 1,        // false  int  返回值中user字段开关，0：返回完整user字段、1：user字段仅返回user_id，默认为0。
};

function getUserTimeline(params: UserTimelineConfig) {
  const config = Object.assign({}, params);
  return axios({
    method: 'get',
    params: config,
    url: 'https://api.weibo.com/2/statuses/user_timeline.json',
  });
}

export default getUserTimeline;
