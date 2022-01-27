import { all, fork } from "redux-saga/effects";
import bannerSaga from "./banner";
import userSaga from "./user";
import popupSaga from "./popup";
import companySaga from "./company";
import noticeSage from "./notice";
import gallerySage from "./gallery";
import questionSage from "./question";
import acceptSaga from "./accept";
import boxSaga from "./box";
import eventSaga from "./event";
import faqSaga from "./faq";
import infoSaga from "./info";
import keepBoxSaga from "./keepBox";
import menuImageSaga from "./menuImage";
import subscriptionSaga from "./subscription";
import returnBoxSaga from "./returnBox";
//
import axios from "axios";
import backURL from "../config/config";

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(bannerSaga),
    fork(userSaga),
    fork(popupSaga),
    fork(companySaga),
    fork(noticeSage),
    fork(gallerySage),
    fork(questionSage),
    fork(acceptSaga),
    fork(boxSaga),
    fork(eventSaga),
    fork(faqSaga),
    fork(infoSaga),
    fork(keepBoxSaga),
    fork(menuImageSaga),
    fork(subscriptionSaga),
    fork(returnBoxSaga),
  ]);
}
