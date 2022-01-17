const express = require("express");
const { BulletBox, BulletImage, User } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isNanCheck = require("../middlewares/isNanCheck");
const isAdminCheck = require("../middlewares/isAdminCheck");

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

const router = express.Router();

router.get(["/list/:listType", "/list"], async (req, res, next) => {
  const { page, search } = req.query;
  const { listType } = req.params;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

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
    let boxLen;

    switch (_listType) {
      case 1:
        totalBox = await BulletBox.findAll({
          where: {
            isPickup: false,
          },
          include: [
            {
              model: BulletImage,
            },
          ],
        });

        boxLen = totalBox.length;

        lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

        boxes = await BulletBox.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            isPickup: false,
          },
          include: [
            {
              model: BulletImage,
            },
            {
              model: User,
            },
          ],
        });
        break;

      case 2:
        totalBox = await BulletBox.findAll({
          where: {
            isPickup: true,
          },
          include: [
            {
              model: BulletImage,
            },
          ],
        });

        boxLen = totalBox.length;

        lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

        boxes = await BulletBox.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            isPickup: true,
          },
          include: [
            {
              model: BulletImage,
            },
            {
              model: User,
            },
          ],
        });
        break;

      case 3:
        totalBox = await BulletBox.findAll({
          include: [
            {
              model: BulletImage,
            },
          ],
        });

        boxLen = totalBox.length;

        lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

        boxes = await BulletBox.findAll({
          offset: OFFSET,
          limit: LIMIT,
          include: [
            {
              model: BulletImage,
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
    return res.status(401).send("총알배송 목록을 불러올 수 없습니다.");
  }
});

router.post("/list/date", async (req, res, next) => {
  const { searchDate } = req.body;
  try {
    const dateParsingData = new Date(searchDate);

    const nextMonth = new Date(searchDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const results = await BulletBox.findAll({
      where: {
        [Op.and]: [
          { createdAt: { [Op.gte]: dateParsingData } },
          { createdAt: { [Op.lt]: nextMonth } },
        ],
      },
      include: [
        {
          model: BulletImage,
        },
        {
          model: User,
        },
      ],
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(401).send("총알 배송 목록을 불러올 수 없습니다.");
  }
});

router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/create", async (req, res, next) => {
  const {
    boxcount1,
    boxcount2,
    boxcount3,
    boxcount4,
    price,
    address,
    detailAddress,
    isEle,
    floor,
    type,
    startDate,
    endDate,
    receiveAdd,
    receiveDetail,
    deliveryPay,
    isFilming,
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
      if (parseInt(boxcount1) !== 0) {
        for (let i = 0; i < parseInt(boxcount1); i++) {
          const createResult = await BulletBox.create({
            boxcount1,
            boxcount2: 0,
            boxcount3: 0,
            boxcount4: 0,
            price,
            address,
            detailAddress,
            isEle,
            floor,
            type,
            startDate,
            endDate,
            receiveAdd,
            receiveDetail,
            isFilming,
            deliveryPay,
            UserId: parseInt(UserId),
          });
        }
      }

      if (parseInt(boxcount2) !== 0) {
        for (let i = 0; i < parseInt(boxcount2); i++) {
          const createResult = await BulletBox.create({
            boxcount1: 0,
            boxcount2,
            boxcount3: 0,
            boxcount4: 0,
            price,
            address,
            detailAddress,
            isEle,
            floor,
            type,
            startDate,
            endDate,
            receiveAdd,
            receiveDetail,
            isFilming,
            deliveryPay,
            UserId: parseInt(UserId),
          });
        }
      }

      if (parseInt(boxcount3) !== 0) {
        for (let i = 0; i < parseInt(boxcount3); i++) {
          const createResult = await BulletBox.create({
            boxcount1: 0,
            boxcount2: 0,
            boxcount3,
            boxcount4: 0,
            price,
            address,
            detailAddress,
            isEle,
            floor,
            type,
            startDate,
            endDate,
            receiveAdd,
            receiveDetail,
            isFilming,
            deliveryPay,
            UserId: parseInt(UserId),
          });
        }
      }

      if (parseInt(boxcount4) !== 0) {
        for (let i = 0; i < parseInt(boxcount4); i++) {
          const createResult = await BulletBox.create({
            boxcount1: 0,
            boxcount2: 0,
            boxcount3: 0,
            boxcount4,
            price,
            address,
            detailAddress,
            isEle,
            floor,
            type,
            startDate,
            endDate,
            receiveAdd,
            receiveDetail,
            isFilming,
            deliveryPay,
            UserId: parseInt(UserId),
          });
        }
      }

      return res.status(201).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("총알 배송을 추가할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, deliveryCom, deliveryCode, deliveryCom2, deliveryCode2 } =
    req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const exBox = await BulletBox.findOne({
      where: { id: parseInt(id) },
    });

    if (!exBox) {
      return res.status(401).send("존재하지 않는 박스입니다.");
    }

    const updateResult = await BulletBox.update(
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

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("처리중 문제가 발생하였습니다.");
  }
});

router.patch("/subscription", isAdminCheck, async (req, res, next) => {
  const { id, isEnd } = req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exBox = await BulletBox.findOne({
      where: { id: parseInt(id) },
    });

    if (!exBox) {
      return res.status(401).send("존재하지 않는 총알배송입니다.");
    }

    const updateResult = await BulletBox.update(
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

router.get("/image/list", async (req, res, next) => {
  try {
    const list = await BulletImage.findAll({
      where: {
        isDelete: false,
      },
      include: [
        {
          model: BulletBox,
        },
      ],
    });

    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지 목록을 불러올 수 없습니다.");
  }
});

router.post("/image/create", async (req, res, next) => {
  const { BulletBoxId, imagePath, deliveryCom, deliveryCode } = req.body;

  if (isNaN(BulletBoxId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const createResult = await BulletImage.create({
      BulletBoxId: parseInt(BulletBoxId),
      imagePath,
      deliveryCom,
      deliveryCode,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지를 생성할 수 없습니다.");
  }
});

router.patch("/image/update", async (req, res, next) => {
  const { id, imagePath, deliveryCom, deliveryCode } = req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exImage = await BulletImage.findOne({
      where: { id: parseInt(id) },
    });

    if (!exImage) {
      return res.status(401).send("존재하지 않는 이미지 입니다.");
    }

    const updateResult = await BulletImage.update(
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

router.delete("/image/delete/:imageId", async (req, res, next) => {
  const { imageId } = req.params;

  if (isNanCheck(imageId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exImage = await BulletImage.findOne({
      where: { id: parseInt(imageId) },
    });

    if (!exImage) {
      return res.status(401).send("존재하지 않는 이미지 입니다.");
    }

    const deleteResult = await BulletImage.update(
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
