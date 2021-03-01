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


class Admin extends React.Component {
    render() {
      return (
        <div className="AdminPage">
          <div><NavBar /></div>
        </div>
      );
    }
  }
  
  export default Admin;