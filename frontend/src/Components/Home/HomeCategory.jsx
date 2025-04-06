import {Container, Row, Spinner} from 'react-bootstrap';
import SubTitle from '../utilities/SubTitle';
import CategoryCard from '../Category/CategoryCard';
import HomeCategoryHook from '../../hook/category/home-category-hook';

const HomeCategory = () => {
  const [category, loading, colors] = HomeCategoryHook();

  return (
    <Container>
      <SubTitle title="Categories" btnTitle="More" pathText="/allcategory" />
      <Row className="my-2 d-flex justify-content-between">
        {loading === false ? (
          category.data ? (
            category.data.slice(0, 5).map((items, index) => {
              return <CategoryCard key={items._id} title={items.name} img={items.image} background={colors[index]} />;
            })
          ) : (
            <h4>No Categories</h4>
          )
        ) : (
          <div className="d-flex justify-content-center ">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </Row>
    </Container>
  );
};
export default HomeCategory;
