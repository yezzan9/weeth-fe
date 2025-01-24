import theme from '@/styles/theme';
import styled from 'styled-components';

// PostDetailMain
export const PostMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 23px 0 23px;
  font-family: ${theme.font.regular};
`;

export const PostMainTitleText = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
`;

export const SmallText = styled.div`
  color: ${theme.color.gray[65]};
  font-size: 12px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

export const DateText = styled.div`
  margin-left: 10px;
`;

export const CommentText = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  line-height: 14.32px;
  gap: 4px;
  font-family: ${theme.font.semiBold};
  margin: 14px 0 10px 0;
`;
export const PositionIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 5px;
`;

export const PostingContianer = styled.div`
  font-family: ${theme.font.regular};
  font-size: 16px;
  line-height: 19.09px;
  white-space: pre-wrap;
  margin: 20px 0 20px 0;
`;
