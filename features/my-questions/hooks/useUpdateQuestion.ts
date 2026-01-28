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
      // 질문 리스트 쿼리 무효화 (LINKED / UNLINKED 상태가 변할 수 있으므로 전체 무효화)
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      alert('질문 정보가 수정되었습니다.');
    },
    onError: (error) => {
      console.error(error);
      alert('수정에 실패했습니다. 입력 내용을 확인해주세요.');
    },
  });
};
