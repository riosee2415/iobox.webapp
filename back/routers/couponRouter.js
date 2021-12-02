const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { Coupon, User } = require("../models");
const models = require("../models");
const isNanCheck = require("../middlewares/isNanCheck");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  const { page } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;

  const __page = _page - 1;
  const OFFSET = __page * 10;

  const lengthQuery = `
  SELECT id,
         title,
         CONCAT(valueInt, "%")                        AS  coupon,
         valueFloat,
         DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS	createdAt, 
         DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS	updatedAt,
         UserId
   FROM  coupons
  WHERE  isDelete = false
  `;

  const selectQuery = `
  SELECT id,
         title,
         CONCAT(valueInt, "%")                        AS  coupon,
         valueFloat,
         DATE_FORMAT(createdAt, "%Y년 %m월 %d일")		AS	createdAt, 
         DATE_FORMAT(updatedAt, "%Y년 %m월 %d일")		AS	updatedAt,
         UserId
   FROM  coupons
  WHERE  isDelete = false
  LIMIT  ${LIMIT}
 OFFSET  ${OFFSET}
  `;

  try {
    const couponlist = await models.sequelize.query(lengthQuery);

    const list = await models.sequelize.query(selectQuery);

    const couponLen = couponlist[0].length;

    const lastPage =
      couponLen % LIMIT > 0 ? couponLen / LIMIT + 1 : couponLen / LIMIT;

    return res
      .status(200)
      .json({ coupons: list[0], lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("쿠폰 목록을 불러올 수 없습니다.");
  }
});

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { title, valueInt, valueFloat } = req.body;

  try {
    const createResult = await Coupon.create({
      title,
      valueInt: parseInt(valueInt),
      valueFloat: parseFloat(valueFloat),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("쿠폰을 생성할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id, title, valueInt, valueFloat } = req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exCoupon = await Coupon.findOne({
      where: { id: parseInt(id) },
    });

    if (!exCoupon) {
      return res.status(401).send("존재하지 않는 쿠폰입니다.");
    }

    if (exCoupon.isDelete) {
      return res
        .status(401)
        .send("이미 삭제된 쿠폰입니댜. 다시 확인하여 주십시오.");
    }

    if (exCoupon.UserId !== null) {
      return res.status(401).send("이미 부여된 쿠폰은 수정할 수 없습니다.");
    }

    const updateResult = await Coupon.update(
      {
        title,
        valueInt,
        valueFloat,
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
    return res.status(401).send("쿠폰을 수정할 수 없습니다.");
  }
});

router.patch("/grant", isAdminCheck, async (req, res, next) => {
  const { id, UserId } = req.body;

  if (isNanCheck(id)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  if (isNanCheck(UserId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }

  try {
    const exUser = await User.findOne({
      where: { id: parseInt(UserId) },
    });

    const exCoupon = await Coupon.findOne({
      where: { id: parseInt(id) },
    });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    if (!exCoupon) {
      return res.status(401).send("존재하지 않는 쿠폰입니다.");
    }

    if (exCoupon.isDelete) {
      return res
        .status(401)
        .send("이미 삭제된 쿠폰입니댜. 다시 확인하여 주십시오.");
    }

    const grantResult = await Coupon.update(
      {
        UserId: parseInt(UserId),
      },
      {
        where: { id: parseInt(id) },
      }
    );

    if (grantResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("쿠폰을 지급할 수 없습니다.");
  }
});

router.delete("/delete/:couponId", async (req, res, next) => {
  const { couponId } = req.params;

  if (isNanCheck(couponId)) {
    return res.status(401).send("잘못된 요청입니다.");
  }
  try {
    const exCoupon = await Coupon.findOne({
      where: { id: parseInt(couponId) },
    });

    if (!exCoupon) {
      return res.status(401).send("존재하지 않는 쿠폰입니다.");
    }

    if (exCoupon.isDelete) {
      return res
        .status(401)
        .send("이미 삭제된 쿠폰입니댜. 다시 확인하여 주십시오.");
    }

    const deleteResult = await Coupon.update(
      {
        isDelete: true,
      },
      {
        where: { id: parseInt(couponId) },
      }
    );

    if (deleteResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("쿠폰을 삭제할 수 없습니다.");
  }
});

module.exports = router;
