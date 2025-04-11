import {Row} from 'react-bootstrap';
import AdminAllProductsCard from './AdminAllProductsCard';

const AdminAllProducts = ({products}) => {
  return (
    <div>
      <div className="admin-content-text">Manage all products</div>
      <Row className="justify-content-start">
        {products ? (
          products.map((items, index) => {
            return <AdminAllProductsCard key={index} items={items} />;
          })
        ) : (
          <h4>No Products for now</h4>
        )}
      </Row>
    </div>
  );
};
export default AdminAllProducts;
