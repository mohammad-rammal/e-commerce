import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts, getAllProductsPage} from '../../redux/actions/productAction';

const ViewSearchProductHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(8));
  }, [dispatch]);

  const allProducts = useSelector((state) => state.allProduct.allProducts);

  let items = [];
  if (allProducts.data) {
    items = allProducts.data;
  } else {
    items = [];
  }

  let pagination = [];
  if (allProducts.paginationResult) {
    pagination = allProducts.paginationResult.numberOfPages;
  } else {
    pagination = [];
  }

  if (pagination) {
    var pageCount = pagination;
  } else {
    pageCount = 0;
  }

  // page from pagination page for number of page
  const onPress = async (page) => {
    await dispatch(getAllProductsPage(8, page));
  };

  return [items, pageCount, onPress];
};
export default ViewSearchProductHook;
