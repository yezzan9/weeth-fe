import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import MyPageHeader from '../components/MyPage/MyPageHeader';
import InfoInput from '../components/MyPage/InfoInput';
// import mockUser from '../components/mockData/mockUser';

import { UserContext } from '../hooks/UserContext';

const StyledEdit = styled.div`
  width: 370px;
  padding-bottom: 183px;
`;

const InfoWrapper = styled.div`
  padding-top: 20px;
`;

const NoEdit = styled.div`
  pointer-events: none;
  touch-action: none;
`;

const Edit = () => {
  const [userInfo, setUserInfo] = useState(UserContext);
  const { userData, error } = useContext(UserContext);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }
  const editValue = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  // const saveEditInfo = () => {
  //   userData = userInfo;
  // };

  return (
    <StyledEdit>
      <MyPageHeader isEdit />
      <InfoWrapper>
        <InfoInput
          text="이름"
          origValue={userData.name}
          editValue={(value) => editValue('name', value)}
        />
        <InfoInput
          text="학번"
          origValue={userData.studentId}
          editValue={(value) => editValue('studentId', value)}
        />
        <InfoInput
          text="학과"
          origValue={userData.department}
          editValue={(value) => editValue('department', value)}
        />
        <InfoInput
          text="핸드폰"
          origValue={userData.tel}
          editValue={(value) => editValue('tel', value)}
        />
        <NoEdit>
          <InfoInput
            text="기수"
            origValue={userData.cardinal}
            editValue={(value) => editValue('cardinal', value)}
          />
        </NoEdit>
        <InfoInput
          text="역할"
          origValue={userData.position}
          editValue={(value) => editValue('position', value)}
        />
        <InfoInput
          text="메일"
          origValue={userData.email}
          editValue={(value) => editValue('email', value)}
        />
      </InfoWrapper>
    </StyledEdit>
  );
};

export default Edit;
