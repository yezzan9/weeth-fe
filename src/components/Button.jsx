import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

// 배경색이랑 글자색 props로 전달 받아 설정 가능
// props 전달 없으면 gray30에 흰색 글씨로 기본형 버튼

const BasicButton = styled.button`{  width: 58px;
  height: 33px;
  background-color: ${({ color }) => color || theme.color.grayScale.gray30};
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${({ textColor }) => textColor || theme.color.grayScale.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;}`;
const Button = ({ children, color, textColor, onClick }) => (
  <ThemeProvider theme={theme}>
    <BasicButton color={color} textColor={textColor} onClick={onClick}>
      {children}
    </BasicButton>
  </ThemeProvider>
);

export default Button;
