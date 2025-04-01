import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const CartCheckout = () => {
  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
      <Col xs="12" className="d-flex  flex-column  ">
        <div className="d-flex">
          <input className="coupon-input d-inline text-center" placeholder="Discount code" />
          <button className="coupon-btn d-inline">Apply</button>
        </div>
        <div className="product-price d-inline w-100 my-3 border">34,000 $</div>
        <Link to="/order/paymethod" style={{textDecoration: 'none'}} className="product-cart-add d-inline">
          <button className="product-cart-add w-100 px-2">Checkout</button>
        </Link>
      </Col>
    </Row>
  );
};
export default CartCheckout;
