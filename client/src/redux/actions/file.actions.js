import axiosInstance from "../../axios";

export const imageUpload = (file) => async (dispatch) => {
    try {
        const data = new FormData();
        data.append("file", file);
        const { data: res } = await axiosInstance.post("/file/upload", data);
        return res;
    } catch (error) {
        console.log(error);
    }
}
