/**
 * Utility components and helpers for Prompt Organizer
 * @module components/prompt-organizer/ui-helpers
 */

import { cn } from '@/lib/utils';
import type { TaskStatus, PaletteColor } from '@/types/prompt-organizer';
import { PALETTE } from '@/types/prompt-organizer';

// Style constants
export const SURFACE = 'border border-stone-600 bg-stone-900';
export const DIVIDER = 'bg-stone-700';
export const TRANSITION = 'transition-all duration-150 ease-out';
export const INTERACTIVE_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950';

// Input styles
export const INPUT_BASE = cn(
  'w-full border border-stone-600 bg-stone-900 px-3 py-3 text-sm text-stone-100 placeholder:text-stone-400',
  'outline-none hover:border-stone-400 focus:border-stone-300 focus:bg-stone-800',
  INTERACTIVE_FOCUS,
  TRANSITION
);

// Button styles
export const BUTTON_GHOST = cn(
  'inline-flex items-center justify-center gap-2 border border-stone-500 bg-stone-900 px-4 py-3 text-sm font-medium text-stone-100',
  'hover:border-stone-300 hover:bg-stone-600 hover:text-stone-50 active:scale-[0.99]',
  INTERACTIVE_FOCUS,
  TRANSITION
);

export const BUTTON_SOLID = cn(
  'inline-flex items-center justify-center gap-2 border border-stone-500 bg-stone-500 px-4 py-3 text-sm font-medium text-stone-950',
  'hover:border-stone-300 hover:bg-stone-200 hover:text-stone-950 active:scale-[0.99]',
  INTERACTIVE_FOCUS,
  TRANSITION
);

// Status badge styles
const STATUS_STYLES: Record<TaskStatus, string> = {
  pendiente: 'bg-stone-900 text-stone-100 border-stone-500',
  progreso: 'bg-stone-500 text-stone-950 border-stone-300',
  hecho: 'bg-stone-800 text-stone-300 border-stone-500 border-dashed',
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  pendiente: 'Pendiente',
  progreso: 'En progreso',
  hecho: 'Hecho',
};

/**
 * Get status badge class
 */
export function getStatusStyle(status: TaskStatus): string {
  return STATUS_STYLES[status] || STATUS_STYLES.pendiente;
}

/**
 * Get status label
 */
export function getStatusLabel(status: TaskStatus): string {
  return STATUS_LABELS[status] || status;
}
