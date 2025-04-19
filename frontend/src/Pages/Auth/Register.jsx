import {Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import RegisterHook from '../../hook/auth/register-hook';

const Register = () => {
  const [
    name,
    email,
    phone,
    password,
    confirmPassword,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    onSubmit,
  ] = RegisterHook();

  return (
    <Container className="min-vh-100">
      <Row className="py-5 d-flex justify-content-center height-search">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">Register a new account</label>
          <input
            onChange={onChangeName}
            value={name}
            placeholder="Username..."
            type="text"
            className="user-input mt-3 text-center mx-auto"
          />
          <input
            onChange={onChangeEmail}
            value={email}
            placeholder="Email..."
            type="text"
            className="user-input mt-3 text-center mx-auto"
          />
          <input
            onChange={onChangePhone}
            value={phone}
            placeholder="Phone Number..."
            type="phone"
            className="user-input my-3 text-center mx-auto"
          />
          <input
            onChange={onChangePassword}
            value={password}
            placeholder="Password..."
            type="password"
            className="user-input mt-3 text-center mx-auto"
          />
          <input
            onChange={onChangeConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm Password..."
            type="password"
            className="user-input mt-3 text-center mx-auto"
          />

          <button onClick={onSubmit} className="btn-login mx-auto mt-4">
            Register an account
          </button>
          <label className="mx-auto my-4">
            Already have an account?{' '}
            <Link to="/login" style={{textDecoration: 'none'}}>
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
export default Register;
