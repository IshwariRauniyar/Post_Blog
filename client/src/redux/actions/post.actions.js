import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const getPost =
  ({ offset = 0, limit = 10, search = "" }) =>
    async (dispatch) => {
      try {
        const { data } = await axiosInstance.get(
          `/post/?offset=${offset}&limit=${limit}&search=${search}`,
        );
        if (data.success === true) {
          dispatch({
            type: Constants.POST_GET_ALL,
            payload: data,
          });
        } else {
          dispatch({
            type: Constants.POST_ERROR,
            payload: data,
          });
          Toast.error(data.message);
        }
      } catch (error) {
        // if (error?.response?.data?.code == 401) {
        //   Toast.error(error.response.data.message);
        //   // setTimeout(() => {
        //   //   localStorage.removeItem("token");
        //   //   localStorage.removeItem("user");
        //   //   window.location.href = "/login";
        //   // }, 3000);
        // } else {
        //   Toast.error(error?.message);
        // }
        console.log(error?.response);
      }
    };

export const getSinglePost = (Slug) => async (dispatch) => {
  console.log("Slugdd", Slug);
  try {
    const { data } = await axiosInstance.get(`/post/${Slug}`);
    dispatch({ type: Constants.POST_GET_SINGLE, payload: data.post });
  } catch (error) {
    Toast.error("Error fetching Post");
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  // console.log(id);
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
  try {
    if (newPost) {
      const formData = new FormData();
      formData.append("Image", newPost.Image);
      formData.append("Title", newPost.Title);
      formData.append("Slug", newPost.Slug);
      formData.append("SeoTitle", newPost.SeoTitle);
      formData.append("SeoDescription", newPost.SeoDescription);
      formData.append("Description", newPost.Description);
      formData.append("Order", newPost.Order);
      formData.append("Summary", newPost.Summary);
      formData.append("IsActive", newPost.IsActive);

      const { data } = await axiosInstance.post(
        `/post`,
        formData
      );
      dispatch({
        type: Constants.POST_CREATE,
        payload: data.result.PostData,
      });
    }
    Toast.success("Post created successfully");
  } catch (error) {
    Toast.error("Error creating Post");
    console.log(error);
  }
};

export const updatePost = (id, updatePost) => async (dispatch) => {
  try {
    if (updatePost) {
      const formData = new FormData();
      formData.append("Image", updatePost.Image);
      formData.append("Title", updatePost.Title);
      formData.append("Slug", updatePost.Slug);
      formData.append("SeoTitle", updatePost.SeoTitle);
      formData.append("SeoDescription", updatePost.SeoDescription);
      formData.append("Description", updatePost.Description);
      formData.append("Order", updatePost.Order);
      formData.append("Summary", updatePost.Summary);
      formData.append("IsActive", updatePost.IsActive);
      const { data } = await axiosInstance.put(
        `/post/${id}`,
        formData
      );
      dispatch({
        type: Constants.POST_EDIT,
        payload: data.result.updatedPost,
      });
    }
    Toast.success("Post updated successfully");
  } catch (error) {
    Toast.error("Error updating Post");
    console.log(error);
  }
};
