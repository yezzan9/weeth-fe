import theme from '@/styles/theme';
import styled from 'styled-components';
import AddCardinal from '@/components/Admin/AddCardinal';
import { BoxWrapper } from './TotalDues';
import Box from './Box';

const CardinalBoxWrapper = styled(BoxWrapper)`
  padding: 0 0 30px 0;
  box-sizing: border-box;
`;

const boxData = [
  {
    id: 'cardinal-total',
    description: '전체',
    last: '총 100명',
    color: `${theme.color.gray[18]}`,
  },
  {
    id: 'cardinal-4',
    title: '24년 2학기(현재)',
    description: '4기',
    last: '노정완 외 25명',
    color: `${theme.color.gray[65]}`,
  },
  {
    id: 'cardinal-3',
    title: '24년 1학기',
    description: '3기',
    last: '김성민 외 25명',
    color: `${theme.color.gray[65]}`,
  },
  {
    id: 'cardinal-2',
    title: '23년 2학기',
    description: '2기',
    last: '김성민 외 25명',
    color: `${theme.color.gray[65]}`,
  },
  {
    id: 'cardinal-1',
    title: '23년 1학기',
    description: '1기',
    last: '김성민 외 25명',
    color: `${theme.color.gray[65]}`,
  },
];

const CardinalInfo: React.FC = () => {
  return (
    <CardinalBoxWrapper>
      <AddCardinal />
      {boxData.map((cardinalBox) => (
        <Box
          key={cardinalBox.id}
          title={cardinalBox.title}
          description={cardinalBox.description}
          last={cardinalBox.last}
          color={cardinalBox.color}
          lastColor="#D3D3D3"
        />
      ))}
    </CardinalBoxWrapper>
  );
};
export default CardinalInfo;
