import theme from '@/styles/theme';
import styled from 'styled-components';

const Switch = styled.label<{ $isMeeting: boolean }>`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 10px;

  background-color: ${(props) =>
    props.$isMeeting ? theme.color.mainMiddle : theme.color.gray[65]};
  cursor: pointer;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<{ $isMeeting: boolean }>`
  display: flex;
  align-items: center;
  position: absolute;
  cursor: pointer;
  background-color: ${theme.color.gray[18]};
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    bottom: 2px;
    background-color: #fff;
    transition: 0.4s;
    border-radius: 10px;
    transform: ${(props) =>
      props.$isMeeting ? 'translateX(16px)' : 'translateX(0)'};
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  }
`;

const ToggleButton = ({
  onToggle,
  isMeeting,
}: {
  onToggle: () => void;
  isMeeting: boolean;
}) => {
  return (
    <Switch $isMeeting={isMeeting}>
      <Checkbox type="checkbox" onChange={onToggle} />
      <Slider $isMeeting={isMeeting} />
    </Switch>
  );
};

export default ToggleButton;