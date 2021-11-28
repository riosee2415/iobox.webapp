import produce from "../util/produce";

export const initailState = {
  infos: null,
  infoTypes: null,
  uploadInfoPath: "",
  maxPage: 1,
  modal: false,

  nextData: null,
  beforeData: null,
  infoDetail: null,

  //
  st_infoListLoading: false, // 가이드 가져오기
  st_infoListDone: false,
  st_infoListError: null,
  //
  st_infoCreateLoading: false, // 가이드 만들기
  st_infoCreateDone: false,
  st_infoCreateError: null,
  //
  st_infoUpdateLoading: false, // 가이드 업데이트
  st_infoUpdateDone: false,
  st_infoUpdateError: null,
  //
  st_infoDeleteLoading: false, // 가이드 삭제
  st_infoDeleteDone: false,
  st_infoDeleteError: null,
  //
  st_infoTypeListLoading: false, // 가이드 유형 가져오기
  st_infoTypeListDone: false,
  st_infoTypeListError: null,
  //
  st_infoTypeCreateLoading: false, // 가이드 유형 만들기
  st_infoTypeCreateDone: false,
  st_infoTypeCreateError: null,
  //
  st_infoTypeUpdateLoading: false, // 가이드 유형 업데이트
  st_infoTypeUpdateDone: false,
  st_infoTypeUpdateError: null,
  //
  st_infoTypeDeleteLoading: false, // 가이드 유형 삭제
  st_infoTypeDeleteDone: false,
  st_infoTypeDeleteError: null,
  //
  st_informationNextLoading: false, // 공지사항 다음글
  st_informationNextDone: false,
  st_informationNextError: null,
  //
  st_informationBeforeLoading: false, // 공지사항 이전글
  st_informationBeforeDone: false,
  st_informationBeforeError: null,
  //
  st_informationDetailLoading: false, // 공지사항 디테일
  st_informationDetailDone: false,
  st_informationDetailError: null,
};

export const INFO_LIST_REQUEST = "INFO_LIST_REQUEST";
export const INFO_LIST_SUCCESS = "INFO_LIST_SUCCESS";
export const INFO_LIST_FAILURE = "INFO_LIST_FAILURE";
//
export const INFORMATION_DETAIL_REQUEST = "INFORMATION_DETAIL_REQUEST";
export const INFORMATION_DETAIL_SUCCESS = "INFORMATION_DETAIL_SUCCESS";
export const INFORMATION_DETAIL_FAILURE = "INFORMATION_DETAIL_FAILURE";
//
export const INFORMATION_NEXT_REQUEST = "INFORMATION_NEXT_REQUEST";
export const INFORMATION_NEXT_SUCCESS = "INFORMATION_NEXT_SUCCESS";
export const INFORMATION_NEXT_FAILURE = "INFORMATION_NEXT_FAILURE";
//
export const INFORMATION_BEFORE_REQUEST = "INFORMATION_BEFORE_REQUEST";
export const INFORMATION_BEFORE_SUCCESS = "INFORMATION_BEFORE_SUCCESS";
export const INFORMATION_BEFORE_FAILURE = "INFORMATION_BEFORE_FAILURE";
//
export const INFO_UPLOAD_REQUEST = "INFO_UPLOAD_REQUEST";
export const INFO_UPLOAD_SUCCESS = "INFO_UPLOAD_SUCCESS";
export const INFO_UPLOAD_FAILURE = "INFO_UPLOAD_FAILURE";

export const INFO_CREATE_REQUEST = "INFO_CREATE_REQUEST";
export const INFO_CREATE_SUCCESS = "INFO_CREATE_SUCCESS";
export const INFO_CREATE_FAILURE = "INFO_CREATE_FAILURE";

export const INFO_UPDATE_REQUEST = "INFO_UPDATE_REQUEST";
export const INFO_UPDATE_SUCCESS = "INFO_UPDATE_SUCCESS";
export const INFO_UPDATE_FAILURE = "INFO_UPDATE_FAILURE";

export const INFO_DELETE_REQUEST = "INFO_DELETE_REQUEST";
export const INFO_DELETE_SUCCESS = "INFO_DELETE_SUCCESS";
export const INFO_DELETE_FAILURE = "INFO_DELETE_FAILURE";

export const INFO_TYPE_LIST_REQUEST = "INFO_TYPE_LIST_REQUEST";
export const INFO_TYPE_LIST_SUCCESS = "INFO_TYPE_LIST_SUCCESS";
export const INFO_TYPE_LIST_FAILURE = "INFO_TYPE_LIST_FAILURE";

