import { combineReducers } from "redux";
import LigaReducer from "./liga";
import JerseyReducer from "./jersey";
import AuthReducer from "./Auth";
import PesananReducer from "./pesanan";

export default combineReducers({
  LigaReducer,
  JerseyReducer,
  AuthReducer,
  PesananReducer,
});
