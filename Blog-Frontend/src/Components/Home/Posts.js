import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { API_BASE_URL } from "../../axios";
import DeleteIcon from "@material-ui/icons/Delete";
import "./posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [setPosts]);  

  const handleClick = (e, id) => {
    e.preventDefault();
    axios
    .delete(`/api/posts/${id}`)
    .then((res) => {
      setPosts(res.data);      
      setLoading(false);
    })
    .catch((err) => err);
    window.location.replace("/");
  }

  const blogCard = (data, index) => (
    <div
      className="bodyMain"
      key={data.id}      
    >
      <div className="buttonsEditable" onClick={e => handleClick(e, data.id)}><DeleteIcon /></div>
      <Link to={`/Post/${data.id}`}>
        <div className="post__Container">
          <div
            className="post__Image"
            style={{
              backgroundImage: `url(${API_BASE_URL}/${data.post_image})`,
            }}
          ></div>
          
          <div className="post__Content">
            <p id="post__date">
              {new Date(parseInt(data.added_date)).toDateString()}
            </p>
            <h1 id="post__title">{data.title}</h1>
            <div id="post__content">{data.content}</div>
          </div>
        </div>
      </Link>
    </div>
  )

  return (
    <>
      {loading
        ? "Loading...."
        : posts.map((data, index) => (            
              blogCard(data, index)         
          ))}
    </>
  );
}

export default Posts;
