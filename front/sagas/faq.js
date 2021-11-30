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
  //
  FAQ_NEXT_REQUEST,
  FAQ_NEXT_SUCCESS,
  FAQ_NEXT_FAILURE,
  //
  FAQ_BEFORE_REQUEST,
  FAQ_BEFORE_SUCCESS,
  FAQ_BEFORE_FAILURE,
  //
  FAQ_DETAIL_REQUEST,
  FAQ_DETAIL_SUCCESS,
  FAQ_DETAIL_FAILURE,
  // ************************************************
  FAQ_TYPE_GET_REQUEST,
  FAQ_TYPE_GET_SUCCESS,
  FAQ_TYPE_GET_FAILURE,
  //
  FAQ_TYPE_CREATE_REQUEST,
  FAQ_TYPE_CREATE_SUCCESS,
  FAQ_TYPE_CREATE_FAILURE,
  //
  FAQ_TYPE_DELETE_REQUEST,
  FAQ_TYPE_DELETE_SUCCESS,
  FAQ_TYPE_DELETE_FAILURE,
  //
  FAQ_TYPE_UPDATE_REQUEST,
  FAQ_TYPE_UPDATE_SUCCESS,
  FAQ_TYPE_UPDATE_FAILURE,
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

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqNextAPI(data) {
  return axios.get(`/api/faq/next/${data.faqId}`);
}

function* faqNext(action) {
  try {
    const result = yield call(faqNextAPI, action.data);

    yield put({
      type: FAQ_NEXT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_NEXT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqBeforeAPI(data) {
  return axios.get(`/api/faq/prev/${data.faqId}`);
}

function* faqBefore(action) {
  try {
    const result = yield call(faqBeforeAPI, action.data);

    yield put({
      type: FAQ_BEFORE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_BEFORE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

function faqDetailAPI(data) {
  return axios.get(`/api/faq/list/${data.faqId}`);
}

function* faqDetail(action) {
  try {
    const result = yield call(faqDetailAPI, action.data);

    yield put({
      type: FAQ_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqTypeGetAPI() {
  return axios.get(`/api/faq/type/list`);
}

function* faqTypeGet() {
  try {
    const result = yield call(faqTypeGetAPI);

    yield put({
      type: FAQ_TYPE_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqTypeCreateAPI(data) {
  return axios.post(`/api/faq/type/create`, data);
}

function* faqTypeCreate(action) {
  try {
    const result = yield call(faqTypeCreateAPI, action.data);

    yield put({
      type: FAQ_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqTypeDeleteAPI(data) {
  return axios.delete(`/api/faq/type/delete/${data.faqTypeId}`);
}

function* faqTypeDelete(action) {
  try {
    const result = yield call(faqTypeDeleteAPI, action.data);

    yield put({
      type: FAQ_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqTypeUpdateAPI(data) {
  return axios.patch(`/api/faq/type/update`, data);
}

function* faqTypeUpdate(action) {
  try {
    const result = yield call(faqTypeUpdateAPI, action.data);

    yield put({
      type: FAQ_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_UPDATE_FAILURE,
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
function* watchFaqDetail() {
  yield takeLatest(FAQ_DETAIL_REQUEST, faqDetail);
}
function* watchFaqNext() {
  yield takeLatest(FAQ_NEXT_REQUEST, faqNext);
}
function* watchFaqBefore() {
  yield takeLatest(FAQ_BEFORE_REQUEST, faqBefore);
}
// ****************************************************************

function* watchFaqTypeGet() {
  yield takeLatest(FAQ_TYPE_GET_REQUEST, faqTypeGet);
}

function* watchFaqTypeCreate() {
  yield takeLatest(FAQ_TYPE_CREATE_REQUEST, faqTypeCreate);
}

function* watchFaqTypeDelete() {
  yield takeLatest(FAQ_TYPE_DELETE_REQUEST, faqTypeDelete);
}

function* watchFaqTypeUpdate() {
  yield takeLatest(FAQ_TYPE_UPDATE_REQUEST, faqTypeUpdate);
}

//////////////////////////////////////////////////////////////
export default function* faqSaga() {
  yield all([
    fork(watchFaqList),
    fork(watchFaqUpload),
    fork(watchFaqCreate),
    fork(watchFaqUpdate),
    fork(watchFaqDelete),
    fork(watchFaqDetail),
    fork(watchFaqNext),
    fork(watchFaqBefore),
    // ****************************************************************

    fork(watchFaqTypeGet),
    fork(watchFaqTypeCreate),
    fork(watchFaqTypeDelete),
    fork(watchFaqTypeUpdate),
    //
  ]);
}
