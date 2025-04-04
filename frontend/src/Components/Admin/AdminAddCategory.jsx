import {Col, Row} from 'react-bootstrap';
import avatar from '../../assets/images/avatar.png';
import {useState} from 'react';
import axios from 'axios';

const AdminAddCategory = () => {
  const [img, setImg] = useState(avatar);
  const [name, setName] = useState('');

  // When user change image to save it
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Save data in DB
  const handleSubmit = (e) => {
    e.preventDefault();
    const res = axios.post('http://localhost:5000/api/v1/categories', {name: 'me', age: '22'});
    console.log(res);
  };

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">Add a new category</div>
        <Col sm="8">
          <div className="text-form pb-2">Category image</div>

          {/* Image upload photo */}
          <div>
            <label for="upload-photo">
              <img src={img} alt="img" height="100px" width="120px" style={{cursor: 'pointer'}} />
            </label>
            <input type="file" name="photo" onChange={onImageChange} id="upload-photo" />
          </div>

          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="input-form d-block mt-3 px-3"
            placeholder="Category name"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2">
            Save changes
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default AdminAddCategory;
