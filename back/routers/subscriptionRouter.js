const express = require("express");
const axios = require("axios");
const moment = require("moment");
const { KeepBoxSchedule, User, KeepBox } = require("../models");
const KeepBoxMaster = require("../models/keepboxmaster");

const router = express.Router();

router.post(`/schedule`, async (req, res, next) => {
  try {
    const data = await KeepBoxSchedule.findOne({
      where: {
        merchantUid: req.body.merchant_uid,
        isComplate: false,
        isCancel: false,
      },
      include: [
        {
          model: User,
        },
        {
          model: KeepBoxMaster,
          include: [
            {
              model: KeepBox,
            },
          ],
        },
      ],
    });

    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: "9134198546040290", // REST API 키
        imp_secret:
          "786198908d47a63ad00927cece057a617666d0a2436b56a731a6f857fa1cd72c57035d200ac6df0a", // REST API Secret
      },
    });
    const { access_token } = getToken.data.response;

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
    let schedulePK = "ORD" + year + month + date + hour + min + sec + mSec;

    let time = moment().add(10, `s`).unix();

    await KeepBoxSchedule.update(
      {
        isComplate: true,
      },
      {
        where: { id: parseInt(data.id) },
      }
    );

    await axios({
      url: "https://api.iamport.kr/subscribe/payments/schedule", // 예:
      method: "post",
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
      data: {
        customer_uid: data.User.userCode, // 카드(빌링키)와 1:1로 대응하는 값
        schedules: [
          {
            merchant_uid: schedulePK, // 주문 번호
            schedule_at: time, // 결제 시도 시각 in Unix Time Stamp. 예: 다음 달 1일
            amount: 1000,
            name: "아이오박스 정기결제 3",
            buyer_name: data.User.nickname,
          },
        ],
      },
    });

    const schedulePay = await KeepBoxSchedule.create({
      merchantUid: schedulePK,
      UserId: parseInt(data.User.id),
      KeepBoxMasterId: parseInt(data.KeepBoxMaster.id),
    });

    return res.status(200).json({ result: true });
  } catch (e) {
    console.log(e);
  }
});

router.post("/cancel/schedule", async (req, res, next) => {
  try {
    const { id, userCode, userId } = req.body;

    const data = await KeepBoxSchedule.findAll({
      where: {
        isComplate: false,
        isCancel: false,
        KeepBoxId: parseInt(id),
        UserId: parseInt(userId),
      },
    });

    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: "9134198546040290", // REST API 키
        imp_secret:
          "786198908d47a63ad00927cece057a617666d0a2436b56a731a6f857fa1cd72c57035d200ac6df0a", // REST API Secret
      },
    });
    const { access_token } = getToken.data.response;

    // POST /subscribe/payments/unschedule
    await axios({
      url: "https://api.iamport.kr/subscribe/payments/unschedule",
      method: "post", // POST method
      headers: { Authorization: access_token }, // "Content-Type": "application/json"
      data: {
        customer_uid: userCode, // REST API 키
        merchant_uid: data[0].merchantUid, // REST API Secret
      },
    });

    await KeepBoxSchedule.update(
      {
        isCancel: true,
      },
      {
        where: { id: parseInt(data[0].id) },
      }
    );

    return res.status(200);
  } catch (e) {
    console.log(e);
  }
});

router.post(`/`, async (req, res, next) => {
  try {
    const { cardNumber, expiry, birth, pwd2Digit, customer_uid } = req.body;

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

    let orderPK = "ORD" + year + month + date + hour + min + sec + mSec;

    // 엑세스 토큰 발행 => 예약할때마다 새로운 엑세스 토큰이 필요한가? => 필요
    const getToken = await axios({
      url: "https://api.iamport.kr/users/getToken",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        imp_key: "9134198546040290", // REST API 키
        imp_secret:
          "786198908d47a63ad00927cece057a617666d0a2436b56a731a6f857fa1cd72c57035d200ac6df0a", // REST API Secret
      },
    });
    const { access_token } = getToken.data.response; // 인증 토큰

    // 빌링키 발급 요청 => 예약 마다 빌링키가 필요한가?
    // 빌링키의 정확한 용도가 무엇인가?
    // 빌링키는 카드정보를 넘길때 작업하고, 유저모델에 추가
    const issueBilling = await axios({
      url: `https://api.iamport.kr/subscribe/customers/${customer_uid}`,
      method: "post",
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
      data: {
        card_number: cardNumber, // 카드 번호
        expiry, // 카드 유효기간
        birth, // 생년월일
        pwd_2digit: pwd2Digit, // 카드 비밀번호 앞 두자리
        amount: 1000,
      },
    });

    const paymentResult = await axios({
      url: `https://api.iamport.kr/subscribe/payments/again`,
      method: "post",
      headers: { Authorization: access_token }, // 인증 토큰을 Authorization header에 추가
      data: {
        customer_uid,
        merchant_uid: orderPK, // 새로 생성한 결제(재결제)용 주문 번호
        amount: 1000,
        name: "카드 도용",
      },
    });

    const { code, message } = paymentResult.data;
    if (code === 0) {
      // 카드사 통신에 성공(실제 승인 성공 여부는 추가 판단이 필요함)
      if (paymentResult.status === "paid") {
        //카드 정상 승인

        let time = new Date();

        time.setMinutes(time.getSeconds() + 30);

        console.log("개꿀", paymentResult, Math.floor(time.getTime() / 1000));
        // axios({
        //   url: `https://api.iamport.kr/subscribe/payments/schedule`,
        //   method: "post",
        //   headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
        //   data: {
        //     customer_uid, // 카드(빌링키)와 1:1로 대응하는 값
        //     schedules: [
        //       {
        //         merchant_uid: `order_monthly_${Math.floor(
        //           time.getTime() / 1000
        //         )}`, // 주문 번호
        //         schedule_at: Math.floor(time.getTime() / 1000), // 결제 시도 시각 in Unix Time Stamp. 예: 다음 달 1일
        //         amount: 1000,
        //         name: "월간 이용권 정기결제",
        //         buyer_name: "홍길동",
        //         buyer_tel: "01012345678",
        //         buyer_email: "gildong@gmail.com",
        //       },
        //     ],
        //   },
        // });
      } else {
        //카드 승인 실패 (예: 고객 카드 한도초과, 거래정지카드, 잔액부족 등)
        //paymentResult.status : failed 로 수신됨
        console.log("실패", paymentResult);
      }
    } else {
      // 카드사 요청에 실패 (paymentResult is null)
      console.log("요청 실패", paymentResult);
    }

    // return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

module.exports = router;
