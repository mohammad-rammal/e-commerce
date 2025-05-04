import {Col, Container, Row, Spinner} from 'react-bootstrap';
import LoginHook from '../../hook/auth/login-hook';
import ForgetPasswordHook from '../../hook/auth/forget-password-hook';

const ForgetPasswordPage = () => {
  const [onChangeEmail, onSubmit, email, loading, isPress] = ForgetPasswordHook();
  return (
    <Container className="min-vh-100">
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">Reset Password</label>
          <input
            value={email}
            onChange={onChangeEmail}
            placeholder="Enter your email..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />

          <button onClick={onSubmit} className="btn-login mx-auto mt-4">
            {isPress === true ? (
              loading === true ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : null
            ) : (
              'Send code'
            )}
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default ForgetPasswordPage;
