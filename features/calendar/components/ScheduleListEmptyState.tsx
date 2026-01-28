import { CalendarDaysIcon } from 'lucide-react';

export default function ScheduleListEmptyState() {
  return (
    <div className='border-2 border-dashed border-border p-16 text-center rounded-3xl bg-slate-50'>
      <div className='flex flex-col justify-center items-center'>
        <CalendarDaysIcon className='w-8 h-8 flex items-center justify-center text-slate-500' />
        <p className='text-base font-semibold text-slate-500 mt-4'>
          등록된 일정이 없습니다.
        </p>
      </div>
    </div>
  );
}
