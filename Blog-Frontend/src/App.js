import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Post from "./Components/Post/Post";
import NewPost from "./Components/NewPost/NewPost";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/Post/:id" component={Post} />          

          <Route exact path="/NewPost" component={NewPost} />

          <Route path="/" component={HomePage} />
        </Switch>
      </div>

      <footer>@Made with ♥ By Sanjay Shrestha </footer>
    </Router>
  );
}

export default App;
