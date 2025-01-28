import styled from 'styled-components';
import theme from '@/styles/theme';
import Receipt from '@/assets/images/ic_admin_receipt.svg';
import { useState } from 'react';
import Button from './Button';
import DuesModifyModal from './Modal/DuesModifyModal';

interface ExpenditureRecordProps {
  date?: string;
  title?: string;
  money?: number;
  master?: string;
}

const data: ExpenditureRecordProps[] = [
  {
    date: '2024.10.24.토요일',
    title: '파티룸 대여',
    money: 19302,
    master: '파티룸 주인',
  },
  {
    date: '2024.10.25.일요일',
    title: '음식 주문',
    money: 35000,
    master: '음식점 주인',
  },
];

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #dedede;
`;

const DateWrapper = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
  font-family: ${theme.font.regular};
  font-size: 18px;
  align-items: center;
`;

const Date = styled.div`
  margin-left: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ExpenditureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const ExpenditureTitle = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 24px;
  margin-bottom: 20px;
`;

const Master = styled.div`
  margin-top: 20px;
`;
const ExpenditureMaster = styled.div`
  font-family: ${theme.font.regular};
  font-size: 18px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const ModifyButton = styled.div``;

const ExpenditureRecord: React.FC<ExpenditureRecordProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Container>
      {data.map((item) => (
        <Wrapper>
          <DateWrapper>
            <Date>{item.date}</Date>
            <ButtonWrapper>
              <ModifyButton onClick={openModal}>
                <Button description="수정" color="#323232" width="64px" />
              </ModifyButton>

              <Button description="삭제" color="#ff5858" width="64px" />
            </ButtonWrapper>
          </DateWrapper>
          <ExpenditureWrapper>
            <div>
              <ExpenditureTitle>{item.title}</ExpenditureTitle>
              <ExpenditureTitle>{item.money}원</ExpenditureTitle>
            </div>
            <ExpenditureMaster>
              <Master>{item.master}</Master>
              <img src={Receipt} alt="Receipt" />
            </ExpenditureMaster>
          </ExpenditureWrapper>
        </Wrapper>
      ))}
      {isModalOpen && <DuesModifyModal onClose={closeModal} />}
    </Container>
  );
};

export default ExpenditureRecord;
