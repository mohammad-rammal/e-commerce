import {Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Register = () => {
  return (
    <Container className="min-vh-100">
      <Row className="py-5 d-flex justify-content-center height-search">
        <Col sm="12" className="d-flex flex-column ">
          <label className="mx-auto title-login">Register a new account</label>
          <input placeholder="Username..." type="text" className="user-input mt-3 text-center mx-auto" />
          <input placeholder="Email..." type="text" className="user-input my-3 text-center mx-auto" />
          <input placeholder="Password..." type="password" className="user-input text-center mx-auto" />
          <button className="btn-login mx-auto mt-4">Register an account</button>
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
