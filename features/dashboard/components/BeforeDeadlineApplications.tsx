'use client';

import { BriefcaseIcon } from 'lucide-react';

import { useGetBeforeDeadlineApplications } from '../hooks/useGetBeforeDeadlineApplications';
import ClosingApplicationItem from './BeforeDeadlineApplicationItem';

export default function BeforeDeadlineApplications() {
  const { data } = useGetBeforeDeadlineApplications();
  const applications = data.contents ?? [];
  const isEmpty = applications.length === 0;

  return (
    <div className='space-y-4 bg-card text-card-foreground p-8 rounded-3xl border border-border'>
      <div className='flex items-center justify-between'>
        <div className='text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-x-2'>
          <BriefcaseIcon className='stroke-2 w-5 h-5 text-brand-500' />
          <span>곧 마감되는 서류 전형</span>
        </div>
        {/* <Button
          variant='link'
          size='lg'
          className='text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center transition-colors'
        >
          더보기 <ChevronRightIcon className='w-4 h-4 stroke-2' />
        </Button> */}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {applications.map((application) => (
          <ClosingApplicationItem
            key={application.applicationId}
            application={application}
          />
        ))}

        {isEmpty && (
          <div className='col-span-full py-12 flex flex-col items-center justify-center text-slate-400'>
            <p className='text-sm font-medium'>
              진행 중인 서류 전형이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
