import theme from '@/styles/theme';
import styled from 'styled-components';

export const StyledModal = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: -15%;
  width: 100%;
  height: 115%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  webkitbackdropfilter: 'blur(5px)';
`;

export const Line = styled.div`
  border: 1px solid #4d4d4d;
  margin: 30px 10px 0px 10px;
  transform: scaleY(0.2);
`;

export const Regular = styled.div`
  font-family: ${theme.font.regular};
`;

export const SemiBold = styled.div`
  font-family: ${theme.font.semiBold};
  include-font-padding: false;
  display: flex;
  flex-direction: row;
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13px;
  font-size: 16px;
`;
