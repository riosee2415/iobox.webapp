import produce from "../util/produce";

export const initailState = {
  faqs: null,
  uploadFaqPath: "",
  maxPage: 1,
  modal: false,
  //
  st_faqListLoading: false, // 자주 묻는 질문 가져오기
  st_faqListDone: false,
  st_faqListError: null,
  //
  st_faqCreateLoading: false, // 자주 묻는 질문 만들기
  st_faqCreateDone: false,
  st_faqCreateError: null,
  //
  st_faqUpdateLoading: false, // 자주 묻는 질문 업데이트
  st_faqUpdateDone: false,
  st_faqUpdateError: null,
  //
  st_faqDeleteLoading: false, // 자주 묻는 질문 삭제
  st_faqDeleteDone: false,
  st_faqDeleteError: null,
  //
};

export const FAQ_LIST_REQUEST = "FAQ_LIST_REQUEST";
export const FAQ_LIST_SUCCESS = "FAQ_LIST_SUCCESS";
export const FAQ_LIST_FAILURE = "FAQ_LIST_FAILURE";

export const FAQ_UPLOAD_REQUEST = "FAQ_UPLOAD_REQUEST";
export const FAQ_UPLOAD_SUCCESS = "FAQ_UPLOAD_SUCCESS";
export const FAQ_UPLOAD_FAILURE = "FAQ_UPLOAD_FAILURE";

export const FAQ_CREATE_REQUEST = "FAQ_CREATE_REQUEST";
export const FAQ_CREATE_SUCCESS = "FAQ_CREATE_SUCCESS";
export const FAQ_CREATE_FAILURE = "FAQ_CREATE_FAILURE";

export const FAQ_UPDATE_REQUEST = "FAQ_UPDATE_REQUEST";
export const FAQ_UPDATE_SUCCESS = "FAQ_UPDATE_SUCCESS";
export const FAQ_UPDATE_FAILURE = "FAQ_UPDATE_FAILURE";

export const FAQ_DELETE_REQUEST = "FAQ_DELETE_REQUEST";
export const FAQ_DELETE_SUCCESS = "FAQ_DELETE_SUCCESS";
export const FAQ_DELETE_FAILURE = "FAQ_DELETE_FAILURE";

export const MODAL_OPEN_REQUEST = "MODAL_OPEN_REQUEST";
export const MODAL_CLOSE_REQUEST = "MODAL_CLOSE_REQUEST";

export const UPDATE_FAQ_PATH = "UPDATE_FAQ_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FAQ_LIST_REQUEST: {
        draft.st_faqListLoading = true;
        draft.st_faqListDone = null;
        draft.st_faqListError = false;
        break;
      }
      case FAQ_LIST_SUCCESS: {
        draft.st_faqListLoading = false;
        draft.st_faqListDone = true;
        draft.faqs = action.data;
        // draft.faqs = action.data.faqs;
        // draft.maxPage = action.data.lastPage;
        break;
      }
      case FAQ_LIST_FAILURE: {
        draft.st_faqListLoading = false;
        draft.st_faqListDone = false;
        draft.st_faqListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case FAQ_UPLOAD_REQUEST: {
        draft.st_faqUploadLoading = true;
        draft.st_faqUploadDone = null;
        draft.st_faqUploadError = false;
        break;
      }
      case FAQ_UPLOAD_SUCCESS: {
        draft.st_faqUploadLoading = false;
        draft.st_faqUploadDone = true;
        draft.uploadFaqPath = action.data.path;
        break;
      }
      case FAQ_UPLOAD_FAILURE: {
        draft.st_faqUploadLoading = false;
        draft.st_faqUploadDone = false;
        draft.st_faqUploadError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case FAQ_CREATE_REQUEST: {
        draft.st_faqCreateLoading = true;
        draft.st_faqCreateDone = null;
        draft.st_faqCreateError = false;
        break;
      }
      case FAQ_CREATE_SUCCESS: {
        draft.st_faqCreateLoading = false;
        draft.st_faqCreateDone = true;
        draft.uploadGalleryPath = null;
        break;
      }
      case FAQ_CREATE_FAILURE: {
        draft.st_faqCreateLoading = false;
        draft.st_faqCreateDone = false;
        draft.st_faqCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case FAQ_UPDATE_REQUEST: {
        draft.st_faqUpdateLoading = true;
        draft.st_faqUpdateDone = null;
        draft.st_faqUpdateError = false;
        break;
      }
      case FAQ_UPDATE_SUCCESS: {
        draft.st_faqUpdateLoading = false;
        draft.st_faqUpdateDone = true;
        break;
      }
      case FAQ_UPDATE_FAILURE: {
        draft.st_faqUpdateLoading = false;
        draft.st_faqUpdateDone = false;
        draft.st_faqUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case FAQ_DELETE_REQUEST: {
        draft.st_faqDeleteLoading = true;
        draft.st_faqDeleteDone = null;
        draft.st_faqDeleteError = false;
        break;
      }
      case FAQ_DELETE_SUCCESS: {
        draft.st_faqDeleteLoading = false;
        draft.st_faqDeleteDone = true;
        break;
      }
      case FAQ_DELETE_FAILURE: {
        draft.st_faqDeleteLoading = false;
        draft.st_faqDeleteDone = false;
        draft.st_faqDeleteError = action.error;
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

      case UPDATE_FAQ_PATH:
        draft.uploadFaqPath = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
