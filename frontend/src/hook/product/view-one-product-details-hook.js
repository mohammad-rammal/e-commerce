import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getOneProduct, getProductLike} from '../../redux/actions/productAction';
import noImage from '../../assets/images/1200px-No-Image-Placeholder.svg.jpg';
import {getOneBrand} from '../../redux/actions/brandAction';
import {getOneCategory} from '../../redux/actions/categoryAction';
// import {getOneCategory} from '../../redux/actions/categoryAction';

const ViewOneProductDetailsHook = (productID) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneProduct(productID));
  }, [dispatch, productID]);

  const oneProduct = useSelector((state) => state.allProduct.oneProduct);
  const oneBrand = useSelector((state) => state.allBrand.oneBrand);
  const oneCategory = useSelector((state) => state.allCategory.oneCategory);
  const productLike = useSelector((state) => state.allProduct.productLike);

  let item = oneProduct?.data || {};

  useEffect(() => {
    if (item.brand) {
      dispatch(getOneBrand(item.brand));
    }
    if (item.category) {
      dispatch(getOneCategory(item.category));
    }
    if (item.category) {
      dispatch(getProductLike(item.category));
    }
  }, [dispatch, item.brand, item.category]);

  let images = item.images ? item.images.map((img) => ({original: img})) : [{original: noImage}];

  let brand = oneBrand?.data || {};
  let category = oneCategory?.data || {};

  let prod = [];
  if (productLike) {
    prod = productLike.data;
  } else {
    prod = [];
  }
  // useEffect(() => {
  //   if (item.category) {
  //     dispatch(getOneCategory(item.category));
  //   }
  // }, [dispatch, item]);

  // // show one category item
  // let category = [];
  // if (oneCategory.data) {
  //   category = oneCategory.data;
  // } else {
  //   category = [];
  // }

  return [item, images, brand, category, prod];
};

export default ViewOneProductDetailsHook;
