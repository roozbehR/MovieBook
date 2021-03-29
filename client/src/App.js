import React from "react";
import "./App.css";
// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import MovieGallery from "./MovieGallery";
import Admin from "./AdminPanel";
import UserFeed from "./UserFeed";
import Movie from './Movie'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <HomePage />}></Route>
            <Route exact path="/profile" render={() => <ProfilePage />}></Route>
            <Route
              exact
              path="/feed"
              render={() => <UserFeed />}
            ></Route>
            <Route exact path="/movies" render={() => <MovieGallery />}></Route>
            <Route exact path="/movie" render={() => <Movie />}></Route>
            <Route exact path="/admin" render={() => <Admin />}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
