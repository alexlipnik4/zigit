/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, FormEvent, useEffect } from 'react';
import { login } from '../../../common/services/authService';
import { AuthContext } from '../../../common/context/AuthContext';
import Login from './Login';
import { LoginInfo } from './Login.model';
import Cookies from 'js-cookie';
import {
  ValidationError,
  ValidationService,
} from '../../../common/services/validationService';
import { EMAIL } from './consts';
import { LocalStorageService } from '../../../common/services/localStorageService';

const LoginController = (props: any) => {
  const [userData, setUser] = useState<LoginInfo>({ email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<string[]>([]);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const authContext = useContext(AuthContext);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setTouched([...touched, target.name]);
    setUser({ ...userData, [target.name]: target.value });
  };

  useEffect(() => {
    const errors = ValidationService.checkLogin(userData).filter(error =>
      touched.includes(error.inputName),
    );
    setValidationErrors(errors);
  }, [userData]);

  const onSubmit = () => {
    setLoading(true);
    const errors = ValidationService.checkLogin(userData);
    setValidationErrors(errors);
    if (errors.length === 0) {
      login(userData)
        .then(res => {
          const { personalDetails, token } = res[0];
          if (token) {
            Cookies.set('access_token', token);
            authContext.setUser(personalDetails);
            LocalStorageService.setItem('signInData', personalDetails);
            props.history.push('/info');
          } else {
            setMessage(message);
          }
        })
        .then(() => setLoading(false))
        .catch(e => console.error(e));
    } else {
      setLoading(false);
    }
  };

  const displayError = (fieldName: string) => {
    let showError = false;
    validationErrors.forEach(error => {
      if (error.inputName === fieldName) {
        showError = true;
        fieldName === EMAIL
          ? setEmailErrorText(error.message)
          : setPasswordErrorText(error.message);
      }
    });

    if (!showError) {
      fieldName === EMAIL ? setEmailErrorText('') : setPasswordErrorText('');
    }
    return showError;
  };

  return (
    <Login
      onSubmit={onSubmit}
      onChange={onChange}
      message={message}
      userData={userData}
      loading={loading}
      validationErrors={validationErrors}
      displayError={displayError}
      emailErrorText={emailErrorText}
      passwordErrorText={passwordErrorText}
    />
  );
};

export default LoginController;
