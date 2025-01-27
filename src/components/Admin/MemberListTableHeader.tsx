import styled from 'styled-components';

interface TableHeaderProps {
  columns: { key: string; header: string }[];
}

const HeaderCell = styled.th`
  text-align: left;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid #dedede;
  white-space: nowrap;
`;

const MemberListTableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        <th aria-label="Row Status" />
        <th aria-label="Selection Checkbox" />

        {columns.map((column) => (
          <HeaderCell key={column.key}>{column.header}</HeaderCell>
        ))}
      </tr>
    </thead>
  );
};

export default MemberListTableHeader;
