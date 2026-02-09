'use client';

import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';

import { useInView } from '@/shared/hooks/useInView';
import { useGetQuestions } from '../hooks/useGetQuestions';

import QuestionListEmptyState from './QuestionListEmptyState';
import { useSearchParamsBasedRoute } from '@/shared/hooks/useSearchParamsBasedRoute';
import QuestionListItem from './QuestionListItem';

export default function QuestionList() {
  const { getSearchParam, updateRoute } = useSearchParamsBasedRoute();

  const query = getSearchParam('query');
  const currentTab = getSearchParam('type', 'linked');
  const linkStatus = currentTab.toUpperCase() as 'LINKED' | 'UNLINKED';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetQuestions({ linkStatus, query });
  const questions = data.pages.flatMap((page) => page.contents) || [];
  const isEmpty = questions.length === 0;

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isEmpty) {
    return (
      <QuestionListEmptyState
        query={query}
        onReset={() => updateRoute({ query: null })}
      />
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8'>
      {questions.map((question) => (
        <QuestionListItem
          key={question.questionArchiveId}
          question={question}
        />
      ))}

      {hasNextPage && (
        <div ref={ref} className='h-10 flex justify-center items-center'>
          {isFetchingNextPage && (
            <Loader2Icon className='w-6 h-6 animate-spin text-slate-400' />
          )}
        </div>
      )}
    </div>
  );
}
