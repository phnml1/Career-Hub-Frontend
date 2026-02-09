'use client';

import { BriefcaseIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import RelativeTime from '@/shared/components/RelativeTime';
import PostListItemMenu from './PostListItemMenu';
import { PostListItem as PostListItemType } from '../../types';
import CompanyBadge from '@/shared/components/CompanyBadge';
import InterviewBadge from '@/shared/components/InterviewBadge';
import { Badge } from '@/shared/components/ui/badge';

export default function PostListItem({ post }: { post: PostListItemType }) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.stop-propagation')) return;

    router.push(`/community/${post.id}`, { scroll: false });
  };

  return (
    <article
      onClick={handleCardClick}
      className='bg-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-300 dark:hover:border-brand-700 hover:shadow-md transition-all cursor-pointer group relative'
    >
      <div className='flex justify-between'>
        <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex flex-wrap items-center gap-2 mb-6'>
          <CompanyBadge name={post.companyName} />
          <Badge
            variant='secondary'
            className='px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl text-[11px] font-black flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-colors'
          >
            <BriefcaseIcon className='size-4' />
            {post.position}
          </Badge>
          <InterviewBadge label={post.interviewType} />
        </h3>
        <PostListItemMenu
          isMyPost={post.isMine}
          postId={post.id}
          className='absolute top-4 right-4'
        />
      </div>

      <div className='relative min-h-22'>
        <p className='text-slate-500 dark:text-slate-400 text-sm line-clamp-3 transition-opacity duration-200 opacity-100 leading-relaxed'>
          {post.content}
        </p>
      </div>

      {/* 하단 정보 영역 */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4 text-xs font-medium text-slate-500 dark:text-slate-400'>
          <span className='bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded text-slate-600 dark:text-slate-300 font-bold'>
            {post.authorName}
          </span>
        </div>
        <span className='text-[11px] text-slate-400 dark:text-slate-500 font-medium'>
          <RelativeTime date={post.createdAt} />
        </span>
      </div>
    </article>
  );
}
