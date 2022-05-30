import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import React from 'react';
import UserContext from '../UserContext/UserContext';
// @ts-ignore
import Cookies from 'js-cookie';
import Searching from './Searching/Searching';

function NavbarView() {
  // @ts-ignore
  const { userContext } = React.useContext(UserContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Цитатник</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {userContext.isAuthorized ? (
              <Nav.Link href={'/profile/' + Cookies.get('auth')}>Профиль</Nav.Link>
            ) : (
              <Nav.Link href="#pricing">1</Nav.Link>
            )}
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Searching />
          </Nav>
          {userContext.isAuthorized ? (
            <Nav>
              <Nav.Link href="/exit">Выход</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/registration">Регистрация</Nav.Link>
              <Nav.Link href="/enter">Вход</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarView;
