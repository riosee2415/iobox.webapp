const express = require("express");
const axios = require("axios");
const moment = require("moment");
const { KeepBoxSchedule, User, KeepBox } = require("../models");

const router = express.Router();

router.post(`/callback`, async (req, res, next) => {
  try {
    console.log("JSON", req.body);

    const updateResult = await KeepBox.update(
      {
        // isPickup: true,
        // deliveryCom,
        deliveryCode: "ASDJKONAJKLSDNJAKLSDU",
        merchantUid: "ASJKDHAJKLSDNJKALSNDJKASDASD",
      },
      {
        where: { name: "서재완5호기" },
      }
    );

    return res.status(200).json({ code: true, message: "success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ code: false, message: "fail - invalid fid" });
  }
});

router.post("/cancel/schedule", async (req, res, next) => {});

module.exports = router;
