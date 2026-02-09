'use client';

import Link from 'next/link';
import { CalendarIcon } from 'lucide-react';

import { useGetUpcomingSchedules } from '../hooks/useGetUpcomingSchedules';
import { UpcomingScheduleItem } from './UpcomingScheduleItem';
import UpcomingScheduleEmptyState from './UpcomingScheduleEmptyState';

/**
 * D-Day 배지와 다가오는 D-7 일정 리스트를 담당합니다.
 * @param param0
 * @returns
 */
export default function UpcomingSchedules() {
  const { data } = useGetUpcomingSchedules();
  const schedules = data.schedules;
  const isEmpty = schedules.length === 0;

  return (
    <div className='bg-card p-8 rounded-3xl border border-border'>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-lg font-bold flex items-center gap-2'>
          <CalendarIcon className='stroke-2 w-5 h-5 text-brand-500' />
          다가오는 면접 / 기타 일정
        </div>
      </div>

      <div className='flex flex-col gap-y-2'>
        {data.schedules.map((schedule) => (
          <Link
            key={schedule.id}
            href={`/applications/${schedule.applicationId}`}
          >
            <UpcomingScheduleItem schedule={schedule} />
          </Link>
        ))}

        {isEmpty && <UpcomingScheduleEmptyState />}
      </div>
    </div>
  );
}
