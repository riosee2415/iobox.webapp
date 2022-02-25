const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { MenuImage } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
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

router.get("/list", async (req, res, next) => {
  try {
    const totalImage = await MenuImage.findAll();

    return res.status(200).json({ totalImage });
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지 목록을 불러올 수 없습니다.");
  }
});

router.get("/list/:imageId", async (req, res, next) => {
  const { imageId } = req.params;

  try {
    const exImage = await Event.findOne({
      where: { id: parseInt(imageId) },
    });

    if (!exImage) {
      return res.status(401).send("존재하지 않는 이미지 입니다.");
    }

    return res.status(200).json(exImage);
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지 정보를 불러올 수 없습니다. [CODE 107]");
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

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { imagePath } = req.body;
  try {
    const createResult = await MenuImage.create({
      imagePath,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지를 추가할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, imagePath } = req.body;
  try {
    const exMenuImage = await MenuImage.findOne({
      where: { id: parseInt(id) },
    });

    if (!exMenuImage) {
      return res.status(401).send("존재하지 않는 이미지입니다.");
    }

    const updateResult = await MenuImage.update(
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

router.delete("/delete/:imageId", isAdminCheck, async (req, res, next) => {
  const { imageId } = req.params;

  if (isNanCheck(imageId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const exMenuImage = await MenuImage.findOne({
      where: { id: parseInt(imageId) },
    });

    if (!exMenuImage) {
      return res.status(401).send("존재하지 않는 이미지입니다.");
    }

    const deleteResult = await MenuImage.destroy({
      where: { id: parseInt(imageId) },
    });

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미지를 삭제할 수 없습니다.");
  }
});

module.exports = router;
