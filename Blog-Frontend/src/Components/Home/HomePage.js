import React from "react";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import AddBoxIcon from "@material-ui/icons/AddBox";

function HomePage() {
  return (
    <div className="homepage">
      <header className="profile__heading">
        <Link to="/NewPost" style={{ backgroundColor: "#FFF"}}>
          <AddBoxIcon style={{ fontSize: 80} } />
        </Link>
        <img src="sanjay.jpg" alt="profileImage" />
        <h1>Sanjay Shrestha</h1>
        <h3>Welcome to my Blog</h3>
      </header>

      <div className="body">
        <Posts />
      </div>
    </div>
  );
}

export default HomePage;
