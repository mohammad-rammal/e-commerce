/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProductsSearch, getResultProducts} from '../../redux/actions/productAction';

const ViewSearchProductHook = () => {
  const limit = 8;
  const dispatch = useDispatch();

  // Declare these variables above useCallback to keep scope clean
  let word = '';
  let queryCategory = '';
  let queryBrand = '';
  let priceTo = '';
  let priceFrom = '';
  let priceFromString = '';
  let priceToString = '';
  let sortType = '';
  let sort = '';

  const getStorage = () => {
    // Search keyword
    if (localStorage.getItem('searchWord') != null) {
      word = localStorage.getItem('searchWord');
    }

    // Category filter
    if (localStorage.getItem('categoryChecked') != null) {
      queryCategory = localStorage.getItem('categoryChecked');
    }

    // Brand filter
    if (localStorage.getItem('brandChecked') != null) {
      queryBrand = localStorage.getItem('brandChecked');
    }

    // Price range
    if (localStorage.getItem('priceFrom') != null) {
      priceFrom = localStorage.getItem('priceFrom');
    }

    if (localStorage.getItem('priceTo') != null) {
      priceTo = localStorage.getItem('priceTo');
    }

    priceFromString = priceFrom && priceFrom > 0 ? `&price[gt]=${priceFrom}` : '';
    priceToString = priceTo && priceTo > 0 ? `&price[lt]=${priceTo}` : '';
  };

  const sortData = () => {
    if (localStorage.getItem('sortType') != null) {
      sortType = localStorage.getItem('sortType');
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

  const getProducts = useCallback(async () => {
    getStorage();
    sortData();

    const fullQuery = `sort=${sort}&limit=${limit}&keyword=${word}&${queryCategory}&${queryBrand}${priceFromString}${priceToString}`;
    await dispatch(getAllProductsSearch(fullQuery));
    await dispatch(
      getResultProducts(
        `keyword=${word}&${queryCategory}&${queryBrand}${priceFromString}${priceToString}`
      )
    );
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const allProducts = useSelector((state) => state.allProduct.allProducts);
  const resultProducts = useSelector((state) => state.allProduct.resultProducts);

  let items = [];
  let pagination = [];
  let results = 0;

  try {
    console.log('All products', allProducts);

    items = allProducts?.data || [];
    console.log('items', items);

    pagination = resultProducts?.result > 0 ? allProducts?.paginationResult?.numberOfPages || 0 : 0;

    console.log('pagination', pagination);

    results = resultProducts?.result || 0;
  } catch (error) {}

  // Pagination click
  const onPress = async (page) => {
    getStorage();
    sortData();

    const fullQuery = `sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&${queryCategory}&${queryBrand}${priceFromString}${priceToString}`;
    await dispatch(getAllProductsSearch(fullQuery));
  };

  return [items, pagination, onPress, getProducts, results];
};

export default ViewSearchProductHook;
