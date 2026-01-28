import { cn } from '@/shared/lib/utils';
import { RbcEvent } from '@/features/calendar/types/rbcEvent';
import { getEventMeta } from '../../utils/getEventMeta';
import { format } from 'date-fns';
import { Clock4Icon } from 'lucide-react';

export default function WeekViewEvent({ event }: { event: RbcEvent }) {
  const { styles } = getEventMeta(event);

  return (
    <div className={cn('h-full px-1 py-2 rounded border', styles)}>
      {/* 여기서 rbc-event-label 대신 직접 시간 표시 */}
      <div className='flex items-center gax-x-1 mb-1'>
        <Clock4Icon className='w-3 h-3' />
        <span className='text-xs font-medium px-1'>
          {format(event.start, 'HH:mm')} ~ {format(event.end, 'HH:mm')}
        </span>
        {/* 전형 상태 배지 등을 여기에 넣을 수 있습니다 */}
      </div>

      <span className='text-xs font-bold truncate'>{event.title}</span>
    </div>
  );
}
