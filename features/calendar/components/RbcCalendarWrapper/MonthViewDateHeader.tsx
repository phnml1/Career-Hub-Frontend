import { DateHeaderProps } from 'react-big-calendar';
import { cn } from '@/shared/lib/utils';

export function MonthViewDateHeader({ label, date }: DateHeaderProps) {
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div className='flex items-center justify-between w-full px-0.5 md:px-2 py-1 group'>
      <div
        className={cn(
          'text-slate-500 dark:text-slate-300 flex items-center justify-center w-6 h-6 font-black text-xs transition-colors rounded-full cursor-pointer',
          // 오늘 날짜 강조
          isToday && 'bg-primary text-primary-foreground shadow-primary',
        )}
      >
        {label}
      </div>
    </div>
  );
}
