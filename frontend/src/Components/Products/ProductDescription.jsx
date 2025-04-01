import {Col, Row} from 'react-bootstrap';

const ProductDescription = () => {
  return (
    <div>
      <Row className="mt-2">
        <div className="cat-text">Electronics:</div>
      </Row>
      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
            iPhone XR 128GB 4G LTE with FaceTime Product Red <div className="cat-rate d-inline mx-3">4.5</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">Brand:</div>
          <div className="brand-text d-inline mx-1">Samsung</div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-1 d-flex">
          <div className="color ms-2 border" style={{backgroundColor: '#E52C2C'}}></div>
          <div className="color ms-2 border" style={{backgroundColor: 'white'}}></div>
          <div className="color ms-2 border" style={{backgroundColor: 'black'}}></div>
        </Col>
      </Row>

      <Row className="mt-4">
        <div className="cat-text">Specifications:</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">
            Features dual SIM: a physical card and an e-SIM. You can easily unlock your iPhone and log in to apps,
            accounts, and more. Face ID is faster and more secure. For authentication via fingerprint Face ID features
            the A12 Bionic chip, the smartest and most powerful chip in a smartphone. The world's most popular cameras
            have ushered in a new era of photography. The innovative ISP sensor and neural engine enable you to capture
            unprecedented images. A single-lens camera brings foreground subjects into sharp focus, contrasting with a
            blurred background. Overview
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
          <div className="product-price d-inline px-3 py-3 border">34,000 EGP</div>
          <div className="product-cart-add px-3 py-3 d-inline mx-3">Add to Cart</div>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDescription;
