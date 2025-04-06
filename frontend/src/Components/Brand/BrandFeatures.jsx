import {Container, Row, Spinner} from 'react-bootstrap';
import BrandCard from './BrandCard';
import SubTitle from '../utilities/SubTitle';
import HomeBrandHook from '../../hook/brand/home-brand-hook';

const BrandFeatures = ({title, btnTitle}) => {
  const [brand, loading] = HomeBrandHook();

  return (
    <Container>
      {brand.data && brand.data.length > 0 ? (
        <div>
          <SubTitle title={title} btnTitle={btnTitle} pathText="allbrand" />
          <Row className="my-1 d-flex justify-content-between">
            {loading === false ? (
              brand.data ? (
                brand.data.slice(0, 4).map((items) => {
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
        </div>
      ) : null}
    </Container>
  );
};
export default BrandFeatures;
