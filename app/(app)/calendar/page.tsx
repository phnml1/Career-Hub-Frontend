import { Suspense } from 'react';

import CalendarContainer from '@/features/calendar/components/CalendarContainer';
import CalendarFilterPanelWrapper from '@/features/calendar/components/FilterPanel/CalendarFilterPanelWrapper';
import CalendarLoader from '@/features/calendar/components/CalendarLoader';
import DateScheduleCreateModal from '@/features/calendar/components/ScheduleCreateModal';
import DateScheduleListModal from '@/features/calendar/components/DateScheduleListModal';

export default function CalendarPage() {
  return (
    <>
      {/* 1. h-screen: 전체 높이를 화면에 고정 */}
      {/* 2. w-full & overflow-hidden: 브라우저 너비를 넘지 못하게 가두기 */}
      <div className='flex h-screen md:w-[calc(100vw-16rem)] overflow-hidden'>
        {/* 3. min-w-0: flex 자식이 자신의 최소 너비를 무시하고 압축되도록 허용 */}
        <div className='flex-1 h-full min-w-0'>
          <Suspense fallback={<CalendarLoader />}>
            <CalendarContainer />
          </Suspense>
        </div>

        <CalendarFilterPanelWrapper />
      </div>

      <DateScheduleListModal />
      <DateScheduleCreateModal />
    </>
  );
}
