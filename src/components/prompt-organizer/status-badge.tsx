/**
 * Status badge component for tasks
 * @module components/prompt-organizer/status-badge
 */

import type { TaskStatus } from '@/types/prompt-organizer';
import { getStatusStyle, getStatusLabel } from './ui-helpers';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'border px-2 py-1 text-[11px] uppercase tracking-[0.18em]',
        getStatusStyle(status),
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}
