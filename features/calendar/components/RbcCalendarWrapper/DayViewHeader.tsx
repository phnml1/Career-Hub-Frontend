import { cn } from '@/shared/lib/utils';
import { isToday } from 'date-fns';

import { DateLocalizer } from 'react-big-calendar';

interface DayViewHeaderProps {
  date: Date;
  localizer: DateLocalizer;
}

export default function DayViewHeader({ date, localizer }: DayViewHeaderProps) {
  const day = localizer.format(date, 'd');
  const weekday = localizer.format(date, 'EEE');

  const today = isToday(date);

  return (
    <div className='flex flex-col items-center py-2 h-[63px]'>
      {/* 요일 */}
      <span className='text-xs font-black uppercase mb-1 text-slate-400'>
        {weekday}
      </span>

      {/* 날짜 */}
      <span
        className={cn(
          'inline-flex items-center justify-center w-7 h-7 rounded-full',
          'text-lg font-black transition-colors',
          today
            ? 'bg-primary text-primary-foreground shadow-primary'
            : 'text-slate-900 dark:text-slate-100',
        )}
      >
        {day}
      </span>
    </div>
  );
}
