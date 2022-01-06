import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
  SUBSCRIPTION_CREATE_FAILURE,
  //
  SUBSCRIPTION_CANCEL_REQUEST,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAILURE,
} from "../reducers/subscription";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function subscriptionCreateAPI(data) {
  return axios.post(`/api/subscription`, data);
}

function* subscriptionCreate(action) {
  try {
    const result = yield call(subscriptionCreateAPI, action.data);

    yield put({
      type: SUBSCRIPTION_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SUBSCRIPTION_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function subscriptionCancelAPI(data) {
  return axios.post(`/api/subscription/cancel/schedule`, data);
}

function* subscriptionCancel(action) {
  try {
    const result = yield call(subscriptionCancelAPI, action.data);

    yield put({
      type: SUBSCRIPTION_CANCEL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SUBSCRIPTION_CANCEL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

function* watchSubscriptuon() {
  yield takeLatest(SUBSCRIPTION_CREATE_REQUEST, subscriptionCreate);
}

function* watchSubscriptuonCancel() {
  yield takeLatest(SUBSCRIPTION_CANCEL_REQUEST, subscriptionCancel);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchSubscriptuon),
    fork(watchSubscriptuonCancel),
    //
  ]);
}
