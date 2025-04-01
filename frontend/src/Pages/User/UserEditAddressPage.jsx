import {Col, Container, Row} from 'react-bootstrap';
import UserSideBar from '../../Components/User/UserSideBar';
import UserEditAddress from '../../Components/User/UserEditAddress';

const UserEditAddressPage = () => {
  return (
    <Container className="min-vh-100">
      <Row className="py-3">
        <Col sm="3" xs="3" md="2">
          <UserSideBar />
        </Col>
        <Col sm="9" xs="9" md="10">
          <UserEditAddress />
        </Col>
      </Row>
    </Container>
  );
};
export default UserEditAddressPage;
