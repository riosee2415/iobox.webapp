const express = require("express");
const axios = require("axios");
const moment = require("moment");
const { KeepBoxSchedule, User, KeepBox } = require("../models");

const router = express.Router();

router.post(`/callback`, async (req, res, next) => {
  // 알림톡 전환 필요

  // 배송 레벨
  // 1 배송준비 상태
  // 2 집화완료 상태
  // 3 배송진행 중 상태
  // 4 지점도착 상태
  // 5 배송출발 상태
  // 6 배송완료 상태
  try {
    const {
      fid, // 조회용 코드
      invoice_no, // 운송장번호
      level, // 배송 상태
      where, // 위치
      telno_man, // 기사 연락처
      recv_addr, // 수취인 주소
      estmate, // 예정 시간
    } = req.body;

    const updateResult = await KeepBox.findOne({
      where: { merchantUid: fid },
    });

    // // 알림톡
    let d = new Date();
    let year = d.getFullYear() + "";
    let month = d.getMonth() + 1 + "";
    let date = d.getDate() + "";
    let hour = d.getHours() + "";
    let min = d.getMinutes() + "";
    let sec = d.getSeconds() + "";
    let mSec = d.getMilliseconds() + "";
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    mSec = mSec < 10 ? "0" + mSec : mSec;
    let mKey = "MAS" + year + month + date + hour + min + sec + mSec;

    const trakerApi = await axios({
      url: `https://dev-alimtalk-api.sweettracker.net/v2/${profile_key}/sendMessage`,
      method: "post", // POST method
      headers: { "Content-Type": "application/json", userid: "key" }, // "Content-Type": "application/json"
      data: {
        msgid: mKey, // 고유한 메시지 코드
        message_type: "AT", // 알림톡 타입 => AT : 알림톡, AI : 이지미 알림톡
        profile_key, // 발신 프로필 키
        template_code: "code ", // 템플릿 코드
        receiver_num: updateResult.mobile, // 사용자 연락처
        message: `
    
        `, // 알림톡 내용
        reserved_time: "00000000000000", // 즉시 발송
        // sms_only :  문자만 보낼때 사용
        parcel_company: "04", // 택배사 코드
        parcel_invoice: invoice_no, // 송장번호
        // button1: {
        //   name: "~~~", // 버튼 내용
        //   type: "WL", // 버튼 타입 => WL : 웹으로 이동 (반응형 포함) AL : 어플로 이동
        //   url_pc: "url",
        //   url_mobile: "url",
        // },
        // 버튼 JSON 형식
      },
    });

    return res.status(200).json({ code: true, message: "success" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ code: false, message: "fail - invalid fid" });
  }
});

router.post("/cancel/schedule", async (req, res, next) => {});

module.exports = router;
