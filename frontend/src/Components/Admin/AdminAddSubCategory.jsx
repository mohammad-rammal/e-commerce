import {Col, Row} from 'react-bootstrap';
import AddSubCategoryHook from '../../hook/subCategory/add-subCategory-hook';

const AdminAddSubCategory = () => {
  const [name, category, handleChange, onChangeName, handleSubmit] = AddSubCategoryHook();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">Add a new subcategory</div>
        <Col sm="8">
          <input
            onChange={onChangeName}
            value={name}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="Subcategory Name"
          />
          <select onChange={handleChange} name="category" id="cat" className="select mt-3 px-2 ">
            <option value="0">Choose Subcategory</option>
            {category.data
              ? category.data.map((items) => {
                  return (
                    <option key={items._id} value={items._id}>
                      {items.name}
                    </option>
                  );
                })
              : null}
          </select>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2">
            Save changes
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default AdminAddSubCategory;
