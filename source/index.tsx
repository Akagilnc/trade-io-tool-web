import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
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

    <Route path="/login" component={Login} />
  </Router>,
  document.querySelector('body > main')
);
