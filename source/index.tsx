import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';

import Login from './page/Login';

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
      exact
      path="/"
      render={() => (
        <Redirect to={localStorage.token ? '/products' : '/login'} />
      )}
    />
    <Route path="/login" component={Login} />
  </Router>,
  document.querySelector('body > main')
);
