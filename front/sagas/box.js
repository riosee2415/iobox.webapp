import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  BOX_LIST_REQUEST,
  BOX_LIST_SUCCESS,
  BOX_LIST_FAILURE,
  //
  BOX_UPLOAD_REQUEST,
  BOX_UPLOAD_SUCCESS,
  BOX_UPLOAD_FAILURE,
  //
  BOX_CREATE_REQUEST,
  BOX_CREATE_SUCCESS,
  BOX_CREATE_FAILURE,
  //
  BOX_UPDATE_REQUEST,
  BOX_UPDATE_SUCCESS,
  BOX_UPDATE_FAILURE,
  //
  BOX_DELETE_REQUEST,
  BOX_DELETE_SUCCESS,
  BOX_DELETE_FAILURE,
} from "../reducers/box";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function boxListAPI(data) {
  return axios.get(`/api/box/list/${data.qs}`, data);
}

function* boxList(action) {
  try {
    const result = yield call(boxListAPI, action.data);

    yield put({
      type: BOX_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOX_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function boxThumbnailAPI(data) {
  return axios.post(`/api/box/image`, data);
}

function* boxThumbnail(action) {
  try {
    const result = yield call(boxThumbnailAPI, action.data);

    yield put({
      type: BOX_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOX_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function boxCreateAPI(data) {
  return axios.post(`/api/box/create`, data);
}

function* boxCreate(action) {
  try {
    const result = yield call(boxCreateAPI, action.data);

    yield put({
      type: BOX_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOX_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function boxUpdateAPI(data) {
  return axios.patch(`/api/box/update`, data);
}

function* boxUpdate(action) {
  try {
    const result = yield call(boxUpdateAPI, action.data);

    yield put({
      type: BOX_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOX_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function boxDeleteAPI(data) {
  return axios.delete(`/api/box/delete/${data.boxId}`);
}

function* boxDelete(action) {
  try {
    const result = yield call(boxDeleteAPI, action.data);

    yield put({
      type: BOX_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: BOX_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchBoxList() {
  yield takeLatest(BOX_LIST_REQUEST, boxList);
}

function* watchBoxUpload() {
  yield takeLatest(BOX_UPLOAD_REQUEST, boxThumbnail);
}

function* watchBoxCreate() {
  yield takeLatest(BOX_CREATE_REQUEST, boxCreate);
}

function* watchBoxUpdate() {
  yield takeLatest(BOX_UPDATE_REQUEST, boxUpdate);
}

function* watchBoxDelete() {
  yield takeLatest(BOX_DELETE_REQUEST, boxDelete);
}

//////////////////////////////////////////////////////////////
export default function* boxSaga() {
  yield all([
    fork(watchBoxList),
    fork(watchBoxUpload),
    fork(watchBoxCreate),
    fork(watchBoxUpdate),
    fork(watchBoxDelete),
    //
  ]);
}
