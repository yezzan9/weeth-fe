import styled from 'styled-components';
import theme from '../theme';

export const PageWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  font-family: ${theme.font.regular};
  color: #000000;
  background-color: #f2f9f8;
  display: flex;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #f2f2f2;
  height: 100%;
`;
