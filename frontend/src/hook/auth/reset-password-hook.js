import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import notify from '../useNotification';
import {resetPassword} from '../../redux/actions/authAction';

const ResetPasswordHook = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async () => {
    if (password === '') {
      notify('Please write the password ', 'warn');
      return;
    }
    if (password != confirmPassword) {
      notify('Password not same of confirm password ', 'warn');
      return;
    }

    setLoading(true);
    await dispatch(
      resetPassword({
        email: localStorage.getItem('user-email'),
        newPassword: password,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.authentication.resetPassword);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);

        if (res.status == 200) {
          notify('Successfully reset the password', 'success');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
        if (res.status != 200) {
          notify('Something wrong happened', 'error');
          setTimeout(() => {
            // navigate('/');
          }, 2000);
        }
      }
    }
  }, [loading]);

  return [
    onChangePassword,
    onChangeConfirmPassword,
    password,
    confirmPassword,
    onSubmit,
    loading,
    isPress,
  ];
};
export default ResetPasswordHook;
