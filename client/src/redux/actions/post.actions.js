import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const createPost = (newPost, Image) => async (dispatch) => {
  console.log("newPost", newPost);
  console.log("Image", Image);
  try {
    if (Image) {
      const formData = new FormData();
      formData.append("Image", Image);
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
