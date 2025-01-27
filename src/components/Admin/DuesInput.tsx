import styled from 'styled-components';
import theme from '@/styles/theme';

interface InputProps {
  width: string;
  placeholder: string;
}

const Wrapper = styled.div``;

const Input = styled.input<InputProps>`
  width: ${(props) => props.width};
  height: 48px;
  border-radius: 5px;
  border: 1px solid #dedede;
  padding-left: 10px;

  &::placeholder {
    font-family: ${theme.font.regular};
    font-size: 18px;
    color: #a6a6a6;
    margin-left: 5px;
  }

  &:focus {
    outline: none;
    border-color: black;
  }
`;

const DuesInput: React.FC<InputProps> = ({ width, placeholder }) => {
  return (
    <Wrapper>
      <Input width={width} placeholder={placeholder} />
    </Wrapper>
  );
};

export default DuesInput;
