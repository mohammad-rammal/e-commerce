import {Col, Row} from 'react-bootstrap';
import ProductGallery from './ProductGallery';
import ProductDescription from './ProductDescription';

const ProductDetails = ({id}) => {
  return (
    <div>
      <Row className="py-3 ">
        <Col lg="4">
          <ProductGallery id={id} />
        </Col>
        <Col lg="8">
          <ProductDescription id={id} />
        </Col>
      </Row>
    </div>
  );
};
export default ProductDetails;
