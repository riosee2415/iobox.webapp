const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const {
  KeepBox,
  BoxImage,
  User,
  KeepBoxSchedule,
  KeepBoxMaster,
} = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");
const axios = require("axios");
const moment = require("moment");

const router = express.Router();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log(
    "uploads 폴더가 존재하지 않습니다. 새로 uploads 폴더를 생성합니다."
  );
  fs.mkdirSync("uploads");
}

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.get("/box/:id", async (req, res, next) => {
  const { id } = req.params;

  let nanFlag = isNaN(id);

  if (!id) {
    nanFlag = false;
  }

  if (nanFlag) {
    return res.status(400).send("잘못된 요청 입니다.");
  }

  try {
    const boxes = await KeepBox.findOne({
      where: { id },
      include: [
        {
          model: BoxImage,
        },
        {
          model: User,
        },
      ],
    });

    return res.status(200).json({ boxes });
  } catch (e) {
    console.error(error);
    return res.status(401).send("디테일한 내용을 불러올 수 없습니다.");
  }
});

// master 리스트
router.get("/list", isAdminCheck, async (req, res, next) => {
  try {
    const lists = await KeepBoxMaster.findAll({
      include: [
        {
          model: KeepBox,
        },
        {
          model: User,
          attributes: {
            exclude: [
              "password",
              "level",
              "secret",
              "cardNum",
              "cardPeriod",
              "cardIden",
              "cardPassword",
            ],
          },
        },
      ],
    });

    return res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    return res.status(401).send("박스 목록을 불러올 수 없습니다.");
  }
});

// 상자 리스트
router.get(
  ["/master/detail", "/master/detail/:listType"],
  async (req, res, next) => {
    const { page, masterId } = req.query;
    const { listType } = req.params;

    const LIMIT = 10;

    const _page = page ? page : 1;

    const __page = _page - 1;
    const OFFSET = __page * 10;

    let nanFlag = isNaN(listType);

    if (!listType) {
      nanFlag = false;
    }

    if (nanFlag) {
      return res.status(400).send("잘못된 요청 입니다.");
    }

    let _listType = Number(listType);

    if (_listType > 3 || !listType) {
      _listType = 3;
    }

    try {
      let totalBox = [];
      let boxes = [];
      let lastPage = 0;
      let boxLen = 0;

      const exMaster = await KeepBoxMaster.findOne({
        where: {
          id: parseInt(masterId),
        },
      });

      if (!exMaster) {
        return res.status(401).send("존재하지 않는 박스입니다.");
      }

      switch (_listType) {
        case 1:
          totalBox = await KeepBox.findAll({
            where: {
              KeepBoxMasterId: parseInt(masterId),
              isPickup: false,
            },
          });

          boxLen = totalBox.length;

          lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

          boxes = await KeepBox.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              KeepBoxMasterId: parseInt(masterId),
              isPickup: false,
            },
            include: [
              {
                model: BoxImage,
              },
              {
                model: User,
              },
            ],
          });
          break;

        case 2:
          totalBox = await KeepBox.findAll({
            where: {
              KeepBoxMasterId: parseInt(masterId),
              isPickup: true,
            },
          });

          boxLen = totalBox.length;

          lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

          boxes = await KeepBox.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              KeepBoxMasterId: parseInt(masterId),
              isPickup: true,
            },
            include: [
              {
                model: BoxImage,
              },
              {
                model: User,
              },
            ],
          });
          break;

        case 3:
          totalBox = await KeepBox.findAll({
            where: {
              KeepBoxMasterId: parseInt(masterId),
            },
          });

          boxLen = totalBox.length;

          lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

          boxes = await KeepBox.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              KeepBoxMasterId: parseInt(masterId),
            },
            include: [
              {
                model: BoxImage,
              },
              {
                model: User,
              },
            ],
          });
          break;

        default:
          break;
      }

      return res.status(200).json({ boxes, lastPage: parseInt(lastPage) });
    } catch (error) {
      console.error(error);
      return res.status(401).send("목록을 불러올 수 없습니다.");
    }
  }
);

