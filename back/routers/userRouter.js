const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Op } = require("sequelize");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");
const isNanCheck = require("../middlewares/isNanCheck");
const axios = require("axios");

const router = express.Router();

router.get(
  ["/list", "/list/:listType"],
  isAdminCheck,
  async (req, res, next) => {
    let findType = 1;

    const { listType } = req.params;
    const { name, userId } = req.query;

    const validation = Number(listType);
    const numberFlag = isNaN(validation);

    if (numberFlag) {
      findType = parseInt(1);
    }

    if (validation >= 2) {
      findType = 2;
    } else {
      findType = 1;
    }

    try {
      let users = [];

      const searchName = name ? name : "";
      const searchUserId = userId ? userId : "";

      switch (parseInt(findType)) {
        case 1:
          users = await User.findAll({
            where: {
              nickname: {
                [Op.like]: `%${searchName}%`,
              },
              userId: {
                [Op.like]: `%${searchUserId}%`,
              },
            },
            attributes: {
              exclude: ["password"],
            },
            order: [["createdAt", "DESC"]],
          });
          break;
        case 2:
          users = await User.findAll({
            where: {
              nickname: {
                [Op.like]: `%${searchName}%`,
              },
              userId: {
                [Op.like]: `%${searchUserId}%`,
              },
            },
            attributes: {
              exclude: ["password"],
            },
            order: [["nickname", "ASC"]],
          });
          break;

        default:
          break;
      }

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
    }
  }
);

router.get("/signin", async (req, res, next) => {
  // 배송 조회 데이터
  // axios({
  //   url: "https://apis.tracker.delivery/carriers/kr.cjlogistics/tracks/559494482616",
  //   method: "get",
  //   // url: "{빌링키 발급 요청을 받을 서비스 URL}", // 예: https://www.myservice.com/subscription/issue-billing
  //   // method: "post",
  //   // data: {
  //   //   // 카드번호
  //   //   cardNumber: "4092160302741999",
  //   //   // 유효기간
  //   //   expiry: "0724",
  //   //   // 생년월일
  //   //   birth: "920131",
  //   //   // 비밀번호 앞 두자리
  //   //   pwd2Digit: "74",
  //   //   // 고유 코드
  //   //   customer_uid: "gildong_0001_1234",
  //   // },
  // }).then((rsp) => {
  //   console.log("asdjkajklsdnk");
  //   console.log(rsp.data);
  // });

  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(req.user);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: [
          "id",
          "userId",
          "mobile",
          "nickname",
          "cardNum",
          "cardPeriod",
          "cardIden",
          "cardPassword",
          "level",
        ],
      });

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log(fullUserWithoutPassword);
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    const { userId, password, nickname } = req.body;

    console.log(userId, password, nickname, user);

    if (user) {
      if (err) {
        console.error(err);
        return next(err);
      }

      if (info) {
        console.log(`❌ LOGIN FAILED : ${info.reason}`);
        return res.status(401).send(info.reason);
      }

      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: ["id", "nickname", "level"],
        });

        return res.status(200).json(fullUserWithoutPassword);
      });
    } else {
      // 추가된 코드
      // 특정 유저가 없을 경우 바로 유저를 생성한다.
      // 특이사항으로 유저의 비밀번호가 이메일로 되어있다. => 무조건 SNS로그인만 있기 떄문에
      // 생성 후 생성된 유저로 login처리를 한다.

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        userId,
        email: password,
        password: hashedPassword,
        nickname,
        userPk: userId,
      });

      return req.login(newUser, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        const fullUserWithoutPassword = await User.findOne({
          where: { id: newUser.id },
          attributes: ["id", "nickname", "level"],
        });

        return res.status(200).json(fullUserWithoutPassword);
      });
    }
  })(req, res, next);
});

router.post("/signin/admin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (user.level < 3) {
      console.log(`❌ LOGIN FAILED : 관리자 접속 권한이 없습니다.`);
      return res.status(403).send({ reason: "관리자 접속 권한이 없습니다." }); // Forbbiden 권한 없음
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: ["id", "nickname", "userId", "level"],
      });

      console.log("????");

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// 사용하지 않는 기능 (배포 후 관리자 계정 넣어줄 때 사용)
router.post("/signup", async (req, res, next) => {
  const { userId, email, nickname, mobile, password, userPk } = req.body;

  try {
    const exUser = await User.findOne({
      where: { userId: userId },
    });

    if (exUser) {
      return res.status(401).send("이미 가입된 아이디 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      userId,
      email: req.body.email ? email : null,
      nickname,
      mobile,
      userPk,
      password: hashedPassword,
    });

    res.status(201).send("SUCCESS");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 정보를 불러올 수 없습니다.");
  }
});

