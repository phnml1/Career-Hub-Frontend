import { clientApi } from '@/shared/lib/api/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetNotificationsParams, GetNotificationsResponse } from '../types';

export function useGetNotifications(size: number = 20) {
  return useInfiniteQuery({
    queryKey: ['notifications', size],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();

      if (pageParam) {
        params.append('cursorId', String(pageParam));
      }
      params.append('size', String(size));

      const queryString = params.toString();
      const path = `/v1/notifications${queryString ? `?${queryString}` : ''}`;

      return clientApi.get<GetNotificationsResponse>(path);
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },
  });
}
