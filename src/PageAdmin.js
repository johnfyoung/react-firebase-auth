import { Container, Row, Col } from "react-bootstrap";
import withHelmet from "./withHelmet";

function PageAdmin() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Super secret Page</h1>
          <p>
            Tempor fermentum massa vehicula cursus nulla nisl mattis. Nisl
            eleifend leo ultrices. Porta quisque aliquam dictumst lacinia magnis
            parturient. Mauris nam ultricies at accumsan augue a. Ut urna
            sociosqu malesuada.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default withHelmet(PageAdmin, "Admin");
