import { HeaderProps } from 'react-big-calendar';
import { cn } from '@/shared/lib/utils';

export function MonthViewHeader({ date, label }: HeaderProps) {
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  return (
    <div className='py-2 flex items-center justify-center text-xs text-slate-900 dark:text-slate-300 bg-background'>
      <span
        className={cn(
          'text-sm font-black tracking-wider',
          isSunday && 'text-red-500',
          isSaturday && 'text-blue-500',
        )}
      >
        {label}
      </span>
    </div>
  );
}
