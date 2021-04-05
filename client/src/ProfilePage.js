import React from "react";
import NavBar from "./react-components/navbar/navbar";
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
import "./profile-style.css";
import { getRandomUser } from "./models/user";
import BackgroundWrapper from "./react-components//background-wrapper/background-wrapper";
import { getUser } from './actions/user'
import { followUser, getOwnReviews, getOwnComments } from "./actions/profile";
import Review from './react-components/review/review'

const { Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

class ProfilePage extends React.Component {
  state = {
    user: getRandomUser(),
    viewingUser: {
      username: null,
      isFollowing: false
    },
    notFound: false,
    reviews: [],
    commentReviews: []
  };

  componentDidMount = () => {
    getUser(this, this.props.match.params.username);
  }

  clicked = (e) => {
    followUser(this, message, this.state.viewingUser.username);
  };

  tabChanged = (index) => {
    if (index == 2) {
      getOwnReviews(this);
    } else if (index == 3) {
      getOwnComments(this);
    }
  }

  render() {
    return (
      <BackgroundWrapper>
        <NavBar user={this.props.user} />
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
                          src={this.state.viewingUser.picture}
                        />
                      </span>
                    </Col>
                    <Col style={{ marginLeft: 30 }}>
                      <Row>
                        <Col>
                          <h2 className="name">{this.state.viewingUser.username}</h2>
                        </Col>
                        {this.state.viewingUser.username != this.props.user.username &&
                          <Col style={{ marginLeft: 30 }}>
                            <Button
                              type="primary"
                              shape="round"
                              onClick={this.clicked}
                            >
                              {this.state.viewingUser.isFollowing ? (
                                <p>Unfollow</p>
                              ) : (
                                <p>+ Follow</p>
                              )}
                            </Button>
                          </Col>
                        }
                      </Row>
                      <Row>
                        <p>{this.state.viewingUser.biography}</p>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Card>
              <Divider style={{ backgroundColor: "black" }}></Divider>
              <div className="section">
                <Tabs
                  defaultActiveKey="1"
                  size="large"
                  centered="true"
                  onChange={this.tabChanged}
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
                    {this.state.reviews.map(review =>
                      <Review
                        addCommentEnabled={false}
                        review={review}
                        showMovie="true"
                      />
                    )}
                  </TabPane>
                  <TabPane tab="Comments" key="3">
                    {this.state.commentReviews.map(review =>
                      <Review
                        addCommentEnabled={false}
                        showComments="true"
                        review={review}
                        showMovie="true"
                      />
                    )}
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
                        {this.state.viewingUser.username}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Full Name"
                        labelStyle={{ color: "white" }}
                      >
                        {this.state.viewingUser.fullName}
                      </Descriptions.Item>
                      {/* <Descriptions.Item
                        label="Followers"
                        labelStyle={{ color: "white" }}
                      >
                        {this.state.viewingUser.followingUsers.length}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Liked Movies"
                        labelStyle={{ color: "white" }}
                      >
                        {this.state.viewingUser.likedMovies.length}
                      </Descriptions.Item> */}
                    </Descriptions>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Content>
        </div>
      </BackgroundWrapper>
    );
  }
}

export default ProfilePage;
