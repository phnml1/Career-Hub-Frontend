import { create } from 'zustand';

import { QuestionFormValues } from '../schemas/question-form';

interface QuestionModalState {
  isOpen: boolean;
  mode: 'create' | 'edit' | 'archive';
  selectedQuestion: QuestionFormValues | null;

  openCreateModal: () => void;
  openEditModal: (question: QuestionFormValues) => void;
  // 커뮤니티에서 면접 질문 저장시 쓰는 액션
  openArchiveModal: (data: QuestionFormValues) => void;
  closeModal: () => void;
}

export const useQuestionModalStore = create<QuestionModalState>((set) => ({
  isOpen: false,
  mode: 'create',
  selectedQuestion: null,

  openCreateModal: () =>
    set({
      isOpen: true,
      mode: 'create',
      selectedQuestion: null,
    }),

  openEditModal: (question) =>
    set({
      isOpen: true,
      mode: 'edit',
      selectedQuestion: question,
    }),

  openArchiveModal: (data) =>
    set({
      isOpen: true,
      mode: 'archive',
      selectedQuestion: data,
    }),

  closeModal: () =>
    set({
      isOpen: false,
    }),
}));
