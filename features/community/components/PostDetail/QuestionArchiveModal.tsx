'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

import QuestionForm from '@/features/my-questions/components/QuestionForm';
import { useQuestionModalStore } from '@/features/my-questions/store/useQuestionModalStore';

export default function QuestionArchiveModal() {
  const { isOpen, closeModal } = useQuestionModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className='max-w-sm rounded-4xl p-8 shadow-2xl border-slate-100 dark:border-slate-800 gap-0'>
        {/* 헤더 영역 */}
        <DialogHeader className='flex justify-between items-center mb-6'>
          <DialogTitle className='text-lg font-black text-slate-900 dark:text-slate-100'>
            면접 질문 보관하기
          </DialogTitle>
          <DialogDescription>
            커뮤니티에 있는 면접 질문들을 나만의 면접 질문으로 수정해서
            보관해보세요.
          </DialogDescription>
        </DialogHeader>

        <QuestionForm />
      </DialogContent>
    </Dialog>
  );
}
