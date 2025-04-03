import {Container, Row, Spinner} from 'react-bootstrap';
import SubTitle from '../utilities/SubTitle';
import CategoryCard from '../Category/CategoryCard';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';

const HomeCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const category = useSelector((state) => state.allCategory.category);

  const loading = useSelector((state) => state.allCategory.loading);

  const colors = ['#d6eb77', '#9679ed', '#e2c08d', '#6ca9d2', '#c7a9e9', '#89f1af'];

  return (
    <Container>
      <SubTitle title="Categories" btnTitle="More" pathText="/allcategory" />
      <Row className="my-2 d-flex justify-content-between">
        {loading === false ? (
          category.data ? (
            category.data.slice(0, 5).map((items, index) => {
              return <CategoryCard key={items.id} title={items.name} img={items.image} background={colors[index]} />;
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
