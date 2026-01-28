import { useMutation } from '@tanstack/react-query';

import { NotificationPreferencesMap, PlatformType } from '../types';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';
import { putNotificationPreference } from '../api/putNotificationPreference';

export function useUpdateNotificationPreference(
  platform: PlatformType = 'WEB'
) {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({ event, enabled }: { event: string; enabled: boolean }) =>
      putNotificationPreference({ platform, event, enabled }),

    // 낙관적 업데이트: 서버 응답 전 UI를 먼저 변경
    onMutate: async (newSetting) => {
      // 진행 중인 리패칭 취소
      await queryClient.cancelQueries({
        queryKey: ['notifications', 'preferences', platform],
      });

      // 이전 상태 저장 (롤백용)
      const previousData = queryClient.getQueryData<NotificationPreferencesMap>(
        ['notifications', 'preferences', platform]
      );

      // 캐시 데이터 즉시 수정
      if (previousData) {
        queryClient.setQueryData<NotificationPreferencesMap>(
          ['notifications', 'preferences', platform],
          (old) => {
            // old가 undefined일 수 있으므로 방어 코드 작성
            if (!old) return { [newSetting.event]: newSetting.enabled };
            return {
              ...old,
              [newSetting.event]: newSetting.enabled,
            };
          }
        );
      }

      return { previousData };
    },

    // 에러 발생 시 원래대로 복구
    onError: (err, newSetting, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['notifications', 'preferences', platform],
          context.previousData
        );
      }
    },

    // 성공/실패 여부와 상관없이 서버 데이터와 동기화
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['notifications', 'preferences', platform],
      });
    },
  });
}
