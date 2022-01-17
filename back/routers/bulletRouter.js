const express = require("express");
const { BulletBox, BulletImage } = require("../models");

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
        });
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("총알배송 목록을 불러올 수 없습니다.");
  }
});

module.exports = router;
