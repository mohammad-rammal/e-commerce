import {Col, Row} from 'react-bootstrap';
import rate from '../../assets/images/rate.png';

const RateItem = () => {
  return (
    <div>
      <Row className="mt-3">
        <Col className="d-flex align-items-center me-5  pt-2">
          <div className="rate-name d-inline mx-2"> User Name </div>
          <img className="" src={rate} alt="" height="13px" width="13px" />
          <div className="cat-rate d-inline p-1">4.3</div>
        </Col>
      </Row>
      <Row className="border-bottom mx-2">
        <Col className="d-flex me-4 pb-2">
          <div className="rate-description d-inline ms-2">
            Good product, reasonable price for the time being, very good face and with it an extra arm
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default RateItem;
