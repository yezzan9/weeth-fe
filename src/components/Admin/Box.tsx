import styled from 'styled-components';
import theme from '@/styles/theme';

interface BoxProps {
  title: string;
  description: string;
  last: string;
  color: string;
}

const Wrapper = styled.div<{ color: string }>`
  width: 234px;
  height: 164px;
  background-color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 18px;
  font-family: ${theme.font.regular};
  color: white;
`;

const Description = styled.div`
  font-size: 24px;
  font-family: ${theme.font.semiBold};
  color: white;
  margin-top: 20px;
`;

const Last = styled.div`
  font-size: 18px;
  font-family: ${theme.font.regular};
  color: #979797;
`;

const Box: React.FC<BoxProps> = ({ title, description, last, color }) => {
  return (
    <Wrapper color={color}>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Last>{last}</Last>
    </Wrapper>
  );
};
export default Box;
