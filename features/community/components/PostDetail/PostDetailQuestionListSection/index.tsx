import { BrainCircuitIcon } from 'lucide-react';

import PostDetailQuestionItem from './PostDetailQuestionItem';
import {
  PostDetailQuestion,
  PostDetailQuestions,
} from '@/features/community/types';

interface PostDetailQuestionListSectionProps {
  questions: PostDetailQuestions;
  onArchive: (question: PostDetailQuestion) => void;
}

export default function PostDetailQuestionListSection({
  questions,
  onArchive,
}: PostDetailQuestionListSectionProps) {
  return (
    <section>
      <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2'>
        <BrainCircuitIcon className='w-5 h-5 text-brand-500' />
        면접 질문 리스트
      </h3>
      <div className='space-y-3'>
        {questions?.map((question, idx) => (
          <PostDetailQuestionItem
            key={question.id}
            question={question}
            index={idx}
            onArchive={() => onArchive(question)}
          />
        ))}
      </div>
    </section>
  );
}
