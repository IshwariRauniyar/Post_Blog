import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";
// import Cookies from "js-cookie";

export const getPage =
  ({ offset = 0, limit = 10, search = "" }) =>
    async (dispatch) => {
      try {
        // if(Cookies.get("token")){
        // const setHeaders = {
        //   headers: {
        //     Authorization: `${Cookies.get("token")}`,
        //   },
        // };
        // console.log(Cookies.get("token"));
        const { data } = await axiosInstance.get(`/page/?offset=${offset}&limit=${limit}&search=${search}`);
        if (data.success === true) {
          dispatch({
            type: Constants.PAGE_GET_ALL,
            payload: data,
          });
        } else {
          dispatch({
            type: Constants.PAGE_ERROR,
            payload: data,
          });
          Toast.error(data.message);
        }

        // if (data.code === 401) {
        //   localStorage.removeItem("token");
        //   localStorage.removeItem("user");
        //   dispatch({
        //     type: Constants.LOGOUT_SUCCESS,
        //     payload: data,
        //   });
        //   window.location.href = "/login";
        // }
        // }
      } catch (error) {
        console.log(error?.response);
      }
    };

export const getSinglePage = (id) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.get(`/page/${id}`, setHeaders);
      dispatch({ type: Constants.PAGE_GET_SINGLE, payload: data.post });
    }
  } catch (error) {
    Toast.error("Error fetching Page");
    console.log(error);
  }
};

export const deletePage = (id) => async (dispatch) => {
  // console.log(id);
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axiosInstance.delete(`/page/${id}`, setHeaders);
      dispatch({ type: Constants.PAGE_DELETE, payload: id });
      Toast.success("Page deleted successfully");
    }
  } catch (error) {
    Toast.error("Error deleting Page");
    console.log(error);
  }
};

export const createPage = (newPage) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      if (newPage) {
        const formData = new FormData();
        formData.append("Image", newPage.Image);
        formData.append("Title", newPage.Title);
        formData.append("Slug", newPage.Slug);
        formData.append("SeoTitle", newPage.SeoTitle);
        formData.append("SeoDescription", newPage.SeoDescription);
        formData.append("Description", newPage.Description);
        formData.append("IsActive", newPage.IsActive);

        const { data } = await axiosInstance.post(
          "/page",
          formData,
          setHeaders
        );
        if (data.success === true) {
          dispatch({
            type: Constants.PAGE_CREATE,
            payload: data.result.PageData,
          });
          Toast.success("Page created successfully");
        } else {
          Toast.error(data.message);
        }
      }
    }
  } catch (error) {
    Toast.error(error.message);
    console.log(error);
  }
};

export const updatePage = (id, updatePage) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      if (updatePage) {
        const formData = new FormData();
        formData.append("Image", updatePage.Image);
        formData.append("Title", updatePage.Title);
        formData.append("Slug", updatePage.Slug);
        formData.append("SeoTitle", updatePage.SeoTitle);
        formData.append("SeoDescription", updatePage.SeoDescription);
        formData.append("Description", updatePage.Description);
        formData.append("IsActive", updatePage.IsActive);
        const { data } = await axiosInstance.put(
          `/page/${id}`,
          formData,
          setHeaders
        );
        dispatch({
          type: Constants.PAGE_EDIT,
          payload: data.result.updatedPage,
        });
      }
      Toast.success("Page updated successfully");
    }
  } catch (error) {
    Toast.error("Error updating Page");
    console.log(error);
  }
};
