const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  const { uid } = req.session.user;
  res.render('home', {
    uid,
  });
});

module.exports = router;
