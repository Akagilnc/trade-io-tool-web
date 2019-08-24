import React from "react";
import { hot } from "react-hot-loader";
import "./App.scss";
import {domain} from "./constants";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login";
import Products from "./components/Products";

import Button from 'react-bootstrap/Button';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLogin: '',
      username: '',
      password: '',
      token: '',
    }
    this.handleLogin=this.handleLogin.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.auth=this.auth.bind(this);
  }

  componentDidMount(){
    this.auth();
  }

  auth(){
    let key=localStorage.getItem('tradeToolToken');
    //console.log(test);
    //if (localStorage.getItem('tradeToolToken')){
    if(key && key != 'undefined'){
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
    }
  }
  handleLogin() {
    //console.log("inside login");
    let obj = {};
    obj.username=this.state.username;
    obj.password=this.state.password;
    fetch(`${domain}rest-auth/login/`,
        {
            headers: {"Content-Type": "application/json"},
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
  
  handleChange(){
    if (event.target.id=="username"){
    //if(event.target.controlId=="username")
      this.setState({username: event.target.value});
    }else {
      this.setState({password: event.target.value});
    }
  }
  render() {
    let component=this.state.isLogin?<Products token={this.state.token} />:<Login onChange={this.handleChange} onClick={this.handleLogin} />;
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
