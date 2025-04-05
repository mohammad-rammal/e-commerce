import {Col, Row, Spinner} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';

import avatar from '../../assets/images/avatar.png';
import {createCategory} from '../../redux/actions/categoryAction';

const AdminAddCategory = () => {
  const dispatch = useDispatch();

  const [img, setImg] = useState(avatar);
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [isPress, setIsPress] = useState(false);

  // Get loading state from redux
  const res = useSelector((state) => state.allCategory.category);
  // if (res) console.log(res);

  // When user change image to save it
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
  };

  // Save data in DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || selectedFile === null) {
      notify('Complete all fields', 'warn');
      return;
    }

    // Form data for image (without image: {name:'nm'})
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', selectedFile);

    setLoadingState(true);
    // console.log('Uploading...');
    setIsPress(true);
    await dispatch(createCategory(formData));
    setLoadingState(false);
  };

  useEffect(() => {
    if (loadingState === false) {
      setName('');
      setImg(avatar);
      setSelectedFile(null);
      // console.log('Completed');
      setLoadingState(true);
      setTimeout(() => {
        setIsPress(false);
      }, 3000);

      if (res.status === 201) {
        notify(res.statusText + ' Successfully added...', 'success');
      } else {
        notify(res.statusText + ' Error...', 'error');
      }
    }
  }, [loadingState, res.status, res.statusText]);

  const notify = (msg, type) => {
    if (type === 'warn') {
      toast.warn(msg);
    } else if (type === 'success') {
      toast.success(msg);
    } else if (type === 'error') {
      toast.error(msg);
    }
  };
  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">Add a new category</div>
        <Col sm="8">
          <div className="text-form pb-2">Category image</div>

          {/* Image upload photo */}
          <div>
            <label htmlFor="upload-photo">
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
      <ToastContainer />
    </div>
  );
};
export default AdminAddCategory;
