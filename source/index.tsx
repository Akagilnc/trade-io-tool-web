// @ts-ignore
import { auto } from 'browser-unhandled-rejection';

import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import Login from './page/Login';
import ProductList from './page/Product';
import ProductDetail from './page/Product/detail';
import AppHeader from './component/AppHeader';

import { destroySession } from './service';

auto();

window.addEventListener('unhandledrejection', ({ reason }) => {
  if ([401, 403].includes((reason.response || '').status)) destroySession();
});

render(
  <Router>
    <AppHeader />

    <Route
      path="/"
      exact
      render={() => (
        <Redirect to={localStorage.token ? '/products' : '/login'} />
      )}
    />
    <Route path="/login" component={Login} />
    <Route path="/products" exact component={ProductList} />
    <Route path="/products/:id" component={ProductDetail} />
  </Router>,
  document.querySelector('body > main')
);
