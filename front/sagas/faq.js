import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FAQ_LIST_REQUEST,
  FAQ_LIST_SUCCESS,
  FAQ_LIST_FAILURE,
  //
  FAQ_UPLOAD_REQUEST,
  FAQ_UPLOAD_SUCCESS,
  FAQ_UPLOAD_FAILURE,
  //
  FAQ_CREATE_REQUEST,
  FAQ_CREATE_SUCCESS,
  FAQ_CREATE_FAILURE,
  //
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
  FAQ_UPDATE_FAILURE,
  //
  FAQ_DELETE_REQUEST,
  FAQ_DELETE_SUCCESS,
  FAQ_DELETE_FAILURE,
} from "../reducers/faq";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqListAPI(data) {
  return axios.get(`/api/faq/list/${data.qs}`, data);
}

function* faqList(action) {
  try {
    const result = yield call(faqListAPI, action.data);

    yield put({
      type: FAQ_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqThumbnailAPI(data) {
  return axios.post(`/api/faq/image`, data);
}

function* faqThumbnail(action) {
  try {
    const result = yield call(faqThumbnailAPI, action.data);

    yield put({
      type: FAQ_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqCreateAPI(data) {
  return axios.post(`/api/faq/create`, data);
}

function* faqCreate(action) {
  try {
    const result = yield call(faqCreateAPI, action.data);

    yield put({
      type: FAQ_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqUpdateAPI(data) {
  return axios.patch(`/api/faq/update`, data);
}

function* faqUpdate(action) {
  try {
    const result = yield call(faqUpdateAPI, action.data);

    yield put({
      type: FAQ_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqDeleteAPI(data) {
  return axios.delete(`/api/faq/delete/${data.faqId}`);
}

function* faqDelete(action) {
  try {
    const result = yield call(faqDeleteAPI, action.data);

    yield put({
      type: FAQ_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchFaqList() {
  yield takeLatest(FAQ_LIST_REQUEST, faqList);
}

function* watchFaqUpload() {
  yield takeLatest(FAQ_UPLOAD_REQUEST, faqThumbnail);
}

function* watchFaqCreate() {
  yield takeLatest(FAQ_CREATE_REQUEST, faqCreate);
}

function* watchFaqUpdate() {
  yield takeLatest(FAQ_UPDATE_REQUEST, faqUpdate);
}

function* watchFaqDelete() {
  yield takeLatest(FAQ_DELETE_REQUEST, faqDelete);
}

//////////////////////////////////////////////////////////////
export default function* faqSaga() {
  yield all([
    fork(watchFaqList),
    fork(watchFaqUpload),
    fork(watchFaqCreate),
    fork(watchFaqUpdate),
    fork(watchFaqDelete),
    //
  ]);
}
