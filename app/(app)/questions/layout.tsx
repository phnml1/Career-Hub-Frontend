import MyQuestionsNav from '@/features/my-questions/components/MyQuestionNav';
import MyQuestionsHeader from '@/features/my-questions/components/MyQuestionsHeader';
import MyQuestionsSearchbar from '@/features/my-questions/components/MyQuestionsSearchbar';
import QuestionFormModal from '@/features/my-questions/components/QuestionFormModal';

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <MyQuestionsHeader />
      <MyQuestionsNav />
      <MyQuestionsSearchbar />

      <main className='mt-4'>{children}</main>

      <QuestionFormModal />
    </div>
  );
}
