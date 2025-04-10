import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from '../../redux/actions/productAction';

const ViewProductsHomeHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(4));
  }, [dispatch]);

  const allProducts = useSelector((state) => state.allProduct.allProducts);

  let items = [];
  if (allProducts.data) {
    items = allProducts.data.slice(0, 4);
    console.log(items);
  } else {
    items = [];
  }

  return [items];
};
export default ViewProductsHomeHook;