router.post("/me/updateNick", isLoggedIn, async (req, res, next) => {
  const { id, nickname } = req.body;

  try {
    const exUser = await User.findOne({ where: { id: parseInt(id) } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    const updateUser = await User.update(
      { nickname },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});
router.post("/me/updateMob", isLoggedIn, async (req, res, next) => {
  const { id, mobile } = req.body;

  try {
    const exUser = await User.findOne({ where: { id: parseInt(id) } });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    const updateUser = await User.update(
      { mobile },
      {
        where: { id: parseInt(id) },
      }
    );

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});

router.post("/findUserId", async (req, res, next) => {
  const { nickname, mobile } = req.body;

  try {
    const exUser = await User.findOne({
      where: {
        nickname,
        mobile,
      },
    });

    if (exUser) {
      return res.status(200).json({ userId: exUser.userId });
    } else {
      return res.status(200).json({ userId: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("아이디를 찾을 수 없습니다.");
  }
});

router.patch("/level/update", isAdminCheck, async (req, res, next) => {
  const { selectUserId, changeLevel } = req.body;

  try {
    const exUser = await User.findOne({
      where: { id: parseInt(selectUserId) },
    });

    if (!exUser) {
      return res
        .status(401)
        .send("잘못된 사용자 입니다. 다시 확인 후 시도해주세요.");
    }

    const currentLevel = parseInt(exUser.dataValues.level);

    if (parseInt(currentLevel) === 5) {
      return res.status(403).send("개발사의 권한을 수정할 수 없습니다.");
    }

    if (parseInt(currentLevel) === parseInt(changeLevel)) {
      return res
        .status(401)
        .send(
          "변경하려는 사용자 권한이 동일합니다. 다시 확인 후 시도해주세요."
        );
    }

    const updateResult = await User.update(
      { level: parseInt(changeLevel) },
      {
        where: {
          id: parseInt(selectUserId),
        },
      }
    );

    if (updateResult[0] === 1) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.post("/phoneNumberCheck", isLoggedIn, async (req, res, next) => {
  const { phoneNum, id } = req.body;

  try {
    // // 알림톡
    let d = new Date();
    let year = d.getFullYear() + "";
    let month = d.getMonth() + 1 + "";
    let date = d.getDate() + "";
    let hour = d.getHours() + "";
    let min = d.getMinutes() + "";
    let sec = d.getSeconds() + "";
    let mSec = d.getMilliseconds() + "";
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    mSec = mSec < 10 ? "0" + mSec : mSec;
    let mKey = "MAS" + year + month + date + hour + min + sec + mSec;

    // 알림톡 전환 필요

    // const profile_key = "569bebdbe801200fcfa70fcf12b2d587bd95f8a7";
    const profile_key = "a52fe945072e0cf2ec85bc9811590d6065ef33e0";

    let str = "";
    for (let i = 0; i < 6; i++) {
      str += Math.floor(Math.random() * 10);
    }

    const trakerApi = await axios({
      url: `https://dev-alimtalk-api.sweettracker.net/v2/${profile_key}/sendMessage`,
      method: "post", // POST method
      headers: {
        "Content-Type": "application/json",
        userid: "tracker_partner",
      }, // "Content-Type": "application/json"
      data: [
        {
          msgid: mKey, // 고유한 메시지 코드
          message_type: "AT", // 알림톡 타입 => AT : 알림톡, AI : 이지미 알림톡
          profile_key, // 발신 프로필 키
          template_code: "io_num2", // 템플릿 코드
          // template_code: "io_num", // 템플릿 코드
          receiver_num: `${phoneNum}`, // 사용자 연락처
          message: `[아이오박스]
아이오박스 휴대폰 인증을 위한 인증번호는 아래와 같습니다.

인증번호 : ${str}
`, // 알림톡 내용

          reserved_time: "00000000000000", // 즉시 발송
        },
      ],
    });

    await User.update(
      {
        secret: str,
        mobile: phoneNum,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({ result: true });
  } catch (e) {
    console.log(e);
    return res.status(401).send("휴대폰 인증을 할 수 없습니다.");
  }
});

router.patch("/secretCheck", isLoggedIn, async (req, res, next) => {
  const { id, code } = req.body;

  try {
    const userCheck = await User.findAll({
      where: {
        id,
        secret: code,
      },
    });

    if (userCheck.length === 0) {
      return res.status.__wrapped(401).send("인증번호가 잘못되었습니다.");
    }

    await User.update(
      {
        level: 2,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({ result: true });
  } catch (e) {
    console.log(e);
    return res.status(401).send("인증번호를 확인할 수 없습니다.");
  }
});

router.post("/cardCreate", isLoggedIn, async (req, res, next) => {
  const { cardNum, cardPeriod, cardIden, cardPassword } = req.body;
  try {
    const exUser = await User.findOne({
      where: { id: parseInt(req.user.id) },
    });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const d = new Date();

    let year = d.getFullYear() + "";
    let month = d.getMonth() + 1 + "";
    let date = d.getDate() + "";
    let hour = d.getHours() + "";
    let min = d.getMinutes() + "";
    let sec = d.getSeconds() + "";
    let mSec = d.getMilliseconds() + "";

    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    mSec = mSec < 10 ? "0" + mSec : mSec;

    let orderPK = "USER_C" + year + month + date + hour + min + sec + mSec;

    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_KEY, // REST API 키
        imp_secret: process.env.IMP_SECRET,
      },
    });

    const { access_token } = getToken.data.response; // 인증 토큰

    const issueBilling = await axios({
      url: `https://api.iamport.kr/subscribe/customers/${orderPK}`,
      method: "post",
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
      data: {
        card_number: cardNum, // 카드 번호
        expiry: cardPeriod, // 카드 유효기간
        birth: cardIden, // 생년월일
        pwd_2digit: cardPassword, // 카드 비밀번호 앞 두자리
      },
    });

    const { code, message } = issueBilling.data;
    if (code === 0) {
      const updateResult = await User.update(
        {
          cardNum,
          cardPeriod,
          cardIden,
          cardPassword,
          userCode: orderPK,
        },
        {
          where: { id: parseInt(req.user.id) },
        }
      );

      if (updateResult[0] > 0) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } else {
      console.log(message);
      // 빌링키 발급 실패
      return res.status(401).send("카드정보를 등록할 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("카드정보를 등록할 수 없습니다.");
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  req.session.save(() => {
    res.redirect("/");
  });
});

module.exports = router;
