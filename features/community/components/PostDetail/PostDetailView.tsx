'use client';

import { useGetReviewDetail } from '../../hooks/useGetReviewDetail';

import PostDetailHeader from './PostDetailHeader';
import PostDetailReviewSection from './PostDetailReviewSection';
import PostDetailQuestionListSection from './PostDetailQuestionListSection';

/**
 * - useGetReviewDetail을 사용하여 데이터를 렌더링합니다.
 * - 커뮤니티 상세 페이지에서 사용하는 모달들을 관리합니다.(PostReportModal, QuestionArchiveModal)
 */
export default function PostDetailView({ postId }: { postId: number }) {
  const { data } = useGetReviewDetail(postId);

  return (
    <>
      <PostDetailHeader
        data={{
          ...data,
          postId,
        }}
      />

      {/* 본문 스크롤 영역 */}
      <div className='flex-1 overflow-y-auto p-8 pt-6 space-y-8 custom-scrollbar animate-fade-in-up'>
        <PostDetailQuestionListSection
          questions={data.questions}
          postId={postId}
          postInterviewType={data.interviewType}
        />
        <PostDetailReviewSection
          detailReviewContent={data.detailReviewContent}
        />
      </div>
    </>
  );
}
