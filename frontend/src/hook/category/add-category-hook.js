import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import avatar from '../../assets/images/avatar.png';
import {createCategory} from '../../redux/actions/categoryAction';
import notify from '../../hook/useNotification';

const AddCategoryHook = () => {
  const dispatch = useDispatch();

  const [img, setImg] = useState(avatar);
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [isPress, setIsPress] = useState(false);

  // Change name state
  const onChangeName = (e) => {
    // for input text preventDefault
    e.persist();

    setName(e.target.value);
  };

  // Get loading state from redux
  const res = useSelector((state) => state.allCategory.category);
  // if (res) console.log(res);

  // When user change image to save it
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
  };

  // Save data in DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || selectedFile === null) {
      notify('Complete all fields', 'warn');
      return;
    }

    // Form data for image (without image: {name:'nm'})
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', selectedFile);

    setLoadingState(true);
    // console.log('Uploading...');
    setIsPress(true);
    await dispatch(createCategory(formData));
    setLoadingState(false);
  };

  useEffect(() => {
    if (loadingState === false) {
      setName('');
      setImg(avatar);
      setSelectedFile(null);
      // console.log('Completed');
      setLoadingState(true);
      setTimeout(() => {
        setIsPress(false);
      }, 1000);

      if (res.status === 201) {
        notify('Successfully added...', 'success');
      } else {
        notify('Error...', 'error');
      }
    }
  }, [loadingState, res.status]);

  return [img, name, loadingState, isPress, onChangeName, onImageChange, handleSubmit];
};
export default AddCategoryHook;
