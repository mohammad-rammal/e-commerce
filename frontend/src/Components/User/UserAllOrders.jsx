import {Row} from 'react-bootstrap';
import UserAllOrderItem from './UserAllOrderItem';

const UserAllOrders = () => {
  return (
    <div>
      <div className="admin-content-text pb-4">Welcome User Name</div>
      <Row className="justify-content-between">
        <UserAllOrderItem />
        <UserAllOrderItem />
        <UserAllOrderItem />
      </Row>
    </div>
  );
};
export default UserAllOrders;
