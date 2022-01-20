const express = require("express");
const axios = require("axios");
const moment = require("moment");
const { KeepBoxSchedule, User, KeepBox } = require("../models");

const router = express.Router();

router.post(`/callback?query=ajsdajks`, async (req, res, next) => {
  try {
    console.log("JSON", req.body);

    return res.status(200).json({ code: true, message: "success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ code: false, message: "fail - invalid fid" });
  }
});

router.post("/cancel/schedule", async (req, res, next) => {});

module.exports = router;
