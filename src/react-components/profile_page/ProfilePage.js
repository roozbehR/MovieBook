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
  message,
} from "antd";
import "./style.css";
import { getRandomUser } from "../../models/user";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

function callback(key) {
  console.log(key);
}

class ProfilePage extends React.Component {
  state = {
    user: getRandomUser(),
    isFollowing: false,
  };

  clicked = (e) => {
    console.log("Clicked");
    let isFollowing = this.state.isFollowing;
    isFollowing = !isFollowing;
    this.setState({ isFollowing });
    {
      this.state.isFollowing
        ? message.success("Unfollowed")
        : message.success("Following");
    }
  };

  render() {
    return (
      <div className="page">
        <div>
          <NavBar />
        </div>
        <div classname="body">
          <Content>
            <Card style={{ marginLeft: 30, marginRight: 30, marginTop: 30 }}>
              <Card>
                <div className="Biograph">
                  <Row>
                    <Col>
                      <span className="profilephoto">
                        <Avatar
                          size={256}
                          className="photo"
                          src={this.state.user.picture}
                        />
                      </span>
                    </Col>
                    <Col style={{ marginLeft: 30 }}>
                      <Row>
                        <Col>
                          <h2 className="name">{this.state.user.fullName}</h2>
                        </Col>
                        <Col style={{ marginLeft: 30 }}>
                          <Button
                            type="primary"
                            shape="round"
                            onClick={this.clicked}
                          >
                            {this.state.isFollowing ? (
                              <p>Unfollow</p>
                            ) : (
                              <p>+ Follow</p>
                            )}
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <p>{this.state.user.biography}</p>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Card>
              <Divider style={{ backgroundColor: "black" }}></Divider>
              <div className="section">
                <Tabs
                  defaultActiveKey="1"
                  onChange={callback}
                  size="large"
                  centered="true"
                >
                  <TabPane tab="Favourite Movies" key="1">
                    <Row>
                      <Col span={3}>
                        <Card
                          style={{ marginLeft: "20px", maxWidth: 200 }}
                          cover={
                            <img
                              alt="trailer"
                              className="movieImage"
                              src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg"
                            />
                          }
                        >
                          <Meta
                            style={{ backgroundColor: "white" }}
                            title="Black Panther"
                          />
                        </Card>
                      </Col>
                      <Col span={3}>
                        <Card
                          style={{ marginLeft: "20px", maxWidth: 200 }}
                          cover={
                            <img
                              alt="trailer"
                              className="movieImage"
                              src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjI1NTk0NTc1OV5BMl5BanBnXkFtZTgwNTMwMTE4NDM@._V1_SY500_CR0,0,281,500_AL_.jpg"
                            />
                          }
                        >
                          <Meta
                            style={{ backgroundColor: "white" }}
                            title="Aiyaary"
                          />
                        </Card>
                      </Col>
                      <Col span={4}>
                        <Card
                          style={{ marginLeft: "20px", maxWidth: 200 }}
                          cover={
                            <img
                              alt="trailer"
                              className="movieImage"
                              src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyMjEwOTIwNV5BMl5BanBnXkFtZTgwOTkzNTMxNDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
                            />
                          }
                        >
                          <Meta
                            style={{ backgroundColor: "white" }}
                            title="The Post"
                          />
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="Reviews" key="2">
                    <Comment
                      avatar={
                        <Avatar
                          src={this.state.user.picture}
                          alt={this.state.user.fullName}
                        />
                      }
                      content={
                        <p>
                          Honestly think that Black Panther is one of the
                          greatest superhero movies of our time. The casting is
                          excellent and there is not a dull moment in the film.
                        </p>
                      }
                    />
                  </TabPane>
                  <TabPane tab="Recent Activity" key="3">
                    <p className="name">No Activity</p>
                  </TabPane>
                  <TabPane tab="Profile Info" key="4">
                    <Descriptions
                      title="User Info"
                      contentStyle={{ color: "white" }}
                      labelStyle={{ color: "white" }}
                    >
                      <Descriptions.Item
                        label="Username"
                        labelStyle={{ color: "white" }}
                      >
                        {this.state.user.username}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Full Name"
                        labelStyle={{ color: "white" }}
                      >
                        {this.state.user.fullName}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Followers"
                        labelStyle={{ color: "white" }}
                      >
                        {this.state.user.followingUsers.length}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Liked Movies"
                        labelStyle={{ color: "white" }}
                      >
                        {this.state.user.likedMovies.length}
                      </Descriptions.Item>
                    </Descriptions>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Content>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
