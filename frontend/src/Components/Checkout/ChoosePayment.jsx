import {Col, Row} from 'react-bootstrap';

const ChoosePayment = () => {
  return (
    <div>
      <div className="admin-content-text pt-5">Choose a payment method</div>
      <div className="user-address-card my-3 px-3">
        <Row>
          <Col xs="12" className="my-4  ">
            <input name="group" id="group1" type="radio" value="Payment by Visa" className="mt-2" />
            <label className="mx-2" for="group1">
              Payment by credit card
            </label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs="12" className="  ">
            <input name="group" id="group1" type="radio" value="Cash on Delivery" className="mt-2" />
            <label className="mx-2" for="group1">
              Cash on Delivery
            </label>
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs="12" className="d-flex justify-content-end">
          <div className="product-price d-inline border">34,000 $</div>
          <div className="product-cart-add px-3 pt-2 d-inline ms-2">Complete Purchase</div>
        </Col>
      </Row>
    </div>
  );
};
export default ChoosePayment;
