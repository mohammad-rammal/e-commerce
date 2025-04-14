/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllProducts,
  getAllProductsPage,
  getAllProductsSearch,
  getResultProducts,
} from '../../redux/actions/productAction';

const ViewSearchProductHook = () => {
  let limit = 8;
  const dispatch = useDispatch();

  const getProducts = useCallback(async () => {
    let word = '';
    if (localStorage.getItem('searchWord') != null) {
      word = localStorage.getItem('searchWord');
    }
    sortData();
    await dispatch(getAllProductsSearch(`sort=${sort}&limit=${limit}&keyword=${word}`));
    await dispatch(getResultProducts(`keyword=${word}`));
  }, [dispatch, limit]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const allProducts = useSelector((state) => state.allProduct.allProducts);
  const resultProducts = useSelector((state) => state.allProduct.resultProducts);

  let results = 0;
  let items = [];
  try {
    if (allProducts.data) {
      items = allProducts.data;
    } else {
      items = [];
    }
  } catch (error) {}

  let pagination = [];
  try {
    if (allProducts.paginationResult) {
      pagination = allProducts.paginationResult.numberOfPages;
    } else {
      pagination = [];
    }
  } catch (error) {}

  try {
    if (resultProducts.result) {
      results = resultProducts.result;
    } else {
      results = 0;
    }
  } catch (error) {}

  // page from pagination page for number of page
  const onPress = async (page) => {
    let word = '';
    if (localStorage.getItem('searchWord') != null) {
      word = localStorage.getItem('searchWord');
    }

    sortData();
    await dispatch(
      getAllProductsSearch(`sort=${sort}&limit=${limit}&page=${page}&keyword=${word}`)
    );
  };

  let sortType = '';
  let sort;
  // sort data type
  const sortData = () => {
    if (localStorage.getItem('sortType') != null) {
      sortType = localStorage.getItem('sortType');
    } else {
      sortType = '';
    }
    if (sortType === 'Price Low to High') {
      sort = 'price';
    } else if (sortType === 'Price High to Low') {
      sort = '-price';
    } else if (sortType === 'Top Rated') {
      sort = 'ratingsQuantity';
    } else if (sortType === 'Best Sellers') {
      sort = 'sold';
    } else {
      sort = '';
    }
  };

  return [items, pagination, onPress, getProducts, results];
};
export default ViewSearchProductHook;
