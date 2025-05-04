import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {forgetPassword} from '../../redux/actions/authAction';
import notify from '../useNotification';

const ForgetPasswordHook = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async () => {
    if (email === '') {
      notify('Please write your email ', 'warn');
      return;
    }

    localStorage.setItem('user-email', email);

    setLoading(true);
    await dispatch(
      forgetPassword({
        email,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.authentication.forgetPassword);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);

        if (res.data.status === 'Success') {
          notify('Please open your email to reset your password', 'success');
          setTimeout(() => {
            navigate('/user/verify-code');
          }, 2000);
        }
        if (res.data.status === 'fail') {
          notify('There is no user with this email', 'error');
          setTimeout(() => {
            // navigate('/');
          }, 2000);
        }
      }
    }
  }, [loading]);

  return [onChangeEmail, onSubmit, email, loading, isPress];
};
export default ForgetPasswordHook;
