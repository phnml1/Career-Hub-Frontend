import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';
import { getReviewDetail } from '@/features/community/api/getReviewDetail';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import PostDetailModal from '@/features/community/components/PostDetail/PostDetailModal';

export default async function CommunityDetailModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;
  const queryClient = getQueryClient();

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  await queryClient.prefetchQuery({
    queryKey: ['review', postId],
    queryFn: () => getReviewDetail(Number(postId)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailModal postId={Number(postId)} />
    </HydrationBoundary>
  );
}