export const INFO_TYPE_UPLOAD_REQUEST = "INFO_TYPE_UPLOAD_REQUEST";
export const INFO_TYPE_UPLOAD_SUCCESS = "INFO_TYPE_UPLOAD_SUCCESS";
export const INFO_TYPE_UPLOAD_FAILURE = "INFO_TYPE_UPLOAD_FAILURE";

export const INFO_TYPE_CREATE_REQUEST = "INFO_TYPE_CREATE_REQUEST";
export const INFO_TYPE_CREATE_SUCCESS = "INFO_TYPE_CREATE_SUCCESS";
export const INFO_TYPE_CREATE_FAILURE = "INFO_TYPE_CREATE_FAILURE";

export const INFO_TYPE_UPDATE_REQUEST = "INFO_TYPE_UPDATE_REQUEST";
export const INFO_TYPE_UPDATE_SUCCESS = "INFO_TYPE_UPDATE_SUCCESS";
export const INFO_TYPE_UPDATE_FAILURE = "INFO_TYPE_UPDATE_FAILURE";

export const INFO_TYPE_DELETE_REQUEST = "INFO_TYPE_DELETE_REQUEST";
export const INFO_TYPE_DELETE_SUCCESS = "INFO_TYPE_DELETE_SUCCESS";
export const INFO_TYPE_DELETE_FAILURE = "INFO_TYPE_DELETE_FAILURE";

export const MODAL_OPEN_REQUEST = "MODAL_OPEN_REQUEST";
export const MODAL_CLOSE_REQUEST = "MODAL_CLOSE_REQUEST";

