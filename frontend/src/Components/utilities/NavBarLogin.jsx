/* eslint-disable no-unused-vars */
import {Container, FormControl, Nav, Navbar} from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import login from '../../assets/images/login.png';
import cart from '../../assets/images/cart.png';
import NavbarSearchHook from '../../hook/search/navbar-search-hook';

const NavBarLogin = () => {
  const [OnChangeSearch, searchWord] = NavbarSearchHook();

  let word = '';
  if (localStorage.getItem('searchWord') != null) {
    word = localStorage.getItem('searchWord');
  }
  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} className="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl
            onChange={OnChangeSearch}
            value={word}
            type="search"
            placeholder="Search..."
            className="me-2 w-100 text-center"
            aria-label="Search"
          />
          <Nav className="me-auto">
            <Nav.Link href="/login" className="nav-text d-flex mt-3 justify-content-center">
              <img src={login} className="login-img" alt="login" />
              <p style={{color: 'white'}}>Login</p>
            </Nav.Link>
            <Nav.Link
              href="/cart"
              className="nav-text d-flex mt-3 justify-content-center"
              style={{color: 'white'}}>
              <img src={cart} className="login-img" alt="cart" />
              <p style={{color: 'white'}}>Cart</p>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBarLogin;
