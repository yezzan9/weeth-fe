import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Button/Button';
import CheckBox from '@/assets/images/ic_admin_checkbox.svg';
import UnCheckBox from '@/assets/images/ic_admin_uncheckbox.svg';
import * as S from '@/styles/admin/cardinal/AdminCardinal.styled';
import CommonCardinalModal from './CommonCardinalModal';

interface CardinalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const CardinalModal: React.FC<CardinalModalProps> = ({ isOpen, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxClick = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <CommonCardinalModal
      isOpen={isOpen}
      onClose={onClose}
      width="400px"
      height="auto"
      top="20%"
      left="40%"
      position="absolute"
      overlayColor="rgba(0,0,0,0.5)"
      showCloseButton
      footer={
        <Button width="60px" height="48px" color="#323232" borderRadius="4px">
          저장
        </Button>
      }
    >
      <ModalContentWrapper>
        <S.Title>추가할 새로운 기수를 작성해주세요</S.Title>
        <S.Input type="text" placeholder="기" />
        <div>활동 시기</div>
        <S.FlexRow>
          <S.Input type="text" placeholder="년" />
          <S.Input type="text" placeholder="학기" />
        </S.FlexRow>
        <S.SvgText onClick={handleCheckBoxClick}>
          <img
            src={isChecked ? CheckBox : UnCheckBox}
            alt={isChecked ? 'checked' : 'unchecked'}
          />
          <div> 현재 진행 중 </div>
        </S.SvgText>
      </ModalContentWrapper>
    </CommonCardinalModal>
  );
};

export default CardinalModal;
