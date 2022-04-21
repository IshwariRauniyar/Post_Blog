import postReducers from "./post.reducers";
import authReducers from "./auth.reducers";
import pageReducers from "./page.reducers";
import roleReducers from "./role.reducers";
import userReducers from "./user.reducers";
import { combineReducers } from "redux";

export default combineReducers({
  post: postReducers,
  auth: authReducers,
  page: pageReducers,
  role: roleReducers,
  user: userReducers,
});
