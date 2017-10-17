export const host = 'http://192.168.56.20';
export const port = 8080;
export const path = {
  emotions: '/emotions',
  homeTimeline: '/Home_timeline',
  userInfo: '/user_info'
};
export const emotions = `${host}:${port}${path.emotions}`; // 获取微博表情
export const homeTimeline = `${host}:${port}${path.homeTimeline}`;
export const userInfo = `${host}:${port}${path.userInfo}`;