import {Col, Row} from 'react-bootstrap';
import add from '../../assets/images/add.png';
import Multiselect from 'multiselect-react-dropdown';
// import MultiImageInput from 'react-multiple-image-input';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';
import checkNetStatus from '../../hook/useCheckNetStatus';
import {getAllBrand} from '../../redux/actions/brandAction';
import {CompactPicker} from 'react-color';
import ImageUploading from 'react-images-uploading';
import {getSubCategory} from '../../redux/actions/subCategoryAction';
import {createProduct} from '../../redux/actions/productAction';
import notify from '../../hook/useNotification';

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

  const subCategory = useSelector((state) => state.subCategory.subcategory);

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
  const [showColor, setShowColor] = useState(false);
  const [colors, setColors] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  //
  // values images for products
  const [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  //

  // when select category to store id
  const onSelectCategory = async (e) => {
    if (e.target.value != 0) {
      await dispatch(getSubCategory(e.target.value));
    }
    setCategoryID(e.target.value);
  };
  useEffect(() => {
    if (categoryID != 0) {
      if (subCategory.data) {
        setOptions(subCategory.data);
      }
    } else {
      setOptions([]);
    }
  }, [categoryID, subCategory.data]);

  // when select brand to store id
  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
  };

  // choose colors
  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };

  // remove color from array
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  const onSelect = (selectedList) => {
    setSelectedSubCategoryID(selectedList);
  };

  const onRemove = (selectedList) => {
    setSelectedSubCategoryID(selectedList);
  };

  // convert base64 to file
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  // save data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      categoryID === 0 ||
      productName === '' ||
      productDescription === '' ||
      images <= 0 ||
      priceBefore <= 0
    ) {
      notify('Complete missing fields', 'warn');
      return;
    }

    const imageCover = dataURLtoFile(images[0].data_url, Math.random() + '.png');

    const itemImages = Array.from(Array(Object.keys(images).length).keys()).map((items, index) => {
      return dataURLtoFile(images[index].data_url, Math.random() + '.png');
    });

    const formData = new FormData();
    formData.append('title', productName);
    formData.append('description', productDescription);
    formData.append('quantity', quantity);
    formData.append('price', priceBefore);
    formData.append('imageCover', imageCover);
    formData.append('category', categoryID);
    formData.append('brand', brandID);

    // .map just in formData
    colors.map((color) => {
      return formData.append('colors', color);
    });

    selectedSubCategoryID.map((items) => {
      return formData.append('subCategories', items._id);
    });

    itemImages.map((items) => {
      return formData.append('images', items);
    });
    setLoading(true);
    await dispatch(createProduct(formData));
    setLoading(false);
  };
  // get create msg
  const product = useSelector((state) => state.allProduct.product);

  useEffect(() => {
    if (loading === false) {
      setCategoryID(0);
      setColors([]);
      setImages([]);
      setProductName('');
      setProductDescription('');
      setPriceBefore('price before discount');
      setPriceAfter('price after discount');
      setQuantity('available quantity');
      setBrandID(0);
      setSelectedSubCategoryID([]);

      setTimeout(() => setLoading(true), 1500);

      if (product) {
        if (product.status === 201) {
          notify('Successfully added', 'success');
        } else {
          notify('Something wrong happen', 'error');
        }
      }
    }
  }, [loading, product]);

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
              onClick={() => setShowColor(!showColor)}
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
