import React from "react";
//import { Form } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.login = this.login.bind(this);
    }

    /*componentDidUpdate(){
        console.log("inside didupdate");
    }*/
    handleUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    handlePass(event) {
        this.setState({
            password: event.target.value
        });
    }

    login() {
        console.log("inside login");
        let obj = {};
        obj.username=this.state.username;
        obj.password=this.state.password;
        fetch('http://52.83.152.70:8000/rest-auth/login/',
            {
                headers: {"Content-Type": "application/json"},
                method: 'POST',
                body: JSON.stringify(obj)
            }).then(
                (response) => response.json()
            ).then(
                (data) => {
                    localStorage.setItem('tradeToolToken', data.key);
                    console.log(localStorage.getItem('tradeToolToken'));
                }
            ).catch(
                (errors) => console.log(errors)
            )
            //console.log(obj);
    }

render() {
    return (
        <div id="login">
            {/*<Button variant="primary">Primary</Button>*/}
            <Form id="loginForm" >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    {/*<Form.Control onChange={this.handleUsername} type="text" placeholder="Enter username" required />*/}
                    *<Form.Control id="username" onChange={this.props.onChange} type="text" placeholder="Enter username" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    {/*<Form.Control onChange={this.handlePass} type="password" placeholder="Password" required />*/}
                    <Form.Control id="password" onChange={this.props.onChange} type="password" placeholder="Password" required />
                </Form.Group>
                {/*<Button id="submit" onClick={this.login} type="submit">Submit</Button>*/}
                <Button id="submit" onClick={this.props.onClick} type="button">Submit</Button>
                {/*<Button id="submit" type="submit" onSubmit={this.props.onClick}>Submit</Button>*/}
                {/*<input type="submit" onClick={this.login()} value="submit" />*/}
            </Form>
        </div>
    );
}
}

export default Login;