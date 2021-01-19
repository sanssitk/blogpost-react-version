import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { API_BASE_URL } from "../../axios";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Post.css";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => err);
  }, [id]);

  const handleClick = (e, id) => {
    e.preventDefault();
    axios
    .delete(`/api/posts/${id}`)
    .then((res) => {
      setPost(res.data);
      setLoading(false);
    })
    .catch((err) => err);
    window.location.replace("/");
  }

  return (
    <div className="post">
      <header
        className="profile__heading"
        style={{
          backgroundImage: `url(${API_BASE_URL}/${post.post_image})`,
        }}
      ></header>

      <div className="body">
        <div className="post__Icons">
          <Link to="/">Back</Link>
          <div className="post__delete" onClick={e => handleClick(e, id)}>
            <DeleteIcon style={{ fontSize: 36 }} />
          </div>
        </div>

        <div className="post__Content">
          <h1 id="post__title">{post.title}</h1>

          <p id="post__date">
            {new Date(parseInt(post.added_date)).toDateString()}
          </p>
          <div id="post__content">{post.content}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
