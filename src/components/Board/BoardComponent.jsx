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
  margin: 0 7%;
  padding: 10px 0 0 0;
  position: relative;
  border-bottom: 1px solid ${theme.color.grayScale.gray65};
  overflow: hidden; /* 컨텐츠가 컨테이너를 넘어가지 않도록 설정 */
  height: auto; /* Let the height adjust automatically */
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const StyledContent = styled.div`
  color: ${theme.color.grayScale.white};
  font-size: 15px;
  line-height: 19.09px;
`;

const StyledName = styled.div`
  display: flex;
  align-items: flex-start;
  width: 57%;
  margin: 7px 0 7px 0;
`;

const StyledDate = styled.div`
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  line-height: 14.32px;
  margin: 5px 0 0 0;
`;

const StyledNotice = styled.div`
  width: 100%;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 16px;
  line-height: 19.09px;
  margin: 5px 0 8px 0; // 5px 15% 10px 0;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start; //center
  width: 100%;
`;

const NoticeContent = styled.div`
  margin-right: 10%;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  line-height: 14.32px;
  cursor: pointer;
  word-wrap: break-word;
`;

// 문자열을 10글자로 제한하고, 넘어가면 "..." 추가
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 7px 0 0 0;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
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
          <StyledNotice>{truncateText(title, 50)}</StyledNotice>
          <StyledDate>{formatDate(time)}</StyledDate>
        </TopRow>
        <StyledContent>{truncateText(content, 50)}</StyledContent>
        <ContentRow>
          <StyledName>
            <NoticeContent>{name}</NoticeContent>
          </StyledName>
          <BottomRow>
            <BoardChat />
            <CommentCount>
              {totalComments !== undefined ? totalComments : '0'}
            </CommentCount>
          </BottomRow>
        </ContentRow>
      </BoardContainer>
    </Container>
  );
};

BoardComponent.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BoardComponent;
