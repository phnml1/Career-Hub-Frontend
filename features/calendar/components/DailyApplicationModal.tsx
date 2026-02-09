'use client';

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useDateScheduleListStore } from '../stores/useDateScheduleListStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/shared/components/ui/button';
import { useDateScheduleCreateStore } from '../stores/useDateScheduleCreateStore';

import { useCalendarViewStore } from '../stores/useCalendarViewStore';
import {
  CalendarPlusIcon,
  CalendarSearchIcon,
  Loader2Icon,
} from 'lucide-react';
import { Suspense } from 'react';
import DailyApplicationList from './DailyApplicationList';

export default function DailyApplicationModal() {
  const { isOpen, selectedDate, close } = useDateScheduleListStore();
  const { setViewAndDate } = useCalendarViewStore();
  const { open } = useDateScheduleCreateStore();

  const handleGoToDayView = () => {
    if (!selectedDate) return;

    setViewAndDate('day', selectedDate);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-125'>
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
          <Suspense fallback={<Loader2Icon className='animate-spin mx-auto' />}>
            {selectedDate && (
              <DailyApplicationList selectedDate={selectedDate} />
            )}
          </Suspense>
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
