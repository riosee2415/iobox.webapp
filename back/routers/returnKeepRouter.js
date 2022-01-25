const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { ReturnKeep, BoxImage, KeepBox } = require("../models");

const router = express.Router();

router.get("/list", isAdminCheck, async (req, res, next) => {
  try {
    const lists = await ReturnKeep.findAll({
      include: [
        {
          model: BoxImage,
          include: [
            {
              model: KeepBox,
            },
          ],
        },
      ],
    });

    return res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    return res.status(401).send("목록을 조회할 수 없습니다.");
  }
});

module.exports = router;
