import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from "./App.js";
import Product from './components/Product.js';

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state ={}
    }
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path={`/product/:product`}  component={Product} />
                </Switch>
            </div>
        );
    }
}

export default Routes;