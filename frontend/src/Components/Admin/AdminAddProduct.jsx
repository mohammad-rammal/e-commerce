import {Col, Row} from 'react-bootstrap';
import add from '../../assets/images/add.png';
import Multiselect from 'multiselect-react-dropdown';
// import MultiImageInput from 'react-multiple-image-input';
import {CompactPicker} from 'react-color';
import ImageUploading from 'react-images-uploading';
import AddProductHook from '../../hook/product/add-product-hook';

const AdminAddProduct = () => {
  const [
    showColor,
    category,
    brand,
    priceAfter,
    images,
    onSelect,
    onRemove,
    options,
    handleChangeComplete,
    removeColor,
    onChange,
    maxNumber,
    onSelectCategory,
    handleSubmit,
    onSelectBrand,
    colors,
    priceBefore,
    quantity,
    productDescription,
    productName,
    onChangeQuantity,
    onChangePriceBefore,
    onChangePriceAfter,
    onChangeProductDescription,
    onChangeProductName,
    onChangeShowColor,
  ] = AddProductHook();

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4"> Add a new product</div>
        <Col sm="8">
          <div className="text-form pb-2"> Product images</div>

          {/* multi images */}
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url">
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper">
                <div className="upload-header">
                  <button
                    style={isDragging ? {color: 'white', backgroundColor: '#f44336'} : null}
                    onClick={onImageUpload}
                    {...dragProps}
                    className="btn-upload">
                    {isDragging ? 'Drop here' : 'Click or Drag to Upload'}
                  </button>
                  <button onClick={onImageRemoveAll} className="btn-remove-all">
                    Remove All
                  </button>
                </div>

                <div className="image-preview-container">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image['data_url']} alt="" className="image-thumbnail" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)} className="btn-update">
                          <i className="fa fa-refresh"></i> Update
                        </button>
                        <button onClick={() => onImageRemove(index)} className="btn-remove">
                          <i className="fa fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>

          {/* <MultiImageInput
            images={images}
            setImages={setImages}
            cropConfig={{
              crop: {unit: '%', aspect: 4 / 3, width: '100'},
              ruleOfThirds: true,
            }}
            theme={{
              background: 'light',
              outlineColor: '#979797',
              textColor: 'rgba(255,255,255,0.6)',
              buttonColor: '#ff0e1f',
              modalColor: '#ffffff',
            }}
            max={5}
            allowCrop={false}
          /> */}

          <input
            value={productName}
            onChange={onChangeProductName}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="Product Name"
          />
          <textarea
            value={productDescription}
            onChange={onChangeProductDescription}
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="Product description"
          />
          <input
            value={priceBefore}
            onChange={onChangePriceBefore}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="Price before discount"
          />
          <input
            value={priceAfter}
            onChange={onChangePriceAfter}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="Product price after discount"
          />
          <input
            value={quantity}
            onChange={onChangeQuantity}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="Available quantity"
          />

          <select
            onChange={onSelectCategory}
            name="category"
            className="select input-form-area mt-3 px-2 ">
            <option value="0">Main Category</option>
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

          <Multiselect
            className="mt-2 text-start"
            placeholder="Subcategory"
            options={options}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            style={{color: 'red'}}
          />

          <select
            onChange={onSelectBrand}
            name="brand"
            id="brand"
            className="select input-form-area mt-3 px-2 ">
            <option value="val">Choose brand</option>
            {brand.data
              ? brand.data.map((items) => {
                  return (
                    <option key={items._id} value={items._id}>
                      {items.name}
                    </option>
                  );
                })
              : null}
          </select>

          <div className="text-form mt-3 ">Available Colors for the Product</div>
          <div className="mt-1 d-flex">
            {colors.length >= 1
              ? colors.map((color, index) => {
                  return (
                    <div
                      onClick={() => removeColor(color)}
                      key={index}
                      className="color me-1 border mt-1"
                      style={{backgroundColor: color}}></div>
                  );
                })
              : null}
            <img
              onClick={onChangeShowColor}
              src={add}
              alt=""
              width="30px"
              height="35px"
              style={{cursor: 'pointer'}}
            />
            {showColor === true ? <CompactPicker onChangeComplete={handleChangeComplete} /> : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2">
            Save product
          </button>
        </Col>
      </Row>
    </div>
  );
};
export default AdminAddProduct;
