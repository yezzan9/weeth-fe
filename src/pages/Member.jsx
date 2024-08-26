import styled from 'styled-components';
import { useState, useContext } from 'react';

import theme from '../styles/theme';
import MemberHeader from '../components/Member/MemberHeader';
import Category from '../components/Member/Category';
import MemberName from '../components/Member/MemberName';
// import mockUser from '../components/mockData/mockUser';
import UserAPI from '../hooks/UserAPI';
import { UserContext } from '../hooks/UserContext';
import useCustomBack from '../router/useCustomBack';

const StyledMember = styled.div`
  width: 370px;
  font-family: ${theme.font.family.pretendard_regular};
  margin-bottom: 50px;
`;

const CategoryWrapper = styled.div`
  margin-left: 30px;
`;

const MemberContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberList = styled.div`
  // background-color: ${theme.color.grayScale.gray18};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 350px;
  margin: 0 10px auto;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${theme.color.grayScale.gray18};
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Margin = styled.div`
  height: 20px;
  width: 350px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${theme.color.grayScale.gray18};
`;

const Member = () => {
  useCustomBack('/home');

  const [selectedCardinal, setSelectedCardinal] = useState(0);

  const { allUserData, error } = useContext(UserContext);

  /*
  error라면 빈 배열 반환
  혹은 데이터의 값이 유효하지 않다면 빈 배열 반환
  */
  const isValid = error ? [] : allUserData?.[selectedCardinal] || [];

  let errorMessage;
  if (isValid.length === 0) {
    errorMessage = `${selectedCardinal}기 멤버가 존재하지 않습니다.`;
  } else if (error) {
    errorMessage = '멤버 정보를 불러올 수 없습니다.';
  } else errorMessage = '';

  return (
    <StyledMember>
      <UserAPI />
      <MemberHeader />
      <CategoryWrapper>
        <Category setSelectedCardinal={setSelectedCardinal} />
      </CategoryWrapper>
      <MemberContent>
        <MemberList>
          {/* isValid가 빈배열인가?(==error?)
          true: MemberName 렌더링
          false: ERROR
          */}
          {isValid.length > 0 ? (
            isValid.map((user, index) => (
              <MemberName
                key={user.studentId}
                name={user.name}
                studentId={user.studentId}
                department={user.department}
                email={user.email}
                cardinal={user.cardinals}
                position={user.position}
                isLast={index === isValid.length - 1} // 마지막 요소에만 isLast prop 전달
              />
            ))
          ) : (
            <Error>{errorMessage}</Error>
          )}
        </MemberList>
        <Margin />
      </MemberContent>
    </StyledMember>
  );
};

export default Member;
