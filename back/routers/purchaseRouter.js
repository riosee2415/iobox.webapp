const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { Purchase, User, KeepBox } = require("../models");

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
    let totalPurchase = [];
    let purchases = [];
    let lastPage = 0;
    let purchaseLen = 0;

    switch (_listType) {
      case 1:
        totalPurchase = await Purchase.findAll({});

        purchaseLen = totalPurchase.length;

        lastPage =
          purchaseLen % LIMIT > 0
            ? purchaseLen / LIMIT + 1
            : purchaseLen / LIMIT;

        purchases = await Purchase.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            isComplete: false,
          },
          include: [
            {
              model: User,
            },
            {
              model: KeepBox,
            },
          ],
        });
        break;
      case 2:
        totalPurchase = await Purchase.findAll({});

        purchaseLen = totalPurchase.length;

        lastPage =
          purchaseLen % LIMIT > 0
            ? purchaseLen / LIMIT + 1
            : purchaseLen / LIMIT;

        purchases = await Purchase.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            isComplete: true,
          },
          include: [
            {
              model: User,
            },
            {
              model: KeepBox,
            },
          ],
        });
        break;

      case 3:
        totalPurchase = await Purchase.findAll({});

        purchaseLen = totalPurchase.length;

        lastPage =
          purchaseLen % LIMIT > 0
            ? purchaseLen / LIMIT + 1
            : purchaseLen / LIMIT;

        purchases = await Purchase.findAll({
          offset: OFFSET,
          limit: LIMIT,
          include: [
            {
              model: User,
            },
            {
              model: KeepBox,
            },
          ],
        });
        break;

      default:
        break;
    }

    return res.status(200).json({ purchases, lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("결제내역을 불러올 수 없습니다.");
  }
});

router.post("/create", async (req, res, next) => {
  const { UserId, KeepBoxId, price, type } = req.body;

  try {
    const createResult = await Purchase.create({
      type,
      price,
      UserId: parseInt(UserId),
      KeepBoxId: parseInt(KeepBoxId),
    });

    if (!createResult) {
      return res.status(401).send("처리중 문제가 발생하였습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("결제를 할 수 없습니다.");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;
  try {
    const exPurchase = await Purchase.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!exPurchase) {
      return res.status(401).send("존재하지 않는 데이터입니다.");
    }

    const updateResult = await Purchase.update(
      {
        isComplete: true,
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
    return res.status(401).send("상태를 변경할 수 없습니다.");
  }
});
module.exports = router;
