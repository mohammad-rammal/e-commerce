import {Container, Row, Spinner} from 'react-bootstrap';
import BrandCard from './BrandCard';

const BrandContainer = ({data, loading}) => {
  return (
    <Container>
      <div className="admin-content-text mt-2">All Brands </div>
      <Row className="my-1 d-flex justify-content-between">
        {loading === false ? (
          data ? (
            data.map((items) => {
              return <BrandCard key={items._id} img={items.image} />;
            })
          ) : (
            <h4>No Brands</h4>
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
export default BrandContainer;
