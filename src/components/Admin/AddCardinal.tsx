import theme from '@/styles/theme';
import styled from 'styled-components';
import plusIcon from '@/assets/images/ic_admin_plus.svg';
import { useState } from 'react';
import CardinalModal from '@/components/Admin/Modal/CardinalModal';

export const AddCardinalWrapper = styled.div`
  width: 80px;
  height: 164px;
  box-sizing: border-box;
  background-color: ${theme.color.gray[100]};
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
`;

const AddCardinal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddCardinalWrapper onClick={handleOpenModal}>
        <img src={plusIcon} alt="plus" />
      </AddCardinalWrapper>

      <CardinalModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default AddCardinal;
