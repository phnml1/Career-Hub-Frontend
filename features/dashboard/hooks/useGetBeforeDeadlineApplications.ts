import { useSuspenseQuery } from '@tanstack/react-query';

import { clientApi } from '@/shared/lib/api/clientApi';
import { BeforeDeadlineListResponse, SubmissionStatus } from '../types/api';
import { calculateDDay } from '../utils';

export function useGetBeforeDeadlineApplications() {
  return useSuspenseQuery({
    queryKey: ['applications', 'before-deadline'],
    queryFn: () => {
      return clientApi.get<BeforeDeadlineListResponse>(
        'v1/applications/before-deadline',
      );
    },
    select: (data) => ({
      ...data,
      contents: data.contents.map((item) => {
        const dDay = calculateDDay(item.deadline);

        // 서버에서 오는 상태값이 있다면 유지하되,
        // D-Day 기반으로 '마감 임박'을 클라이언트에서 한 번 더 정의
        let submissionStatus: SubmissionStatus =
          item.submissionStatus as SubmissionStatus;

        if (dDay >= 0 && dDay <= 1 && submissionStatus !== '제출 완료') {
          submissionStatus = '마감 임박';
        }

        return {
          ...item,
          dDay,
          submissionStatus,
        };
      }),
    }),
  });
}
