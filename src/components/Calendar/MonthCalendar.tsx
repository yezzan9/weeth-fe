import useGetMonthlySchedule from '@/api/useGetMonthSchedule';
import * as S from '@/styles/calendar/MonthCalendar.styled';
import theme from '@/styles/theme';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    id: 3,
    title: '2주차 정기모임',
    start: '2025-01-17T19:00:00',
    end: '2025-01-17T21:00:00',
    isMeeting: true,
  },
  {
    id: 4,
    title: '3주차 정기모임',
    start: '2025-01-14T19:00:00',
    end: '2025-01-18T21:00:00',
    isMeeting: true,
  },
  {
    id: 5,
    title: '12주 중간고사 기간',
    start: '2025-01-07T00:00:00',
    end: '2025-01-11T23:59:00',
    isMeeting: false,
  },
];

const MonthCalendar = ({ year, month }: { year: number; month: number }) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const navi = useNavigate();

  const prevMonth = month - 1;
  const nextMonth = month + 1;

  const formattedStart = `${year}-${String(prevMonth).padStart(2, '0')}-23T00:00:00.000Z`;
  const formattedEnd = new Date(
    year,
    nextMonth,
    6,
    23,
    59,
    59,
    999,
  ).toISOString();

  const preprocessData = (data: any[]) =>
    data.map((event) => ({
      ...event,
      id: `${event.id}_${event.isMeeting}`,
    }));

  const renderDayCell = (arg: any) => {
    const isToday =
      format(arg.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
    return (
      <div>
        {isToday && <S.Today>{arg.date.getDate()}</S.Today>}
        <div>{arg.date.getDate()}</div>
      </div>
    );
  };

  const renderEventContent = (eventInfo: any) => {
    const isToday = format(new Date(), 'yyyy-MM-dd');
    const eventStart = format(new Date(eventInfo.event.start), 'yyyy-MM-dd');
    const eventEnd = format(new Date(eventInfo.event.end), 'yyyy-MM-dd');

    const isTodayIncluded =
      new Date(isToday) >= new Date(eventStart) &&
      new Date(isToday) <= new Date(eventEnd);

    return (
      <div
        style={{
          color: isTodayIncluded ? theme.color.main : '#fff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {eventInfo.event.title}
      </div>
    );
  };

  const onClickEvent = (clickInfo: any) => {
    const [id] = clickInfo.event.id.split('_');
    const { isMeeting } = clickInfo.event.extendedProps;

    if (isMeeting) {
      navi(`/meetings/${id}`);
    } else {
      navi(`/events/${id}`);
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date(year, month - 1));
    }
  }, [year, month]);

  return (
    <S.Calendar>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        events={mockData}
        eventContent={renderEventContent}
        eventClick={onClickEvent}
        locale="ko"
        headerToolbar={false}
        fixedWeekCount={false}
        dayCellContent={renderDayCell}
        height="auto"
      />
    </S.Calendar>
  );
};

export default MonthCalendar;
