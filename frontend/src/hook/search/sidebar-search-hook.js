import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';
import {getAllBrand} from '../../redux/actions/brandAction';
import ViewSearchProductHook from '../product/view-search-product-hook';

const SidebarSearchHook = () => {
  const [items, pagination, onPress, getProducts, results] = ViewSearchProductHook();

  const dispatch = useDispatch();

  // First load of page (run)
  useEffect(() => {
    const get = async () => {
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    get();
  }, [dispatch]);

  // Get data (state) from redux
  const allCategory = useSelector((state) => state.allCategory.category);

  // Get data (state) from redux
  const allBrand = useSelector((state) => state.allBrand.brand);

  const [queryCategoryString, setQueryCategoryString] = useState('');

  let category = [];
  if (allCategory.data) {
    category = allCategory.data;
  }

  let brand = [];
  var queryBrand = '';
  if (allBrand.data) {
    brand = allBrand.data;
  }
  // for query of checked category

  let queryCategory = '';

  const [categoryChecked, setCategoryChecked] = useState([]);
  // user choose category
  const clickCategory = (e) => {
    let value = e.target.value;
    if (value === '0') {
      setCategoryChecked([]);
    } else {
      if (e.target.checked === true) {
        setCategoryChecked([...categoryChecked, value]);
      } else if (e.target.checked === false) {
        const newArray = categoryChecked.filter((e) => e !== value);
        setCategoryChecked(newArray);
      }
    }
  };

  useEffect(() => {
    // val is the ids
    queryCategory = categoryChecked.map((val) => 'category[in][]=' + val).join('&');
    localStorage.setItem('categoryChecked', queryCategory);
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [categoryChecked]);

  const [brandChecked, setBrandChecked] = useState([]);
  // user choose brand
  const clickBrand = (e) => {
    let value = e.target.value;
    if (value === '0') {
      setBrandChecked([]);
    } else {
      if (e.target.checked === true) {
        setBrandChecked([...brandChecked, value]);
      } else if (e.target.checked === false) {
        const newArray = brandChecked.filter((e) => e !== value);
        setBrandChecked(newArray);
      }
    }
  };

  useEffect(() => {
    // val is the ids
    queryBrand = brandChecked.map((val) => 'brand[in][]=' + val).join('&');
    localStorage.setItem('brandChecked', queryBrand);
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [brandChecked]);

  const [pFrom, setPFrom] = useState(0);
  const [pTo, setPTo] = useState(0);

  const priceFrom = (e) => {
    localStorage.setItem('priceFrom', e.target.value);
    setPFrom(e.target.value);
  };

  const priceTo = (e) => {
    localStorage.setItem('priceTo', e.target.value);
    setPTo(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [pFrom, pTo]);

  return [category, brand, clickCategory, clickBrand, priceFrom, priceTo];
};
export default SidebarSearchHook;
