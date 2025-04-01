import {Col, Container, Row} from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import AdminOrderDetails from '../../Components/Admin/AdminOrderDetails';

const AdminOrderDetailsPage = () => {
  return (
    <Container className="min-vh-100">
      <Row className="py-3">
        <Col sm="3" xs="3" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="9" md="10">
          <AdminOrderDetails />
        </Col>
      </Row>
    </Container>
  );
};
export default AdminOrderDetailsPage;
