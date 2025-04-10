import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../../redux/actions/productAction';

const ViewSearchProductHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const allProducts = useSelector((state) => state.allProduct.allProducts);

  let items = [];
  if (allProducts.data) {
    items = allProducts.data;
    console.log(items);
  } else {
    items = [];
  }

  return [items];
};
export default ViewSearchProductHook;
