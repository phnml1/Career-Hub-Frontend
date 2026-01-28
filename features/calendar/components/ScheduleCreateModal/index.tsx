'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/ui/dialog';

import { useDateScheduleCreateStore } from '../../stores/useDateScheduleCreateStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import ScheduleTypeRadioGroup from './ScheduleTypeRadioGroup';

import InterviewScheduleForm from './InterviewScheduleForm';

import EtcScheduleForm from './EtcScheduleForm';

export default function ScheduleCreateModal() {
  const { isOpen, close, selectedDate } = useDateScheduleCreateStore();
  const [scheduleType, setScheduleType] = useState<'INTERVIEW' | 'ETC'>(
    'INTERVIEW',
  );

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='font-black'>일정 추가</DialogTitle>
          {selectedDate && (
            <DialogDescription>
              <span className='text-primary font-black'>
                {format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko })}
              </span>
              에 일정을 추가합니다.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className='space-y-6'>
          <ScheduleTypeRadioGroup
            value={scheduleType}
            onChange={(val) => setScheduleType(val as 'INTERVIEW' | 'ETC')}
          />

          {scheduleType === 'INTERVIEW' ? (
            <InterviewScheduleForm
              selectedDate={selectedDate}
              onSuccess={close}
              onCancel={close}
            />
          ) : (
            <EtcScheduleForm
              selectedDate={selectedDate}
              onSuccess={close}
              onCancel={close}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
