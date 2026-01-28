'use client';

import { Label } from '@/shared/components/ui/label';
import {
  PROCESS_TYPE_META,
  PROCESS_TYPE_OPTIONS,
} from '../../constants/processType';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  DOCUMENT_STATUS_META,
  DOCUMENT_STATUS_OPTIONS,
} from '../../constants/documentStatus';
import {
  RESULT_STATUS_META,
  RESULT_STATUS_OPTIONS,
} from '../../constants/resultStatus';
import {
  CircleCheckBigIcon,
  FileTextIcon,
  FunnelIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/components/ui/input-group';
import { cn } from '@/shared/lib/utils';
import { useSearchParamsBasedRoute } from '@/shared/hooks/useSearchParamsBasedRoute';
import { useState } from 'react';

export default function FilterPanelContent() {
  const { toggleSearchParam, getSearchParams, getSearchParam, updateRoute } =
    useSearchParamsBasedRoute();

  const processTypes = getSearchParams('processTypes');
  const documentStatuses = getSearchParams('documentStatuses');
  const resultStatuses = getSearchParams('resultStatuses');

  const [searchInputValue, setSearchInputValue] = useState(
    getSearchParam('query'),
  );

  return (
    <>
      <div className='p-4 flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Label className='text-base font-black text-slate-800'>
            <SearchIcon className='w-4 h-4 text-primary stroke-3' />
            기업 검색
          </Label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateRoute({ query: searchInputValue });
            }}
          >
            <InputGroup>
              <InputGroupInput
                placeholder='기업명 검색'
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
              <InputGroupAddon>
                <SearchIcon className='stroke-3' />
              </InputGroupAddon>
              <InputGroupAddon align='inline-end'>
                <InputGroupButton type='submit'>검색</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>

        {/* 전형 필터 */}
        <div className='flex flex-col gap-2'>
          <div className='font-black text-slate-800 flex items-center gap-x-1'>
            <SlidersHorizontalIcon className='w-4 h-4 text-primary stroke-3' />
            지원 관리 단계
          </div>

          {PROCESS_TYPE_OPTIONS.map((option) => {
            const isChecked = processTypes.includes(option.value);
            return (
              <Label
                htmlFor={option.value}
                key={option.value}
                className={cn(
                  'flex justify-between font-bold items-center gap-2 text-sm p-2 rounded border cursor-pointer transition-all',
                  !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                  isChecked &&
                    PROCESS_TYPE_META[
                      option.value as keyof typeof PROCESS_TYPE_META
                    ].styles,
                )}
              >
                <Checkbox
                  id={option.value}
                  checked={isChecked}
                  onCheckedChange={() =>
                    toggleSearchParam('processTypes', option.value)
                  }
                  className='hidden'
                />
                {option.label}
                {isChecked && <CircleCheckBigIcon className='w-3 h-3' />}
              </Label>
            );
          })}
        </div>

        {/* 서류 상태 필터 */}
        <div className='flex flex-col gap-2'>
          <div className='font-black text-slate-800 flex items-center gap-x-1'>
            <FileTextIcon className='w-4 h-4 text-primary stroke-3' />
            서류 상태
          </div>

          {DOCUMENT_STATUS_OPTIONS.map((option) => {
            const isChecked = documentStatuses.includes(option.value);
            return (
              <Label
                htmlFor={option.value}
                key={option.value}
                className={cn(
                  'flex justify-between font-bold items-center gap-2 text-sm p-2 rounded border cursor-pointer transition-all',
                  !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                  isChecked &&
                    DOCUMENT_STATUS_META[
                      option.value as keyof typeof DOCUMENT_STATUS_META
                    ].styles,
                )}
              >
                <Checkbox
                  id={option.value}
                  className='hidden'
                  checked={isChecked}
                  onCheckedChange={() =>
                    toggleSearchParam('documentStatuses', option.value)
                  }
                />
                {option.label}
                {isChecked && <CircleCheckBigIcon className='w-3 h-3' />}
              </Label>
            );
          })}
        </div>

        {/* 결과 필터*/}
        <div className='flex flex-col gap-2'>
          <div className='font-black text-slate-800 flex items-center gap-x-1'>
            <FunnelIcon className='w-4 h-4 text-primary stroke-3' />
            결과 상태
          </div>

          {RESULT_STATUS_OPTIONS.map((option) => {
            const isChecked = resultStatuses.includes(option.value);

            return (
              <Label
                htmlFor={option.value}
                key={option.value}
                className={cn(
                  'flex justify-between items-center gap-2 font-bold text-sm p-2 rounded border cursor-pointer transition-all',
                  !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                  isChecked &&
                    RESULT_STATUS_META[
                      option.value as keyof typeof RESULT_STATUS_META
                    ].styles,
                )}
              >
                <Checkbox
                  id={option.value}
                  checked={isChecked}
                  onCheckedChange={() =>
                    toggleSearchParam('resultStatuses', option.value)
                  }
                  className='hidden'
                />
                {option.label}
                {isChecked && <CircleCheckBigIcon className='w-3 h-3' />}
              </Label>
            );
          })}
        </div>
      </div>
    </>
  );
}
