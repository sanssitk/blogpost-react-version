import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Post from "./Components/Post/Post";
import NewPost from "./Components/NewPost/NewPost";
import PostEdit from "./Components/Post/PostEdit";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/NewPost" component={NewPost} />
          <Route exact path="/Post/edit/:id" component={PostEdit} />
          <Route exact path="/Post/:id" component={Post} />
        </Switch>
      </div>

      <footer>@Made with ♥ By Sanjay Shrestha </footer>
    </Router>
  );
}

export default App;
