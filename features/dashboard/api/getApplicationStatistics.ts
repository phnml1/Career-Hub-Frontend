import { clientApi } from '@/shared/lib/api/clientApi';

export interface GetApplicationStatisticsResponse {
  totalApplicationCount: number;
  docStageCount: number;
  interviewStageCount: number;
  etcStageCount: number;
  finalPassedCount: number;
  finalFailedCount: number;
}

export const getApplicationStatistics =
  (): Promise<GetApplicationStatisticsResponse> => {
    return clientApi.get<GetApplicationStatisticsResponse>(
      '/v1/applications/statistics',
    );
  };
