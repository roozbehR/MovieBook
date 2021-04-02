import React from "react";
import { Tabs, Card, Button, PageHeader, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./login-form.css";
import { login, signup } from '../../actions/user'

const { TabPane } = Tabs;

class LoginForm extends React.Component {
  state = {
    login: {
      username: "",
      password: "",
    },
    signup: {
      username: "",
      password: "",
      email: "",
    },
  };

  setLoginState = (e) => {
    const inputType = e.target.className;
    const inputValue = e.target.value;
    inputType === "ant-input login-input" ? this.setState({ login: { username: inputValue, password: this.state.login.password } })
      : this.setState({ login: { username: this.state.login.username, password: inputValue } });
  };

  setSignUpState = (e) => { 
    
    const inputType =  e.target.className;
    const inputValue = e.target.value;
    if (inputType === "ant-input signup-input-email") {
      this.setState({signup: { username: this.state.signup.username, password: this.state.signup.password, email: inputValue}});
    } else if (inputType === "ant-input signup-input-username") {
      this.setState({signup: { username: inputValue, password: this.state.signup.password, email: this.state.signup.email}});
    } else {
      this.setState({signup: { username: this.state.signup.username, password: inputValue, email: this.state.signup.email}});
    }
  };

  handleLogin = (user) => {
    if (user) {
      window.location.reload();
    } else {
      message.error("Wrong username or password");
    }
  };

  handleSignUp = () => {
    message.info("Sign up form is not functional at the moment")
  };


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
              <Button className="login-button" type="primary" shape="round" onClick={() => login(this)}>
                Sign In
              </Button>
            </Card>
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <Card>
              <Input className="signup-input-email" placeholder="Enter your email" onChange={this.setSignUpState} value={this.state.signup.email} />
              <Input className="signup-input-username" placeholder="Enter your username" onChange={this.setSignUpState} value={this.state.signup.username} />
              <Input.Password className="signup-password" placeholder="Enter your password" onChange={this.setSignUpState} value={this.state.signup.password} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
              <Button className="signup-button" type="primary" shape="round" onClick={() => signup(this)}>
                Sign Up
              </Button>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default LoginForm;
