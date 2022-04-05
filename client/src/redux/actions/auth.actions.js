import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const authLogin = (user) => async (dispatch) => {
  try {
    console.log("user", user);
    const { data } = await axiosInstance.post("/auth/login", user);
    console.log("data", data);
    if (data.success) {
      dispatch({
        type: Constants.LOGIN_SUCCESS,
        payload: data.result,
      });
      Toast.success(data.message);
    } else {
      Toast.error(data.message);
    }

    // dispatch({ type: Constants.LOGIN_SUCCESS, payload: data });
    // // Toast.success("Login Successful");
  } catch (error) {
    Toast.error("Error logging in");
    console.log(error);
  }
};

export const authRegister = (user) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", user);
    console.log("data", data);
    dispatch({ type: Constants.REGISTER_SUCCESS, payload: data });
    Toast.success("Registration Successful");
  } catch (error) {
    Toast.error("Error registering");
    console.log(error);
  }
};
