'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import PostDetailView from './PostDetailView';

export default function PostDetailModal({ postId }: { postId: number }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent className='w-[95vw] md:w-full md:max-w-3xl mx-auto overflow-hidden shadow-2xl rounded-3xl flex flex-col'>
        <PostDetailView postId={postId} />
      </DialogContent>
    </Dialog>
  );
}
