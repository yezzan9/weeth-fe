import { styled } from 'styled-components';
import {
  DescriptionWrapper,
  InputWrapper,
  SubTitle,
  CardinalWrapper,
  CardinalButtonWrapper,
  DuesInputWrapper,
  ButtonWrapper,
} from '@/styles/admin/DuesRegisterAdd.styled';
import CommonModal from '@/components/Admin/Modal/CommonModal';
import { useState } from 'react';
import Cardinal from '../Cardinal';
import DuesModalButton from '../DuesModalButton';
import DuesInput from '../DuesInput';
import Button from '../Button';

interface DuesModifyModalProps {
  onClose: () => void;
}

const ModalContentWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  box-sizing: border-box;
  height: calc(100% - 96px - 96px);
  color: black;
`;

const ModalButtonWrapper = styled.div`
  gap: 10px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: 5%;
`;

const CardinalTotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReceiptWrapper = styled.div`
  margin-left: 30px;
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const DuesModifyModal: React.FC<DuesModifyModalProps> = ({ onClose }) => {
  const inputFields = [
    {
      id: 'date',
      title: '일자',
      placeholder: '- 없이 숫자만 입력',
      width: '91%',
    },
    {
      id: 'content',
      title: '사용 내용',
      placeholder: 'ex)강의 구매',
      width: '91%',
    },
    {
      id: 'amount',
      title: '사용 금액',
      placeholder: '사용 금액 입력',
      width: '91%',
    },
    { id: 'location', title: '사용처', placeholder: 'ex)인프런', width: '91%' },
  ];

  const [selectedCardinal, setSelectedCardinal] = useState('기수');

  return (
    <CommonModal
      isOpen
      onClose={onClose}
      title="회비 지출 기록 수정"
      footer={
        <ModalButtonWrapper>
          <DuesModalButton description="Cancel" onClick={onClose} />
          <DuesModalButton description="저장" onClick={onClose} />
        </ModalButtonWrapper>
      }
    >
      <ModalContentWrapper>
        <CardinalTotalWrapper>
          <SubTitle>기수</SubTitle>
          <CardinalWrapper>
            <CardinalButtonWrapper>
              <Cardinal
                selectedCardinal={selectedCardinal}
                setSelectedCardinal={setSelectedCardinal}
              />
            </CardinalButtonWrapper>
            <DuesInputWrapper>
              <DuesInput width="94%" placeholder="직접 입력" />
            </DuesInputWrapper>
          </CardinalWrapper>
          {inputFields.map((field) => (
            <div key={field.id}>
              <SubTitle>{field.title}</SubTitle>
              <DescriptionWrapper>
                <DuesInput
                  width={field.width}
                  placeholder={field.placeholder}
                />
              </DescriptionWrapper>
            </div>
          ))}
          <SubTitle>영수증 첨부</SubTitle>
          <ReceiptWrapper>
            <ButtonWrapper>
              <Button description="파일 선택" color="#00dda8" width="99px" />
            </ButtonWrapper>
            <InputWrapper>
              <DuesInput width="85%" placeholder="선택된 파일 없음" />
            </InputWrapper>
          </ReceiptWrapper>
        </CardinalTotalWrapper>
      </ModalContentWrapper>
    </CommonModal>
  );
};

export default DuesModifyModal;
