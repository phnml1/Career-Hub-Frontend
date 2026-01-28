'use client';

import { BellRing, X, Calendar, Clock, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFCM } from '@/shared/hooks/useFCM';
import { useGetNotificationPreferences } from '../../hooks/useGetNotificationPreferences';
import { useUpdateNotificationPreference } from '../../hooks/useUpdateNotificationPreference';
import { NOTIFICATION_SECTIONS } from '../../constants';
import PushNotificationSection from './PushNotificationSection';
import SettingsSection from './SettingsSection';

interface NotificationSettingsModalProps {
  onClose?: () => void;
}

const SECTION_ICONS = {
  recruitment: Calendar,
  interview: Clock,
  etc: FileText,
} as const;

export default function NotificationSettingsModal({ onClose }: NotificationSettingsModalProps) {
  const router = useRouter();
  const { permission, isLoading, isRegistering, requestPermissionAndToken } = useFCM();
  const { data: preferences } = useGetNotificationPreferences('WEB');
  const { mutate: updatePreference } = useUpdateNotificationPreference('WEB');

  // 로컬 state로 변경사항 관리
  const [localPreferences, setLocalPreferences] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (preferences) {
      setLocalPreferences(preferences);
    }
  }, [preferences]);

  const isPushEnabled = permission === 'granted';
  const isPushDenied = permission === 'denied';

  const handlePushToggle = async (enabled: boolean) => {
    if (enabled && permission !== 'granted') {
      await requestPermissionAndToken();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // 토글 시 로컬 state만 변경
  const handleSettingChange = (eventId: string, enabled: boolean) => {
    setLocalPreferences((prev) => ({ ...prev, [eventId]: enabled }));
  };

  // 저장 버튼 클릭 시 변경된 항목들만 API 호출
  const handleSave = () => {
    Object.entries(localPreferences).forEach(([event, enabled]) => {
      if (preferences?.[event] !== enabled) {
        updatePreference({ event, enabled });
      }
    });
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in-up">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-brand-500" />
            알림 설정
          </h2>
          <button onClick={handleClose}>
            <X className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
          </button>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
          {/* 푸시 알림 허용 */}
          <PushNotificationSection
            isPushEnabled={isPushEnabled}
            isPushDenied={isPushDenied}
            isLoading={isLoading}
            isRegistering={isRegistering}
            onToggle={handlePushToggle}
          />

          {/* 알림 설정 섹션들 */}
          {NOTIFICATION_SECTIONS.map((section) => {
            const Icon = SECTION_ICONS[section.id as keyof typeof SECTION_ICONS];
            const settings = section.items.map((item) => ({
              key: item.id,
              label: item.label,
              enabled: localPreferences[item.id] ?? true,
            }));

            return (
              <SettingsSection
                key={section.id}
                icon={Icon}
                title={section.title}
                settings={settings}
                onSettingChange={handleSettingChange}
              />
            );
          })}
        </div>

        {/* 푸터 버튼 */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 shadow-md transition-all"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
