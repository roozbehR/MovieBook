import React from 'react';
import { PageHeader, Input, Button } from 'antd';
import { Card } from 'antd';
import './login-form.css';





class LoginForm extends React.Component {
    state = { 
        status: true
     }
    render() { 
        return (
            <div>
                <Card 
                className="login-container"
                title="Sign In With MovieBook"
                >
                {/* <PageHeader
                className="login-header"
                title="Sign In With MovieBook"
                /> */}
                <Input
                className="login-input"
                placeholder="Enter your username"
                />
                <Input
                className="login-input"
                placeholder="Enter your password"
                />
                <Button
                className="login-button"
                type="primary"
                shape="round"
                >
                    Sign In
                </Button>
                <p className="make-account-text">
                    Don't have an account yet? Create an account
                </p>
                </Card>
            </div>
          );
    }
}
 
export default LoginForm;