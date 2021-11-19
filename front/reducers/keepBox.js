import produce from "../util/produce";

export const initailState = {
  keepBoxes: null,
  maxPage: 1,
  //
  st_keepBoxListLoading: false, // 공지사항 가져오기
  st_keepBoxListDone: false,
  st_keepBoxListError: null,
  //
  st_keepBoxCreateLoading: false, // 공지사항 가져오기
  st_keepBoxCreateDone: false,
  st_keepBoxCreateError: null,
  //
  st_keepBoxUpdateLoading: false, // 공지사항 업데이트
  st_keepBoxUpdateDone: false,
  st_keepBoxUpdateError: null,
  //
  st_keepBoxDeleteLoading: false, // 공지사항 삭제
  st_keepBoxDeleteDone: false,
  st_keepBoxDeleteError: null,
  //
};

export const KEEPBOX_LIST_REQUEST = "KEEPBOX_LIST_REQUEST";
export const KEEPBOX_LIST_SUCCESS = "KEEPBOX_LIST_SUCCESS";
export const KEEPBOX_LIST_FAILURE = "KEEPBOX_LIST_FAILURE";
//
export const KEEPBOX_CREATE_REQUEST = "KEEPBOX_CREATE_REQUEST";
export const KEEPBOX_CREATE_SUCCESS = "KEEPBOX_CREATE_SUCCESS";
export const KEEPBOX_CREATE_FAILURE = "KEEPBOX_CREATE_FAILURE";
//
export const KEEPBOX_UPDATE_REQUEST = "KEEPBOX_UPDATE_REQUEST";
export const KEEPBOX_UPDATE_SUCCESS = "KEEPBOX_UPDATE_SUCCESS";
export const KEEPBOX_UPDATE_FAILURE = "KEEPBOX_UPDATE_FAILURE";
//
export const KEEPBOX_DELETE_REQUEST = "KEEPBOX_DELETE_REQUEST";
export const KEEPBOX_DELETE_SUCCESS = "KEEPBOX_DELETE_SUCCESS";
export const KEEPBOX_DELETE_FAILURE = "KEEPBOX_DELETE_FAILURE";
//

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case KEEPBOX_LIST_REQUEST: {
        draft.st_keepBoxListLoading = true;
        draft.st_keepBoxListDone = null;
        draft.st_keepBoxListError = false;
        break;
      }
      case KEEPBOX_LIST_SUCCESS: {
        draft.st_keepBoxListLoading = false;
        draft.st_keepBoxListDone = true;
        draft.keepBoxes = action.data;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case KEEPBOX_LIST_FAILURE: {
        draft.st_keepBoxListLoading = false;
        draft.st_keepBoxListDone = false;
        draft.st_keepBoxListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case KEEPBOX_CREATE_REQUEST: {
        draft.st_keepBoxCreateLoading = true;
        draft.st_keepBoxCreateDone = null;
        draft.st_keepBoxCreateError = false;
        break;
      }
      case KEEPBOX_CREATE_SUCCESS: {
        draft.st_keepBoxCreateLoading = false;
        draft.st_keepBoxCreateDone = true;
        break;
      }
      case KEEPBOX_CREATE_FAILURE: {
        draft.st_keepBoxCreateLoading = false;
        draft.st_keepBoxCreateDone = false;
        draft.st_keepBoxCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case KEEPBOX_UPDATE_REQUEST: {
        draft.st_keepBoxUpdateLoading = true;
        draft.st_keepBoxUpdateDone = null;
        draft.st_keepBoxUpdateError = false;
        break;
      }
      case KEEPBOX_UPDATE_SUCCESS: {
        draft.st_keepBoxUpdateLoading = false;
        draft.st_keepBoxUpdateDone = true;
        break;
      }
      case KEEPBOX_UPDATE_FAILURE: {
        draft.st_keepBoxUpdateLoading = false;
        draft.st_keepBoxUpdateDone = false;
        draft.st_keepBoxUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case KEEPBOX_DELETE_REQUEST: {
        draft.st_keepBoxDeleteLoading = true;
        draft.st_keepBoxDeleteDone = null;
        draft.st_keepBoxDeleteError = false;
        break;
      }
      case KEEPBOX_DELETE_SUCCESS: {
        draft.st_keepBoxDeleteLoading = false;
        draft.st_keepBoxDeleteDone = true;
        break;
      }
      case KEEPBOX_DELETE_FAILURE: {
        draft.st_keepBoxDeleteLoading = false;
        draft.st_keepBoxDeleteDone = false;
        draft.st_keepBoxDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
