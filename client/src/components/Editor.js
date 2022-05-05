import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import axiosInstance from "../axios";
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill");
        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    },
    {
        ssr: false,
    }
);
const Editor = () => {
    const editorRef = useRef(null);
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                    ],
                    ["link"],
                    ["clean"],
                    ["image"],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }));
    //   const imageHandler = (image, callback) => {
    //       const input = document.createElement("input");
    //         input.setAttribute("type", "file");
    //         input.setAttribute("accept", "image/*");
    //         input.click();

    //         input.onchange = () => {
    //             const file = input.files[0];
    //             const formData = new FormData();
    //             formData.append("image", file);
    //             axiosInstance
    //             .post("/api/file/upload", formData)
    //             .then((res) => {
    //                 const imageUrl = res.data.url;
    //                 callback(imageUrl);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //         };
    //     };

    // const imageHandler = (image, callback) => {
    //     const file = image.file;
    //     const formData = new FormData();
    //     formData.append("image", file);
    //     axiosInstance.post("/api/file/upload", formData).then((res) => {
    //         const imageUrl = res.data.url;
    //         callback(imageUrl);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // };

    const imageHandler = (a) => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            const file = input.files[0];

            // file type is only image.
            if (/^image\//.test(file.type)) {
                saveToServer(file);
            } else {
                console.warn("You could only upload images.");
            }
        };
    };

    function saveToServer(file) {
        const fd = new FormData();
        fd.append("upload", file);
        //    const img = axiosInstance.post("/api/file/upload", fd);
        //     img.then((res) => {
        //         const imageUrl = res.data.url;
        //         console.log(imageUrl);
        //     });



        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/file/upload", true);
        xhr.onload = () => {
            if (xhr.status === 201) {
                // this is callback data: url
                const url = JSON.parse(xhr.responseText).url;
                insertToEditor(url);
            }
        };
        xhr.send(fd);
    }
    function insertToEditor(url) {
        editorRef.current.getEditor().insertEmbed(null, "image", url);
    }

    return (
        <ReactQuill
            modules={modules}
            forwardedRef={editorRef}
        />
    );
};

export default Editor;
