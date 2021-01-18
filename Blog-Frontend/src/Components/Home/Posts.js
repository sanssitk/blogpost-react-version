import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { API_BASE_URL } from "../../axios";

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

  return (
    <>
      {loading
        ? "Loading...."
        : posts.map((post) => (
            <Link to={`/Post/${post.id}`} key={post.id}>
              <div className="post__Container">
                <div
                  className="post__Image"
                  style={{
                    backgroundImage: `url(${API_BASE_URL}/${post.post_image})`,
                  }}
                ></div>
                <div className="post__Content">
                  <p id="post__date">
                    {new Date(parseInt(post.added_date)).toDateString()}
                  </p>
                  <h1 id="post__title">{post.title}</h1>
                  <div id="post__content">{post.content}</div>
                </div>
              </div>
            </Link>
          ))}
    </>
  );
}

export default Posts;
