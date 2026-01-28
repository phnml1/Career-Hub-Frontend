'use client';

import { useState } from 'react';
import { BriefcaseIcon, Building2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { RelativeTime } from '@/shared/components/RelativeTime';
import { useConfirmStore } from '@/shared/stores/useConfirmStore';
import PostListItemMenu from './PostListItemMenu';
import PostReportModal from '../PostReportModal';
import { PostListItem as PostListItemType } from '../../types';
import { useDeleteReview } from '../../hooks/useDeleteReview';

export default function PostListItem({ post }: { post: PostListItemType }) {
  const router = useRouter();
  const { openConfirm } = useConfirmStore();
  const { mutate: deleteReview } = useDeleteReview();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.stop-propagation')) return;

    router.push(`/community/${post.id}`, { scroll: false });
  };

  const handleEdit = () => {
    router.push(`/community/${post.id}/edit`, { scroll: false });
  };

  const handleDelete = () => {
    console.log(post.id);
    openConfirm({
      title: '게시글 삭제',
      description:
        '정말 이 게시글을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
      variant: 'destructive',
      confirmText: '게시글 삭제',
      onConfirm: () => {
        deleteReview(post.id, {
          onSuccess: () => {
            // Toast 알림 등이 있다면 여기서 호출
            alert('삭제 완료');
            console.log('삭제 완료');
          },
          onError: (error) => {
            alert(
              error instanceof Error ? error.message : '삭제에 실패했습니다.',
            );
          },
        });
      },
    });
  };

  const handleReport = () => {
    setIsReportModalOpen(true);
  };

  return (
    <>
      <article
        onClick={handleCardClick}
        className='bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all cursor-pointer group relative'
      >
        {/* 우측 상단 드롭다운 메뉴 트리거 */}
        <PostListItemMenu
          isMyPost={post.isMine}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={handleReport}
        />

        {/* 컨텐츠 영역 */}
        <div className='flex justify-between items-start mb-3'>
          <div className='flex-1 min-w-0 pr-8'>
            <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex flex-wrap items-center gap-2 mb-2'>
              <Building2Icon className='size-4' />
              {post.companyName}
              <span className='text-slate-300 dark:text-slate-700 text-sm'>
                |
              </span>
              <BriefcaseIcon className='size-4' />
              <span className='text-slate-600 dark:text-slate-400 text-base font-medium'>
                {post.position}
              </span>
              <span className='text-slate-300 dark:text-slate-700 text-sm'>
                |
              </span>
              <span className='px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold'>
                {post.interviewType}
              </span>
            </h3>

            <div className='relative min-h-22'>
              <p className='text-slate-500 dark:text-slate-400 text-sm line-clamp-3 transition-opacity duration-200 opacity-100 leading-relaxed'>
                {post.content}
              </p>

              {/* <QuestionPreview questions={post.questions} /> */}
            </div>
          </div>
        </div>

        {/* 하단 정보 영역 */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4 text-xs font-medium text-slate-500 dark:text-slate-400'>
            <span className='bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded text-slate-600 dark:text-slate-300 font-bold'>
              {post.authorName}
            </span>
            {/* <div className='flex items-center gap-3'>
            <span className='flex items-center gap-1 hover:text-red-500 transition-colors'>
              <Heart className='w-3.5 h-3.5' /> {post.likeCount}
            </span>
            <span className='flex items-center gap-1 hover:text-brand-500 transition-colors'>
              <MessageSquare className='w-3.5 h-3.5' /> {post.commentCount}
            </span>
          </div> */}
          </div>
          <span className='text-[11px] text-slate-400 dark:text-slate-500 font-medium'>
            <RelativeTime date={post.createdAt} />
          </span>
        </div>
      </article>

      {isReportModalOpen && (
        <PostReportModal
          postId={post.id}
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}
    </>
  );
}
