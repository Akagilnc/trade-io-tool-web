import React from "react";
import { domain } from "../constants";
import { Redirect } from 'react-router-dom';

/*let userGroup;
let isLogin;
function auth() {
  let key = localStorage.getItem('tradeToolToken');
  fetch(`${domain}io_tool/get-current-user`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `token ${key}`
    },
    method: 'GET',
    //body: JSON.stringify(obj)
  }).then(
    //(response) => {
    //console.log(response);
    //response.json();
    //}
    (response) => response.json()
  ).then(
    (data) => {
      console.log('inside data');
      console.log(data);
      userGroup = data.groups[0];
      isLogin = true;
      //this.setState({ userGroup: data.groups[0] });
      //this.setState({
      ]]isLogin: true,
        //token: key
      ]]});
    }
  ).catch(
    (errors) => {
      console.log("inside error");
      isLogin = false;
    }
  )
}
auth();
console.log('isLogin ' + isLogin);*/
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroup: '',
      isLogin: ''
    };
    this.auth = this.auth.bind(this);
  }

  componentDidMount() {
    this.auth();
  }

  auth(){
      let key = localStorage.getItem('tradeToolToken');
      fetch(`${domain}io_tool/get-current-user`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `token ${key}`
          },
          method: 'GET',
          //body: JSON.stringify(obj)
        }).then(
          //(response) => {
            //console.log(response);
            //response.json();
          //}
          (response) => response.json()
        ).then(
          (data) => {
            console.log('inside data');
            console.log(data);
            this.setState({ userGroup: data.groups[0] });
            this.setState({
              isLogin: true,
              //token: key
            });
          }
        ).catch(
          (errors) => {
            console.log("inside error");
            this.setState({
              isLogin: false
            });

          }
        )
  }
  render() {
    console.log("inside render");
    console.log(this.state.isLogin);
    //if (this.state.isLogin == false) { return <Redirect to='/' />; }
    let content = (this.state.isLogin)?
      <h1>{this.props.match.params.product}</h1>:
      <Redirect to='/' />;
    return (
      <div>
        {content}
      </div>
    );
  }
}
export default Product;