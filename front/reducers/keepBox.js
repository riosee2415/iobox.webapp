import produce from "../util/produce";

export const initailState = {
  keepBoxes: null,
  keepBoxDetails: null,
  detailBox: null,
  maxPage: 1,
  //
  createInfo: null,
  //
  modal: false,
  guideModal: false,
  //
  st_keepBoxListLoading: false, // 박스 가져오기
  st_keepBoxListDone: false,
  st_keepBoxListError: null,
  //
  st_masterKeepBoxListLoading: false, // 박스 가져오기
  st_masterKeepBoxListDone: false,
  st_masterKeepBoxListError: null,
  //
  st_masterKeepBoxUpdateLoading: false, // 박스 업데이트
  st_masterKeepBoxUpdateDone: false,
  st_masterKeepBoxUpdateError: null,
  //
  st_keepBoxListDetailLoading: false, // 박스 디테일 가져오기
  st_keepBoxListDetailDone: false,
  st_keepBoxListDetailError: null,
  //
  st_keepBoxDetailLoading: false, // 박스 가져오기
  st_keepBoxDetailDone: false,
  st_keepBoxDetailError: null,
  //
  st_keepBoxDateListLoading: false, // 박스 날짜별 가져오기
  st_keepBoxDateListDone: false,
  st_keepBoxDateListError: null,
  //
  st_keepBoxCreateLoading: false, // 박스 가져오기
  st_keepBoxCreateDone: false,
  st_keepBoxCreateError: null,
  //
  st_keepBoxUpdateLoading: false, // 박스 업데이트
  st_keepBoxUpdateDone: false,
  st_keepBoxUpdateError: null,
  //
  st_keepBoxUploadLoading: false, // 박스 업데이트
  st_keepBoxUploadDone: false,
  st_keepBoxUploadError: null,
  //
  st_keepBoxImageDeleteLoading: false, // 박스 이미지 삭제
  st_keepBoxImageDeleteDone: false,
  st_keepBoxImageDeleteError: null,
  //
  st_keepBoxDeleteLoading: false, // 박스 삭제
  st_keepBoxDeleteDone: false,
  st_keepBoxDeleteError: null,
  //
};

