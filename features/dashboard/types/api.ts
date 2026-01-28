export type SubmissionStatus = '미제출' | '제출 완료' | '마감 임박';

/** 개별 통계 데이터 항목 */
export interface StatisticItem {
  period: string; // "01.02 - 01.08" 또는 "2025.08"
  count: number;
}

/** 주간 통계 아이템 (isCurrentWeek 필수) */
export interface WeeklyStatisticItem extends StatisticItem {
  isCurrentWeek: boolean;
}

/** 월간 통계 아이템 (isCurrentMonth 필수) */
export interface MonthlyStatisticItem extends StatisticItem {
  isCurrentMonth: boolean;
}
