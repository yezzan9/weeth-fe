/* eslint-disable no-console */
import React, { useEffect, useRef, useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
// import mockEventMonth from '../mockData/mockEventMonth';
import { MonthlyScheduleContext } from '../../hooks/MonthlyScheduleContext';
import MonthlyShceduleAPI from '../../hooks/MonthlyScheduleAPI';
import UserAPI from '../../hooks/UserAPI';

const CalendarContainer = styled.div`
  width: 100%;
  padding-bottom: 183px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  z-index: 2;

  .fc {
    font-size: 12px;
    border: none;
  }

  .fc-day-today {
    background-color: transparent !important;
  }

  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border-color: ${theme.color.grayScale.gray12};
  }

  .fc-col-header-cell 
  {
    background-color: ${theme.color.grayScale.gray12};
    padding-bottom: 15px;
    border: none;
  }

  .fc-scrollgrid,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: none;
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
    padding: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400; //볼드가 자동으로 생겨서 강제로 굵기를 조절했음
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
  const calendarRef = useRef(null);
  const navi = useNavigate();

  const { monthScheduleData, error } = useContext(MonthlyScheduleContext);

  const prevMonth = month - 1;
  const nextMonth = month + 1;

  const [formattedStart, setFormattedStart] = useState(
    `${year}-${String(prevMonth).padStart(2, '0')}-23T00:00:00.000Z`,
  );
  const [formattedEnd, setFormattedEnd] = useState(
    new Date(year, nextMonth, 6, 23, 59, 59, 999).toISOString(),
  );

  useEffect(() => {
    if (error) {
      console.error('Error:', error);
    }
  }, [error]);

  useEffect(() => {
    if (!monthScheduleData) {
      console.log('Loading event data...');
    }
  }, [monthScheduleData]);

  // 데이터 전처리 함수
  const preprocessData = (data) => {
    return data.map((event) => ({
      ...event,
      id: `${event.id}_${event.isMeeting}`, // 고유 ID 생성
    }));
  };

  const processedData = preprocessData(monthScheduleData || []);

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
    const [id] = clickInfo.event.id.split('_'); // 원래 ID 추출
    const { isMeeting } = clickInfo.event.extendedProps;

    if (isMeeting) {
      navi(`/meetings/${id}`, { state: { isMeeting } });
    } else {
      navi(`/events/${id}`, { state: { isMeeting } });
    }
  };

  useEffect(() => {
    setFormattedStart(
      `${year}-${String(prevMonth).padStart(2, '0')}-23T00:00:00.000Z`,
    );
    setFormattedEnd(new Date(year, month, 7, 8, 59, 59, 999).toISOString());
  }, [year, month]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date(year, month - 1));
    }
  }, [year, month]);

  return (
    <CalendarContainer>
      <UserAPI />
      <MonthlyShceduleAPI
        start={formattedStart}
        end={formattedEnd}
        year={year}
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        events={processedData}
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
