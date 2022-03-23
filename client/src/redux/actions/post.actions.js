import Constants from "./types";
import axiosInstance from "../../axios";
// import Toast from "../../components/Toast";

export const createPost = (newPost) => async (dispatch) => {
  console.log("newPost", newPost);
  try {
    const { data } = await axiosInstance.post("/post", newPost);
    console.log("data", data);
    dispatch({ type: Constants.POST_CREATE, payload: data.results });
    // Toast.success("Post created successfully");
  } catch (error) {
    // Toast.error("Error creating Post");
    console.log(error);
  }
};
