import {Col, Container, Row} from 'react-bootstrap';
import ResetPasswordHook from '../../hook/auth/reset-password-hook';

const ResetPasswordPage = () => {
  const [
    onChangePassword,
    onChangeConfirmPassword,
    password,
    confirmPassword,
    onSubmit,
    loading,
    isPress,
  ] = ResetPasswordHook();

  return (
    <Container className="min-vh-100">
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">Enter new password</label>

          <input
            value={password}
            onChange={onChangePassword}
            placeholder="New password..."
            type="password"
            className="user-input text-center mx-auto mt-3"
          />
          <input
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="Enter again the new password..."
            type="password"
            className="user-input text-center mx-auto my-2"
          />
          <button onClick={onSubmit} className="btn-login mx-auto mt-4">
            {isPress === true ? (
              loading === true ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : null
            ) : (
              'Reset password'
            )}
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default ResetPasswordPage;
