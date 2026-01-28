import { useSuspenseQuery } from '@tanstack/react-query';

import { PlatformType } from '../types';
import { getNotificationPreferences } from '../api/getNotificationPreferences';

export function useGetNotificationPreferences(platform: PlatformType = 'WEB') {
  return useSuspenseQuery({
    queryKey: ['notifications', 'preferences', platform],
    queryFn: () => getNotificationPreferences(platform),
    // [ {event: 'A', enabled: true} ] -> { A: true } 변환
    select: (data) =>
      data.preferences.reduce((acc, curr) => {
        acc[curr.event] = curr.enabled;
        return acc;
      }, {} as Record<string, boolean>),
    // 데이터 보존 기간 및 갱신 설정 (선택 사항)
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
  });
}
