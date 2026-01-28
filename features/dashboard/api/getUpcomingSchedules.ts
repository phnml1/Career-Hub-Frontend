import { clientApi } from '@/shared/lib/api/clientApi';

import { ScheduleResult, StageType } from '../types';

export interface UpcomingSchedule {
  id: number;
  applicationId: number;
  companyName: string;
  stageType: StageType;
  scheduleName: string;
  location: string;
  startedAt: string; // ISO 8601 (e.g., "2025-12-06T14:00:00")
  endedAt: string; // ISO 8601
  scheduleResult: ScheduleResult;
}

export interface GetUpcomingSchedulesResponse {
  items: UpcomingSchedule[];
}

/**
 * 다가오는 면접/기타 일정 조회 API (최대 4개)
 */
export const getUpcomingSchedules =
  (): Promise<GetUpcomingSchedulesResponse> => {
    return clientApi.get<GetUpcomingSchedulesResponse>(
      '/v1/schedules/upcoming',
    );
  };
