import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';
import { useMutation } from '@tanstack/react-query';
import { archiveCommunityQuestion } from '../api/archiveQuestion';

export const useArchiveQuestion = (postId?: number) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: archiveCommunityQuestion,
    onSuccess: () => {
      if (postId) {
        queryClient.invalidateQueries({ queryKey: ['reviews', postId] });
      }
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
};
