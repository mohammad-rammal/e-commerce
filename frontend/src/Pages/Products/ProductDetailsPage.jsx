import {Container} from 'react-bootstrap';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import ProductDetails from '../../Components/Products/ProductDetails';
import RateContainer from '../../Components/Rate/RateContainer';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import {useParams} from 'react-router-dom';
import ViewOneProductDetailsHook from '../../hook/product/view-one-product-details-hook';

const ProductDetailsPage = () => {
  const {id} = useParams();

  // eslint-disable-next-line no-unused-vars
  const [item, images, brand, category, prod] = ViewOneProductDetailsHook(id);

  // if (prod) {
  //   var items = prod.slice(0, 4);
  // }
  var items = prod?.slice(0, 4) || [];
  console.log(items);

  return (
    <div className="min-vh-100">
      <CategoryHeader />
      <Container>
        <ProductDetails />
        <RateContainer />
        <CardProductsContainer products={items} title="Products you may like" />
      </Container>
    </div>
  );
};
export default ProductDetailsPage;
