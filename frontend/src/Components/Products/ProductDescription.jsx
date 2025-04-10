import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import ViewOneProductDetailsHook from '../../hook/product/view-one-product-details-hook';

const ProductDescription = () => {
  const {id} = useParams();

  // eslint-disable-next-line no-unused-vars
  const [item, images, brand, category, productLike] = ViewOneProductDetailsHook(id);

  return (
    <div>
      <Row className="mt-2">
        <div className="cat-text">{category.name}:</div>
      </Row>
      <Row>
        <Col md="8">
          <div className="cat-title d-inline">
            {item.title}
            <div className="cat-rate d-inline mx-3">{item.ratingsQuantity}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-4">
          <div className="cat-text d-inline">Brand:</div>
          <div className="brand-text d-inline mx-1">{brand.name}</div>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mt-1 d-flex">
          {item.colors
            ? item.colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    className="color ms-2 border"
                    style={{backgroundColor: color}}></div>
                );
              })
            : null}
        </Col>
      </Row>

      <Row className="mt-4">
        <div className="cat-text">Specifications:</div>
      </Row>
      <Row className="mt-2">
        <Col md="10">
          <div className="product-description d-inline">{item.description}</div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md="12">
          <div className="product-price d-inline px-3 py-3 border">{item.price} $</div>
          <div className="product-cart-add px-3 py-3 d-inline mx-3">Add to Cart</div>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDescription;
