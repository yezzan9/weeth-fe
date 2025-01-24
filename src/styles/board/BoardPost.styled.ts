import theme from '@/styles/theme';
import styled from 'styled-components';

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  padding-bottom: 20px;
  ul {
    margin: 0;
  }
`;

export const FileUploaderWrapper = styled.div`
  margin-left: 20px;
  align-items: flex-start;
  top: calc(var(--vh, 1vh) * 40 + 120px);
`;

export const TitleInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0 20px;
  padding: 20px 0;
  color: white;
  font-size: 16px;
  font-family: ${theme.font.semiBold};

  &::placeholder {
    font-size: 16px;
    font-family: ${theme.font.semiBold};
  }
`;

export const ContentInput = styled.textarea`
  height: calc(var(--vh, 1vh) * 40);
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
  margin: 0 20px;
  padding-top: 20px;
  color: white;
  font-size: 16px;
  font-family: ${theme.font.regular};

  &::placeholder {
    font-size: 16px;
    font-family: ${theme.font.regular};
  }
`;

export const DeleteButton = styled.img`
  margin-left: 10px;
  cursor: pointer;
`;
