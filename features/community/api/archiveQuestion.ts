import { clientApi } from '@/shared/lib/api/clientApi';

export interface ArchiveQuestionPayload {
  interviewQuestionId: number;
  /**
   * null: 지원 관리 연동 X
   */
  applicationId: number | null;
  question: string;
  interviewType: string;
  memo?: string;
}

/**
 * [POST] 커뮤니티 질문을 나의 질문으로 보관
 */
export const archiveCommunityQuestion = async (
  payload: ArchiveQuestionPayload,
): Promise<void> => {
  return clientApi.post<void>('/v1/archive/questions', payload);
};
