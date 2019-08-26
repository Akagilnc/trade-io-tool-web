import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function PageBox({ children }: React.PropsWithChildren<any>) {
  return (
    <Container className="mt-3 mb-3">
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
