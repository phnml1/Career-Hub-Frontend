'use client';

import { clientApi } from '@/shared/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/** 기타 일정 생성 요청 타입 */
interface CreateEtcRequest {
  applicationId: number;
  scheduleName: string; // 직접 입력한 일정 명칭
  startedAt: string; // ISO String
  endedAt: string; // ISO String
}

export const useCreateEtcSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, ...body }: CreateEtcRequest) => {
      const url = `/v1/applications/${applicationId}/schedules/etc`;
      return clientApi.post(url, body);
    },
    onSuccess: () => {
      // 캘린더 및 관련 리스트 데이터 무효화
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
    onError: (error) => {
      console.error('기타 일정 생성 실패:', error);
      // 필요 시 토스트 알림 로직 추가
    },
  });
};
