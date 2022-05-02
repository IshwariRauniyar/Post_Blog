import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const authLogin = (user) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", user);
    // console.log("data", data);
    if (data.success) {
      const { user } = data.result;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: Constants.LOGIN_SUCCESS,
        payload: data.result,
      });
      Toast.success(data.message);
      window.location.href = "/header";
    } else {
      Toast.error(data.message);
    }
  } catch (error) {
    Toast.error("Error logging in");
    console.log(error);
  }
};

// export const authRegister = (user) => async (dispatch) => {
//   try {
//     const { data } = await axiosInstance.post("/auth/register", user);
//     if (data.success == true) {
//       dispatch({ type: Constants.REGISTER_SUCCESS, payload: data });
//       Toast.success(data.message);
//       window.location.href = "/login";
//     } else {
//       Toast.error(data.message);
//     }
//   } catch (error) {
//     Toast.error("Error registering");
//     console.log(error);
//   }
// };

export const authLogout = (user) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post("/auth/logout", user);
    if (data.success === true) {
      localStorage.removeItem("user");
      dispatch({ type: Constants.LOGOUT_SUCCESS, payload: data });
      Toast.success(data.message);
      window.location.href = "/login";
    } else {
      Toast.error(data.message);
    }
  } catch (error) {
    Toast.error("Error logging out");
    console.log(error);
  }
};
