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
import SearchResult from './react-components/search-result/search-result';
import { checkSession } from './actions/user'

class App extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    checkSession(this);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <HomePage user={this.state.user} />}></Route>
            <Route path="/search/:input" render={() => <SearchResult user={this.state.user} />}></Route>
            <Route exact path="/profile" render={() => <ProfilePage user={this.state.user} />}></Route>
            <Route
              exact
              path="/feed"
              render={() => <UserFeed user={this.state.user} />}
            ></Route>
            <Route exact path="/movies" render={() => <MovieGallery user={this.state.user} />}></Route>
            <Route exact path="/movie" render={() => <Movie user={this.state.user} />}></Route>
            <Route exact path="/admin" render={() => <Admin user={this.state.user} />}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
