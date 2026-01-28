import { useSuspenseQuery } from '@tanstack/react-query';

import { getUpcomingSchedules } from '../api/getUpcomingSchedules';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export function useGetUpcomingSchedules() {
  return useSuspenseQuery({
    queryKey: ['applications', 'upcoming'],
    queryFn: getUpcomingSchedules,
    select: (data) => {
      const now = new Date();

      return {
        ...data,
        schedules: data.items.map((item) => {
          const startDate = parseISO(item.startedAt);
          const dDay = differenceInCalendarDays(startDate, now);

          return {
            ...item,
            dDayValue: dDay,
            displayDate: format(startDate, 'MM월 dd일 eee a hh시 mm분', {
              locale: ko,
            }),
            isUrgent: dDay >= 0 && dDay <= 3,
            isToday: dDay === 0,
            isExpired: dDay < 0,
          };
        }),
      };
    },
  });
}
