import {Col, Row} from 'react-bootstrap';
import CartItem from '../Cart/CartItem';

const AdminOrderDetails = () => {
  return (
    <div>
      <div className="admin-content-text">Order Details No. #55</div>
      <CartItem />
      <CartItem />
      <CartItem />

      <Row className="justify-content-center mt-4 user-data">
        <Col xs="12" className=" d-flex">
          <div className="admin-content-text py-2">Customer Details</div>
        </Col>
        <Col xs="12" className=" d-flex">
          <div
            style={{
              color: '#555550',
              fontFamily: 'Work Sans',
              fontSize: '16px',
            }}
          >
            Name:
          </div>

          <div
            style={{
              color: '#979797',
              fontFamily: 'Work Sans',
              fontSize: '16px',
            }}
            className="mx-2"
          >
            User Name
          </div>
        </Col>

        <Col xs="12" className="d-flex">
          <div
            style={{
              color: '#555550',
              fontFamily: 'Work Sans',
              fontSize: '16px',
            }}
          >
            phone number:
          </div>

          <div
            style={{
              color: '#979797',
              fontFamily: 'Work Sans',
              fontSize: '16px',
            }}
            className="mx-2"
          >
            0021313432423
          </div>
        </Col>
        <Col xs="12" className="d-flex">
          <div
            style={{
              color: '#555550',
              fontFamily: 'Work Sans',
              fontSize: '16px',
            }}
          >
            Email:
          </div>

          <div
            style={{
              color: '#979797',
              fontFamily: 'Work Sans',
              fontSize: '16px',
            }}
            className="mx-2"
          >
            email@gmail.com
          </div>
        </Col>
        <div className="d-inline px-4 border text-center pt-2">Total 4000 $</div>
        <div className="d-flex mt-2 justify-content-center">
          <select name="languages" id="lang" className="select input-form-area mt-1 text-center px-2 w-50">
            <option value="val">Request Status</option>
            <option value="val2">In Processing</option>
            <option value="val2">Completed</option>
            <option value="val2">Cancel</option>
          </select>
          <button className="btn-a px-3 d-inline mx-2 ">Save</button>
        </div>
      </Row>
    </div>
  );
};
export default AdminOrderDetails;
