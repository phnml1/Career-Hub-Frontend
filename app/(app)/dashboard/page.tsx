import { Suspense } from 'react';

import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import UpcomingSchedules from '@/features/dashboard/components/UpcomingSchedules';
import UpcomingSchedulesSkeleton from '@/features/dashboard/components/UpcomingSchedulesSkeleton';
import ApplicationSummaryCards from '@/features/dashboard/components/ApplicationSummaryCards';
import ApplicationSummaryCardsSkeleton from '@/features/dashboard/components/ApplicationSummaryCardsSkeleton';
import StatusPieChart from '@/features/dashboard/components/StatusPieChart';
import StatusPieChartSkeleton from '@/features/dashboard/components/StatusPieChartSkeleton';
import ActivityChart from '@/features/dashboard/components/ActivityChart';
import ActivityChartSkeleton from '@/features/dashboard/components/ActivityChartSkeleton';
import BeforeDeadlineApplications from '@/features/dashboard/components/BeforeDeadlineApplications';
import BeforeDeadlineApplicationsSkeleton from '@/features/dashboard/components/BeforeDeadlineApplicationsSkeleton';

export default function DashboardPage() {
  return (
    <div className='p-4 flex flex-col gap-y-4'>
      <DashboardHeader />
      <Suspense fallback={<ApplicationSummaryCardsSkeleton />}>
        <ApplicationSummaryCards />
      </Suspense>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-4'>
        <div className='lg:col-span-2 space-y-8'>
          <Suspense fallback={<BeforeDeadlineApplicationsSkeleton />}>
            <BeforeDeadlineApplications />
          </Suspense>

          <Suspense fallback={<ActivityChartSkeleton />}>
            <ActivityChart />
          </Suspense>
        </div>

        <div className='space-y-8'>
          <Suspense fallback={<UpcomingSchedulesSkeleton />}>
            <UpcomingSchedules />
          </Suspense>
          <Suspense fallback={<StatusPieChartSkeleton />}>
            <StatusPieChart />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
