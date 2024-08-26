import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupHeader from '../components/Signup/SignupHeader';
import SignupTextComponent from '../components/Signup/SignupTextComponent';
import { ReactComponent as ToggleVisibleIcon } from '../assets/images/ic_toggleVisible.svg';
import { ReactComponent as ToggleInvisibleIcon } from '../assets/images/ic_toggleInvisible.svg';
import theme from '../styles/theme';
import useCustomBack from '../router/useCustomBack';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0;
`;

const InputContainer = styled.div`
  margin-top: 119px;
`;

const ToggleVisibilityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CheckButton = styled.button`
  margin: 10px 6% 30px 0;
  background: none;
  border: none;
  color: ${theme.color.main.mainColor};
  font-family: ${theme.font.family.pretendard_semiBold};
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  &:disabled {
    cursor: not-allowed;
  }
`;

const MessageText = styled.span`
  margin: 10px 6% 30px 0;
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
`;

const Signup = () => {
  useCustomBack('/');

  const navi = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIschecked] = useState(false);

  const validateEmail = (vaildEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(vaildEmail);
  };

  // eslint-disable-next-line consistent-return
  const checkDuplicate = async (DuplicatedEmail) => {
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(
        `${BASE_URL}/api/v1/users/email?email=${DuplicatedEmail}`,
        {},
      );
      console.log(response);

      if (response.data.code === 200) {
        return response.data.data;
      }
    } catch (error) {
      if (error.response && error.response.data.code === 400) {
        return false; // Email is duplicate
      }
      console.error('An error occurred:', error);
      return null;
    }
  };

  const handleCheckEmail = async () => {
    if (email === '') {
      alert('이메일을 입력해 주세요.');
    } else if (!validateEmail(email)) {
      alert('유효한 이메일 형식을 입력해주세요.');
    } else {
      const isDuplicate = await checkDuplicate(email);
      setEmailStatus(isDuplicate ? 'available' : 'duplicate');
      setIschecked(true);
    }
  };

  const handleNextClick = () => {
    if (email === '') {
      alert('이메일을 입력해 주세요.');
      return;
    }

    if (!isChecked) {
      alert('가입 여부를 확인해 주세요.');
      return;
    }

    if (emailStatus === 'duplicate') {
      alert('이메일을 다시 확인해 주세요.');
      return;
    }

    if (password.trim() === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    if (password.length < 4 || password.length > 8) {
      alert('비밀번호를 4~8자리로 입력해 주세요.');
      return;
    }
    navi('/profile', { state: { email, password } });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '');
    setEmail(emailValue);
    setEmailStatus(null);
    setIschecked(false); // 이메일이 변경될 때마다 isChecked 상태를 false로 초기화
  };

  const handlePasswordChange = (e) => {
    const pwValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setPassword(pwValue);
  };

  return (
    <Container>
      <SignupHeader
        isRightButtonEnabled={
          validateEmail(email) &&
          emailStatus !== 'duplicate' &&
          password.trim() !== '' &&
          isChecked &&
          !(password.length < 4 || password.length > 8)
        }
        onClickTextButton={handleNextClick}
      />
      <InputContainer>
        <SignupTextComponent
          text="ID로 사용할 메일을 적어주세요."
          value={email}
          onChange={handleEmailChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleNextClick();
          }}
          placeholder="ex) weeth@gmail.com"
          type=""
        />
        <ButtonContainer>
          {!isChecked && (
            <CheckButton onClick={handleCheckEmail} underline>
              가입 여부 확인
            </CheckButton>
          )}
          {isChecked && (
            <MessageText
              style={{
                color:
                  emailStatus === 'duplicate'
                    ? theme.color.main.negative
                    : theme.color.main.positive,
              }}
            >
              {emailStatus === 'duplicate'
                ? '이미 가입된 ID입니다.'
                : '사용 가능한 ID입니다.'}
            </MessageText>
          )}
        </ButtonContainer>
        <SignupTextComponent
          text="사용할 비밀번호를 입력해주세요."
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleNextClick();
          }}
          placeholder="4~8자리 / 영문 대소문자, 숫자 조합"
          type={passwordVisible ? 'text' : 'password'}
        >
          <ToggleVisibilityButton onClick={togglePasswordVisibility}>
            {passwordVisible ? <ToggleVisibleIcon /> : <ToggleInvisibleIcon />}
          </ToggleVisibilityButton>
        </SignupTextComponent>
      </InputContainer>
    </Container>
  );
};

export default Signup;
