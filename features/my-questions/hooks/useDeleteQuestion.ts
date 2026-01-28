import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion } from '../api/deleteQuestion';

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. 삭제 API 호출
    mutationFn: (questionArchiveId: number) =>
      deleteQuestion(questionArchiveId),

    // 2. 삭제 성공 시 처리
    onSuccess: () => {
      // 'questions'로 시작하는 모든 쿼리 키를 무효화하여 리스트를 새로고침합니다.
      // (연동/미연동 탭 모두에 영향을 줄 수 있으므로 범용 키 사용)
      queryClient.invalidateQueries({
        queryKey: ['questions'],
      });

      alert('질문이 삭제되었습니다.');
    },

    // 3. 에러 발생 시 처리
    onError: (error) => {
      console.error('Delete Error:', error);
      alert('질문 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
