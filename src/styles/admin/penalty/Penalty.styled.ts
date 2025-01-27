import theme from '@/styles/theme';
import { styled } from 'styled-components';

// penaltyListTable.tsx
export const TableWrapper = styled.div`
  width: fit-content;
  font-size: 18px;
  border-collapse: collapse;
`;

export const TableContainer = styled.div`
  background-color: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(133, 141, 138, 0.2);
  padding-top: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

export const Row = styled.tr`
  border-bottom: 1px solid #dedede;
  cursor: pointer;
`;

export const Cell = styled.td`
  padding: 15px;
  text-align: left;
  white-space: nowrap;
`;

export const PlusButtonCell = styled.td`
  padding: 10px;
  text-align: center;
  cursor: pointer;
`;

export const HeaderCell = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #dedede;
  font-weight: bold;
`;

export const SubHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 80px 95px 190px 120px;
  grid-template-areas: 'reason empty penalty penaltyDate actions';
  gap: 10px;
  padding: 5px;
  padding-left: 70px;
  background-color: #e6fcf7;
  font-weight: bold;
`;

export const GridCell = styled.div<{ area: string }>`
  grid-area: ${(props) => props.area};
  padding: 5px;
  text-align: left;
  white-space: nowrap;
`;
export const ExpandedRow = styled.tr`
  td {
    grid-column: 1 / -1;
  }
`;

export const EmptyCell = styled.td`
  width: 150px;
`;

// penaltyAdd.tsx
export const AddContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 70px 1fr;
  grid-template-areas: 'reason empty empty penalty penaltyDate actions';
  gap: 10px;
  padding-left: 70px;
  background-color: ${theme.color.gray[100]};
  align-items: center;
  box-sizing: border-box;
`;

export const Input = styled.input`
  font-weight: 500;
  padding: 8px;
  width: 100%;
  max-width: 300px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  outline: none;
`;

export const ButtonWrapper = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: flex-end;
`;

// penaltyDetail.tsx
export const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 70px 1fr;
  grid-template-areas: 'reason empty penalty penaltyDate actions';
  gap: 10px;
  padding-left: 70px;
  background-color: #ffffff;
  align-items: center;
  box-sizing: border-box;
`;

export const DetailText = styled.div`
  font-size: 16px;
`;
