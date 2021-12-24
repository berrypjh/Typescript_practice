const express = require('express');
const passport = require('passport');
const { User } = require("../models");
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => {
  const Login = await User.findOne({
    where: {
      email: req.body.email,
    }
  })

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(401).json({ loginSuccess: false });
    }
    if (info) {
      return res.status(401).json({ loginSuccess: false, message: info });
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        return res.status(400).json({ loginSuccess: false });
      }
      const UserInfo = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        }
      })
      return res.status(200).json({ UserInfo , loginSuccess : true });
    });
  })(req, res, next);
});

module.exports = router;