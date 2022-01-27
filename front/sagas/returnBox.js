import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  RETURNBOX_LIST_REQUEST,
  RETURNBOX_LIST_SUCCESS,
  RETURNBOX_LIST_FAILURE,
  //
  RETURNBOX_UPLOAD_REQUEST,
  RETURNBOX_UPLOAD_SUCCESS,
  RETURNBOX_UPLOAD_FAILURE,
  //
  RETURNBOX_CREATE_REQUEST,
  RETURNBOX_CREATE_SUCCESS,
  RETURNBOX_CREATE_FAILURE,
  //
  RETURNBOX_UPDATE_REQUEST,
  RETURNBOX_UPDATE_SUCCESS,
  RETURNBOX_UPDATE_FAILURE,
  //
  RETURNBOX_DELETE_REQUEST,
  RETURNBOX_DELETE_SUCCESS,
  RETURNBOX_DELETE_FAILURE,
} from "../reducers/returnBox";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function returnBoxListAPI(data) {
  return axios.get(`/api/return/list/${data.qs}`, data);
}

function* returnBoxList(action) {
  try {
    const result = yield call(returnBoxListAPI, action.data);

    yield put({
      type: RETURNBOX_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETURNBOX_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function returnBoxThumbnailAPI(data) {
  return axios.post(`/api/return/image`, data);
}

function* returnBoxThumbnail(action) {
  try {
    const result = yield call(returnBoxThumbnailAPI, action.data);

    yield put({
      type: RETURNBOX_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETURNBOX_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function returnBoxCreateAPI(data) {
  console.log(data);
  return axios.post(`/api/return/create`, data);
}

function* returnBoxCreate(action) {
  try {
    const result = yield call(returnBoxCreateAPI, action.data);

    yield put({
      type: RETURNBOX_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETURNBOX_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function returnBoxUpdateAPI(data) {
  return axios.patch(`/api/return/update`, data);
}

function* returnBoxUpdate(action) {
  try {
    const result = yield call(returnBoxUpdateAPI, action.data);

    yield put({
      type: RETURNBOX_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETURNBOX_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function returnBoxDeleteAPI(data) {
  return axios.delete(`/api/return/delete/${data.returnBoxId}`);
}

function* returnBoxDelete(action) {
  try {
    const result = yield call(returnBoxDeleteAPI, action.data);

    yield put({
      type: RETURNBOX_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETURNBOX_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchReturnBoxList() {
  yield takeLatest(RETURNBOX_LIST_REQUEST, returnBoxList);
}

function* watchReturnBoxUpload() {
  yield takeLatest(RETURNBOX_UPLOAD_REQUEST, returnBoxThumbnail);
}

function* watchReturnBoxCreate() {
  yield takeLatest(RETURNBOX_CREATE_REQUEST, returnBoxCreate);
}

function* watchReturnBoxUpdate() {
  yield takeLatest(RETURNBOX_UPDATE_REQUEST, returnBoxUpdate);
}

function* watchReturnBoxDelete() {
  yield takeLatest(RETURNBOX_DELETE_REQUEST, returnBoxDelete);
}

//////////////////////////////////////////////////////////////
export default function* returnBoxSaga() {
  yield all([
    fork(watchReturnBoxList),
    fork(watchReturnBoxUpload),
    fork(watchReturnBoxCreate),
    fork(watchReturnBoxUpdate),
    fork(watchReturnBoxDelete),
    //
  ]);
}
