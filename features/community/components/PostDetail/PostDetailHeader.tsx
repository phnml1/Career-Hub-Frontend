import CompanyBadge from '@/shared/components/CompanyBadge';
import InterviewBadge from '@/shared/components/InterviewBadge';
import RelativeTime from '@/shared/components/RelativeTime';
import { Badge } from '@/shared/components/ui/badge';
import { DialogDescription, DialogHeader } from '@/shared/components/ui/dialog';
import { BriefcaseIcon } from 'lucide-react';
import PostListItemMenu from '../SearchablePostList/PostListItemMenu';

interface PostDetailHeaderProps {
  data: {
    companyName: string;
    position: string;
    interviewType: string;
    isMyPost: boolean;
    postId: number;
    authorName: string;
    createdAt: string;
  };
}

export default function PostDetailHeader({ data }: PostDetailHeaderProps) {
  return (
    <DialogHeader className='p-8 pb-6 border-b border-border'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-x-2 items-center'>
          <CompanyBadge name={data.companyName} />
          <Badge
            variant='secondary'
            className='px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl text-[11px] font-black flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-colors'
          >
            <BriefcaseIcon className='size-4' />
            {data.position}
          </Badge>
          <InterviewBadge label={data.interviewType} />
        </div>
        <PostListItemMenu isMyPost={data.isMyPost} postId={data.postId} />
      </div>

      <DialogDescription className='flex items-center justify-between text-xs text-slate-500 dark:text-slate-400'>
        <Badge variant='secondary'>{data.authorName}</Badge>
        <RelativeTime date={data.createdAt} />
      </DialogDescription>
    </DialogHeader>
  );
}
