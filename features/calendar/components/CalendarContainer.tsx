'use client';

import { startOfMonth, endOfMonth, format } from 'date-fns';

import { useCalendarViewStore } from '../stores/useCalendarViewStore';
import { useGetSchedules } from '../hooks/useGetSchedules';
import RbcCalendarWrapper from './RbcCalendarWrapper';
import { useSearchParamsBasedRoute } from '@/shared/hooks/useSearchParamsBasedRoute';
import { ResultCriteria, StageType, SubmissionStatus } from '../types';

/**
 * 캘린더의 비즈니스 로직(데이터 페칭, 날짜 상태 관리)을 담당하는 컨테이너
 */
export default function CalendarContainer() {
  const { date } = useCalendarViewStore();
  const { getSearchParams, getSearchParam } = useSearchParamsBasedRoute();

  const from = format(startOfMonth(date), 'yyyy-MM-dd');
  const to = format(endOfMonth(date), 'yyyy-MM-dd');

  const { data } = useGetSchedules({
    from,
    to,
    companyName: getSearchParam('query'),
    stageTypes: getSearchParams('processTypes') as StageType[],
    submissionStatusList: getSearchParams(
      'documentStatuses',
    ) as SubmissionStatus[],
    resultCriteria: getSearchParams('resultStatuses') as ResultCriteria[],
  });

  return <RbcCalendarWrapper events={data.events} />;
}
