import React, { useState } from 'react';
import styled from 'styled-components';
import SignupHeader from '../components/Signup/SignupHeader';
import SignupTextComponent from '../components/Signup/SignupTextComponent';
import SignupWhite from '../components/Signup/SignupWhite';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0; /* 상단 여백 제거 */
`;

const TextMargin1 = styled.div`
  margin-bottom: 15px;
`;

const CheckButton = styled.button`
  margin-top: 1.8%;
  text-align: right; /* 이걸 바꿈 maring-right: 7% */
  background: none;
  border: none;
  color: ${props => props.checked ? (props.isDuplicate ? '#ff5858' : '#508fff') : '#508fff'};
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: ${props => props.checked ? 'none' : 'underline'};

  &:hover {
    text-decoration: ${props => props.checked ? 'none' : 'underline'};
  }
`;

const StatusMessage = styled.div`
  margin-left: 25px;
  margin-top: 10px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.isDuplicate ? '#ff5858' : '#508fff')};
`;

const HeaderMargin = styled.div`
  height: 228px;
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(null); // null: 초기 상태, 'duplicate': 중복, 'available': 사용 가능
  const [isChecked, setIsChecked] = useState(false);

  const checkDuplicate = (email) => {
    const existingEmails = ['weetha123@gmail.com', 'test@naver.com'];
    return existingEmails.includes(email);
  };

  const handleCheckEmail = () => {
    const isDuplicate = checkDuplicate(email);
    setEmailStatus(isDuplicate ? 'duplicate' : 'available');
    setIsChecked(true);
  };

  const handleNextClick = () => {
    console.log('다음 버튼 클릭됨');
  };

  const handlePrevClick = () => {
    console.log('이전 페이지로 이동');
  };

  return (
    <Container>
      <SignupHeader
        onClickLeftButton={handlePrevClick}
        isRightButtonEnabled={isChecked}
        onClickTextButton={handleNextClick}
        nextButtonText="다음"  // 추가된 부분
      />
      <HeaderMargin />
      <SignupWhite text="ID로 사용할 메일을 적어주세요" />
      <TextMargin1 />
      <SignupTextComponent />
    </Container>
  );
};

export default Signup;