import CategoryContainer from '../../Components/Category/CategoryContainer';
import Pagination from '../../Components/utilities/Pagination';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCategory, getAllCategoryPage} from '../../redux/actions/categoryAction';

const AllCategoryPage = () => {
  const dispatch = useDispatch();

  // First load of page (run)
  useEffect(() => {
    dispatch(getAllCategory(6));
  }, [dispatch]);

  // Get data (state) from redux
  const category = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  // Get Page count
  let pageCount = 0;
  if (category.paginationResult) {
    pageCount = category.paginationResult.numberOfPages;
  }

  // Pagination
  const getPage = (pageNumber) => {
    dispatch(getAllCategoryPage(6, pageNumber));
  };

  return (
    <div className="min-vh-100">
      <CategoryContainer data={category.data} loading={loading} />
      {pageCount > 1 ? <Pagination pageCount={pageCount} onPress={getPage} /> : null}
    </div>
  );
};
export default AllCategoryPage;
