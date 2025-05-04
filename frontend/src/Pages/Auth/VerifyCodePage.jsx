import {Col, Container, Row} from 'react-bootstrap';
import VerifyCodeHook from '../../hook/auth/verify-code-hook';

const VerifyCode = () => {
  const [onChangeCode, onSubmit, code, loading, isPress] = VerifyCodeHook();
  return (
    <Container className="min-vh-100">
      <Row className="py-5 d-flex justify-content-center ">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">Enter the code</label>

          <input
            value={code}
            onChange={onChangeCode}
            placeholder="Code..."
            type="text"
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
              'Verify'
            )}
          </button>
        </Col>
      </Row>
    </Container>
  );
};
export default VerifyCode;
