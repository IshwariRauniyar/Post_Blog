import postReducers from "./post.reducers";
import authReducers from "./auth.reducers";
import { combineReducers } from "redux";

export default combineReducers({
  post: postReducers,
  auth: authReducers,
});
