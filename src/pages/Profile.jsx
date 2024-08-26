import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import theme from '../styles/theme';
import SignupMemInput from '../components/Signup/SignupMemInput';
import SignupHeader from '../components/Signup/SignupHeader';
import RoleSector from '../components/Signup/RoleSector';
import SignupDropDown from '../components/Signup/SignupDropDown';
import useCustomBack from '../router/useCustomBack';

const ProfileContainer = styled.div`
  width: 370px;
  height: 812px;
  max-width: 370px;
  overflow-x: hidden; /* 가로 스크롤 삭제 */
`;

const HeaderText = styled.div`
  display: flex;
  margin: 110px 0 0 7%;
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const InputContainer = styled.div`
  margin-top: 50px;
`;

const InputWrapper = styled.div`
  margin-bottom: 33px; /* 요소 간 간격 33px */
`;

const roleMapping = {
  프론트: 'FE',
  백: 'BE',
  디자인: 'D',
};

const Profile = () => {
  useCustomBack('/signup');

  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state || { email: '', password: '' };

  const [memberInfo, setMemberInfo] = useState({ email, password });
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const handleNextClick = async () => {
    const allFieldsFilled = [
      'name',
      'studentId',
      'department',
      'tel',
      'cardinal',
      'position',
    ].every(
      (field) =>
        typeof memberInfo[field] === 'string' &&
        memberInfo[field].trim() !== '',
    );

    if (memberInfo.studentId && memberInfo.studentId.trim().length < 9) {
      alert('올바른 학번을 입력해 주세요.');
      return;
    }
    if (memberInfo.tel && memberInfo.tel.trim().length < 11) {
      alert('올바른 휴대폰 번호를 입력해 주세요.');
      return;
    }

    if (!allFieldsFilled) {
      alert('입력되지 않은 값이 있습니다.');
      return;
    }

    const mappedMemberInfo = {
      ...memberInfo,
      position: roleMapping[memberInfo.position] || memberInfo.position, // Map the role value
    };

    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/apply`,
        mappedMemberInfo,
      );

      if (response.data.code === 200) {
        alert('가입 완료!');
        navigate('/');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert(error.response?.data.message || error.message);
      console.error(
        'Error submitting form:',
        error.response?.data || error.message,
      );
    }
  };

  const handleChange = (key, value) => {
    const newMemberInfo = { ...memberInfo, [key]: value };
    setMemberInfo(newMemberInfo);

    const allFieldsFilled = [
      'name',
      'studentId',
      'department',
      'tel',
      'cardinal',
      'position',
    ].every(
      (field) =>
        typeof newMemberInfo[field] === 'string' &&
        newMemberInfo[field].trim() !== '',
    );

    setIsNextEnabled(allFieldsFilled);
  };

  const getNextButtonColor = () => {
    return isNextEnabled ? 'green' : 'white';
  };

  return (
    <ProfileContainer>
      <SignupHeader
        isRightButtonEnabled={isNextEnabled}
        onClickTextButton={handleNextClick}
        nextButtonColor={getNextButtonColor()}
      />
      <HeaderText>동아리원의 정보를 입력해주세요.</HeaderText>
      <InputContainer>
        <InputWrapper>
          <SignupMemInput
            labelName="이름"
            placeholderText="홍길동"
            origValue={memberInfo.name || ''}
            inputType="text"
            onChange={(value) => handleChange('name', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <SignupMemInput
            labelName="학번"
            placeholderText="202412345"
            origValue={memberInfo.studentId || ''}
            inputType="number"
            onChange={(value) => handleChange('studentId', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <SignupDropDown
            text="학과"
            origValue={memberInfo.department || ''}
            editValue={(value) => handleChange('department', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <SignupMemInput
            labelName="핸드폰"
            placeholderText="01012341234"
            origValue={memberInfo.tel || ''}
            inputType="number"
            onChange={(value) => handleChange('tel', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <SignupMemInput
            labelName="기수"
            placeholderText="3"
            origValue={memberInfo.cardinal || ''}
            inputType="number"
            onChange={(value) => handleChange('cardinal', value)}
          />
        </InputWrapper>
        <InputWrapper>
          <RoleSector
            labelName="역할"
            value={memberInfo.position || ''}
            onChange={(value) => handleChange('position', value)}
          />
        </InputWrapper>
      </InputContainer>
    </ProfileContainer>
  );
};

export default Profile;
