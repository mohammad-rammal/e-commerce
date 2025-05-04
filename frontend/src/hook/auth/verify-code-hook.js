import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import notify from '../useNotification';
import {verifyCode} from '../../redux/actions/authAction';

const VerifyCodeHook = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onSubmit = async () => {
    if (code === '') {
      notify('Please write code ', 'warn');
      return;
    }
    setLoading(true);
    await dispatch(
      verifyCode({
        resetCode: code,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.authentication.verifyCode);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);

        if (res.data.status === 'Success') {
          notify('Success verify password reset code', 'success');
          setTimeout(() => {
            navigate('/user/reset-password');
          }, 2000);
        }
        if (res.data.status === 'fail') {
          notify('Invalid reset code or expired!', 'error');
          setTimeout(() => {
            // navigate('/');
          }, 2000);
        }
      }
    }
  }, [loading]);

  return [onChangeCode, onSubmit, code, loading, isPress];
};
export default VerifyCodeHook;
