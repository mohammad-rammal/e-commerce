import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategory} from '../../redux/actions/categoryAction';
import notify from '../useNotification';
import {createSubCategory} from '../../redux/actions/subCategoryAction';
import checkNetStatus from '../useCheckNetStatus';

const AddSubCategoryHook = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState('0');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkNetStatus();
    dispatch(getAllCategory());
  }, [dispatch]);

  const category = useSelector((state) => state.allCategory.category);

  // Get subCategory state
  const subCategory = useSelector((state) => state.subCategory.subcategory);

  // on drop menu
  const handleChange = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  //on name
  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  // on save data
  const handleSubmit = async (e) => {
    checkNetStatus();
    e.preventDefault();
    if (id === '0') {
      notify('Choose subcategory... ', 'warn');
      return;
    }
    if (name === '') {
      notify('Write name... ', 'warn');
      return;
    }

    setLoading(true);
    await dispatch(
      createSubCategory({
        name,
        category: id,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      setName('');
      setId('0');
      if (subCategory.status === 201) {
        notify('Successfully added subCategory', 'success');
      } else if (subCategory === 'Error AxiosError: Request failed with status code 505') {
        notify('Write another name', 'warn');
      } else {
        notify('Something wrong happen', 'error');
      }
      setLoading(true);
    }
  }, [loading, subCategory]);

  return [name, category, handleChange, onChangeName, handleSubmit];
};
export default AddSubCategoryHook;
