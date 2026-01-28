import { cn } from '@/shared/lib/utils';
import { RbcEvent } from '@/features/calendar/types/rbcEvent';
import { getEventMeta } from '@/features/calendar/utils/getEventMeta';

export default function MonthViewEvent({ event }: { event: RbcEvent }) {
  const { styles } = getEventMeta(event);

  return (
    <>
      <div className={cn('h-full p-1 rounded border', styles)}>
        <div className='flex items-center gap-1'>
          <span className='text-no-wrap text-xs font-bold'>{event.title}</span>
        </div>
      </div>
    </>
  );
}