export const UPDATE_INFO_PATH = "UPDATE_INFO_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case INFO_LIST_REQUEST: {
        draft.st_infoListLoading = true;
        draft.st_infoListDone = null;
        draft.st_infoListError = false;
        break;
      }
      case INFO_LIST_SUCCESS: {
        draft.st_infoListLoading = false;
        draft.st_infoListDone = true;
        draft.infos = action.data.lists;
        // draft.infos = action.data.infos;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case INFO_LIST_FAILURE: {
        draft.st_infoListLoading = false;
        draft.st_infoListDone = false;
        draft.st_infoListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case INFO_UPLOAD_REQUEST: {
        draft.st_infoUploadLoading = true;
        draft.st_infoUploadDone = null;
        draft.st_infoUploadError = false;
        break;
      }
      case INFO_UPLOAD_SUCCESS: {
        draft.st_infoUploadLoading = false;
        draft.st_infoUploadDone = true;
        draft.uploadInfoPath = action.data.path;
        break;
      }
      case INFO_UPLOAD_FAILURE: {
        draft.st_infoUploadLoading = false;
        draft.st_infoUploadDone = false;
        draft.st_infoUploadError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case INFO_CREATE_REQUEST: {
        draft.st_infoCreateLoading = true;
        draft.st_infoCreateDone = null;
        draft.st_infoCreateError = false;
        break;
      }
      case INFO_CREATE_SUCCESS: {
        draft.st_infoCreateLoading = false;
        draft.st_infoCreateDone = true;
        draft.uploadGalleryPath = null;
        break;
      }
      case INFO_CREATE_FAILURE: {
        draft.st_infoCreateLoading = false;
        draft.st_infoCreateDone = false;
        draft.st_infoCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INFO_UPDATE_REQUEST: {
        draft.st_infoUpdateLoading = true;
        draft.st_infoUpdateDone = null;
        draft.st_infoUpdateError = false;
        break;
      }
      case INFO_UPDATE_SUCCESS: {
        draft.st_infoUpdateLoading = false;
        draft.st_infoUpdateDone = true;
        break;
      }
      case INFO_UPDATE_FAILURE: {
        draft.st_infoUpdateLoading = false;
        draft.st_infoUpdateDone = false;
        draft.st_infoUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INFO_DELETE_REQUEST: {
        draft.st_infoDeleteLoading = true;
        draft.st_infoDeleteDone = null;
        draft.st_infoDeleteError = false;
        break;
      }
      case INFO_DELETE_SUCCESS: {
        draft.st_infoDeleteLoading = false;
        draft.st_infoDeleteDone = true;
        break;
      }
      case INFO_DELETE_FAILURE: {
        draft.st_infoDeleteLoading = false;
        draft.st_infoDeleteDone = false;
        draft.st_infoDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INFO_TYPE_LIST_REQUEST: {
        draft.st_infoTypeListLoading = true;
        draft.st_infoTypeListDone = null;
        draft.st_infoTypeListError = false;
        break;
      }
      case INFO_TYPE_LIST_SUCCESS: {
        draft.st_infoTypeListLoading = false;
        draft.st_infoTypeListDone = true;
        draft.infoTypes = action.data;
        // draft.infoTypes = action.data.infoTypes;
        // draft.maxPage = action.data.lastPage;
        break;
      }
      case INFO_TYPE_LIST_FAILURE: {
        draft.st_infoTypeListLoading = false;
        draft.st_infoTypeListDone = false;
        draft.st_infoTypeListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case INFO_TYPE_UPLOAD_REQUEST: {
        draft.st_infoTypeUploadLoading = true;
        draft.st_infoTypeUploadDone = null;
        draft.st_infoTypeUploadError = false;
        break;
      }
      case INFO_TYPE_UPLOAD_SUCCESS: {
        draft.st_infoTypeUploadLoading = false;
        draft.st_infoTypeUploadDone = true;
        draft.uploadInfoTypePath = action.data.path;
        break;
      }
      case INFO_TYPE_UPLOAD_FAILURE: {
        draft.st_infoTypeUploadLoading = false;
        draft.st_infoTypeUploadDone = false;
        draft.st_infoTypeUploadError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case INFO_TYPE_CREATE_REQUEST: {
        draft.st_infoTypeCreateLoading = true;
        draft.st_infoTypeCreateDone = null;
        draft.st_infoTypeCreateError = false;
        break;
      }
      case INFO_TYPE_CREATE_SUCCESS: {
        draft.st_infoTypeCreateLoading = false;
        draft.st_infoTypeCreateDone = true;
        draft.uploadGalleryPath = null;
        break;
      }
      case INFO_TYPE_CREATE_FAILURE: {
        draft.st_infoTypeCreateLoading = false;
        draft.st_infoTypeCreateDone = false;
        draft.st_infoTypeCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INFO_TYPE_UPDATE_REQUEST: {
        draft.st_infoTypeUpdateLoading = true;
        draft.st_infoTypeUpdateDone = null;
        draft.st_infoTypeUpdateError = false;
        break;
      }
      case INFO_TYPE_UPDATE_SUCCESS: {
        draft.st_infoTypeUpdateLoading = false;
        draft.st_infoTypeUpdateDone = true;
        break;
      }
      case INFO_TYPE_UPDATE_FAILURE: {
        draft.st_infoTypeUpdateLoading = false;
        draft.st_infoTypeUpdateDone = false;
        draft.st_infoTypeUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INFO_TYPE_DELETE_REQUEST: {
        draft.st_infoTypeDeleteLoading = true;
        draft.st_infoTypeDeleteDone = null;
        draft.st_infoTypeDeleteError = false;
        break;
      }
      case INFO_TYPE_DELETE_SUCCESS: {
        draft.st_infoTypeDeleteLoading = false;
        draft.st_infoTypeDeleteDone = true;
        break;
      }
      case INFO_TYPE_DELETE_FAILURE: {
        draft.st_infoTypeDeleteLoading = false;
        draft.st_infoTypeDeleteDone = false;
        draft.st_infoTypeDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INFORMATION_NEXT_REQUEST: {
        draft.st_informationNextLoading = true;
        draft.st_informationNextDone = null;
        draft.st_informationNextError = false;
        break;
      }
      case INFORMATION_NEXT_SUCCESS: {
        draft.st_informationNextLoading = false;
        draft.st_informationNextDone = true;
        draft.nextData = action.data;
        break;
      }
      case INFORMATION_NEXT_FAILURE: {
        draft.st_informationNextLoading = false;
        draft.st_informationNextDone = false;
        draft.st_informationNextError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INFORMATION_BEFORE_REQUEST: {
        draft.st_informationBeforeLoading = true;
        draft.st_informationBeforeDone = null;
        draft.st_informationBeforeError = false;
        break;
      }
      case INFORMATION_BEFORE_SUCCESS: {
        draft.st_informationBeforeLoading = false;
        draft.st_informationBeforeDone = true;
        draft.beforeData = action.data;
        break;
      }
      case INFORMATION_BEFORE_FAILURE: {
        draft.st_informationBeforeLoading = false;
        draft.st_informationBeforeDone = false;
        draft.st_informationBeforeError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INFORMATION_DETAIL_REQUEST: {
        draft.st_informationDetailLoading = true;
        draft.st_informationDetailDone = null;
        draft.st_informationDetailError = false;
        break;
      }
      case INFORMATION_DETAIL_SUCCESS: {
        draft.st_informationDetailLoading = false;
        draft.st_informationDetailDone = true;
        draft.infoDetail = action.data;
        draft.beforeData = null;
        draft.nextData = null;
        break;
      }
      case INFORMATION_DETAIL_FAILURE: {
        draft.st_informationDetailLoading = false;
        draft.st_informationDetailDone = false;
        draft.st_informationDetailError = action.error;
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

      case UPDATE_INFO_PATH:
        draft.uploadInfoPath = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
