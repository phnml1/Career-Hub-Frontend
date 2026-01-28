import { Building2, ChevronRight, BookMarked, PenBoxIcon } from 'lucide-react';
import { QuestionItem } from '../types';
import { QuestionMoreMenu } from './QuestionMoreMenu';
import Link from 'next/link';

export default function LinkedQuestionItem({
  question: item,
}: {
  question: QuestionItem;
}) {
  const { company, interviewType, question, createdAt, memo } = item;

  return (
    <Link href={`/applications/${item.applicationId}`} className='block'>
      <div className='bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-300 dark:hover:border-brand-700 transition-all group relative overflow-hidden flex flex-col justify-between'>
        <div className='relative z-10'>
          <div className='flex justify-between items-start mb-4'>
            <div className='flex flex-wrap items-center gap-2.5'>
              {/* 면접 종류 */}
              <span className='px-3 py-1 bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 rounded-xl text-[11px] font-black flex items-center gap-1.5 border border-brand-100 dark:border-brand-900/50'>
                {interviewType}
              </span>
              {/* 연동된 지원 관리 회사명 */}
              <div className='flex items-center gap-2 text-[11px] font-bold text-slate-400 dark:text-slate-500'>
                <span className='w-1 h-1 rounded-full bg-slate-200' />
                <Building2 className='w-3.5 h-3.5' />
                {company}
              </div>
            </div>

            {/* 더보기 버튼 */}
            <QuestionMoreMenu question={item} />
          </div>

          {/* 질문 내용 */}
          <h3 className='text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-5 group-hover:text-brand-600 transition-colors'>
            {question}
          </h3>

          {memo && (
            <div className='p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl text-sm text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 leading-relaxed'>
              <div className='text-sm font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5'>
                <PenBoxIcon className='w-4 h-4' /> 메모
              </div>
              {memo}
            </div>
          )}
        </div>

        {/* 하단 영역 */}
        <div className='mt-8 pt-5 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center relative z-10'>
          <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums'>
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <div className='text-[11px] font-black text-brand-600 dark:text-brand-400 flex items-center hover:translate-x-1 transition-transform'>
            지원 관리 상세페이지 보러가기{' '}
            <ChevronRight className='w-3.5 h-3.5 ml-0.5' />
          </div>
        </div>

        {/* 배경 장식 아이콘 */}
        <BookMarked className='absolute -right-8 -bottom-8 w-32 h-32 text-slate-50 dark:text-slate-800/30 pointer-events-none transform -rotate-12 group-hover:rotate-0 transition-transform duration-700' />
      </div>
    </Link>
  );
}
