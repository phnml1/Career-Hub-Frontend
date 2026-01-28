'use client';

import { useState } from 'react';

import PostWriteTrigger from './PostWriteTrigger';
import PostWriteForm from './PostWriteForm';

import { MyProfileImage } from '@/features/my-profile/components/MyProfileImage';

export default function PostWriteSection() {
  const [isWritingMode, setIsWritingMode] = useState(false);

  return (
    <div className='transition-all duration-300 p-4 flex gap-x-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm'>
      <MyProfileImage />

      {!isWritingMode ? (
        <PostWriteTrigger onClick={() => setIsWritingMode(true)} />
      ) : (
        <PostWriteForm onClose={() => setIsWritingMode(false)} />
      )}
    </div>
  );
}
