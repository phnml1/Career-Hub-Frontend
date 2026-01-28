'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

import { useQuestionModalStore } from '../store/useQuestionModalStore';

import QuestionForm from './QuestionForm';

export default function QuestionFormModal() {
  const { isOpen, closeModal, mode } = useQuestionModalStore();

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-2xl mb-8 text-center font-black'>
            {mode === 'create' ? '면접 질문 추가' : '면접 질문 수정'}
          </DialogTitle>
        </DialogHeader>

        <QuestionForm />
      </DialogContent>
    </Dialog>
  );
}
