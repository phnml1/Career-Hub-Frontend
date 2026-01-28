'use client';

import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';

import { useInView } from '@/shared/hooks/useInView';
import { useGetQuestions } from '../hooks/useGetQuestions';

import LinkedQuestionItem from './LinkedQuestionItem';
import UnlinkedQuestionItem from './UnlinkedQuestionItem';
import QuestionListEmptyState from './QuestionListEmptyState';
import { useSearchParamsBasedRoute } from '@/shared/hooks/useSearchParamsBasedRoute';

export default function QuestionList() {
  const { getSearchParam, updateRoute } = useSearchParamsBasedRoute();

  const query = getSearchParam('query');
  const currentTab = getSearchParam('type', 'linked');
  const linkStatus = currentTab.toUpperCase() as 'LINKED' | 'UNLINKED';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetQuestions({ linkStatus, query });

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const questions = data?.pages.flatMap((page) => page.contents) || [];

  if (questions.length === 0) {
    return (
      <QuestionListEmptyState
        query={query}
        onReset={() => updateRoute({ query: null })}
      />
    );
  }

  return (
    <div className='space-y-4'>
      {questions.map((question) =>
        linkStatus === 'LINKED' ? (
          <LinkedQuestionItem
            key={question.questionArchiveId}
            question={question}
          />
        ) : (
          <UnlinkedQuestionItem
            key={question.questionArchiveId}
            question={question}
          />
        ),
      )}

      {/* 무한 스크롤 트리거 요소 */}
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
