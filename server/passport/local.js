const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const SHA256 = require('crypto-js/sha256');

const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {   
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {            
            const hashedPassword = SHA256(password + email).toString();
            if (exUser.password == hashedPassword) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다" });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다" });
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};