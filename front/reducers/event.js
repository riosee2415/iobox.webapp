import produce from "../util/produce";

export const initailState = {
  events: null,
  uploadeventPath: "",
  maxPage: 1,
  modal: false,
  //

  nextData: null,
  beforeData: null,
  eventDetail: null,
  //

  st_eventListLoading: false, // 후기 가져오기
  st_eventListDone: false,
  st_eventListError: null,
  //
  st_eventCreateLoading: false, // 이벤트 만들기
  st_eventCreateDone: false,
  st_eventCreateError: null,
  //
  st_eventUpdateLoading: false, // 이벤트 업데이트
  st_eventUpdateDone: false,
  st_eventUpdateError: null,
  //
  st_eventDeleteLoading: false, // 이벤트 삭제
  st_eventDeleteDone: false,
  st_eventDeleteError: null,
  //
  st_eventNextLoading: false, // 이벤트 다음글
  st_eventNextDone: false,
  st_eventNextError: null,
  //
  st_eventBeforeLoading: false, // 이벤트 이전글
  st_eventBeforeDone: false,
  st_eventBeforeError: null,
  //
  st_eventDetailLoading: false, // 이벤트 디테일
  st_eventDetailDone: false,
  st_eventDetailError: null,
};

export const EVENT_LIST_REQUEST = "EVENT_LIST_REQUEST";
export const EVENT_LIST_SUCCESS = "EVENT_LIST_SUCCESS";
export const EVENT_LIST_FAILURE = "EVENT_LIST_FAILURE";

export const EVENT_DETAIL_REQUEST = "EVENT_DETAIL_REQUEST";
export const EVENT_DETAIL_SUCCESS = "EVENT_DETAIL_SUCCESS";
export const EVENT_DETAIL_FAILURE = "EVENT_DETAIL_FAILURE";
//
export const EVENT_NEXT_REQUEST = "EVENT_NEXT_REQUEST";
export const EVENT_NEXT_SUCCESS = "EVENT_NEXT_SUCCESS";
export const EVENT_NEXT_FAILURE = "EVENT_NEXT_FAILURE";
//
export const EVENT_BEFORE_REQUEST = "EVENT_BEFORE_REQUEST";
export const EVENT_BEFORE_SUCCESS = "EVENT_BEFORE_SUCCESS";
export const EVENT_BEFORE_FAILURE = "EVENT_BEFORE_FAILURE";
//
export const EVENT_UPLOAD_REQUEST = "EVENT_UPLOAD_REQUEST";
export const EVENT_UPLOAD_SUCCESS = "EVENT_UPLOAD_SUCCESS";
export const EVENT_UPLOAD_FAILURE = "EVENT_UPLOAD_FAILURE";

export const EVENT_CREATE_REQUEST = "EVENT_CREATE_REQUEST";
export const EVENT_CREATE_SUCCESS = "EVENT_CREATE_SUCCESS";
export const EVENT_CREATE_FAILURE = "EVENT_CREATE_FAILURE";

export const EVENT_UPDATE_REQUEST = "EVENT_UPDATE_REQUEST";
export const EVENT_UPDATE_SUCCESS = "EVENT_UPDATE_SUCCESS";
export const EVENT_UPDATE_FAILURE = "EVENT_UPDATE_FAILURE";

export const EVENT_DELETE_REQUEST = "EVENT_DELETE_REQUEST";
export const EVENT_DELETE_SUCCESS = "EVENT_DELETE_SUCCESS";
export const EVENT_DELETE_FAILURE = "EVENT_DELETE_FAILURE";

export const MODAL_OPEN_REQUEST = "MODAL_OPEN_REQUEST";
export const MODAL_CLOSE_REQUEST = "MODAL_CLOSE_REQUEST";

