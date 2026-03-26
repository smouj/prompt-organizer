/**
 * Task item component for the backlog
 * @module components/prompt-organizer/task-item
 */

'use client';

import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import type { Task } from '@/types/prompt-organizer';
import { StatusBadge } from './status-badge';
import { cn } from '@/lib/utils';
import { BUTTON_GHOST, INTERACTIVE_FOCUS, TRANSITION } from './ui-helpers';

interface TaskItemProps {
  task: Task;
  onCycleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onCycleStatus, onDelete }: TaskItemProps) {
  return (
    <div className="border border-stone-600 bg-stone-900 p-3">
      <div className="mb-3 flex items-start justify-between gap-3">
        <button
          onClick={() => onCycleStatus(task.id)}
          className={cn(
            'flex items-start gap-3 text-left outline-none',
            INTERACTIVE_FOCUS
          )}
        >
          {task.status === 'hecho' ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-400" />
          ) : (
            <Circle className="mt-0.5 h-4 w-4 text-stone-400" />
          )}
          <span
            className={cn(
              'text-sm font-medium leading-5',
              task.status === 'hecho' ? 'text-stone-400 line-through' : 'text-stone-100'
            )}
          >
            {task.title}
          </span>
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className={cn(BUTTON_GHOST, 'px-2 py-2')}
          title="Eliminar tarea"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={task.status} />
        <span className="text-[11px] uppercase tracking-[0.18em] text-stone-400">
          Prioridad {task.priority}
        </span>
      </div>
    </div>
  );
}
