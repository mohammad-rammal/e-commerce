import {Col, Container, Row} from 'react-bootstrap';
import UserSideBar from '../../Components/User/UserSideBar';
import UserProfile from '../../Components/User/UserProfile';

const UserProfilePage = () => {
  return (
    <Container className="min-vh-100">
      <Row className="py-3">
        <Col sm="3" xs="3" md="2">
          <UserSideBar />
        </Col>
        <Col sm="9" xs="9" md="10">
          <UserProfile />
        </Col>
      </Row>
    </Container>
  );
};
export default UserProfilePage;
