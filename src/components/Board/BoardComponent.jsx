import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as BoardChat } from '../../assets/images/ic_board_chat.svg';
import theme from '../../styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 87px;
  margin: 0 7%;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.color.grayScale.gray65};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const StyledText = styled.div`
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-weight: 600;
  font-size: 16px;
  line-height: 19.09px;
  cursor: pointer;
`;

const StyledName = styled.div`
  display: flex;
  align-items: flex-start;
  width: 57%;
`;

const StyledDate = styled.div`
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
`;

const StyledNotice = styled.div`
  width: 72%;
  margin: 5px 15% 10px 0;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NoticeContent = styled.div`
  margin-right: 10%;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
  cursor: pointer;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}`;
};

const BoardComponent = ({
  name,
  time,
  title,
  content,
  onClick,
  totalComments,
}) => {
  return (
    <Container onClick={onClick}>
      <BoardContainer>
        <TopRow>
          <StyledName>
            <StyledText>{name}</StyledText>
          </StyledName>
          <StyledDate>{formatDate(time)}</StyledDate>
        </TopRow>
        <StyledNotice>
          <StyledText>{title}</StyledText>
        </StyledNotice>
        <ContentRow>
          <NoticeContent>{content}</NoticeContent>
          <BottomRow>
            <BoardChat />
            <CommentCount>{totalComments}</CommentCount>
          </BottomRow>
        </ContentRow>
      </BoardContainer>
    </Container>
  );
};

BoardComponent.propTypes = {
  name: PropTypes.node.isRequired,
  time: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  totalComments: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BoardComponent;