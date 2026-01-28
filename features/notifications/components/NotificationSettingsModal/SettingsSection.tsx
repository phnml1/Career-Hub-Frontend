'use client';

import { LucideIcon } from 'lucide-react';
import { SettingItem } from '../SettingItem';

interface SettingOption {
  key: string;
  label: string;
  enabled: boolean;
}

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  settings: SettingOption[];
  onSettingChange: (key: string, enabled: boolean) => void;
}

export default function SettingsSection({
  icon: Icon,
  title,
  settings,
  onSettingChange,
}: SettingsSectionProps) {
  return (
    <section className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
      <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
        <Icon className="w-4 h-4 mr-2 text-slate-400" />
        {title}
      </h3>
      <div className="space-y-3">
        {settings.map((setting) => (
          <SettingItem
            key={setting.key}
            label={setting.label}
            enabled={setting.enabled}
            onChange={(v) => onSettingChange(setting.key, v)}
          />
        ))}
      </div>
    </section>
  );
}
