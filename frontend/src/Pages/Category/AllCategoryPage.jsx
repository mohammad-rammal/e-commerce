import {useEffect} from 'react';
import CategoryContainer from '../../Components/Category/CategoryContainer';
import Pagination from '../../Components/utilities/Pagination';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';

const AllCategoryPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const data = useSelector((state) => state.allCategory.category);
  const loading = useSelector((state) => state.allCategory.loading);

  return (
    <div className="min-vh-100">
      <CategoryContainer />
      <Pagination />
    </div>
  );
};
export default AllCategoryPage;
