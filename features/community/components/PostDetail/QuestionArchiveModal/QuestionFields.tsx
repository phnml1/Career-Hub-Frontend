'use client';

import { useFormContext } from 'react-hook-form';
import { InfoIcon } from 'lucide-react';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import InterviewTypeSelect from '@/shared/components/InterviewTypeSelect';
import ApplicationSelect from '@/shared/components/ApplicationSelect';
import { LinkToggle } from '@/features/my-questions/components/LinkToggle';
import { ArchiveFormValues } from '@/features/community/schema/archive-question-form';

export default function QuestionFields() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ArchiveFormValues>();

  const isLinked = watch('isLinked');

  const handleToggle = (checked: boolean) => {
    if (checked) {
      // 💡 연동 모드일 때
      setValue('isLinked', true); // 리터럴 true를 명시
      setValue('applicationId', undefined); // any 대신 명시적 undefined 사용
    } else {
      // 💡 미연동 모드일 때
      setValue('isLinked', false); // 리터럴 false를 명시
      setValue('applicationId', null);
    }
  };

  return (
    <div className='space-y-6'>
      <LinkToggle isOn={isLinked} onToggle={handleToggle} />

      {!isLinked && (
        <div className='p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-2'>
          <div className='bg-brand-100 dark:bg-brand-900/30 p-1.5 rounded-lg'>
            <InfoIcon className='w-4 h-4 text-brand-500 shrink-0' />
          </div>
          <p className='text-xs text-slate-600 dark:text-slate-400 font-medium'>
            나만의 일반 질문으로 저장됩니다.
          </p>
        </div>
      )}

      {isLinked && <ApplicationSelect name='applicationId' />}

      <InterviewTypeSelect />

      <div className='space-y-1.5'>
        <Label htmlFor='question' className='text-sm font-bold'>
          질문 내용 <span className='text-red-500'>*</span>
        </Label>
        <Textarea
          id='question'
          {...register('question')}
          placeholder='질문을 입력해주세요.'
          className='h-24 resize-none'
        />
        {errors.question && (
          <p className='text-xs text-red-500'>
            {errors.question.message as string}
          </p>
        )}
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='memo' className='text-sm font-bold'>
          메모
        </Label>
        <Textarea
          id='memo'
          {...register('memo')}
          placeholder='답변 힌트나 메모를 남겨보세요'
          className='h-24 resize-none'
        />
      </div>
    </div>
  );
}
