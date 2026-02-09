import { clientApi } from '@/shared/lib/api/clientApi';

export interface GetQuestionListItemResponse {
  questionArchiveId: number;
  interviewQuestionId: number;
  applicationId: number | null;
  company: string;
  interviewType: string;
  question: string;
  memo: string;
  createdAt: string;
}

export interface GetQuestionListResponse {
  contents: GetQuestionListItemResponse[];
  hasNext: boolean;
  nextCursorId: number | null;
}

interface GetQuestionsParams {
  linkStatus?: 'LINKED' | 'UNLINKED';
  lastCursorId?: number;
  size?: number;
  query?: string;
}

/**
 * [GET] 개인 면접 질문 목록 조회 (커서 기반 페이지네이션)
 * @param linkStatus 링크 상태 필터 ('LINKED' | 'UNLINKED')
 * @param lastCursorId 마지막으로 조회한 질문 ID (커서)
 * @param size 한 번에 조회할 데이터 개수 (기본값 20)
 * @param query 검색 키워드 (optional)
 */
export const getQuestions = async ({
  linkStatus = 'LINKED',
  lastCursorId,
  size = 20,
  query,
}: GetQuestionsParams): Promise<GetQuestionListResponse> => {
  const params = new URLSearchParams({
    linkStatus,
    size: String(size),
    ...(lastCursorId && { lastCursorId: String(lastCursorId) }),
    ...(query && { query }),
  });

  return clientApi.get<GetQuestionListResponse>(
    `/v1/archive/questions?${params.toString()}`,
  );
};
