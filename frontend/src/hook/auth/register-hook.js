import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import notify from '../useNotification';
import {createNewUser} from '../../redux/actions/authAction';
import {useNavigate} from 'react-router-dom';

const RegisterHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState('');

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validationValues = () => {
    if (name === '' || email === '' || phone === '' || password === '' || confirmPassword === '') {
      notify('Missing fields', 'error');
      return;
    }
    if (phone.length <= 5) {
      notify('Write valid phone number', 'error');
      return;
    }
    if (password !== confirmPassword) {
      notify('Check the password not same confirm password', 'error');
      return;
    }
  };

  const res = useSelector((state) => state.authentication.createUser);

  // save data
  const onSubmit = async () => {
    validationValues();
    // still loading
    setLoading(true);
    await dispatch(
      createNewUser({
        name,
        email,
        phone,
        password,
        passwordConfirm: confirmPassword,
      })
    );
    // after finish save will stop loading
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);

        if (res.errors) {
          if (res.errors[0].msg === 'Email already exists!') {
            notify('Email already exists!', 'error');
          }
        }

        if (res.errors && Array.isArray(res.errors)) {
          res.errors.forEach((err) => notify(err.msg, 'error'));
        } else if (res.data && res.data.token) {
          localStorage.setItem('token', res.data.token);
          notify('Registered successfully!', 'success');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      }
    }
  }, [loading]);

  return [
    name,
    email,
    phone,
    password,
    confirmPassword,
    loading,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    onSubmit,
  ];
};
export default RegisterHook;
