'use client';

import { clientApi } from '@/shared/lib/api/clientApi';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';
import { useMutation } from '@tanstack/react-query';

/** 면접 일정 생성 요청 타입 */
interface CreateInterviewRequest {
  applicationId: number;
  scheduleName: string; // 가공된 면접 명칭 (ex: 1차 면접)
  startedAt: string; // ISO String
  location: string;
}

export const useCreateInterviewSchedule = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, ...body }: CreateInterviewRequest) => {
      const url = `/v1/applications/${applicationId}/schedules/interview`;
      return clientApi.post(url, body);
    },
    onSuccess: () => {
      // 캘린더 및 관련 리스트 데이터 무효화
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
    },
    onError: (error) => {
      console.error('면접 일정 생성 실패:', error);
      // 필요 시 토스트 알림 로직 추가
    },
  });
};
