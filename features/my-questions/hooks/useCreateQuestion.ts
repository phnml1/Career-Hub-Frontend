import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuestion, CreateQuestionPayload } from '../api/createQuestion';

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. 질문 생성 API 호출
    mutationFn: (payload: CreateQuestionPayload) => createQuestion(payload),

    // 2. 성공 시 처리
    onSuccess: () => {
      // 질문 목록 캐시를 무효화하여 새로운 질문이 포함된 리스트를 다시 불러옵니다.
      // 'questions'로 시작하는 모든 쿼리(연동/미연동 탭 모두)를 갱신합니다.
      queryClient.invalidateQueries({
        queryKey: ['questions'],
      });

      alert('질문이 아카이브에 추가되었습니다.');
    },

    // 3. 에러 발생 시 처리
    onError: (error) => {
      console.error('Create Question Error:', error);
      alert('질문 추가에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
