import * as express from 'express';
import axios from 'axios';
import * as secret from '../secret/weibo';
import User from '../models/user';

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
      const result = await axios(weiboConfig);
      // console.log(result.data);
      const resultData = result.data;
      if (resultData.error) {
        console.log(`授权出错: ${resultData.error}`);
        next();
      }
      let user = await User.findOne({ uid: resultData.uid }).exec();
      if (!user) {
        user = new User(resultData);
        await user.save();
        req.session.user = resultData;
        console.log('存储 access_token 成功');
        res.redirect('/home');
      } else {
        User.update({ uid: resultData.uid }, resultData).exec();
        resultData.access_token = null;
        req.session.user = resultData;
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

export default router;
