import React from "react";
import { hot } from "react-hot-loader";
import {Switch, Route} from 'react-router-dom';
import "./App.scss";
import { domain } from "./constants";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login";
import Products from "./components/Products";

import Button from 'react-bootstrap/Button';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: '',
      username: '',
      password: '',
      token: '',
      userGroup:'',
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.auth = this.auth.bind(this);
  }

  componentDidMount() {
    this.auth();
  }

  auth() {
    //console.log("inside auth");
    let key = localStorage.getItem('tradeToolToken');
    //console.log('key: '+ key);
    /*(if(key && key != 'undefined'){
      //console.log("inside true");
      this.setState({
        isLogin: true,
        token: key
      });
    }else {
      //console.log("inside false");
      this.setState({
        isLogin: false
      });
    }*/

    fetch(`${domain}io_tool/get-current-user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${key}`
      },
      method: 'GET',
      //body: JSON.stringify(obj)
    }).then(
      /*(response) => {
        console.log(response);
        response.json();
      }*/
      (response) => response.json()
    ).then(
      (data) => {
        //console.log('inside data');
        //console.log(data);
        this.setState({ userGroup: data.groups[0] });
        this.setState({
          isLogin: true,
          token: key
        });
      }
    ).catch(
      (errors) => {
        //console.log("inside error");
        this.setState({
          isLogin: false
        });
      }
    )
  }
  handleLogin() {
    //console.log("inside login");
    let obj = {};
    obj.username = this.state.username;
    obj.password = this.state.password;
    fetch(`${domain}rest-auth/login/`,
      {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify(obj)
      }).then(
        (response) => response.json()
      ).then(
        (data) => {
          localStorage.setItem('tradeToolToken', data.key);
          this.auth();
          //console.log(localStorage.getItem('tradeToolToken'));
        }
      ).catch(
        (errors) => console.log(errors)
      )
    //console.log(obj);
  }

  handleChange() {
    console.log("inside handleChange");
    if (event.target.id == "username") {
      //if(event.target.controlId=="username")
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }
  render() {
    let component = this.state.isLogin ? <Products userGroup={this.state.userGroup} token={this.state.token} /> : <Login onChange={this.handleChange} onClick={this.handleLogin} />;
    return (
      <div>
        {/*<Login />
        <Products />*/}
        {component}
      </div>
    );
  }
}

export default hot(module)(App);
