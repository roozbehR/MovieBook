import React from "react";
import { PageHeader, Input, Button } from "antd";
import { Card } from "antd";
import "./styles.css";

class SignUpForm extends React.Component {
  state = {
    status: false,
  };
  render() {
    return (
      <div>
        <Card className="login-container" title="Sign Up With MovieBook">
          <Input className="sign-up-input" placeholder="Enter your username" />
          <Input className="sign-up-input" placeholder="Enter your password" />
          <Input className="sign-up-input" placeholder="Enter your email" />
          <Button className="sign-up-button" type="primary" shape="round">
            Sign Up
          </Button>
        </Card>
      </div>
    );
  }
}

export default SignUpForm;
