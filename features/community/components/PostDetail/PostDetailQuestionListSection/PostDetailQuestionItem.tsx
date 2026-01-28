import { Button } from '@/shared/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';
import { BookmarkPlusIcon } from 'lucide-react';

interface QuestionItemProps {
  question: {
    content: string;
    isSaved: boolean;
  };
  index: number;
  onArchive?: () => void;
}

export default function PostDetailQuestionItem({
  question: { isSaved, content },
  index,
  onArchive,
}: QuestionItemProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-2xl border transition-all flex justify-between items-center group/item',
        isSaved
          ? 'bg-brand-50/50 border-brand-200 dark:bg-brand-900/20 dark:border-brand-800'
          : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-brand-200',
      )}
    >
      <div className='flex gap-3 flex-1 min-w-0'>
        <span
          className={cn(
            'font-bold shrink-0',
            isSaved ? 'text-brand-600 dark:text-brand-400' : 'text-brand-500',
          )}
        >
          Q{index + 1}.
        </span>
        <p className='font-medium leading-relaxed text-slate-900 dark:text-slate-100'>
          {content}
        </p>
      </div>
      <div className='relative group/tooltip'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onArchive}
              type='button'
              variant='outline'
              size='sm'
              className={cn(
                'ml-4 p-2 px-3 h-9 rounded-xl shadow-sm border transition-all flex items-center gap-1.5 text-xs font-bold active:scale-95',
                isSaved
                  ? 'bg-brand-500 text-white border-brand-500 hover:bg-brand-600 hover:text-white'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700',
              )}
            >
              <BookmarkPlusIcon
                className={cn('w-4 h-4', isSaved && 'fill-white stroke-white')}
              />
              {isSaved ? '보관됨' : '보관하기'}
            </Button>
          </TooltipTrigger>
          <TooltipContent className='bg-slate-900 text-white text-[10px] font-bold'>
            <p>
              {isSaved ? '보관 목록에서 제거하기' : '나의 면접 질문에 보관하기'}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
