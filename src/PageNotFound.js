import { Container, Row, Col } from "react-bootstrap";
import withHelmet from "./withHelmet";

export function PageNotFound() {
  return (
    <Container>
      <Row>
        <Col>404 - that path doesn't exist</Col>
      </Row>
    </Container>
  );
}

export default withHelmet(PageNotFound, "Page Not Found");
