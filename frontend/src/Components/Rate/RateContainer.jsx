import {Col, Container, Row} from 'react-bootstrap';

import rate from '../../assets/images/rate.png';
import RateItem from './RateItem';
import RatePost from './RatePost';
import Pagination from '../utilities/Pagination';

const RateContainer = () => {
  return (
    <Container className="rate-container">
      <Row>
        <Col className="d-flex">
          <div className="sub-title d-inline p-1">Feedback</div>
          <img className="mt-2" src={rate} alt="" height="16px" width="16px" />
          <div className="cat-rate d-inline p-1 pt-2">4.3</div>
          <div className="rate-count d-inline p-1 pt-2">(160 ratings)</div>
        </Col>
      </Row>
      <RatePost />
      <RateItem />
      <RateItem />
      <RateItem />
      <RateItem />
      <RateItem />
      <RateItem />
      <Pagination />
    </Container>
  );
};
export default RateContainer;
