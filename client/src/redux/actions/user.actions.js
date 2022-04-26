import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";
import Cookies from "js-cookie";
export const getUser =
  ({ offset = 0, limit = 10, search = "" }) =>
  async (dispatch) => {
    try {
      if(Cookies.get("token")){
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
      }
    } catch (error) {
      console.log(error?.response);
    }
  };

export const getSingleUser = (id) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.get(`/User/${id}`, setHeaders);
      dispatch({ type: Constants.USER_GET_SINGLE, payload: data.post });
    }
  } catch (error) {
    Toast.error("Error fetching User");
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  // console.log(id);
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axiosInstance.delete(`/user/${id}`, setHeaders);
      dispatch({ type: Constants.USER_DELETE, payload: id });
      Toast.success("User deleted successfully");
    }
  } catch (error) {
    Toast.error("Error deleting User");
    console.log(error);
  }
};

// export const createUser = (newUser) => async (dispatch) => {
//   try {
//     if (localStorage.getItem("token")) {
//       const setHeaders = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       if (newUser) {
//         const formData = new FormData();
//         formData.append("Image", newUser.Image);
//         formData.append("Title", newUser.Title);
//         formData.append("Slug", newUser.Slug);
//         formData.append("SeoTitle", newUser.SeoTitle);
//         formData.append("SeoDescription", newUser.SeoDescription);
//         formData.append("Description", newUser.Description);
//         formData.append("IsActive", newUser.IsActive);

//         const { data } = await axiosInstance.post(
//           "/User",
//           formData,
//           setHeaders
//         );
//         if (data.success === true) {
//           dispatch({
//             type: Constants.User_CREATE,
//             payload: data.result.UserData,
//           });
//           Toast.success("User created successfully");
//         } else {
//           Toast.error(data.message);
//         }
//       }
//     }
//   } catch (error) {
//     Toast.error(error.message);
//     console.log(error);
//   }
// };

// export const updateUser = (id, updateUser) => async (dispatch) => {
//   try {
//     if (localStorage.getItem("token")) {
//       const setHeaders = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       if (updateUser) {
//         const formData = new FormData();
//         formData.append("Image", updateUser.Image);
//         formData.append("Title", updateUser.Title);
//         formData.append("Slug", updateUser.Slug);
//         formData.append("SeoTitle", updateUser.SeoTitle);
//         formData.append("SeoDescription", updateUser.SeoDescription);
//         formData.append("Description", updateUser.Description);
//         formData.append("IsActive", updateUser.IsActive);
//         const { data } = await axiosInstance.put(
//           `/User/${id}`,
//           formData,
//           setHeaders
//         );
//         dispatch({
//           type: Constants.User_EDIT,
//           payload: data.result.updatedUser,
//         });
//       }
//       Toast.success("User updated successfully");
//     }
//   } catch (error) {
//     Toast.error("Error updating User");
//     console.log(error);
//   }
// };
