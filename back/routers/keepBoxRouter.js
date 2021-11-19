const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { KeepBox, BoxType, BoxImage } = require("../models");
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

// BOX TYPE
router.get("/type/list", async (req, res, next) => {
  try {
    const list = await BoxType.findAll({
      where: {
        isDelete: false,
      },
    });

    return res.status(200).json(list);
  } catch (error) {
    console.error(error);
  }
});

router.post("/type/create", isAdminCheck, async (req, res, next) => {
  const { value } = req.body;
  try {
    const createResult = await BoxType.create({
      value,
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("유형을 생성할 수 없습니다.");
  }
});

router.patch("/type/update", isAdminCheck, async (req, res, next) => {
  const { id, value } = req.body;
  try {
    const exType = await BoxType.findOne({
      where: { id: parseInt(id) },
    });

    if (!exType) {
      return res.status(401).send("해당 유형이 존재하지 않습니다.");
    }

    const updateResult = await BoxType.update(
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
    return res.status(401).send("유형을 생성할 수 없습니다.");
  }
});

router.delete("/type/delete/:typeId", isAdminCheck, async (req, res, next) => {
  const { typeId } = req.params;
  try {
    const exType = await BoxType.findOne({
      where: { id: parseInt(typeId) },
    });

    if (!exType) {
      return res.status(401).send("해당 유형이 존재하지 않습니다.");
    }

    const deleteResult = await BoxType.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(typeId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("유형을 생성할 수 없습니다.");
  }
});

// BOX
router.get("/list", async (req, res, next) => {
  const { page, search } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalBox = await KeepBox.findAll({
      where: {
        name: {
          [Op.like]: `%${_search}%`,
        },
        isDelete: false,
      },
      include: [
        {
          model: BoxType,
        },
        {
          model: BoxImage,
        },
      ],
    });

    const boxLen = totalBox.length;

    const lastPage = boxLen % LIMIT > 0 ? boxLen / LIMIT + 1 : boxLen / LIMIT;

    const boxList = await KeepBox.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: {
        name: {
          [Op.like]: `%${_search}%`,
        },
        isDelete: false,
      },
      include: [
        {
          model: BoxType,
        },
        {
          model: BoxImage,
        },
      ],
    });

    return res.status(200).json({ boxList, lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("목록을 불러올 수 없습니다.");
  }
});

router.get("/list/:boxId", async (req, res, next) => {
  const { boxId } = req.params;
  try {
    const exBox = await KeepBox.findOne({
      where: { id: parseInt(boxId) },
      include: [
        {
          model: BoxType,
        },
        {
          model: BoxImage,
        },
      ],
    });

    return res.status(200).json(exBox ? exBox : []);
  } catch (error) {
    console.error(error);
    return res.status(401).send("데이터를 불러올 수 없습니다.");
  }
});

router.post("/create", upload.single("image"), async (req, res, next) => {
  const {
    type,
    period,
    isPickup,
    coupon,
    price,
    name,
    mobile,
    address,
    detailAddress,
    remark,
    isFilming,
  } = req.body;
  try {
    const createResult = await KeepBox.create({
      BoxTypeId: parseInt(type),
      period,
      isPickup,
      coupon,
      price,
      name,
      mobile,
      address,
      detailAddress,
      remark,
      isFilming,
      imagePath: req.file ? req.file.location : null,
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("박스를 추가할 수 없습니다.");
  }
});

router.patch("/udpate", upload.single("image"), async (req, res, next) => {
  const {
    id,
    type,
    period,
    isPickup,
    coupon,
    price,
    name,
    mobile,
    address,
    detailAddress,
    remark,
    isFilming,
  } = req.body;
  try {
    const exBox = await KeepBox.findOne({
      where: { id: parseInt(id) },
    });

    if (!exBox) {
      return res.status(401).send("존재하지 않는 박스입니다.");
    }

    const updateResult = await KeepBox.update(
      {
        BoxTypeId: parseInt(type),
        period,
        isPickup,
        coupon,
        price,
        name,
        mobile,
        address,
        detailAddress,
        remark,
        isFilming,
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
    return res.status(401).send("박스를 수정할 수 없습니다.");
  }
});

router.delete("/delete/:boxId", async (req, res, next) => {
  const { boxId } = req.params;
  try {
    const exBox = await KeepBox.findOne({
      where: { id: parseInt(boxId) },
    });

    if (!exBox) {
      return res.status(401).send("존재하지 않는 박스입니다.");
    }

    const deleteResult = await KeepBox.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(boxId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("박스를 수정할 수 없습니다.");
  }
});

//BOX IMAGE

router.get("/image/list", async (req, res, next) => {
  try {
    const list = await BoxType.findAll({
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

router.post("/image/create", upload.single("image"), async (req, res, next) => {
  const { KeepBoxId } = req.body;

  if (isNaN(KeepBoxId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const createResult = await BoxImage.create(
      {
        KeepBoxId: parseInt(KeepBoxId),
        imagePath: req.file ? req.file.location : null,
      },
      {
        include: [
          {
            model: KeepBox,
          },
        ],
      }
    );

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("유형을 생성할 수 없습니다.");
  }
});

router.patch(
  "/image/update",
  upload.single("image"),
  async (req, res, next) => {
    const { id } = req.body;
    try {
      const exImage = await BoxImage.findOne({
        where: { id: parseInt(id) },
      });

      if (!exImage) {
        return res.status(401).send("존재하지 않는 이미지 입니다.");
      }

      const updateResult = await BoxImage.update(
        {
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
      return res.status(401).send("이미지를 수정할 수 없습니다.");
    }
  }
);

router.delete("/image/delete/:imageId", async (req, res, next) => {
  const { imageId } = req.params;
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
