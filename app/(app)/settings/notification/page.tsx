'use client';

import { NOTIFICATION_SECTIONS } from '@/features/notifications/constants';
import { useGetNotificationPreferences } from '@/features/notifications/hooks/useGetNotificationPreferences';
import { useUpdateNotificationPreference } from '@/features/notifications/hooks/useUpdateNotificationPreference';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { BellRing, CalendarIcon, ClockIcon, FileTextIcon } from 'lucide-react';

export default function NotificationSettingsPage() {
  const { data } = useGetNotificationPreferences('WEB');
  const { mutate: updatePreference } = useUpdateNotificationPreference('WEB');

  const SECTION_ICONS: Record<string, React.ReactNode> = {
    recruitment: (
      <CalendarIcon className='w-4 h-4 mr-2 text-primary stroke-[2.5]' />
    ),
    interview: <ClockIcon className='w-4 h-4 mr-2 text-primary stroke-[2.5]' />,
    etc: <FileTextIcon className='w-4 h-4 mr-2 text-primary stroke-[2.5]' />,
  };

  return (
    <div className='animate-in fade-in slide-in-from-bottom-2 duration-500'>
      <Card className='border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden transition-colors'>
        <CardHeader className='border-b border-border dark:border-slate-800'>
          <div className='flex items-center gap-x-2'>
            <BellRing className='w-5 h-5 text-brand-500' />
            <CardTitle className='text-lg font-bold'>알림 설정</CardTitle>
          </div>
          <CardDescription className='text-slate-500 dark:text-slate-400 mt-1'>
            중요한 일정을 놓치지 않도록 알림을 설정하세요.
          </CardDescription>
        </CardHeader>

        <CardContent className='p-0'>
          {NOTIFICATION_SECTIONS.map((section, sIndex) => (
            <div
              key={section.id}
              className={`p-6 md:p-8 space-y-6 ${
                sIndex !== 0
                  ? 'border-t border-slate-100 dark:border-slate-800'
                  : ''
              }`}
            >
              <h3 className='text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center'>
                {SECTION_ICONS[section.id]}
                {section.title}
              </h3>

              <div className='space-y-6'>
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-start justify-between group'
                  >
                    <div className='flex-1 pr-4 space-y-1'>
                      <Label
                        htmlFor={item.id}
                        className='text-sm font-medium text-slate-900 dark:text-slate-200 cursor-pointer'
                      >
                        {item.label}
                      </Label>
                      <p className='text-xs text-slate-500 dark:text-slate-400'>
                        {item.desc}
                      </p>
                    </div>

                    {/* Shadcn Switch 사용: 스타일 커스텀 가능 */}
                    <Switch
                      id={item.id}
                      checked={data?.[item.id] ?? true}
                      onCheckedChange={(checked) => {
                        // TODO: 별도로 관리할 수정 로직(Mutation) 연결
                        console.log(`Update: ${item.id} to ${checked}`);
                        updatePreference({ event: item.id, enabled: checked });
                      }}
                      className='data-[state=checked]:bg-brand-500'
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
