import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import withHelmet from "./withHelmet";
import Login from "./Login";

import { UserContext } from "./UserProvider";

export function PageHome() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Container>
        <Row>
          <Col>
            {user ? (
              <>
                <p>
                  Efficitur sodales mattis neque viverra suscipit suspendisse.
                  Justo sodales fringilla gravida sollicitudin pede parturient.
                  Quisque nam duis justo lobortis auctor lacus. Hac curabitur
                  consequat quis. Efficitur litora curabitur class. Imperdiet
                  sit quisque tincidunt. Dolor nibh nascetur bibendum.
                </p>

                <p>
                  Egestas pulvinar mollis ad tempor enim duis ridiculus. Amet
                  luctus malesuada dui si fringilla. Malesuada tincidunt
                  suscipit facilisis nascetur. Urna est per tellus pede faucibus
                  conubia. Egestas ultricies urna accumsan.
                </p>
              </>
            ) : (
              <Login />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default withHelmet(PageHome, "Login");
