const express = require('express');
const axios = require('axios');
const secret = require('../secret/weibo');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/weibo');
});

router.get('/weibo', async (req, res, next) => {
  const { code } = req.query;
  if (code) {
    const weiboConfig = {
      method: 'post',
      url: 'https://api.weibo.com/oauth2/access_token',
      params: {
        code,
        grant_type: 'authorization_code',
        client_id: secret.client_id,
        client_secret: secret.client_secret,
        redirect_uri: secret.redirect_uri,
      },
    };
    try {
      let result = await axios(weiboConfig);
      // console.log(result.data);
      result = result.data;
      if (result.error) {
        console.log(`授权出错: ${result.error}`);
        next();
      }
      let user = await User.findOne({ uid: result.uid }).exec();
      if (!user) {
        user = new User(result);
        await user.save();
        req.session.user = result;
        console.log('存储 access_token 成功');
        res.redirect('/home');
      } else {
        User.update({ uid: result.uid }, result).exec();
        result.access_token = null;
        req.session.user = result;
        console.log('更新 access_token 成功');
        res.redirect('/home');
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    next();
  }
});

module.exports = router;
