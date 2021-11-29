import produce from "../util/produce";

export const initailState = {
  menuImages: null,
  uploadMenuImagePath: "",
  maxPage: 1,
  modal: false,
  //
  st_menuImageListLoading: false, // 후기 가져오기
  st_menuImageListDone: false,
  st_menuImageListError: null,
  //
  st_menuImageCreateLoading: false, // 후기 만들기
  st_menuImageCreateDone: false,
  st_menuImageCreateError: null,
  //
  st_menuImageUpdateLoading: false, // 후기 업데이트
  st_menuImageUpdateDone: false,
  st_menuImageUpdateError: null,
  //
  st_menuImageDeleteLoading: false, // 후기 삭제
  st_menuImageDeleteDone: false,
  st_menuImageDeleteError: null,
  //
};

export const MENU_LIST_REQUEST = "MENU_LIST_REQUEST";
export const MENU_LIST_SUCCESS = "MENU_LIST_SUCCESS";
export const MENU_LIST_FAILURE = "MENU_LIST_FAILURE";

export const MENU_UPLOAD_REQUEST = "MENU_UPLOAD_REQUEST";
export const MENU_UPLOAD_SUCCESS = "MENU_UPLOAD_SUCCESS";
export const MENU_UPLOAD_FAILURE = "MENU_UPLOAD_FAILURE";

export const MENU_CREATE_REQUEST = "MENU_CREATE_REQUEST";
export const MENU_CREATE_SUCCESS = "MENU_CREATE_SUCCESS";
export const MENU_CREATE_FAILURE = "MENU_CREATE_FAILURE";

export const MENU_UPDATE_REQUEST = "MENU_UPDATE_REQUEST";
export const MENU_UPDATE_SUCCESS = "MENU_UPDATE_SUCCESS";
export const MENU_UPDATE_FAILURE = "MENU_UPDATE_FAILURE";

export const MENU_DELETE_REQUEST = "MENU_DELETE_REQUEST";
export const MENU_DELETE_SUCCESS = "MENU_DELETE_SUCCESS";
export const MENU_DELETE_FAILURE = "MENU_DELETE_FAILURE";

export const MODAL_OPEN_REQUEST = "MODAL_OPEN_REQUEST";
export const MODAL_CLOSE_REQUEST = "MODAL_CLOSE_REQUEST";

export const UPDATE_MENU_PATH = "UPDATE_MENU_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MENU_LIST_REQUEST: {
        draft.st_menuImageListLoading = true;
        draft.st_menuImageListDone = null;
        draft.st_menuImageListError = false;
        break;
      }
      case MENU_LIST_SUCCESS: {
        draft.st_menuImageListLoading = false;
        draft.st_menuImageListDone = true;
        draft.menuImages = action.data.totalImage;
        // draft.menuImages = action.data.menuImages;
        // draft.maxPage = action.data.lastPage;
        break;
      }
      case MENU_LIST_FAILURE: {
        draft.st_menuImageListLoading = false;
        draft.st_menuImageListDone = false;
        draft.st_menuImageListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case MENU_UPLOAD_REQUEST: {
        draft.st_menuImageUploadLoading = true;
        draft.st_menuImageUploadDone = null;
        draft.st_menuImageUploadError = false;
        break;
      }
      case MENU_UPLOAD_SUCCESS: {
        draft.st_menuImageUploadLoading = false;
        draft.st_menuImageUploadDone = true;
        draft.uploadMenuImagePath = action.data.path;
        break;
      }
      case MENU_UPLOAD_FAILURE: {
        draft.st_menuImageUploadLoading = false;
        draft.st_menuImageUploadDone = false;
        draft.st_menuImageUploadError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case MENU_CREATE_REQUEST: {
        draft.st_menuImageCreateLoading = true;
        draft.st_menuImageCreateDone = null;
        draft.st_menuImageCreateError = false;
        break;
      }
      case MENU_CREATE_SUCCESS: {
        draft.st_menuImageCreateLoading = false;
        draft.st_menuImageCreateDone = true;
        draft.uploadGalleryPath = null;
        break;
      }
      case MENU_CREATE_FAILURE: {
        draft.st_menuImageCreateLoading = false;
        draft.st_menuImageCreateDone = false;
        draft.st_menuImageCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MENU_UPDATE_REQUEST: {
        draft.st_menuImageUpdateLoading = true;
        draft.st_menuImageUpdateDone = null;
        draft.st_menuImageUpdateError = false;
        break;
      }
      case MENU_UPDATE_SUCCESS: {
        draft.st_menuImageUpdateLoading = false;
        draft.st_menuImageUpdateDone = true;
        break;
      }
      case MENU_UPDATE_FAILURE: {
        draft.st_menuImageUpdateLoading = false;
        draft.st_menuImageUpdateDone = false;
        draft.st_menuImageUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MENU_DELETE_REQUEST: {
        draft.st_menuImageDeleteLoading = true;
        draft.st_menuImageDeleteDone = null;
        draft.st_menuImageDeleteError = false;
        break;
      }
      case MENU_DELETE_SUCCESS: {
        draft.st_menuImageDeleteLoading = false;
        draft.st_menuImageDeleteDone = true;
        break;
      }
      case MENU_DELETE_FAILURE: {
        draft.st_menuImageDeleteLoading = false;
        draft.st_menuImageDeleteDone = false;
        draft.st_menuImageDeleteError = action.error;
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

      case UPDATE_MENU_PATH:
        draft.uploadMenuImagePath = action.data;
        break;

      default:
        break;
    }
  });

export default reducer;
