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
  //
  INFO_TYPE_LIST_REQUEST,
  INFO_TYPE_LIST_SUCCESS,
  INFO_TYPE_LIST_FAILURE,
  //
  INFO_TYPE_UPLOAD_REQUEST,
  INFO_TYPE_UPLOAD_SUCCESS,
  INFO_TYPE_UPLOAD_FAILURE,
  //
  INFO_TYPE_CREATE_REQUEST,
  INFO_TYPE_CREATE_SUCCESS,
  INFO_TYPE_CREATE_FAILURE,
  //
  INFO_TYPE_UPDATE_REQUEST,
  INFO_TYPE_UPDATE_SUCCESS,
  INFO_TYPE_UPDATE_FAILURE,
  //
  INFO_TYPE_DELETE_REQUEST,
  INFO_TYPE_DELETE_SUCCESS,
  INFO_TYPE_DELETE_FAILURE,
  //
  INFORMATION_NEXT_REQUEST,
  INFORMATION_NEXT_SUCCESS,
  INFORMATION_NEXT_FAILURE,
  //
  INFORMATION_BEFORE_REQUEST,
  INFORMATION_BEFORE_SUCCESS,
  INFORMATION_BEFORE_FAILURE,
  //
  INFORMATION_DETAIL_REQUEST,
  INFORMATION_DETAIL_SUCCESS,
  INFORMATION_DETAIL_FAILURE,
} from "../reducers/info";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoListAPI(data) {
  return axios.get(`/api/guide/list/${data.qs}`, data);
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
  return axios.post(`/api/guide/image`, data);
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
  return axios.post(`/api/guide/create`, data);
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
  return axios.patch(`/api/guide/update`, data);
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
  return axios.delete(`/api/guide/delete/${data.infoId}`);
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

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoTypeListAPI(data) {
  return axios.get(`/api/guide/type/list/`, data);
}

function* infoTypeList(action) {
  try {
    const result = yield call(infoTypeListAPI, action.data);

    yield put({
      type: INFO_TYPE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_TYPE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoTypeThumbnailAPI(data) {
  return axios.post(`/api/guide/type/image`, data);
}

function* infoTypeThumbnail(action) {
  try {
    const result = yield call(infoTypeThumbnailAPI, action.data);

    yield put({
      type: INFO_TYPE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_TYPE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoTypeCreateAPI(data) {
  return axios.post(`/api/guide/type/create`, data);
}

function* infoTypeCreate(action) {
  try {
    const result = yield call(infoTypeCreateAPI, action.data);

    yield put({
      type: INFO_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_TYPE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoTypeUpdateAPI(data) {
  return axios.patch(`/api/guide/type/update`, data);
}

function* infoTypeUpdate(action) {
  try {
    const result = yield call(infoTypeUpdateAPI, action.data);

    yield put({
      type: INFO_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_TYPE_UPDATE_FAILURE,
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
function infoNextAPI(data) {
  console.log(data);
  return axios.get(`/api/guide/next/${data.guideId}`);
}

function* infoNext(action) {
  try {
    const result = yield call(infoNextAPI, action.data);

    yield put({
      type: INFORMATION_NEXT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFORMATION_NEXT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoBeforeAPI(data) {
  return axios.get(`/api/guide/prev/${data.guideId}`);
}

function* infoBefore(action) {
  try {
    const result = yield call(infoBeforeAPI, action.data);

    yield put({
      type: INFORMATION_BEFORE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFORMATION_BEFORE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

function infoDetailAPI(data) {
  console.log(data);
  return axios.get(`/api/guide/list/${data.guideId}`);
}

function* infoDetail(action) {
  try {
    const result = yield call(infoDetailAPI, action.data);

    yield put({
      type: INFORMATION_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFORMATION_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function infoTypeDeleteAPI(data) {
  return axios.delete(`/api/guide/type/delete/${data.infoTypeId}`);
}

function* infoTypeDelete(action) {
  try {
    const result = yield call(infoTypeDeleteAPI, action.data);

    yield put({
      type: INFO_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INFO_TYPE_DELETE_FAILURE,
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

function* watchInfoTypeList() {
  yield takeLatest(INFO_TYPE_LIST_REQUEST, infoTypeList);
}

function* watchInfoTypeUpload() {
  yield takeLatest(INFO_TYPE_UPLOAD_REQUEST, infoTypeThumbnail);
}

function* watchInfoTypeCreate() {
  yield takeLatest(INFO_TYPE_CREATE_REQUEST, infoTypeCreate);
}

function* watchInfoTypeUpdate() {
  yield takeLatest(INFO_TYPE_UPDATE_REQUEST, infoTypeUpdate);
}

function* watchInfoTypeDelete() {
  yield takeLatest(INFO_TYPE_DELETE_REQUEST, infoTypeDelete);
}
function* watchInfoDetail() {
  yield takeLatest(INFORMATION_DETAIL_REQUEST, infoDetail);
}
function* watchInfoNext() {
  yield takeLatest(INFORMATION_NEXT_REQUEST, infoNext);
}
function* watchInfoBefore() {
  yield takeLatest(INFORMATION_BEFORE_REQUEST, infoBefore);
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
    fork(watchInfoTypeList),
    fork(watchInfoTypeUpload),
    fork(watchInfoTypeCreate),
    fork(watchInfoTypeUpdate),
    fork(watchInfoTypeDelete),
    //
    fork(watchInfoDetail),
    fork(watchInfoNext),
    fork(watchInfoBefore),
  ]);
}
