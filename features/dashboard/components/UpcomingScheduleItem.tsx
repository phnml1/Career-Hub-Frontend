'use client';

import { cn } from '@/shared/lib/utils';

interface UpcomingScheduleItemProps {
  schedule: {
    id: number;
    companyName: string;
    scheduleName: string;
    stageType: string;
    displayDate: string; // 훅에서 가공됨
    dDayValue: number; // 훅에서 가공됨
    isUrgent: boolean; // 훅에서 가공됨
    isToday: boolean; // 훅에서 가공됨
  };
}

export const UpcomingScheduleItem = ({
  schedule,
}: UpcomingScheduleItemProps) => {
  const {
    companyName,
    scheduleName,
    stageType,
    displayDate,
    dDayValue,
    isUrgent,
    isToday,
  } = schedule;

  const isInterview = stageType === 'INTERVIEW';

  // 전형 종류별 배지 스타일
  const badgeStyles = isInterview
    ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
    : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';

  // 디데이 배지 스타일 (오늘이거나 긴급할 때)
  const dDayBadgeStyles = isToday
    ? 'bg-brand-500 text-white border-brand-400'
    : isUrgent
      ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400'
      : 'bg-white text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600';

  return (
    <div className='flex items-center gap-x-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl cursor-pointer hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:ring-2 hover:ring-brand-100 dark:hover:ring-brand-900 transition-all group border border-transparent'>
      {/* D-Day Badge */}
      <div
        className={cn(
          'shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-extrabold shadow-sm bg-white dark:bg-slate-700 border',
          dDayBadgeStyles,
        )}
      >
        <div
          className={cn(
            'flex flex-col items-center justify-center leading-none',
            isToday ? 'flex-col' : 'flex-row',
          )}
        >
          <span className='text-sm font-bold opacity-80'>D-</span>
          <span className={cn('font-black', isToday ? 'text-base' : 'text-xl')}>
            {isToday ? 'DAY' : dDayValue}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className='flex-1 flex flex-col gap-y-2'>
        <div className='flex items-center justify-between'>
          <span className='font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors text-sm'>
            {companyName}
          </span>
          <span
            className={cn(
              'text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap',
              badgeStyles,
            )}
          >
            {isInterview ? '면접' : '기타'}
          </span>
        </div>

        <div className='flex items-center gap-x-2 text-xs text-slate-400 dark:text-slate-500'>
          <span className='truncate font-extrabold'>{scheduleName}</span>
          <span className='shrink-0 font-bold'>{displayDate}</span>
        </div>
      </div>
    </div>
  );
};
