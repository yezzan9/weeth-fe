import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

// 배경색이랑 글자색 props로 전달 받아 설정 가능
// props 전달 없으면 gray30에 흰색 글씨로 기본형 버튼
// 크기 지정은 사용하면서 하자

const BasicButton = styled.button`
  background-color: ${({ color }) => color || theme.color.grayScale.gray30};
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${({ textcolor }) => textcolor || theme.color.grayScale.white};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: calc(370px * 0.76);
  height: 45px;
`;
// 화면 너비인 370의 76%가 버튼의 너비

const MiddleButton = ({ children, color, textcolor, onClick }) => (
  <BasicButton color={color} textcolor={textcolor} onClick={onClick}>
    {children}
  </BasicButton>
);

export default MiddleButton;
