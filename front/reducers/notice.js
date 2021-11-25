import produce from "../util/produce";

export const initailState = {
  notices: null,
  maxPage: 1,
  //
  nextData: null,
  beforeData: null,
  //
  createModal: false,
  detailModal: false,

  noticeDetail: null,
  //
  st_noticeListLoading: false, // 공지사항 가져오기
  st_noticeListDone: false,
  st_noticeListError: null,
  //
  st_noticeCreateLoading: false, // 공지사항 가져오기
  st_noticeCreateDone: false,
  st_noticeCreateError: null,
  //
  st_noticeUpdateLoading: false, // 공지사항 업데이트
  st_noticeUpdateDone: false,
  st_noticeUpdateError: null,
  //
  st_noticeDeleteLoading: false, // 공지사항 삭제
  st_noticeDeleteDone: false,
  st_noticeDeleteError: null,
  //
  st_noticeNextLoading: false, // 공지사항 다음글
  st_noticeNextDone: false,
  st_noticeNextError: null,
  //
  st_noticeBeforeLoading: false, // 공지사항 이전글
  st_noticeBeforeDone: false,
  st_noticeBeforeError: null,
  //
  st_noticeDetailLoading: false, // 공지사항 디테일
  st_noticeDetailDone: false,
  st_noticeDetailError: null,
};

export const NOTICE_LIST_REQUEST = "NOTICE_LIST_REQUEST";
export const NOTICE_LIST_SUCCESS = "NOTICE_LIST_SUCCESS";
export const NOTICE_LIST_FAILURE = "NOTICE_LIST_FAILURE";
//
export const NOTICE_DETAIL_REQUEST = "NOTICE_DETAIL_REQUEST";
export const NOTICE_DETAIL_SUCCESS = "NOTICE_DETAIL_SUCCESS";
export const NOTICE_DETAIL_FAILURE = "NOTICE_DETAIL_FAILURE";
//
export const NOTICE_NEXT_REQUEST = "NOTICE_NEXT_REQUEST";
export const NOTICE_NEXT_SUCCESS = "NOTICE_NEXT_SUCCESS";
export const NOTICE_NEXT_FAILURE = "NOTICE_NEXT_FAILURE";
//
export const NOTICE_BEFORE_REQUEST = "NOTICE_BEFORE_REQUEST";
export const NOTICE_BEFORE_SUCCESS = "NOTICE_BEFORE_SUCCESS";
export const NOTICE_BEFORE_FAILURE = "NOTICE_BEFORE_FAILURE";
//
export const NOTICE_CREATE_REQUEST = "NOTICE_CREATE_REQUEST";
export const NOTICE_CREATE_SUCCESS = "NOTICE_CREATE_SUCCESS";
export const NOTICE_CREATE_FAILURE = "NOTICE_CREATE_FAILURE";
//
export const NOTICE_UPDATE_REQUEST = "NOTICE_UPDATE_REQUEST";
export const NOTICE_UPDATE_SUCCESS = "NOTICE_UPDATE_SUCCESS";
export const NOTICE_UPDATE_FAILURE = "NOTICE_UPDATE_FAILURE";
//
export const NOTICE_DELETE_REQUEST = "NOTICE_DELETE_REQUEST";
export const NOTICE_DELETE_SUCCESS = "NOTICE_DELETE_SUCCESS";
export const NOTICE_DELETE_FAILURE = "NOTICE_DELETE_FAILURE";
//
export const CREATE_MODAL_OPEN_REQUEST = "CREATE_MODAL_OPEN_REQUEST";
export const CREATE_MODAL_CLOSE_REQUEST = "CREATE_MODAL_CLOSE_REQUEST";

