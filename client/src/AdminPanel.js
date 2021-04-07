import React from "react";
import NavBar from "./react-components/navbar/navbar";
import { Tabs, Card, Button, Modal, message, Form, Input, InputNumber } from "antd";
import "./admin-style.css";
import { getAllUsers, deleteUser } from "./actions/user";
import { getAllMovies } from "./models/movie";
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
    movie: {
      title: "",
      plot: "",
      year: "",
      runtime: ""
    },
    users: [],
    deleteStatus: "",
  };

  componentWillMount() {
    getAllUsers(this);
    console.log(this.state.users);
  };

  clickedDelete = (val) => {
    console.log("delete");
    console.log(val);
    deleteUser(val);
    getAllUsers(this);
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
      user.isAdmin ? (
        message.success("Promoted")
      ) : (
        message.success("Demoted")
      )
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
    this.setState({ movies })
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
    let input = event.target.name;
    let item = event.target.value;
    console.log(input);
    console.log(item); 
    if (input === "title"){
      this.setState({ movie: { title: item } });
    }
    if (input === "plot"){
      this.setState({ movie: { plot: item } });
    }
    if (input === "year"){
      this.setState({ movie: { year: item } });
    }
    if (input === "runtime"){
      this.setState({ movie: { runtime: item } });
    }
    console.log("title")
    console.log(this.state.movie.title)
    console.log("plot")
    console.log(this.state.movie.plot)
    console.log("year")
    console.log(this.state.movie.year)
    //this.setState({ movDesc });
  };


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
                                onClick={() => this.clickedUser(user.id)}
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
                <form>
                  <label for="movie_title">Movie Title</label>
                  <input type="text" id="movie_title" name="title" onChange={this.handleChange} value={this.state.movie.title}/>
                  <br/>
                  <label for="movie_plot">Movie Plot</label>
                  <textarea type="text" id="movie_plot" name="plot" onChange={this.handleChange} value={this.state.movie.plot}/>
                  <br/>
                  <label for="movie_year">Release Year</label>
                  <input type="text" id="movie_year" name="year" onChange={this.handleChange} value={this.state.movie.year}/>
                  <br/>
                  <label for="movie_runtime">Runtime</label>
                  <input type="text" id="movie_runtime" name="runtime" onChange={this.handleChange} value={this.state.movie.runtime}/>
                  
                  <br/>
                  </form>
                  {this.state.movie.title}<br></br>
                  {this.state.movie.plot}<br></br>
                  {this.state.movie.year}<br></br>
                  {this.state.movie.runtime}<br></br>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </BackgroundWrapper>
    );
  }
}

export default Admin;
