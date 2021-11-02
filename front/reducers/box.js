import produce from "../util/produce";

export const initailState = {
  boxs: null,
  uploadBoxPath: "",
  maxPage: 1,
  modal: false,
  //
  st_boxListLoading: false, // 후기 가져오기
  st_boxListDone: false,
  st_boxListError: null,
  //
  st_boxCreateLoading: false, // 후기 만들기
  st_boxCreateDone: false,
  st_boxCreateError: null,
  //
  st_boxUpdateLoading: false, // 후기 업데이트
  st_boxUpdateDone: false,
  st_boxUpdateError: null,
  //
  st_boxDeleteLoading: false, // 후기 삭제
  st_boxDeleteDone: false,
  st_boxDeleteError: null,
  //
};

export const BOX_LIST_REQUEST = "BOX_LIST_REQUEST";
export const BOX_LIST_SUCCESS = "BOX_LIST_SUCCESS";
export const BOX_LIST_FAILURE = "BOX_LIST_FAILURE";

export const BOX_UPLOAD_REQUEST = "BOX_UPLOAD_REQUEST";
export const BOX_UPLOAD_SUCCESS = "BOX_UPLOAD_SUCCESS";
export const BOX_UPLOAD_FAILURE = "BOX_UPLOAD_FAILURE";

export const BOX_CREATE_REQUEST = "BOX_CREATE_REQUEST";
export const BOX_CREATE_SUCCESS = "BOX_CREATE_SUCCESS";
export const BOX_CREATE_FAILURE = "BOX_CREATE_FAILURE";

export const BOX_UPDATE_REQUEST = "BOX_UPDATE_REQUEST";
export const BOX_UPDATE_SUCCESS = "BOX_UPDATE_SUCCESS";
export const BOX_UPDATE_FAILURE = "BOX_UPDATE_FAILURE";

export const BOX_DELETE_REQUEST = "BOX_DELETE_REQUEST";
export const BOX_DELETE_SUCCESS = "BOX_DELETE_SUCCESS";
export const BOX_DELETE_FAILURE = "BOX_DELETE_FAILURE";

export const MODAL_OPEN_REQUEST = "MODAL_OPEN_REQUEST";
export const MODAL_CLOSE_REQUEST = "MODAL_CLOSE_REQUEST";

export const UPDATE_BOX_PATH = "UPDATE_BOX_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BOX_LIST_REQUEST: {
        draft.st_boxListLoading = true;
        draft.st_boxListDone = null;
        draft.st_boxListError = false;
        break;
      }
      case BOX_LIST_SUCCESS: {
        draft.st_boxListLoading = false;
        draft.st_boxListDone = true;
        draft.boxs = action.data;
        // draft.boxs = action.data.boxs;
        // draft.maxPage = action.data.lastPage;
        break;
      }
      case BOX_LIST_FAILURE: {
        draft.st_boxListLoading = false;
        draft.st_boxListDone = false;
        draft.st_boxListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case BOX_UPLOAD_REQUEST: {
        draft.st_boxUploadLoading = true;
        draft.st_boxUploadDone = null;
        draft.st_boxUploadError = false;
        break;
      }
      case BOX_UPLOAD_SUCCESS: {
        draft.st_boxUploadLoading = false;
        draft.st_boxUploadDone = true;
        draft.uploadBoxPath = action.data.path;
        break;
      }
      case BOX_UPLOAD_FAILURE: {
        draft.st_boxUploadLoading = false;
        draft.st_boxUploadDone = false;
        draft.st_boxUploadError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case BOX_CREATE_REQUEST: {
        draft.st_boxCreateLoading = true;
        draft.st_boxCreateDone = null;
        draft.st_boxCreateError = false;
        break;
      }
      case BOX_CREATE_SUCCESS: {
        draft.st_boxCreateLoading = false;
        draft.st_boxCreateDone = true;
        draft.uploadGalleryPath = null;
        break;
      }
      case BOX_CREATE_FAILURE: {
        draft.st_boxCreateLoading = false;
        draft.st_boxCreateDone = false;
        draft.st_boxCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case BOX_UPDATE_REQUEST: {
        draft.st_boxUpdateLoading = true;
        draft.st_boxUpdateDone = null;
        draft.st_boxUpdateError = false;
        break;
      }
      case BOX_UPDATE_SUCCESS: {
        draft.st_boxUpdateLoading = false;
        draft.st_boxUpdateDone = true;
        break;
      }
      case BOX_UPDATE_FAILURE: {
        draft.st_boxUpdateLoading = false;
        draft.st_boxUpdateDone = false;
        draft.st_boxUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case BOX_DELETE_REQUEST: {
        draft.st_boxDeleteLoading = true;
        draft.st_boxDeleteDone = null;
        draft.st_boxDeleteError = false;
        break;
      }
      case BOX_DELETE_SUCCESS: {
        draft.st_boxDeleteLoading = false;
        draft.st_boxDeleteDone = true;
        break;
      }
      case BOX_DELETE_FAILURE: {
        draft.st_boxDeleteLoading = false;
        draft.st_boxDeleteDone = false;
        draft.st_boxDeleteError = action.error;
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

      case UPDATE_BOX_PATH:
        draft.uploadBoxPath = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
