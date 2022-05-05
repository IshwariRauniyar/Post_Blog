import React, { useState } from "react";
import { Quill } from "react-quill";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/actions/post.actions";
import ReactQuill from "react-quill";
import "../../../node_modules/react-quill/dist/quill.snow.css";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import GenerateSlug from "./GenerateSlug";
import axiosInstance from "../../axios";


const PostCreateForm = ({ close }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
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
      Slug: newSlug || slug,
      SeoTitle: seoTitle,
      SeoDescription: seoDescription,
      Description: description,
      Summary: summary,
      Order: order,
      IsActive: IsActive,
      Image,

    };
    console.log('newPost', newPost)
    // dispatch(createPost(newPost));
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

  // var quillObj;

  // handlers: {
  //   image: function () {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "file");
  //     input.setAttribute("accept", "image/*");
  //     input.click();
  //     input.onchange = (e) => {
  //       const file = e.target.files[0];
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const image = new Image();
  //         image.src = e.target.result;
  //         image.onload = () => {
  //           const quill = this.quill;
  //           const canvas = document.createElement("canvas");
  //           const ctx = canvas.getContext("2d");
  //           canvas.width = image.width;
  //           canvas.height = image.height;
  //           ctx.drawImage(image, 0, 0);
  //           const dataURL = canvas.toDataURL("image/png");
  //           const range = quill.getSelection();
  //           quill.insertEmbed(range.index, "image", dataURL);
  //           quill.setSelection(range.index + 1);
  //         };
  //       }
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  // async function imageHandler() {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();
  //   input.onchange = (e) => {
  //     var file = e.target.files[0];
  //     console.log('file', file)
  //     var formData = new FormData();
  //     formData.append("file", file);
  //     var fileName = file.name;
  //     var fileType = file.type;
  //     var fileSize = file.size;
  //     var filePath = file.path;
  //     const res = uploadFiles(file, fileName, quillObj);
  //     console.log('res', res)
  //   }
  // }
  // const uploadFiles = async (file, fileName, quillObj) => {
  //   console.log('fileeee', file)
  //   try {
  //     const data = await axiosInstance.post("/file/upload", file);
  //     console.log('data', data)
  //     const range = quillObj.getEditorSelection();
  //     quillObj.getEditor().insertEmbed(range.index, "image", data.data.url);
  //     // quillObj.setSelection(range.index + 1);
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }

  // const toolbarContainer = [
  //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //   [{ 'font': [] }],
  //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //   [{ 'align': [] }],
  //   [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  //   [{ 'direction': 'rtl' }],                         // text direction
  //   [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  //   ['blockquote', 'code-block'],

  //   [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //   [{ 'color': [] }, { 'background': [] }],
  //   ['emoji', 'image', 'video', 'link'],

  //   ['clean']
  // ]

  var quillObj;
  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      const file = input.files[0]
      const formData = new FormData()
      formData.append('quill-image', file)
      const res = await axiosInstance.post('/file/upload', formData)
      const range = this.quillObj.getSelection()
      const link = res.data[0].url

      // this part the image is inserted
      // by 'image' option below, you just have to put src(link) of img here. 
      this.quillEditor.insertEmbed(range.index, 'image', link)
    }
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
            className="block w-full h-96 mb-7 pb-11 text-lg "
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
                ["link"],
                [{ image: imageHandler }],
                ["clean"],
              ]
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
          /> */}

          <ReactQuill ref={(el) => (quillObj = el)}
            value={description}
            modules={{
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
            }}
            onChange={onEditorChange}
          />

          {/* <ReactQuill
            ref={(el) => (quillObj = el)}
            placeholder=" fill in the activity details ~"
            theme="snow"
            value={description}
            onChange={onEditorChange}
            modules={{
              toolbar: {
                container: toolbarContainer,
                handlers: {
                  image: imageHandler
                }
              },
            }}
          /> */}
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

export default PostCreateForm;
