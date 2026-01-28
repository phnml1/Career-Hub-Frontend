import { clientApi } from '@/shared/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetNotificationsResponse } from '../types';

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      return clientApi.patch(`/v1/notifications/${notificationId}/read`, {});
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
            notifications: page.notifications.map((notification) =>
              notification.notificationId === notificationId
                ? { ...notification, is_read: true }
                : notification
            ),
          })),
        };
      });
    },
  });
}
