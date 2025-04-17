/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react';
import ViewSearchProductHook from '../product/view-search-product-hook';

const NavbarSearchHook = () => {
  const [items, pagination, onPress, getProducts] = ViewSearchProductHook();

  const [searchWord, setSearchWord] = useState('');

  const OnChangeSearch = (e) => {
    localStorage.setItem('searchWord', e.target.value);
    setSearchWord(e.target.value);

    const path = window.location.pathname;
    if (path != '/allproducts') {
      window.location.href = '/allproducts';
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [searchWord]);

  return [OnChangeSearch, searchWord];
};
export default NavbarSearchHook;
