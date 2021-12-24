const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('./middlewares');

router.get("/", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

module.exports = router;