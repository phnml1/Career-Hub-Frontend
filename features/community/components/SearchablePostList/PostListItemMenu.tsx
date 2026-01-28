'use client';

import { MoreVertical, Pencil, Trash2, AlertCircle } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

interface PostListItemMenuProps {
  isMyPost: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}

export default function PostListItemMenu({
  isMyPost,
  onEdit,
  onDelete,
  onReport,
}: PostListItemMenuProps) {
  return (
    <div className='absolute top-5 right-4 z-20'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={(e) => e.stopPropagation()}
            className='p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 outline-none'
          >
            <MoreVertical className='w-4 h-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          {/* 💡 본인 게시글인 경우에만 수정/삭제 노출 */}
          {isMyPost ? (
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.();
                }}
                className='gap-2 cursor-pointer'
              >
                <Pencil className='w-3.5 h-3.5' />{' '}
                <span className='text-sm'>수정</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                className='gap-2 cursor-pointer'
              >
                <Trash2 className='w-3.5 h-3.5' />{' '}
                <span className='text-sm'>삭제</span>
              </DropdownMenuItem>
            </>
          ) : (
            /* 💡 타인의 게시글인 경우에만 신고 노출 */
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onReport?.();
              }}
              className='gap-2 cursor-pointer text-slate-500'
            >
              <AlertCircle className='w-3.5 h-3.5' />{' '}
              <span className='text-sm'>신고</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
