/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginHeader from '../components/Login/LoginHeader';
import SignupTextComponent from '../components/Signup/SignupTextComponent';
import { ReactComponent as ToggleVisibleIcon } from '../assets/images/ic_toggleVisible.svg';
import { ReactComponent as ToggleInvisibleIcon } from '../assets/images/ic_toggleInvisible.svg';
import useCustomBack from '../router/useCustomBack';
import theme from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0;
`;

const LoginHeaderMargin = styled.div`
  margin-bottom: 119px;
`;

const TextMargin = styled.div`
  margin-top: 30px;
`;

const ErrorMessage = styled.div`
  right: 0;
  color: ${theme.color.main.negative};
  margin: 15px 0 0 -5%;
  font-size: 14px;
  text-align: right;
  width: 100%;
`;

const Login = () => {
  useCustomBack('/');

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);

  const validateEmail = (vaildEmail) => {
    return vaildEmail.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePwd = (pw) => {
    return pw.length >= 4 && pw.length <= 8;
  };

  const isEmailValid = email && validateEmail(email);
  const isPwdValid = password && validatePwd(password);
  const isAllValid = isEmailValid && isPwdValid;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
    setEmail(emailValue);
    setError(null);
  };

  const handlePasswordChange = (e) => {
    const pwValue = e.target.value.replace(
      /[~!@#$%";'^,&*()_+|</>=>`?:{}\\]/g,
      '',
    );
    setPassword(pwValue);
    setError(null);
  };

  const handleLogin = async () => {
    if (email === '') {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (!validateEmail(email)) {
      alert('형식에 맞지 않는 이메일입니다.');
      return;
    }
    if (password === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    if (password.length < 4 || password.length > 8) {
      alert('비밀번호를 4~8자리로 입력해 주세요.');
      return;
    }
    const params = {
      email,
      password,
    };

    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(`${BASE_URL}/api/v1/login`, params);

      if (response.status === 200) {
        setError(null);
        // console.log(response);
        const newToken = response.headers.authorization;
        const newRefreshToken = response.headers.authorization_refresh;
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        console.log('login token', newToken, newRefreshToken);

        navigate('/home');
      }
    } catch (err) {
      console.error('Error:', err);

      if (err.response) {
        setError(err.response.data); // 서버에서 제공하는 오류 메시지를 설정
      } else if (err.request) {
        setError('서버로부터 응답을 받지 못했습니다.');
      } else {
        setError('요청을 설정하는 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <LoginHeader
        isRightButtonEnabled={!!isAllValid && isPwdValid && isEmailValid}
        onCompleteClick={handleLogin}
      />
      <LoginHeaderMargin />
      <SignupTextComponent
        text="email"
        value={email}
        onChange={handleEmailChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleLogin();
        }}
        placeholder="ex) weeth@gmail.com"
        type="text"
        children=""
      />
      <TextMargin />
      <SignupTextComponent
        text="password"
        value={password}
        onChange={handlePasswordChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleLogin();
        }}
        placeholder=""
        type={passwordVisible ? 'text' : 'password'}
      >
        {passwordVisible ? (
          <ToggleVisibleIcon
            alt=""
            onClick={togglePasswordVisibility}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ) : (
          <ToggleInvisibleIcon
            alt=""
            onClick={togglePasswordVisibility}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        )}
      </SignupTextComponent>
      <ErrorMessage>{error}</ErrorMessage>
    </Container>
  );
};

export default Login;
