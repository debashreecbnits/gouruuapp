import { combineReducers } from "redux";
import appConfig from "./AppConfig";
import userDetails from "./User";
import SetSearchText from "./SearchText";
export default combineReducers({
  appConfig,
  userDetails,
  SetSearchText,
});
