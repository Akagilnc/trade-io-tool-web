// @ts-ignore
import { auto } from 'browser-unhandled-rejection';

import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

import Login from './page/Login';
import ProductList from './page/Product';
import ProductDetail from './page/Product/detail';

auto();

window.addEventListener('unhandledrejection', ({ reason }) => {
  if ((reason.response || '').status === 401) {
    localStorage.clear();

    location.replace('/');
  }
});

render(
  <Router>
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand className="text-white" href="/">
          Trade port
        </Navbar.Brand>
      </Container>
    </Navbar>

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
