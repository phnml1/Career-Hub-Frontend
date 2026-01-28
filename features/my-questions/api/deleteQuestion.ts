import { clientApi } from '@/shared/lib/api/clientApi';

/**
 * [DELETE] 개인 면접 질문 삭제
 * @param questionArchiveId - 삭제할 아카이브 질문의 고유 ID
 */
export const deleteQuestion = async (questionArchiveId: number) => {
  // 204 No Content 응답이므로 반환값 없이 처리
  return clientApi.delete(`/v1/archive/questions/${questionArchiveId}`);
};
