'use client';

import { Button } from '@/shared/components/ui/button';
import { BookMarkedIcon, RefreshCcwIcon, SearchX } from 'lucide-react';

interface QuestionListEmptyStateProps {
  query?: string;
  onReset?: () => void;
}

export default function QuestionListEmptyState({
  query,
  onReset,
}: QuestionListEmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-20 px-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 transition-all'>
      {/* 검색 중일 때는 SearchX, 검색어가 없을 때는 BookMarked 아이콘 */}
      <div className='flex items-center justify-center size-16 rounded-full bg-white dark:bg-slate-800 shadow-sm mb-6'>
        {query ? (
          <SearchX className='size-8 text-slate-400' />
        ) : (
          <BookMarkedIcon className='size-8 text-slate-300 dark:text-slate-600' />
        )}
      </div>

      <div className='text-center mb-8'>
        <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-2'>
          {query
            ? `'${query}' 검색 결과가 없습니다.`
            : '저장된 면접 질문이 없습니다.'}
        </h3>
        <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>
          {query
            ? '검색어를 정확하게 입력하셨는지 확인하세요.'
            : '나만의 면접 질문을 아카이브에 담아 관리해 보세요.'}
        </p>
      </div>

      {/* 검색창 초기화 버튼: query가 있을 때만 노출 */}
      {query && onReset && (
        <Button
          onClick={onReset}
          variant='secondary'
          className='flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95'
        >
          <RefreshCcwIcon className='size-4 text-brand-500' />
          검색창 초기화하기
        </Button>
      )}
    </div>
  );
}
