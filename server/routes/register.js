const express = require("express");
const { User } = require('../models');
const SHA256 = require('crypto-js/sha256');
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({
      where: {
        email,
      }
    });
    if (exUser) {
      return res.json({ success: false });
    }

    const hashedPassword = SHA256(password + email).toString();

    await User.create({
      email,
      nick,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

module.exports = router;