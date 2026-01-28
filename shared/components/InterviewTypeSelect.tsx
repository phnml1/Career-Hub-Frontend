'use client';

import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
import { INTERVIEW_DROPDOWN_OPTIONS } from '@/shared/constants/interview';
import { Input } from '@/shared/components/ui/input';

export default function InterviewTypeSelect({ name = 'interviewType' }) {
  const {
    control,
    watch,

    formState: { errors },
  } = useFormContext();

  const currentValue = watch(name);
  const error = errors[name]?.message as string | undefined;

  const isPresetValue = (val: string) =>
    INTERVIEW_DROPDOWN_OPTIONS.some(
      (opt) => opt.value !== 'CUSTOM' && opt.value === val,
    );

  const isCustomActive =
    currentValue === 'CUSTOM' || (currentValue && !isPresetValue(currentValue));

  return (
    <div className='space-y-1.5'>
      <Label className='block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5'>
        면접 종류 <span className='text-red-500'>*</span>
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className='flex flex-col gap-2'>
            <Select
              // 직접 입력 모드일 때는 Select의 UI를 'CUSTOM'에 고정
              value={
                isCustomActive
                  ? 'CUSTOM'
                  : isPresetValue(field.value)
                    ? field.value
                    : ''
              }
              onValueChange={(val) => {
                // '직접 입력' 선택 시에만 'CUSTOM'이라는 임시 값을 넣어 인풋창을 띄움
                field.onChange(val === 'CUSTOM' ? 'CUSTOM' : val);
              }}
            >
              <SelectTrigger className='w-full h-[50px] rounded-xl bg-slate-50 border-slate-200'>
                <SelectValue placeholder='면접 종류를 선택하세요' />
              </SelectTrigger>
              <SelectContent>
                {INTERVIEW_DROPDOWN_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {isCustomActive && (
              <div className='animate-in fade-in slide-in-from-top-1'>
                <Input
                  placeholder='면접 종류를 직접 입력해주세요'
                  className='h-[50px] rounded-xl border-brand-200 focus-visible:ring-brand-500'
                  value={field.value === 'CUSTOM' ? '' : field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  autoFocus
                />
              </div>
            )}
          </div>
        )}
      />
      {error && <p className='text-xs text-red-500 ml-1 mt-1'>{error}</p>}
    </div>
  );
}
