import { clientApi } from '@/shared/lib/api/clientApi';

export interface GetReviewsRequestParams {
  query?: string;
  sort?: 'NEWEST' | 'OLDEST';
  lastReviewId?: number | null;
  size?: number;
}

export interface GetReviewListItemResponse {
  reviewId: number;
  company: string;
  position: string;
  interviewType: string;
  shortContent: string;
  createdAt: string;
  author: string;
  isAuthor: boolean;
}

export interface GetReviewListResponse {
  contents: GetReviewListItemResponse[];
  hasNext: boolean;
  nextCursorId: number | null;
}

export const getReviews = async ({
  query,
  sort = 'NEWEST',
  lastReviewId,
  size = 20,
}: GetReviewsRequestParams): Promise<GetReviewListResponse> => {
  const searchParams = new URLSearchParams({
    sort,
    size: size.toString(),
    ...(query && { query }),
    ...(lastReviewId && { lastReviewId: lastReviewId.toString() }),
  });

  return clientApi.get<GetReviewListResponse>(
    `/v1/reviews?${searchParams.toString()}`,
  );
};
