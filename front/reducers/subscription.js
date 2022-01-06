import produce from "../util/produce";

export const initialState = {
  //
  st_subScriptionCreateLoading: false, // 정기 결제 가져오기
  st_subScriptionCreateDone: false,
  st_subScriptionCreateError: null,
  //
  st_subScriptionCancelLoading: false, // 정기 결제 가져오기
  st_subScriptionCancelDone: false,
  st_subScriptionCancelError: null,
};

export const SUBSCRIPTION_CREATE_REQUEST = "SUBSCRIPTION_CREATE_REQUEST";
export const SUBSCRIPTION_CREATE_SUCCESS = "SUBSCRIPTION_CREATE_SUCCESS";
export const SUBSCRIPTION_CREATE_FAILURE = "SUBSCRIPTION_CREATE_FAILURE";

export const SUBSCRIPTION_CANCEL_REQUEST = "SUBSCRIPTION_CANCEL_REQUEST";
export const SUBSCRIPTION_CANCEL_SUCCESS = "SUBSCRIPTION_CANCEL_SUCCESS";
export const SUBSCRIPTION_CANCEL_FAILURE = "SUBSCRIPTION_CANCEL_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SUBSCRIPTION_CREATE_REQUEST: {
        draft.st_subScriptionCreateLoading = true;
        draft.st_subScriptionCreateDone = null;
        draft.st_subScriptionCreateError = false;
        break;
      }
      case SUBSCRIPTION_CREATE_SUCCESS: {
        draft.st_subScriptionCreateLoading = false;
        draft.st_subScriptionCreateDone = true;
        draft.st_subScriptionCreateError = false;
        break;
      }
      case SUBSCRIPTION_CREATE_FAILURE: {
        draft.st_subScriptionCreateLoading = false;
        draft.st_subScriptionCreateDone = false;
        draft.st_subScriptionCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////
      case SUBSCRIPTION_CANCEL_REQUEST: {
        draft.st_subScriptionCancelLoading = true;
        draft.st_subScriptionCancelDone = null;
        draft.st_subScriptionCancelError = false;
        break;
      }
      case SUBSCRIPTION_CANCEL_SUCCESS: {
        draft.st_subScriptionCancelLoading = false;
        draft.st_subScriptionCancelDone = true;
        draft.st_subScriptionCancelError = false;
        break;
      }
      case SUBSCRIPTION_CANCEL_FAILURE: {
        draft.st_subScriptionCancelLoading = false;
        draft.st_subScriptionCancelDone = false;
        draft.st_subScriptionCancelError = action.error;
        break;
      }
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
