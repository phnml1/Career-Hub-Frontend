'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { ChevronRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ApplicationCard as ApplicationCardType } from '../../hooks/useGetApplications';
import {
  getScheduleResultLabel,
  getScheduleResultStyle,
  getStageTypeStyle,
} from '../../libs';
import StageInfoSection from './StageInfoSection';
import DeadlineSection from './DeadlineSection';

interface ApplicationCardProps {
  data: ApplicationCardType;
}

const ApplicationCard = ({ data }: ApplicationCardProps) => {
  const router = useRouter();
  const dDay = (() => {
    if (!data.docsStage?.deadline) return null;

    const today = new Date();
    const deadline = new Date(data.docsStage.deadline);

    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return '마감 종료';

    return diffDays;
  })();

  const displayScheduleResult = (() => {
    if (
      data.currentScheduleResult === 'WAITING' &&
      data.currentStageType === '서류 전형' &&
      dDay !== null &&
      dDay !== '마감 종료' &&
      dDay >= 0 &&
      dDay <= 7
    ) {
      return '마감 임박';
    }

    return data.currentScheduleResult;
  })();

  return (
    <Card
      className='relative rounded-2xl p-6 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[220px]'
      onClick={() => {
        router.push(`/applications/${data.applicationId}`);
      }}
    >
      <CardHeader className='flex justify-between items-start gap-0 px-0 mb-4'>
        <div className='flex-1 min-w-0'>
          <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1'>
            {data.company}
          </h3>
          <p className='text-slate-500 dark:text-slate-400 text-xs font-medium truncate'>
            {data.position}
          </p>
        </div>

        <div className='flex items-center gap-1.5 shrink-0 ml-4'>
          <Badge
            variant='outline'
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getScheduleResultStyle(displayScheduleResult)}`}
          >
            {getScheduleResultLabel(displayScheduleResult)}
          </Badge>
          <Badge
            variant='outline'
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getStageTypeStyle(data.currentStageType)}`}
          >
            {data.currentStageType}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='flex-1 flex flex-col px-0'>
        <div className='flex flex-col gap-2'>
          <StageInfoSection data={data} />
          <DeadlineSection data={data} dDay={dDay} />
          {data.scheduleStage?.location && (
            <div className='flex items-center text-xs font-bold text-slate-800 dark:text-slate-200'>
              <div className='w-5 flex-shrink-0 flex justify-center mr-2'>
                <MapPin className='w-3.5 h-3.5 text-slate-400' />
              </div>
              <span className='text-slate-700 dark:text-slate-200 truncate'>
                {data.scheduleStage.location}
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className='mt-4 pt-3 px-0 border-t border-slate-100 dark:border-slate-800 flex justify-end'>
        <span className='text-xs font-bold text-slate-400 group-hover:text-brand-500 transition-colors flex items-center'>
          상세 보기
          <ChevronRight className='w-3 h-3 ml-0.5' />
        </span>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
