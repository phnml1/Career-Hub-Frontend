import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getReviewDetail } from '@/features/community/api/getReviewDetail';
import PostDetailModal from '@/features/community/components/PostDetail/PostDetailModal';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['review', id],
    queryFn: () => getReviewDetail(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailModal postId={Number(id)} />
    </HydrationBoundary>
  );
}
