import { ScheduleItem } from '../api/getSchedules';

// react-big-calendar 캘린더 이벤트 타입
export type RbcEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource: ScheduleItem;
};
