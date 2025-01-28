import { MemberData } from '@/components/Admin/context/MemberContext';
import { styled } from 'styled-components';
import dropdownIcon from '@/assets/images/ic_admin_column_meatball.svg';
import ButtonGroup from '@/components/Admin/ButtonGroup';
import StatusIndicator from '@/components/Admin/StatusIndicator';
import CommonModal from '@/components/Admin/Modal/CommonModal';

interface MemberDetailModalProps {
  data: MemberData;
  onClose: () => void;
}

interface FontStyleProps {
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
}

const FontStyle = styled.div<FontStyleProps>`
  font-size: ${({ fontSize }) => fontSize || '18px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  color: ${({ color }) => color};
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex: 0;
  height: calc(100% - 96px - 96px);
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 3px 8px 0px rgba(133, 141, 138, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  flex: 1.5;
  margin-top: 20%;
`;

const ActivityContent = styled(ModalContent)`
  flex: 1;
  margin-bottom: 6%;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 40px;
`;

const LabelFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  color: #a6a6a6;
`;

const DataFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  color: #000;
`;

const getHighestCardinal = (cardinal: string): string =>
  `${cardinal.split('.')[0]}기`;

const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  data,
  onClose,
}) => {
  const buttons = [
    {
      label: '가입 승인',
      onClick: () => alert('1명의 멤버 가입을 승인하시겠습니까?'),
    },
    {
      label: '관리자로 변경',
      onClick: () => alert('1명의 멤버 역할을 관리자로 변경하시겠습니까?'),
    },
    {
      label: '비밀번호 초기화',
      onClick: () => alert('1명의 멤버 비밀번호를 초기화 시키시겠습니까?'),
    },
    {
      label: '유저 추방',
      onClick: () => alert('1명의 멤버를 추방하시겠습니까?'),
    },
    {
      label: '직접 입력',
      onClick: () => alert('직접 입력'),
      icon: dropdownIcon,
    },
    { label: '완료', onClick: onClose },
  ];

  const memberInfo = [
    { label: '직급', value: data.position },
    { label: '역할', value: data.role },
    { label: '학과', value: data.major },
    { label: '전화번호', value: data.phone },
    { label: '학번', value: data.studentId },
    { label: '이메일', value: data.email },
  ];

  const activityInfo = [
    { label: '활동기수', value: data.cardinal },
    { label: '상태', value: data.membershipType },
    { label: '가입일', value: data.joinDate },
    { label: '출석', value: data.attendance },
    { label: '결석', value: data.absence },
    { label: '패널티', value: data.penalty },
  ];

  return (
    <CommonModal
      isOpen
      onClose={onClose}
      title="멤버 관리 버튼"
      footer={<ButtonGroup buttons={buttons} hasEndGap />}
    >
      <ModalContentWrapper>
        <ModalContent>
          <FontStyle fontSize="12px" color="#000">
            회원정보
          </FontStyle>
          <FlexWrapper>
            <FontStyle fontSize="24px" fontWeight="700" color="#000">
              {data.name} &nbsp;
              {getHighestCardinal(data.cardinal)}
            </FontStyle>
            <StatusIndicator status={data.status} />
          </FlexWrapper>
          <FlexWrapper>
            <LabelFlex>
              {memberInfo.map((info) => (
                <FontStyle key={info.label}>{info.label}</FontStyle>
              ))}
            </LabelFlex>
            <DataFlex>
              {memberInfo.map((info) => (
                <FontStyle
                  key={info.label}
                  color={info.label === '패널티' ? '#ff5858' : undefined}
                >
                  {info.value}
                </FontStyle>
              ))}
            </DataFlex>
          </FlexWrapper>
        </ModalContent>
        <ActivityContent>
          <FontStyle fontSize="12px" color="#000">
            활동정보
          </FontStyle>
          <FlexWrapper>
            <LabelFlex>
              {activityInfo.map((info) => (
                <FontStyle key={info.label}>{info.label}</FontStyle>
              ))}
            </LabelFlex>
            <DataFlex>
              {activityInfo.map((info) => (
                <FontStyle
                  key={info.label}
                  color={info.label === '패널티' ? '#ff5858' : undefined}
                >
                  {info.value}
                </FontStyle>
              ))}
            </DataFlex>
          </FlexWrapper>
        </ActivityContent>
      </ModalContentWrapper>
    </CommonModal>
  );
};

export default MemberDetailModal;
