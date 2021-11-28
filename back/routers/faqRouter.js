const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const { FaqType, Faq } = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { Op } = require("sequelize");

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

// FAQ TYPE
router.get("/type/list", async (req, res, next) => {
  try {
    const typeList = await FaqType.findAll({
      where: { isDelete: false },
    });

    return res.status(200).json(typeList);
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ 유형을 불러올 수 없습니다.");
  }
});

router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;
  try {
    const createResult = await FaqType.create({
      value,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ 유형을 생성할 수 없습니다.");
  }
});

router.patch("/type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;
  try {
    const exFaqType = await FaqType.findOne({
      where: { id: parseInt(id) },
    });

    if (!exFaqType) {
      return res.status(401).send("존재하지 않는 FAQ유형입니다.");
    }

    const updateResult = await FaqType.update(
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
    return res.status(401).send("FAQ 유형을 수정할 수 없습니다.");
  }
});

router.delete(
  "/type/delete/:faqTypeId",
  isAdminCheck,
  async (req, res, next) => {
    const { faqTypeId } = req.params;
    try {
      const exFaqType = await FaqType.findOne({
        where: { id: parseInt(faqTypeId) },
      });

      if (!exFaqType) {
        return res.status(401).send("존재하지 않는 FAQ유형입니다.");
      }

      const deleteResult = await FaqType.update(
        {
          isDelete: true,
        },
        {
          where: { id: parseInt(faqTypeId) },
        }
      );

      if (deleteResult[0] > 0) {
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).send("FAQ 유형을 삭제할 수 없습니다.");
    }
  }
);

//FAQ

router.get("/list", async (req, res, next) => {
  const { page, search } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalFaqs = await Faq.findAll({
      where: {
        question: {
          [Op.like]: `%${_search}%`,
        },
        isDelete: false,
      },
      include: [
        {
          model: FaqType,
        },
      ],
    });

    const faqLen = totalFaqs.length;

    const lastPage = faqLen % LIMIT > 0 ? faqLen / LIMIT + 1 : faqLen / LIMIT;

    const faqs = await Faq.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: {
        question: {
          [Op.like]: `%${_search}%`,
        },
        isDelete: false,
      },
      include: [
        {
          model: FaqType,
        },
      ],
    });
    return res.status(200).json({ faqs, lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ 목록을 불러올 수 없습니다.");
  }
});

router.get("/list/:faqId", async (req, res, next) => {
  const { faqId } = req.params;

  try {
    const exFaq = await Faq.findOne({
      where: { id: parseInt(faqId) },
    });

    if (!exFaq) {
      return res.status(401).send("존재하지 않는 FAQ 입니다.");
    }

    return res.status(200).json(exFaq);
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ 정보를 불러올 수 없습니다. [CODE 107]");
  }
});

router.get("/next/:faqId", async (req, res, next) => {
  const { faqId } = req.params;

  try {
    const faqs = await Faq.findAll({
      where: {
        id: {
          [Op.gt]: parseInt(faqId),
        },
      },
      limit: 1,
    });

    if (!faqs[0]) {
      return res.status(401).send("마지막 FAQ 입니다.");
    }

    return res.redirect(`/api/faq/list/${faqs[0].id}`);
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ 정보를 불러올 수 없습니다. [CODE 107]");
  }
});

router.get("/prev/:faqId", async (req, res, next) => {
  const { faqId } = req.params;

  try {
    const faqs = await Faq.findAll({
      where: {
        id: {
          [Op.lt]: parseInt(faqId),
        },
      },
    });

    if (!faqs[0]) {
      return res.status(401).send("첫번째 FAQ 입니다.");
    }

    return res.redirect(`/api/faq/list/${faqs[faqs.length - 1].id}`);
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ 정보를 불러올 수 없습니다. [CODE 107]");
  }
});

router.post(
  "/create",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const { type, question, answer } = req.body;
    try {
      const createResult = await Faq.create({
        FaqTypeId: parseInt(type),
        question,
        answer,
        imagePath: req.file ? req.file.location : null,
      });

      if (!createResult) {
        return res.status(401).send("처리중 문제가 발생하였습니다.");
      }

      return res.status(201).json({ result: true });
    } catch (error) {
      console.error(error);
      return res.status(401).send("FAQ를 추가할 수 없습니다.");
    }
  }
);

router.patch(
  "/update",
  isAdminCheck,
  upload.single("image"),
  async (req, res, next) => {
    const { id, type, question, answer } = req.body;
    try {
      const exFaq = await Faq.findOne({
        where: { id: parseInt(id) },
      });

      if (!exFaq) {
        return res.status(401).send("존재하지 않는 FAQ입니다.");
      }

      const updateResult = await Faq.update(
        {
          FaqTypeId: parseInt(type),
          question,
          answer,
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
      return res.status(401).send("FAQ를 수정할 수 없습니다.");
    }
  }
);

router.delete("/delete/:faqId", isAdminCheck, async (req, res, next) => {
  const { faqId } = req.params;
  try {
    const exFaq = await Faq.findOne({
      where: { id: parseInt(faqId) },
    });

    if (!exFaq) {
      return res.status(401).send("존재하지 않는 FAQ입니다.");
    }

    const deleteResult = await Faq.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(faqId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("FAQ를 삭제할 수 없습니다.");
  }
});
module.exports = router;
