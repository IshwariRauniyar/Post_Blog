import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const getPost = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(`/post`);
    console.log(data);
    dispatch({ type: Constants.POST_GET_ALL, payload: data.results });
    Toast.success("Post fetched successfully");
  } catch (error) {
    Toast.error("Error fetching Post");
    console.log(error);
  }
};

export const getSinglePost = (id) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(`/post/${id}`);
    console.log("single", data);
    dispatch({ type: Constants.POST_GET_SINGLE, payload: data.results });
  } catch (error) {
    Toast.error("Error fetching Post");
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  console.log(id);
  try {
    await axiosInstance.delete(`/post/${id}`);
    dispatch({ type: Constants.POST_DELETE, payload: id });
    Toast.success("Post deleted successfully");
  } catch (error) {
    Toast.error("Error deleting Post");
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  console.log("newPost", newPost);
  console.log("Image", newPost.Image);
  try {
    if (newPost) {
      const formData = new FormData();
      formData.append("Image", newPost.Image);
      formData.append("Title", newPost.Title);
      formData.append("SeoTitle", newPost.SeoTitle);
      formData.append("SeoDescription", newPost.SeoDescription);
      formData.append("Description", newPost.Description);
      formData.append("Order", newPost.Order);
      formData.append("Summary", newPost.Summary);
      formData.append("IsActive", newPost.IsActive);

      const { data } = await axiosInstance.post("/post", formData);
      console.log("data", data);
      dispatch({ type: Constants.POST_CREATE, payload: data.results });
    }
    Toast.success("Post created successfully");
  } catch (error) {
    Toast.error("Error creating Post");
    console.log(error);
  }
};

export const updatePost = (id, updatePost) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.put(`/post/${id}`, updatePost);
    dispatch({ type: Constants.POST_EDIT, payload: data.results });
    Toast.success("Post updated successfully");
  } catch (error) {
    Toast.error("Error updating Post");
    console.log(error);
  }
};
