'use client';

import { useEffect } from 'react';

import { useInView } from '@/shared/hooks/useInView';
import { useGetReviews } from '@/features/community/hooks/useGetReviews';
import PostListItem from './PostListItem';
import { SortOrder } from '../../types';
import PostListEmptyState from './PostListEmptyState';
import { useSearchParamsBasedRoute } from '@/shared/hooks/useSearchParamsBasedRoute';

interface Props {
  query: string;
  sort: SortOrder;
}

export default function PostList({ query, sort }: Props) {
  const { updateRoute } = useSearchParamsBasedRoute();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetReviews({ query, sort });
  const posts = data.pages.flatMap((page) => page.posts);
  const isEmpty = posts.length === 0;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isEmpty) {
    return (
      <PostListEmptyState
        query={query}
        onReset={() =>
          updateRoute({
            query: null,
          })
        }
      />
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6'>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}

      {hasNextPage && <div ref={ref} className='h-10' />}
    </div>
  );
}
