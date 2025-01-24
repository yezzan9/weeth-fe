import styled from 'styled-components';
import PostingIcon from '@/assets/images/ic_posting_button.svg';
import theme from '@/styles/theme';

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 20px;
  border-radius: 40px;
  background-color: ${theme.color.main};
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  color: white;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const PostingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ButtonContainer onClick={onClick}>
      글쓰기
      <Icon src={PostingIcon} alt="글쓰기 아이콘" />
    </ButtonContainer>
  );
};

export default PostingButton;
