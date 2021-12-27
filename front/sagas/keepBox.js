import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  KEEPBOX_LIST_SUCCESS,
  KEEPBOX_LIST_FAILURE,
  KEEPBOX_LIST_REQUEST,
  //
  KEEPBOX_DATE_LIST_SUCCESS,
  KEEPBOX_DATE_LIST_FAILURE,
  KEEPBOX_DATE_LIST_REQUEST,
  //
  KEEPBOX_CREATE_REQUEST,
  KEEPBOX_CREATE_SUCCESS,
  KEEPBOX_CREATE_FAILURE,
  //
  KEEPBOX_UPDATE_REQUEST,
  KEEPBOX_UPDATE_SUCCESS,
  KEEPBOX_UPDATE_FAILURE,
  //
  KEEPBOX_DELETE_REQUEST,
  KEEPBOX_DELETE_SUCCESS,
  KEEPBOX_DELETE_FAILURE,
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
function keepBoxDateListAPI(data) {
  return axios.post(`/api/keepBox/list/date`, data);
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

//////////////////////////////////////////////////////////////
function* watchKeepBoxList() {
  yield takeLatest(KEEPBOX_LIST_REQUEST, keepBoxList);
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

//////////////////////////////////////////////////////////////
export default function* keepBoxSaga() {
  yield all([
    fork(watchKeepBoxList),
    fork(watchKeepBoxDateList),
    fork(watchKeepBoxCreate),
    fork(watchKeepBoxUpdate),
    fork(watchKeepBoxDelete),
    //
  ]);
}