// 입력 받은 값의 월 부터 한달
router.post("/list/date", async (req, res, next) => {
  const { searchDate } = req.body;

  try {
    const dateParsingData = new Date(searchDate);

    const nextMonth = new Date(searchDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const results = await KeepBoxMaster.findAll({
      where: {
        [Op.and]: [
          { createdAt: { [Op.gte]: dateParsingData } },
          { createdAt: { [Op.lt]: nextMonth } },
        ],
      },
      include: [
        {
          model: KeepBox,
        },
        {
          model: User,
          attributes: {
            exclude: [
              "password",
              "level",
              "secret",
              "cardNum",
              "cardPeriod",
              "cardIden",
              "cardPassword",
            ],
          },
        },
      ],
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(401).send("월별 결제 내용을 불러올 수 없습니다.");
  }
});

router.post("/create", async (req, res, next) => {
  const {
    boxcount1,
    boxcount2,
    boxcount3,
    boxcount4,
    period,
    isFilming,
    pickWay,
    price,
    deliveryPay,
    name,
    mobile,
    address,
    detailAddress,
    remark,
    UserId,
  } = req.body;

  if (isNanCheck(boxcount1)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (isNanCheck(boxcount2)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (isNanCheck(boxcount3)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (isNanCheck(boxcount4)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    if (
      parseInt(boxcount1) === 0 &&
      parseInt(boxcount2) === 0 &&
      parseInt(boxcount3) === 0 &&
      parseInt(boxcount4) === 0
    ) {
      return res.status(401).send("박스를 선택하여 주십시오.");
    } else {
      const masterResult = await KeepBoxMaster.create({
        UserId: parseInt(UserId),
      });

      if (parseInt(boxcount1) !== 0) {
        for (let i = 0; i < parseInt(boxcount1); i++) {
          createResult = await KeepBox.create({
            boxcount1,
            boxcount2: 0,
            boxcount3: 0,
            boxcount4: 0,
            period,
            isFilming,
            pickWay,
            price,
            deliveryPay,
            name,
            mobile,
            address,
            detailAddress,
            remark,
            UserId: parseInt(UserId),
            KeepBoxMasterId: parseInt(masterResult.id),
          });
        }
      }

      if (parseInt(boxcount2) !== 0) {
        for (let i = 0; i < parseInt(boxcount2); i++) {
          createResult = await KeepBox.create({
            boxcount1: 0,
            boxcount2,
            boxcount3: 0,
            boxcount4: 0,
            period,
            isFilming,
            pickWay,
            price,
            deliveryPay,
            name,
            mobile,
            address,
            detailAddress,
            remark,
            UserId: parseInt(UserId),
            KeepBoxMasterId: parseInt(masterResult.id),
          });
        }
      }

      if (parseInt(boxcount3) !== 0) {
        for (let i = 0; i < parseInt(boxcount3); i++) {
          createResult = await KeepBox.create({
            boxcount1: 0,
            boxcount2: 0,
            boxcount3,
            boxcount4: 0,
            period,
            isFilming,
            pickWay,
            price,
            deliveryPay,
            name,
            mobile,
            address,
            detailAddress,
            remark,
            UserId: parseInt(UserId),
            KeepBoxMasterId: parseInt(masterResult.id),
          });
        }
      }

      if (parseInt(boxcount4) !== 0) {
        for (let i = 0; i < parseInt(boxcount4); i++) {
          createResult = await KeepBox.create({
            boxcount1: 0,
            boxcount2: 0,
            boxcount3: 0,
            boxcount4,
            period,
            isFilming,
            pickWay,
            price,
            deliveryPay,
            name,
            mobile,
            address,
            detailAddress,
            remark,
            UserId: parseInt(UserId),
            KeepBoxMasterId: parseInt(masterResult.id),
          });
        }
      }

      const userData = await User.findOne({
        where: { id: UserId },
        attributes: [
          "id",
          "userId",
          "mobile",
          "nickname",
          "cardNum",
          "cardPeriod",
          "cardIden",
          "cardPassword",
          "userCode",
          "level",
        ],
      });

      return res.status(201).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("박스를 추가할 수 없습니다.");
  }
});

// 픽업 여부 변경
router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, userCode, userId, deliveryCom, deliveryCode } = req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const exBox = await KeepBox.findOne({
      where: { id: parseInt(id) },
    });

    if (!exBox) {
      return res.status(401).send("존재하지 않는 박스입니다.");
    }

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
    let fidKey = "ORD" + year + month + date + hour + min + sec + mSec;

    const trakerApi = await axios({
      url: "http://trace-api-dev.sweettracker.net:8102/add_invoice",
      method: "post", // POST method
      headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
      data: {
        num: deliveryCode, // 송장번호
        code: "04",
        callback_url: "https://api.iobox.kr/api/kakao/callback/",
        fid: fidKey,
        callback_type: "map",
        tier: "testuser",
        key: "testuser",
        type: "json",
      },
    });

    if (trakerApi.data.success) {
      const updateResult = await KeepBox.update(
        {
          // isPickup: true,
          deliveryCom,
          deliveryCode,
          merchantUid: trakerApi.data.fid,
        },
        {
          where: { id: parseInt(id) },
        }
      );

      return res.status(200).json({ result: true });
    } else {
      return res.status(401).send(trakerApi.data.e_message);
    }

    //  정기 결제 api

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
        customer_uid: userCode,
        merchant_uid: orderPK, // 새로 생성한 결제(재결제)용 주문 번호
        amount: 1000,
        name: "카드 도용 zz",
      },
    });

    const { code, message } = paymentResult.data;

    if (code === 0) {
      // 카드사 통신에 성공(실제 승인 성공 여부는 추가 판단이 필요함)
      if (paymentResult.data.response.status === "paid") {
        //카드 정상 승인

        const resultPay = await KeepBoxSchedule.create({
          merchantUid: orderPK,
          isComplate: true,
          UserId: parseInt(userId),
          KeepBoxId: parseInt(id),
        });

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

        let time = moment().add(1, `m`).unix();

        axios({
          url: "https://api.iamport.kr/subscribe/payments/schedule", // 예:
          method: "post",
          headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
          data: {
            customer_uid: userCode, // 카드(빌링키)와 1:1로 대응하는 값
            schedules: [
              {
                merchant_uid: schedulePK, // 주문 번호
                schedule_at: time, // 결제 시도 시각 in Unix Time Stamp. 예: 다음 달 1일
                amount: 1000,
                name: "tezt",
              },
            ],
          },
        });

        const schedulePay = await KeepBoxSchedule.create({
          merchantUid: schedulePK,
          UserId: parseInt(userId),
          KeepBoxId: parseInt(id),
        });

        const updateResult = await KeepBox.update(
          {
            // isPickup: true,
            deliveryCom,
            deliveryCode,
            deliveryCom2,
            deliveryCode2,
          },
          {
            where: { id: parseInt(id) },
          }
        );

        if (updateResult[0] > 0) {
          return res.status(200).json({ result: true });
        } else {
          return res.status(200).json({ result: false });
        }
      } else {
        //카드 승인 실패 (예: 고객 카드 한도초과, 거래정지카드, 잔액부족 등)
        //paymentResult.status : failed 로 수신됨
        // console.log("실패", paymentResult);
        return res.status(401).send("카드 결제를 진행할 수 없습니다.");
      }
    } else {
      // 카드사 요청에 실패 (paymentResult is null)
      console.log("요청 실패", paymentResult);
      return res.status(401).send("카드 결제를 진행할 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("처리중 문제가 발생하였습니다.");
  }
});

// 정기결제 End 처리
router.patch("/subscription", isAdminCheck, async (req, res, next) => {
  const { id, isEnd } = req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exBox = await KeepBox.findOne({
      where: { id: parseInt(id) },
    });

    if (!exBox) {
      return res.status(401).send("존재하지 않는 박스입니다.");
    }

    const updateResult = await KeepBox.update(
      {
        isEnd,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    if (updateResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("정기 결제처리를 할 수 없습니다.");
  }
});

// 상자 보관 물건촬영 리스트
router.get("/image/list", async (req, res, next) => {
  try {
    const list = await BoxImage.findAll({
      where: {
        isDelete: false,
      },
      include: [
        {
          model: KeepBox,
        },
      ],
    });

    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지 목록을 불러올 수 없습니다.");
  }
});

// // 사용자가 상자보관 물건 촬영 여부를 체크 했다면 사용하는 api
// router.post(
//   "/image",
//   isAdminCheck,
//   upload.single("image"),
//   async (req, res, next) => {
//     return res.json({ path: req.file.location });
//   }
// );

// 상자 보관 물건촬영 사진 추가
router.post(
  "/image/create",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const { KeepBoxId } = req.body;
    console.log(req.file, "ASD", req.body);
    const { location } = req.file;

    if (isNaN(KeepBoxId)) {
      return res.status(401).send("잘못된 요청입니다.");
    }
    try {
      const createResult = await BoxImage.create({
        KeepBoxId: parseInt(KeepBoxId),
        imagePath: location,
        deliveryCom: "",
        deliveryCode: "",
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("이미지를 생성할 수 없습니다.");
    }
  }
);

// 상자 보관 물건촬영 사진 수정
router.patch("/image/update", async (req, res, next) => {
  const { id, imagePath, deliveryCom, deliveryCode } = req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exImage = await BoxImage.findOne({
      where: { id: parseInt(id) },
    });

    if (!exImage) {
      return res.status(401).send("존재하지 않는 이미지 입니다.");
    }

    const updateResult = await BoxImage.update(
      {
        imagePath,
        deliveryCom,
        deliveryCode,
      },
      {
        where: { id: parseInt(id) },
      }
    );

    if (updateResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지를 수정할 수 없습니다.");
  }
});

// 상자 보관 물건촬영 사진 삭제
router.delete("/image/delete/:imageId", async (req, res, next) => {
  const { imageId } = req.params;

  if (isNanCheck(imageId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exImage = await BoxImage.findOne({
      where: { id: parseInt(imageId) },
    });

    if (!exImage) {
      return res.status(401).send("존재하지 않는 이미지 입니다.");
    }

    const deleteResult = await BoxImage.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(imageId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지를 삭제할 수 없습니다.");
  }
});

module.exports = router;