export const UPDATE_EVENT_PATH = "UPDATE_EVENT_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case EVENT_LIST_REQUEST: {
        draft.st_eventListLoading = true;
        draft.st_eventListDone = null;
        draft.st_eventListError = false;
        break;
      }
      case EVENT_LIST_SUCCESS: {
        draft.st_eventListLoading = false;
        draft.st_eventListDone = true;
        draft.events = action.data.lists;
        // draft.events = action.data.events;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case EVENT_LIST_FAILURE: {
        draft.st_eventListLoading = false;
        draft.st_eventListDone = false;
        draft.st_eventListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case EVENT_UPLOAD_REQUEST: {
        draft.st_eventUploadLoading = true;
        draft.st_eventUploadDone = null;
        draft.st_eventUploadError = false;
        break;
      }
      case EVENT_UPLOAD_SUCCESS: {
        draft.st_eventUploadLoading = false;
        draft.st_eventUploadDone = true;
        draft.uploadeventPath = action.data.path;
        break;
      }
      case EVENT_UPLOAD_FAILURE: {
        draft.st_eventUploadLoading = false;
        draft.st_eventUploadDone = false;
        draft.st_eventUploadError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case EVENT_CREATE_REQUEST: {
        draft.st_eventCreateLoading = true;
        draft.st_eventCreateDone = null;
        draft.st_eventCreateError = false;
        break;
      }
      case EVENT_CREATE_SUCCESS: {
        draft.st_eventCreateLoading = false;
        draft.st_eventCreateDone = true;
        draft.uploadGalleryPath = null;
        break;
      }
      case EVENT_CREATE_FAILURE: {
        draft.st_eventCreateLoading = false;
        draft.st_eventCreateDone = false;
        draft.st_eventCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case EVENT_UPDATE_REQUEST: {
        draft.st_eventUpdateLoading = true;
        draft.st_eventUpdateDone = null;
        draft.st_eventUpdateError = false;
        break;
      }
      case EVENT_UPDATE_SUCCESS: {
        draft.st_eventUpdateLoading = false;
        draft.st_eventUpdateDone = true;
        break;
      }
      case EVENT_UPDATE_FAILURE: {
        draft.st_eventUpdateLoading = false;
        draft.st_eventUpdateDone = false;
        draft.st_eventUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case EVENT_DELETE_REQUEST: {
        draft.st_eventDeleteLoading = true;
        draft.st_eventDeleteDone = null;
        draft.st_eventDeleteError = false;
        break;
      }
      case EVENT_DELETE_SUCCESS: {
        draft.st_eventDeleteLoading = false;
        draft.st_eventDeleteDone = true;
        break;
      }
      case EVENT_DELETE_FAILURE: {
        draft.st_eventDeleteLoading = false;
        draft.st_eventDeleteDone = false;
        draft.st_eventDeleteError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case EVENT_NEXT_REQUEST: {
        draft.st_eventNextLoading = true;
        draft.st_eventNextDone = null;
        draft.st_eventNextError = false;
        break;
      }
      case EVENT_NEXT_SUCCESS: {
        draft.st_eventNextLoading = false;
        draft.st_eventNextDone = true;
        draft.nextData = action.data;
        break;
      }
      case EVENT_NEXT_FAILURE: {
        draft.st_eventNextLoading = false;
        draft.st_eventNextDone = false;
        draft.st_eventNextError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case EVENT_BEFORE_REQUEST: {
        draft.st_eventBeforeLoading = true;
        draft.st_eventBeforeDone = null;
        draft.st_eventBeforeError = false;
        break;
      }
      case EVENT_BEFORE_SUCCESS: {
        draft.st_eventBeforeLoading = false;
        draft.st_eventBeforeDone = true;
        draft.beforeData = action.data;
        break;
      }
      case EVENT_BEFORE_FAILURE: {
        draft.st_eventBeforeLoading = false;
        draft.st_eventBeforeDone = false;
        draft.st_eventBeforeError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case EVENT_DETAIL_REQUEST: {
        draft.st_eventDetailLoading = true;
        draft.st_eventDetailDone = null;
        draft.st_eventDetailError = false;
        break;
      }
      case EVENT_DETAIL_SUCCESS: {
        draft.st_eventDetailLoading = false;
        draft.st_eventDetailDone = true;
        draft.eventDetail = action.data;
        draft.beforeData = null;
        draft.nextData = null;
        break;
      }
      case EVENT_DETAIL_FAILURE: {
        draft.st_eventDetailLoading = false;
        draft.st_eventDetailDone = false;
        draft.st_eventDetailError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case MODAL_OPEN_REQUEST:
        draft.modal = true;
        break;

      case MODAL_CLOSE_REQUEST:
        draft.modal = false;
        break;

      case UPDATE_EVENT_PATH:
        draft.uploadeventPath = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
