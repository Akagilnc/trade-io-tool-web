import * as React from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

export default class Login extends React.PureComponent {
  render() {
    return (
      <Container className="mt-3 mb-3">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Body>
                <Card.Title>Log in</Card.Title>

                <Form>
                  <Form.Group controlId="account">
                    <Form.Label>Account</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
