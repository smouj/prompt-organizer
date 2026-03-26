/**
 * Template card component for displaying prompt templates
 * @module components/prompt-organizer/template-card
 */

'use client';

import { Star, Trash2, CopyPlus, Bug, ClipboardCheck, FolderKanban, ShieldCheck, Sparkles, Rocket, FileText } from 'lucide-react';
import type { Template, TemplateCategory } from '@/types/prompt-organizer';
import { cn } from '@/lib/utils';
import { TRANSITION, INTERACTIVE_FOCUS } from './ui-helpers';

// Icon map defined outside the component
const CATEGORY_ICONS: Record<TemplateCategory, typeof Bug> = {
  bugs: Bug,
  audit: ClipboardCheck,
  tasks: FolderKanban,
  safe: ShieldCheck,
  ux: Sparkles,
  release: Rocket,
  custom: FileText,
};

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function TemplateCard({
  template,
  isSelected,
  onSelect,
  onToggleFavorite,
  onDelete,
  onDuplicate,
}: TemplateCardProps) {
  const Icon = CATEGORY_ICONS[template.category] || FileText;

  return (
    <button
      onClick={() => onSelect(template.id)}
      className={cn(
        'w-full border p-3 text-left',
        INTERACTIVE_FOCUS,
        TRANSITION,
        isSelected
          ? 'border-stone-200 bg-stone-500 text-stone-950'
          : 'border-stone-600 bg-stone-900 text-stone-100 hover:border-stone-400 hover:bg-stone-800'
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center border',
              isSelected
                ? 'border-stone-950 bg-stone-950 text-stone-100'
                : 'border-stone-500 bg-stone-800 text-stone-100'
            )}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{template.title}</div>
            <div
              className={cn(
                'mt-1 text-[11px] uppercase tracking-[0.18em]',
                isSelected ? 'text-stone-800' : 'text-stone-400'
              )}
            >
              {template.category}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(template.id);
            }}
            className={cn(
              'border p-1',
              TRANSITION,
              isSelected
                ? 'border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-stone-100'
                : 'border-stone-500 text-stone-100 hover:border-stone-400 hover:bg-stone-500 hover:text-stone-950'
            )}
            title="Duplicar plantilla"
          >
            <CopyPlus className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(template.id);
            }}
            className={cn(
              'border p-1',
              TRANSITION,
              isSelected
                ? 'border-stone-950 text-stone-950 hover:bg-red-900 hover:text-red-400'
                : 'border-stone-500 text-stone-100 hover:border-red-500 hover:bg-stone-500 hover:text-red-400'
            )}
            title="Eliminar plantilla"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(template.id);
            }}
            className={cn(
              'border p-1',
              TRANSITION,
              isSelected
                ? 'border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-yellow-400'
                : 'border-stone-500 text-stone-100 hover:border-stone-400 hover:bg-stone-500 hover:text-stone-950'
            )}
            title="Favorito"
          >
            <Star
              className={cn('h-4 w-4', template.favorite && 'fill-current text-yellow-500')}
            />
          </button>
        </div>
      </div>

      <p
        className={cn(
          'line-clamp-2 text-xs leading-5',
          isSelected ? 'text-stone-800' : 'text-stone-300'
        )}
      >
        {template.body.slice(0, 140)}...
      </p>
    </button>
  );
}
