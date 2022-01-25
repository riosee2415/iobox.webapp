import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  /////////////////////////////
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  /////////////////////////////
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  /////////////////////////////
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  /////////////////////////////
  USERLIST_REQUEST,
  USERLIST_SUCCESS,
  USERLIST_FAILURE,
  /////////////////////////////
  USERLIST_UPDATE_REQUEST,
  USERLIST_UPDATE_SUCCESS,
  USERLIST_UPDATE_FAILURE,
  /////////////////////////////
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  /////////////////////////////
  USER_CARD_CREATE_REQUEST,
  USER_CARD_CREATE_SUCCESS,
  USER_CARD_CREATE_FAILURE,
  /////////////////////////////
  USER_PHONE_REQUEST,
  USER_PHONE_SUCCESS,
  USER_PHONE_FAILURE,
  /////////////////////////////
  USER_PHONE_CHECK_REQUEST,
  USER_PHONE_CHECK_SUCCESS,
  USER_PHONE_CHECK_FAILURE,
  /////////////////////////////
  USER_NICKNAME_UPDATE_REQUEST,
  USER_NICKNAME_UPDATE_SUCCESS,
  USER_NICKNAME_UPDATE_FAILURE,
  /////////////////////////////
} from "../reducers/user";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function loadMyInfoAPI(data) {
  console.log(data);
  return axios.get("/api/user/signin", data);
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// *****

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function signinPI(data) {
  console.log(data);
  return axios.post(`/api/user/signin`, data);
}

function* signin(action) {
  try {
    const result = yield call(signinPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function signoutAPI(data) {
  return axios.get(`/api/user/logout`, data);
}

function* signout(action) {
  try {
    const result = yield call(signoutAPI, action.data);
    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function signinAdminPI(data) {
  return axios.post(`/api/user/signin/admin`, data);
}

function* signinAdmin(action) {
  try {
    const result = yield call(signinAdminPI, action.data);
    yield put({
      type: LOGIN_ADMIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_ADMIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function signUpAPI(data) {
  return axios.post(`/api/user/signup`, data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userListAPI(data) {
  return axios.get(
    `/api/user/list/${data.listType}?name=${data.name}&email=${data.email}`
  );
}

function* userList(action) {
  try {
    const result = yield call(userListAPI, action.data);
    yield put({
      type: USERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userListUpdateAPI(data) {
  return axios.patch(`/api/user/level/update`, data);
}

function* userListUpdate(action) {
  try {
    const result = yield call(userListUpdateAPI, action.data);
    yield put({
      type: USERLIST_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userNickNameUpdateAPI(data) {
  return axios.post(`/api/user/me/updateNick`, data);
}

function* userNickNameUpdate(action) {
  try {
    const result = yield call(userNickNameUpdateAPI, action.data);
    yield put({
      type: USER_NICKNAME_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_NICKNAME_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userPhoneCheckAPI(data) {
  return axios.post(`/api/user/phoneNumberCheck`, data);
}

function* userPhoneCheck(action) {
  try {
    const result = yield call(userPhoneCheckAPI, action.data);
    yield put({
      type: USER_PHONE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_PHONE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userPhoneCheckSNSAPI(data) {
  return axios.patch(`/api/user/secretCheck`, data);
}

function* userPhoneCheckSNS(action) {
  try {
    const result = yield call(userPhoneCheckSNSAPI, action.data);
    yield put({
      type: USER_PHONE_CHECK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_PHONE_CHECK_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userCardCreateAPI(data) {
  return axios.post(`/api/user/cardCreate`, data);
}

function* userCardCreate(action) {
  try {
    const result = yield call(userCardCreateAPI, action.data);
    yield put({
      type: USER_CARD_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_CARD_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchSignin() {
  yield takeLatest(LOGIN_REQUEST, signin);
}

function* watchSigninAdmin() {
  yield takeLatest(LOGIN_ADMIN_REQUEST, signinAdmin);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchUserList() {
  yield takeLatest(USERLIST_REQUEST, userList);
}

function* watchUserListUpdate() {
  yield takeLatest(USERLIST_UPDATE_REQUEST, userListUpdate);
}
function* watchSignOut() {
  yield takeLatest(LOGOUT_REQUEST, signout);
}

function* watchCardCreate() {
  yield takeLatest(USER_CARD_CREATE_REQUEST, userCardCreate);
}
function* watchPhoneUpdate() {
  yield takeLatest(USER_PHONE_REQUEST, userPhoneCheck);
}

function* watchPhoneCheckUpdate() {
  yield takeLatest(USER_PHONE_CHECK_REQUEST, userPhoneCheckSNS);
}
function* watchNickNameUpdate() {
  yield takeLatest(USER_NICKNAME_UPDATE_REQUEST, userNickNameUpdate);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchSignin),
    fork(watchSigninAdmin),
    fork(watchSignUp),
    fork(watchUserList),
    fork(watchUserListUpdate),
    fork(watchSignOut),
    fork(watchCardCreate),
    fork(watchPhoneUpdate),
    fork(watchPhoneCheckUpdate),
    fork(watchNickNameUpdate),
    //
  ]);
}
