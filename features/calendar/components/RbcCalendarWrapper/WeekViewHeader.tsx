import { cn } from '@/shared/lib/utils';
import { isToday } from 'date-fns';
import { DateLocalizer } from 'react-big-calendar';

interface WeekViewHeaderProps {
  date: Date;
  localizer: DateLocalizer;
}

export function WeekViewHeader({ date, localizer }: WeekViewHeaderProps) {
  const day = localizer.format(date, 'd');
  const weekday = localizer.format(date, 'EEE');

  const today = isToday(date);

  return (
    <div className='flex flex-col gap-1 items-center'>
      {/* 요일 */}
      <span className='text-xs text-slate-500'>{weekday}</span>

      {/* 날짜 */}
      <div
        className={cn(
          today &&
            'flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6',
        )}
      >
        <span className={'text-sm font-bold cursor-pointer'}>{day}</span>
      </div>
    </div>
  );
}
