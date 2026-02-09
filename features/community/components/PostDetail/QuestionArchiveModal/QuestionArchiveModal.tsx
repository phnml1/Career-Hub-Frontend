'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import QuestionArchiveForm from './QuestionArchiveForm';
import { PostDetailQuestion } from '@/features/community/types';

interface QuestionArchiveModalProps {
  archiveTarget: {
    question: PostDetailQuestion;
    postId: number;
    postInterviewType: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestionArchiveModal({
  archiveTarget,
  isOpen,
  onClose,
}: QuestionArchiveModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-sm rounded-4xl p-8 shadow-2xl border-slate-100 dark:border-slate-800 gap-0'>
        <DialogHeader className='flex justify-between items-center mb-6'>
          <DialogTitle className='text-lg font-black text-slate-900 dark:text-slate-100'>
            면접 질문 보관하기
          </DialogTitle>

          <DialogDescription>
            커뮤니티에 있는 면접 질문들을 나만의 면접 질문으로 수정해서
            보관해보세요.
          </DialogDescription>
        </DialogHeader>

        <QuestionArchiveForm
          archiveTarget={archiveTarget}
          onSuccess={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
