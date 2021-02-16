import React from 'react';
import { PageHeader, Input, Button } from 'antd';
import { Card } from 'antd';





class SignUpForm extends React.Component {
    state = { 
        status: false
     }
    render() { 
        return (
            <div>
                <Card 
                className="login-container"
                title="Sign Up With MovieBook"
                >
                <Input
                className="Input"
                placeholder="Enter your username"
                />
                <Input
                className="Input"
                placeholder="Enter your password"
                />
                <Input
                className="Input"
                placeholder="Enter your email"
                />
                <Button
                className="Button"
                type="primary"
                shape="round"
                >
                    Sign Up
                </Button>
                </Card>
            </div>
          );
    }
}
 
export default SignUpForm;