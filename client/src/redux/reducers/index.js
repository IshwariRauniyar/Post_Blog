import postReducers from "./post.reducers";
import { combineReducers } from "redux";

export default combineReducers({
  post: postReducers,
});
