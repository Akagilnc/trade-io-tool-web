import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.scss";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login";

import Button from 'react-bootstrap/Button';
class App extends Component {
  render() {
    return (
      /*<div className="App">
        <h1> Hello </h1>
      </div>*/
      <Login />
    );
  }
}

export default hot(module)(App);
