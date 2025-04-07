import {Col, Row, Spinner} from 'react-bootstrap';
import AddBrandHook from '../../hook/brand/add-brand-hook';
import {ToastContainer} from 'react-toastify';

const AdminAddBrand = () => {
  const [img, name, loadingState, isPress, onChangeName, onImageChange, handleSubmit] = AddBrandHook();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">Add a new brand</div>
        <Col sm="8">
          <div className="text-form pb-2">Brand image</div>

          {/* Image upload photo */}
          <div>
            <label htmlFor="upload-photo">
              <img src={img} alt="img" height="100px" width="120px" style={{cursor: 'pointer'}} />
            </label>
            <input type="file" name="photo" onChange={onImageChange} id="upload-photo" />
          </div>

          <input
            type="text"
            onChange={onChangeName}
            value={name}
            className="input-form d-block mt-3 px-3"
            placeholder="Brand name"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-between">
          <div className="align-content-center">
            {isPress ? (
              loadingState ? (
                <div className=" ">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <h4>Completed...</h4>
              )
            ) : null}
          </div>
          <button onClick={handleSubmit} className="btn-save d-inline mt-2 ">
            Save changes
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default AdminAddBrand;
