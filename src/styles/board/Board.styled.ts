import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

export const NoticeTextContainer = styled.div`
  margin: 10px 25px 10px 15px;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
`;

export const NoticeTitleText = styled.div`
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  line-height: 19.2px;
`;

export const AllText = styled.div`
  font-size: 12px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[65]};
  cursor: pointer;
`;

export const ScrollContainer = styled.div`
  display: flex;
  width: calc(100% - 60px);
  padding: 0 20px;
  overflow-x: auto;
  gap: 10px;
  cursor: grab;
  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${theme.color.gray[65]};
  }
`;

export const NoticeCard = styled.div`
  flex: 0 0 auto;
  background-color: ${theme.color.mainMiddle};
  color: white;
  font-family: ${theme.font.semiBold};
  border-radius: 10px;
  width: 212px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  font-size: 14px;
  line-height: 1.4;

  &:nth-child(2) {
    background-color: ${theme.color.gray[30]};
    color: white;
  }
`;

export const NoticeTitle = styled.div`
  font-size: 12px;
  font-family: ${theme.font.semiBold};
  line-height: 14.4px;
  margin: 15px 21px 0 15px;
`;

export const NoticeContent = styled.p`
  font-size: 10px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[65]};
  margin: 5px 25px 13px 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TabContainerWrapper = styled.div`
  display: flex;
  align-items: start;
  margin: 30px 25px 10px 18px;
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const TabText = styled.div`
  font-size: 16px;
  color: white;
  font-family: ${theme.font.semiBold};
`;

export const Underline = styled.div`
  width: 90px;
  height: 2px;
  background-color: ${theme.color.main};
  margin-top: 5px;
`;

export const PostListContainer = styled.div`
  margin: 0px 25px 0 25px;
`;

export const Line = styled.div`
  border: 1px solid;
  color: ${(props) => props.theme.color.gray[30]};
  margin-top: 2px;
`;

export const Text = styled.div`
  text-align: center;
  margin: 10px;
  font-family: ${theme.font.semiBold};
`;

export const PostingButtonContainer = styled.div`
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  justify-content: center;
`;
