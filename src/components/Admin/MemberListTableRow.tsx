import styled from 'styled-components';
import CheckBox from '@/assets/images/ic_admin_checkbox.svg';
import UnCheckBox from '@/assets/images/ic_admin_uncheckbox.svg';
import MeatBallSvg from '@/assets/images/ic_admin_meatball.svg';
import { useState } from 'react';
import { statusColors } from './StatusIndicator';
import { MemberData, useMemberContext } from './context/MemberContext';
import { Column } from './MemberListTable';
import MemberDetailModal from './Modal/MemberDetailModal';

const Row = styled.tr`
  border-bottom: 1px solid #dedede;
`;

const Cell = styled.td`
  padding: 15px;
  text-align: left;

  border-bottom: 1px solid #dedede;
`;
export const StatusCell = styled.td<{ statusColor: string }>`
  width: 2px;
  background-color: ${({ statusColor }) => statusColor};
`;

export const SvgWrapper = styled.td`
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

interface TableRowProps {
  data: MemberData;
  columns: Column[];
}

const MemberListTableRow: React.FC<TableRowProps> = ({ data, columns }) => {
  const { selectedMembers, setSelectedMembers } = useMemberContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isChecked = selectedMembers.includes(data.studentId);

  const onClickToCheckBox = () => {
    setSelectedMembers((prevSelected) =>
      isChecked
        ? prevSelected.filter((id) => id !== data.studentId)
        : [...prevSelected, data.studentId],
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Row>
        <StatusCell statusColor={statusColors[data.status]} />

        <SvgWrapper onClick={onClickToCheckBox}>
          <img
            src={isChecked ? CheckBox : UnCheckBox}
            alt={isChecked ? 'checked' : 'unchecked'}
          />
        </SvgWrapper>
        {columns.map((column) => (
          <Cell key={column.key}>{data[column.key]}</Cell>
        ))}

        <SvgWrapper onClick={openModal}>
          <img src={MeatBallSvg} alt="미트볼 메뉴" />
        </SvgWrapper>
      </Row>

      {isModalOpen && <MemberDetailModal data={data} onClose={closeModal} />}
    </>
  );
};

export default MemberListTableRow;
