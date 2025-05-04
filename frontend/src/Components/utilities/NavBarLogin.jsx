/* eslint-disable no-unused-vars */
import {Container, FormControl, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import login from '../../assets/images/login.png';
import cart from '../../assets/images/cart.png';
import NavbarSearchHook from '../../hook/search/navbar-search-hook';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedUser} from '../../redux/actions/authAction';

const NavBarLogin = () => {
  const [OnChangeSearch, searchWord] = NavbarSearchHook();
  // const dispatch = useDispatch();
  let word = '';
  if (localStorage.getItem('searchWord') != null) {
    word = localStorage.getItem('searchWord');
  }

  const [user, setUser] = useState('');
  // const res = useSelector((state) => state.authentication.currentUser);

  useEffect(() => {
    if (localStorage.getItem('user') != null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    // dispatch(getLoggedUser());
  }, []);

  // if (res) {
  //   setUser(JSON.parse(localStorage.getItem('user')));
  // }

  const logOut = () => {
    localStorage.removeItem('user');
    setUser('');
  };

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
            {user != '' ? (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                {user.role === 'admin' ? (
                  <NavDropdown.Item href="/admin/allproducts">Control Panel</NavDropdown.Item>
                ) : (
                  <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut} href="#action/3.3">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login" className="nav-text d-flex mt-3 justify-content-center">
                <img src={login} className="login-img" alt="login" />
                <p style={{color: 'white'}}>Login</p>
              </Nav.Link>
            )}

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
