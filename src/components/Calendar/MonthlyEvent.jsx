/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import icDot from '../../assets/images/ic_dot.svg';
import { YearlyScheduleContext } from '../../hooks/YearlyScheduleContext';

const StyledYear = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.grayScale.gray18};
  padding: 10px;
  margin-bottom: 15px;
  width: 143px; //사이즈 수정 필요
  border-radius: 10px;
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
`;

const Dot = styled.img`
  padding-left: 8px;
  padding-right: 10px;
`;

const MonthName = styled.div`
  padding-left: 10px;
  padding-bottom: 7px;
  color: ${(props) => (props.istoday === 'true' ? '#00dda8' : '#ffffff')};
  font-size: 18px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const EventComponent = ({ title }) => {
  return (
    <Content>
      <Dot src={icDot} alt="dot" />
      <div>{title}</div>
    </Content>
  );
};

EventComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

const MonthlyEvent = ({ thisMonth, year, events }) => {
  const todayMonth = new Date().getMonth() + 1;
  const todayYear = new Date().getFullYear();
  const istoday = thisMonth === todayMonth && todayYear === year;

  return (
    <StyledYear>
      <MonthName istoday={istoday.toString()}>{thisMonth}월</MonthName>
      <ContentWrapper>
        {events.length > 0 ? (
          events.map((event) => (
            <EventComponent key={event.id} title={event.title} />
          ))
        ) : (
          <EventComponent title="일정이 없습니다!" />
        )}
      </ContentWrapper>
    </StyledYear>
  );
};

MonthlyEvent.propTypes = {
  thisMonth: PropTypes.number.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      isMeeting: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default MonthlyEvent;
