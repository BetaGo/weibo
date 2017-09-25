import * as express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  const { uid } = req.session.user;
  res.render('home', {
    uid,
  });
});

export default router;
