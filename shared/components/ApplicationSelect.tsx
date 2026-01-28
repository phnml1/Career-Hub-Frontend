'use client';

import { Controller, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
import { useGetApplicationsDropdown } from '@/shared/hooks/queries/useGetApplicationsDropdown';
import { cn } from '@/shared/lib/utils';
import { InfoIcon } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

interface ApplicationSelectProps {
  name?: string;
  label?: string;
  required?: boolean;
}

/**
 * @description
 * 지원 관리 목록을 드롭다운으로 조회하고 선택하는 공용 컴포넌트입니다.
 * React Hook Form의 `FormProvider` 내부에서 사용해야 합니다.
 * @param {string} [name='applicationId'] - 폼 상태에 저장될 필드명
 * @param {string} [label='연동할 지원 카드'] - 필드 상단에 표시될 라벨 문구
 * @param {boolean} [required=true] - 필수 여부 (true 시 상단에 * 표시)
 *
 * @example
 * 1. 부모에서 FormProvider로 감싸기
 * const methods = useForm({ defaultValues: { applicationId: null } });
 * <FormProvider {...methods}>
 *   <form>
 *     <ApplicationSelect name="applicationId" />
 *   </form>
 * </FormProvider>
 */
export default function ApplicationSelect({
  name = 'applicationId',
  label = '연동할 지원 관리',
  required = true,
}: ApplicationSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {
    data: options,
    isLoading,
    isError,
    refetch,
  } = useGetApplicationsDropdown();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className='animate-in fade-in slide-in-from-bottom-2 duration-300'>
      <div className='flex justify-between items-center mb-3'>
        <Label className='block font-bold text-sm ml-1'>
          {label} {required && <span className='text-red-500'>*</span>}
        </Label>

        {/* 에러 발생 시 재시도 버튼 노출 */}
        {isError && (
          <button
            type='button'
            onClick={() => refetch()}
            className='text-[10px] text-brand-600 underline hover:text-brand-800'
          >
            다시 불러오기
          </button>
        )}
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(val) => field.onChange(Number(val))}
            value={field.value ? String(field.value) : ''}
          >
            <SelectTrigger
              className={cn(
                'w-full h-auto px-3 py-4 bg-slate-50 border-slate-200 text-sm font-bold rounded-2xl transition-all',
                isError && 'border-red-200 bg-red-50',
              )}
            >
              <SelectValue
                placeholder={
                  isLoading
                    ? '목록을 불러오는 중입니다...'
                    : isError
                      ? '데이터를 불러오지 못했습니다'
                      : '연동할 지원 관리를 선택해주세요'
                }
              />
            </SelectTrigger>

            <SelectContent
              position='popper'
              className='rounded-xl shadow-lg max-h-[300px]'
            >
              <SelectGroup>
                {/* 1. 데이터가 없을 때 */}
                {options?.length === 0 && !isLoading && (
                  <div className='p-8 text-center flex flex-col items-center gap-2 min-w-[240px]'>
                    <div className='bg-slate-100 p-2 rounded-full'>
                      <InfoIcon className='w-4 h-4 text-slate-400' />
                    </div>
                    <p className='text-[11px] text-slate-500 font-medium leading-normal'>
                      연동 가능한 지원 카드가 없습니다.
                      <br />
                      먼저 지원 카드를 생성해주세요.
                    </p>
                    <Button asChild>
                      <Link href='/applications/new'>지원 관리 추가</Link>
                    </Button>
                    {/* 필요하다면 여기에 링크 버튼을 추가할 수 있습니다 */}
                  </div>
                )}

                {/* 2. 데이터가 있을 때 리스트 렌더링 */}
                {options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={String(option.value)}
                    className='py-3 focus:bg-brand-50 focus:text-brand-700 cursor-pointer'
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {/* 하단 에러 메시지 우선순위: 폼 검증 에러 > 서버 에러 */}
      {error ? (
        <p className='mt-2 text-[11px] text-red-500 ml-1 font-medium'>
          {error}
        </p>
      ) : isError ? (
        <p className='mt-2 text-[11px] text-red-500 ml-1 font-medium italic'>
          서버 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.
        </p>
      ) : null}
    </div>
  );
}
