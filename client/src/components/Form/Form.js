import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/post.actions";

const PostCreateForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [postType, setPostType] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState("");

  const formData = [
    {
      title: "Title",
      type: "text",
      value: title,
      setValue: setTitle,
      args: {
        required: true,
      },
    },
    {
      title: "Meta Title",
      type: "text",
      value: meta_title,
      setValue: setMegaTitle,
    },
    {
      title: "Short Description",
      type: "text",
      value: short_description,
      setValue: setShortDescription,
    },
    {
      title: "Description",
      type: "text",
      value: description,
      setValue: setDescription,
    },
    {
      title: "Type",
      value: type,
      setValue: setType,
      args: {
        as: "select",
        required: true,
      },
      options: [
        { value: "News", option: "News" },
        { value: "Blog", option: "Blog" },
      ],
    },
    {
      title: "Published At",
      type: "date",
      value: published_at,
      setValue: setPublishedAt,
      args: {
        required: true,
      },
    },
    {
      title: "Status",
      value: status,
      setValue: setStatus,
      args: {
        as: "select",
      },
      options: [
        { value: "Draft", option: "Draft" },
        { value: "Published", option: "Published" },
        { value: "Outdated", option: "Outdated" },
        { value: "Reported as spam", option: "Reported as spam" },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      user_id,
      title,
      meta_title,
      short_description,
      description,
      published_at,
      type,
      status,
    };

    dispatch(createPost(newPost));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormControl data={formData} />
        <Button variant="success" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
};

export default PostCreateForm;
