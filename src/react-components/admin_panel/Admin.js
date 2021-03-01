import React from "react";
import NavBar from "../navbar/navbar";
import {
  Layout,
  Divider,
  Tabs,
  Descriptions,
  Avatar,
  Card,
  Row,
  Col,
  Button,
  Comment,
} from "antd";
import "./style.css";
import { getAllUsers } from "../../models/user";
import { getAllMovies } from "../../models/movie";
import { uid } from "react-uid";

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}


class Admin extends React.Component {

    state = {
        users: getAllUsers(),
        movies: getAllMovies()
      };

    clicked = (val) => {
        console.log("clicked");
        console.log(val)

        let users = [...this.state.users];
        let user = {...users[val-1]}
        user.isAdmin = !user.isAdmin;
        users[val-1] = user
        this.setState({users});
        
    }
    render() {
      return (
        <div className="AdminPage">
          <div>
              <NavBar />
          </div>
          <br />
          <div>
                <Card style={{ marginLeft: 30, marginTop: 30, marginRight: 30 }}>
                    <h2 className='welcome'>Welcome Admin</h2>
                </Card>
                <br />
                <Tabs defaultActiveKey="1"
                    onChange={callback}
                    size="large"
                    centered="true"
                >
                    <TabPane tab="Users" key="1"></TabPane>
                    <TabPane tab="Movies" key="2"></TabPane>
                </Tabs>
          </div>
          <div>
              {this.state.users.map(user => {
                  return (
                      <div>
                        <p key={uid(user)}>{user.fullName} - {user.isAdmin}</p>
                        {user.isAdmin
                            ? <p>Yes</p>
                            : <p>no</p>
                        }
                        <Button type="primary"
                                shape="round"
                                onClick={() => this.clicked(user.id)}>
                                    {user.isAdmin
                                        ? <p>Demote to User</p>
                                        : <p>Promote to Admin</p>
                                    }
                                </Button>

                      </div>
                  )
              })} 
          </div>
        </div>
      );
    }
  }
  
export default Admin;