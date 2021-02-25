import React from "react";
import  NavBar  from "../navbar/navbar";
import { Images } from "../themes";
import { Layout, Divider, Tabs, Descriptions, Avatar, Card, Row, Col, Button, Comment } from 'antd';
import "./ProfilePage.css"
import Column from "antd/lib/table/Column";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

function callback(key){
    console.log(key)
}

class ProfilePage extends React.Component {

    clicked = e => {
        console.log("Clicked")
    };

    render(){
        return(
            <div>
                <div>
                    <NavBar />
                </div>
                <div classname="body">
                    <Content>
                        <Card style={{ marginLeft: 30, marginRight: 30, marginTop: 30}}>
                            <Card>
                                    <div className="Biograph"> 
                                    <Row>
                                        <Col>
                                            <span className="profilephoto"> 
                                                <Avatar size={256} className="photo" src="https://randomuser.me/api/portraits/men/28.jpg"/>
                                            </span>
                                        </Col>
                                        <Col style={{ marginLeft: 30}}>
                                            <Row>
                                                <Col>
                                                    <h1>Shisei Naka</h1>
                                                </Col>
                                                <Col style={{marginLeft: 30}}>
                                                    <Button type="primary" shape="round" onClick={this.clicked}>+ Follow</Button>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <p>A critic that enjoys writing movies reviews, especially on superhero movies</p> 
                                            </Row>
                                        </Col>
                                    </Row>
                                    </div>
                            </Card>
                            <Divider style={{ 'backgroundColor': 'black'}}></Divider>
                                <div className="section">
                                    <Tabs defaultActiveKey="1" onChange={callback} size="large" centered="true">
                                        <TabPane tab="Favourite Movies" key="1">
                                            <Row >
                                                <Col span={3}>
                                                    <Card 
                                                        style={{ maxWidth: 200 }}
                                                        cover={<img alt="trailer" className="movieImage" src="https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SY500_CR0,0,337,500_AL_.jpg" />}>
                                                            <Meta title="Black Panther" />  
                                                    </Card>
                                                </Col>
                                                <Col span={3}>
                                                    <Card 
                                                    style={{ maxWidth: 200 }}
                                                    cover={<img alt="trailer" className="movieImage" src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjI1NTk0NTc1OV5BMl5BanBnXkFtZTgwNTMwMTE4NDM@._V1_SY500_CR0,0,281,500_AL_.jpg" />}>
                                                        <Meta title="Aiyaary" />  
                                                    </Card>
                                                </Col>
                                                <Col span={3}>
                                                    <Card 
                                                        style={{ maxWidth: 200 }}
                                                        cover={<img alt="trailer" className="movieImage" src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyMjEwOTIwNV5BMl5BanBnXkFtZTgwOTkzNTMxNDM@._V1_SY500_CR0,0,337,500_AL_.jpg" />}>
                                                            <Meta title="The Post" />  
                                                    </Card>
                                                </Col>
                                            </Row>     
                                        </TabPane>
                                        <TabPane tab="Reviews" key="2">
                                            <Comment 
                                                avatar={<Avatar src="https://randomuser.me/api/portraits/men/28.jpg" alt="Shisei Naka" />} 
                                                content={
                                                    <p>
                                                        Honestly think that Black Panther is one of the greatest superhero movies of our time.
                                                        The casting is excellent and there is not a dull moment in the film.
                                                    </p>
                                                }
                                            />
                                        </TabPane>
                                        <TabPane tab="Recent Activity" key="3">
                                            No Activity
                                        </TabPane>
                                        <TabPane tab="Profile Info" key="4">
                                            <Descriptions title="User Info" style ={{ 'color': 'white'}}>
                                                <Descriptions.Item label="Username" style ={{ 'color': 'white'}}>shisein</Descriptions.Item>
                                                <Descriptions.Item label="Full Name">Shisei Naka</Descriptions.Item>
                                                <Descriptions.Item label="Followers">5</Descriptions.Item>
                                                <Descriptions.Item label="Liked Movies">3</Descriptions.Item>
                                            </Descriptions>
                                        </TabPane>
                                    </Tabs>
                                </div>
                        </Card>
                    </Content>
                </div>
            </div>
        )
    }

}

export default ProfilePage;
