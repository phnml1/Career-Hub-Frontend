'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';

import {
  interviewSchema,
  type InterviewFormValues,
} from '../../constants/schema';

import { useCreateInterviewSchedule } from '../../hooks/useCreateInterviewSchedule';
import InterviewTypeSelect from '@/shared/components/InterviewTypeSelect';
import ApplicationSelect from '@/shared/components/ApplicationSelect';

interface Props {
  selectedDate: Date | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function InterviewScheduleForm({
  selectedDate,
  onSuccess,
  onCancel,
}: Props) {
  const { mutate, isPending } = useCreateInterviewSchedule();

  const methods = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      applicationId: 0,
      startedAt: selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : '',
      interviewType: '',
      location: '',
      scheduleResult: 'WAITING',
    },
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = methods;

  const onSubmit = (data: InterviewFormValues) => {
    mutate(
      {
        applicationId: data.applicationId,
        location: data.location,
        startedAt: new Date(data.startedAt).toISOString(),
        scheduleName: data.interviewType,
      },
      { onSuccess },
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) =>
          console.log('유효성 검사 실패 필드:', errors),
        )}
        className='space-y-4 animate-in fade-in duration-300'
      >
        <ApplicationSelect name='applicationId' />

        <InterviewTypeSelect />

        <div className='flex flex-col gap-y-2'>
          <Label className='font-black text-sm'>
            시작일시 <span className='text-red-500'>*</span>
          </Label>
          <Input type='datetime-local' {...register('startedAt')} />
          {errors.startedAt && (
            <p className='text-xs text-red-500'>{errors.startedAt.message}</p>
          )}
        </div>

        <div className='flex flex-col gap-y-2'>
          <Label className='font-black text-sm'>
            장소 / 링크 <span className='text-red-500'>*</span>
          </Label>
          <Input
            {...register('location')}
            placeholder='Google Meet 링크 또는 본사 주소'
          />
          {errors.location && (
            <p className='text-xs text-red-500'>{errors.location.message}</p>
          )}
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <Button type='button' variant='outline' onClick={onCancel}>
            취소
          </Button>
          <Button type='submit' disabled={isPending}>
            {isPending ? '추가 중...' : '일정 추가'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
