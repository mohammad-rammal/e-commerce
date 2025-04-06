import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';

const HomeCategoryHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  // Get last category state from redux
  const category = useSelector((state) => state.allCategory.category);

  // Get last loading state from redux
  const loading = useSelector((state) => state.allCategory.loading);

  const colors = ['#d6eb77', '#9679ed', '#e2c08d', '#6ca9d2', '#c7a9e9', '#89f1af'];

  return [category, loading, colors];
};
export default HomeCategoryHook;
