import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios, { API_BASE_URL } from "../../axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import "./Post.css";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // const [editable, setEditable] = useState(false);

  /////////////////////////////////////////////////// Loading blog
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

  /////////////////////////////////////////////////// Deleting blog
  const handleDelete = (e, id) => {
    e.preventDefault();
    axios
      .delete(`/api/posts/${id}`)
      .then(() => {
        // setPost(res.data);
        // this.props.history.push("/")
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => err);
  };

  return (
    <div className="post">
      {success ? <Redirect to="/" /> : ""}
      {/* {editable ? <Redirect to= {`Post/edit/${id}`} /> : ""} */}
      <header
        className="profile__heading"
        style={{
          backgroundImage: `url(${API_BASE_URL}/${post.post_image})`,
        }}
      ></header>

      <div className="body">
        <div className="post__Icons">
          <Link to="/">
            <div className="icons">Back</div>
          </Link>
          <Link tp="/">
            <div className="icons" onClick={(e) => handleDelete(e, id)}>
              <DeleteIcon  />
            </div>
          </Link>
          <Link to={`/Post/edit/${id}`}>
            <div className="icons">
              <EditIcon  />
            </div>
          </Link>
        </div>

        <div className="post__Content">
          <div className="title__Container">
            <div id="post__title">{post.title}</div>
          </div>

          <p id="post__date">
            {new Date(parseInt(post.added_date)).toDateString()}
          </p>

          <div className="title__Container">
            <div id="post__content">{post.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
