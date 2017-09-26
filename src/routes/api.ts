import * as express from 'express';

import { default as User, UserModel } from '../models/user';
import getHomeTimeline from '../weiboAPI/getHomeTimeline';
import { default as getUserInfo, UserInfoConfig } from '../weiboAPI/getUserInfo';
import getEmotions from '../weiboAPI/getEmotions';

const router = express.Router();

function routerFactoryGet(path: string, apiFunc: Function, cb?:Function) {
  router.get(path, async (req, res, next) => {
    if (!req.session.user) {
      res.sendStatus(401);
      res.json({
        error: '未授权',
      });
    } else {
      const { uid } = req.session.user;
      try {
        const userData: any = await User.findOne({ uid }).exec();
        if (!userData) {
          res.json({
            error: '未知错误',
          });
        } else {
          const { access_token } = userData;
          let { query } = req;
          query = cb ? cb(query, uid) : query;
          console.log({ ...query });
          const result = await apiFunc({ access_token, ...query });
          res.json(result.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  });
}

routerFactoryGet('/home_timeline', getHomeTimeline);
routerFactoryGet('/user_info', getUserInfo, (query:UserInfoConfig, uid: number) => {
  if (!query.uid && !query.screen_name) {
    return { uid, ...query };
  }
  return query;
});
routerFactoryGet('/emotions', getEmotions);

router.get('/token', async (req, res, next) => {
  if (!req.session.user) {
    res.json({
      error: '未授权',
    });
  } else {
    const { uid } = req.session.user;
    try {
      const userData: any = await User.findOne({ uid }).exec();
      if (!userData) {
        res.json({
          error: '未知错误',
        });
      } else {
        const { access_token } = userData;
        res.json({ access_token });
      }
    } catch (e) {
      console.log(e);
    }
  }
});

/*
router.get('/home_timeline', async (req, res, next) => {
  if (!req.session.user) {
    res.json({
      error: '未授权',
    });
  } else {
    const { uid } = req.session.user;
    try {
      const userData = await User.findOne({ uid }).exec();
      if (!userData) {
        res.json({
          error: '未知错误',
        });
      } else {
        const { access_token } = userData;
        const result = await getHomeTimeline({ access_token });
        res.json(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
});

router.get('/user_info', async (req, res, next) => {
  if (!req.session.user) {
    res.json({
      error: '未授权',
    });
  } else {
    const { uid } = req.session.user;
    try {
      const userData = await User.findOne({ uid }).exec();
      if (!userData) {
        res.json({
          error: '未知错误',
        });
      } else {
        const { access_token } = userData;
        const result = await getUserInfo({ access_token, uid });
        res.json(result.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
});
*/

export default router;
