const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const axios = require("axios");
const { ReturnKeep, BoxImage, KeepBox, User } = require("../models");

const router = express.Router();

router.get("/list", isAdminCheck, async (req, res, next) => {
  try {
    const lists = await ReturnKeep.findAll({
      include: [
        {
          model: BoxImage,
          include: [
            {
              model: KeepBox,
            },
          ],
        },
      ],
    });

    return res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    return res.status(401).send("목록을 조회할 수 없습니다.");
  }
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  const { imageIds, boxId } = req.body;

  try {
    const returnBox = await ReturnKeep.create({
      temp: 0,
    });
    const currentUser = await User.findOne({
      where: {
        id: parseInt(req.user.id),
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
    const { access_token } = getToken.data.response; // 인증 토큰

    d = new Date();
    year = d.getFullYear() + "";
    month = d.getMonth() + 1 + "";
    date = d.getDate() + "";
    hour = d.getHours() + "";
    min = d.getMinutes() + "";
    sec = d.getSeconds() + "";
    mSec = d.getMilliseconds() + "";
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    mSec = mSec < 10 ? "0" + mSec : mSec;
    let orderPK = "ORD" + year + month + date + hour + min + sec + mSec;

    const paymentResult = await axios({
      url: `https://api.iamport.kr/subscribe/payments/again`,
      method: "post",
      headers: { Authorization: access_token }, // 인증 토큰을 Authorization header에 추가
      data: {
        customer_uid: currentUser.userCode,
        merchant_uid: orderPK, // 새로 생성한 결제(재결제)용 주문 번호
        amount: 5000,
        name: "박스 찾기",
        buyer_name: currentUser.nickname,
      },
    });

    const { code, message } = paymentResult.data;

    if (code === 0) {
      if (paymentResult.data.response.status === "paid") {
        if (imageIds.length === 0) {
          const createImage = BoxImage.create({
            KeepBoxId: parseInt(boxId),
            imagePath: "-",
            deliveryCom: "",
            deliveryCode: "",
            ReturnKeepId: parseInt(returnBox.id),
          });
        } else {
          await Promise.all(
            imageIds.map(async (data) => {
              await BoxImage.update(
                {
                  ReturnKeepId: parseInt(returnBox.id),
                },
                {
                  where: { id: parseInt(data) },
                }
              );
            })
          );
        }

        return res.status(200).json({ result: true });
      } else {
        return res.status(401).send("카드 결제를 진행할 수 없습니다.");
      }
    } else {
      return res.status(401).send("카드 결제를 진행할 수 없습니다.");
    }
  } catch (e) {
    console.error(e);
    return res.status(401).send("박스 찾기가 불가능합니다.");
  }
});

module.exports = router;
