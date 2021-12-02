const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password",
      },
      async (userId, password, done) => {
        // 프론트 로그인의 경우 password가 Email로 되어있다.
        // 관리자 로그인의 경우 기존과 동일
        try {
          const user = await User.findOne({
            where: { userId },
          });

          // 아이디로 유저를 검색했을때, 없으면 바로 생성해준다.
          if (!user) {
            return done(null, false);
          }

          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }

          return done(null, false, { reason: "비밀번호가 일치하지 않습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
