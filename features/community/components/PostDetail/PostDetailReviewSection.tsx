import { MessageSquareIcon } from 'lucide-react';

interface PostDetailReviewSection {
  detailReviewContent: string;
}

export default function PostDetailReviewSection({
  detailReviewContent,
}: PostDetailReviewSection) {
  return (
    <section>
      <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2'>
        <MessageSquareIcon className='w-5 h-5 text-brand-500' />
        상세 후기
      </h3>
      <div className='bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed whitespace-pre-wrap'>
        {detailReviewContent}
      </div>
    </section>
  );
}
