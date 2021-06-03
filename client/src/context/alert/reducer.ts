import { SET_ERROR, REMOVE_ERROR, SET_ALERT, REMOVE_ALERT, SET_INFO, REMOVE_INFO, SET_WARNING, REMOVE_WARNING } from "../types";
import { alert } from "../types/alert";

export default (state: alert, action: any) => {
  const { type, payload } = action;
  switch (type) {
      case SET_ERROR:
        return { ...state, error: true, msg: payload };
      case REMOVE_ERROR:
        return { ...state, error: false, msg: null };
      case SET_ALERT:
        return { ...state, success: true, msg: payload };
      case REMOVE_ALERT:
        return { ...state, success: false, msg: null };
      case SET_INFO:
        return { ...state, info: true, msg: payload };
      case REMOVE_INFO:
        return { ...state, info: false, msg: null };
      case SET_WARNING:
        return { ...state, warning: true, msg: payload };
      case REMOVE_WARNING:
        return { ...state, warning: false, msg: null };
      default:
        return state;
    }
  };
  