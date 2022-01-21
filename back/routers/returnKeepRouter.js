const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

router.get("/list", isAdminCheck, async (req, res, next) => {
  const {} = req.query;
  try {
  } catch (error) {
    console.error(error);
    return res.status(401).send("목록을 조회할 수 없습니다.");
  }
});

module.exports = router;
