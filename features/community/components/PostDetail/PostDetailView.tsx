'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useGetReviewDetail } from '../../hooks/useGetReviewDetail';
import { useConfirmStore } from '@/shared/stores/useConfirmStore';
import { useDeleteReview } from '../../hooks/useDeleteReview';

import PostListItemMenu from '../SearchablePostList/PostListItemMenu';
import PostReportModal from '../PostReportModal';
import PostDetailHeader from './PostDetailHeader';
import PostDetailReviewSection from './PostDetailReviewSection';
import PostDetailQuestionListSection from './PostDetailQuestionListSection';
import QuestionArchiveModal from './QuestionArchiveModal';
import { DialogFooter } from '@/shared/components/ui/dialog';
import { useQuestionModalStore } from '@/features/my-questions/store/useQuestionModalStore';
import { PostDetailQuestion } from '../../types';

/**
 *
 * - useGetReviewDetail을 사용하여 데이터를 렌더링합니다.
 * - 커뮤니티 상세 페이지에서 사용하는 모달들을 관리합니다.(PostReportModal, QuestionArchiveModal)
 */
export default function PostDetailView({ postId }: { postId: number }) {
  const { data } = useGetReviewDetail(postId);
  const { mutate: deleteReview } = useDeleteReview();
  const router = useRouter();
  const { openConfirm } = useConfirmStore();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const openArchiveModal = useQuestionModalStore(
    (state) => state.openArchiveModal,
  );

  const handleEdit = () => {
    router.push(`/community/${postId}/edit`);
  };

  const handleDelete = () => {
    openConfirm({
      title: '후기 삭제',
      description: '삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      variant: 'destructive',
      onConfirm: () => {
        deleteReview(postId, {
          onSuccess: () => {
            router.back();
          },
        });
      },
    });
  };

  const handleArchive = (question: PostDetailQuestion) => {
    openArchiveModal({
      interviewQuestionId: question.id, // 원본 ID 전달
      applicationId: null, // 기본은 미연동 상태로 시작
      interviewType: data.interviewType,
      question: question.content,
      memo: '',
    });
  };

  return (
    <>
      {/* 상단 고정 헤더 */}
      <PostDetailHeader data={data} />

      {/* 본문 스크롤 영역 */}
      <div className='flex-1 overflow-y-auto p-8 pt-6 space-y-8 custom-scrollbar animate-fade-in-up'>
        <PostDetailQuestionListSection
          onArchive={handleArchive}
          questions={data.questions}
        />

        {/* 상세 후기 섹션 */}
        <PostDetailReviewSection
          detailReviewContent={data.detailReviewContent}
        />
      </div>

      <DialogFooter className='relative py-6 border-t border-slate-100 dark:border-slate-800 flex justify-end items-center'>
        <PostListItemMenu
          isMyPost={data.isMyPost}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReport={() => setIsReportModalOpen(true)}
        />
      </DialogFooter>

      {/* 커뮤니티 게시글 상세 페이지에 쓰이는 모달들 */}
      <PostReportModal
        postId={Number(postId)}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
      <QuestionArchiveModal />
    </>
  );
}
