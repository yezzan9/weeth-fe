import NavMenu from '@/components/Admin/NavMenu';
import styled from 'styled-components';
import TopBar from '@/components/Admin/TopBar';
import Cardinal from '@/components/Admin/Cardinal';
import { PageWrapper } from '@/styles/admin/AdminLayout.styled';
import TotalDues from '@/components/Admin/TotalDues';
import Expenditure from '@/components/Admin/Expenditure';
import DuesRegisterAdd from '@/components/Admin/DuesRegisterAdd';
import { useState } from 'react';
import DuesRegister from '@/components/Admin/DuesRegister';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 1px solid #f2f2f2;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 50%;
  margin-left: 30px;
  margin-top: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const CardinalWrapper = styled.div`
  width: 166px;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const DuesWrapper = styled.div`
  width: 90%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const DuesRegisterWrapper = styled.div`
  width: 50%;
`;

const CardinalButtonWrapper = styled.div``;

const AdminDues: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState('기수');

  const getDuesText = () => {
    switch (selectedCardinal) {
      case '기수':
        return '기수 정보 없음';
      case '1기':
        return '1기 회비';
      case '2기':
        return '2기 회비';
      case '3기':
        return '3기 회비';
      case '4기':
        return '4기 회비';
      default:
        return '기수 정보 없음';
    }
  };

  const cardinal = 1;

  return (
    <PageWrapper>
      <NavMenu />
      <ContentWrapper>
        <TopBar
          title="회비 관리"
          description="기수 시작시 이월된 회비와 해당 기수 회비를 종합해 회비를 등록해주시기 바랍니다. 회비 등록은 기수당 한 번만 가능합니다."
        />
        <Wrapper>
          <Container>
            <CardinalWrapper>
              <CardinalButtonWrapper>
                <Cardinal
                  selectedCardinal={selectedCardinal}
                  setSelectedCardinal={setSelectedCardinal}
                />
              </CardinalButtonWrapper>
            </CardinalWrapper>
            <DuesWrapper>
              <TotalDues getDuesText={getDuesText} cardinal={cardinal} />
              <Expenditure />
            </DuesWrapper>
          </Container>
          <DuesRegisterWrapper>
            <DuesRegister />
            <DuesRegisterAdd />
          </DuesRegisterWrapper>
        </Wrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminDues;
