import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const getUser =
  ({ offset = 0, limit = 10, search = "" }) =>
    async (dispatch) => {
      try {
        const { data } = await axiosInstance.get(
          `/user/?offset=${offset}&limit=${limit}&search=${search}`
        );
        if (data.success === true) {
          dispatch({
            type: Constants.USER_GET_ALL,
            payload: data,
          });
        } else {
          dispatch({
            type: Constants.USER_ERROR,
            payload: data,
          });
          Toast.error(data.message);
        }
      } catch (error) {
        console.log(error?.response);
      }
    };

export const getSingleUser = (id) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(`/User/${id}`);
    dispatch({ type: Constants.USER_GET_SINGLE, payload: data.post });
  } catch (error) {
    Toast.error("Error fetching User");
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/${id}`);
    dispatch({ type: Constants.USER_DELETE, payload: id });
    Toast.success("User deleted successfully");
  } catch (error) {
    Toast.error("Error deleting User");
    console.log(error);
  }
};

export const createUser = (newUser) => async (dispatch) => {
  try {
    if (newUser) {
      const { data } = await axiosInstance.post(
        "/user/",
        newUser
      );
      if (data.success === true) {
        dispatch({
          type: Constants.USER_CREATE,
          payload: data.result,
        });
        Toast.success("User created successfully");
      } else {
        Toast.error(data.message);
      }

    }
  } catch (error) {
    Toast.error("Error creating User");
    console.log(error);
  }
};

export const updateUser = (id, newUser) => async (dispatch) => {
  try {
    if (newUser) {
      const { data } = await axiosInstance.put(
        `/user/${id}`,
        newUser
      );
      if (data.success === true) {
        dispatch({
          type: Constants.USER_EDIT,
          payload: data.result,
        });
        // console.log(data.result);
        // localStorage.setItem("keyName", data.result.UserName);
        Toast.success("User updated successfully");
      } else {
        Toast.error(data.message);
      }
    }
  } catch (error) {
    Toast.error("Error updating User");
    console.log(error);
  }
};
