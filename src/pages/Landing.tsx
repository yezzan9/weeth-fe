import Button from '@/components/Button/Button';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import logo from '@/assets/images/logo/logo_full_Xmas.svg';
import kakao from '@/assets/images/ic_KAKAO_symbol.svg';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

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

const ButtonWrapper = styled.div<{ visible: boolean }>`
  margin-top: 112px;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;

  ${({ visible }) =>
    visible &&
    css`
      animation: ${fadeIn} 2s ease-in-out forwards;
    `}
`;

const KakaoLoginButton = styled(Button)`
  width: 100%;
`;

const SignUpbutton = styled.button`
  margin-bottom: 198px;
  all: unset;
  text-color: ${theme.color.gray[100]};
  border-bottom: 1px solid ${theme.color.gray[100]};
`;

const Landing: React.FC = () => {
  useCustomBack('/');

  const navigate = useNavigate();
  const [showButtonWrapper, setShowButtonWrapper] = useState(false);

  const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtonWrapper(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <StyledTitle>
        <img src={logo} alt="leets로고" />
      </StyledTitle>
      <ButtonWrapper visible={showButtonWrapper}>
        <KakaoLoginButton
          color={theme.color.kakao}
          textcolor="#000000"
          onClick={() => {
            window.location.href = kakaoURL;
          }}
        >
          <img
            src={kakao}
            alt="카카오"
            style={{
              marginRight: '10px',
            }}
          />
          카카오로 로그인
        </KakaoLoginButton>
        <SignUpbutton
          onClick={() => {
            window.location.href = kakaoURL;
          }}
        >
          신규 회원가입
        </SignUpbutton>
      </ButtonWrapper>
    </Container>
  );
};

export default Landing;
