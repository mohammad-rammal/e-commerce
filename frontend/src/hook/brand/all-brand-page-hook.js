import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllBrand, getAllBrandPage} from '../../redux/actions/brandAction';

const AllBrandPageHook = () => {
  const dispatch = useDispatch();

  // First load of page (run)
  useEffect(() => {
    dispatch(getAllBrand(4));
  }, [dispatch]);

  // Get data (state) from redux
  const brand = useSelector((state) => state.allBrand.brand);
  const loading = useSelector((state) => state.allBrand.loading);

  // Get Page count
  let pageCount = 0;
  if (brand.paginationResult) {
    pageCount = brand.paginationResult.numberOfPages;
  }

  // Pagination
  const getPage = (pageNumber) => {
    dispatch(getAllBrandPage(4, pageNumber));
  };

  return [brand, loading, pageCount, getPage];
};
export default AllBrandPageHook;
