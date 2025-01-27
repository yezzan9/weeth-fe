import { useState } from 'react';
import styled from 'styled-components';
import SortIcon from '@/assets/images/ic_admin_change.svg';

const SortButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #ecf9f6;
  gap: 10px;
  padding: 7px;
  border-radius: 4px;
  cursor: pointer;
`;
const SortButton: React.FC = () => {
  const [isAscending, setIsAscending] = useState(false);

  const onClickSort = () => {
    setIsAscending(!isAscending);
  };
  return (
    <SortButtonWrapper onClick={onClickSort}>
      {isAscending ? '오름차순' : '기수 순'}
      <img src={SortIcon} alt="sorting" />
    </SortButtonWrapper>
  );
};

export default SortButton;
