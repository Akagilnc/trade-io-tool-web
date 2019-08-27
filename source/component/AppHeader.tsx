import * as React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import './AppHeader.less';
import { destroySession } from '../service';

export default class AppHeader extends React.PureComponent {
  render() {
    return (
      <Navbar bg="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand className="text-white" href="/">
            Trade port
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-left" />
          <Navbar.Collapse id="navbar-left" className="justify-content-end">
            <Nav>
              <NavDropdown title="User" id="UserBar">
                <NavDropdown.Item onClick={destroySession}>
                  Exit
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
