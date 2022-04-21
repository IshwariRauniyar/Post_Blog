import Constants from "./types";
import axiosInstance from "../../axios";
import Toast from "../../components/Toast";

export const getRole =
  ({ offset = 0, limit = 10, search = "" }) =>
  async (dispatch) => {
    try {
      if (localStorage.getItem("token")) {
        const setHeaders = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const { data } = await axiosInstance.get(
          `/setting/?offset=${offset}&limit=${limit}&search=${search}`,
          setHeaders
        );
        console.log(data);
        if (data.success === true) {
          dispatch({
            type: Constants.ROLE_GET_ALL,
            payload: data,
          });
        } else {
          Toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error?.response);
    }
  };

export const getSingleRole = (id) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axiosInstance.get(`/setting/${id}`, setHeaders);
      dispatch({ type: Constants.ROLE_GET_SINGLE, payload: data.post });
    }
  } catch (error) {
    Toast.error("Error fetching Role");
    console.log(error);
  }
};

export const deleteRole = (id) => async (dispatch) => {
  // console.log(id);
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axiosInstance.delete(`/setting/${id}`, setHeaders);
      dispatch({ type: Constants.ROLE_DELETE, payload: id });
      Toast.success("Role deleted successfully");
    }
  } catch (error) {
    Toast.error("Error deleting Role");
    console.log(error);
  }
};

export const createRole = (newRole) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      const setHeaders = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      if (newRole) {
        const { data } = await axiosInstance.post(
          "/setting/",
          newRole,
          setHeaders
        );
        console.log("d", data);
        if (data.success === true) {
          dispatch({
            type: Constants.ROLE_CREATE,
            payload: data.result,
          });
          Toast.success("Role created successfully");
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

// export const updateRole = (id, updateRole) => async (dispatch) => {
//   try {
//     if (localStorage.getItem("token")) {
//       const setHeaders = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//       if (updateRole) {
//         const formData = new FormData();
//         formData.append("Title", newRole.Title);
//         formData.append("UniqueName", newRole.UniqueName);
//         formData.append("Value", newRole.Value);
//         formData.append("IsActive", newRole.IsActive);
//         const { data } = await axiosInstance.put(
//           `/setting/${id}`,
//           formData,
//           setHeaders
//         );
//         dispatch({
//           type: Constants.ROLE_EDIT,
//           payload: data.result.updatedRole,
//         });
//       }
//       Toast.success("Role updated successfully");
//     }
//   } catch (error) {
//     Toast.error("Error updating Role");
//     console.log(error);
//   }
// };
