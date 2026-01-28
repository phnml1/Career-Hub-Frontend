'use client';

import { SearchX, RefreshCcw } from 'lucide-react';

interface PostListEmptyStateProps {
  query?: string;
  onReset?: () => void;
}

export default function PostListEmptyState({
  query,
  onReset,
}: PostListEmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-24 px-6 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 shadow-sm'>
      {/* 검색 결과 없음 아이콘 */}
      <div className='flex items-center justify-center size-16 rounded-full bg-slate-50 dark:bg-slate-800/50 mb-6'>
        <SearchX className='size-8 text-slate-300 dark:text-slate-600' />
      </div>

      {/* 안내 문구 */}
      <div className='text-center space-y-2 mb-8'>
        <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100'>
          {query
            ? `'${query}'에 대한 결과가 없습니다.`
            : '등록된 게시글이 없습니다.'}
        </h3>
        <p className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>
          단어의 철자가 정확한지 확인하시거나, <br />
          다른 검색어로 다시 시도해 보세요.
        </p>
      </div>

      {/* 필터 초기화 또는 액션 버튼 (선택 사항) */}
      {onReset && (
        <button
          onClick={onReset}
          className='flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors'
        >
          <RefreshCcw className='size-4' />
          검색창 초기화하기
        </button>
      )}
    </div>
  );
}
