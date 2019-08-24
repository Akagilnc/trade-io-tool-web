import React from "react";
//import { Form } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
    render () {
        return (
            <div id="login">
                {/*<Button variant="primary">Primary</Button>*/}
                <Form  id="loginForm">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button id="submit" variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default Login;