import {Col, Row} from 'react-bootstrap';
import avatar from '../../assets/images/avatar.png';

const AdminAddBrand = () => {
  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">Add a new brand</div>
        <Col sm="8">
          <div className="text-form pb-2">Brand image</div>
          <img src={avatar} alt="" height="100px" width="120px" />
          <input type="text" className="input-form d-block mt-3 px-3" placeholder="Brand name" />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button className="btn-save d-inline mt-2">Save changes</button>
        </Col>
      </Row>
    </div>
  );
};
export default AdminAddBrand;
