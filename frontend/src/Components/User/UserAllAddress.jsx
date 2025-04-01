import {Col, Row} from 'react-bootstrap';
import UserAddressCard from './UserAddressCard';
import {Link} from 'react-router-dom';

const UserAddresses = () => {
  return (
    <div>
      <div className="admin-content-text pb-4">Address book</div>
      <UserAddressCard />
      <UserAddressCard />
      <UserAddressCard />

      <Row className="justify-content-center">
        <Col sm="5" className="d-flex justify-content-center">
          <Link to="/user/add-address" style={{textDecoration: 'none'}}>
            <button className="btn-add-address">Add a new address</button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
export default UserAddresses;