export const DETAIL_MODAL_OPEN_REQUEST = "DETAIL_MODAL_OPEN_REQUEST";
export const DETAIL_MODAL_CLOSE_REQUEST = "DETAIL_MODAL_CLOSE_REQUEST";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case NOTICE_LIST_REQUEST: {
        draft.st_noticeListLoading = true;
        draft.st_noticeListDone = null;
        draft.st_noticeListError = false;
        break;
      }
      case NOTICE_LIST_SUCCESS: {
        draft.st_noticeListLoading = false;
        draft.st_noticeListDone = true;
        draft.notices = action.data.notices;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case NOTICE_LIST_FAILURE: {
        draft.st_noticeListLoading = false;
        draft.st_noticeListDone = false;
        draft.st_noticeListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_CREATE_REQUEST: {
        draft.st_noticeCreateLoading = true;
        draft.st_noticeCreateDone = null;
        draft.st_noticeCreateError = false;
        break;
      }
      case NOTICE_CREATE_SUCCESS: {
        draft.st_noticeCreateLoading = false;
        draft.st_noticeCreateDone = true;
        break;
      }
      case NOTICE_CREATE_FAILURE: {
        draft.st_noticeCreateLoading = false;
        draft.st_noticeCreateDone = false;
        draft.st_noticeCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_UPDATE_REQUEST: {
        draft.st_noticeUpdateLoading = true;
        draft.st_noticeUpdateDone = null;
        draft.st_noticeUpdateError = false;
        break;
      }
      case NOTICE_UPDATE_SUCCESS: {
        draft.st_noticeUpdateLoading = false;
        draft.st_noticeUpdateDone = true;
        break;
      }
      case NOTICE_UPDATE_FAILURE: {
        draft.st_noticeUpdateLoading = false;
        draft.st_noticeUpdateDone = false;
        draft.st_noticeUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_DELETE_REQUEST: {
        draft.st_noticeDeleteLoading = true;
        draft.st_noticeDeleteDone = null;
        draft.st_noticeDeleteError = false;
        break;
      }
      case NOTICE_DELETE_SUCCESS: {
        draft.st_noticeDeleteLoading = false;
        draft.st_noticeDeleteDone = true;
        break;
      }
      case NOTICE_DELETE_FAILURE: {
        draft.st_noticeDeleteLoading = false;
        draft.st_noticeDeleteDone = false;
        draft.st_noticeDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_NEXT_REQUEST: {
        draft.st_noticeNextLoading = true;
        draft.st_noticeNextDone = null;
        draft.st_noticeNextError = false;
        break;
      }
      case NOTICE_NEXT_SUCCESS: {
        draft.st_noticeNextLoading = false;
        draft.st_noticeNextDone = true;
        draft.nextData = action.data;
        break;
      }
      case NOTICE_NEXT_FAILURE: {
        draft.st_noticeNextLoading = false;
        draft.st_noticeNextDone = false;
        draft.st_noticeNextError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_BEFORE_REQUEST: {
        draft.st_noticeBeforeLoading = true;
        draft.st_noticeBeforeDone = null;
        draft.st_noticeBeforeError = false;
        break;
      }
      case NOTICE_BEFORE_SUCCESS: {
        draft.st_noticeBeforeLoading = false;
        draft.st_noticeBeforeDone = true;
        draft.beforeData = action.data;
        break;
      }
      case NOTICE_BEFORE_FAILURE: {
        draft.st_noticeBeforeLoading = false;
        draft.st_noticeBeforeDone = false;
        draft.st_noticeBeforeError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_DETAIL_REQUEST: {
        draft.st_noticeDetailLoading = true;
        draft.st_noticeDetailDone = null;
        draft.st_noticeDetailError = false;
        break;
      }
      case NOTICE_DETAIL_SUCCESS: {
        draft.st_noticeDetailLoading = false;
        draft.st_noticeDetailDone = true;
        draft.noticeDetail = action.data;
        draft.beforeData = null;
        draft.nextData = null;
        break;
      }
      case NOTICE_DETAIL_FAILURE: {
        draft.st_noticeDetailLoading = false;
        draft.st_noticeDetailDone = false;
        draft.st_noticeDetailError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case CREATE_MODAL_OPEN_REQUEST:
        draft.createModal = true;
        break;

      case CREATE_MODAL_CLOSE_REQUEST:
        draft.createModal = false;
        break;
      ///////////////////////////////////////////////////////

      case DETAIL_MODAL_OPEN_REQUEST:
        draft.detailModal = true;
        break;

      case DETAIL_MODAL_CLOSE_REQUEST:
        draft.detailModal = false;
        break;
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
