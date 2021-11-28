import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  EVENT_LIST_REQUEST,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAILURE,
  //
  EVENT_UPLOAD_REQUEST,
  EVENT_UPLOAD_SUCCESS,
  EVENT_UPLOAD_FAILURE,
  //
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAILURE,
  //
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAILURE,
  //
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAILURE,
  //
  EVENT_NEXT_REQUEST,
  EVENT_NEXT_SUCCESS,
  EVENT_NEXT_FAILURE,
  //
  EVENT_BEFORE_REQUEST,
  EVENT_BEFORE_SUCCESS,
  EVENT_BEFORE_FAILURE,
  //
  EVENT_DETAIL_REQUEST,
  EVENT_DETAIL_SUCCESS,
  EVENT_DETAIL_FAILURE,
} from "../reducers/event";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function eventListAPI(data) {
  return axios.get(`/api/event/list/${data.qs}`, data);
}

function* eventList(action) {
  try {
    const result = yield call(eventListAPI, action.data);

    yield put({
      type: EVENT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function eventThumbnailAPI(data) {
  return axios.post(`/api/event/image`, data);
}

function* eventThumbnail(action) {
  try {
    const result = yield call(eventThumbnailAPI, action.data);

    yield put({
      type: EVENT_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function eventCreateAPI(data) {
  return axios.post(`/api/event/create`, data);
}

function* eventCreate(action) {
  try {
    const result = yield call(eventCreateAPI, action.data);

    yield put({
      type: EVENT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function eventUpdateAPI(data) {
  return axios.patch(`/api/event/update`, data);
}

function* eventUpdate(action) {
  try {
    const result = yield call(eventUpdateAPI, action.data);

    yield put({
      type: EVENT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function eventDeleteAPI(data) {
  return axios.delete(`/api/event/delete/${data.eventId}`);
}

function* eventDelete(action) {
  try {
    const result = yield call(eventDeleteAPI, action.data);

    yield put({
      type: EVENT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_DELETE_FAILURE,
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
function eventNextAPI(data) {
  return axios.get(`/api/event/next/${data.eventId}`);
}

function* eventNext(action) {
  try {
    const result = yield call(eventNextAPI, action.data);

    yield put({
      type: EVENT_NEXT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_NEXT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function eventBeforeAPI(data) {
  return axios.get(`/api/event/prev/${data.eventId}`);
}

function* eventBefore(action) {
  try {
    const result = yield call(eventBeforeAPI, action.data);

    yield put({
      type: EVENT_BEFORE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_BEFORE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

function eventDetailAPI(data) {
  return axios.get(`/api/event/list/${data.eventId}`);
}

function* eventDetail(action) {
  try {
    const result = yield call(eventDetailAPI, action.data);

    yield put({
      type: EVENT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EVENT_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchEventList() {
  yield takeLatest(EVENT_LIST_REQUEST, eventList);
}

function* watchEventUpload() {
  yield takeLatest(EVENT_UPLOAD_REQUEST, eventThumbnail);
}

function* watchEventCreate() {
  yield takeLatest(EVENT_CREATE_REQUEST, eventCreate);
}

function* watchEventUpdate() {
  yield takeLatest(EVENT_UPDATE_REQUEST, eventUpdate);
}

function* watchEventDelete() {
  yield takeLatest(EVENT_DELETE_REQUEST, eventDelete);
}
function* watchEventDetail() {
  yield takeLatest(EVENT_DETAIL_REQUEST, eventDetail);
}
function* watchEventNext() {
  yield takeLatest(EVENT_NEXT_REQUEST, eventNext);
}
function* watchEventBefore() {
  yield takeLatest(EVENT_BEFORE_REQUEST, eventBefore);
}
//////////////////////////////////////////////////////////////
export default function* eventSaga() {
  yield all([
    fork(watchEventList),
    fork(watchEventUpload),
    fork(watchEventCreate),
    fork(watchEventUpdate),
    fork(watchEventDelete),
    fork(watchEventDetail),
    fork(watchEventNext),
    fork(watchEventBefore),
    //
  ]);
}
