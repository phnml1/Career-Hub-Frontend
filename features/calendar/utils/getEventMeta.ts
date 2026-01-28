import { DOCUMENT_STATUS_META } from '../constants/documentStatus';
import { PROCESS_TYPE_META } from '../constants/processType';
import { RbcEvent } from '../types/rbcEvent';

type EventMeta = {
  label: string;
  styles: string;
};

const DEFAULT_META: EventMeta = {
  label: '기타',
  styles: 'bg-slate-100 text-slate-700',
};

export function getEventMeta(event: RbcEvent): EventMeta {
  const resource = event.resource;

  if (resource.stageType === 'DOCUMENT') {
    return DOCUMENT_STATUS_META[resource.submissionStatus] ?? DEFAULT_META;
  }

  if (resource.stageType) {
    return PROCESS_TYPE_META[resource.stageType] ?? DEFAULT_META;
  }

  return DEFAULT_META;
}
