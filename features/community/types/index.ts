/** * Frontend Domain Model
 * UI 컴포넌트에서 사용할 가공된 타입
 */
export interface PostListItem {
  id: number;
  companyName: string;
  position: string;
  interviewType: string;
  content: string;
  authorName: string;
  createdAt: string;
  isMine: boolean;
}

export interface PostDetail {
  id: number;
  companyName: string;
  position: string;
  interviewType: string;
  detailReviewContent: string;
  authorName: string;
  createdAt: string;
  isMyPost: boolean;
  questions: PostDetailQuestions;
}

export interface PostDetailQuestion {
  id: number;
  content: string;
  isSaved: boolean;
}

export type PostDetailQuestions = PostDetailQuestion[];

export type SortOrder = 'NEWEST' | 'OLDEST';
