'use client';

import { Calendar, dateFnsLocalizer, DateLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { ko } from 'date-fns/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { Toolbar } from './Toolbar';
import { useDateScheduleListStore } from '../../stores/useDateScheduleListStore';
import { WeekViewHeader } from './WeekViewHeader';
import TimeGutterHeader from './TimeGutterHeader';
import { useCalendarViewStore } from '../../stores/useCalendarViewStore';
import DayViewHeader from './DayViewHeader';
import MonthViewEvent from './MonthViewEvent';
import WeekViewEvent from './WeekViewEvent';
import { MonthViewDateHeader } from './MonthViewDateHeader';
import DateCellWrapper from './DateCellWrapper';
import { MonthViewHeader } from './MonthViewHeader';
import { RbcEvent } from '../../types/rbcEvent';

const locales = {
  ko: ko,
};

const formats = {
  // 월간 뷰(Month View)의 날짜 숫자 포맷 커스텀
  // 'dd'는 01, 02 형식이고 'd'는 1, 2 형식
  dateFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
    localizer!.format(date, 'd', culture), // 'd'로 설정하여 앞의 0 제거
  timeGutterFormat: (
    date: Date,
    culture?: string,
    localizer?: DateLocalizer,
  ) => {
    return localizer!.format(date, 'a h', 'en-US');
  },
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function RbcCalendarWrapper({
  events = [],
}: {
  events: RbcEvent[];
}) {
  const { view, date, setView, setDate } = useCalendarViewStore();

  const openListModal = useDateScheduleListStore((state) => state.open);

  return (
    <Calendar
      className='h-full w-full'
      view={view}
      views={{
        month: true,
        week: true,
        day: true,
      }}
      messages={{
        showMore: (total: number) => `+ ${total}개 더보기`,
      }}
      date={date}
      onView={(nextView) => setView(nextView)}
      onNavigate={(nextDate) => setDate(nextDate)}
      components={{
        toolbar: Toolbar,
        dateCellWrapper: DateCellWrapper,
        month: {
          event: (props) => <MonthViewEvent {...props} />,
          dateHeader: MonthViewDateHeader,
          header: MonthViewHeader,
        },
        week: {
          header: WeekViewHeader,
          event: WeekViewEvent,
        },
        day: {
          header: DayViewHeader,
          event: WeekViewEvent,
        },
        timeGutterHeader: TimeGutterHeader,
      }}
      selectable
      onSelectSlot={(slotInfo) => {
        openListModal(slotInfo.start);
      }}
      onSelectEvent={(rbcEvent) => {
        openListModal(rbcEvent.start);
      }}
      culture='ko'
      formats={formats}
      localizer={localizer}
      startAccessor='start'
      endAccessor='end'
      events={events}
    />
  );
}
