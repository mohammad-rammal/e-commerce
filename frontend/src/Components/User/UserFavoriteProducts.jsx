import {Row} from 'react-bootstrap';
import ProductCard from '../Products/ProductCard';
import Pagination from '../utilities/Pagination';

const UserFavoriteProducts = () => {
  return (
    <div>
      <div className="admin-content-text pb-4">Favorites List</div>
      <Row className="justify-content-start">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Row>
      <Pagination />
    </div>
  );
};
export default UserFavoriteProducts;
