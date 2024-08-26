/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SignupWhite from './SignupWhite';
import theme from '../../styles/theme';

const SignupContainer = styled.div`
  width: 370px;
  max-width: 370px;
  align-items: flex-start;
  margin-top: 0;
`;

const SignupWhiteMargin = styled.div`
  margin-left: 7%;
`;

const Margin = styled.div`
  margin-bottom: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 87%;
  margin: 0 7%;
  position: relative;
`;

const StyledTextInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-family: ${theme.font.family.pretendard_regular};
  line-height: 19px;
  color: ${theme.color.grayScale.white};
  background-color: ${theme.color.grayScale.gray18};
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.color.grayScale.gray65};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const SignupTextComponent = ({
  text,
  value,
  onChange,
  placeholder,
  type,
  children,
  onKeyPress,
}) => {
  return (
    <SignupContainer>
      <SignupWhiteMargin>
        <SignupWhite text={text} />
      </SignupWhiteMargin>
      <Margin />
      <InputWrapper>
        <StyledTextInput
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          type={type}
        />
        {children && <IconWrapper>{children}</IconWrapper>}
      </InputWrapper>
    </SignupContainer>
  );
};

SignupTextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

SignupTextComponent.defaultProps = {
  placeholder: 'ex) weeth@gmail.com',
  type: 'text',
  children: null,
};

export default SignupTextComponent;
