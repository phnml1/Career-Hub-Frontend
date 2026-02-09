'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookMarkedIcon, XIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import ButtonLoader from '@/shared/components/ButtonLoader';
import QuestionFields from './QuestionFields';

import { useArchiveQuestion } from '@/features/community/hooks/useArchiveQuestion';
import { useParams } from 'next/navigation';
import {
  ArchiveFormValues,
  archiveQuestionSchema,
} from '@/features/community/schema/archive-question-form';
import { PostDetailQuestion } from '@/features/community/types';

interface QuestionArchiveFormProps {
  archiveTarget: {
    question: PostDetailQuestion;
    postId: number;
    postInterviewType: string;
  };
  onSuccess: () => void;
}

export default function QuestionArchiveForm({
  archiveTarget,
  onSuccess,
}: QuestionArchiveFormProps) {
  const params = useParams();
  const { mutate, isPending } = useArchiveQuestion(Number(params.id));

  const methods = useForm<ArchiveFormValues>({
    resolver: zodResolver(archiveQuestionSchema),
    defaultValues: {
      isLinked: false,
      interviewQuestionId: archiveTarget.question.id,
      applicationId: null,
      interviewType: archiveTarget.postInterviewType,
      question: archiveTarget.question.content,
      memo: '',
    },
  });

  const onSubmit = (data: ArchiveFormValues) => {
    // 1. UI 전용 필드인 isLinked를 구조 분해 할당으로 제거합니다.
    const { isLinked, ...rest } = data;

    // 2. 서버가 원하는 Payload 타입으로 명확하게 매핑합니다.
    // data.isLinked 값에 따라 applicationId가 number인지 null인지 TS가 추론합니다.
    const payload = {
      ...rest,
      applicationId: data.isLinked ? data.applicationId : null,
    } as const;

    // 3. 만약 mutate의 인자 타입이 strict하다면, 여기서 undefined를 거르는 검증이 필요합니다.
    // Zod가 이미 검증했으므로 '!' (Non-null assertion)를 써도 안전합니다.
    const finalPayload = {
      ...payload,
      applicationId: payload.applicationId ?? null,
    };

    mutate(finalPayload, { onSuccess });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6'>
        <QuestionFields />
        <div className='flex gap-x-2'>
          <Button
            type='button'
            onClick={onSuccess}
            variant='outline'
            className='flex-1'
          >
            <XIcon className='size-4' /> 보관 취소
          </Button>
          <Button type='submit' className='flex-1' disabled={isPending}>
            {isPending ? (
              <ButtonLoader />
            ) : (
              <BookMarkedIcon className='size-4' />
            )}
            나의 질문으로 보관하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
