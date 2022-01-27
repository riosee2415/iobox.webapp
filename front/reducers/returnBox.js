import produce from "../util/produce";

export const initailState = {
  returnBoxs: null,
  uploadReturnBoxPath: "",
  maxPage: 1,
  modal: false,
  createModal: false,
  updateModal: false,
  //
  st_returnBoxListLoading: false, // 반환 박스 가져오기
  st_returnBoxListDone: false,
  st_returnBoxListError: null,
  //
  st_returnBoxCreateLoading: false, // 반환 박스 만들기
  st_returnBoxCreateDone: false,
  st_returnBoxCreateError: null,
  //
  st_returnBoxUpdateLoading: false, // 반환 박스 업데이트
  st_returnBoxUpdateDone: false,
  st_returnBoxUpdateError: null,
  //
  st_returnBoxDeleteLoading: false, // 반환 박스 삭제
  st_returnBoxDeleteDone: false,
  st_returnBoxDeleteError: null,
  //
};

export const RETURNBOX_LIST_REQUEST = "RETURNBOX_LIST_REQUEST";
export const RETURNBOX_LIST_SUCCESS = "RETURNBOX_LIST_SUCCESS";
export const RETURNBOX_LIST_FAILURE = "RETURNBOX_LIST_FAILURE";

export const RETURNBOX_UPLOAD_REQUEST = "RETURNBOX_UPLOAD_REQUEST";
export const RETURNBOX_UPLOAD_SUCCESS = "RETURNBOX_UPLOAD_SUCCESS";
export const RETURNBOX_UPLOAD_FAILURE = "RETURNBOX_UPLOAD_FAILURE";

export const RETURNBOX_CREATE_REQUEST = "RETURNBOX_CREATE_REQUEST";
export const RETURNBOX_CREATE_SUCCESS = "RETURNBOX_CREATE_SUCCESS";
export const RETURNBOX_CREATE_FAILURE = "RETURNBOX_CREATE_FAILURE";

export const RETURNBOX_UPDATE_REQUEST = "RETURNBOX_UPDATE_REQUEST";
export const RETURNBOX_UPDATE_SUCCESS = "RETURNBOX_UPDATE_SUCCESS";
export const RETURNBOX_UPDATE_FAILURE = "RETURNBOX_UPDATE_FAILURE";

export const RETURNBOX_DELETE_REQUEST = "RETURNBOX_DELETE_REQUEST";
export const RETURNBOX_DELETE_SUCCESS = "RETURNBOX_DELETE_SUCCESS";
export const RETURNBOX_DELETE_FAILURE = "RETURNBOX_DELETE_FAILURE";

export const CREATE_MODAL_TOGGLE_REQUEST = "CREATE_MODAL_TOGGLE_REQUEST";
export const UPDATE_MODAL_TOGGLE_REQUEST = "UPDATE_MODAL_TOGGLE_REQUEST";
export const MODAL_TOGGLE_REQUEST = "MODAL_TOGGLE_REQUEST";

export const UPDATE_RETURNBOX_PATH = "UPDATE_RETURNBOX_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RETURNBOX_LIST_REQUEST: {
        draft.st_returnBoxListLoading = true;
        draft.st_returnBoxListDone = null;
        draft.st_returnBoxListError = false;
        break;
      }
      case RETURNBOX_LIST_SUCCESS: {
        draft.st_returnBoxListLoading = false;
        draft.st_returnBoxListDone = true;
        draft.returnBoxs = action.data;
        // draft.returnBoxs = action.data.returnBoxs;
        // draft.maxPage = action.data.lastPage;
        break;
      }
      case RETURNBOX_LIST_FAILURE: {
        draft.st_returnBoxListLoading = false;
        draft.st_returnBoxListDone = false;
        draft.st_returnBoxListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case RETURNBOX_UPLOAD_REQUEST: {
        draft.st_returnBoxUploadLoading = true;
        draft.st_returnBoxUploadDone = null;
        draft.st_returnBoxUploadError = false;
        break;
      }
      case RETURNBOX_UPLOAD_SUCCESS: {
        draft.st_returnBoxUploadLoading = false;
        draft.st_returnBoxUploadDone = true;
        draft.uploadReturnBoxPath = action.data.path;
        break;
      }
      case RETURNBOX_UPLOAD_FAILURE: {
        draft.st_returnBoxUploadLoading = false;
        draft.st_returnBoxUploadDone = false;
        draft.st_returnBoxUploadError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case RETURNBOX_CREATE_REQUEST: {
        draft.st_returnBoxCreateLoading = true;
        draft.st_returnBoxCreateDone = null;
        draft.st_returnBoxCreateError = false;
        break;
      }
      case RETURNBOX_CREATE_SUCCESS: {
        draft.st_returnBoxCreateLoading = false;
        draft.st_returnBoxCreateDone = true;
        draft.uploadGalleryPath = null;
        break;
      }
      case RETURNBOX_CREATE_FAILURE: {
        draft.st_returnBoxCreateLoading = false;
        draft.st_returnBoxCreateDone = false;
        draft.st_returnBoxCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case RETURNBOX_UPDATE_REQUEST: {
        draft.st_returnBoxUpdateLoading = true;
        draft.st_returnBoxUpdateDone = null;
        draft.st_returnBoxUpdateError = false;
        break;
      }
      case RETURNBOX_UPDATE_SUCCESS: {
        draft.st_returnBoxUpdateLoading = false;
        draft.st_returnBoxUpdateDone = true;
        break;
      }
      case RETURNBOX_UPDATE_FAILURE: {
        draft.st_returnBoxUpdateLoading = false;
        draft.st_returnBoxUpdateDone = false;
        draft.st_returnBoxUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case RETURNBOX_DELETE_REQUEST: {
        draft.st_returnBoxDeleteLoading = true;
        draft.st_returnBoxDeleteDone = null;
        draft.st_returnBoxDeleteError = false;
        break;
      }
      case RETURNBOX_DELETE_SUCCESS: {
        draft.st_returnBoxDeleteLoading = false;
        draft.st_returnBoxDeleteDone = true;
        break;
      }
      case RETURNBOX_DELETE_FAILURE: {
        draft.st_returnBoxDeleteLoading = false;
        draft.st_returnBoxDeleteDone = false;
        draft.st_returnBoxDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case MODAL_TOGGLE_REQUEST:
        draft.modal = !draft.modal;
        break;

      case CREATE_MODAL_TOGGLE_REQUEST:
        draft.createModal = !draft.createModal;
        break;

      case UPDATE_MODAL_TOGGLE_REQUEST:
        draft.updateModal = !draft.updateModal;
        break;

      case UPDATE_RETURNBOX_PATH:
        draft.uploadReturnBoxPath = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
