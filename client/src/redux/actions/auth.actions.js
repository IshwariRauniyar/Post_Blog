import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const authLogin = (user) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", user);
    console.log("data", data);
    if (data.success) {
      const { token, user } = data.result;
      console.log("token", token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
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
    if (data.success == true) {
      dispatch({ type: Constants.REGISTER_SUCCESS, payload: data });
      Toast.success(data.message);
    } else {
      Toast.error(data.message);
    }
  } catch (error) {
    Toast.error("Error registering");
    console.log(error);
  }
};
