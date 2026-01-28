import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getSchedules,
  GetSchedulesParams,
  ScheduleItem,
} from '../api/getSchedules';
import { RbcEvent } from '../types/rbcEvent';

export function useGetSchedules(params: GetSchedulesParams) {
  return useSuspenseQuery({
    queryKey: ['schedules', params],
    queryFn: () => getSchedules(params),
    select: (data) => {
      const events: RbcEvent[] = data.items.map((item: ScheduleItem) => {
        let start: Date;
        let end: Date;
        let isAllDay = false;

        // 전형별 종료 시점(end) 및 시작 시점(start) 계산 규칙
        switch (item.stageType) {
          case 'DOCUMENT':
            // [서류 전형] end: submissionDeadline
            end = new Date(item.submissionDeadline);
            // 캘린더 블록 가시성을 위해 마감 1시간 전을 start로 설정
            start = new Date(end.getTime() - 60 * 60 * 1000);
            break;

          case 'INTERVIEW':
            // [면접 전형] end: 백엔드 startedAt 기반 + 1시간
            const interviewStart = new Date(item.startedAt);
            start = interviewStart;
            end = new Date(interviewStart.getTime() + 60 * 60 * 1000);
            break;

          case 'ETC':
            // [면접 전형] end: 백엔드 startedAt 기반 + 1시간
            const etcStart = new Date(item.startedAt);
            start = etcStart;
            end = new Date(item.endedAt);
            break;

          case 'APPLICATION_CLOSE':
            // [전형 종료] 캘린더 상단 allDay 처리
            start = new Date(item.startedAt);
            end = new Date(item.endedAt);
            isAllDay = true;
            break;

          default:
            // [기타 전형 (ETC 등)] end: 백엔드에서 정한 endedAt
            start = new Date(item.startedAt);
            end = new Date(item.endedAt);
            break;
        }

        let title = '';
        if (item.stageType === 'DOCUMENT') {
          const statusText =
            item.submissionStatus === 'SUBMITTED' ? '제출 완료' : '미제출';
          title = `${item.companyName} | ${statusText}`;
        } else {
          title = `${item.companyName} | ${item.scheduleName}`;
        }

        // RbcEvent 객체 구조로 반환
        return {
          title: title,
          start,
          end,
          allDay: isAllDay,
          resource: item, // 원본 데이터 보존
        };
      });

      return {
        ...data,
        events, // 가공된 RbcEvent 배열 추가
      };
    },
  });
}
