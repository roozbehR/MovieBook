import React from "react";
import { Tabs, Card, Button, PageHeader, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./login-form.css";
import Password from "antd/lib/input/Password";
import { getUsernamePassword } from "../../models/user";

const { TabPane } = Tabs;

class LoginForm extends React.Component {
  state = {
    login: {
      username: "",
      password: ""
    },
    signup: {
      username: "",
      passowrd: "",
      email: ""
    }
  };

  setLoginState = (e) => {
    const inputType = e.target.className;
    const inputValue = e.target.value;
    inputType === "ant-input login-input" ? this.setState({ login: { username: inputValue, password: this.state.login.password } })
      : this.setState({ login: { username: this.state.login.username, password: inputValue } });
  }

  setSignUpState = (e) => {

  }

  handleLogin = () => {
    const username = this.state.login.username;
    const password = this.state.login.password;
    const user = getUsernamePassword(username, password)
    if (user.length > 0) {
      localStorage["user"] = JSON.stringify(user);
      window.location.reload();
    } else {
      message.error("Wrong username or password");
    }

  }

  handleSignUp = () => {
    message.info("Sign up form is not functional at the moment")
  }


  render() {
    return (
      <div>
        <Card>
          <h2 className="welcome">Welcome to MovieBook!</h2>
        </Card>
        <Tabs
          className="login-signup-card"
          defaultActiveKey="1"
          size="large"
          centered="true"
        >
          <TabPane tab="Login" key="1">
            <Card>
              <Input className="login-input" placeholder="Enter your username" onChange={this.setLoginState} value={this.state.login.username} />
              <Input.Password className="login-password" placeholder="Enter your password" onChange={this.setLoginState} value={this.state.login.password} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              <Button className="login-button" type="primary" shape="round" onClick={this.handleLogin}>
                Sign In
              </Button>
            </Card>
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <Card>
              <Input className="signup-input" placeholder="Enter your email" />
              <Input className="signup-input" placeholder="Enter your username" />
              <Input.Password className="signup-password" placeholder="Enter your password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              <Button className="signup-button" type="primary" shape="round" onClick={this.handleSignUp}>
                Sign Up
              </Button>
            </Card>
          </TabPane>
        </ Tabs>
      </div>
    );
  }
}

export default LoginForm;
