'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { useSearchParamsBasedRoute } from '@/shared/hooks/useSearchParamsBasedRoute';
import { SortOrder } from '@/features/community/types';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import PostList from './PostList';
import PostListSkeleton from './PostListSkeleton';
import PostListError from './PostListError';

export default function SearchablePostList() {
  const { getSearchParam, updateRoute } = useSearchParamsBasedRoute();

  const query = getSearchParam('query');
  const sort = getSearchParam('sort', 'NEWEST') as SortOrder;

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row gap-4'>
        <SearchBar
          value={query}
          onChange={(value) => updateRoute({ query: value })}
        />
        <SortDropdown
          value={sort}
          onChange={(value) =>
            updateRoute({
              sort: value,
            })
          }
        />
      </div>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset} // ErrorBoundary가 reset될 때 React Query의 에러도 리셋
            fallbackRender={({ resetErrorBoundary }) => (
              <PostListError reset={resetErrorBoundary} />
            )}
          >
            <Suspense key={`${query}-${sort}`} fallback={<PostListSkeleton />}>
              <PostList query={query} sort={sort} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
