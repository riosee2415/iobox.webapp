import produce from "../util/produce";

export const initailState = {
  faqs: null,
  uploadFaqPath: "",
  maxPage: 1,
  modal: false,
  //
  nextData: null,
  beforeData: null,

  faqDetail: null,
  st_faqListLoading: false, //  자주 묻는 질문 가져오기
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
  st_faqNextLoading: false, //  다음글
  st_faqNextDone: false,
  st_faqNextError: null,
  //
  st_faqBeforeLoading: false, //  이전글
  st_faqBeforeDone: false,
  st_faqBeforeError: null,
  //
  st_faqDetailLoading: false, //  디테일
  st_faqDetailDone: false,
  st_faqDetailError: null,
  ////////////////////////////////////////////////////////////////////////
  st_faqTypeLoading: false, // 자주 묻는 질문 유형 정보 가져오기
  st_faqTypeDone: false,
  st_faqTypeError: null,
  //
  st_faqTypeCreateLoading: false, // 자주 묻는 질문 유형 정보 추가하기
  st_faqTypeCreateDone: false,
  st_faqTypeCreateError: null,
  //
  st_faqTypeDeleteLoading: false, // 자주 묻는 질문 유형 정보 삭제하기
  st_faqTypeDeleteDone: false,
  st_faqTypeDeleteError: null,
  //
  st_faqTypeUpdateLoading: false, // 자주 묻는 질문 유형 정보 수정하기
  st_faqTypeUpdateDone: false,
  st_faqTypeUpdateError: null,
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
//
export const FAQ_DETAIL_REQUEST = "FAQ_DETAIL_REQUEST";
export const FAQ_DETAIL_SUCCESS = "FAQ_DETAIL_SUCCESS";
export const FAQ_DETAIL_FAILURE = "FAQ_DETAIL_FAILURE";
//
export const FAQ_NEXT_REQUEST = "FAQ_NEXT_REQUEST";
export const FAQ_NEXT_SUCCESS = "FAQ_NEXT_SUCCESS";
export const FAQ_NEXT_FAILURE = "FAQ_NEXT_FAILURE";
//
export const FAQ_BEFORE_REQUEST = "FAQ_BEFORE_REQUEST";
export const FAQ_BEFORE_SUCCESS = "FAQ_BEFORE_SUCCESS";
export const FAQ_BEFORE_FAILURE = "FAQ_BEFORE_FAILURE";
//
export const MODAL_OPEN_REQUEST = "MODAL_OPEN_REQUEST";
export const MODAL_CLOSE_REQUEST = "MODAL_CLOSE_REQUEST";

export const UPDATE_FAQ_PATH = "UPDATE_FAQ_PATH";

// ************************************************
export const FAQ_TYPE_GET_REQUEST = "FAQ_TYPE_GET_REQUEST";
export const FAQ_TYPE_GET_SUCCESS = "FAQ_TYPE_GET_SUCCESS";
export const FAQ_TYPE_GET_FAILURE = "FAQ_TYPE_GET_FAILURE";

export const FAQ_TYPE_DELETE_REQUEST = "FAQ_TYPE_DELETE_REQUEST";
export const FAQ_TYPE_DELETE_SUCCESS = "FAQ_TYPE_DELETE_SUCCESS";
export const FAQ_TYPE_DELETE_FAILURE = "FAQ_TYPE_DELETE_FAILURE";

export const FAQ_TYPE_UPDATE_REQUEST = "FAQ_TYPE_UPDATE_REQUEST";
export const FAQ_TYPE_UPDATE_SUCCESS = "FAQ_TYPE_UPDATE_SUCCESS";
export const FAQ_TYPE_UPDATE_FAILURE = "FAQ_TYPE_UPDATE_FAILURE";

export const FAQ_TYPE_CREATE_REQUEST = "FAQ_TYPE_CREATE_REQUEST";
export const FAQ_TYPE_CREATE_SUCCESS = "FAQ_TYPE_CREATE_SUCCESS";
export const FAQ_TYPE_CREATE_FAILURE = "FAQ_TYPE_CREATE_FAILURE";

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
        draft.faqs = action.data.faqs;
        draft.maxPage = action.data.lastPage;
        console.log(action.data.lastPage);
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
      case FAQ_NEXT_REQUEST: {
        draft.st_faqNextLoading = true;
        draft.st_faqNextDone = null;
        draft.st_faqNextError = false;
        break;
      }
      case FAQ_NEXT_SUCCESS: {
        draft.st_faqNextLoading = false;
        draft.st_faqNextDone = true;
        draft.nextData = action.data;
        break;
      }
      case FAQ_NEXT_FAILURE: {
        draft.st_faqNextLoading = false;
        draft.st_faqNextDone = false;
        draft.st_faqNextError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case FAQ_BEFORE_REQUEST: {
        draft.st_faqBeforeLoading = true;
        draft.st_faqBeforeDone = null;
        draft.st_faqBeforeError = false;
        break;
      }
      case FAQ_BEFORE_SUCCESS: {
        draft.st_faqBeforeLoading = false;
        draft.st_faqBeforeDone = true;
        draft.beforeData = action.data;
        break;
      }
      case FAQ_BEFORE_FAILURE: {
        draft.st_faqBeforeLoading = false;
        draft.st_faqBeforeDone = false;
        draft.st_faqBeforeError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case FAQ_DETAIL_REQUEST: {
        draft.st_faqDetailLoading = true;
        draft.st_faqDetailDone = null;
        draft.st_faqDetailError = false;
        break;
      }
      case FAQ_DETAIL_SUCCESS: {
        draft.st_faqDetailLoading = false;
        draft.st_faqDetailDone = true;
        draft.faqDetail = action.data;
        draft.beforeData = null;
        draft.nextData = null;
        break;
      }
      case FAQ_DETAIL_FAILURE: {
        draft.st_faqDetailLoading = false;
        draft.st_faqDetailDone = false;
        draft.st_faqDetailError = action.error;
        break;
      }

      // ************************************************
      case FAQ_TYPE_GET_REQUEST: {
        draft.st_faqTypeLoading = true;
        draft.st_faqTypeDone = null;
        draft.st_faqTypeError = false;
        break;
      }
      case FAQ_TYPE_GET_SUCCESS: {
        draft.st_faqTypeLoading = false;
        draft.st_faqTypeDone = true;
        draft.types = action.data;
        break;
      }
      case FAQ_TYPE_GET_FAILURE: {
        draft.st_faqTypeLoading = false;
        draft.st_faqTypeDone = false;
        draft.st_faqTypeError = action.error;
        break;
      }
      case FAQ_TYPE_DELETE_REQUEST: {
        draft.st_faqTypeDeleteLoading = true;
        draft.st_faqTypeDeleteDone = null;
        draft.st_faqTypeDeleteError = false;
        break;
      }
      case FAQ_TYPE_DELETE_SUCCESS: {
        draft.st_faqTypeDeleteLoading = false;
        draft.st_faqTypeDeleteDone = true;
        break;
      }
      case FAQ_TYPE_DELETE_FAILURE: {
        draft.st_faqTypeDeleteLoading = false;
        draft.st_faqTypeDeleteDone = false;
        draft.st_faqTypeDeleteError = action.error;
        break;
      }
      case FAQ_TYPE_UPDATE_REQUEST: {
        draft.st_faqTypeUpdateLoading = true;
        draft.st_faqTypeUpdateDone = null;
        draft.st_faqTypeUpdateError = false;
        break;
      }
      case FAQ_TYPE_UPDATE_SUCCESS: {
        draft.st_faqTypeUpdateLoading = false;
        draft.st_faqTypeUpdateDone = true;
        break;
      }
      case FAQ_TYPE_UPDATE_FAILURE: {
        draft.st_faqTypeUpdateLoading = false;
        draft.st_faqTypeUpdateDone = false;
        draft.st_faqTypeUpdateError = action.error;
        break;
      }
      case FAQ_TYPE_CREATE_REQUEST: {
        draft.st_faqTypeCreateLoading = true;
        draft.st_faqTypeCreateDone = null;
        draft.st_faqTypeCreateError = false;
        break;
      }
      case FAQ_TYPE_CREATE_SUCCESS: {
        draft.st_faqTypeCreateLoading = false;
        draft.st_faqTypeCreateDone = true;
        break;
      }
      case FAQ_TYPE_CREATE_FAILURE: {
        draft.st_faqTypeCreateLoading = false;
        draft.st_faqTypeCreateDone = false;
        draft.st_faqTypeCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

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
