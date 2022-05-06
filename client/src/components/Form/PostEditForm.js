import React, { useState, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/actions/post.actions";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import GenerateSlug from "./GenerateSlug";
import axiosInstance from "../../axios";

const PostEditForm = ({ editState, close }) => {
  const ImgPath = editState.Image;
  const dispatch = useDispatch();
  const quillRef = useRef();
  const [paramid] = useState(editState._id);
  const [title, setTitle] = useState(editState?.Title || "");
  const [newSlug, setNewSlug] = useState("");
  const [slug, setSlug] = useState(editState?.Slug || "");
  const [seoTitle, setSeoTitle] = useState(editState?.SeoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    editState?.SeoDescription || ""
  );
  const [description, setDescription] = useState(editState?.Description || "");
  const [summary, setSummary] = useState(editState?.Summary || "");
  const [order, setOrder] = useState(editState?.Order || "");
  const [Image, setImage] = useState();
  const [ImagePath] = useState(ImgPath || null);
  const [IsActive, setIsActive] = useState(editState?.IsActive || Boolean);

  const onclose = close;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      Title: title,
      Slug: newSlug || slug,
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
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
    setSlug(sl + "-" + uuidv4().substr(0, 8));
  };
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log("file", file);
      const formData = new FormData();
      formData.append("file", file);
      if (file && file.size < 1048576) {
        axiosInstance.post("/file/upload", formData).then((res) => {
          const imageUrl = res.data;
          console.log("imageUrl", imageUrl);
          if (imageUrl) {
            var reader = new FileReader();
            reader.onload = function (e) {
              var readAsDataURL = e.target.result;
              editor.insertEmbed(editor.getSelection().index, "image", readAsDataURL);
              editor.setSelection(editor.getSelection().index + 1);
            }
            reader.readAsDataURL(file);
          }
        }).catch((err) => {
          console.log(err);
        })
      } else {
        alert("File size must be less than 1MB");
      }
    }
  }

  const modules = useMemo(
    () => (
      {
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean'],
            [{ 'color': [] }]
          ],
          handlers: {
            image: imageHandler
          }
        },
      }
    ),
    []
  );


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
            className="block w-full h-96 mb-7 pb-11 text-lg "
            placeholder="Write something..."
            ref={quillRef}
            value={description}
            modules={modules}
            onChange={onEditorChange}
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
            rows={3}
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
                alt=""
                id="output"
                height={150}
                width={150}
                src={`http://localhost:8848/${ImagePath}` || "https://via.placeholder.com/150"}
              />
            ) : (
              <img
                alt=""
                id="output"
                height={150}
                width={150}
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
