import {Container} from 'react-bootstrap';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import ProductDetails from '../../Components/Products/ProductDetails';
import RateContainer from '../../Components/Rate/RateContainer';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';

const ProductDetailsPage = () => {
  return (
    <div className="min-vh-100">
      <CategoryHeader />
      <Container>
        <ProductDetails />
        <RateContainer />
        <CardProductsContainer title="Products you may like" />
      </Container>
    </div>
  );
};
export default ProductDetailsPage;
