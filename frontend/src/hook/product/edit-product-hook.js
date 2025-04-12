import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';
import checkNetStatus from '../../hook/useCheckNetStatus';
import {getAllBrand} from '../../redux/actions/brandAction';

import {getSubCategory} from '../../redux/actions/subCategoryAction';
import {getOneProduct, updateProduct} from '../../redux/actions/productAction';
import notify from '../../hook/useNotification';

const AdminEditProductHook = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      await checkNetStatus();
      await dispatch(getOneProduct(id));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };

    run();
  }, [dispatch, id]);

  // get one product details
  const item = useSelector((state) => state.allProduct.oneProduct);

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

  useEffect(() => {
    if (item.data) {
      setProductName(item.data.title);
      setProductDescription(item.data.description);
      setPriceBefore(item.data.price);
      setQuantity(item.data.quantity);
      setCategoryID(item.data.category);
      setBrandID(item.data.brand);
      setColors(item.data.colors);

      if (item.data.images && Array.isArray(item.data.images)) {
        const formattedImages = item.data.images.map((imgUrl) => ({
          data_url: imgUrl,
        }));
        setImages(formattedImages);
      }
    }
  }, [item.data]);

  // for selected sub category
  useEffect(() => {
    if (item?.data?.subCategories) {
      const matchedSubs = options.filter((opt) => item.data.subCategories.includes(opt._id));
      setSelectedSubCategoryID(matchedSubs);
    }
  }, [options, item.data]);

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
    setCategoryID(e.target.value);
  };

  useEffect(() => {
    if (categoryID != 0) {
      const run = async () => {
        await dispatch(getSubCategory(categoryID));
      };
      run();
    }
  }, [categoryID, dispatch]);

  useEffect(() => {
    if (subCategory.data) {
      setOptions(subCategory.data);
    }
  }, [item.subCategories, selectedSubCategoryID, subCategory.data]);

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
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      console.error('Invalid data URL:', dataurl);
      return null; // Or throw an error or return a fallback File
    }

    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  const convertURLtoFile = async (url) => {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.blob();
    const ext = url.split('.').pop();
    const filename = url.split('/').pop();
    const metadata = {type: `image/${ext}`};
    return new File([data], Math.random(), metadata);
  };

  // save data
  const handleSubmit = async (e) => {
    console.log('Handle');

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

    // image base = convert url to base 64 else {already base 64}
    let imageCover;
    if (images[0].length <= 1000) {
      convertURLtoFile(images[0]).then((val) => (imageCover = val));

      //log(val)
    } else {
      imageCover = dataURLtoFile(images[0].data_url, Math.random() + '.png');
    }

    let itemImages = [];
    Array.from(Array(Object.keys(images).length).keys()).map((items, index) => {
      if (images[index].length <= 1000) {
        convertURLtoFile(images[index]).then((val) => itemImages.push(val));
      } else {
        itemImages.push(dataURLtoFile(images[index].data_url, Math.random() + '.png'));
      }
    });

    //!
    // const imageCover = dataURLtoFile(images[0].data_url, Math.random() + '.png');

    // const itemImages = Array.from(Array(Object.keys(images).length).keys()).map((items, index) => {
    //   return dataURLtoFile(images[index].data_url, Math.random() + '.png');
    // });
    //!

    const formData = new FormData();
    formData.append('title', productName);
    formData.append('description', productDescription);
    formData.append('quantity', quantity);
    formData.append('price', priceBefore);
    formData.append('category', categoryID);
    formData.append('brand', brandID);

    // .map just in formData
    colors.map((color) => {
      return formData.append('colors', color);
    });

    selectedSubCategoryID.map((items) => {
      return formData.append('subCategories', items._id);
    });

    setTimeout(() => {
      formData.append('imageCover', imageCover);

      itemImages.map((items) => {
        return formData.append('images', items);
      });
    }, 1000);

    setTimeout(async () => {
      setLoading(true);
      await dispatch(updateProduct(id, formData));
      setLoading(false);
    }, 1000);
  };
  // get create msg
  const product = useSelector((state) => state.allProduct.updateProduct);

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
          notify('Successfully updated', 'success');
        } else {
          notify('Something wrong happen', 'error');
        }
      }
    }
  }, [loading, product]);

  return [
    selectedSubCategoryID,
    brandID,
    categoryID,
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
export default AdminEditProductHook;
