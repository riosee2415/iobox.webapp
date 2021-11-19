const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const { Guide, GuideType } = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");

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

// GUIDE TYPE
router.get("/type/list", async (req, res, next) => {
  try {
    const typeList = await GuideType.findAll({
      where: { isDelete: false },
    });

    return res.status(200).json(typeList);
  } catch (error) {
    console.error(error);
    return res.status(401).send("이용안내 유형을 불러올 수 없습니다.");
  }
});

router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;
  try {
    const createResult = await GuideType.create({
      value,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("이용안내 유형을 생성할 수 없습니다.");
  }
});

router.patch("/type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;
  try {
    const exGuideType = await GuideType.findOne({
      where: { id: parseInt(id) },
    });

    if (!exGuideType) {
      return res.status(401).send("존재하지 않는 이용안내 유형입니다.");
    }

    const updateResult = await GuideType.update(
      {
        value,
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
    return res.status(401).send("이용안내 유형을 수정할 수 없습니다.");
  }
});

router.delete(
  "/type/delete/:guideTypeId",
  isAdminCheck,
  async (req, res, next) => {
    const { guideTypeId } = req.params;
    try {
      const exGuideType = await GuideType.findOne({
        where: { id: parseInt(guideTypeId) },
      });

      if (!exGuideType) {
        return res.status(401).send("존재하지 않는 이용안내 유형입니다.");
      }

      const deleteResult = await GuideType.update(
        {
          isDelete: true,
        },
        {
          where: { id: parseInt(guideTypeId) },
        }
      );

      if (deleteResult[0] > 0) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).send("이용안내 유형을 삭제할 수 없습니다.");
    }
  }
);

//GUIDE

router.get("/list", async (req, res, next) => {
  const { page, search } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalGuide = await Guide.findAll({
      where: {
        title: {
          [Op.like]: `%${_search}%`,
        },
        isDelete: false,
      },
    });

    const guideLen = totalGuide.length;

    const lastPage =
      guideLen % LIMIT > 0 ? guideLen / LIMIT + 1 : guideLen / LIMIT;

    const lists = await Guide.findAll({
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
    return res.status(401).send("이용안내 목록을 불러올 수 없습니다.");
  }
});

router.post(
  "/create",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const { type, title, content } = req.body;
    try {
      const createResult = await Guide.create({
        GuideTypeId: parseInt(type),
        title,
        content,
        imagePath: req.file ? req.file.location : null,
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("이용안내를 추가할 수 없습니다.");
    }
  }
);

router.patch(
  "/update",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const { id, type, title, content } = req.body;
    try {
      const exGuide = await Guide.findOne({
        where: { id: parseInt(id) },
      });

      if (!exGuide) {
        return res.status(401).send("존재하지 않는 이용안내입니다.");
      }

      const updateResult = await Guide.update(
        {
          GuideTypeId: parseInt(type),
          title,
          content,
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
      return res.status(401).send("이용안내를 수정할 수 없습니다.");
    }
  }
);

router.delete("/delete/:guideId", isAdminCheck, async (req, res, next) => {
  const { guideId } = req.params;
  try {
    const exGuide = await Guide.findOne({
      where: { id: parseInt(guideId) },
    });

    if (!exGuide) {
      return res.status(401).send("존재하지 않는 이용안내입니다.");
    }

    const deleteResult = await Guide.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(guideId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("이용안내를 삭제할 수 없습니다.");
  }
});
module.exports = router;
