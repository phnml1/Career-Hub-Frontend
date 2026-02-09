import { useMutation } from '@tanstack/react-query';
import { deleteQuestion } from '../api/deleteQuestion';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';

export const useDeleteQuestion = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (questionArchiveId: number) =>
      deleteQuestion(questionArchiveId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questions'],
      });

      alert('질문이 삭제되었습니다.');
    },

    onError: (error) => {
      console.error('Delete Error:', error);
      alert('질문 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
