import React from "react";
import NavBar from "../navbar/navbar";
import { Tabs, Card, Button, Modal, message } from "antd";
import "./style.css";
import { getAllUsers } from "../../models/user";
import { getAllMovies } from "../../models/movie";
import { uid } from "react-uid";
import BackgroundWrapper from "../background-wrapper/background-wrapper";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class Admin extends React.Component {
  state = {
    users: getAllUsers(),
    movies: getAllMovies(),
    movi: "",
    isModalVisible: false,
    movDesc: "",
  };

  clickedUser = (val) => {
    console.log("clicked");
    console.log(val);

    let users = [...this.state.users];
    let user = { ...users[val - 1] };
    user.isAdmin = !user.isAdmin;
    users[val - 1] = user;
    this.setState({ users });
    {
      user.isAdmin ? message.success("Promoted") : message.success("Demoted");
    }
  };

  clickedMovie = (val) => {
    console.log("clicked");
    console.log(val);
    let movies = [...this.state.movies];
    let movi = { ...movies[val - 1] };
    this.setState({ movi });
    let isModalVisible = true;
    this.setState({ isModalVisible });
  };

  handleOk = () => {
    console.log("Ok");
    let movieDescr = this.state.movDesc;
    let movi = this.state.movi;
    let movies = [...this.state.movies];
    movi.description = movieDescr;
    movies[movi.id - 1] = movi;
    this.setState({ movi });
    movies[movi.id - 1] = movi;
    this.setState({ movies });
    let isModalVisible = false;
    let movDesc = "";
    this.setState({ movDesc });
    this.setState({ isModalVisible });
    message.success("Description Updated");
  };

  handleCancel = () => {
    console.log("Cancel");
    let isModalVisible = false;
    this.setState({ isModalVisible });
    message.error("Action Cancelled");
  };

  handleChange = (event) => {
    let movDesc = event.target.value;
    //console.log(movDesc)
    this.setState({ movDesc });
  };

  render() {
    return (
      <BackgroundWrapper>
        <NavBar />
        <div className="page-container">
          <div>
            <Card style={{ marginLeft: 30, marginTop: 30, marginRight: 30 }}>
              <h2 className="welcome">Welcome Admin</h2>
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
                <Card
                  style={{ marginLeft: 30, marginTop: 30, marginRight: 30 }}
                >
                  <table className="Table">
                    <tbody>
                      <tr>
                        <th className="cell">Full Name</th>
                        <th className="cell">Username</th>
                        <th className="cell">Admin Rights</th>
                        <th className="cell">Switch Role</th>
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
                                onClick={() => this.clickedUser(user.id)}
                              >
                                {user.isAdmin ? (
                                  <p>Demote to User</p>
                                ) : (
                                  <p>Promote to Admin</p>
                                )}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card>
              </TabPane>
              <TabPane tab="Movies" key="2">
                <Card
                  style={{ marginLeft: 30, marginTop: 30, marginRight: 30 }}
                >
                  <table className="Table">
                    <tbody>
                      <tr>
                        <th className="cell">Title</th>
                        <th className="cell">Year Released</th>
                        <th className="cell">Rating</th>
                        <th className="cell">Edit</th>
                      </tr>
                      {this.state.movies.map((movie) => {
                        return (
                          <tr key={uid(movie)}>
                            <td className="cell">{movie.title}</td>
                            <td className="cell">{movie.year}</td>
                            <td className="cell">{movie.rating}</td>
                            <td className="cell">
                              {movie.isAdmin ? <p>Yes</p> : <p>No</p>}
                            </td>
                            <td className="cell">
                              <Button
                                type="primary"
                                shape="round"
                                onClick={() => this.clickedMovie(movie.id)}
                              >
                                Edit
                              </Button>
                              <Modal
                                title={this.state.movi.title}
                                visible={this.state.isModalVisible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                              >
                                <h2>Current Description</h2>
                                <p>{this.state.movi.description}</p>
                                <h2>New Description</h2>
                                <textarea
                                  value={this.state.movDesc}
                                  onChange={this.handleChange}
                                ></textarea>
                              </Modal>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Card>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </BackgroundWrapper>
    );
  }
}

export default Admin;
