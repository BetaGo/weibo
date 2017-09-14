const express = require('express');
const User = require('../models/user');
const getHomeTimeline = require('../weiboAPI/getHomeTimeline');

const router = express.Router();

router.get('/', (req, res, next) => res.json({ api: 'api page' }));

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
        const homeTimeline = await getHomeTimeline({ access_token });
        res.json(homeTimeline.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
});

module.exports = router;
