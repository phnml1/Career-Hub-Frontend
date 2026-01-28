import { clientApi } from '@/shared/lib/api/clientApi';
import { ResultCriteria, StageType, SubmissionStatus } from '../types';

export interface GetSchedulesParams {
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
  companyName?: string;
  stageTypes?: StageType[];
  submissionStatusList?: SubmissionStatus[];
  resultCriteria?: ResultCriteria[];
}

export interface ScheduleItem {
  scheduleId: number;
  applicationId: number;
  companyName: string;
  stageType: StageType;
  scheduleName: string;
  startedAt: string;
  endedAt: string;
  location: string;
  submissionStatus: SubmissionStatus;
  submissionDeadline: string;
}

export interface GetSchedulesResponse {
  items: ScheduleItem[];
}

/** 캘린더 통합 일정 조회 */
export const getSchedules = async (params: GetSchedulesParams) => {
  const {
    from,
    to,
    companyName,
    stageTypes,
    submissionStatusList,
    resultCriteria,
  } = params;

  if (!from || from === 'undefined' || !to || to === 'undefined') {
    // Suspense를 깨지 않기 위해 빈 데이터를 반환하거나,
    // 유효한 기본 날짜로 대체합니다.
    return { items: [] };
  }

  const searchParams = new URLSearchParams({
    from,
    to,
    // 배열 필드는 .join(',')을 통해 "INTERVIEW,ETC" 형태로 변환
    ...(companyName && { companyName }),
    ...(stageTypes && { stageTypes: stageTypes.join(',') }),
    ...(submissionStatusList && {
      submissionStatusList: submissionStatusList.join(','),
    }),
    ...(resultCriteria && {
      resultCriteria: resultCriteria.join(','),
    }),
  });

  const queryString = searchParams.toString();

  return clientApi.get<GetSchedulesResponse>(
    `/v1/schedules${queryString ? `?${queryString}` : ''}`,
  );
};
