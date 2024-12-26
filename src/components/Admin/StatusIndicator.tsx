import theme from '@/styles/theme';
import styled from 'styled-components';

interface StatusIndicatorProps {
  status: '승인 완료' | '대기 중' | '추방';
}

const StatusDot = styled.span<{ color: string }>`
  width: 12px;
  height: 12px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
`;

const statusColors = {
  '승인 완료': `${theme.color.main}`,
  '대기 중': `${theme.color.pintYellow}`,
  추방: `${theme.color.negative}`,
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const color = statusColors[status];

  return (
    <StatusWrapper>
      <StatusDot color={color} />
      {status}
    </StatusWrapper>
  );
};

export default StatusIndicator;
