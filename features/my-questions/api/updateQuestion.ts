import { clientApi } from '@/shared/lib/api/clientApi';

export interface UpdateQuestionPayload {
  applicationId?: number | null; // 지원서 연동 변경 (null일 경우 연동 해제)
  interviewType?: string; // 면접 유형 수정
  question?: string; // 질문 내용 수정
  memo?: string; // 답변 메모 수정
}

/**
 * [PATCH] 개인 면접 질문 정보 수정
 * @param questionArchiveId - 수정할 아카이브 질문 ID
 * @param payload - 수정할 정보 데이터
 */
export const updateQuestion = async (
  questionArchiveId: number,
  payload: UpdateQuestionPayload,
) => {
  // 204 No Content 응답
  return clientApi.patch(`/v1/archive/questions/${questionArchiveId}`, payload);
};
