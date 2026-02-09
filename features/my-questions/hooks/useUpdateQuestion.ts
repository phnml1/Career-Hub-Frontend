import { useMutation } from '@tanstack/react-query';

import { updateQuestion, UpdateQuestionPayload } from '../api/updateQuestion';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';

export const useUpdateQuestion = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateQuestionPayload;
    }) => updateQuestion(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      alert('질문 정보가 수정되었습니다.');
    },

    onError: (error) => {
      console.error(error);
      alert('수정에 실패했습니다. 입력 내용을 확인해주세요.');
    },
  });
};
