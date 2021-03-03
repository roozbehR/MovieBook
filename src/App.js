import React from "react";
import "./App.css";
// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ProfilePage from "./react-components/profile_page/ProfilePage";
import HomePage from "./HomePage";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import MovieGalleryPage from "./react-components/movie-gallery-page/movie-gallery-page";
import MoviePage from "./Movie";
import Admin from "./react-components/admin_panel/Admin";

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
              path="/movies"
              render={() => <MovieGalleryPage />}
            ></Route>
            <Route exact path="/movie" render={() => <MoviePage />}></Route>
            <Route exact path="/admin" render={() => <Admin />}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
