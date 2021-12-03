import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
  SUBSCRIPTION_CREATE_FAILURE,
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

function* watchSubscriptuon() {
  yield takeLatest(SUBSCRIPTION_CREATE_REQUEST, subscriptionCreate);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchSubscriptuon),
    //
  ]);
}
