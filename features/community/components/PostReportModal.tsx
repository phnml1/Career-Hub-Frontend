'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import { Textarea } from '@/shared/components/ui/textarea';
import { useReportReview } from '../hooks/useReportReview';
import { ReportFormValues, reportSchema } from '../schema/post-report-form';

interface PostReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const REPORT_REASONS = [
  { id: 'SPAM', label: '스팸/부적절한 홍보' },
  { id: 'ABUSE', label: '욕설 및 비하 발언' },
  { id: 'INACCURATE', label: '잘못된 정보 포함' },
  { id: 'ETC', label: '기타' },
];

export default function PostReportModal({
  isOpen,
  onClose,
  postId,
}: PostReportModalProps) {
  const { mutate, isPending } = useReportReview();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reasonType: 'SPAM',
      etcDetail: '',
    },
  });

  const selectedReasonType = watch('reasonType');

  const onSubmit = (data: ReportFormValues) => {
    // 백엔드 명세서 규격에 맞게 데이터 가공
    const finalReason =
      data.reasonType === 'ETC'
        ? data.etcDetail!
        : REPORT_REASONS.find((r) => r.id === data.reasonType)?.label ||
          data.reasonType;

    mutate(
      { reviewId: postId, reason: finalReason },
      {
        onSuccess: () => {
          reset(); // 폼 초기화
          onClose(); // 모달 닫기
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] rounded-3xl p-6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className='flex flex-col items-center text-center'>
            <div className='w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4'>
              <AlertTriangle className='w-6 h-6 text-red-500' />
            </div>
            <DialogTitle className='text-xl font-bold text-slate-900 dark:text-slate-100'>
              게시글 신고하기
            </DialogTitle>
            <DialogDescription className='text-sm text-slate-500 mt-1'>
              이 게시글을 신고하는 이유를 선택해 주세요.
            </DialogDescription>
          </DialogHeader>

          <div className='py-6'>
            <RadioGroup
              value={selectedReasonType}
              onValueChange={(val) => setValue('reasonType', val)}
              className='space-y-3'
            >
              {REPORT_REASONS.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedReasonType === item.id
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/10'
                      : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <RadioGroupItem
                    value={item.id}
                    id={item.id}
                    className='text-brand-500 border-brand-500'
                  />
                  <Label
                    htmlFor={item.id}
                    className='flex-1 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200'
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.reasonType && (
              <p className='text-xs text-red-500 mt-2'>
                {errors.reasonType.message}
              </p>
            )}

            {selectedReasonType === 'ETC' && (
              <div className='mt-4 animate-in fade-in slide-in-from-top-1'>
                <Textarea
                  {...register('etcDetail')}
                  placeholder='상세 사유를 입력해 주세요 (필수)'
                  className='resize-none min-h-[100px] rounded-xl border-slate-200 dark:border-slate-800 focus:ring-brand-500'
                />
                {errors.etcDetail && (
                  <p className='text-xs text-red-500 mt-1'>
                    {errors.etcDetail.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter className='flex gap-2 sm:gap-0'>
            <Button
              type='button'
              variant='ghost'
              onClick={onClose}
              className='flex-1 rounded-xl text-slate-500 font-bold'
            >
              취소
            </Button>
            <Button
              type='submit'
              disabled={isPending}
              className='flex-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all'
            >
              {isPending ? '처리 중...' : '신고 제출'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
