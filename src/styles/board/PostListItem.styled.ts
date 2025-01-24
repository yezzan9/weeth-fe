import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.color.gray[20]};
  }
`;

export const PostLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PostRightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

export const TitleText = styled.div`
  color: whi
  font-family: ${theme.font.semiBold};
  font-size: 16px;
  line-height: 1.4;
  margin-bottom: 6px;
`;

export const Divider = styled.span`
  color: ${theme.color.gray[30]};
  font-size: 12px;
  padding-bottom: 3px;
`;

export const ContentText = styled.div`
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
  font-size: 14px;
  line-height: 1.5;
`;

export const LightText = styled.div`
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
  font-size: 12px;
`;

export const CommentsText = styled(LightText)`
  margin-left: 3px;
`;

export const DateText = styled(LightText)`
  margin-top: 2px;
  line-height: 14.4px;
`;

export const NameText = styled(LightText)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ImgContainer = styled.img`
  height: 12px;
  width: 12px;
  filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(187%)
    hue-rotate(0deg) brightness(92%) contrast(92%);
`;

export const FileIcon = styled.img`
  padding-top: 3px;
  height: 8.92px;
  width: 10px;
`;

export const PositionIcon = styled.img`
  height: 16px;
  width: 16px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
`;
export const BottomInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-top: 5px;
  width: 100%;
`;
