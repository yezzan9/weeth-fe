import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

// 배경색이랑 글자색 props로 전달 받아 설정 가능
// props 전달 없으면 gray30에 흰색 글씨로 기본형 버튼

const BasicCaption = styled.button`
  width: 47px;
  height: 19px;
  background-color: ${({ color }) => color || theme.color.grayScale.gray30};
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${({ textcolor }) => textcolor || theme.color.grayScale.white};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Caption = ({ children, color, textcolor }) => (
  <BasicCaption color={color} textcolor={textcolor}>
    {children}
  </BasicCaption>
);

export default Caption;
