import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

export const monthModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(5px)', // 표준 CSS 속성
    WebkitBackdropFilter: 'blur(5px)', // -webkit- 접두사를 사용한 속성
    zIndex: 1000,
    width: '100%',
    height: '100%',
    top: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '55px auto', // 블러가 시작되는 위치를 정하고
  },
  content: {
    margin: '10px auto', // 모달은 블러 시작점으로부터 10px 떨어진 곳에 위치
  },
};
