import { clientApi } from '@/shared/lib/api/clientApi';
import { MonthlyStatisticItem, WeeklyStatisticItem } from '../types/api';

export interface GetApplicationCreationStatisticsParams {
  weekCount?: number;
  monthCount?: number;
}

/** 생성 통계 API 응답 타입 */
export interface GetApplicationCreationStatisticsResponse {
  weeklyStatistics: WeeklyStatisticItem[];
  monthlyStatistics: MonthlyStatisticItem[];
}

/** 지원서 생성 통계 조회 (주간/월간) */
export const getApplicationCreationStatistics = async (
  params?: GetApplicationCreationStatisticsParams,
) => {
  const { weekCount, monthCount } = params ?? {};

  const searchParams = new URLSearchParams({
    ...(weekCount && { weekCount: String(weekCount) }),
    ...(monthCount && { monthCount: String(monthCount) }),
  });

  return clientApi.get<GetApplicationCreationStatisticsResponse>(
    `/v1/applications/statistics/creation${searchParams.toString()}`,
  );
};
