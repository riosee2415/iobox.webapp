import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  KEEPBOX_LIST_SUCCESS,
  KEEPBOX_LIST_FAILURE,
  KEEPBOX_LIST_REQUEST,
  //
  MASTER_KEEPBOX_LIST_SUCCESS,
  MASTER_KEEPBOX_LIST_FAILURE,
  MASTER_KEEPBOX_LIST_REQUEST,
  //
  MASTER_KEEPBOX_UPDATE_SUCCESS,
  MASTER_KEEPBOX_UPDATE_FAILURE,
  MASTER_KEEPBOX_UPDATE_REQUEST,
  //
  KEEPBOX_LIST_DETAIL_SUCCESS,
  KEEPBOX_LIST_DETAIL_FAILURE,
  KEEPBOX_LIST_DETAIL_REQUEST,
  //
  KEEPBOX_DETAIL_REQUEST,
  KEEPBOX_DETAIL_SUCCESS,
  KEEPBOX_DETAIL_FAILURE,
  //
  KEEPBOX_DATE_LIST_SUCCESS,
  KEEPBOX_DATE_LIST_FAILURE,
  KEEPBOX_DATE_LIST_REQUEST,
  //
  KEEPBOX_CREATE_REQUEST,
  KEEPBOX_CREATE_SUCCESS,
  KEEPBOX_CREATE_FAILURE,
  //
  KEEPBOX_UPLOAD_REQUEST,
  KEEPBOX_UPLOAD_SUCCESS,
  KEEPBOX_UPLOAD_FAILURE,
  //
  KEEPBOX_UPDATE_REQUEST,
  KEEPBOX_UPDATE_SUCCESS,
  KEEPBOX_UPDATE_FAILURE,
  //
  KEEPBOX_DELETE_REQUEST,
  KEEPBOX_DELETE_SUCCESS,
  KEEPBOX_DELETE_FAILURE,
  //
  KEEPBOX_IMAGE_DELETE_REQUEST,
  KEEPBOX_IMAGE_DELETE_SUCCESS,
  KEEPBOX_IMAGE_DELETE_FAILURE,
} from "../reducers/keepBox";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxListAPI(data) {
  return axios.get(`/api/keepBox/list${data.qs}`, data);
}

function* keepBoxList(action) {
  try {
    const result = yield call(keepBoxListAPI, action.data);

    yield put({
      type: KEEPBOX_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function masterKeepBoxListAPI(data) {
  return axios.get(`/api/keepBox/userBox/${data.id}`, data);
}

function* masterKeepBoxList(action) {
  try {
    const result = yield call(masterKeepBoxListAPI, action.data);

    yield put({
      type: MASTER_KEEPBOX_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MASTER_KEEPBOX_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function masterKeepBoxUpdateAPI(data) {
  return axios.patch(`/api/keepBox/master/status`, data);
}

function* masterKeepBoxUpdate(action) {
  try {
    const result = yield call(masterKeepBoxUpdateAPI, action.data);

    yield put({
      type: MASTER_KEEPBOX_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MASTER_KEEPBOX_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxListDetailAPI(data) {
  return axios.get(`/api/keepBox/master/detail${data.qs}`, data);
}

function* keepBoxListDetail(action) {
  try {
    const result = yield call(keepBoxListDetailAPI, action.data);

    yield put({
      type: KEEPBOX_LIST_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_LIST_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxUploadAPI(data) {
  console.log(data);
  return axios.post(`/api/keepBox/image/create`, data.formData);
}

function* keepBoxUpload(action) {
  try {
    const result = yield call(keepBoxUploadAPI, action.data);

    yield put({
      type: KEEPBOX_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxDetailAPI(data) {
  return axios.get(`/api/keepBox/box/${data.id}`, data);
}

function* keepBoxDetail(action) {
  try {
    const result = yield call(keepBoxDetailAPI, action.data);

    yield put({
      type: KEEPBOX_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxDateListAPI(data) {
  return axios.post(`/api/keepBox/list/date${data.qs}`, data);
}

function* keepBoxDateList(action) {
  try {
    const result = yield call(keepBoxDateListAPI, action.data);

    yield put({
      type: KEEPBOX_DATE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_DATE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxCreateAPI(data) {
  return axios.post(`/api/keepBox/create`, data);
}

function* keepBoxCreate(action) {
  try {
    const result = yield call(keepBoxCreateAPI, action.data);

    yield put({
      type: KEEPBOX_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxUpdateAPI(data) {
  return axios.patch(`/api/keepBox/update`, data);
}

function* keepBoxUpdate(action) {
  try {
    const result = yield call(keepBoxUpdateAPI, action.data);

    yield put({
      type: KEEPBOX_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxDeleteAPI(data) {
  return axios.delete(`/api/keepBox/delete/${data.boxId}`);
}

function* keepBoxDelete(action) {
  try {
    const result = yield call(keepBoxDeleteAPI, action.data);

    yield put({
      type: KEEPBOX_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function keepBoxImageDeleteAPI(data) {
  return axios.delete(`/api/keepBox/image/delete/${data.imageId}`);
}

function* keepBoxImageDelete(action) {
  try {
    const result = yield call(keepBoxImageDeleteAPI, action.data);

    yield put({
      type: KEEPBOX_IMAGE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KEEPBOX_IMAGE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchKeepBoxList() {
  yield takeLatest(KEEPBOX_LIST_REQUEST, keepBoxList);
}

function* watchMasterKeepBoxList() {
  yield takeLatest(MASTER_KEEPBOX_LIST_REQUEST, masterKeepBoxList);
}

function* watchMasterKeepBoxUpdate() {
  yield takeLatest(MASTER_KEEPBOX_UPDATE_REQUEST, masterKeepBoxUpdate);
}

function* watchKeepBoxListDetail() {
  yield takeLatest(KEEPBOX_LIST_DETAIL_REQUEST, keepBoxListDetail);
}

function* watchKeepBoxUpload() {
  yield takeLatest(KEEPBOX_UPLOAD_REQUEST, keepBoxUpload);
}

function* watchKeepBoxDetail() {
  yield takeLatest(KEEPBOX_DETAIL_REQUEST, keepBoxDetail);
}

function* watchKeepBoxDateList() {
  yield takeLatest(KEEPBOX_DATE_LIST_REQUEST, keepBoxDateList);
}

function* watchKeepBoxCreate() {
  yield takeLatest(KEEPBOX_CREATE_REQUEST, keepBoxCreate);
}

function* watchKeepBoxUpdate() {
  yield takeLatest(KEEPBOX_UPDATE_REQUEST, keepBoxUpdate);
}

function* watchKeepBoxDelete() {
  yield takeLatest(KEEPBOX_DELETE_REQUEST, keepBoxDelete);
}

function* watchKeepBoxImageDelete() {
  yield takeLatest(KEEPBOX_IMAGE_DELETE_REQUEST, keepBoxImageDelete);
}

//////////////////////////////////////////////////////////////
export default function* keepBoxSaga() {
  yield all([
    fork(watchKeepBoxList),
    fork(watchMasterKeepBoxList),
    fork(watchMasterKeepBoxUpdate),
    fork(watchKeepBoxListDetail),
    fork(watchKeepBoxUpload),
    fork(watchKeepBoxDetail),
    fork(watchKeepBoxDateList),
    fork(watchKeepBoxCreate),
    fork(watchKeepBoxUpdate),
    fork(watchKeepBoxDelete),
    fork(watchKeepBoxImageDelete),
    //
  ]);
}
