import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  BriefcaseIcon,
  Building2Icon,
  CircleUserRoundIcon,
} from 'lucide-react';

interface HeaderProps {
  companyName: string;
  position: string;
  interviewType: string;
  authorName: string;
  createdAt: string;
}

export default function PostDetailHeader({ data }: { data: HeaderProps }) {
  return (
    <DialogHeader className='p-8 pb-6 border-b border-slate-50 dark:border-slate-800 space-y-0 shrink-0'>
      <div className='flex items-center gap-2 text-xs font-bold text-brand-500 mb-2'>
        <Building2Icon className='w-4 h-4' />
        <span className='truncate'>{data.companyName}</span>
        <span className='text-slate-300 dark:text-slate-700'>|</span>
        <BriefcaseIcon className='w-4 h-4' />
        <span className='truncate'>{data.position}</span>
      </div>
      <DialogTitle className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
        {data.interviewType} 후기
      </DialogTitle>
      <DialogDescription className='flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400'>
        <span className='flex items-center gap-1'>
          <CircleUserRoundIcon className='w-3.5 h-3.5' /> {data.authorName}
        </span>
        <span>{data.createdAt}</span>
      </DialogDescription>
    </DialogHeader>
  );
}
