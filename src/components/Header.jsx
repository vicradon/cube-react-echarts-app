import React from "react";
import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">E-Commerce Dashboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
