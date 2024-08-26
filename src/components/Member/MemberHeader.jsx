import styled from 'styled-components';

import LeftButton from '../Header/LeftButton';
import Title from '../Header/Title';
import theme from '../../styles/theme';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 25px 20px 25px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const UserHeader = () => {
  return (
    <StyledHeader>
      <LeftButton />
      <TitleWrapper>
        <Title text="멤버" />
      </TitleWrapper>
    </StyledHeader>
  );
};

export default UserHeader;
