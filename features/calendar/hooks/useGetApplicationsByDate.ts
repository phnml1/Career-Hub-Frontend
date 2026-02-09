import { useSuspenseQuery } from '@tanstack/react-query';
import { getApplicationsByDate } from '../api/getApplicationsByDate';

export const useGetApplicationsByDate = (targetDate: string) => {
  return useSuspenseQuery({
    queryKey: ['applications', 'schedules', targetDate],
    queryFn: () => getApplicationsByDate(targetDate),
  });
};
