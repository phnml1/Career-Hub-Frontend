import { QuestionItemSkeleton } from './QuestionItemSkeleton';

export default function QuestionListSkeleton() {
  return (
    <div className='space-y-4 w-full'>
      {/* 5개의 스켈레톤 아이템을 생성 */}
      {Array.from({ length: 5 }).map((_, i) => (
        <QuestionItemSkeleton key={i} />
      ))}
    </div>
  );
}
