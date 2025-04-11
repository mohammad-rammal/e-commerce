import {Col, Container, Row} from 'react-bootstrap';
import AdminSideBar from '../../Components/Admin/AdminSideBar';
import AdminAllProducts from '../../Components/Admin/AdminAllProducts';
import Pagination from '../../Components/utilities/Pagination';
import ViewProductAdminHook from '../../hook/admin/view-product-admin-hook';

const AdminAllProductsPage = () => {
  const [items, pageCount, currentPage, onPress] = ViewProductAdminHook();

  return (
    <Container className="min-vh-100">
      <Row className="py-3">
        <Col sm="3" xs="3" md="2">
          <AdminSideBar />
        </Col>
        <Col sm="9" xs="9" md="10">
          <AdminAllProducts products={items} />
          {pageCount > 1 ? (
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage} // Pass currentPage for highlighting the current page
              onPress={onPress}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};
export default AdminAllProductsPage;
