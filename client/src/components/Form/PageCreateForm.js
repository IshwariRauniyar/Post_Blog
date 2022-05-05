import React, { useState, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../redux/actions/page.actions";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
// import { imageUpload } from "../../redux/actions/file.actions";
import axiosInstance from "../../axios";
import GenerateSlug from "./GenerateSlug";

const PageCreateForm = ({ close }) => {
  var quillObj;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [IsActive, setIsActive] = useState(Boolean);
  const onclose = close;
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPage = {
      Title: title,
      Slug: newSlug || slug,
      SeoTitle: seoTitle,
      SeoDescription: seoDescription,
      Description: description,
      IsActive: IsActive,
      Image,
    };
    console.log("newPage", newPage.Description);
    // dispatch(createPage(newPage));
    onclose();
  };
  const onEditorChange = (description) => {
    setDescription(description);
  };
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleChangeSwitch = (IsActive) => {
    setIsActive(!IsActive);
  };

  const slugify = (text) => {
    const sl = text
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
    setSlug(sl + "-" + uuidv4().substr(0, 8));
  };

  // const Editor = () => {
  //   editorRef = useRef(null);
  //   modules = useMemo(
  //     () => ({
  //       toolbar: {
  //         container: [
  //           [{ header: [1, 2, false] }],
  //           ["bold", "italic", "underline", "strike", "blockquote"],
  //           [
  //             { list: "ordered" },
  //             { list: "bullet" },
  //             { indent: "-1" },
  //             { indent: "+1" },
  //           ],
  //           ["link"],
  //           ["clean"],
  //           ["image"],
  //         ],
  //         handlers: {
  //           image: imageHandler,
  //         },
  //       }
  //     }),
  //     []
  //   );
  //   formats = [
  //     "header",
  //     "bold",
  //     "italic",
  //     "underline",
  //     "strike",
  //     "blockquote",
  //     "list",
  //     "bullet",
  //     "indent",
  //     "link",
  //     "image",
  //   ];
  //   const imageHandler = (image, callback) => {
  //     const file = image.file;
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     axiosInstance
  //       .post("/api/file/upload", formData)
  //       .then((res) => {
  //         const imageUrl = res.data.url;
  //         callback(imageUrl);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  // };


  function base64Convert(file) {
    console.log("file", file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium"> Title</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="text"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              slugify(e.target.value);
            }}
            placeholder="Enter title"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium"> Slug</label>
          <GenerateSlug
            slugData={slug}
            setNewSlug={setNewSlug}
          // value={newSlug}
          />
          {newSlug.length > 0 ? (
            <input
              className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
              type="text"
              name="slug"
              readOnly
              value={newSlug}
            />
          ) : (
            <input
              className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
              type="text"
              name="slug"
              readOnly
              value={slug}
            />
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium"> Seo Title</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="text"
            required
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Enter seo title.."
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium">
            Seo Description
          </label>
          <textarea
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            rows={3}
            placeholder="Write something..."
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium">Description</label>
          {/* <ReactQuill
            ref={editorRef}
            modules={modules}
            formats={formats}
            value={description}
            onChange={onEditorChange}
          /> */}

        </div>
        <div className="mb-6 ">
          <label className="block mb-2 text-2xl font-medium">Image</label>
          <div className="py-2 shrink-0">
            {Image ? (
              <img
                src={URL.createObjectURL(Image)}
                alt="image"
                height={150}
                width={150}
              />
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="image"
                height={150}
                width={150}
              />
            )}
          </div>
          <label className="block pt-2">
            <span className="sr-only">Browse photo </span>
            <input
              type="file"
              onChange={handleChange}
              className="block w-full text-lg text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-lg file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
            />
          </label>
        </div>

        <label className="block mb-2 text-2xl font-medium">IsActive</label>
        <div className="inline-block relative w-full">
          <label className="block absolute inset-y-0 left-0 flex items-center pl-3">
            <input
              type="checkbox"
              value={IsActive}
              onChange={() => handleChangeSwitch(IsActive)}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-lg text-gray-900">Is Active</span>
          </label>
        </div>

        <div className="mt-7">
          <div className="flex justify-start space-x-2">
            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-2xl hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default PageCreateForm;
