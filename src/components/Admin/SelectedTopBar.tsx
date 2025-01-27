import theme from '@/styles/theme';
import backarrow from '@/assets/images/ic_admin_backarrow.svg';
import checkIcon from '@/assets/images/ic_admin_circle_check.svg';
import dropdownIcon from '@/assets/images/ic_admin_column_meatball.svg';
import styled from 'styled-components';
import { useMemberContext } from './context/MemberContext';
import { Title } from './TopBar';
import ButtonGroup from './ButtonGroup';

const SelectedTopBarWrapper = styled.div`
  width: 100%;
  background-color: ${theme.color.main};
  color: ${theme.color.gray[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
  padding-left: 55px;
`;

const SvgIcon = styled.img`
  cursor: pointer;
  width: 15px;
  height: 15px;
`;

const SelectedTopBar: React.FC = () => {
  const { selectedMembers, setSelectedMembers } = useMemberContext();

  const handleBackClick = () => {
    setSelectedMembers([]);
  };
  const buttons = [
    {
      label: '가입 승인',
      onClick: () =>
        alert(`${selectedMembers.length}명의 멤버 가입을 승인하시겠습니까?`),
      disabled: false,
    },
    {
      label: '관리자로 변경',
      onClick: () =>
        alert(
          `${selectedMembers.length}명의 멤버를 관리자로 변경하시겠습니까?`,
        ),
      disabled: selectedMembers.length !== 1,
    },
    {
      label: '사용자로 변경',
      onClick: () =>
        alert(
          `${selectedMembers.length}명의 멤버를 사용자로 변경하시겠습니까?`,
        ),
      disabled: selectedMembers.length !== 1,
    },
    {
      label: '비밀번호 초기화',
      onClick: () =>
        alert(
          `${selectedMembers.length}명의 멤버 비밀번호를 초기화하시겠습니까?`,
        ),
      disabled: false,
    },
    {
      label: '유저 추방',
      onClick: () =>
        alert(`${selectedMembers.length}명의 멤버를 추방하시겠습니까?`),
      disabled: false,
    },
    {
      label: '변경 기수',
      onClick: () => alert('기수를 변경하시겠습니까?'),
      disabled: false,
      icon: checkIcon,
    },
    {
      label: '직접 입력',
      onClick: () => alert('직접 입력 기능을 실행합니다.'), // 나중에 수정
      disabled: false,
      icon: dropdownIcon,
    },
  ];

  return (
    <SelectedTopBarWrapper>
      <TitleContainer>
        <SvgIcon src={backarrow} alt="뒤로가기" onClick={handleBackClick} />
        <Title>{`${selectedMembers.length}명 선택됨`}</Title>
      </TitleContainer>
      <ButtonGroup buttons={buttons} />
    </SelectedTopBarWrapper>
  );
};

export default SelectedTopBar;
