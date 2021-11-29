import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MENU_LIST_REQUEST,
  MENU_LIST_SUCCESS,
  MENU_LIST_FAILURE,
  //
  MENU_UPLOAD_REQUEST,
  MENU_UPLOAD_SUCCESS,
  MENU_UPLOAD_FAILURE,
  //
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_FAILURE,
  //
  MENU_UPDATE_REQUEST,
  MENU_UPDATE_SUCCESS,
  MENU_UPDATE_FAILURE,
  //
  MENU_DELETE_REQUEST,
  MENU_DELETE_SUCCESS,
  MENU_DELETE_FAILURE,
} from "../reducers/menuImage";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuImageListAPI(data) {
  return axios.get(`/api/menuImage/list`, data);
}

function* menuImageList(action) {
  try {
    const result = yield call(menuImageListAPI, action.data);

    yield put({
      type: MENU_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuImageThumbnailAPI(data) {
  return axios.post(`/api/menuImage/image`, data);
}

function* menuImageThumbnail(action) {
  try {
    const result = yield call(menuImageThumbnailAPI, action.data);

    yield put({
      type: MENU_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuImageCreateAPI(data) {
  return axios.post(`/api/menuImage/create`, data);
}

function* menuImageCreate(action) {
  try {
    const result = yield call(menuImageCreateAPI, action.data);

    yield put({
      type: MENU_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuImageUpdateAPI(data) {
  return axios.patch(`/api/menuImage/update`, data);
}

function* menuImageUpdate(action) {
  try {
    const result = yield call(menuImageUpdateAPI, action.data);

    yield put({
      type: MENU_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuImageDeleteAPI(data) {
  return axios.delete(`/api/menuImage/delete/${data.menuImageId}`);
}

function* menuImageDelete(action) {
  try {
    const result = yield call(menuImageDeleteAPI, action.data);

    yield put({
      type: MENU_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchMenuImageList() {
  yield takeLatest(MENU_LIST_REQUEST, menuImageList);
}

function* watchMenuImageUpload() {
  yield takeLatest(MENU_UPLOAD_REQUEST, menuImageThumbnail);
}

function* watchMenuImageCreate() {
  yield takeLatest(MENU_CREATE_REQUEST, menuImageCreate);
}

function* watchMenuImageUpdate() {
  yield takeLatest(MENU_UPDATE_REQUEST, menuImageUpdate);
}

function* watchMenuImageDelete() {
  yield takeLatest(MENU_DELETE_REQUEST, menuImageDelete);
}

//////////////////////////////////////////////////////////////
export default function* menuImageSaga() {
  yield all([
    fork(watchMenuImageList),
    fork(watchMenuImageUpload),
    fork(watchMenuImageCreate),
    fork(watchMenuImageUpdate),
    fork(watchMenuImageDelete),
    //
  ]);
}
