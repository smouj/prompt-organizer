/**
 * Stat card component for displaying metrics
 * @module components/prompt-organizer/stat-card
 */

import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, className }: StatCardProps) {
  return (
    <div className={cn('bg-stone-800 p-4', className)}>
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.24em] text-stone-400">
          {label}
        </span>
        <Icon className="h-4 w-4 text-stone-100" />
      </div>
      <div className="text-3xl font-semibold leading-none text-stone-100">
        {value}
      </div>
    </div>
  );
}
