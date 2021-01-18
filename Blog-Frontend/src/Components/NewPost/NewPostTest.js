import React, { useState } from "react";
import "./NewPost.css";
import { Link } from "react-router-dom";
import axios from "../../axios";

function NewPost() {
  const initialPost = {
    title: "",
    content: "",
    post_image: null,
  };

  const [post, setPost] = useState(initialPost);
  const [sucess, setSucess] = useState(false);
  const [errs, setErrs] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleFiles = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setPost({
          ...post,
          post_image: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPost({
        ...post,
        post_image: null,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.title = post.title === "" ? false : true;
    temp.content = post.content === "" ? false : true;
    temp.post_image = post.post_image === null ? false : true;
    setErrs(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const errMessage = (field) =>
    field in errs && errs[field] === false ? "invalid-field" : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const post_image = document.getElementById("post_image");
    const title = document.getElementById("post__title").value;
    const content = document.getElementById("post__content").value;
    if (validate()) {
      const postData = new FormData();
      postData.append("post_image", post_image.files[0]);
      postData.append("title", title);
      postData.append("content", content);
      axios
      .post("/api/posts", postData)
      .then(() => {
        document.getElementById("post_image").value = null;
    setErrs({});
    window.location.replace("/");
      })
      .catch((e) => console.log(e));
      setPost(initialPost);
    
  };

  return (
    <div className="newpost">
      <header className="profile__heading">
        <h1>New Posts</h1>
        <h3>Lets add a new blog post!</h3>
      </header>

      <div className="body">
        <Link to="/">Back</Link>
        <div className="post__Content">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input
              id="post__title"
              name="title"
              type="text"
              placeholder="title here.."
              value={post.title}
              onChange={handleInputChange}
              className={errMessage("title")}
            />

            <textarea
              id="post__content"
              name="content"
              rows="20"
              cols="126"
              placeholder="Content here.."
              value={post.content}
              onChange={handleInputChange}
              className={errMessage("content")}
            />

            <div>
              <label htmlFor="file">Choose Image</label>
              <input
                type="file"
                name="post_image"
                accept="image/*"
                onChange={handleFiles}
                id="post_image"
                className={errMessage("post_image")}
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
