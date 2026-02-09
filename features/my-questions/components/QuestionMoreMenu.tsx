'use client';

import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useQuestionModalStore } from '../store/useQuestionModalStore';

import { useConfirmStore } from '@/shared/stores/useConfirmStore';
import { useDeleteQuestion } from '../hooks/useDeleteQuestion';
import { GetQuestionListItemResponse } from '../api/getQuestions';

interface QuestionMoreMenuProps {
  question: GetQuestionListItemResponse;
}

export default function QuestionMoreMenu({ question }: QuestionMoreMenuProps) {
  const openEditModal = useQuestionModalStore((state) => state.openEditModal);
  const openDeleteConfirm = useConfirmStore((state) => state.openConfirm);
  const { mutate: deleteMutate } = useDeleteQuestion();

  const handleClickEditButton = () => {
    openEditModal(question);
  };

  const handleClickDeleteButton = () => {
    openDeleteConfirm({
      title: '정말 삭제하시겠습니까?',
      description:
        '삭제된 질문은 복구할 수 없으며, 모든 답변 데이터가 함께 삭제됩니다.',
      confirmText: '삭제하기',
      variant: 'destructive',
      onConfirm: () => {
        deleteMutate(question.questionArchiveId);
      },
    });
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault(); // 부모 Link의 이동 방지
        e.stopPropagation(); // 클릭 이벤트가 부모 Link로 전달되는 것 차단
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all outline-none'>
            <EllipsisVertical className='w-5 h-5' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32 rounded-2xl p-2'>
          <DropdownMenuItem
            onClick={handleClickEditButton}
            className='flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer text-sm font-medium transition-colors'
          >
            <Pencil className='w-4 h-4' /> 수정하기
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleClickDeleteButton}
            className='flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer text-sm font-medium transition-colors'
          >
            <Trash2 className='w-4 h-4' /> 삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
