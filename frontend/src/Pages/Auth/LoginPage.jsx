import {Col, Container, Row, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import LoginHook from '../../hook/auth/login-hook';

const LoginPage = () => {
  const [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress] =
    LoginHook();
  return (
    <Container className="min-vh-100">
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">Log in</label>
          <input
            value={email}
            onChange={onChangeEmail}
            placeholder="Email..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />
          <input
            value={password}
            onChange={onChangePassword}
            placeholder="Password..."
            type="password"
            className="user-input text-center mx-auto"
          />
          <button onClick={onSubmit} className="btn-login mx-auto mt-4">
            {isPress === true ? (
              loading === true ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : null
            ) : (
              'Log in'
            )}
          </button>
          <label className="mx-auto my-4">
            Don't have an account?{' '}
            <Link to="/register" style={{textDecoration: 'none'}}>
              <span style={{cursor: 'pointer'}} className="text-danger">
                Click here
              </span>
            </Link>
          </label>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
