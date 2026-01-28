import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  questionFormSchema,
  QuestionFormValues,
} from '../schemas/question-form';

import { useQuestionModalStore } from '../store/useQuestionModalStore';
import { useCreateQuestion } from '../hooks/useCreateQuestion';
import { useUpdateQuestion } from '../hooks/useUpdateQuestion';
import { LinkToggle } from './LinkToggle';
import { BookMarkedIcon, InfoIcon, XIcon } from 'lucide-react';
import ApplicationSelect from '@/shared/components/ApplicationSelect';
import InterviewTypeSelect from '@/shared/components/InterviewTypeSelect';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
import ButtonLoader from '@/shared/components/ButtonLoader';

interface QuestionFormProps {
  onSuccess?: () => void;
}

export default function QuestionForm({ onSuccess }: QuestionFormProps) {
  const { closeModal, mode, selectedQuestion } = useQuestionModalStore();
  const { mutate: createMutate, isPending: isCreating } = useCreateQuestion();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateQuestion();

  const methods = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    values: {
      questionArchiveId: selectedQuestion?.questionArchiveId,
      applicationId: selectedQuestion?.applicationId ?? null,
      interviewQuestionId: selectedQuestion?.interviewQuestionId ?? null,
      interviewType: selectedQuestion?.interviewType ?? '',
      question: selectedQuestion?.question ?? '',
      memo: selectedQuestion?.memo ?? '',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const applicationId = watch('applicationId');
  const isLinked = applicationId !== null;

  const onSubmit = (data: QuestionFormValues) => {
    const { questionArchiveId, ...payload } = data;

    console.log('🚀 ~ onSubmit ~ payload:', payload);
    if (!payload.memo || payload.memo.trim() === '') {
      delete payload.memo;
    }

    if (mode === 'create' || mode === 'archive') {
      createMutate(payload, {
        onSuccess: () => {
          onSuccess?.();
          closeModal();
        },
      });
    } else {
      if (!questionArchiveId) return;

      updateMutate(
        {
          id: questionArchiveId,
          payload: payload,
        },
        {
          onSuccess: () => {
            onSuccess?.();
            closeModal();
          },
        },
      );
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log('검증 실패 원인:', errors),
        )}
        className='space-y-6'
      >
        <LinkToggle
          isOn={isLinked}
          onToggle={(checked) => setValue('applicationId', checked ? 0 : null)}
        />

        {!isLinked && (
          <div className='p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300'>
            <div className='bg-brand-100 dark:bg-brand-900/30 p-1.5 rounded-lg'>
              <InfoIcon className='w-4 h-4 text-brand-500 shrink-0' />
            </div>
            <p className='text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed'>
              지원 관리와 연동하지 않고{' '}
              <span className='font-black text-brand-600 dark:text-brand-400'>
                나만의 일반 질문
              </span>
              으로 저장됩니다.
            </p>
          </div>
        )}

        {/* 2. 연동이 켜졌을 때만 지원 공고 선택 창 노출 */}
        {isLinked && <ApplicationSelect name='applicationId' />}

        <InterviewTypeSelect />

        <div>
          <Label
            htmlFor='question'
            className='block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5'
          >
            질문 내용 <span className='text-red-500'>*</span>
          </Label>
          <Textarea
            id='question'
            required
            {...register('question')}
            className='w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-800 h-20'
          />
          {errors.question && (
            <p className='text-xs text-red-500'>{errors.question.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor='memo'
            className='block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5'
          >
            메모
          </Label>
          <Textarea
            id='memo'
            {...register('memo')}
            className='w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-800 h-20'
          />
          {errors.memo && (
            <p className='text-xs text-red-500'>{errors.memo.message}</p>
          )}
        </div>

        <div className='flex gap-x-2'>
          <Button
            type='button'
            onClick={closeModal}
            variant='outline'
            className='flex-1'
            disabled={isLoading}
          >
            <XIcon className='size-4' />
            {mode === 'create' && '면접 질문 추가 취소하기'}
            {mode === 'edit' && '면접 질문 수정 취소하기'}
            {mode === 'archive' && '나의 질문으로 보관 취소하기'}
          </Button>
          <Button
            type='submit'
            variant='default'
            className='flex-1 font-bold flex items-center justify-center'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ButtonLoader />
                {mode === 'create' && '면접 질문 추가중..'}
                {mode === 'edit' && '면접 질문 수정중..'}
                {mode === 'archive' && '나의 질문으로 보관중..'}
              </>
            ) : (
              <>
                <BookMarkedIcon className='size-4' />
                {mode === 'create' && '면접 질문 추가하기'}
                {mode === 'edit' && '면접 질문 수정 완료'}
                {mode === 'archive' && '나의 질문으로 보관하기'}
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
