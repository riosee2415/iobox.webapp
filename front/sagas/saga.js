import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  INFO_LIST_REQUEST,
  INFO_LIST_SUCCESS,
  INFO_LIST_FAILURE,
  //
  INFO_UPLOAD_REQUEST,
  INFO_UPLOAD_SUCCESS,
  INFO_UPLOAD_FAILURE,
  //
  INFO_CREATE_REQUEST,
  INFO_CREATE_SUCCESS,
  INFO_CREATE_FAILURE,
  //
  INFO_UPDATE_REQUEST,
  INFO_UPDATE_SUCCESS,
  INFO_UPDATE_FAILURE,
  //
  INFO_DELETE_REQUEST,
  INFO_DELETE_SUCCESS,
  INFO_DELETE_FAILURE,
} from "../reducers/info";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoListAPI(data) {
  return axios.get(`/api/info/list/${data.qs}`, data);
}

function* infoList(action) {
  try {
    const result = yield call(infoListAPI, action.data);

    yield put({
      type: INFO_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoThumbnailAPI(data) {
  return axios.post(`/api/info/image`, data);
}

function* infoThumbnail(action) {
  try {
    const result = yield call(infoThumbnailAPI, action.data);

    yield put({
      type: INFO_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoCreateAPI(data) {
  return axios.post(`/api/info/create`, data);
}

function* infoCreate(action) {
  try {
    const result = yield call(infoCreateAPI, action.data);

    yield put({
      type: INFO_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoUpdateAPI(data) {
  return axios.patch(`/api/info/update`, data);
}

function* infoUpdate(action) {
  try {
    const result = yield call(infoUpdateAPI, action.data);

    yield put({
      type: INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoDeleteAPI(data) {
  return axios.delete(`/api/info/delete/${data.infoId}`);
}

function* infoDelete(action) {
  try {
    const result = yield call(infoDeleteAPI, action.data);

    yield put({
      type: INFO_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchInfoList() {
  yield takeLatest(INFO_LIST_REQUEST, infoList);
}

function* watchInfoUpload() {
  yield takeLatest(INFO_UPLOAD_REQUEST, infoThumbnail);
}

function* watchInfoCreate() {
  yield takeLatest(INFO_CREATE_REQUEST, infoCreate);
}

function* watchInfoUpdate() {
  yield takeLatest(INFO_UPDATE_REQUEST, infoUpdate);
}

function* watchInfoDelete() {
  yield takeLatest(INFO_DELETE_REQUEST, infoDelete);
}

//////////////////////////////////////////////////////////////
export default function* infoSaga() {
  yield all([
    fork(watchInfoList),
    fork(watchInfoUpload),
    fork(watchInfoCreate),
    fork(watchInfoUpdate),
    fork(watchInfoDelete),
    //
  ]);
}
