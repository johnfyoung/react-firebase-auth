import React, { useContext } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

import { UserContext } from "./UserProvider";
import SignupForm from "./SignupForm";

export function PageSignup() {
  const { user, isSigningUp } = useContext(UserContext);
  return (
    <Container>
      <Row>
        <Col>
          {!user || (user && isSigningUp) ? (
            <SignupForm />
          ) : (
            <Alert variant="success">
              You are already signed in. Go have some fun!
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PageSignup;
