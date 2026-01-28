'use client';

import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Clock, Send, ChevronRight } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

interface BeforeDeadlineApplicationItemProps {
  application: {
    applicationId: number;
    company: string;
    position: string;
    submissionStatus: '미제출' | '제출 완료' | '마감 임박';
    deadline: string;
    applicationMethod: string;
    dDay: number;
  };
}

export default function BeforeDeadlineApplicationItem({
  application,
}: BeforeDeadlineApplicationItemProps) {
  const {
    applicationId,
    company,
    position,
    deadline,
    applicationMethod,
    submissionStatus,
    dDay,
  } = application;

  const formattedDeadline = format(
    parseISO(deadline),
    'yyyy년 MM월 dd일 a hh시 mm분',
    {
      locale: ko,
    },
  );

  // 마감 임박 여부 판단 (D-1 등 강조가 필요한 경우)
  const isUrgent = submissionStatus === '마감 임박' || dDay <= 1;
  const isExpired = dDay < 0; // 마감 지남 처리

  return (
    <Link href={`/applications/${applicationId}`} className='block'>
      <div className='relative rounded-2xl p-6 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[220px]'>
        <div className='flex flex-col h-full'>
          {/* 헤더: 회사명, 직무, 상태 태그 */}
          <div className='flex justify-between items-start mb-5'>
            <div className='pr-2 min-w-0'>
              <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 truncate'>
                {company}
              </h3>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium truncate'>
                {position}
              </p>
            </div>
            <div className='flex-shrink-0 flex items-center gap-1.5'>
              {/* 제출 상태 태그 */}
              {submissionStatus === '마감 임박' && (
                <span className='text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 animate-pulse dark:bg-red-900/20 dark:border-red-900/50'>
                  마감 임박
                </span>
              )}
              {submissionStatus === '미제출' && (
                <span className='text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700'>
                  미제출
                </span>
              )}
              {submissionStatus === '제출 완료' && (
                <span className='text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50'>
                  제출 완료
                </span>
              )}
              {/* 전형 상태 태그 */}
              <span className='px-2.5 py-1 rounded-lg text-[11px] font-bold border bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'>
                서류 전형
              </span>
            </div>
          </div>

          {/* 바디: 마감일 및 지원 방식 */}
          <div className='flex-1'>
            <div className='flex flex-col gap-2.5 mt-2.5'>
              <div className='flex items-center text-[11px]'>
                <div className='w-5 flex-shrink-0 flex justify-center mr-2'>
                  <Clock className='w-3.5 h-3.5 text-slate-400' />
                </div>
                <div className='flex items-center font-medium min-w-0'>
                  <span className='text-slate-500 dark:text-slate-400 mr-1.5 flex-shrink-0'>
                    마감:
                  </span>
                  <span className='text-slate-700 dark:text-slate-200 opacity-80 truncate'>
                    {formattedDeadline}
                  </span>
                  <span
                    className={cn(
                      'ml-2 flex-shrink-0 font-bold',
                      isUrgent
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-slate-700 dark:text-slate-200',
                    )}
                  >
                    {isExpired ? '마감' : dDay === 0 ? 'D-Day' : `D-${dDay}`}
                  </span>
                </div>
              </div>
              <div className='flex items-center text-[11px]'>
                <div className='w-5 flex-shrink-0 flex justify-center mr-2'>
                  <Send className='w-3.5 h-3.5 text-slate-400' />
                </div>
                <div className='flex items-center font-medium text-slate-700 dark:text-slate-200'>
                  <span className='text-slate-500 dark:text-slate-400 mr-1.5'>
                    방식:
                  </span>
                  {applicationMethod}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터: 상세 보기 버튼 */}
        <div className='mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end'>
          <span className='text-xs font-bold text-slate-400 group-hover:text-brand-500 transition-colors flex items-center'>
            상세 보기 <ChevronRight className='w-3 h-3 ml-0.5' />
          </span>
        </div>
      </div>
    </Link>
  );
}
