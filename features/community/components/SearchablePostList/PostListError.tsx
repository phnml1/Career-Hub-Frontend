'use client';

import { AlertCircle, RotateCcw } from 'lucide-react';

interface PostListErrorProps {
  reset: () => void;
}

export default function PostListError({ reset }: PostListErrorProps) {
  return (
    <div className='flex flex-col items-center justify-center py-20 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800'>
      <div className='flex items-center justify-center size-12 rounded-full bg-red-50 dark:bg-red-900/20 mb-4'>
        <AlertCircle className='size-6 text-red-500 dark:text-red-400' />
      </div>

      <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-2'>
        데이터를 불러오지 못했습니다
      </h3>

      <p className='text-sm text-slate-500 dark:text-slate-400 text-center max-w-[280px] mb-6 leading-relaxed'>
        일시적인 네트워크 오류일 수 있습니다. <br />
        잠시 후 다시 시도해 주세요.
      </p>

      <button
        onClick={() => reset()}
        className='flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-95 stop-propagation'
      >
        <RotateCcw className='size-4' />
        다시 시도하기
      </button>
    </div>
  );
}
