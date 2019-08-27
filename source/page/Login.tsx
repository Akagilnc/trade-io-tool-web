import * as React from 'react';
import { History } from 'history';

import { Card, Form, Button } from 'react-bootstrap';
import PageBox from '../component/PageBox';

import { createSession } from '../service';

export default class Login extends React.PureComponent<{ history: History }> {
  onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await createSession(new FormData(event.target as HTMLFormElement));

    this.props.history.replace('/');
  };

  render() {
    return (
      <PageBox>
        <Card>
          <Card.Body>
            <Card.Title>Log in</Card.Title>

            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="account">
                <Form.Label>Account</Form.Label>
                <Form.Control type="text" name="username" required />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" required />
              </Form.Group>

              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </PageBox>
    );
  }
}
