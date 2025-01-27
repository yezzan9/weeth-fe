import React, { useReducer, useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import plusIcon from '@/assets/images/ic_admin_plus.svg';
import {
  penaltyReducer,
  PenaltyState,
  Penalty,
} from '@/components/Admin/context/PenaltyReducer';
import { useMemberContext } from './context/MemberContext';
import PenaltyDetail from './PenaltyDetail';
import PenaltyAdd from './PenaltyAdd';
import { statusColors } from './StatusIndicator';
import { StatusCell } from './MemberListTableRow';

const columns = [
  { key: 'name', header: '이름' },
  { key: 'role', header: '역할' },
  { key: 'major', header: '학과' },
  { key: 'studentId', header: '학번' },
  { key: 'penalty', header: '패널티' },
  { key: 'LatestPenalty', header: '최근 패널티' },
  { key: 'empty', header: '' },
];

const PenaltyListTable: React.FC = () => {
  const { filteredMembers } = useMemberContext();
  const StatusfilteredMembers = filteredMembers.filter(
    (member) => member.status === '승인 완료',
  );

  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [penaltyData, dispatch] = useReducer(
    penaltyReducer,
    {} as PenaltyState,
  );

  const handleRowClick = (studentId: string) => {
    setExpandedRow((prev) => (prev === studentId ? null : studentId));
    setIsAdding(false);
  };

  const handleAddPenalty = (studentId: string) => {
    setIsAdding(true);
    setExpandedRow(studentId);
    setEditingIndex(null);
  };

  const handleEditPenalty = (studentId: string, index: number) => {
    setIsAdding(true);
    setExpandedRow(studentId);
    setEditingIndex(index);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleSavePenalty = (studentId: string, data: Penalty) => {
    if (editingIndex !== null) {
      dispatch({
        type: 'EDIT_PENALTY',
        studentId,
        index: editingIndex,
        payload: data,
      });
    } else {
      dispatch({ type: 'ADD_PENALTY', studentId, payload: data });
    }
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleDeletePenalty = (studentId: string, index: number) => {
    dispatch({ type: 'DELETE_PENALTY', studentId, index });
  };

  const renderColumns = (member: Record<string, any>) =>
    columns.map((column) =>
      column.key === 'empty' ? (
        <S.EmptyCell key={column.key} />
      ) : (
        <S.Cell key={column.key}>{member[column.key]}</S.Cell>
      ),
    );

  return (
    <S.TableContainer>
      <S.TableWrapper>
        <table>
          <thead>
            <tr>
              <th aria-label="Status Indicator" />
              <th aria-label="Plus Button" />
              {columns.map((column) => (
                <S.HeaderCell key={column.key}>{column.header}</S.HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {StatusfilteredMembers.map((member) => (
              <React.Fragment key={member.studentId}>
                <S.Row onClick={() => handleRowClick(member.studentId)}>
                  <StatusCell statusColor={statusColors[member.status]} />
                  <S.PlusButtonCell
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPenalty(member.studentId);
                    }}
                  >
                    <img src={plusIcon} alt="plus-icon" />
                  </S.PlusButtonCell>
                  {renderColumns(member)}
                </S.Row>

                {expandedRow === member.studentId && (
                  <>
                    <S.ExpandedRow>
                      <td colSpan={columns.length + 2}>
                        <S.SubHeaderRow>
                          <S.GridCell area="reason">사유</S.GridCell>
                          <S.GridCell area="penalty">패널티</S.GridCell>
                          <S.GridCell area="penaltyDate">
                            패널티 일자
                          </S.GridCell>
                        </S.SubHeaderRow>
                      </td>
                    </S.ExpandedRow>

                    {penaltyData[member.studentId]?.map((penalty, index) => (
                      <S.ExpandedRow
                        key={`${member.studentId}-${penalty.penaltyDate}`}
                      >
                        <td colSpan={columns.length + 2}>
                          <PenaltyDetail
                            penaltyData={penalty}
                            onEdit={() =>
                              handleEditPenalty(member.studentId, index)
                            }
                            onDelete={() =>
                              handleDeletePenalty(member.studentId, index)
                            }
                          />
                        </td>
                      </S.ExpandedRow>
                    ))}

                    {isAdding && (
                      <S.ExpandedRow>
                        <td colSpan={columns.length + 2}>
                          <PenaltyAdd
                            onCancel={handleCancelAdd}
                            onSave={(data) =>
                              handleSavePenalty(member.studentId, data)
                            }
                            existingData={
                              editingIndex !== null
                                ? penaltyData[member.studentId]?.[editingIndex]
                                : undefined
                            }
                          />
                        </td>
                      </S.ExpandedRow>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </S.TableWrapper>
    </S.TableContainer>
  );
};

export default PenaltyListTable;
