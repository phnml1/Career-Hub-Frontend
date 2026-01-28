'use client';

import { Smartphone } from 'lucide-react';
import { ToggleSwitch } from '@/shared/components/ui/toggle-switch';

interface PushNotificationSectionProps {
  isPushEnabled: boolean;
  isPushDenied: boolean;
  isLoading: boolean;
  isRegistering: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function PushNotificationSection({
  isPushEnabled,
  isPushDenied,
  isLoading,
  isRegistering,
  onToggle,
}: PushNotificationSectionProps) {
  const getStatusMessage = () => {
    if (isPushDenied) return '브라우저 설정에서 알림을 허용해주세요';
    if (isPushEnabled) return '푸시 알림이 활성화되었습니다';
    return '알림을 받으려면 허용해주세요';
  };

  return (
    <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl border border-brand-200 dark:border-brand-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Smartphone className="w-5 h-5 text-brand-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
              푸시 알림 허용
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {getStatusMessage()}
            </p>
          </div>
        </div>
        <ToggleSwitch
          enabled={isPushEnabled}
          onChange={onToggle}
          disabled={isLoading || isRegistering || isPushDenied}
        />
      </div>
    </div>
  );
}
