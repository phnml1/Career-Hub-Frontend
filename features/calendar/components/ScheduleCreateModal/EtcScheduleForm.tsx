'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';

import { EtcFormValues, etcSchema } from '../../constants/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { Button } from '@/shared/components/ui/button';
import { useCreateEtcSchedule } from '../../hooks/useCreateEtcSchedule';
import ApplicationSelect from '@/shared/components/ApplicationSelect';

interface Props {
  selectedDate: Date | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EtcScheduleForm({
  selectedDate,
  onSuccess,
  onCancel,
}: Props) {
  const { mutate, isPending } = useCreateEtcSchedule();

  const methods = useForm<EtcFormValues>({
    resolver: zodResolver(etcSchema),
    defaultValues: {
      applicationId: 0,
      scheduleName: '',
      startedAt: selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : '',
      endedAt: selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: EtcFormValues) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    mutate(
      {
        applicationId: data.applicationId,
        scheduleName: data.scheduleName,
        startedAt: new Date(data.startedAt).toISOString(),
        endedAt: new Date(data.endedAt).toISOString(),
      },
      { onSuccess },
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4 animate-in fade-in'
      >
        <ApplicationSelect />

        <div className='flex flex-col gap-y-2'>
          <Label className='font-black text-sm'>
            일정 명칭 <span className='text-red-500'>*</span>
          </Label>
          <Input
            {...register('scheduleName')}
            placeholder='예: 코딩 테스트, 과제 제출, 커피챗'
          />
          {errors.scheduleName && (
            <p className='text-xs text-red-500'>
              {errors.scheduleName.message}
            </p>
          )}
        </div>

        <div className='grid grid-cols-2 gap-x-2'>
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
              종료일시 <span className='text-red-500'>*</span>
            </Label>
            <Input type='datetime-local' {...register('endedAt')} />
            {errors.endedAt && (
              <p className='text-xs text-red-500'>{errors.endedAt.message}</p>
            )}
          </div>
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
