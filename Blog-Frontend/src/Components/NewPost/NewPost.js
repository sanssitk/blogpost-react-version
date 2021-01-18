import React, { useState } from "react";
import "./NewPost.css";
import { Link } from "react-router-dom";
import axios from "../../axios";

function NewPost() {
  const initialPost = {
    title: "",
    content: "",
    post_image: null,
    imageSrc: "https://images.unsplash.com/photo-1576815033564-aa6f79d79d04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  };

    const blogAPI = (url = "") => {
    return {
      getAll: () => axios.get(url),
      create: (url, newData) => axios.post(url, newData),
      update: (url, id, updateRecord) =>
        axios.put(`${url}:${id}`, updateRecord),
      delete: (url, id) => axios.delete(`${url}:${id}`),
    };
  };

  const [values, setValues] = useState(initialPost);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          post_image: imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({ ...values, post_image: null, imageSrc: "" });
    }
  };

  const validate = () => {
    let temp = {};
    temp.title = values.title === "" ? false : true;
    temp.imageSrc = values.imageSrc === "" ? false : true;
    setErrors(temp);
    // checking temp object containing all object value has true or not?
    return Object.values(temp).every((x) => x === true);
  };

  const addOrEdit = (formData, onSuccess) => {
    blogAPI()
      .create("/api/posts", formData)
      .then((res) => onSuccess())
      .catch((e) => console.log(e));
  };

  const resetForm = () => {
    setValues(initialPost);
    document.getElementById("post_image").value = null;
    setErrors({});
    window.location.replace("/");
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("post_image", values.post_image);

      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? "invalid-field" : "";

  return (
    <div className="newpost">
      <header
        className="profile__heading"
        style={{backgroundImage: values.imageSrc}}
      >
        <h1>New Posts</h1>
        <h3>Lets add a new blog post!</h3>
      </header>

      <div className="body">
        <Link to="/">Back</Link>
        <div className="post__Content">
          <form autoComplete="off" noValidate onSubmit={handleFileSubmit}>
            <input
              id="post__title"
              name="title"
              type="text"
              placeholder="title here.."
              value={values.title}
              onChange={handleInputChange}
              className={applyErrorClass("title")}
            />

            <textarea
              id="post__content"
              name="content"
              rows="20"
              cols="126"
              placeholder="Content here.."
              value={values.content}
              onChange={handleInputChange}
              className={applyErrorClass("content")}
            />

            <div>
              {/* <img src={values.imageSrc} alt="lable" /> */}
              <label htmlFor="file">Choose Image</label>
              <input
                type="file"
                name="post_image"
                accept="image/*"
                id="post_image"
                onChange={showPreview}
                className={applyErrorClass("imageSrc")}
              />
            </div>

            <input type="submit" value="Submit" id="form-post-submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
