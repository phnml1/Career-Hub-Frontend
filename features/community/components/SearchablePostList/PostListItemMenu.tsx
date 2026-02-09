'use client';

import { MoreVertical, Pencil, Trash2, AlertCircle } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useConfirmStore } from '@/shared/stores/useConfirmStore';
import { useDeleteReview } from '../../hooks/useDeleteReview';
import { useState } from 'react';
import PostReportModal from '../PostReportModal';
import { cn } from '@/shared/lib/utils';

interface PostListItemMenuProps {
  isMyPost: boolean;
  postId: number;
  className?: string;
}

export default function PostListItemMenu({
  isMyPost,
  postId,
  className = '',
}: PostListItemMenuProps) {
  const router = useRouter();
  const { openConfirm } = useConfirmStore();
  const { mutate: deleteReview } = useDeleteReview();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleEdit = () => router.push(`/community/${postId}/edit`);

  const handleDelete = () => {
    openConfirm({
      title: '후기 삭제',
      description: '삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      onConfirm: () => deleteReview(postId, { onSuccess: () => router.back() }),
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 outline-none',
              className,
            )}
          >
            <MoreVertical className='w-4 h-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          {isMyPost ? (
            <>
              <DropdownMenuItem
                onClick={handleEdit}
                className='gap-2 cursor-pointer'
              >
                <Pencil className='w-3.5 h-3.5' />{' '}
                <span className='text-sm'>수정</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className='gap-2 cursor-pointer'
              >
                <Trash2 className='w-3.5 h-3.5' />{' '}
                <span className='text-sm'>삭제</span>
              </DropdownMenuItem>
            </>
          ) : (
            /* 💡 타인의 게시글인 경우에만 신고 노출 */
            <DropdownMenuItem
              onClick={() => setIsReportModalOpen(true)}
              className='gap-2 cursor-pointer text-slate-500'
            >
              <AlertCircle className='w-3.5 h-3.5' />{' '}
              <span className='text-sm'>신고</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <PostReportModal
        postId={postId}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </>
  );
}
