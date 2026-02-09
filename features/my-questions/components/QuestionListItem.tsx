'use client';

import Link from 'next/link';
import { ChevronRight, PenBoxIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import QuestionMoreMenu from './QuestionMoreMenu';
import CompanyBadge from '@/shared/components/CompanyBadge';
import RelativeTime from '@/shared/components/RelativeTime';
import InterviewBadge from '@/shared/components/InterviewBadge';
import { GetQuestionListItemResponse } from '../api/getQuestions';

interface QuestionListItemProps {
  question: GetQuestionListItemResponse;
}

export default function QuestionListItem({ question }: QuestionListItemProps) {
  const {
    applicationId,
    company,
    interviewType,
    question: questionContent,
    createdAt,
    memo,
  } = question;

  // 연동 여부 판별
  const isLinked = !!applicationId;

  // 카드 공통 스타일
  const cardContent = (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden flex flex-col justify-between h-full',
        isLinked
          ? 'hover:border-brand-300 dark:hover:border-brand-700'
          : 'hover:border-slate-300 dark:hover:border-slate-700',
      )}
    >
      <div className='relative z-10'>
        <div className='flex justify-between items-start mb-4'>
          <div className='flex gap-x-2 items-center'>
            {isLinked && company && <CompanyBadge name={company} />}
            <InterviewBadge label={interviewType} />
          </div>

          <QuestionMoreMenu question={question} />
        </div>

        {/* 질문 내용 */}
        <div className='text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-5'>
          {questionContent}
        </div>

        {/* 메모 영역 */}
        {memo && (
          <div className='p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl text-sm text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 leading-relaxed'>
            <div className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5'>
              <PenBoxIcon className='w-3.5 h-3.5' /> 나의 답변 포인트
            </div>
            {memo}
          </div>
        )}
      </div>

      {/* 하단 영역 */}
      <div className='mt-8 pt-5 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center relative z-10'>
        <div className='flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums'>
          <RelativeTime date={createdAt} />
        </div>

        {isLinked && (
          <div className='text-[11px] font-black text-brand-600 dark:text-brand-400 flex items-center group-hover:translate-x-1 transition-transform'>
            지원 관리 상세보기 <ChevronRight className='w-3.5 h-3.5 ml-0.5' />
          </div>
        )}
      </div>
    </div>
  );

  // 연동형이면 Link로 감싸고, 아니면 그냥 div 반환
  if (isLinked) {
    return (
      <Link href={`/applications/${applicationId}`} className='block h-full'>
        {cardContent}
      </Link>
    );
  }

  return <div className='h-full'>{cardContent}</div>;
}
