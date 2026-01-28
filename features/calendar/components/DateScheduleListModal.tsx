'use client';

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useDateScheduleListStore } from '../stores/useDateScheduleListStore';
import { endOfDay, format, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/shared/components/ui/button';
import { useDateScheduleCreateStore } from '../stores/useDateScheduleCreateStore';

import EventCard from './EventCard';
import { useCalendarViewStore } from '../stores/useCalendarViewStore';
import {
  CalendarPlusIcon,
  CalendarSearchIcon,
  Loader2Icon,
} from 'lucide-react';
import ScheduleListEmptyState from './ScheduleListEmptyState';
import { useGetSchedules } from '../hooks/useGetSchedules';
import { useSearchParamsBasedRoute } from '@/shared/hooks/useSearchParamsBasedRoute';
import { ResultCriteria, StageType, SubmissionStatus } from '../types';

export default function DateScheduleListModal() {
  const { isOpen, selectedDate, close } = useDateScheduleListStore();
  const { getSearchParams, getSearchParam } = useSearchParamsBasedRoute();
  const { setViewAndDate } = useCalendarViewStore();
  const { open } = useDateScheduleCreateStore();
  const from = selectedDate
    ? format(startOfDay(selectedDate), 'yyyy-MM-dd')
    : '';
  const to = selectedDate ? format(endOfDay(selectedDate), 'yyyy-MM-dd') : '';
  const { data, isLoading, isError } = useGetSchedules({
    from,
    to,
    companyName: getSearchParam('query'),
    stageTypes: getSearchParams('processTypes') as StageType[],
    submissionStatusList: getSearchParams(
      'documentStatuses',
    ) as SubmissionStatus[],
    resultCriteria: getSearchParams('resultStatuses') as ResultCriteria[],
  });

  const handleGoToDayView = () => {
    if (!selectedDate) return;

    setViewAndDate('day', selectedDate);
    close();
  };

  const schedules = data?.items || [];

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {selectedDate
              ? format(selectedDate, 'yyyy년 MM월 dd일 EEEE', {
                  locale: ko,
                })
              : '일정'}
          </DialogTitle>
          <DialogDescription>선택한 날짜의 일정 목록입니다.</DialogDescription>
        </DialogHeader>

        <div className='flex-1'>
          {/* 로딩 상태 처리 */}
          {isLoading && (
            <div className='flex flex-col items-center justify-center py-10 gap-2 text-slate-500'>
              <Loader2Icon className='w-8 h-8 animate-spin' />
              <p className='text-sm'>일정을 불러오는 중입니다...</p>
            </div>
          )}

          {/* 에러 상태 처리 */}
          {isError && (
            <div className='text-center py-10 text-red-500'>
              <p>일정을 불러오지 못했습니다.</p>
            </div>
          )}

          {/* 성공 상태 & 데이터 없음 */}
          {!isLoading && !isError && schedules.length === 0 && (
            <ScheduleListEmptyState />
          )}

          {/* 성공 상태 & 데이터 리스트 */}
          {!isLoading && !isError && schedules.length > 0 && (
            <div className='flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1'>
              {schedules.map((item) => (
                <EventCard
                  key={item.scheduleId}
                  event={{
                    title: item.scheduleName,
                    start: new Date(item.startedAt),
                    end: new Date(item.endedAt),
                    resource: item, // 원본 데이터 보관
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className='flex flex-col gap-y-2'>
          <Button onClick={() => open(selectedDate!)} className='font-bold'>
            <CalendarPlusIcon /> 일정 추가
          </Button>

          <Button variant='outline' onClick={handleGoToDayView}>
            <CalendarSearchIcon />
            일간 뷰로 자세히 보기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
