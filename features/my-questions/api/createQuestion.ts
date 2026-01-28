import { clientApi } from '@/shared/lib/api/clientApi';

export interface CreateQuestionPayload {
  /**
   * 지원 관리 연동 시 필수
   */
  applicationId?: number | null;
  interviewQuestionId?: number | null; // 커뮤니티 질문 저장 시 필수
  interviewType?: string; // 면접 종류 (선택)
  question: string; // 질문 내용 (직접 작성 시 필수)
  memo?: string; // 나의 답변 메모 (선택)
}

/**
 * [POST] 개인 면접 질문 추가
 * @param payload - 등록할 질문 데이터 (직접 작성 또는 커뮤니티 저장)
 */
export const createQuestion = async (
  payload: CreateQuestionPayload,
): Promise<void> => {
  return clientApi.post<void>('/v1/archive/questions', payload);
};
