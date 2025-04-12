import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';
import checkNetStatus from '../../hook/useCheckNetStatus';
import {getAllBrand} from '../../redux/actions/brandAction';

import {getSubCategory} from '../../redux/actions/subCategoryAction';
import {createProduct} from '../../redux/actions/productAction';
import notify from '../../hook/useNotification';

const AddProductHook = () => {
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
  // const [subCategoryID, setSubCategoryID] = useState([]);
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

  const onChangeProductName = (e) => {
    e.persist();
    setProductName(e.target.value);
  };
  const onChangeProductDescription = (e) => {
    e.persist();
    setProductDescription(e.target.value);
  };
  const onChangePriceAfter = (e) => {
    e.persist();
    setPriceAfter(e.target.value);
  };
  const onChangePriceBefore = (e) => {
    e.persist();
    setPriceBefore(e.target.value);
  };
  const onChangeQuantity = (e) => {
    e.persist();
    setQuantity(e.target.value);
  };
  const onChangeShowColor = (e) => {
    e.persist();
    setShowColor(!showColor);
  };

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
      notify('Complete missing fields!', 'warn');
      return;
    }

    if (priceAfter >= priceBefore) {
      notify('The price must be less than before discount!', 'warn');
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

  return [
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
  ];
};
export default AddProductHook;
