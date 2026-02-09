import { useMutation } from '@tanstack/react-query';
import { createQuestion, CreateQuestionPayload } from '../api/createQuestion';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';

export const useCreateQuestion = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (payload: CreateQuestionPayload) => createQuestion(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questions'],
      });

      alert('질문이 아카이브에 추가되었습니다.');
    },

    onError: (error) => {
      console.error('Create Question Error:', error);
      alert('질문 추가에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
