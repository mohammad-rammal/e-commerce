import {Col, Container, Row} from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import AdminAddSubCategory from '../../Components/Admin/AdminAddSubCategory';

const AdminAddSubCategoryPage = () => {
  return (
    <Container className="min-vh-100">
      <Row className="py-3">
        <Col sm="3" xs="3" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="9" md="10">
          <AdminAddSubCategory />
        </Col>
      </Row>
    </Container>
  );
};
export default AdminAddSubCategoryPage;
