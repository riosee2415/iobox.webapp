const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { KeepBox, BoxImage } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isNanCheck = require("../middlewares/isNanCheck");

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

// 보관하기 리스트
router.get(["/list", "/list/:listType"], async (req, res, next) => {
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
    let boxLen = 0;

    switch (_listType) {
      case 1:
        totalBox = await KeepBox.findAll({
          where: {
            name: {
              [Op.like]: `%${_search}%`,
            },
          },
          include: [
            {
              model: BoxImage,
            },
          ],
        });

        boxLen = totalBox.length;

        lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

        boxes = await KeepBox.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            name: {
              [Op.like]: `%${_search}%`,
            },

            isPickup: false,
          },
          include: [
            {
              model: BoxImage,
            },
          ],
        });
        break;

      case 2:
        totalBox = await KeepBox.findAll({
          where: {
            name: {
              [Op.like]: `%${_search}%`,
            },
          },
          include: [
            {
              model: BoxImage,
            },
          ],
        });

        boxLen = totalBox.length;

        lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

        boxes = await KeepBox.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            name: {
              [Op.like]: `%${_search}%`,
            },
            isPickup: true,
          },
          include: [
            {
              model: BoxImage,
            },
          ],
        });
        break;

      case 3:
        totalBox = await KeepBox.findAll({
          where: {
            name: {
              [Op.like]: `%${_search}%`,
            },
          },
          include: [
            {
              model: BoxImage,
            },
          ],
        });

        boxLen = totalBox.length;

        lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

        boxes = await KeepBox.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            name: {
              [Op.like]: `%${_search}%`,
            },
          },
          include: [
            {
              model: BoxImage,
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
});

// 사용자가 상자보관 물건 촬영 여부를 체크 했다면 사용하는 api
router.post(
  "/image",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    return res.json({ path: req.file.location });
  }
);

router.post("/create", isLoggedIn, async (req, res, next) => {
  const {
    boxcount1,
    boxcount2,
    boxcount3,
    boxcount4,
    period,
    isFilming,
    pickWay,
    price1,
    price2,
    price3,
    price4,
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
      if (parseInt(boxcount1) !== 0) {
        for (let i = 0; i < parseInt(boxcount1); i++) {
          const createResult = await KeepBox.create({
            boxcount1,
            boxcount2: 0,
            boxcount3: 0,
            boxcount4: 0,
            period,
            isFilming,
            pickWay,
            price1,
            price2: 0,
            price3: 0,
            price4: 0,
            totalPrice: boxcount1 * price1,
            name,
            mobile,
            address,
            detailAddress,
            remark,
            UserId: parseInt(UserId),
          });
        }
      }

      if (parseInt(boxcount2) !== 0) {
        for (let i = 0; i < parseInt(boxcount2); i++) {
          const createResult = await KeepBox.create({
            boxcount1: 0,
            boxcount2,
            boxcount3: 0,
            boxcount4: 0,
            period,
            isFilming,
            pickWay,
            price1: 0,
            price2,
            price3: 0,
            price4: 0,
            totalPrice: boxcount2 * price2,
            name,
            mobile,
            address,
            detailAddress,
            remark,
            UserId: parseInt(UserId),
          });
        }
      }

      if (parseInt(boxcount3) !== 0) {
        for (let i = 0; i < parseInt(boxcount3); i++) {
          const createResult = await KeepBox.create({
            boxcount1: 0,
            boxcount2: 0,
            boxcount3,
            boxcount4: 0,
            period,
            isFilming,
            pickWay,
            price1: 0,
            price2: 0,
            price3,
            price4: 0,
            totalPrice: boxcount3 * price3,
            name,
            mobile,
            address,
            detailAddress,
            remark,
            UserId: parseInt(UserId),
          });
        }
      }

      if (parseInt(boxcount4) !== 0) {
        for (let i = 0; i < parseInt(boxcount4); i++) {
          const createResult = await KeepBox.create({
            boxcount1: 0,
            boxcount2: 0,
            boxcount3: 0,
            boxcount4,
            period,
            isFilming,
            pickWay,
            price1: 0,
            price2: 0,
            price3: 0,
            price4,
            totalPrice: boxcount4 * price4,
            name,
            mobile,
            address,
            detailAddress,
            remark,
            UserId: parseInt(UserId),
          });
        }
      }

      return res.status(201).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("박스를 추가할 수 없습니다.");
  }
});

// 픽업 여부 변경
router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, deliveryCom, deliveryCode } = req.body;

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

    if (exBox.isPickup) {
      return res.status(401).send("이미 픽업이 완료된 박스입니다.");
    }

    const updateResult = await KeepBox.update(
      {
        isPickup: true,
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
    return res.status(401).send("픽업상태를 변경할 수 없습니다.");
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

// 상자 보관 물건촬영 사진 추가
router.post("/image/create", async (req, res, next) => {
  const { KeepBoxId, imagePath } = req.body;

  if (isNaN(KeepBoxId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const createResult = await BoxImage.create({
      KeepBoxId: parseInt(KeepBoxId),
      imagePath,
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

// 상자 보관 물건촬영 사진 수정
router.patch("/image/update", async (req, res, next) => {
  const { id, imagePath } = req.body;

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
