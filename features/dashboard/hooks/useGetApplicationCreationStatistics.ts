import { useSuspenseQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import {
  ApplicationCreationStatisticsResponse,
  GetApplicationStatisticsParams,
} from '../types/api';

export const useGetApplicationCreationStatistics = (
  params?: GetApplicationStatisticsParams,
) => {
  return useSuspenseQuery({
    queryKey: ['applications', 'statistics', 'creation', params],
    queryFn: async () => {
      return clientApi.get<ApplicationCreationStatisticsResponse>(
        `/v1/applications/statistics/creation?${params}`,
      );
    },
    // Recharts용 데이터 포맷으로 변환
    select: (data) => {
      const weekly = data.weeklyStatistics.map((item, index, array) => {
        let label = item.period; // 기본값은 기간 (ex: 12.29 - 01.04)

        // 마지막 항목(이번 주)과 그 직전 항목(지난 주) 처리
        if (item.isCurrentWeek) {
          label = '이번 주';
        } else if (index === array.length - 2) {
          label = '지난 주';
        }

        return {
          xAxisLabel: label, // X축 라벨 (이번 주, 지난 주 등)
          fullPeriod: item.period, // 툴팁용 (01.12 - 01.18)
          applicationsCount: item.count,
          isCurrent: item.isCurrentWeek,
        };
      });

      const monthly = data.monthlyStatistics.map((item) => ({
        xAxisLabel: item.isCurrentMonth ? '이번 달' : item.period,
        fullPeriod: item.period, // 툴팁용 (2026.01)
        applicationsCount: item.count,
        isCurrent: item.isCurrentMonth,
      }));

      return {
        WEEKLY: weekly,
        MONTHLY: monthly,
      };
    },
  });
};
