import {Col, Row} from 'react-bootstrap';
import ProductGallery from './ProductGallery';
import ProductDescription from './ProductDescription';

const ProductDetails = () => {
  return (
    <div>
      <Row className="py-3 ">
        <Col lg="4">
          <ProductGallery />
        </Col>
        <Col lg="8">
          <ProductDescription />
        </Col>
      </Row>
    </div>
  );
};
export default ProductDetails;