export const KEEPBOX_LIST_REQUEST = "KEEPBOX_LIST_REQUEST";
export const KEEPBOX_LIST_SUCCESS = "KEEPBOX_LIST_SUCCESS";
export const KEEPBOX_LIST_FAILURE = "KEEPBOX_LIST_FAILURE";
//
export const MASTER_KEEPBOX_LIST_REQUEST = "MASTER_KEEPBOX_LIST_REQUEST";
export const MASTER_KEEPBOX_LIST_SUCCESS = "MASTER_KEEPBOX_LIST_SUCCESS";
export const MASTER_KEEPBOX_LIST_FAILURE = "MASTER_KEEPBOX_LIST_FAILURE";
//
export const MASTER_KEEPBOX_UPDATE_REQUEST = "MASTER_KEEPBOX_UPDATE_REQUEST";
export const MASTER_KEEPBOX_UPDATE_SUCCESS = "MASTER_KEEPBOX_UPDATE_SUCCESS";
export const MASTER_KEEPBOX_UPDATE_FAILURE = "MASTER_KEEPBOX_UPDATE_FAILURE";
//
export const KEEPBOX_LIST_DETAIL_REQUEST = "KEEPBOX_LIST_DETAIL_REQUEST";
export const KEEPBOX_LIST_DETAIL_SUCCESS = "KEEPBOX_LIST_DETAIL_SUCCESS";
export const KEEPBOX_LIST_DETAIL_FAILURE = "KEEPBOX_LIST_DETAIL_FAILURE";
//
export const KEEPBOX_DETAIL_REQUEST = "KEEPBOX_DETAIL_REQUEST";
export const KEEPBOX_DETAIL_SUCCESS = "KEEPBOX_DETAIL_SUCCESS";
export const KEEPBOX_DETAIL_FAILURE = "KEEPBOX_DETAIL_FAILURE";
//
export const KEEPBOX_DATE_LIST_REQUEST = "KEEPBOX_DATE_LIST_REQUEST";
export const KEEPBOX_DATE_LIST_SUCCESS = "KEEPBOX_DATE_LIST_SUCCESS";
export const KEEPBOX_DATE_LIST_FAILURE = "KEEPBOX_DATE_LIST_FAILURE";
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
export const KEEPBOX_IMAGE_DELETE_REQUEST = "KEEPBOX_IMAGE_DELETE_REQUEST";
export const KEEPBOX_IMAGE_DELETE_SUCCESS = "KEEPBOX_IMAGE_DELETE_SUCCESS";
export const KEEPBOX_IMAGE_DELETE_FAILURE = "KEEPBOX_IMAGE_DELETE_FAILURE";
//
export const KEEPBOX_UPLOAD_REQUEST = "KEEPBOX_UPLOAD_REQUEST";
export const KEEPBOX_UPLOAD_SUCCESS = "KEEPBOX_UPLOAD_SUCCESS";
export const KEEPBOX_UPLOAD_FAILURE = "KEEPBOX_UPLOAD_FAILURE";
//
export const MODAL_OPEN_REQUEST = "MODAL_OPEN_REQUEST";
export const MODAL_CLOSE_REQUEST = "MODAL_CLOSE_REQUEST";
//
export const GUIDE_MODAL_OPEN_REQUEST = "GUIDE_MODAL_OPEN_REQUEST";
export const GUIDE_MODAL_CLOSE_REQUEST = "GUIDE_MODAL_CLOSE_REQUEST";

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
      case MASTER_KEEPBOX_LIST_REQUEST: {
        draft.st_masterKeepBoxListLoading = true;
        draft.st_masterKeepBoxListDone = null;
        draft.st_masterKeepBoxListError = false;
        break;
      }
      case MASTER_KEEPBOX_LIST_SUCCESS: {
        draft.st_masterKeepBoxListLoading = false;
        draft.st_masterKeepBoxListDone = true;
        draft.keepBoxes = action.data;

        break;
      }
      case MASTER_KEEPBOX_LIST_FAILURE: {
        draft.st_masterKeepBoxListLoading = false;
        draft.st_masterKeepBoxListDone = false;
        draft.st_masterKeepBoxListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MASTER_KEEPBOX_UPDATE_REQUEST: {
        draft.st_masterKeepBoxUpdateLoading = true;
        draft.st_masterKeepBoxUpdateDone = null;
        draft.st_masterKeepBoxUpdateError = false;
        break;
      }
      case MASTER_KEEPBOX_UPDATE_SUCCESS: {
        draft.st_masterKeepBoxUpdateLoading = false;
        draft.st_masterKeepBoxUpdateDone = true;

        break;
      }
      case MASTER_KEEPBOX_UPDATE_FAILURE: {
        draft.st_masterKeepBoxUpdateLoading = false;
        draft.st_masterKeepBoxUpdateDone = false;
        draft.st_masterKeepBoxUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case KEEPBOX_LIST_DETAIL_REQUEST: {
        draft.st_keepBoxListDetailLoading = true;
        draft.st_keepBoxListDetailDone = null;
        draft.st_keepBoxListDetailError = false;
        break;
      }
      case KEEPBOX_LIST_DETAIL_SUCCESS: {
        draft.st_keepBoxListDetailLoading = false;
        draft.st_keepBoxListDetailDone = true;
        draft.keepBoxDetails = action.data.boxes;

        break;
      }
      case KEEPBOX_LIST_DETAIL_FAILURE: {
        draft.st_keepBoxListDetailLoading = false;
        draft.st_keepBoxListDetailDone = false;
        draft.st_keepBoxListDetailError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case KEEPBOX_UPLOAD_REQUEST: {
        draft.st_keepBoxUploadLoading = true;
        draft.st_keepBoxUploadDone = null;
        draft.st_keepBoxUploadError = false;
        break;
      }
      case KEEPBOX_UPLOAD_SUCCESS: {
        draft.st_keepBoxUploadLoading = false;
        draft.st_keepBoxUploadDone = true;

        break;
      }
      case KEEPBOX_UPLOAD_FAILURE: {
        draft.st_keepBoxUploadLoading = false;
        draft.st_keepBoxUploadDone = false;
        draft.st_keepBoxUploadError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case KEEPBOX_DETAIL_REQUEST: {
        draft.st_keepBoxDetailLoading = true;
        draft.st_keepBoxDetailDone = null;
        draft.st_keepBoxDetailError = false;
        break;
      }
      case KEEPBOX_DETAIL_SUCCESS: {
        draft.st_keepBoxDetailLoading = false;
        draft.st_keepBoxDetailDone = true;
        draft.detailBox = action.data.boxes;
        break;
      }
      case KEEPBOX_DETAIL_FAILURE: {
        draft.st_keepBoxDetailLoading = false;
        draft.st_keepBoxDetailDone = false;
        draft.st_keepBoxDetailError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case KEEPBOX_DATE_LIST_REQUEST: {
        draft.st_keepBoxDateListLoading = true;
        draft.st_keepBoxDateListDone = null;
        draft.st_keepBoxDateListError = false;
        break;
      }
      case KEEPBOX_DATE_LIST_SUCCESS: {
        draft.st_keepBoxDateListLoading = false;
        draft.st_keepBoxDateListDone = true;
        draft.keepBoxes = action.data;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case KEEPBOX_DATE_LIST_FAILURE: {
        draft.st_keepBoxDateListLoading = false;
        draft.st_keepBoxDateListDone = false;
        draft.st_keepBoxDateListError = action.error;
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
        draft.createInfo = action.data.info;
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
      case KEEPBOX_IMAGE_DELETE_REQUEST: {
        draft.st_keepBoxImageDeleteLoading = true;
        draft.st_keepBoxImageDeleteDone = null;
        draft.st_keepBoxImageDeleteError = false;
        break;
      }
      case KEEPBOX_IMAGE_DELETE_SUCCESS: {
        draft.st_keepBoxImageDeleteLoading = false;
        draft.st_keepBoxImageDeleteDone = true;
        break;
      }
      case KEEPBOX_IMAGE_DELETE_FAILURE: {
        draft.st_keepBoxImageDeleteLoading = false;
        draft.st_keepBoxImageDeleteDone = false;
        draft.st_keepBoxImageDeleteError = action.error;
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

      case GUIDE_MODAL_OPEN_REQUEST:
        draft.guideModal = true;
        break;

      case GUIDE_MODAL_CLOSE_REQUEST:
        draft.guideModal = false;
        break;

      default:
        break;
    }
  });

export default reducer;
