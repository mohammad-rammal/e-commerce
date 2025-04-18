import {Col, Container, Row} from 'react-bootstrap';
import CategoryHeader from '../../Components/Category/CategoryHeader';
import SearchCountResult from '../../Components/utilities/SearchCountResult';
import SideFilter from '../../Components/utilities/SideFilter';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Pagination from '../../Components/utilities/Pagination';
import ViewSearchProductHook from '../../hook/product/view-search-product-hook';

const ShopProductsPage = () => {
  const [items, pagination, onPress, getProducts, results] = ViewSearchProductHook();

  if (pagination) {
    var pageCount = pagination;
  } else {
    pageCount = 0;
  }

  return (
    <div className="min-vh-100">
      <CategoryHeader />
      <Container>
        <SearchCountResult onClick={getProducts} title={`${results} Search results`} />
        <Row className="d-flex flex-row">
          <Col xs="4" sm="4" md="3" lg="2" xl="2" className="d-flex">
            <SideFilter />
          </Col>
          <Col xs="8" sm="8" md="9" lg="10" xl="10">
            <CardProductsContainer products={items} title="" btnTitle="" />
          </Col>
        </Row>
        {pageCount > 1 ? <Pagination pageCount={pageCount} onPress={onPress} /> : null}
      </Container>
    </div>
  );
};
export default ShopProductsPage;
