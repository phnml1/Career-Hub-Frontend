import { MessageSquareQuote, Calendar, PenBoxIcon } from 'lucide-react';
import { QuestionItem } from '../types';
import { QuestionMoreMenu } from './QuestionMoreMenu';

interface UnlinkedQuestionItemProps {
  question: QuestionItem;
}

export default function UnlinkedQuestionItem({
  question: item,
}: UnlinkedQuestionItemProps) {
  const { question: content, createdAt, memo, interviewType } = item;

  return (
    <div className='bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all group relative overflow-hidden flex flex-col justify-between'>
      <div className='relative z-10'>
        <div className='flex justify-between items-start mb-6'>
          <div className='flex flex-wrap items-center gap-2.5'>
            <span className='px-3 py-1 bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 rounded-xl text-[11px] font-black flex items-center gap-1.5 border border-brand-100 dark:border-brand-900/50'>
              {interviewType}
            </span>
          </div>

          {/* 더보기 버튼 */}
          <QuestionMoreMenu question={item} />
        </div>

        <h3 className='mb-4 text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-2 pr-8 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors'>
          {content}
        </h3>

        {memo && (
          <div className='p-5 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl text-sm text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 leading-relaxed italic'>
            <div className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5'>
              <PenBoxIcon className='w-3 h-3' /> 메모
            </div>
            {memo}
          </div>
        )}
      </div>

      {/* 하단 영역: 상세보기 버튼 없이 날짜만 깔끔하게 배치 */}
      <div className='mt-10 pt-5 border-t border-slate-50 dark:border-slate-800 flex justify-start items-center relative z-10'>
        <div className='flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums'>
          <Calendar className='w-3 h-3' />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* 배경 장식 아이콘: 연동형과 다른 아이콘(MessageSquareQuote)을 사용하여 차별화 */}
      <MessageSquareQuote className='absolute -right-6 -bottom-6 w-32 h-32 text-slate-50 dark:text-slate-800/30 pointer-events-none transform rotate-12 group-hover:rotate-0 transition-transform duration-700' />
    </div>
  );
}
