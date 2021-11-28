const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { Event } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

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
  const { page, search } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalEvents = await Event.findAll({
      where: {
        title: {
          [Op.like]: `%${_search}%`,
        },
        isDelete: false,
      },
    });

    const eventLen = totalEvents.length;

    const lastPage =
      eventLen % LIMIT > 0 ? eventLen / LIMIT + 1 : eventLen / LIMIT;

    const lists = await Event.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: {
        title: {
          [Op.like]: `%${_search}%`,
        },
        isDelete: false,
      },
    });

    return res.status(200).json({ lists, lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("이벤트 목록을 불러올 수 없습니다.");
  }
});

router.post(
  "/create",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const { title } = req.body;

    console.log(title);
    console.log(req.file);

    try {
      const createResult = await Event.create({
        title,
        imagePath: req.file ? req.file.location : null,
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("이벤트를 추가할 수 없습니다.");
    }
  }
);

router.patch(
  "/update",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const { id, title } = req.body;
    try {
      const exEvent = await Event.findOne({
        where: { id: parseInt(id) },
      });

      if (!exEvent) {
        return res.status(401).send("존재하지 않는 이벤트입니다.");
      }

      const updateResult = await Event.update(
        {
          title,
          imagePath: req.file ? req.file.location : null,
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
      return res.status(401).send("이벤트를 수정할 수 없습니다.");
    }
  }
);

router.delete("/delete/:eventId", isAdminCheck, async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const exEvent = await Event.findOne({
      where: { id: parseInt(eventId) },
    });

    if (!exEvent) {
      return res.status(401).send("존재하지 않는 이벤트입니다.");
    }

    const deleteResult = await Event.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(eventId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("이벤트를 삭제할 수 없습니다.");
  }
});

module.exports = router;
