import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export function PageNotFound() {
  return (
    <Container>
      <Row>
        <Col>404 - that path doesn't exist</Col>
      </Row>
    </Container>
  );
}

export default PageNotFound;
