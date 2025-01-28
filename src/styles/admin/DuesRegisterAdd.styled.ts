import styled, { css } from 'styled-components';
import theme from '../theme';

export const flexMixin = (flexValue: number) => css`
  flex: ${flexValue};
`;

export const Wrapper = styled.div`
  width: 90%;
  margin-top: 50px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  padding-bottom: 30px;
  margin-bottom: 30px;
`;

export const Title = styled.div`
  width: 100%;
  height: 72px;
  padding: 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #dedede;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-family: ${theme.font.regular};
`;

export const SubTitle = styled.div`
  font-family: ${theme.font.regular};
  font-size: 16px;
  padding: 20px 30px;
  color: black;
`;

export const CardinalWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 0 30px;
  box-sizing: border-box;
`;

export const CardinalButtonWrapper = styled.div``;

export const DuesInputWrapper = styled.div`
  ${flexMixin(7)};
`;
export const DescriptionWrapper = styled.div`
  margin-left: 30px;
`;

export const FileWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 5px;
`;

export const ButtonWrapper = styled.div``;

export const InputWrapper = styled.div`
  ${flexMixin(7)};
`;
