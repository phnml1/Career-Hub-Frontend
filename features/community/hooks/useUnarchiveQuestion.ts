import { useMutation } from '@tanstack/react-query';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';
import { deleteQuestion } from '@/features/my-questions/api/deleteQuestion'; // 실제 삭제 API 함수

export const useUnarchiveQuestion = (postId?: number) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (questionId: number) => deleteQuestion(questionId),

    onSuccess: () => {
      // 커뮤니티 상세 데이터 갱신 (보관 여부 isSaved: false 반영)
      if (postId) {
        queryClient.invalidateQueries({ queryKey: ['reviews', postId] });
      }

      // 나의 질문 리스트 갱신
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
};
