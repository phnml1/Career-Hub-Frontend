import { ToolbarProps } from 'react-big-calendar';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/shared/components/ui/button';
import { useDateScheduleCreateStore } from '../../stores/useDateScheduleCreateStore';
import { useFilterPanelStore } from '../../stores/useFilterPanelStore';
import { ButtonGroup } from '@/shared/components/ui/button-group';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarPlusIcon,
  PanelRightIcon,
} from 'lucide-react';
import { RbcEvent } from '@/features/calendar/types/rbcEvent';
import { cn } from '@/shared/lib/utils';

export function Toolbar({
  date,
  onNavigate,
  onView,
  view,
}: ToolbarProps<RbcEvent>) {
  const open = useDateScheduleCreateStore((state) => state.open);
  const { isOpen, open: toggleFilterPanel } = useFilterPanelStore();
  const title = getTitleNode(view, date);

  return (
    <div className='flex flex-col gap-y-2 p-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-slate-900 min-h-17 md:h-17 border-b border-border'>
      <div className='flex justify-between items-center gap-x-4'>
        <ButtonGroup className='items-center'>
          <Button variant='outline' onClick={() => onNavigate('PREV')}>
            <ArrowLeftIcon />
          </Button>
          <Button
            variant='outline'
            onClick={() => onNavigate('TODAY')}
            className='font-extrabold'
          >
            오늘
          </Button>
          <Button variant='outline' onClick={() => onNavigate('NEXT')}>
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>

        <div>{title}</div>
      </div>

      <div className='flex gap-x-2'>
        <ButtonGroup>
          <Button
            variant='outline'
            onClick={() => onView('month')}
            className={cn(
              'font-extrabold',
              view === 'month' ? 'bg-accent' : '',
            )}
          >
            월
          </Button>

          <Button
            variant='outline'
            onClick={() => onView('week')}
            className={cn('font-extrabold', view === 'week' ? 'bg-accent' : '')}
          >
            주
          </Button>

          <Button
            variant='outline'
            onClick={() => onView('day')}
            className={cn('font-extrabold', view === 'day' ? 'bg-accent' : '')}
          >
            일
          </Button>
        </ButtonGroup>

        <Button onClick={() => open(null)} className='font-extrabold'>
          <CalendarPlusIcon /> 일정 추가
        </Button>
        {isOpen ? null : (
          <Button variant='outline' onClick={() => toggleFilterPanel()}>
            <PanelRightIcon className='w-6 h-6' />
          </Button>
        )}
      </div>
    </div>
  );
}

function getTitleNode(view: string, date: Date) {
  if (view === 'month') {
    return (
      <span className='text-lg font-bold'>
        {format(date, 'yyyy년 M월', { locale: ko })}
      </span>
    );
  }

  if (view === 'week') {
    const start = startOfWeek(date, { locale: ko });
    const end = endOfWeek(date, { locale: ko });

    return (
      <div className='flex items-center gap-2'>
        <span className='text-lg font-bold text-secondary-foreground'>
          {format(date, 'yyyy년', { locale: ko })}
        </span>

        <span className='text-lg text-muted-foreground font-semibold'>
          {format(start, 'M월 d일', { locale: ko })}
        </span>

        <span className='text-muted-foreground text-lg font-semibold'>~</span>

        <span className='text-lg text-muted-foreground font-semibold'>
          {format(end, 'M월 d일', { locale: ko })}
        </span>
      </div>
    );
  }

  if (view === 'day') {
    return (
      <div className='flex items-center gap-2'>
        <span className='text-lg font-semibold text-secondary-foreground'>
          {format(date, 'yyyy년', { locale: ko })}
        </span>

        <span className='text-lg font-semibold text-muted-foreground'>
          {format(date, 'M월 d일', { locale: ko })}
        </span>
      </div>
    );
  }

  return null;
}
