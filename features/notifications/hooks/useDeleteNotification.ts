import { clientApi } from '@/shared/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetNotificationsResponse } from '../types';

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      return clientApi.delete(`/v1/notifications/${notificationId}`);
    },
    onSuccess: (_, notificationId) => {
      queryClient.setQueryData<{
        pages: GetNotificationsResponse[];
        pageParams: (number | undefined)[];
      }>(['notifications', 20], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            notifications: page.notifications.filter(
              (notification) => notification.notificationId !== notificationId
            ),
          })),
        };
      });
    },
  });
}
