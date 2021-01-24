import React, { useEffect, useRef, useState } from "react";
import "./Post.css";
import { Link, Redirect, useParams } from "react-router-dom";
import axios, { API_BASE_URL } from "../../axios";

function NewPost() {
  const initialPost = {
    title: "",
    content: "",
    post_image: null,
    imageSrc: "",
  };
  const { id } = useParams();
  const [post, setPost] = useState(initialPost);
  const [onSuccess, setOnSucess] = useState(false);
  const [errors, setErrors] = useState({});

  const title = useRef();
  const content = useRef();
  const post_image = useRef();

  useEffect(() => {
    axios
      .get(`/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => err);
  }, [id]);

  //// Enables to type and edit after onchange
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const validate = () => {
    let temp = {};
    temp.title = post.title === "" ? false : true;
    temp.content = post.content === "" ? false : true;
    temp.post_image = post.post_image === true;
    setErrors(temp);
    // checking temp object containing all object value has true or not?
    return Object.values(temp).every((x) => x === true);
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setPost({
          ...post,
          post_image: imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPost({ ...post, post_image: null, imageSrc: post.post_image });
    }
  };

  const saveEdit = (id, newForm) => {
    axios
      .put(`/api/posts/${id}`, newForm)
      .then((res) => setOnSucess(true))
      .catch((e) => console.log(e));
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newForm = new FormData();
      newForm.append("title", post.title);
      newForm.append("content", post.content);
      newForm.append("post_image", post.post_image);
      saveEdit(id, newForm);
    }
  };

  return (
    <div className="newpost">
      {onSuccess ? <Redirect to="/" /> : ""}
      <header
        className="profile__heading"
        style={{
          backgroundImage: `url(${API_BASE_URL}/${post.post_image})`,
        }}
      ></header>

      <div className="body">
        <Link to="/">Back</Link>
        <div className="post__Content">
          <form autoComplete="off" noValidate onSubmit={handleFileSubmit}>
            <input
              id="post__title"
              autoFocus
              ref={title}
              name="title"
              type="text"
              value={post.title}
              onChange={handleInputChange}
            />

            <textarea
              id="post__content"
              name="content"
              ref={content}
              rows="20"
              cols="126"
              value={post.content}
              onChange={handleInputChange}
            />

            <div>
              <label htmlFor="post_image">Choose Image</label>
              <input
                type="file"
                name="post_image"
                ref={post_image}
                accept="image/*"
                id="post_image"
                onChange={showPreview}
              />
            </div>

            <input type="submit" value="Save" id="form-post-submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
