import React, { useState } from 'react';
import styled from 'styled-components';

import CalendarHeader from '../components/Calendar/CalendarHeader';
import MonthCalendar from '../components/Calendar/MonthCalendar';
import YearCalendar from '../components/Calendar/YearCalendar';
import ToggleButton from '../components/Calendar/ToggleButton';
import useCustomBack from '../router/useCustomBack';
import YearlyScheduleAPI from '../hooks/YearlyScheduleAPI';

const StyledCalendar = styled.div`
  width: 370px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const todayYear = new Date().getFullYear();
const todayMonth = new Date().getMonth() + 1;

const Calendar = () => {
  useCustomBack('/home');
  const [calendarType, setCalendarType] = useState('month');
  const [isMonth, setisMonth] = useState(true);
  const [year, setYear] = useState(todayYear);
  const [month, setMonth] = useState(todayMonth);

  const start = `${year}-01-01T00:00:00.000Z`;
  const end = `${year}-12-31T23:59:59.999Z`;

  // useEffect(() => {
  //   console.log('Calendar state updated:', { year, month });
  // }, [year, month]);

  const onToggle = () => {
    setCalendarType(isMonth ? 'year' : 'month');
    setisMonth(!isMonth);
  };

  const editYear = (newYear) => {
    setYear(newYear);
  };

  const editMonth = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <StyledCalendar>
      <YearlyScheduleAPI start={start} end={end} />
      <CalendarHeader
        month={month}
        year={year}
        isMonth={isMonth}
        editYear={editYear}
        editMonth={editMonth}
      />
      <Content>
        <ToggleButton onToggle={onToggle} />
        {calendarType === 'month' ? (
          <MonthCalendar
            month={month}
            year={year}
            editYear={editYear}
            editMonth={editMonth}
          />
        ) : (
          <YearCalendar year={year} />
        )}
      </Content>
    </StyledCalendar>
  );
};

export default Calendar;
