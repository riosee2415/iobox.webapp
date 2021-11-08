import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import banner from "./banner";
import popup from "./popup";
import company from "./company";
import notice from "./notice";
import gallery from "./gallery";
import question from "./question";
import accept from "./accept";
import box from "./box";
import event from "./event";
import faq from "./faq";
import info from "./info";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default:
      {
        const combinedReducer = combineReducers({
          user,
          banner,
          popup,
          company,
          notice,
          gallery,
          question,
          accept,
          box,
          event,
          faq,
          info,
        });
        return combinedReducer(state, action);
      }
      ㅂ;
  }
};

export default rootReducer;
