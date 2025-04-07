import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import brandReducer from './brandReducer';
import subCategoryReducer from './subCategoryReducer';

export default combineReducers({
  allCategory: categoryReducer,
  allBrand: brandReducer,
  subCategory: subCategoryReducer,
});
