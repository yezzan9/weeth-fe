import styled from 'styled-components';

import LeftButton from '../Header/LeftButton';
import Title from '../Header/Title';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 45px 25px 20px 25px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

//  해당 함수에 온클릭 이벤트 작성
const onClickLeftButton = () => {};

const UserHeader = () => {
  return (
    <StyledHeader>
      <LeftButton onClick={onClickLeftButton} />
      <TitleWrapper>
        <Title text="멤버" />
      </TitleWrapper>
    </StyledHeader>
  );
};

export default UserHeader;