import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import { UserContext } from "./UserProvider";
import UserStatus from "./UserStatus";

export function Header() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Navbar.Brand as={Link} to="/">
          Firebase Test
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {!user && (
              <Nav.Link as={Link} to="/signup">
                Sign up
              </Nav.Link>
            )}
            {user && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
          </Nav>
          <UserStatus />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
