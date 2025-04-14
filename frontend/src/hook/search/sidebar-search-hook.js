import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';
import {getAllBrand} from '../../redux/actions/brandAction';

const SidebarSearchHook = () => {
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

  let category = [];
  if (allCategory.data) {
    category = allCategory.data;
  }

  let brand = [];
  if (allBrand.data) {
    brand = allBrand.data;
  }

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

  return [category, brand, clickCategory, clickBrand];
};
export default SidebarSearchHook;
