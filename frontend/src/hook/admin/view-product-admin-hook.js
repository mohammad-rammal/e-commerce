import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchParams} from 'react-router-dom'; // Import useSearchParams
import {getAllProductsPage} from '../../redux/actions/productAction';

const ViewProductAdminHook = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromURL = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(getAllProductsPage(9, pageFromURL));
  }, [dispatch, pageFromURL]);

  const allProducts = useSelector((state) => state.allProduct.allProducts);

  let items = [];
  if (allProducts.data) {
    items = allProducts.data;
  }

  let pagination = [];
  if (allProducts.paginationResult) {
    pagination = allProducts.paginationResult.numberOfPages;
  }

  const pageCount = pagination || 0;

  const onPress = async (page) => {
    await dispatch(getAllProductsPage(9, page));
    setSearchParams({page: page.toString()});
  };

  return [items, pageCount, pageFromURL, onPress];
};

export default ViewProductAdminHook;
