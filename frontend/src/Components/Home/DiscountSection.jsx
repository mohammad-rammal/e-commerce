import {Col, Container, Row} from 'react-bootstrap';

import laptops from '../../assets/images/laptops.png';

const DiscountSection = () => {
  return (
    <Container>
      <Row className="discount-background my-3 mx-2 d-flex text-center align-items-center">
        <Col sm="6">
          <div className="discount-title">Up to 70% discount on laptops</div>
        </Col>
        <Col sm="6">
          <img className="discount-img" src={laptops} alt="laptops" />
        </Col>
      </Row>
    </Container>
  );
};
export default DiscountSection;
