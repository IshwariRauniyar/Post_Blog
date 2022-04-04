import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/actions/post.actions";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { Form, Row, Col, Image } from "react-bootstrap";

const PostEditForm = ({ editState, close }) => {
  console.log("editState", editState);
  const ImgPath = editState.Image;
  console.log("ImagePath", ImgPath);
  // const path = ImagePath.replace("\\", "/");
  // console.log("path", path);
  const dispatch = useDispatch();
  const [paramid, setID] = useState(editState._id);
  const [title, setTitle] = useState(editState?.Title || "");
  const [slug, setSlug] = useState(editState?.Slug || "");
  const [seoTitle, setSeoTitle] = useState(editState?.SeoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    editState?.SeoDescription || ""
  );
  const [description, setDescription] = useState(editState?.Description || "");
  const [summary, setSummary] = useState(editState?.Summary || "");
  const [order, setOrder] = useState(editState?.Order || "");
  const [Image, setImage] = useState();
  const [ImagePath, setImagePath] = useState(ImgPath || null);
  const [IsActive, setIsActive] = useState(editState?.IsActive || Boolean);

  const onclose = close;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      Title: title,
      Slug: slug,
      SeoTitle: seoTitle,
      SeoDescription: seoDescription,
      Description: description,
      Summary: summary,
      Order: order,
      IsActive: IsActive,
      Image,
    };

    dispatch(updatePost(paramid, newPost));
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
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
    setSlug(sl);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium"> Title</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="text"
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
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="text"
            name="slug"
            readOnly
            value={slug}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium"> Seo Title</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="text"
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
          <ReactQuill
            className="block w-full h-64 mb-7 pb-11 text-lg "
            placeholder="Write something..."
            value={description}
            onChange={onEditorChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium"> Order</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            type="number"
            placeholder="At what order should this post be displayed?"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-2xl font-medium">Summary</label>
          <textarea
            className="block w-full px-4 py-3 mb-2 text-lg placeholder-gray-500 bg-white border rounded"
            rows={5}
            placeholder="Write short brief..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className="mb-6 ">
          <label className="block mb-2 text-2xl font-medium">Image</label>
          <div className="py-2 shrink-0">
            {!!!Image ? (
              <img
                id="output"
                className="object-cover w-25 h-25 "
                src={`http://localhost:8848/${ImagePath}`}
              />
            ) : (
              <img
                id="output"
                className="object-cover w-25 h-25 "
                src={URL.createObjectURL(Image)}
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
              checked={IsActive}
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

export default PostEditForm;
