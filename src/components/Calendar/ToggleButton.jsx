import React, { useState } from 'react';
import styled from 'styled-components';

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 343px;
  height: 32px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2f2f2f;
  transition: 0.4s;
  border-radius: 10px;

  &:before {
    position: absolute;
    content: '';
    height: 28px;
    width: 170px;
    left: 2px;
    bottom: 2px;
    background-color: #4d4d4d;
    transition: 0.4s;
    border-radius: 9px;
    transform: ${(props) =>
      props.checked ? 'translateX(169px)' : 'translateX(0)'};
  }
`;

const TextMonth = styled.span`
  position: absolute;
  left: 18%;
  color: ${(props) => (props.checked ? '#a6a6a6' : '#ffffff')};
  z-index: 1;
`;

const TextYear = styled.span`
  position: absolute;
  right: 22%;
  color: ${(props) => (props.checked ? '#ffffff' : '#a6a6a6')};
  z-index: 1;
`;

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <Switch>
        <Checkbox
          type="checkbox"
          checked={isToggled}
          onChange={handleToggle}
          text="text"
        />
        <Slider checked={isToggled}>
          <TextMonth checked={isToggled}>Month</TextMonth>
          <TextYear checked={isToggled}>Year</TextYear>
        </Slider>
      </Switch>
    </div>
  );
};

export default ToggleSwitch;