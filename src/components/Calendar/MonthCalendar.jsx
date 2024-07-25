import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import mockEventMonth from '../mockData/mockEventMonth';

const CalendarContainer = styled.div`
  width: 100%;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  z-index: 2;

  .fc {
    font-size: 12px;
  }

  .fc-day-today {
    background-color: transparent !important;
  }

  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: ${theme.color.grayScale.gray12};
  }

  .fc-col-header-cell {
    background-color: ${theme.color.grayScale.gray12};
    padding-bottom: 15px;
  }

  .fc-daygrid-day-number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .fc-day-sun a {
    color: ${theme.color.main.negative};
  }

  .fc-day-sat a {
    color: ${theme.color.main.pointBlue};
  }

  .fc-event,
  .fc-event-dot {
    padding: 3px 10px;
    background-color: ${theme.color.grayScale.gray18}; !important;
    border: none;
    border-radius: 20px;
    color: white !important;
    cursor: pointer;
  }

  .fc-event:hover {
    padding: 3px 10px;
    background-color: ${theme.color.main.pointBlue}; !important;
    border: none;
    border-radius: 20px;
    color: white !important;
    cursor: pointer;
  }
  
  .fc-daygrid-event.fc-daygrid-block-event:first-child {
    height: 19px;
    margin-left: 2px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .fc-daygrid-event.fc-daygrid-block-event:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .fc-daygrid-event-dot {
    display: none;
  }

  .fc-event-time {
    display: none;
  }

  .fc-event-title {
    font-weight: 400;
    padding: 0px;
  }
`;

const Today = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1px;
  right: 7px;
  background: ${theme.color.main.mainColor};
  border-radius: 10px;
  width: 38px;
  height: 22px;
  z-index: 0;
`;

const MonthCalendar = ({ year, month }) => {
  const calendarRef = useRef(null); // useRef를 사용하여 참조 객체 생성
  const navi = useNavigate();

  const renderDayCell = (arg) => {
    const isToday =
      format(arg.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    return (
      <div>
        {isToday && <Today>{arg.date.getDate()}</Today>}
        <div>{arg.date.getDate()}</div>
      </div>
    );
  };

  const onClickEvent = (clickInfo) => {
    const eventId = clickInfo.event.id;
    navi(`/event/${eventId}`);
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi(); // FullCalendar 인스턴스에 접근
      calendarApi.gotoDate(new Date(year, month - 1)); // 날짜 변경
    }
  }, [year, month]);

  return (
    <CalendarContainer>
      <FullCalendar
        ref={calendarRef} // FullCalendar에 참조 객체 전달
        plugins={[dayGridPlugin]}
        events={mockEventMonth}
        eventClick={onClickEvent}
        locale="ko"
        headerToolbar={false}
        fixedWeekCount={false}
        dayCellContent={renderDayCell}
        height="auto"
      />
    </CalendarContainer>
  );
};

MonthCalendar.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default MonthCalendar;
