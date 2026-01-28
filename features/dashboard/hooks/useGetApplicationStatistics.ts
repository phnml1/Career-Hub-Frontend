import { useSuspenseQuery } from '@tanstack/react-query';

import { getApplicationStatistics } from './../api/getApplicationStatistics';

export function useGetApplicationStatistics() {
  return useSuspenseQuery({
    queryKey: ['application-statistics'],
    queryFn: getApplicationStatistics,
  });
}
