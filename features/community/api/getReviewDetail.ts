import { clientApi } from '@/shared/lib/api/clientApi';

export interface GetReviewQuestionResponse {
  questionId: number;
  question: string;
  isSaved: boolean;
}

export interface GetReviewDetailResponse {
  reviewId: number;
  company: string;
  position: string;
  interviewType: string;
  content: string;
  createdAt: string;
  author: string;
  isAuthor: boolean;
  interviewQuestions: GetReviewQuestionResponse[];
}

/**
 * 특정 면접 후기의 상세 정보를 가져오는 API
 * @param reviewId - 조회할 리뷰의 고유 ID
 */
export const getReviewDetail = async (
  reviewId: number,
): Promise<GetReviewDetailResponse> => {
  return clientApi.get<GetReviewDetailResponse>(
    `/v1/reviews/${reviewId.toString()}`,
  );
};
