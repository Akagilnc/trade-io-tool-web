import React from 'react';

import './App.scss';
import { domain } from './constants';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: '',
      username: '',
      password: '',
      token: '',
      userGroup: ''
    };
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
        'Content-Type': 'application/json',
        Authorization: `token ${key}`
      },
      method: 'GET'
      //body: JSON.stringify(obj)
    })
      .then(
        /*(response) => {
              console.log(response);
              response.json();
            }*/
        response => response.json()
      )
      .then(data => {
        //console.log('inside data');
        //console.log(data);
        this.setState({ userGroup: data.groups[0] });
        this.setState({
          isLogin: true,
          token: key
        });
      })
      .catch(() => {
        //console.log("inside error");
        this.setState({
          isLogin: false
        });
      });
    setTimeout(() => {
      console.log(this.state.userGroup);
    }, 1);
  }
  handleLogin() {
    event.preventDefault();
    console.log('inside login');
    let obj = {};
    obj.username = this.state.username;
    obj.password = this.state.password;
    fetch(`${domain}rest-auth/login/`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('tradeToolToken', data.key);
        this.auth();
      })
      .catch(errors => console.log(errors));
    //console.log(obj);
  }

  handleChange() {
    console.log('inside handleChange');
    if (event.target.id == 'username') {
      //if(event.target.controlId=="username")
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              //<Login {...props} onChange={this.handleChange} onClick={this.handleLogin} />
              <Login onChange={this.handleChange} onClick={this.handleLogin} />
            )}
          />
          <Route
            path="/products"
            render={() => (
              //<Products {...props} userGroup={this.state.userGroup} isLogin={this.state.isLogin} token={this.state.token} />
              <Products
                userGroup={this.state.userGroup}
                isLogin={this.state.isLogin}
                token={this.state.token}
              />
            )}
          />
          {/*<Route path="/products" component={Products} />*/}
        </Switch>
        {/*<Login />
        <Products />*/}
        {/*{component}*/}
      </div>
    );
  }
}
