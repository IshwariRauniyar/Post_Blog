import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post("/posts", newPost);
    dispatch({ type: Constants.POST_CREATE, payload: data.results });
    Toast.success("Post created successfully");
  } catch (error) {
    Toast.error("Error creating Post");
    console.log(error);
  }
};
