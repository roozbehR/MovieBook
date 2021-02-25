import React from "react";
import  NavBar  from "../navbar/navbar";
import { Images } from "../themes";
import { Layout, Divider, Tabs, Descriptions, Avatar } from 'antd';
import "./ProfilePage.css"

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function callback(key){
    console.log(key)
}

class ProfilePage extends React.Component {

    render(){
        return(
            <div>
                <div>
                    <NavBar />
                </div>
                <div classname="body">
                    <Content className="body">
                        <div className="Biograph"> 
                            <span className="profilephoto"> 
                                <img className="photo" src="https://randomuser.me/api/portraits/men/28.jpg"/>
                            </span>
                            
                        </div>
                        <Divider style={{ 'backgroundColor': 'white'}}></Divider>
                        <div className="section">
                            <Tabs defaultActiveKey="1" onChange={callback} size="large" centered="true" style ={{ 'color': 'white'}}>
                                <TabPane tab="Favourite Movies" key="1">
                                    No Movies Liked
                                </TabPane>
                                <TabPane tab="Reviews" key="2">
                                    No Reviews Available
                                </TabPane>
                                <TabPane tab="Recent Activity" key="3">
                                    No Activity
                                </TabPane>
                                <TabPane tab="Profile Info" key="4">
                                    <Descriptions title="User Info" style ={{ 'color': 'white'}}>
                                        <Descriptions.Item label="Username" style ={{ 'color': 'white'}}>user</Descriptions.Item>
                                        <Descriptions.Item label="Full Name">User Name</Descriptions.Item>
                                        <Descriptions.Item label="Followers">5</Descriptions.Item>
                                        <Descriptions.Item label="Liked Movies">7</Descriptions.Item>
                                    </Descriptions>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Content>
                </div>
            </div>
        )
    }

}

export default ProfilePage;
