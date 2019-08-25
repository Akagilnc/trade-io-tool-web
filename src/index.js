import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter,HashRouter } from 'react-router-dom';

import Routes from './Routes.js';
import App from "./App.js";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>,
    document.getElementById("root")
);
