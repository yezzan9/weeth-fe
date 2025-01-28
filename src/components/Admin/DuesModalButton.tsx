import styled from 'styled-components';
import theme from '@/styles/theme';

interface DuesModalButtonProps {
  description: string;
  onClick?: () => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.color.gray[100]};
  width: 89px;
  height: 48px;
  border-radius: 5px;
  cursor: pointer;
`;

const Description = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  color: black;
`;

const DuesModalButton: React.FC<DuesModalButtonProps> = ({
  description,
  onClick,
}) => {
  return (
    <Wrapper onClick={onClick}>
      <Description>{description}</Description>
    </Wrapper>
  );
};

export default DuesModalButton;
