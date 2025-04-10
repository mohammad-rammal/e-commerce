import {Container, Row} from 'react-bootstrap';
import SubTitle from '../utilities/SubTitle';
import ProductCard from './ProductCard';

const CardProductsContainer = ({title, btnTitle, pathText, products}) => {
  return (
    <Container>
      {products ? <SubTitle title={title} btnTitle={btnTitle} pathText={pathText} /> : null}
      <Row className="my-2 d-flex justify-content-between">
        {products
          ? products.map((items, index) => {
              return <ProductCard key={index} items={items} />;
            })
          : null}
      </Row>
    </Container>
  );
};
export default CardProductsContainer;
