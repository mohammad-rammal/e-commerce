import {Col, Row} from 'react-bootstrap';
import add from '../../assets/images/add.png';
import Multiselect from 'multiselect-react-dropdown';
import MultiImageInput from 'react-multiple-image-input';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';
import checkNetStatus from '../../hook/useCheckNetStatus';
import {getAllBrand} from '../../redux/actions/brandAction';

const AdminAddProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkNetStatus();
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  // get all categories state from redux
  const category = useSelector((state) => state.allCategory.category);

  // get all brands state from redux
  const brand = useSelector((state) => state.allBrand.brand);

  // values images for products
  const [images, setImages] = useState([]);

  // value states
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [priceBefore, setPriceBefore] = useState('price before discount');
  const [priceAfter, setPriceAfter] = useState('price after discount');
  const [quantity, setQuantity] = useState('available quantity');
  const [categoryID, setCategoryID] = useState('');
  const [brandID, setBrandID] = useState('');
  const [subCategoryID, setSubCategoryID] = useState([]);
  const [selectedSubCategoryID, setSelectedSubCategoryID] = useState([]);

  // when select category to store id
  const onSelectCategory = (e) => {
    setCategoryID(e.target.value);
  };

  // when select brand to store id
  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
  };

  const onSelect = () => {};
  const onRemove = () => {};

  const options = [
    {name: 'First Classification', id: 1},
    {name: 'Second Classification', id: 2},
    {name: 'Third Classification', id: 3},
  ];

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4"> Add a new product</div>
        <Col sm="8">
          <div className="text-form pb-2"> Product images</div>

          {/* multi images */}
          <MultiImageInput
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
          />

          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="Product Name"
          />
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="Product description"
          />
          <input
            value={priceBefore}
            onChange={(e) => setPriceBefore(e.target.value)}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="Price before discount"
          />
          <input
            value={priceAfter}
            onChange={(e) => setPriceAfter(e.target.value)}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="Product price after discount"
          />
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
            <div className="color ms-2 border mt-1" style={{backgroundColor: '#E52C2C'}}></div>
            <div className="color ms-2 border mt-1 " style={{backgroundColor: 'white'}}></div>
            <div className="color ms-2 border mt-1" style={{backgroundColor: 'black'}}></div>
            <img src={add} alt="" width="30px" height="35px" className="" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button className="btn-save d-inline mt-2">Save product</button>
        </Col>
      </Row>
    </div>
  );
};
export default AdminAddProduct;
