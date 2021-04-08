import React from "react";
import NavBar from "./react-components/navbar/navbar";
import { Tabs, Card, Button, Modal, message, Form, Input, InputNumber } from "antd";
import "./admin-style.css";
import { getAllUsers, deleteUser, toggleAdmin } from "./actions/user";
import { addMovie } from "./actions/movies";
import { uid } from "react-uid";
import BackgroundWrapper from "./react-components/background-wrapper/background-wrapper";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class Admin extends React.Component {
  state = {
    movie_title: "",
    movie_plot: "",
    movie_year: "",
    movie_runtime: "",
    movie_poster: "",
    users: [],
    addedMovie: "",
  };

  componentWillMount() {
    getAllUsers(this);
  };

  clickedDelete = (val) => {
    deleteUser(val);
    getAllUsers(this);
    message.success("User Deleted");
  };

  clickedUser = (val) => {
    const id = val._id;
    const ad = val.isAdmin;
    const update_ad = !ad;
    toggleAdmin(id, update_ad);
    getAllUsers(this);
    message.success("User Updated");
  };

  handleChangeTitle = (event) => {
    let val = event.target.value;
    this.setState({movie_title: val})
  };

  handleChangePlot = (event) => {
    let val = event.target.value;
    this.setState({movie_plot: val})
  };

  handleChangePoster = (event) => {
    let val = event.target.value;
    this.setState({movie_poster: val})
  }

  handleChangeYear = (event) => {
    let val = event.target.value;
    this.setState({movie_year: val})
  }

  handleChangeRuntime = (event) => {
    let val = event.target.value;
    this.setState({movie_runtime: val})
  }
 
  submitMovie = (event) => {
    event.preventDefault();
    const val_year = parseInt(this.state.movie_year);
    const val_runtime = parseInt(this.state.movie_runtime);
    addMovie(this.state.movie_title, this.state.movie_plot, val_year, val_runtime, this.state.movie_poster);
    this.setState({movie_title: "", movie_plot: "", movie_year: "", movie_poster: "", movie_runtime: ""});
    message.success("Movie Added");
  }

  render() {
    return (
      <BackgroundWrapper>
        <NavBar user={this.props.user} />
        <div className="page-container">
          <div>
            <Card>
              <h2 className="welcome">Welcome</h2>
            </Card>
            <br />
            <Tabs
              defaultActiveKey="1"
              onChange={callback}
              size="large"
              centered="true"
              tabBarStyle={{ marginLeft: 30, marginTop: 30, marginRight: 30 }}
            >
              <TabPane tab="Users" key="1">
                <Card style={{ marginLeft: 30, marginTop: 30, marginRight: 30 }}>
                  <table className="Table">
                    <tbody>
                      <tr>
                        <th className="cell">Full Name</th>
                        <th className="cell">Username</th>
                        <th className="cell">Admin Rights</th>
                        <th className="cell">Switch Role</th>
                        <th className="cell">Delete</th>
                      </tr>
                      {this.state.users.map((user) => {
                        return (
                          <tr key={uid(user)}>
                            <td className="cell">{user.fullName}</td>
                            <td className="cell">{user.username}</td>
                            <td className="cell">
                              {user.isAdmin ? <p>Yes</p> : <p>No</p>}
                            </td>
                            <td className="cell">
                              <Button
                                type="primary"
                                shape="round"
                                onClick={() => this.clickedUser(user)}
                              >
                                {user.isAdmin ? (
                                  <p>Demote to User</p>
                                ) : (
                                  <p>Promote to Admin</p>
                                )}
                              </Button>
                            </td>
                            <td className="cell">
                              <Button
                                type="primary"
                                shape="round"
                                onClick={() => this.clickedDelete(user._id)}
                              >
                                <p>Delete User</p>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card>
              </TabPane>
              <TabPane tab="Add Movie" key="2">
                <span>
                  <Card style={{ marginLeft: 30, marginTop: 30, width: 400}}>
                    <div>
                      <h3 className="welcome">Adding a Movie</h3> 
                      <span>
                      <form className="add_movie">
                      <label for="movie_title">Movie Title</label>
                      <br/>
                      <input type="text" id="movie_title" name="title" onChange={this.handleChangeTitle} value={this.state.movie_title}/>
                      <br/>
                      <label for="movie_plot">Movie Plot</label>
                      <br/>
                      <textarea type="text" id="movie_plot" name="plot" onChange={this.handleChangePlot} value={this.state.movie_plot}/>
                      <br/>
                      <label for="movie_year">Release Year</label>
                      <br/>
                      <input type="text" id="movie_year" name="year" onChange={this.handleChangeYear} value={this.state.movie_year}/>
                      <br/>
                      <label for="movie_runtime">Runtime</label>
                      <br/>
                      <input type="text" id="movie_runtime" name="runtime" onChange={this.handleChangeRuntime} value={this.state.movie_runtime}/>
                      <br/>
                      <label for="movie_poster">Poster URL</label>
                      <br/>
                      <input type="text" id="movie_poster" name="poster" onChange={this.handleChangePoster} value={this.state.movie_poster}/>
                      <br/>
                      <br/>
                      <input type="submit" value="Add Movie" onClick={this.submitMovie}/>
                      </form>
                      </span>
                    </div>
                  </Card>
                </span>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </BackgroundWrapper>
    );
  }
}

export default Admin;
