'use client';

import { CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { useGetUpcomingSchedules } from '../hooks/useGetUpcomingSchedules';
import { Button } from '@/shared/components/ui/button';
import { UpcomingScheduleItem } from './UpcomingScheduleItem';
import Link from 'next/link';

/**
 * D-Day 배지와 다가오는 D-7 일정 리스트를 담당합니다.
 * @param param0
 * @returns
 */
export default function UpcomingSchedules() {
  const { data } = useGetUpcomingSchedules();
  const schedules = data.schedules;
  const hasSchedules = schedules.length > 0;

  const handleClickMoreShowButton = () => {};

  return (
    <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border'>
      {/* 헤더: 제목 및 더보기 버튼 */}
      <div className='flex items-center justify-between mb-6'>
        <div className='text-lg font-bold flex items-center gap-2'>
          <CalendarIcon className='stroke-2 w-5 h-5 text-brand-500' />
          다가오는 면접 / 기타 일정
        </div>
        <Button
          variant='link'
          size='lg'
          className='text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center transition-colors'
          onClick={handleClickMoreShowButton}
        >
          더보기 <ChevronRightIcon className='w-4 h-4 stroke-2' />
        </Button>
      </div>

      {/* 바디: 리스트 또는 Empty State */}
      <div className='flex flex-col gap-y-2'>
        {/* 데이터가 있을 때만 map 실행 */}
        {hasSchedules &&
          data.schedules.map((schedule) => (
            <Link
              key={schedule.id}
              href={`/applications/${schedule.applicationId}`}
            >
              <UpcomingScheduleItem schedule={schedule} />
            </Link>
          ))}

        {/* 데이터가 없을 때만 안내 문구 표시 */}
        {!hasSchedules && (
          <p className='text-center py-10 text-slate-400 text-sm'>
            다가오는 일정이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
