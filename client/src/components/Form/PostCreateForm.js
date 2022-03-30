import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/post.actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form, Row, Col, Image } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";
import { cdn } from "../../urlConfig";

const PostCreateForm = ({ close }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [order, setOrder] = useState("");
  const [Image, setImage] = useState(null);
  const [IsActive, setIsActive] = useState(Boolean);
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
    dispatch(createPost(newPost));
    onclose();
  };
  const onEditorChange = (description) => {
    setDescription(description);
  };
  const handleChange = (e) => {
    setImage(e.target.files[0]);
    // const blob = e.target.files[0];
    // const url = URL.createObjectURL(blob);
    // const img = new Image();
    // img.src = url;
    // console.log(url);
    // return url;
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
          <label className="block mb-2 text-md font-medium"> Title</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
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
          <label className="block mb-2 text-md font-medium"> Slug</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            type="text"
            name="slug"
            readOnly
            value={slug}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-md font-medium"> Seo Title</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            type="text"
            required
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Enter seo title.."
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-md font-medium">
            Seo Description
          </label>
          <textarea
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            rows={3}
            placeholder="Write something..."
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-md font-medium">Description</label>
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            value={description}
            onChange={onEditorChange}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-md font-medium"> Order</label>
          <input
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            type="number"
            placeholder="At what order should this post be displayed?"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-md font-medium">Summary</label>
          <textarea
            className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded"
            rows={5}
            placeholder="Write short brief..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className="mb-6 ">
          <label className="block mb-2 text-md font-medium">Image</label>
          <div className="py-2 shrink-0">
            <img
              className="object-cover w-16 h-16 "
              // src={"" + window.URL?.createObjectURL(Image)}
              // src={Image ? `${cdn}/middlewares/${Image.name}` : ""}
              src={Image}
              // alt="Current profile photo"
            />
          </div>
          <label className="block pt-2">
            <span className="sr-only">Browse photo </span>
            <input
              type="file"
              onChange={handleChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
            />
          </label>
        </div>

        {/* <div className="mb-6">
          <ImageUploader
            type="file"
            withIcon={false}
            withPreview={true}
            buttonText="Choose images"
            onChange={handleChange}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </div> */}

        <label className="block mb-2 text-md font-medium">IsActive</label>
        <div className="inline-block relative w-full">
          <label className="block absolute inset-y-0 left-0 flex items-center pl-3">
            <input
              type="checkbox"
              value={IsActive}
              onChange={() => handleChangeSwitch(IsActive)}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-900">Is Active</span>
          </label>
        </div>

        <div className="mt-7">
          <div className="flex justify-start space-x-2">
            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default PostCreateForm;
