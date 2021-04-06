import React from "react";
import NavBar from "./react-components/navbar/navbar";
import {
  Layout,
  Divider,
  Tabs,
  Badge,
  Avatar,
  Card,
  Row,
  Col,
  Button,
  message,
  Tooltip,
  Input
} from "antd";
import { EditOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import "./profile-style.css";
import BackgroundWrapper from "./react-components//background-wrapper/background-wrapper";
import { getUser } from './actions/user'
import { followUser, getProfileReviews, getProfileComments, getProfileFavouriteMovies, updateProfileBiography } from "./actions/profile";
import Review from './react-components/review/review'

const { Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

class ProfilePage extends React.Component {
  state = {
    viewingUser: {
      username: null,
      isFollowing: false,
      numberOfFollowers: 0,
      bigraphy: ''
    },
    notFound: false,
    favouriteMovies: [],
    reviews: [],
    commentReviews: [],
    editBio: false,
    editBioText: ''
  };

  componentDidMount = () => {
    getUser(this, this.props.match.params.username);
    getProfileFavouriteMovies(this, this.props.match.params.username);
  }

  clicked = (e) => {
    followUser(this, message, this.state.viewingUser.username);
  };

  tabChanged = (index) => {
    if (index == 1) {
      getProfileFavouriteMovies(this, this.state.viewingUser.id);
    } else if (index == 2) {
      getProfileReviews(this, this.state.viewingUser.id);
    } else if (index == 3) {
      getProfileComments(this, this.state.viewingUser.id);
    }
  }

  toggleEditBio = () => {
    this.setState({ editBio: !this.state.editBio, editBioText: this.state.viewingUser.biography });
  }

  handleBiographyInput = (e) => {
    this.setState({ editBioText: e.target.value });
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
                          <h2 className="name">{this.state.viewingUser.fullName}
                          </h2>
                        </Col>
                        <Badge className='badge-followers' count={`${this.state.viewingUser.numberOfFollowers} Followers`} />
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
                        {this.state.viewingUser.username == this.props.user.username && this.state.editBio &&
                          <div>
                            <Tooltip title="Cancel Editing Biography" className="tooltip-edit-bio" onClick={this.toggleEditBio} >
                              <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
                            </Tooltip>
                            <Tooltip title="Save Biography" className="tooltip-edit-bio" onClick={() => updateProfileBiography(this)} >
                              <Button type="primary" shape="circle" icon={<SaveOutlined />} />
                            </Tooltip>
                          </div>

                        }
                        {this.state.viewingUser.username == this.props.user.username && !this.state.editBio &&
                          <Tooltip title="Edit Biography" className="tooltip-edit-bio" onClick={this.toggleEditBio} >
                            <Button type="primary" shape="circle" icon={<EditOutlined />} />
                          </Tooltip>
                        }
                      </Row>
                      <Row>
                        {this.state.editBio ?
                          <Input className="input-bio" value={this.state.editBioText} onChange={this.handleBiographyInput} maxLength={150} />
                          :
                          <p>{this.state.viewingUser.biography}</p>
                        }
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
                  {/* <TabPane tab="Favourite Movies" key="1">
                    <Row>
                      {this.state.favouriteMovies.map(m =>
                        <Col span={4}>
                          <Card
                            style={{ marginLeft: "20px", maxWidth: 200 }}
                            cover={
                              <img
                                alt="trailer"
                                className="movieImage"
                                src={m.poster ?? '/images/default_poster.jpg'}
                              />
                            }
                          >
                            <Meta
                              title={<a href={`/ movie / ${m._id}`}>{m.title}</a>}
                            />
                          </Card>
                        </Col>
                      )}
                    </Row>
                  </TabPane> */}
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
                </Tabs>
              </div>
            </Card>
          </Content>
        </div>
      </BackgroundWrapper >
    );
  }
}

export default ProfilePage;
