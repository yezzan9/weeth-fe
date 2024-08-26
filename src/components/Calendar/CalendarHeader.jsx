import styled from 'styled-components';
import Modal from 'react-modal';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import theme from '../../styles/theme';
import LeftButton from '../Header/LeftButton';
import ModalMonthContent from './ModalMonthContent';
import { UserContext } from '../../hooks/UserContext';

import under from '../../assets/images/ic_under.svg';
import icPlus from '../../assets/images/ic_plus.svg';

Modal.setAppElement('#root');

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 25px 20px 25px; //기본 헤더 마진
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const TitleYear = styled.div`
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
  padding-right: 5px;
`;

const TitleMonth = styled.div`
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px;
  cursor: pointer;
`;

const PlusButton = styled.img`
  cursor: pointer;
`;

const monthModalStyles = {
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

const CalendarHeader = ({ month, year, isMonth, editYear, editMonth }) => {
  const [monthModalIsOpen, setMonthModalIsOpen] = useState(false);
  const { userData, error } = useContext(UserContext);
  const navi = useNavigate();

  // console.log('userData', userData);

  const openMonthModal = () => {
    setMonthModalIsOpen(true);
  };
  const closeMonthModal = () => {
    setMonthModalIsOpen(false);
  };

  const onClickTextButton = () => {
    closeMonthModal();
  };

  let adminButton;

  // userData를 받아오지 못한 경우 아무것도 렌더링하지 않음
  if (!userData && !error) {
    adminButton = null;
  }
  // 에러가 발생한 경우 아무것도 렌더링하지 않음
  else if (error) {
    adminButton = null;
  }
  // userData를 잘 받아왔고, 해당 user의 role이 ADMIN이라면 어드민 버튼 렌더링
  else if (userData.role === 'ADMIN' && !monthModalIsOpen) {
    adminButton = (
      <PlusButton
        src={icPlus}
        alt="+"
        onClick={() => {
          navi('/event/create');
        }}
      />
    );
  }

  return (
    <StyledHeader>
      <LeftButton />
      <TitleWrapper>
        <TitleYear>{year}년</TitleYear>
        <TitleMonth>{isMonth ? `${month}월` : null}</TitleMonth>
        <ImgButton onClick={openMonthModal}>
          <img src={under} alt="select" />
        </ImgButton>
      </TitleWrapper>
      {adminButton}
      <Modal
        className="calendar-modal"
        isOpen={monthModalIsOpen}
        onRequestClose={closeMonthModal}
        style={monthModalStyles}
      >
        <ModalMonthContent
          origYear={year}
          origMonth={month}
          isMonth={isMonth}
          onClickTextButton={onClickTextButton}
          editYear={editYear}
          editMonth={editMonth}
        />
      </Modal>
    </StyledHeader>
  );
};

CalendarHeader.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  isMonth: PropTypes.bool.isRequired,
  editYear: PropTypes.func.isRequired,
  editMonth: PropTypes.func.isRequired,
};

export default CalendarHeader;
