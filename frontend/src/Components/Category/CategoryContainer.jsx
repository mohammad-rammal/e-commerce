import {Container, Row, Spinner} from 'react-bootstrap';
import CategoryCard from './CategoryCard';

const CategoryContainer = ({data, loading}) => {
  const colors = ['#d6eb77', '#9679ed', '#e2c08d', '#6ca9d2', '#c7a9e9', '#89f1af'];

  return (
    <Container>
      <div className="admin-content-text mt-2">All Categories </div>
      <Row className="my-2 d-flex justify-content-start">
        {loading === false ? (
          data ? (
            data.map((items, index) => {
              return (
                <CategoryCard
                  key={items.id || index}
                  title={items.name}
                  img={items.image}
                  background={colors[Math.floor(Math.random() * 5) + 1]}
                />
              );
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
export default CategoryContainer;
