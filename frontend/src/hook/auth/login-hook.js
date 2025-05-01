import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import notify from '../useNotification';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../redux/actions/authAction';

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const res = useSelector((state) => state.authentication.loginUser);

  const onSubmit = async () => {
    setIsPress(true);
    setLoading(true);
    await dispatch(
      loginUser({
        email,
        password,
      })
    );
    setIsPress(false);
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);

        if (res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.data));
          notify('Successfully login', 'success');
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        if (res.data.message === 'Incorrect email or password') {
          notify('Incorrect email or password', 'error');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
        setLoading(true);
      }
    }
  }, [loading]);

  return [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress];
};
export default LoginHook;
