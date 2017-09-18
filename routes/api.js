const express = require('express');
const User = require('../models/user');

// APIs
const getHomeTimeline = require('../weiboAPI/getHomeTimeline');
const getUserInfo = require('../weiboAPI/getUserInfo');

const router = express.Router();

function routerFactoryGet(path, apiFunc) {
  router.get(path, async (req, res, next) => {
    if (!req.session.user) {
      res.sendStatus(401);
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
          const { query } = req;
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
routerFactoryGet('/user_info', getUserInfo);

router.get('/token', async (req, res, next) => {
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

module.exports = router;
