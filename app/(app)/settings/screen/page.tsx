'use client';

import { Monitor, Sun, Moon, Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { THEME_OPTIONS } from '@/features/settings/screen/constants';

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export default function ScreenSettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Hydration mismatch 방지:
  // 서버와 클라이언트의 테마 정보가 다를 수 있으므로 마운트된 후에만 렌더링
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <div className='space-y-8 min-h-[500px]'>
        {/* 실제 카드와 높이가 같은 빈 박스나 스켈레톤을 반환 */}
        <div className='w-full h-[400px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl' />
      </div>
    );
  }

  return (
    <div className='space-y-8 min-h-[500px] animate-in fade-in slide-in-from-bottom-2 duration-500'>
      <Card className='rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors'>
        <CardHeader className='border-b border-border dark:border-slate-800'>
          <div className='flex items-center gap-x-2'>
            <Monitor className='w-5 h-5 text-brand-500' />
            <CardTitle className='text-lg font-bold'>화면 설정</CardTitle>
          </div>
          <CardDescription className='text-sm text-slate-500 dark:text-slate-400 mt-1'>
            앱의 테마를 변경합니다.
          </CardDescription>
        </CardHeader>

        <CardContent className='p-6 md:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {THEME_OPTIONS.map((themeOption) => {
              const isActive = theme === themeOption.id;
              const Icon = THEME_ICONS[themeOption.id];
              return (
                <button
                  onClick={() => setTheme(themeOption.id)}
                  key={themeOption.id}
                  className={cn(
                    'group relative p-4 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 text-left',
                    isActive
                      ? themeOption.activeClass
                      : 'border-slate-200 dark:border-slate-700 hover:border-brand-200 dark:hover:border-slate-600',
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                      themeOption.iconClass,
                    )}
                  >
                    <Icon className='w-6 h-6' />
                  </div>
                  <div>
                    <h3
                      className={cn(
                        'font-bold',
                        isActive
                          ? themeOption.textClass
                          : 'text-slate-900 dark:text-slate-100',
                      )}
                    >
                      {themeOption.title}
                    </h3>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      {themeOption.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className='absolute top-4 right-4 text-brand-500'>
                      <Check className='w-5 h-5' />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
