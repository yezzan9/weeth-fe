import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import Button from '../components/Button/Button';
import leets from '../assets/images/ic_name_logo.svg';
import useCustomBack from '../router/useCustomBack';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  height: 810px;
`;

const StyledTitle = styled.div`
  margin-top: 288px;
  line-height: 76.38px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 112px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

const SignupButton = styled(Button)`
  width: 100%;
`;

const LoginButton = styled(Button)`
  width: 100%;
  margin-bottom: 198px;
`;

const Landing = () => {
  useCustomBack('/');

  const [signupClicked, setSignupClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StyledTitle>
          <img src={leets} alt="leets로고" />
        </StyledTitle>
        <ButtonWrapper>
          <SignupButton
            color={
              signupClicked
                ? theme.color.main.selectedMain
                : theme.color.main.mainColor
            }
            textcolor={signupClicked ? '#097154' : theme.color.grayScale.white}
            onClick={() => {
              setSignupClicked(true);
              navigate('/signup');
            }}
          >
            회원가입
          </SignupButton>
          <LoginButton
            color={
              loginClicked
                ? theme.color.grayScale.gray20
                : theme.color.grayScale.gray30
            }
            textcolor={
              loginClicked
                ? theme.color.grayScale.gray12
                : theme.color.grayScale.white
            }
            onClick={() => {
              setLoginClicked(true);
              navigate('/login');
            }}
          >
            로그인
          </LoginButton>
        </ButtonWrapper>
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
