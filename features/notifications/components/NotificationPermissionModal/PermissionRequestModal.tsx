'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Bell, Calendar, FileText, Clock } from 'lucide-react';

interface PermissionRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
}

export default function PermissionRequestModal({
  isOpen,
  onClose,
  onAllow,
}: PermissionRequestModalProps) {
  const handleAllow = () => {
    onAllow();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-brand-500" />
          </div>
          <DialogTitle className="text-xl">알림을 받으시겠습니까?</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            중요한 일정과 업데이트를 놓치지 마세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              면접 일정 리마인더
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <FileText className="w-5 h-5 text-brand-500 shrink-0" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              서류 마감일 알림
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Clock className="w-5 h-5 text-brand-500 shrink-0" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              지원 현황 업데이트
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            나중에
          </Button>
          <Button
            variant="default"
            className="flex-1 font-bold"
            onClick={handleAllow}
          >
            알림 허용
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
